import cv2
import numpy as np
import random
from PIL import Image

def order_points(pts):
    rect = np.zeros((4, 2), dtype = "float32")

    s = pts.sum(axis = 1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
 
    diff = np.diff(pts, axis = 1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]

    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
 
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
 
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))

    dst = np.array([
	    [0, 0],
	    [maxWidth - 1, 0],
	    [maxWidth - 1, maxHeight - 1],
	    [0, maxHeight - 1]], dtype = "float32")
 
    # compute the perspective transform matrix and then apply it
    M = cv2.getPerspectiveTransform(rect, dst)

    warped = cv2.warpPerspective(image, M, (maxWidth, maxHeight))
 
    # return the warped image
    return warped

def dhash(image, hash_size=8):
    image = image.convert('L').resize((hash_size+1, hash_size), Image.ANTIALIAS)

    pixels = list(image.getdata())

    difference = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = image.getpixel((col,row))
            pixel_right = image.getpixel((col+1,row))
            difference.append(pixel_left>pixel_right)
    
    decimal_value = 0
    hex_string = []
    for index, value in enumerate(difference):
        if value:
            decimal_value += 2**(index % 8)
        if (index % 8) == 7:
            hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))
            decimal_value = 0

    return ''.join(hex_string)

def random_noise(inputMat, noise=100):

    x_pos = None;
    y_pos = None;

    temp_img = inputMat;
    height, width, channels = temp_img.shape;
    
    for i in range(noise):
        x = random.randint(0, width - 2);
        y = random.randint(0, height - 2);
        if(x<0):
           x = 0
        if(y<0):
           y = 0

        noise = (random.randint(0, 255));
        noise3CH = [noise, noise, noise]

        temp_img[y][x] = noise3CH
        temp_img[y + 1][x] = noise3CH
        temp_img[y][x + 1] = noise3CH
        temp_img[y + 1][x + 1] = noise3CH

    return temp_img 

def image_rotation(inputMat, angle = 1.0):
    tmp_img = inputMat;
    dst_img = None;
    height, width, channels = tmp_img.shape;

    angle = random.uniform(0, 6) - 3.0

    M = cv2.getRotationMatrix2D((width/2, height/2), angle, 1.0);

    dst_img = cv2.warpAffine(tmp_img, M, (width, height), borderValue=[255,255,255])

    return dst_img

