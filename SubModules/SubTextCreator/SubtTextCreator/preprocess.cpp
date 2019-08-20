#include "Preprocess.h"
// 컬러 공간을 명암도 영상으로 변환  (conversion color space to gray scale image)
cv::Mat Preprocess::GS_rgb2gray(cv::Mat rgb_image)
{
	cv::Mat gray_image = cv::Mat(rgb_image.size(), CV_8UC1);

	cv::cvtColor(rgb_image, gray_image, cv::COLOR_BGR2GRAY);

	return gray_image;
}

cv::Mat Preprocess::GS_createImage(cv::Size size, int nChannels)
{
	uchar type = ((nChannels - 1) << 3) + 0;
	cv::Mat dst_image = cv::Mat(size, type);
	return dst_image;
}

// 2차원 메모리 할당
float ** Preprocess::GS_floatAlloc2D(int height, int width)
{
	float **data;

	data = (float **)calloc(height, sizeof(float *));
	for (int i = 0; i < height; i++)
	{
		data[i] = (float *)calloc(width, sizeof(float));
	}

	return data;
}

// 할당한 2차원 메모리 해제
void Preprocess::GS_free2D(float ** data, int length)
{
	for (int i = 0; i < length; i++)
		free(data[i]);

	free(data);
}

// 1차원 메모리 할당
float * Preprocess::GS_floatAlloc1D(int length)
{
	return (float *)calloc(length, sizeof(float));
}


// 할당한 1차원 메모리 해제
void Preprocess::GS_free1D(float * data)
{
	if (!data) free(data);
}


// 2차원을 1차원으로 변환
float * Preprocess::GS_toSingleArray(float ** data, int height, int width)
{
	int cnt = -1;
	float *single_data = GS_floatAlloc1D(height*width);

	for (int i = 0; i < height; i++)
	{
		for (int j = 0; j < width; j++)
		{
			single_data[++cnt] = data[i][j];
		}
	}

	return single_data;
}

// 회선 수행
cv::Mat Preprocess::GS_conv2(cv::Mat src_image, cv::Mat mat_kernel)
{
	// 회선 수행(=필터링) 결과를 담을 목적 영상 초기화
	cv::Mat dst_image = cv::Mat(src_image.size(), src_image.type());

	// 필터링 수행 : 마스크에 의한 회선(convolution)
	cv::filter2D(src_image, dst_image, dst_image.depth(), mat_kernel);

	return dst_image;
}


// addition with two images
// Input: any two images
cv::Mat Preprocess::GS_add_image(cv::Mat src_image1, cv::Mat src_image2)
{
	cv::Mat dst_image;
	cv::add(src_image1, src_image2, dst_image);

	return dst_image;
}


// subtraction with two images
// Input: any two images
cv::Mat Preprocess::GS_subtract_image(cv::Mat src_image1, cv::Mat src_image2)
{
	cv::Mat dst_image;

	cv::subtract(src_image1, src_image2, dst_image);

	return dst_image;
}

// 가우시안 스무딩 필터링
cv::Mat Preprocess::GS_gaussian_smoothing_filtering(cv::Mat src_image, double sigma)
{
	int i, j, mask_height, mask_width;
	double var;

	// 초기화 
	int height = src_image.rows;
	int width = src_image.cols;
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (src_image.channels() != 1) return dst_image;

	// sigma 범위를 충족하지 않을 때
	if (sigma < 0.0)
	{
		//cUtil.GS_errMsg("sigma 값은 0.0 이상이어야 합니다.");
		return dst_image;
	}

	// 마스크를 구한다.
	// Gaussian 마스크의 크기를 결정한다.
	// length = 5 이면 2D의 경우 5x5 마스크이다.
	int length = (int)(6 * sigma) + 1;
	int center = length / 2;

	mask_height = mask_width = length;
	float **mask = GS_floatAlloc2D(mask_height, mask_width);
	double M_PI = 3.141592654;

	for (i = 0; i < mask_height; i++)
	{
		for (j = 0; j < mask_width; j++)
		{
			var = (1.0 / (2.0*M_PI*sigma*sigma))
				* exp(-((i - center)*(i - center) + (j - center)*(j - center))
					*(1.0 / (2.0*sigma*sigma)));

			mask[i][j] = (float)var;
		}
	}

	// 2차원 마스크를 1차원으로 변환
	float *single_mask = GS_toSingleArray(mask, mask_height, mask_width);

	// CvMat으로 변환
	cv::Mat mat_kernel = cv::Mat(mask_height, mask_width, CV_32FC1, single_mask);

	// 회선 후 dst_image에 복사
	cv::Mat tmp_image = GS_conv2(src_image, mat_kernel);
	tmp_image.copyTo(dst_image);

	free(single_mask);
	tmp_image.release();
	GS_free2D(mask, mask_height);

	return dst_image;
}

