#!/bin/bash

training_text=$1
max_iter=$2

if [ $# -ne 2 ] 
then
	echo "Warning: `basename $0` 의 매겨변수의 개수가 올바르지 않습니다."
	exit $WRONG_ARGS
fi

export PATH=/usr/local/bin:$PATH

cd ~/mytraining
mkdir -p ./kor_train
mkdir -p ./eng_train

#학습 데이터 생성
tesseract/src/training/tesstrain.sh \
 	--fonts_dir /usr/share/fonts \
  	--lang eng --linedata_only \
  	--noextract_font_properties \
	--langdata_dir ./langdata_lstm \
  	--tessdata_dir ./tesseract/tessdata \
  	--save_box_tiff --xsize 2550 \
  	--training_text ./langdata_lstm/eng/eng.training_text \
  	--output_dir ./eng_train \
	--maxpages 100 \
    --fontlist \
    "Arial Bold" \
    "Arial Bold Italic" \
    "Arial Italic" \
    "Arial" \
    "Courier New Bold" \
    "Courier New Bold Italic" \
    "Courier New Italic" \
    "Courier New" \
    "Times New Roman, Bold" \
    "Times New Roman, Bold Italic" \
    "Times New Roman, Italic" \
    "Times New Roman," \
    "Georgia Bold" \
    "Georgia Italic" \
    "Georgia" \
    "Georgia Bold Italic" \
    "Trebuchet MS Bold" \
    "Trebuchet MS Bold Italic" \
    "Trebuchet MS Italic" \
    "Trebuchet MS" \
    "Verdana Bold" \
    "Verdana Italic" \
    "Verdana" \
    "Verdana Bold Italic" \
    "DejaVu Sans Ultra-Light" 

#학습 데이터 생성
tesseract/src/training/tesstrain.sh \
 	--fonts_dir /usr/share/fonts \
  	--lang kor --linedata_only \
  	--noextract_font_properties \
	--langdata_dir ./langdata_lstm \
  	--tessdata_dir ./tesseract/tessdata \
  	--save_box_tiff --xsize 2550 \
  	--training_text $training_text \
  	--output_dir ./kor_train \
	--maxpages 200 \
	--fontlist \
	"Baekmuk Batang" \
    "Baekmuk Dotum" \
    "Baekmuk Gulim" \
    "Baekmuk Headline" \
    "NanumGothic" \
    "NanumGothic Bold" \
    "NanumGothic Eco" \
    "NanumGothic Eco Semi-Bold" \
    "NanumMyeongjo" \
    "NanumMyeongjo Bold" \
    "NanumSquare" \
    "NanumSquare Bold" \
    "UnBatang" \
    "UnBatang Bold" \
    "UnDinaru" \
    "UnDotum"

mv -v ./kor_train/kor.training_files.txt ./kor_train/kor_old.training_files.txt

cat \
./kor_train/kor_old.training_files.txt ./eng_train/eng.training_files.txt \
> ./kor_train/kor.training_files.txt

rm -v ./kor_train/kor_old.training_files.txt

mkdir -p ./layer_output
#기존 학습 추출
combine_tessdata -u ./tesseract/tessdata/kor.traineddata \
  	./layer_output/kor

combine_tessdata -u ./tesseract/tessdata/eng.traineddata \
  	./layer_output/eng

combine_tessdata -o ./kor_train/kor/kor.traineddata \
	./layer_output/kor.config


#lstm 학습실행
lstmtraining --debug_interval 0 \
  	--model_output ./layer_output/result \
  	--continue_from ./layer_output/kor.lstm \
  	--append_index 5 --net_spec "[Lfx256 O1c`head -n1 ./kor_train/kor/kor.unicharset`]" \
  	--traineddata ./kor_train/kor/kor.traineddata \
  	--train_listfile ./kor_train/kor.training_files.txt \
  	--debug_interval 0 \
  	--max_iterations $max_iter

#결과 적용
lstmtraining \
  	--stop_training \
  	--continue_from ./layer_output/result_checkpoint \
  	--traineddata ./kor_train/kor/kor.traineddata \
  	--model_output ./layer_output/kor_eng.traineddata

cp -v ./layer_output/kor_eng.traineddata ./tesseract/tessdata/

#학습 종료
exit 0