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


bool isRectangleOverlap(cv::Rect &rect1, cv::Rect &rect2) {
	if ((rect1 & rect2).area() > 0)
		return true;
	else
		return false;
}

std::vector<cv::Rect> detectLetters(cv::Mat img)
{
	std::vector<cv::Rect> boundRect;
	cv::Mat img_clone = img.clone();
	cv::Mat img_sobel, img_threshold, element;
	const int standard_width = 400;
	const int standard_height = 250;
	// ���� width, cols : 400 ,  height,rows : 250
	//float scale_size = 1.0f;

	int inputImage_width = img.cols;
	int inputImage_height = img.rows;


	float width_scale_size = (float)inputImage_width / (float)standard_width;
	float height_scale_size = (float)inputImage_height / (float)standard_height;

	height_scale_size = height_scale_size < 1 ? 1 : height_scale_size;
	

	cv::Mat rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(2 + (inputImage_height/500), 1));
	//std::cout << rect_kernel << std::endl;
	cv::dilate(img_clone, img_clone, rect_kernel);
	
	//cv::imshow("test", img_clone);
	//cv::waitKey(0);

	//cv::Sobel(img_clone, img_sobel, CV_8U, 1, 0, 3, 1, 0, cv::BORDER_DEFAULT); //1,0,3,1,0
	//cv::Sobel(img_clone, img_sobel, CV_16S, 1, 0, 3, 1, 0, cv::BORDER_DEFAULT);

	//cv::imshow("test?", img_sobel);
	//cv::waitKey(0);
	cv::threshold(img_clone, img_threshold, 0, 255, cv::THRESH_OTSU | cv::THRESH_BINARY_INV);
	rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(2, 2));
	cv::dilate(img_threshold, img_threshold, rect_kernel);
	//cv::threshold(img_sobel, img_threshold, 0, 255, cv::THRESH_OTSU | cv::THRESH_BINARY_INV);//  +

	//cv::imshow("test2", img_threshold);
	//cv::waitKey(0);

	element = getStructuringElement(cv::MORPH_RECT, cv::Size_<float>(18 * width_scale_size, 2.0)); //�̹������� �ִ��� �� ���θ� ���� �� �ְ� ó����.													
	cv::morphologyEx(img_threshold, img_threshold, cv::MORPH_CLOSE, element); //Does the trick

	//cv::imshow("test3", img_threshold);
	//cv::waitKey(0);

	std::vector< std::vector< cv::Point> > contours;
	cv::findContours(img_threshold, contours, cv::RETR_EXTERNAL, cv::CHAIN_APPROX_NONE);
	std::vector<std::vector<cv::Point>> contours_poly(contours.size());

	for (int i = 0; i < contours.size(); i++)
		if (contours[i].size() > 100)
		{
			cv::approxPolyDP(cv::Mat(contours[i]), contours_poly[i], 3, true);
			cv::Rect appRect(boundingRect(cv::Mat(contours_poly[i])));
			if (appRect.width > appRect.height && appRect.height > 10)
				boundRect.push_back(appRect);
		}

	return boundRect;
}


void scaleBoundingBoxSize(std::vector<cv::Rect> &letterBBoxes1, int cols, int rows, int input_width, int input_height) {

	const int standard_width = 400;
	const int standard_height = 250;
	int inputImage_width = input_width;
	int inputImage_height = input_height;

	//letterBox�� ��� ����, ���̿� ���缭
	//todo: �ڽ�ũ�⿡ ���� �¿� ũ�� ����
	//ũ�Ⱑ 0�� ���� �ʵ��� ����


	////
	int min_distance_between_rectangle = inputImage_height;
	for (int i = 0; i < letterBBoxes1.size(); i++) {
		for(int j = i+1; j<letterBBoxes1.size(); j++){
			//
			if ((letterBBoxes1[i].x <= letterBBoxes1[j].x) && (letterBBoxes1[j].x <= (letterBBoxes1[i].x + letterBBoxes1[i].width))
				&& !isRectangleOverlap(letterBBoxes1[i], letterBBoxes1[j])
				&& ((letterBBoxes1[i].y - (letterBBoxes1[j].y + letterBBoxes1[j].height)) < min_distance_between_rectangle)) {
				min_distance_between_rectangle = letterBBoxes1[i].y - (letterBBoxes1[j].y + letterBBoxes1[j].height);
				//std::cout << i<<":" << letterBBoxes1[i] << " " << j << ":" << letterBBoxes1[j] << ":" << min_distance_between_rectangle << std::endl;
				break;//�̹� bbox�� ���ĵǾ� �ִ� �����̹Ƿ� �̶��� ���� letterBBoxes1[i]�� ����� �簢��
			}
		}
	}
	
	int x_margin = 10 * (inputImage_width / standard_width);
	int y_margin = min_distance_between_rectangle + 2;


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
	char DirName[256];  //������ ���ʸ� �̸�
	char* p = Path;     //���ڷ� ���� ���丮
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
	hp = FindFirstFile(fileFound, &info); //���丮�� ������ �ִ��� ù��° ���ϸ�.
	do{
		sprintf_s(fileFound, "%s\\%s", folderPath, info.cFileName);
		DeleteFile(fileFound);
	} while (FindNextFile(hp, &info));  //�ٸ� ������ ������ ����

	FindClose(hp);
}

bool prepareDirectory(char* dirName) {
	if (NULL == dirName) {
		return false;
	}

	if ((_access(dirName, 0)) != -1) {
		DeleteAllFiles(dirName); //�����Ѵٸ� ���ο� �����ϴ� ���� ����
	}
	else {
		createDir(dirName);
	}
}
