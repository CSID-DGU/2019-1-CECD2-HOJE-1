#pragma once
#define _WIN32_WINNT _WIN32_WINNT_XP
#define WIN32_LEAN_AND_MEAN
#define NOMINMAX
#include <opencv2\opencv.hpp>
#include <vector>
#include <math.h>
#include <iostream>
#include <algorithm>
#include <io.h>
#include <direct.h>
#include <errno.h>
#include <Windows.h>
#include "preprocess.h"

struct MergeInfo {
	int minXpos;
	int maxXpos;
	int minXposBoxWidth;
	int maxXposBoxWidth;

	int minYpos;
	int maxYpos;
	int minYposBoxHeight;
	int maxYposBoxHeight;
};

bool isRectangleOverlap(cv::Rect &rect1, cv::Rect &rect2) {
	if ((rect1 & rect2).area() > 0)
		return true;
	else
		return false;
}

bool isSameYposition(cv::Rect &rect1, cv::Rect &rect2) {
	float minY = (rect1.y > rect2.y) ? rect2.y : rect1.y;
	float maxY = (rect1.y < rect2.y) ? rect2.y : rect1.y;

	if (0.95*maxY <= minY)
		return true;
	else
		return false;
}

bool isInXposition(cv::Rect &rect1, cv::Rect &rect2) {

	cv::Rect baseRect = (rect1.x < rect2.x) ? rect1 : rect2;
	cv::Rect compareRect = (rect1.x < rect2.x) ? rect2 : rect1;

	if (baseRect.x <= compareRect.x && compareRect.x <= baseRect.x + baseRect.width)
		return true;
	else
		return false;
}

bool isSameHeight(cv::Rect &rect1, cv::Rect &rect2) {
	float minHeight = rect1.height > rect2.height ? rect2.height : rect1.height;
	float maxHeight = rect1.height < rect2.height ? rect2.height : rect1.height;

	if (0.85*maxHeight <= minHeight)
		return true;
	else
		return false;
}

cv::Rect mergeBox(MergeInfo& mergeInfo) {
	int logerheight = (mergeInfo.minYpos + mergeInfo.minYposBoxHeight) < (mergeInfo.maxYpos + mergeInfo.maxYposBoxHeight) ? (mergeInfo.maxYpos + mergeInfo.maxYposBoxHeight) : (mergeInfo.minYpos + mergeInfo.minYposBoxHeight);
	return cv::Rect(mergeInfo.minXpos, mergeInfo.minYpos, (mergeInfo.maxXpos + mergeInfo.maxXposBoxWidth) - mergeInfo.minXpos, logerheight - mergeInfo.minYpos);
}

std::vector<cv::Rect> detectLetters(cv::Mat img)
{
	Preprocess p_tool;
	std::vector<cv::Rect> boundRect;
	cv::Mat img_clone = img.clone();
	cv::Mat img_sobel, img_threshold, element;
	const int standard_width = 675;
	const int standard_height = 250;

	// 기준 width, cols : 400 ,  height,rows : 250
	//float scale_size = 1.0f;

	int inputImage_width = img.cols;
	int inputImage_height = img.rows;

	float width_scale_size = (float)inputImage_width / (float)standard_width;
	float height_scale_size = (float)inputImage_height / (float)standard_height;

	int extraScale = inputImage_width / 675;

	height_scale_size = height_scale_size < 1 ? 1 : height_scale_size;

	cv::Mat rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(2 + (inputImage_height / 500), 1));
	cv::dilate(img_clone, img_clone, rect_kernel);

	img_clone = p_tool.removeDotNoise(~img_clone, 5);

	cv::threshold(img_clone, img_threshold, 0, 255, cv::THRESH_OTSU | cv::THRESH_BINARY_INV);
	rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(2, 2));
	cv::dilate(img_threshold, img_threshold, rect_kernel);

	element = getStructuringElement(cv::MORPH_RECT, cv::Size_<float>((14.5 + extraScale)* width_scale_size, 1.0 * height_scale_size)); // 이미지에서 최대한 한 라인만 읽을 수 있게 처리함.													
	cv::morphologyEx(img_threshold, img_threshold, cv::MORPH_CLOSE, element); //Does the trick


	std::vector< std::vector< cv::Point> > contours;
	cv::findContours(img_threshold, contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);
	std::vector<std::vector<cv::Point>> contours_poly(contours.size());

	for (int i = 0; i < contours.size(); i++)
		if (contours[i].size() > 75)//100
		{
			cv::approxPolyDP(cv::Mat(contours[i]), contours_poly[i], 3, true);
			cv::Rect appRect(boundingRect(cv::Mat(contours_poly[i])));
			if ((float)appRect.width > (float)appRect.height*0.85 && appRect.height > 10)
				boundRect.push_back(appRect);
		}

	return boundRect;
}

