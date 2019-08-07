#pragma once
#include<opencv2\opencv.hpp>

class Preprocess
{
public:
	// 컬러 공간을 명암도 영상으로 변환 
	cv::Mat GS_rgb2gray(cv::Mat rgb_image);

	cv::Mat GS_createImage(cv::Size size, int nChannels);

	// 2차원 메모리 할당
	float **GS_floatAlloc2D(int height, int width);

	// 할당한 2차원 메모리 해제
	void GS_free2D(float **data, int length);

	// 1차원 메모리 할당
	float *GS_floatAlloc1D(int length);

	// 할당한 1차원 메모리 해제
	void GS_free1D(float *data);

	// 2차원을 1차원으로 변환
	float *GS_toSingleArray(float **data, int height, int width);

	// 회선 수행
	cv::Mat GS_conv2(cv::Mat src_image, cv::Mat mat_kernel);

	// grayscale 영상
	template<typename T>
	int GS_clamping(T _var)
	{
		int var = (int)_var;
		int retVal = -1;

		// saturation 방법 적용
		if (var > 255) retVal = 255;
		else if (var < 0) retVal = 0;
		else retVal = var;

		return retVal;
	}

	// addition with two images
	// Input: any two images
	cv::Mat GS_add_image(cv::Mat src_image1, cv::Mat src_image2);

	// subtraction with two images
	// Input: any two images
	cv::Mat GS_subtract_image(cv::Mat src_image1, cv::Mat src_image2);

	// 가우시안 스무딩 필터링
	cv::Mat GS_gaussian_smoothing_filtering(cv::Mat src_image, double sigma);


	// 라플라시안 에지 추출 : 마스크 (Extraction Laplacian edge: mask)
	cv::Mat GS_laplacian_edge(cv::Mat src_image, int method);

	// Binarization by thresholding
	/* Input:
	src ? Source 8-bit single-channel image.
	dst ? Destination image of the same size and the same type as src .
	maxValue ? Non-zero value assigned to the pixels for which the condition is satisfied.
	thresh - Thr eshold value to be checked
	thresholdType ? Thresholding type that must be either THRESH_BINARY or THRESH_BINARY_INV. Check ThresholdTypes
	*/
	cv::Mat GS_threshold(cv::Mat src_image, double thresh, int threshold_type);
	cv::Mat GS_threshold(cv::Mat src_image, double thresh, double max_value, int threshold_type);

	cv::Mat findTable(cv::Mat input, int scale);

	// 탑-햇 연산
	// type : Kernel Shape check cv::MorphShapes
	// kernel_size : Kernel Size (default : 3)
	// iteration : Number of times that erosion and dilation are applied (default : 1)
	// if iteration is 2, erode -> erode -> dilate -> dilate would be done.
	cv::Mat GS_topHat(cv::Mat src_image, int type, int kernel_size = 3, int iteration = 1);

	// 닫힘 연산
	cv::Mat GS_closing(cv::Mat src_image, int type, int method);

	// 열림 연산
	cv::Mat GS_opening(cv::Mat src_image, int type, int method);

	// 팽창 연산
	cv::Mat GS_dilate(cv::Mat src_image, int type, int method);

	// 침식 연산
	cv::Mat GS_erode(cv::Mat src_image, int type, int method);

	cv::Mat removeDotNoise(cv::Mat src_image);
};