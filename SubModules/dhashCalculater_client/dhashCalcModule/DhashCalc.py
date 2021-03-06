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
    image = cv2.imread(filePath)
    
    #image = cv2.imread("sample4.jpg")
    height, width, channels = image.shape;
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (7, 7), 0)
    gray = cv2.GaussianBlur(gray, (7, 7), 0)

    edged = cv2.Canny(gray, 30, 80) # 30, 80
  
    kernel = np.array([[0,1,0], [1,1,1], [0,1,0]], np.uint8)
    edged = cv2.dilate(edged, kernel, iterations=5)
    edged = cv2.erode(edged, kernel, iterations=5)
        
    image = cv2.copyMakeBorder(image, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=[0,0,0])
    edged = cv2.copyMakeBorder(edged, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=[1,1,1])
    
    #cv2.imshow("test", edged)
    #cv2.waitKey(0);

    contours, hierarchy = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    height = edged.shape[0]
    width = edged.shape[1]
    
    #print(image.shape)
    
    MAX_COUNTOUR_AREA = (width - 2) * (height - 2)
    maxAreaFound = MAX_COUNTOUR_AREA * 0.35  # 오브젝트 크기는 이미지 전체의 35% 이상이어야 함.
    #testContourArea = MAX_COUNTOUR_AREA * 0.01; # 0.01# 0.05

    #print(MAX_COUNTOUR_AREA)

    colors = ((0, 0, 255), (240, 0, 159), (255, 0, 0), (255, 255, 0))

    rectList = [];
    for cnt in contours:
        box = cv2.minAreaRect(cnt)
        box = cv2.boxPoints(box)
        box = np.array(box, dtype="int")
        
        #if cv2.contourArea(box) <= maxAreaFound or cv2.contourArea(cnt) <= testContourArea :
        #   continue
        #print(cv2.contourArea(box), " <-> ",  (MAX_COUNTOUR_AREA-cv2.contourArea(box)))
        #if cv2.contourArea(box) <= maxAreaFound and cv2.contourArea(cnt) <= (MAX_COUNTOUR_AREA-cv2.contourArea(box))*0.5 :
        #   continue

        #print(cv2.contourArea(box), " <-> ",  cv2.contourArea(cnt))
        if cv2.contourArea(box) <= maxAreaFound: 
           continue

        #box = cv2.minAreaRect(cnt)
        #box = cv2.boxPoints(box)
        #box = np.array(box, dtype="int")

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
                #print(cv2.contourArea(rect), "," ,(cv2.contourArea(rect)/MAX_COUNTOUR_AREA) * 100)
                rectList.append(rect)

    sortedRect = sorted(rectList, key=lambda oneRect: cv2.contourArea(oneRect), reverse=True)
    #print(sortedRect)

    roi = None
    
    #사각형이 아예 안나오는 경우 버그 생길 수 있음.
    if(len(sortedRect) == 1):
        roi = sortedRect[0]
    else:
        roi = sortedRect[1]

    pts = np.array(roi, dtype = "float32")
    warped = four_point_transform(image, pts)
    
    #print(warped.shape)

    #cv2.imshow("Warped", warped)
    #cv2.waitKey(0)
    print(dhash(Image.fromarray(warped.astype('uint8'), 'RGB')))

if __name__ == "__main__":
    main()
