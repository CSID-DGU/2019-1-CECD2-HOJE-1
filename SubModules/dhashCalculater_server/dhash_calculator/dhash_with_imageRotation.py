import cv2
import numpy as np
from PIL import Image
import sys
from util import order_points
from util import four_point_transform
from util import dhash
from util import image_rotation
from util import random_noise

def main(index, image):        
    height, width, channels = image.shape;
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (7, 7), 0)
    gray = cv2.GaussianBlur(gray, (7, 7), 0)

    edged = cv2.Canny(gray, 30, 80) # 50 ,100

    kernel = np.array([[0,1,0], [1,1,1], [0,1,0]], np.uint8)
    edged = cv2.dilate(edged, kernel, iterations=5)
    edged = cv2.erode(edged, kernel, iterations=5)
    
    image = cv2.copyMakeBorder(image, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=[0,0,0])
    edged = cv2.copyMakeBorder(edged, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=[1,1,1])    


    contours, hierarchy = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    height = edged.shape[0]
    width = edged.shape[1]

    MAX_COUNTOUR_AREA = (width - 2) * (height - 2)
    maxAreaFound = MAX_COUNTOUR_AREA * 0.35 #object 크기는 이미지 전체의 30% 이상이어야 함.

    rectList = [];
    for cnt in contours:

        box = cv2.minAreaRect(cnt)
        box = cv2.boxPoints(box)
        box = np.array(box, dtype="int")
        
        if cv2.contourArea(box) <= maxAreaFound:
            continue
               
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

    roi = None

    if(len(sortedRect) == 1):
        roi = sortedRect[0]
    else:
        roi = sortedRect[1]

    pts = np.array(roi, dtype = "float32")
    warped = four_point_transform(image, pts)
    
    if index != 0:
        warped = random_noise(warped, 200)
        warped = image_rotation(warped)
    
    print(dhash(Image.fromarray(warped.astype('uint8'), 'RGB')))

if __name__ == "__main__":
    filePath = sys.argv[1]
    img = cv2.imread(filePath)
    for index in range(3):
        main(index, img)