// 라플라시안 에지 추출 : 마스크 (Extraction Laplacian edge: mask)
// method - 0 : 4 방향 마스크 1 (mask 1 for 4 directions)
//        - 1 : 4 방향 마스크 2 (mask 2 for 4 directions)
//        - 2 : 8 방향 마스크 1 (mask 1 for 8 directions)
//        - 3 : 8 방향 마스크 2 (mask 2 for 8 directions)
cv::Mat Preprocess::GS_laplacian_edge(cv::Mat src_image, int method)
{
	int i, j, m, n;
	int mask_height, mask_width;
	double var, ret_var;

	// 초기화  (Initialization)
	int height = src_image.rows;
	int width = src_image.cols;
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;

	// 라플라시안 마스크 정의  (define Laplacian mask)
	mask_height = mask_width = 3;
	int mask_four1[3][3] = { { 0, -1, 0 },{ -1, 4, -1 },{ 0, -1, 0 } };
	int mask_four2[3][3] = { { 0, 1, 0 },{ 1, -4, 1 },{ 0, 1, 0 } };
	int mask_eight1[3][3] = { { -1, -1, -1 },{ -1, 8, -1 },{ -1, -1, -1 } };
	int mask_eight2[3][3] = { { 1, -2, 1 },{ -2, 4, -2 },{ 1, -2, 1 } };

	for (i = 0; i < height - mask_height + ((mask_height - 1) / 2); i++)
	{
		for (j = 0; j < width - mask_width + ((mask_width - 1) / 2); j++)
		{
			// 초기화 (Initialization)
			ret_var = 0.0;

			if ((i + mask_height > height) || (j + mask_width > width))
				continue;

			for (m = 0; m < mask_height; m++)
			{
				for (n = 0; n < mask_width; n++)
				{
					var = src_image.at<uchar>(i + m, j + n);

					if (method == 0) ret_var += var * mask_four1[m][n];
					else if (method == 1) ret_var += var * mask_four2[m][n];
					else if (method == 2) ret_var += var * mask_eight1[m][n];
					else if (method == 3) ret_var += var * mask_eight2[m][n];
				}
			}

			ret_var = GS_clamping(ret_var);
			dst_image.at<uchar>(i + (mask_height - 1) / 2, j + (mask_width - 1) / 2) = ret_var;
		}
	}

	return dst_image;
}

// Binarization by thresholding
/* Input:
src ? Source 8-bit single-channel image.
dst ? Destination image of the same size and the same type as src .
maxValue ? Non-zero value assigned to the pixels for which the condition is satisfied.
thresh - Thr eshold value to be checked
thresholdType ? Thresholding type that must be either THRESH_BINARY or THRESH_BINARY_INV. Check ThresholdTypes
*/
cv::Mat Preprocess::GS_threshold(cv::Mat src_image, double thresh, int threshold_type)
{
	double max_value = 255.0;

	if (threshold_type == cv::THRESH_BINARY || threshold_type == cv::THRESH_BINARY_INV)
		max_value = thresh;

	return GS_threshold(src_image, thresh, max_value, threshold_type);
}
cv::Mat Preprocess::GS_threshold(cv::Mat src_image, double thresh, double max_value, int threshold_type)
{
	cv::Mat dst_image = cv::Mat(src_image.size(), src_image.type());

	cv::threshold(src_image, dst_image, thresh, max_value, threshold_type);

	return dst_image;
}

// 표 형태의 이미지 찾기
cv::Mat Preprocess::findTable(cv::Mat input, int scale = 12)
{
	cv::Mat in = input.clone(), bw;
	cv::adaptiveThreshold(~in, bw, 255, cv::ADAPTIVE_THRESH_MEAN_C, cv::THRESH_BINARY, 15, -2);

	// 가로, 세로를 추출할 Mat 생성
	cv::Mat horizontal = bw.clone();
	cv::Mat vertical = bw.clone();

	//세로선 16
	//int scale = 13; // play with this variable in order to increase/decrease the amount of lines to be detected

	// 가로선 크기
	int horizontalsize = horizontal.cols / scale;

	// 가로선 추출
	cv::Mat horizontalStructure = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(horizontalsize, 1));

	// Apply morphology operations
	erode(horizontal, horizontal, horizontalStructure, cv::Point(-1, -1));
	dilate(horizontal, horizontal, horizontalStructure, cv::Point(-1, -1));

	// Show extracted horizontal lines
	//cv::imshow("horizontal", horizontal);
	// Specify size on vertical axis
	int verticalsize = vertical.rows / scale;

	// Create structure element for extracting vertical lines through morphology operations
	cv::Mat verticalStructure = cv::getStructuringElement(cv::MORPH_RECT, cv::Size(1, verticalsize));

	// Apply morphology operations
	cv::erode(vertical, vertical, verticalStructure, cv::Point(-1, -1));
	cv::dilate(vertical, vertical, verticalStructure, cv::Point(-1, -1));

	// Show extracted vertical lines
	//cv::imshow("vertical", vertical);

	cv::Mat mask = horizontal + vertical;
	//cv::imshow("mask", mask);
	//cv::waitKey();

	return mask;
}

