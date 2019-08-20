#include "Preprocess.h"
// �÷� ������ ��ϵ� �������� ��ȯ  (conversion color space to gray scale image)
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

// 2���� �޸� �Ҵ�
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

// �Ҵ��� 2���� �޸� ����
void Preprocess::GS_free2D(float ** data, int length)
{
	for (int i = 0; i < length; i++)
		free(data[i]);

	free(data);
}

// 1���� �޸� �Ҵ�
float * Preprocess::GS_floatAlloc1D(int length)
{
	return (float *)calloc(length, sizeof(float));
}


// �Ҵ��� 1���� �޸� ����
void Preprocess::GS_free1D(float * data)
{
	if (!data) free(data);
}


// 2������ 1�������� ��ȯ
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

// ȸ�� ����
cv::Mat Preprocess::GS_conv2(cv::Mat src_image, cv::Mat mat_kernel)
{
	// ȸ�� ����(=���͸�) ����� ���� ���� ���� �ʱ�ȭ
	cv::Mat dst_image = cv::Mat(src_image.size(), src_image.type());

	// ���͸� ���� : ����ũ�� ���� ȸ��(convolution)
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

// ����þ� ������ ���͸�
cv::Mat Preprocess::GS_gaussian_smoothing_filtering(cv::Mat src_image, double sigma)
{
	int i, j, mask_height, mask_width;
	double var;

	// �ʱ�ȭ 
	int height = src_image.rows;
	int width = src_image.cols;
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (src_image.channels() != 1) return dst_image;

	// sigma ������ �������� ���� ��
	if (sigma < 0.0)
	{
		//cUtil.GS_errMsg("sigma ���� 0.0 �̻��̾�� �մϴ�.");
		return dst_image;
	}

	// ����ũ�� ���Ѵ�.
	// Gaussian ����ũ�� ũ�⸦ �����Ѵ�.
	// length = 5 �̸� 2D�� ��� 5x5 ����ũ�̴�.
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

	// 2���� ����ũ�� 1�������� ��ȯ
	float *single_mask = GS_toSingleArray(mask, mask_height, mask_width);

	// CvMat���� ��ȯ
	cv::Mat mat_kernel = cv::Mat(mask_height, mask_width, CV_32FC1, single_mask);

	// ȸ�� �� dst_image�� ����
	cv::Mat tmp_image = GS_conv2(src_image, mat_kernel);
	tmp_image.copyTo(dst_image);

	free(single_mask);
	tmp_image.release();
	GS_free2D(mask, mask_height);

	return dst_image;
}

// ���ö�þ� ���� ���� : ����ũ (Extraction Laplacian edge: mask)
// method - 0 : 4 ���� ����ũ 1 (mask 1 for 4 directions)
//        - 1 : 4 ���� ����ũ 2 (mask 2 for 4 directions)
//        - 2 : 8 ���� ����ũ 1 (mask 1 for 8 directions)
//        - 3 : 8 ���� ����ũ 2 (mask 2 for 8 directions)
cv::Mat Preprocess::GS_laplacian_edge(cv::Mat src_image, int method)
{
	int i, j, m, n;
	int mask_height, mask_width;
	double var, ret_var;

	// �ʱ�ȭ  (Initialization)
	int height = src_image.rows;
	int width = src_image.cols;
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;

	// ���ö�þ� ����ũ ����  (define Laplacian mask)
	mask_height = mask_width = 3;
	int mask_four1[3][3] = { { 0, -1, 0 },{ -1, 4, -1 },{ 0, -1, 0 } };
	int mask_four2[3][3] = { { 0, 1, 0 },{ 1, -4, 1 },{ 0, 1, 0 } };
	int mask_eight1[3][3] = { { -1, -1, -1 },{ -1, 8, -1 },{ -1, -1, -1 } };
	int mask_eight2[3][3] = { { 1, -2, 1 },{ -2, 4, -2 },{ 1, -2, 1 } };

	for (i = 0; i < height - mask_height + ((mask_height - 1) / 2); i++)
	{
		for (j = 0; j < width - mask_width + ((mask_width - 1) / 2); j++)
		{
			// �ʱ�ȭ (Initialization)
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

// ǥ ������ �̹��� ã��
cv::Mat Preprocess::findTable(cv::Mat input, int scale = 12)
{
	cv::Mat in = input.clone(), bw;
	cv::adaptiveThreshold(~in, bw, 255, cv::ADAPTIVE_THRESH_MEAN_C, cv::THRESH_BINARY, 15, -2);

	// ����, ���θ� ������ Mat ����
	cv::Mat horizontal = bw.clone();
	cv::Mat vertical = bw.clone();

	//���μ� 16
	//int scale = 13; // play with this variable in order to increase/decrease the amount of lines to be detected

	// ���μ� ũ��
	int horizontalsize = horizontal.cols / scale;

	// ���μ� ����
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

// ž-�� ����
// type : Kernel Shape check cv::MorphShapes
// kernel_size : Kernel Size (default : 3)
// iteration : Number of times that erosion and dilation are applied (default : 1)
// if iteration is 2, erode -> erode -> dilate -> dilate would be done.
cv::Mat Preprocess::GS_topHat(cv::Mat src_image, int type, int kernel_size, int iteration)
{
	// �ʱ�ȭ 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;
	cv::Mat opening_image = GS_createImage(src_image.size(), src_image.channels());

	// ����ȭ ��� ����
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(kernel_size, kernel_size));
	//std::cout << kernel;

	// ž-�� ����
	cv::morphologyEx(src_image, dst_image, cv::MORPH_TOPHAT, kernel, cv::Point(-1, -1), iteration);

	/*
	// cv::MorphologyEx() �Լ��� ������� �ʰ� ���� ����.
	// src - opening -> tophat
	CPixel cPixel;

	// �� ��ϵ� ���� ���� ���� ���� ����
	Mat opening_image = GS_opening( src_image, type, 1 );

	// �� ��ϵ� ����� ���� ���� ���� ������ �� ����
	Mat dst_image = cPixel.GS_subtract_image( src_image, opening_image );

	*/

	// �Ҵ��� �޸� ����
	opening_image.release();
	kernel.release();

	return dst_image;
}

// ���� ����

cv::Mat Preprocess::GS_closing(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// �ʱ�ȭ 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;
	cv::Mat dilate_image = GS_createImage(src_image.size(), src_image.channels());

	// ���� �������� ��ȯ
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu �˰����� �̿��� ���� ���� ��ȯ
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// ��ϵ� �����̸� ����
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// ����ȭ ��� ����
	/* Type  = cv::Morphshape
	MORPH_RECT / MORPH_ELLIPSE / MORPH_CROSS */
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// ���� ���� src dst temp element operation
	cv::morphologyEx(tmp_image, dst_image, cv::MORPH_CLOSE, kernel);
	/*
	// cvMorphologyEx() �Լ��� ������� �ʰ� ���� ����.
	// ��â ����
	cvDilate( tmp_image, dilate_image, element, 1 );

	// ħ�� ����
	cvErode( dilate_image, dst_image, element, 1 );
	*/

	// �Ҵ��� �޸� ����
	dilate_image.release();
	tmp_image.release();
	kernel.release();

	return dst_image;
}

// ���� ����

cv::Mat Preprocess::GS_opening(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// �ʱ�ȭ 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;
	cv::Mat erode_image = GS_createImage(src_image.size(), src_image.channels());

	// ���� �������� ��ȯ
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu �˰����� �̿��� ���� ���� ��ȯ
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// ��ϵ� �����̸� ����
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// ����ȭ ��� ����
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// ���� ���� morphologyEX(source, destination, operation, kernel)
	cv::morphologyEx(tmp_image, dst_image, cv::MORPH_OPEN, kernel);


	/*
	// cvMorphologyEx() �Լ��� ������� �ʰ� ���� ����.
	// ħ�� ����
	cv::erode( tmp_image, erode_image, element );

	// ��â ����
	cvDilate( erode_image, dst_image, element );
	*/

	// �Ҵ��� �޸� ����
	erode_image.release();
	tmp_image.release();
	kernel.release();

	return dst_image;
}

// ��â ����
cv::Mat Preprocess::GS_dilate(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// �ʱ�ȭ 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;

	// ���� �������� ��ȯ
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu �˰����� �̿��� ���� ���� ��ȯ
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);
		// ���� ���� ��ȯ ��� ���� 
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// ��ϵ� �����̸� ����
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// ����ȭ ��� ����
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// ��â ����
	cv::dilate(tmp_image, dst_image, kernel);

	// �Ҵ��� �޸� ����
	tmp_image.release();
	kernel.release();

	return dst_image;
}

// ħ�� ����

cv::Mat Preprocess::GS_erode(cv::Mat src_image, int type, int method)
{
	cv::Mat tmp_image;

	// �ʱ�ȭ 
	cv::Mat dst_image = GS_createImage(src_image.size(), src_image.channels());
	if (dst_image.channels() != 1) return dst_image;

	// ���� �������� ��ȯ
	if (method == 0)
	{
		double threshold = 255.0;
		double max_value = 255.0;
		int threshold_type = cv::THRESH_OTSU;

		// otsu �˰����� �̿��� ���� ���� ��ȯ
		cv::Mat binary_image = GS_threshold(src_image, threshold,
			max_value, threshold_type);

		// ���� ���� ��ȯ ��� ���� 
		tmp_image = binary_image.clone();

		binary_image.release();
	}
	// ��ϵ� �����̸� ����
	else if (method == 1)
	{
		tmp_image = src_image.clone();
	}

	// ����ȭ ��� ����
	cv::Mat kernel = cv::getStructuringElement(type, cv::Size(3, 3), cv::Point(1, 1));

	// ħ�� ����
	cv::erode(tmp_image, dst_image, kernel);

	// �Ҵ��� �޸� ����
	tmp_image.release();
	kernel.release();

	return dst_image;
}

cv::Mat Preprocess::removeDotNoise(cv::Mat src_image, int removeDotSize) {
	cv::Mat labels, stats, centroids;

	auto nlabels = connectedComponentsWithStats(src_image, labels, stats, centroids, 8, CV_32S, cv::CCL_WU);
	cv::Mat imageWithoutDots(src_image.rows, src_image.cols, CV_8UC1, cv::Scalar(0));

	for (int i = 1; i < nlabels; i++) {
		if (stats.at<int>(i, 4) >= removeDotSize) { // 10���� ū ��쿡 ������ ��Ȱ�� ��찡 ����
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