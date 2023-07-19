#include "opencv2/opencv.hpp"

#include "preprocess.h"
#include "utilization.h"

using namespace std;
using namespace cv;

int main(int argc, char** argv)
{
	if (argc != 2) {
		cout << "error 400 : argument error(.exe imagePath)" << endl;
		return 0;
	}

	//Read
	std::string input_name(argv[1]);
	std::string ext = input_name.substr(input_name.find_last_of("."), 4);
	std::string pureInput_name = splitPath(input_name, '\\');

	pureInput_name = pureInput_name.erase(pureInput_name.find_last_of("."), 4);
	input_name = input_name.erase(input_name.find_last_of("."), 4);

	std::string savePath("C:\\Users\\GIGABYTE\\Desktop\\front\\Front-End\\subImage");
	char c_savePath[52] = "C:\\Users\\GIGABYTE\\Desktop\\front\\Front-End\\subImage";

	prepareDirectory(c_savePath);
	
	Preprocess p_tool;

	//원본 이미지
	cv::Mat img = cv::imread(input_name + ext);
	Mat edged;
	cv::cvtColor(img, edged, COLOR_BGR2GRAY);
	cv::GaussianBlur(edged, edged, cv::Size(7, 7), 0);
	cv::GaussianBlur(edged, edged, cv::Size(7, 7), 0);

	cv::Canny(edged, edged, 30, 75);

	cv::Mat rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(3, 3));
	cv::dilate(edged, edged, rect_kernel, Point(-1, -1), 5);
	rect_kernel = cv::getStructuringElement(cv::MORPH_CROSS, cv::Size(3, 3));
	cv::erode(edged, edged, rect_kernel, Point(-1, -1), 5);

	cv::copyMakeBorder(img, img, 1, 1, 1, 1, cv::BORDER_CONSTANT, Scalar(0, 0, 0));
	cv::copyMakeBorder(edged, edged, 1, 1, 1, 1, cv::BORDER_CONSTANT, Scalar(1, 1, 1));
	
	vector<vector<Point>> contours;
	cv::findContours(edged, contours, cv::RETR_TREE, cv::CHAIN_APPROX_SIMPLE);
	int height = edged.rows;
	int width = edged.cols;

	const long MAX_COUNTOUR_AREA = (width - 10) * (height - 10);
	long maxAreaFound = MAX_COUNTOUR_AREA * 0.45;

	vector<Mat> rectList;

	for (size_t i = 0; i < contours.size(); i++) {
		RotatedRect box = cv::minAreaRect(contours[i]);
		Mat boxPts; // bottom left, top left, top right, bottom right;
		boxPoints(box, boxPts);

		if (cv::contourArea(contours[i]) <= maxAreaFound)
			continue;
				
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

	if (rectList.size() == 1)
		roiBox = rectList[0];
	else
		roiBox = rectList[1];

	Mat warped = four_point_transform(img, roiBox);

	Mat roiImg;
	roiImg = p_tool.GS_rgb2gray(warped); // 변환 등을 적용하기 위해서 grayscale로 변환
	roiImg = p_tool.GS_topHat(~roiImg, MorphShapes::MORPH_CROSS, 5, 3);
	roiImg = ~p_tool.GS_threshold(roiImg, 150, THRESH_OTSU);
	roiImg = p_tool.removeDotNoise(~roiImg, 5);
	roiImg = p_tool.GS_add_image(roiImg, p_tool.findTable(roiImg, 10));// Erosion, Dilation - 표 선분 제거 9

	//Detect
	std::vector<cv::Rect> letterBBoxes1 = detectLetters(roiImg);
	letterBBoxes1 = mergeLettersBox(letterBBoxes1);
	std::reverse(letterBBoxes1.begin(), letterBBoxes1.end());
	scaleBoundingBoxSize(letterBBoxes1, roiImg.cols, roiImg.rows, warped.cols, warped.rows);
	
	//텍스트 추출 이후 노이즈 제거
	roiImg = p_tool.removeDotNoise(~roiImg, 4 + 2 * (roiImg.cols / 400));
	
	//cout << roiImg.size() << endl;
	vector<Mat> subImage;
	for (int i = 0; i < letterBBoxes1.size(); i++) {		
		subImage.push_back(roiImg(letterBBoxes1[i]));
	}

	for (int i = 0; i < subImage.size(); i++) {
		imwrite(savePath+ "\\" + pureInput_name + "_" + to_string(i) + ".jpg", subImage[i]);
	}

	cout << "code:200 subImage crop complete"  << endl;
	//system("pause");
	return 0;
}