std::vector<cv::Rect> mergeLettersBox(std::vector<cv::Rect> &letterBBoxes1) {

	std::vector<cv::Rect> mergeBoxList;

	{
		for (int i = letterBBoxes1.size() - 1; i >= 0; i--) {

			bool loopOut = false;

			for (int mergeBoxIndex = 0; mergeBoxIndex < mergeBoxList.size(); mergeBoxIndex++) {
				if (isRectangleOverlap(letterBBoxes1[i], mergeBoxList[mergeBoxIndex])) {
					loopOut = true;
					break;
				}
			}

			if (loopOut)
				continue;

			cv::Rect baseRect = letterBBoxes1[i];

			MergeInfo mergeinfo;
			mergeinfo.minXpos = baseRect.x;
			mergeinfo.maxXpos = baseRect.x;
			mergeinfo.minXposBoxWidth = baseRect.width;
			mergeinfo.maxXposBoxWidth = baseRect.width;

			mergeinfo.minYpos = baseRect.y;
			mergeinfo.maxYpos = baseRect.y;
			mergeinfo.minYposBoxHeight = baseRect.height;
			mergeinfo.maxYposBoxHeight = baseRect.height;

			for (int j = i - 1; j >= 0; j--) {
				if (isSameYposition(baseRect, letterBBoxes1[j]) && isSameHeight(baseRect, letterBBoxes1[j]) && !isInXposition(baseRect, letterBBoxes1[j])) {

					if (mergeinfo.minXpos > letterBBoxes1[j].x) {
						mergeinfo.minXpos = letterBBoxes1[j].x;
						mergeinfo.minXposBoxWidth = letterBBoxes1[j].width;
					}

					if (mergeinfo.minYpos > letterBBoxes1[j].y) {
						mergeinfo.minYpos = letterBBoxes1[j].y;
						mergeinfo.minYposBoxHeight = letterBBoxes1[j].height;
					}

					if (mergeinfo.maxXpos < letterBBoxes1[j].x) {
						mergeinfo.maxXpos = letterBBoxes1[j].x;
						mergeinfo.maxXposBoxWidth = letterBBoxes1[j].width;
					}

					if (mergeinfo.maxYpos < letterBBoxes1[j].y) {
						mergeinfo.maxYpos = letterBBoxes1[j].y;
						mergeinfo.maxYposBoxHeight = letterBBoxes1[j].height;
					}
				}
			}

			cv::Rect mergeRect = mergeBox(mergeinfo);
			mergeBoxList.push_back(mergeRect);
		}
	}

	return mergeBoxList;
}


//코드 수정해야함.
void scaleBoundingBoxSize(std::vector<cv::Rect> &letterBBoxes1, int cols, int rows, int input_width, int input_height) {
	const int standard_width = 400;
	const int standard_height = 250;
	int inputImage_width = input_width;
	int inputImage_height = input_height;

	////
	int min_distance_between_rectangle = inputImage_height;
	for (int i = 0; i < letterBBoxes1.size(); i++) {
		for (int j = i + 1; j < letterBBoxes1.size(); j++) {
			//
			if ((letterBBoxes1[i].x <= letterBBoxes1[j].x) && (letterBBoxes1[j].x <= (letterBBoxes1[i].x + letterBBoxes1[i].width))
				&& !isRectangleOverlap(letterBBoxes1[i], letterBBoxes1[j])
				&& ((letterBBoxes1[i].y - (letterBBoxes1[j].y + letterBBoxes1[j].height)) < min_distance_between_rectangle)) {

				if (letterBBoxes1[i].y - (letterBBoxes1[j].y + letterBBoxes1[j].height) < 0)
					min_distance_between_rectangle = 0;
				else
					min_distance_between_rectangle = letterBBoxes1[i].y - (letterBBoxes1[j].y + letterBBoxes1[j].height);

				break;//이미 bbox는 정렬되어 있는 형태이므로 이때가 가장 letterBBoxes1[i]와 가까운 사각형
			}
		}
	}

	int x_margin = 10; //; * (inputImage_width / standard_width);

	int y_margin = 0;
	
	if (min_distance_between_rectangle >= 4) {
		y_margin = 5;
	}
	else if (4 > min_distance_between_rectangle && min_distance_between_rectangle > 0) {
		y_margin = min_distance_between_rectangle + 4;
	}
	else {
		y_margin = 3;
	}

	//std::cout << y_margin << ", " << min_distance_between_rectangle << std::endl;

	for (int i = 0; i < letterBBoxes1.size(); i++) {
		if (letterBBoxes1[i].x - x_margin < 0 && letterBBoxes1[i].y - y_margin < 0) {
			letterBBoxes1[i].x = 0;
			letterBBoxes1[i].y = 0;
		}
		else if (letterBBoxes1[i].x - x_margin < 0) {
			letterBBoxes1[i].x = 0;
			letterBBoxes1[i].y -= y_margin;
		}
		else if (letterBBoxes1[i].y - y_margin < 0) {
			letterBBoxes1[i].y = 0;
			letterBBoxes1[i].x -= x_margin;
		}
		else {
			letterBBoxes1[i] -= cv::Point(x_margin, y_margin);
		}

		if (letterBBoxes1[i].x + letterBBoxes1[i].width + (2 * x_margin) > cols || letterBBoxes1[i].y + letterBBoxes1[i].height + (2 * y_margin) > rows) {
			letterBBoxes1[i].width = cols - letterBBoxes1[i].x;
			letterBBoxes1[i].height = rows - letterBBoxes1[i].y;
		}
		else if (letterBBoxes1[i].x + letterBBoxes1[i].width + (2 * x_margin) > cols) {
			letterBBoxes1[i].width = cols - letterBBoxes1[i].x;
			letterBBoxes1[i].height += 2 * y_margin;
		}
		else if (letterBBoxes1[i].y + letterBBoxes1[i].height + (2 * y_margin) > rows) {
			letterBBoxes1[i].height = rows - letterBBoxes1[i].y;
			letterBBoxes1[i].width += 2 * x_margin;
		}
		else {
			letterBBoxes1[i] += cv::Size(2 * x_margin, 2 * y_margin);
		}
	}
}

