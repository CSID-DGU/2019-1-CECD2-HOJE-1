#!/bin/bash

# 폰트이름을 매개변수로 받고 폴더명은 폰트이름에서 공백제거한걸로
font_name=$1
max_iter=$2
language=$3
old_traineddata=$4

if [ $# -ne 4 ] 
then
	echo "Warning: `basename $0` 의 매겨변수의 개수가 올바르지 않습니다."
	exit $WRONG_ARGS
fi

# 공백제거
ns_font_name=${font_name//' '/'_'}

cd ~/mytraining

export PATH=/usr/local/bin:$PATH

#학습 & 평가 디렉토리 생성
mkdir -p ~/mytraining/fonts_train
mkdir -p ~/mytraining/fonts_eval
#학습 데이터 생성
tesseract/src/training/tesstrain.sh \
    --fonts_dir /usr/share/fonts \
    --lang ${language} \
	--linedata_only \
  	--noextract_font_properties \
	--langdata_dir ./langdata_lstm \
  	--tessdata_dir ./tesseract/tessdata \
	--training_text ./langdata_lstm/${language}/${language}.training_text \
	--save_box_tiff --xsize 2550 \
	--output_dir ./fonts_train \
  	--maxpages 100

#평가 데이터 생성
tesseract/src/training/tesstrain.sh \
  	--fonts_dir /usr/share/fonts \
  	--lang ${language} \
	--linedata_only \
  	--noextract_font_properties \
	--langdata_dir ./langdata_lstm \
  	--save_box_tiff --xsize 2550 \
	--tessdata_dir ./tesseract/tessdata \
	--training_text ./langdata_lstm/${language}/${language}.training_text \
	--fontlist "${font_name}" \
	--output_dir ./fonts_eval \
  	--maxpages 100

#기존 학습 추출
mkdir -p ./${ns_font_name}_output
combine_tessdata -u ${old_traineddata} \
 	./${ns_font_name}_output/${language}
combine_tessdata -o ./fonts_train/${language}/${language}.traineddata \
	./${ns_font_name}_output/${language}.config

#lstm 학습실행
lstmtraining \
  	--model_output ./${ns_font_name}_output/result \
  	--continue_from ./${ns_font_name}_output/${language}.lstm \
  	--old_traineddata ${old_traineddata} \
  	--traineddata ./fonts_train/${language}/${language}.traineddata \
  	--train_listfile ./fonts_eval/${language}.training_files.txt \
  	--debug_interval 0 \
  	--max_iterations $max_iter

#결과 적용
lstmtraining \
  	--stop_training \
  	--convert_to_int \
  	--continue_from ./${ns_font_name}_output/result_checkpoint \
	--old_traineddata ${old_traineddata} \
  	--traineddata ./fonts_train/${language}/${language}.traineddata \
  	--model_output ./${ns_font_name}_output/${language}_font_fine.traineddata

cp -v ./${ns_font_name}_output/${language}_font_fine.traineddata ./tesseract/tessdata/

#학습 종료
exit 0