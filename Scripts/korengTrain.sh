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
mkdir -p ./kor_eng_train

#학습 데이터 생성
tesseract/src/training/tesstrain.sh \
 	--fonts_dir /usr/share/fonts \
  	--lang kor --linedata_only \
  	--noextract_font_properties \
	--langdata_dir ./langdata_lstm \
  	--tessdata_dir ./tesseract/tessdata \
  	--save_box_tiff --xsize 2550 \
  	--training_text $training_text \
  	--output_dir ./kor_eng_train \
	--maxpages 200
	--fontlist \
	"Arial Bold" \
	"Arial Bold Italic" \
	"Baekmuk Batang" \
	"Baekmuk Dotum" \
	"Baekmuk Gulim" \
	"DejaVu Sans" \
	"DejaVu Serif" \
	"NanumGothic" \
	"NanumGothic Bold" \
	"NanumMyeongjo" \
	"NanumMyeongjo Semi-Bold"

mkdir -p ./layer_output
#기존 학습 추출
combine_tessdata -u ./tesseract/tessdata/kor.traineddata \
  	./layer_output/kor
combine_tessdata -o ./kor_eng_train/kor/kor.traineddata \
	./layer_output/kor.config

# 60000번 추천
#lstm 학습실행
lstmtraining --debug_interval 0 \
  	--model_output ./layer_output/result \
  	--continue_from ./layer_output/kor.lstm \
  	--append_index 5 --net_spec "[Lfx256 O1c`head -n1 ./kor_eng_train/kor/kor.unicharset`]" \
  	--traineddata ./kor_eng_train/kor/kor.traineddata \
  	--train_listfile ./kor_eng_train/kor.training_files.txt \
  	--debug_interval 0 \
  	--max_iterations $max_iter

#결과 적용
lstmtraining \
  	--stop_training \
  	--continue_from ./layer_output/result_checkpoint \
  	--traineddata ./kor_eng_train/kor/kor.traineddata \
  	--model_output ./layer_output/kor_eng.traineddata

cp -v ./layer_output/kor_eng.traineddata ./tesseract/tessdata/

#학습 종료
exit 0