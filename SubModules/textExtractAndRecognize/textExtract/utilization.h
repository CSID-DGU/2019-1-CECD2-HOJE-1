#pragma once
#include <opencv2\opencv.hpp>
#include <vector>
#include <math.h>
#include <algorithm>

std::vector<cv::Rect> detectLetters(cv::Mat img)
{
	std::vector<cv::Rect> boundRect;
	cv::Mat img_sobel, img_threshold, element;
	const int standard_width = 400;
	const int standard_height = 250;
	// 기준 width, cols : 400 ,  height,rows : 250
	float scale_size = 1.0f;

	int inputImage_width = img.cols;
	int inputImage_height = img.rows;

	if (inputImage_width > inputImage_height) {
		scale_size = (float)inputImage_width / (float)standard_width;
	}
	else {
		scale_size = (float)inputImage_height / (float)standard_height;
	}

	cv::Sobel(img, img_sobel, CV_8U, 1, 0, 3, 1, 0, cv::BORDER_DEFAULT);
	cv::threshold(img_sobel, img_threshold, 0, 255, cv::THRESH_OTSU + cv::THRESH_BINARY);
	element = getStructuringElement(cv::MORPH_RECT, cv::Size(17 * scale_size, 9 * scale_size)); //size(15,15) -> size(15, 4) -> 현재 size(17,8) * scale_size 조금씩 조절 (17,9)
	cv::morphologyEx(img_threshold, img_threshold, cv::MORPH_CLOSE, element); //Does the trick
	std::vector< std::vector< cv::Point> > contours;
	cv::findContours(img_threshold, contours, 0, 1);
	std::vector<std::vector<cv::Point> > contours_poly(contours.size());

	for (int i = 0; i < contours.size(); i++)
		if (contours[i].size() > 100)
		{
			cv::approxPolyDP(cv::Mat(contours[i]), contours_poly[i], 3, true);
			cv::Rect appRect(boundingRect(cv::Mat(contours_poly[i])));
			if (appRect.width > appRect.height)
				boundRect.push_back(appRect);
		}

	return boundRect;
}


void scaleBoundingBoxSize(std::vector<cv::Rect> &letterBBoxes1, int cols, int rows) {
	const int x_margin = 10;
	const int y_margin = 10;

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

	for (int i = 0; i < width; i++){
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
	
	//cv::Point2f tl = ptr[getMinIndex(PointSum, sizeof(PointSum) / sizeof(float))];
	//cv::Point2f tr = ptr[getMaxIndex(PointSub, sizeof(PointSub) / sizeof(float))];
	//cv::Point2f br = ptr[getMaxIndex(PointSum, sizeof(PointSum) / sizeof(float))];
	//cv::Point2f bl = ptr[getMinIndex(PointSub, sizeof(PointSub) / sizeof(float))];

	//std::vector<cv::Point> vert{bl, tl, tr, br};

	//roiBox = cv::Mat(vert);
	//cv::Mat orderPointArr[4];
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
	cv::warpPerspective(warped, img, M, cv::Size(originWidth, originHeight),1, cv::BORDER_TRANSPARENT);//, cv::WARP_INVERSE_MAP, 

	return img;
}