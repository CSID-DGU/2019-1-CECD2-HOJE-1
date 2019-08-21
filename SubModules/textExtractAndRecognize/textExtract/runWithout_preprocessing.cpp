#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <WinSock2.h>
#pragma comment(lib, "WS2_32.lib")
#include <tesseract/baseapi.h>
#include <leptonica/allheaders.h>

#include "opencv2/opencv.hpp"

#include "preprocess.h"
#include "utilization.h"
#include <ctime>

using namespace std;
using namespace cv;

int main(int argc, char** argv)
{
	//Read
	std::string input_name(argv[1]);
	std::string ext = input_name.substr(input_name.find_last_of("."), 4);
	input_name = input_name.erase(input_name.find_last_of("."), 4);
	//원본 이미지
	//cv::Mat img = cv::imread("registCard(rot).jpg");
	cv::Mat img = cv::imread(input_name + ext);
	
	// tesseract OCR Start
	char lang[] = "eng";
	tesseract::TessBaseAPI tess;
	//tess.Init(NULL, lang);
	tess.Init(NULL, lang, tesseract::OEM_DEFAULT);
	tess.SetPageSegMode(tesseract::PSM_SINGLE_BLOCK);
	system("chcp 65001");
	tess.SetImage((uchar*)img.data, img.size().width, img.size().height, img.channels(), img.step1());
	tess.Recognize(0);
	string outtext(tess.GetUTF8Text());

	std::cout << outtext << std::endl;
	
	system("pause");
	return 0;
}