bool compareArea(cv::Mat m1, cv::Mat m2) {
	return cv::contourArea(m1) > cv::contourArea(m2);
}

std::vector<cv::Point> mat2vec(cv::Mat inputMat)
{
	std::vector<cv::Point> result;

	int width = inputMat.rows;

	for (int i = 0; i < width; i++) {
		result.push_back(cv::Point(inputMat.row(i)));
	}

	return result;
}

cv::Point2f* mat2point(cv::Mat inputMat, cv::Point2f* vertices)
{
	cv::Point bl = cv::Point(inputMat.row(0));
	cv::Point tl = cv::Point(inputMat.row(1));
	cv::Point tr = cv::Point(inputMat.row(2));
	cv::Point br = cv::Point(inputMat.row(3));

	vertices[0] = tl;
	vertices[1] = tr;
	vertices[2] = br;
	vertices[3] = bl;

	return vertices;
}

int getMaxIndex(float *pointArr, int arrSize) {
	int maxIndex = 0;
	int max;
	max = pointArr[0];

	for (int i = 0; i < arrSize; i++) {
		if (pointArr[i] > max) {
			max = pointArr[i];
			maxIndex = i;
		}
	}

	return maxIndex;
}

int getMinIndex(float *pointArr, int arrSize) {
	int minIndex = 0;
	int min;
	min = pointArr[0];

	for (int i = 0; i < arrSize; i++) {
		if (pointArr[i] < min) {
			min = pointArr[i];
			minIndex = i;
		}
	}

	return minIndex;
}


cv::Mat order_point(cv::Mat& roiBox)
{
	cv::Point2f ptr[4] = { cv::Point2f(roiBox.row(0)),
					 cv::Point2f(roiBox.row(1)),
					 cv::Point2f(roiBox.row(2)),
					 cv::Point2f(roiBox.row(3)) };

	float PointSum[4] = { ptr[0].x + ptr[0].y,
						  ptr[1].x + ptr[1].y,
						  ptr[2].x + ptr[2].y,
						  ptr[3].x + ptr[3].y };

	float PointSub[4] = { ptr[0].x - ptr[0].y,
						   ptr[1].x - ptr[1].y,
						   ptr[2].x - ptr[2].y,
						   ptr[3].x - ptr[3].y };

	cv::Mat tl = roiBox.row(getMinIndex(PointSum, sizeof(PointSum) / sizeof(float))); //tl
	cv::Mat tr = roiBox.row(getMaxIndex(PointSub, sizeof(PointSub) / sizeof(float))); //tr
	cv::Mat br = roiBox.row(getMaxIndex(PointSum, sizeof(PointSum) / sizeof(float))); //br
	cv::Mat bl = roiBox.row(getMinIndex(PointSub, sizeof(PointSub) / sizeof(float))); //bl


	cv::Mat orderRoiBox;
std::vector<cv::Mat> matrices = { bl, tl, tr, br };
vconcat(matrices, orderRoiBox);

return orderRoiBox;
}

