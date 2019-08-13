#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <WinSock2.h>
#pragma comment(lib, "WS2_32.lib")
#include <tesseract/baseapi.h>
#include <leptonica/allheaders.h>

#include "opencv2/opencv.hpp"

#include "preprocess.h"
#include "utilization.h"

using namespace std;
using namespace cv;

int main(int argc, char** argv)
{
	//Read
	std::string input_name(argv[1]);
	std::string ext = input_name.substr(input_name.find_last_of("."), 4);
	input_name = input_name.erase(input_name.find_last_of("."), 4);

	//Mat image[10], temp;
	Preprocess p_tool;

	//원본 이미지
	//cv::Mat img = cv::imread("registCard(rot).jpg");
	cv::Mat img = cv::imread(input_name + ext);
	vector<Mat> imageProcessing;
	imageProcessing.push_back(img);
	Mat edged;
	cv::cvtColor(img, edged, COLOR_BGR2GRAY);
	imageProcessing.push_back(edged);
	cv::GaussianBlur(edged, edged, cv::Size(7, 7), 0);
	imageProcessing.push_back(edged);
	cv::copyMakeBorder(img, img, 5, 5, 5, 5, cv::BORDER_CONSTANT, Scalar(0, 0, 0));
	cv::copyMakeBorder(edged, edged, 5, 5, 5, 5, cv::BORDER_CONSTANT, Scalar(0, 0, 0));
	//imageProcessing.push_back(edged);
	cv::Canny(edged, edged, 30, 50);
	//imageProcessing.push_back(edged);
	//cv::Canny(edged, edged, 50, 100); //original
	
	cv::Mat rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(3, 3));
	cv::dilate(edged, edged, rect_kernel, Point(-1,-1), 1);
	cv::dilate(edged, edged, rect_kernel, Point(-1, -1), 1);
	
	rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(3, 3));
	cv::erode(edged, edged, rect_kernel, Point(-1, -1), 1);
	cv::erode(edged, edged, rect_kernel, Point(-1, -1), 1);
	
	imageProcessing.push_back(edged);

	vector<vector<Point>> contours;
	cv::findContours(edged, contours, cv::RETR_TREE, cv::CHAIN_APPROX_SIMPLE);
	
	int height = edged.rows;
	int width = edged.cols;

	const long MAX_COUNTOUR_AREA = (width - 10) * (height - 10);
	long maxAreaFound = MAX_COUNTOUR_AREA * 0.3;//0.3; orignial

	vector<Mat> rectList;

	for (size_t i = 0; i < contours.size(); i++) {
		if (cv::contourArea(contours[i]) <= maxAreaFound)
			continue;

		RotatedRect box = cv::minAreaRect(contours[i]);
		Mat boxPts; // bottom left, top left, top right, bottom right;
		boxPoints(box, boxPts);

		if (rectList.size() == 0) {
			rectList.push_back(boxPts);
		}
		else {
			int count = 0;
			int listLenth = rectList.size();
			bool isNotSameArea = true;

			for (int i = 0; i < listLenth; i++) {
				if (0.99 * cv::contourArea(rectList[i]) <= cv::contourArea(boxPts)
					&& cv::contourArea(boxPts) <= 1.01 * cv::contourArea(rectList[i])) {
					isNotSameArea = false;
					break;
				}
			}

			if (isNotSameArea)
				rectList.push_back(boxPts);
		}
	}

	sort(rectList.begin(), rectList.end(), compareArea);
	
	Mat roiBox;
	
	cout << rectList.size() << endl;
	
	for (int i = 0; i < rectList.size(); i++) {
		cout << rectList[i] << ",";
	}
	cout << endl;

	if (rectList.size() == 1)
		roiBox = rectList[0];
	else
		roiBox = rectList[1];
	
	Mat warped = four_point_transform(img, roiBox);
	
	imshow("warped result", warped);
	waitKey(0);

	Mat roiImg;
	roiImg = p_tool.GS_rgb2gray(warped); // 변환 등을 적용하기 위해서 grayscale로 변환
	imageProcessing.push_back(roiImg);
	roiImg = p_tool.GS_topHat(~roiImg, MorphShapes::MORPH_CROSS, 5, 3);
	imageProcessing.push_back(roiImg);

	roiImg = ~p_tool.GS_threshold(roiImg, 150, THRESH_OTSU);
	imageProcessing.push_back(roiImg);

	roiImg = p_tool.removeDotNoise(~roiImg, 5);
	imageProcessing.push_back(roiImg);

	roiImg = p_tool.GS_add_image(roiImg, p_tool.findTable(roiImg, 9));// Erosion, Dilation - 표 선분 제거
	imageProcessing.push_back(roiImg);


	for (int i = 0; i < imageProcessing.size(); i++) {
		imshow(to_string(i), imageProcessing[i]);
	}
	waitKey(0);

	//Detect
	std::vector<cv::Rect> letterBBoxes1 = detectLetters(roiImg);
	letterBBoxes1 = mergeLettersBox(letterBBoxes1);
	std::reverse(letterBBoxes1.begin(), letterBBoxes1.end());
	scaleBoundingBoxSize(letterBBoxes1, roiImg.cols, roiImg.rows, img.cols, img.rows);

	vector<Mat> subImage;
	for (int i = 0; i < letterBBoxes1.size(); i++) {
		subImage.push_back(roiImg(letterBBoxes1[i]));
	}

	for (int i = 0; i < subImage.size(); i++) {
		imshow("sub" + to_string(i), subImage[i]);
	}
	waitKey(0);


	// tesseract OCR Start
	char lang[] = "kor";
	tesseract::TessBaseAPI tess;
	tess.Init(NULL, lang);

	//tess.SetPageSegMode(tesseract::PSM_SINGLE_COLUMN);
	tess.SetPageSegMode(tesseract::PSM_SINGLE_LINE);
	system("chcp 65001");
	
	for (int i = 0; i < subImage.size(); i++) {
		tess.SetImage((uchar*)subImage[i].data, subImage[i].size().width, subImage[i].size().height, subImage[i].channels(), subImage[i].step1());
		tess.Recognize(0);
		string outtext(tess.GetUTF8Text());

		std::cout << outtext << std::endl;
	}

	system("pause");
	return 0;
}