#define _WINSOCK_DEPRECATED_NO_WARNINGS
#pragma comment(lib, "WS2_32.lib")
#pragma warning(disable: 4996)

#include <WinSock2.h>
#include <tesseract/baseapi.h>
#include <leptonica/allheaders.h>

#include "opencv2/opencv.hpp"

#include <iostream>
#include <string>
#include <regex>
#include "json/json.h"

#include "preprocess.h"
#include "utilization.h"

using namespace std;
using namespace cv;

int main(int argc, char** argv)
{
	if (argc != 3) {
		cout << "errorCode0: incomplete parameter";
		return 0;
	}

	if (strcmp(argv[2], "masking")!=0 && strcmp(argv[2], "unmasking") != 0){
		cout << "errorCode0: parameter value incorrect";
		return 0;
	}

	int mode;
	if (strcmp(argv[2], "masking") == 0) {
		mode = 0;
	}else {
		mode = 1;
	}
	
	//Read
	std::string input_name(argv[1]);
	std::string ext = input_name.substr(input_name.find_last_of("."), 4);
	std::string pureInput_name = splitPath(input_name, '\\');

	pureInput_name = pureInput_name.erase(pureInput_name.find_last_of("."), 4);
	input_name = input_name.erase(input_name.find_last_of("."), 4);

	Preprocess p_tool;
	/*input_name = "registCard(rot)";
	ext = ".jpg";*/
	//원본 이미지
	cv::Mat img = cv::imread(input_name + ext);
	
	if (mode == 0) {
		//vector<Mat> imageProcessing;

		Mat edged;
		cv::cvtColor(img, edged, COLOR_BGR2GRAY);
		//imageProcessing.push_back(edged);
		cv::GaussianBlur(edged, edged, cv::Size(7, 7), 0);
		//imageProcessing.push_back(edged);
		cv::copyMakeBorder(img, img, 5, 5, 5, 5, cv::BORDER_CONSTANT, Scalar(0, 0, 0));
		cv::copyMakeBorder(edged, edged, 5, 5, 5, 5, cv::BORDER_CONSTANT, Scalar(0, 0, 0));
		//imageProcessing.push_back(edged);
		cv::Canny(edged, edged, 50, 100);

		//imageProcessing.push_back(edged);

		vector<vector<Point>> contours;
		cv::findContours(edged, contours, cv::RETR_TREE, cv::CHAIN_APPROX_SIMPLE);
		int height = edged.rows;
		int width = edged.cols;

		const long MAX_COUNTOUR_AREA = (width - 10) * (height - 10);
		long maxAreaFound = MAX_COUNTOUR_AREA * 0.3;

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

		if (rectList.size() == 1)
			roiBox = rectList[0];
		else
			roiBox = rectList[1];

		Mat warped = four_point_transform(img, roiBox);
		//cv::imshow("warped result", warped);
		//cv::waitKey(0);

		Mat roiImg;
		roiImg = p_tool.GS_rgb2gray(warped); // 변환 등을 적용하기 위해서 grayscale로 변환
		//imageProcessing.push_back(roiImg);
		roiImg = p_tool.GS_topHat(~roiImg, MorphShapes::MORPH_CROSS, 5, 3);
		//imageProcessing.push_back(roiImg);
		roiImg = ~p_tool.GS_threshold(roiImg, 150, THRESH_OTSU);
		//imageProcessing.push_back(roiImg);

		roiImg = p_tool.removeDotNoise(~roiImg);
		//imageProcessing.push_back(roiImg);

		roiImg = p_tool.GS_add_image(roiImg, p_tool.findTable(roiImg, 9));// Erosion, Dilation - 표 선분 제거
		//imageProcessing.push_back(roiImg);

		//for (int i = 0; i < imageProcessing.size(); i++) {
		//	cv::imshow(to_string(i), imageProcessing[i]);
		//}
		//cv::waitKey(0);

		//Detect
		std::vector<cv::Rect> letterBBoxes1 = detectLetters(roiImg);
		scaleBoundingBoxSize(letterBBoxes1, roiImg.cols, roiImg.rows);


		vector<Mat> subImage;
		for (int i = 0; i < letterBBoxes1.size(); i++) {
			subImage.push_back(roiImg(letterBBoxes1[i]));
		}

		const int BufferLength = 4096;
		char readBuffer[BufferLength] = { 0, };


		//*******************************************************************************//
		//		정규표현식 경로 재설정 (일렉트론에서 사용하는 정규표현식 경로로			 //
		//*******************************************************************************//
		
		if (readFromFile(".\\reg\\reg.json", readBuffer, BufferLength) == false) {
			cout << "read error" << endl;
			return 0;
		}

		string config_doc = readBuffer;
		Json::Value root;
		Json::Reader reader;
		bool parsingSuccessful = reader.parse(config_doc, root);

		if (parsingSuccessful == false)
		{
			std::cout << "error3: Failed to parse configuration\n" << reader.getFormatedErrorMessages();
			return 0;
		}

		const Json::Value list = root["reg"];



		char lang[] = "kor";
		tesseract::TessBaseAPI tess;
		tess.Init(NULL, lang);

		//std::system("chcp 65001");
		vector<Rect> subImageRectList;
		
		int puzzlePixelSize = 5; //default 5 * scale
		int puzzleCount = 2;

		if (img.cols <= 400) {
			puzzlePixelSize = 5;
			puzzleCount = 2;
		}else {
			puzzlePixelSize = 5 * (img.cols / 400);
			puzzleCount = 2 * (img.cols / 400);
		}

		//cout << puzzlePixelSize << endl;
		//cout << puzzleCount << endl;
		//system("pause");
		for (int subImageIndex = 0; subImageIndex < subImage.size(); subImageIndex++) {
			tess.SetImage((uchar*)subImage[subImageIndex].data, subImage[subImageIndex].size().width, subImage[subImageIndex].size().height, subImage[subImageIndex].channels(), subImage[subImageIndex].step1());
			tess.Recognize(0);

			string outtext(tess.GetUTF8Text());

			vector<string> outtextSplit;
			//outtext의 공백 제거
			outtextSplit = stringProcess(outtext);
			for (int splitTextIndex = 0; splitTextIndex < outtextSplit.size(); splitTextIndex++) {

				for (int listIndex = 0; listIndex < list.size(); listIndex++) {
					regex pattern(list[listIndex]["value"].asString());
					if (regex_match(outtextSplit[splitTextIndex], pattern)) {
						//cout << "masking!" + outtextSplit[splitTextIndex] << endl;
						subImageRectList.push_back(letterBBoxes1[subImageIndex]);
						// 픽셀 위치 섞기 알고리즘 생각해보기
						for (int i = 0; i < letterBBoxes1[subImageIndex].height; i += puzzlePixelSize) {
							for (int j = 0; j < letterBBoxes1[subImageIndex].width; j += puzzlePixelSize) {

								//추출 픽셀 가져오기
								vector<vector<Vec3b>> matrix;
								for (int h = 0; h < puzzlePixelSize; h++) {
									vector<Vec3b> temp;
									for (int w = 0; w < puzzlePixelSize; w++) {
										temp.push_back(warped.at<cv::Vec3b>(letterBBoxes1[subImageIndex].y + i + h, letterBBoxes1[subImageIndex].x + j + w));
									}
									matrix.push_back(temp);
								}
															   
								//위왼위왼 섞기
								for(int pc = 0; pc < puzzleCount; pc++)
								{
									//위로 섞기
									vector<Vec3b>temp = matrix[0];
									for (int up = 0; up < puzzlePixelSize-1; up++) {
										matrix[up] = matrix[up + 1];
									}
									matrix[puzzlePixelSize-1] = temp;


									//왼쪽 섞기
									vector<Vec3b> mostLeftTemp;
									for (int pixelheight = 0; pixelheight < puzzlePixelSize; pixelheight++) {
										mostLeftTemp.push_back(matrix[pixelheight][0]);
									}
									for (int left = 0; left < puzzlePixelSize-1; left++) {
										for (int pixelheight = 0; pixelheight < puzzlePixelSize; pixelheight++) {
											matrix[pixelheight][left] = matrix[pixelheight][left + 1];
										}
									}
									for (int pixelheight = 0; pixelheight < puzzlePixelSize; pixelheight++) {
										matrix[pixelheight][puzzlePixelSize-1] = mostLeftTemp[pixelheight];
									}

									////위로 섞기
									//temp = matrix[0];
									//for (int up = 0; up < 4; up++) {
									//	matrix[up] = matrix[up + 1];
									//}
									//matrix[4] = temp;

									//mostLeftTemp.clear();
									//for (int pixelheight = 0; pixelheight < 5; pixelheight++) {
									//	mostLeftTemp.push_back(matrix[pixelheight][0]);
									//}
									//for (int left = 0; left < 4; left++) {
									//	for (int pixelheight = 0; pixelheight < 5; pixelheight++) {
									//		matrix[pixelheight][left] = matrix[pixelheight][left + 1];
									//	}
									//}
									//for (int pixelheight = 0; pixelheight < 5; pixelheight++) {
									//	matrix[pixelheight][4] = mostLeftTemp[pixelheight];
									//}

									//// 180도 회전 (rgb는 회전 안한 상태 테스트)
									//for (int externalVectorIndex = 0; externalVectorIndex < matrix.size(); externalVectorIndex++) {
									//	reverse(matrix[externalVectorIndex].begin(), matrix[externalVectorIndex].end());
									//}
									//reverse(matrix.begin(), matrix.end());
								}


								//대입하기
								for (int h = 0; h < puzzlePixelSize; h++) {
									for (int w = 0; w < puzzlePixelSize; w++) {
										warped.at<cv::Vec3b>(letterBBoxes1[subImageIndex].y + i + h, letterBBoxes1[subImageIndex].x + j + w) = matrix[h][w];
									}
								}

							}
						}

					}
				}
			}

		}

		Mat reverseWarped = four_point_transform_reverse(img, warped, roiBox);

		//cv::imshow("reverseWarped", reverseWarped);
		//cv::waitKey(0);
		
		cv::Rect rect(Point(5, 5), Point(img.cols - 5, img.rows - 5));
		cv::imwrite(input_name + ".mask"+ext, reverseWarped(rect));
		makeBoxToJsonFile(subImageRectList, roiBox, pureInput_name);
		//subImageRectList 저장해야함

		//원본파일 삭제
		if (remove((input_name + ext).c_str()) != 0) {
			cout << "errorCode5: Error deleting file" << endl;
		}		
		
		cout << "code1: Success Masking";
	}
	else {
		//rect을 파일형태로 저장하여야 함.
		//img = cv::imread(input_name + "_masking.jpg");
		//vector<Mat> imageProcessing;

		cv::copyMakeBorder(img, img, 5, 5, 5, 5, cv::BORDER_CONSTANT, Scalar(0, 0, 0));

		Mat roiBox;

		std::vector<cv::Rect> letterBBoxes1 = loadBoxJsonFile(pureInput_name, roiBox); //json에서 읽어와서 box list 정의


		Mat warped = four_point_transform(img, roiBox);

		/*cv::imshow("result", warped);
		cv::waitKey(0);*/

		int puzzlePixelSize = 5; //default 5 * scale
		int puzzleCount = 2;

		if (img.cols <= 400) {
			puzzlePixelSize = 5;
			puzzleCount = 2;
		}
		else {
			puzzlePixelSize = 5 * (img.cols / 400);
			puzzleCount = 2 * (img.cols / 400);
		}

		for (int boxindex = 0; boxindex < letterBBoxes1.size(); boxindex++) {


			for (int i = 0; i < letterBBoxes1[boxindex].height; i += puzzlePixelSize) {
				for (int j = 0; j < letterBBoxes1[boxindex].width; j += puzzlePixelSize) {

					//추출 픽셀 가져오기
					vector<vector<Vec3b>> matrix;
					for (int h = 0; h < puzzlePixelSize; h++) {
						vector<Vec3b> temp;
						for (int w = 0; w < puzzlePixelSize; w++) {
							temp.push_back(warped.at<cv::Vec3b>(letterBBoxes1[boxindex].y + i + h, letterBBoxes1[boxindex].x + j + w));
						}
						matrix.push_back(temp);
					}

					//cout << puzzlePixelSize << endl;
					//cout << puzzleCount << endl;
					//system("pause");
					//위왼위왼 섞기 -> 복호화 아래 오른 아래 오른
					for (int pc = 0; pc < puzzleCount; pc++)
					{
						//아래
						vector<Vec3b>temp = matrix[puzzlePixelSize-1];
						for (int down = puzzlePixelSize-1; down >= 1; down--) {
							matrix[down] = matrix[down - 1];
						}
						matrix[0] = temp;


						//오른쪽
						vector<Vec3b> mostRightTemp;
						for (int pixelheight = 0; pixelheight < puzzlePixelSize; pixelheight++) {
							mostRightTemp.push_back(matrix[pixelheight][puzzlePixelSize-1]);
						}

						for (int right = puzzlePixelSize-1; right >= 1; right--) {
							for (int pixelheight = 0; pixelheight < puzzlePixelSize; pixelheight++) {
								matrix[pixelheight][right] = matrix[pixelheight][right - 1];
							}
						}

						for (int pixelheight = 0; pixelheight < puzzlePixelSize; pixelheight++) {
							matrix[pixelheight][0] = mostRightTemp[pixelheight];
						}

						////위로 섞기
						//temp = matrix[4];
						//for (int down = 4; down >= 1; down--) {
						//	matrix[down] = matrix[down - 1];
						//}
						//matrix[0] = temp;

						////오른쪽
						//mostRightTemp.clear();
						//for (int pixelheight = 0; pixelheight < 5; pixelheight++) {
						//	mostRightTemp.push_back(matrix[pixelheight][4]);
						//}

						//for (int right = 4; right >= 1; right--) {
						//	for (int pixelheight = 0; pixelheight < 5; pixelheight++) {
						//		matrix[pixelheight][right] = matrix[pixelheight][right - 1];
						//	}
						//}

						//for (int pixelheight = 0; pixelheight < 5; pixelheight++) {
						//	matrix[pixelheight][0] = mostRightTemp[pixelheight];
						//}

						//// 180도 회전 (rgb는 회전 안한 상태 테스트)
						//for (int externalVectorIndex = 0; externalVectorIndex < matrix.size(); externalVectorIndex++) {
						//	reverse(matrix[externalVectorIndex].begin(), matrix[externalVectorIndex].end());
						//}
						//reverse(matrix.begin(), matrix.end());
					}
					
					//대입하기
					for (int h = 0; h < puzzlePixelSize; h++) {
						for (int w = 0; w < puzzlePixelSize; w++) {
							warped.at<cv::Vec3b>(letterBBoxes1[boxindex].y + i + h, letterBBoxes1[boxindex].x + j + w) = matrix[h][w];
						}
					}

				}
			}
		}

		//cv::imshow("result", warped);
		//cv::waitKey(0);

		Mat reverseWarped = four_point_transform_reverse(img, warped, roiBox);

		cv::Rect rect(Point(5, 5), Point(img.cols - 5, img.rows - 5));
		input_name = input_name.erase(input_name.find_last_of("."), 5);
		cv::imwrite(input_name + ext, reverseWarped(rect));
		
		if (remove((input_name + ".mask" + ext).c_str()) != 0) {
			cout << "errorCode5: Error deleting file" << endl;
		}

		cout << "code2: Success De-Masking";
	}

	return 0;
}