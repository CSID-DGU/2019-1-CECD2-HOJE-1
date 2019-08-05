#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y

# 기본설치
sudo apt-get install -y g++ # or clang++ (presumably)
sudo apt-get install -y autoconf automake libtool
sudo apt-get install -y pkg-config
sudo apt-get install -y libpng-dev
sudo apt-get install -y libjpeg8-dev
sudo apt-get install -y libtiff5-dev
sudo apt-get install -y zlib1g-dev
sudo apt-get install -y libicu-dev
sudo apt-get install -y libpango1.0-dev
sudo apt-get install -y libcairo2-dev

# leptonica 설치
sudo apt-get install -y libleptonica-dev

# tesseract 설치
sudo apt install -y tesseract-ocr

# tesseract developer tool 설치
sudo apt install -y libtesseract-dev

# optional manpages
sudo apt-get install -y --no-install-recommends asciidoc

# 초기 폰트(나눔 백묵 추가??)
sudo apt update -y
sudo apt install -y ttf-mscorefonts-installer
sudo apt install -y fonts-dejavu
sudo apt-get install fonts-nanum*
sudo apt-get install fonts-baekmuk*
sudo apt-get install fonts-unfonts*
fc-cache -vf

# 학습을 위한 초기 세팅들
mkdir ~/mytraining
cd ~/mytraining

# langdata 설치
mkdir langdata_lstm
cd langdata_lstm
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/Latin.unicharset
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/Latin.xheights
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/Hangul.unicharset
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/Hangul.xheights
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/common.punc
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/common.unicharambigs
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/desired_bigrams.txt
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/font_properties
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/forbidden_characters_default
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/radical-stroke.txt

mkdir kor
cd kor
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/forbidden_characters
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.config
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.numbers
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.params-model
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.punc
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.singles_text
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.training_text
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.unicharambigs
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.unicharset
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/kor.wordlist
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/kor/okfonts.txt

cd ~/mytraining/langdata_lstm
mkdir eng
cd eng
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/desired_characters
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.numbers
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.punc
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.singles_text
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.training_text
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.unicharambigs
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.unicharset
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/eng.wordlist
wget https://raw.githubusercontent.com/tesseract-ocr/langdata_lstm/master/eng/okfonts.txt

# tesseract 4.1 
cd ~/mytraining
git clone https://github.com/tesseract-ocr/tesseract.git --branch 4.1 --single-branch

# build
cd tesseract
./autogen.sh
./configure
LDFLAGS="-L/usr/local/lib" CFLAGS="-I/usr/local/include" make
sudo make -j4 install
sudo ldconfig
make training
sudo make -j4 training-install

cd ~/mytraining/tesseract/tessdata
sudo wget -O eng.traineddata https://github.com/tesseract-ocr/tessdata_best/raw/master/eng.traineddata
sudo wget -O kor.traineddata https://github.com/tesseract-ocr/tessdata_best/raw/master/kor.traineddata
sudo wget -O osd.traineddata https://github.com/tesseract-ocr/tessdata_best/raw/master/osd.traineddata

export TESSDATA_PREFIX=/usr/local/share/

sudo cp kor.traineddata /usr/local/share/tessdata/
sudo cp eng.traineddata /usr/local/share/tessdata/