// 탑-햇 연산
// type : Kernel Shape check cv::MorphShapes
// kernel_size : Kernel Size (default : 3)
// iteration : Number of times that erosion and dilation are applied (default : 1)
// if iteration is 2, erode -> erode -> dilate -> dilate would be done.
cv::Mat Preprocess::GS_topHat(cv::Mat src_image, int type, int kernel_size, int iteration)
{
	// 초기화 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;
	cv::Mat opening_image = GS_createImage(src_image.size(), src_image.channels());

	// 구조화 요소 생성
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(kernel_size, kernel_size));
	//std::cout << kernel;

	// 탑-햇 연산
	cv::morphologyEx(src_image, dst_image, cv::MORPH_TOPHAT, kernel, cv::Point(-1, -1), iteration);

	/*
	// cv::MorphologyEx() 함수를 사용하지 않고 직접 구현.
	// src - opening -> tophat
	CPixel cPixel;

	// 원 명암도 영상에 대한 열림 연산 수행
	Mat opening_image = GS_opening( src_image, type, 1 );

	// 원 명암도 영상과 열림 연산 수행 영상을 차 연산
	Mat dst_image = cPixel.GS_subtract_image( src_image, opening_image );

	*/

	// 할당한 메모리 해제
	opening_image.release();
	kernel.release();

	return dst_image;
}

// 닫힘 연산

cv::Mat Preprocess::GS_closing(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// 초기화 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;
	cv::Mat dilate_image = GS_createImage(src_image.size(), src_image.channels());

	// 이진 영상으로 변환
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu 알고리즘을 이용한 이진 영상 변환
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// 명암도 영상이면 복사
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// 구조화 요소 생성
	/* Type  = cv::Morphshape
	MORPH_RECT / MORPH_ELLIPSE / MORPH_CROSS */
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// 닫힘 연산 src dst temp element operation
	cv::morphologyEx(tmp_image, dst_image, cv::MORPH_CLOSE, kernel);
	/*
	// cvMorphologyEx() 함수를 사용하지 않고 직접 구현.
	// 팽창 연산
	cvDilate( tmp_image, dilate_image, element, 1 );

	// 침식 연산
	cvErode( dilate_image, dst_image, element, 1 );
	*/

	// 할당한 메모리 해제
	dilate_image.release();
	tmp_image.release();
	kernel.release();

	return dst_image;
}

// 열림 연산

cv::Mat Preprocess::GS_opening(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// 초기화 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;
	cv::Mat erode_image = GS_createImage(src_image.size(), src_image.channels());

	// 이진 영상으로 변환
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu 알고리즘을 이용한 이진 영상 변환
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// 명암도 영상이면 복사
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// 구조화 요소 생성
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// 열림 연산 morphologyEX(source, destination, operation, kernel)
	cv::morphologyEx(tmp_image, dst_image, cv::MORPH_OPEN, kernel);


	/*
	// cvMorphologyEx() 함수를 사용하지 않고 직접 구현.
	// 침식 연산
	cv::erode( tmp_image, erode_image, element );

	// 팽창 연산
	cvDilate( erode_image, dst_image, element );
	*/

	// 할당한 메모리 해제
	erode_image.release();
	tmp_image.release();
	kernel.release();

	return dst_image;
}

// 팽창 연산
cv::Mat Preprocess::GS_dilate(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// 초기화 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;

	// 이진 영상으로 변환
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu 알고리즘을 이용한 이진 영상 변환
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);
		// 이진 영상 변환 결과 복사 
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// 명암도 영상이면 복사
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// 구조화 요소 생성
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// 팽창 연산
	cv::dilate(tmp_image, dst_image, kernel);

	// 할당한 메모리 해제
	tmp_image.release();
	kernel.release();

	return dst_image;
}

// 침식 연산

cv::Mat Preprocess::GS_erode(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// 초기화 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;

	// 이진 영상으로 변환
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu 알고리즘을 이용한 이진 영상 변환
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);

		// 이진 영상 변환 결과 복사 
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// 명암도 영상이면 복사
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// 구조화 요소 생성
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// 침식 연산
	cv::erode(tmp_image, dst_image, kernel);

	// 할당한 메모리 해제
	tmp_image.release();
	kernel.release();

	return dst_image;
}

cv::Mat Preprocess::removeDotNoise(cv::Mat src_image, int removeDotSize) {
	cv::Mat labels, stats, centroids;

	auto nlabels = connectedComponentsWithStats(src_image, labels, stats, centroids, 8, CV_32S, cv::CCL_WU);
	cv::Mat imageWithoutDots(src_image.rows, src_image.cols, CV_8UC1, cv::Scalar(0));

	for (int i = 1; i < nlabels; i++) {
		if (stats.at<int>(i, 4) >= removeDotSize) { // 10보다 큰 경우에 동작이 원활한 경우가 있음
			for (int j = 0; j < imageWithoutDots.total(); j++) {
				if (labels.at<int>(j) == i) {
					imageWithoutDots.data[j] = 255;
				}
			}
		}
	}

	cv::bitwise_not(imageWithoutDots, imageWithoutDots);

	return imageWithoutDots;
}