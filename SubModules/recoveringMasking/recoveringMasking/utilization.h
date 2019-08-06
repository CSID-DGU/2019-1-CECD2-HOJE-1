#pragma once
#include <opencv2\opencv.hpp>
#include <vector>
#include <math.h>
#include <algorithm>
#include <string>
#include <sstream>
#include <iostream>
#include <fstream>
#include <iterator>
#include "json/json.h"

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
	cv::warpPerspective(warped, img, M, cv::Size(originWidth, originHeight), 1, cv::BORDER_TRANSPARENT);//, cv::WARP_INVERSE_MAP, 

	return img;
}

std::string replace_all(const std::string &message,  const std::string &pattern,  const std::string &replace)
{
	std::string result = message;
	std::string::size_type pos = 0;
	std::string::size_type offset = 0;

	while ((pos = result.find(pattern, offset)) != std::string::npos)
	{
		result.replace(result.begin() + pos, result.begin() + pos + pattern.size(), replace);
		offset = pos + replace.size();
	}

	return result;
}


std::vector<std::string> stringProcess(std::string &inputString){
	
	std::string sentence = replace_all(inputString, " ", "");
	sentence = replace_all(sentence, "\r\n", " ");
	sentence = replace_all(sentence, "\r", " ");
	sentence = replace_all(sentence, "\n", " ");

	std::istringstream iss(sentence);

	std::vector<std::string> wordsVector{ std::istream_iterator<std::string>{iss}, std::istream_iterator<std::string>{} };
	
	//for (int i = 0; i < wordsVector.size(); i++){
	//	std::cout << wordsVector[i] << std::endl;
	//}

	return wordsVector;
}

bool readFromFile(const char* filename, char* buffer, int len) {
	std::FILE *fp = nullptr;
	fopen_s(&fp, filename, "rb");

	if (fp == nullptr) {
		std::cout << "errorCode3: Read RexFile error " << filename << std::endl;
		return false;
	}

	std::size_t fileSize = fread(buffer, 1, len, fp);
		
	fclose(fp);

	return true;
}

bool makeBoxToJsonFile(std::vector<cv::Rect>& rectList, cv::Mat& roiBox, std::string& fileName) {
	Json::Value root;
	root["roiBox"];

	Json::Value roiRegion;
	/*std::cout << roiBox << std::endl;*/
	
	cv::Point2f row0 = cv::Point2f(roiBox.row(0));
	cv::Point2f row1 = cv::Point2f(roiBox.row(1));
	cv::Point2f row2 = cv::Point2f(roiBox.row(2));
	cv::Point2f row3 = cv::Point2f(roiBox.row(3));

	roiRegion["row0_x"] = row0.x;
	roiRegion["row0_y"] = row0.y;

	roiRegion["row1_x"] = row1.x;
	roiRegion["row1_y"] = row1.y;

	roiRegion["row2_x"] = row2.x;
	roiRegion["row2_y"] = row2.y;

	roiRegion["row3_x"] = row3.x;
	roiRegion["row3_y"] = row3.y;

	root["roiBox"].append(roiRegion);

	root["boxFile"];
	for (int i = 0;  i<rectList.size(); i++){
		Json::Value attribute;

		attribute["width"] = rectList[i].width;
		attribute["height"] = rectList[i].height;
		attribute["x_pos"] = rectList[i].x;
		attribute["y_pos"] = rectList[i].y;

		root["boxFile"].append(attribute);
	}

	//std::cout << root << std::endl;
	//system("pause");

	//std::cout << root << std::endl;
	Json::StyledStreamWriter writer;
	
	//std::string str = writer.write(root);
	//std::cout << str << std::endl;
	std::ofstream file_id;
	file_id.open(".\\Masking_data\\" + fileName + ".mask" + ".txt");

	writer.write(file_id, root);

	file_id.close();	

	return true;
}


std::vector<cv::Rect> loadBoxJsonFile(std::string fileName, cv::Mat& roi){
	
	const int BufferLength = 4096;
	char readBuffer[BufferLength] = { 0, };
	std::vector<cv::Rect> maskingRectList;
	//경로 설정
	std::string filePath = ".\\Masking_data\\" + fileName + ".txt";
	if (readFromFile(filePath.c_str(), readBuffer, BufferLength) == false) {
		std::cout << "errorCode1: file read error" << std::endl;
		return maskingRectList;
	}

	std::string config_doc = readBuffer;
	Json::Value root;
	Json::Reader reader;
	bool parsingSuccessful = reader.parse(config_doc, root);

	if (parsingSuccessful == false) {
		std::cout << "errorCode2: Failed to parse configuration\n" << reader.getFormatedErrorMessages();
		return maskingRectList;
	}

	const Json::Value list = root["boxFile"];

	for (int i = 0; i < list.size(); i++){
		cv::Rect rect(list[i]["x_pos"].asFloat(), list[i]["y_pos"].asFloat(), list[i]["width"].asFloat(), list[i]["height"].asFloat());
		
		maskingRectList.push_back(rect);
	}


	//for(int i = 0; i<maskingRectList.size(); i++){
	//	std::cout << maskingRectList[i] << std::endl;
	//}

	const Json::Value roiBox = root["roiBox"];

	//cv::Point2f row0 = cv::Point2f(roiBox[0]["row0_x"].asFloat(), roiBox[0]["row0_y"].asFloat());
	//cv::Point2f row1 = cv::Point2f(roiBox[0]["row1_x"].asFloat(), roiBox[0]["row1_y"].asFloat());
	//cv::Point2f row2 = cv::Point2f(roiBox[0]["row2_x"].asFloat(), roiBox[0]["row2_y"].asFloat());
	//cv::Point2f row3 = cv::Point2f(roiBox[0]["row3_x"].asFloat(), roiBox[0]["row3_y"].asFloat());

	//std::vector<cv::Point2f> point2fList{ row0, row1, row2, row3 };
	
	//cv::Mat roiBoxMat(point2fList);
	
	cv::Mat roiBoxMat = (cv::Mat_<float>(4, 2) << roiBox[0]["row0_x"].asFloat(), roiBox[0]["row0_y"].asFloat(),
												roiBox[0]["row1_x"].asFloat(), roiBox[0]["row1_y"].asFloat(),
												roiBox[0]["row2_x"].asFloat(), roiBox[0]["row2_y"].asFloat(),
												roiBox[0]["row3_x"].asFloat(), roiBox[0]["row3_y"].asFloat());
	roi = roiBoxMat;
	//std::cout << roiBoxMat << std::endl;


	return maskingRectList;
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