cv::Mat four_point_transform(cv::Mat& img, cv::Mat& roiBox)
{
	cv::Mat orderRoiBox = order_point(roiBox);

	cv::Point bl = cv::Point(orderRoiBox.row(0));
	cv::Point tl = cv::Point(orderRoiBox.row(1));
	cv::Point tr = cv::Point(orderRoiBox.row(2));
	cv::Point br = cv::Point(orderRoiBox.row(3));

	double widthA = sqrt(pow((br.x - bl.x), 2) + pow((br.y - bl.y), 2));
	double widthB = sqrt(pow((tr.x - tl.x), 2) + pow((tr.y - tl.y), 2));
	int maxWidth = std::max(int(widthA), int(widthB));

	double heightA = sqrt(pow((tr.x - br.x), 2) + pow((tr.y - br.y), 2));
	double heightB = sqrt(pow((tl.x - bl.x), 2) + pow((tl.y - bl.y), 2));
	int maxHeight = std::max(int(heightA), int(heightB));

	cv::Point2f src_vertices[4];
	mat2point(orderRoiBox, src_vertices);

	cv::Point2f dst_vertices[4];

	dst_vertices[0] = cv::Point2f(0, 0);
	dst_vertices[1] = cv::Point2f(maxWidth - 1, 0);
	dst_vertices[2] = cv::Point2f(maxWidth - 1, maxHeight - 1);
	dst_vertices[3] = cv::Point2f(0, maxHeight - 1);


	cv::Mat M = cv::getPerspectiveTransform(src_vertices, dst_vertices);

	cv::Mat warped;
	cv::warpPerspective(img, warped, M, cv::Size(maxWidth, maxHeight), cv::INTER_LINEAR);

	return warped;

}

cv::Mat four_point_transform_reverse(cv::Mat& img, cv::Mat& warped, cv::Mat& roiBox)
{
	cv::Mat orderRoiBox = order_point(roiBox);

	cv::Point bl = cv::Point(orderRoiBox.row(0));
	cv::Point tl = cv::Point(orderRoiBox.row(1));
	cv::Point tr = cv::Point(orderRoiBox.row(2));
	cv::Point br = cv::Point(orderRoiBox.row(3));

	double widthA = sqrt(pow((br.x - bl.x), 2) + pow((br.y - bl.y), 2));
	double widthB = sqrt(pow((tr.x - tl.x), 2) + pow((tr.y - tl.y), 2));
	int maxWidth = std::max(int(widthA), int(widthB));

	double heightA = sqrt(pow((tr.x - br.x), 2) + pow((tr.y - br.y), 2));
	double heightB = sqrt(pow((tl.x - bl.x), 2) + pow((tl.y - bl.y), 2));
	int maxHeight = std::max(int(heightA), int(heightB));

	cv::Point2f src_vertices[4];
	mat2point(roiBox, src_vertices);
	cv::Point2f dst_vertices[4];

	dst_vertices[0] = cv::Point2f(0, 0);
	dst_vertices[1] = cv::Point2f(maxWidth - 1, 0);
	dst_vertices[2] = cv::Point2f(maxWidth - 1, maxHeight - 1);
	dst_vertices[3] = cv::Point2f(0, maxHeight - 1);


	cv::Mat M = cv::getPerspectiveTransform(dst_vertices, src_vertices);

	cv::Mat warp = warped;

	int originWidth = img.cols;
	int originHeight = img.rows;

	//invert(M, M);
	cv::warpPerspective(warped, img, M, cv::Size(originWidth, originHeight), 1, cv::BORDER_TRANSPARENT);//, cv::WARP_INVERSE_MAP, 

	return img;
}

std::string splitPath(std::string path, char sep) {
	std::vector<std::string> out;
	std::stringstream stream(path);
	std::string temp;

	while (std::getline(stream, temp, sep)) {
		out.push_back(temp);
	}

	return out.back();
}

void createDir(char* Path){
	char DirName[256];  //생성할 디렉초리 이름
	char* p = Path;     //인자로 받은 디렉토리
	char* q = DirName;

	while (*p){
		if (('\\' == *p) || ('/' == *p)){
			if (':' != *(p - 1)){
				CreateDirectory(DirName, NULL);
			}
		}
		*q++ = *p++;
		*q = '\0';
	}
	CreateDirectory(DirName, NULL);
}

void DeleteAllFiles(const char* folderPath){
	char fileFound[256];
	WIN32_FIND_DATA info;
	HANDLE hp;

	sprintf_s(fileFound, "%s\\*.*", folderPath);
	hp = FindFirstFile(fileFound, &info); //디렉토리에 파일이 있는지 첫번째 파일만.
	do{
		sprintf_s(fileFound, "%s\\%s", folderPath, info.cFileName);
		DeleteFile(fileFound);
	} while (FindNextFile(hp, &info));  //다른 파일이 있을때 까지

	FindClose(hp);
}

bool prepareDirectory(char* dirName) {
	if (NULL == dirName) {
		return false;
	}

	if ((_access(dirName, 0)) != -1) {
		DeleteAllFiles(dirName); //존재한다면 내부에 존재하는 파일 삭제
	}
	else {
		createDir(dirName);
	}
}
