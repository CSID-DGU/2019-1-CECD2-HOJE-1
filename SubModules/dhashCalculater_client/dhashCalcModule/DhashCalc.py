import numpy as np
import sys
import cv2
import random
from PIL import Image
from util import order_points
from util import four_point_transform
from util import dhash

def main():
    filePath = sys.argv[1]
    
    #image = cv2.imread("test.jpg")
    image = cv2.imread(filePath)
    height, width, channels = image.shape;
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (7, 7), 0)
    image = cv2.copyMakeBorder(image, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value=[0,0,0])
    gray = cv2.copyMakeBorder(gray, 5, 5, 5, 5, cv2.BORDER_CONSTANT, value=[0,0,0])

    edged = cv2.Canny(gray, 50, 100)
    
    #cv2.imshow("test", edged)
    #cv2.waitKey(0);

    contours, hierarchy = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    height = edged.shape[0]
    width = edged.shape[1]

    MAX_COUNTOUR_AREA = (width - 10) * (height - 10)
    maxAreaFound = MAX_COUNTOUR_AREA * 0.3 #object 크기는 이미지 전체의 30% 이상이어야 함.

    colors = ((0, 0, 255), (240, 0, 159), (255, 0, 0), (255, 255, 0))

    rectList = [];
    for cnt in contours:
        if cv2.contourArea(cnt) <= maxAreaFound:
            continue

        box = cv2.minAreaRect(cnt)
        box = cv2.boxPoints(box)
        box = np.array(box, dtype="int")

        rect = order_points(box)

        if len(rectList) == 0:
            rectList.append(rect)
        else:
            count = 0;
            listLength = len(rectList)
            isNotSameArea = True;

            for oneRectInList in rectList:
                if 0.99 * cv2.contourArea(rect) <= cv2.contourArea(oneRectInList) <= 1.01 * cv2.contourArea(rect):
                    isNotSameArea = False;
                    break;
            
            if(isNotSameArea):
                rectList.append(rect)

    sortedRect = sorted(rectList, key=lambda oneRect: cv2.contourArea(oneRect), reverse=True)
    print(sortedRect)

    roi = None
    
    #사각형이 아예 안나오는 경우 버그 생길 수 있음.
    if(len(sortedRect) == 1):
        roi = sortedRect[0]
    else:
        roi = sortedRect[1]

    pts = np.array(roi, dtype = "float32")
    warped = four_point_transform(image, pts)

    #cv2.imshow("Warped", warped)
    #cv2.waitKey(0)
    print(dhash(Image.fromarray(warped.astype('uint8'), 'RGB')))

if __name__ == "__main__":
    main()
