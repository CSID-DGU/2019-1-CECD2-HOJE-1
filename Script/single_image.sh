#!/bin/bash

## 항상 추가 ##
cd ~/mytraining
export PATH=/usr/local/bin:$PATH

image_file=$1
box_file=$2
language=$3
psm=$4
new_language=$5
max_iterations=$6

cp $image_file ~/mytraining/single_train/
cp $box_file ~/mytraining/single_train/

mkdir -p single_train/${language}

# create lstmf file
combine_tessdata -u ./tesseract/tessdata/${language}.traineddata  ./single_train/${language}/${language}
unicharset_extractor --output_unicharset "./single_train/my.unicharset" --norm_mode 2 "${box_file}"
merge_unicharsets ./single_train/${language}/${language}.lstm-unicharset ./single_train/my.unicharset  ./single_train/${new_language}.unicharset

# 일단 png파일만 해봄 이미지 파일 경로에서 변경하도록 변경

tesseract $image_file ${image_file/.png/""} --psm ${psm} lstm.train

mv ${image_file/.png/.lstmf} ~/mytraining/single_train/

find ~/mytraining/single_train/ -name '*.lstmf' -exec echo {} \; | sort -R -o ./single_train/all-lstmf

# make starter traineddata
combine_lang_model \
    --input_unicharset ./single_train/${new_language}.unicharset \
	--script_dir ./langdata_lstm \
	--words ./langdata_lstm/${language}/${language}.wordlist \
	--numbers ./langdata_lstm/${language}/${language}.numbers \
	--puncs ./langdata_lstm/${language}/${language}.punc \
	--output_dir ./single_train \
	--lang ${new_language}

combine_tessdata -o ./single_train/${new_language}/${new_language}.traineddata \
	./single_train/${language}/${language}.config

# training
lstmtraining \
	--traineddata ./single_train/${new_language}/${new_language}.traineddata \
    --old_traineddata ./tesseract/tessdata/${language}.traineddata \
	--net_spec "[1,36,0,1 Ct3,3,16 Mp3,3 Lfys48 Lfx96 Lrx96 Lfx256 O1c`head -n1 ./single_train/${new_language}/${new_language}.unicharset`]" \
	--model_output ./single_train/result \
	--continue_from ./single_train/${language}/${language}.lstm \
	--train_listfile ./single_train/all-lstmf \
	--debug_interval 0 \
	--max_iterations ${max_iterations}

lstmtraining \
	--stop_training \
	--continue_from ./single_train/result_checkpoint \
	--traineddata ./single_train/${new_language}/${new_language}.traineddata \
	--model_output ./single_train/${new_language}.traineddata
	
echo "종료"
exit 0

lstmtraining \
	--traineddata ./single_train/my_kor/my_kor.traineddata \
    --old_traineddata ./tesseract/tessdata/kor.traineddata \
	--net_spec "[1,36,0,1 Ct3,3,16 Mp3,3 Lfys48 Lfx96 Lrx96 Lfx256 O1c`head -n1 ./single_train/my_kor/my_kor.unicharset`]" \
	--model_output ./single_train/result \
	--continue_from ./single_train/kor/kor.lstm \
	--train_listfile all-lstmf \
	--debug_interval 0 \
	--max_iterations 400


lstmtraining \
	--stop_training \
	--convert_to_int \
	--continue_from ./single_train/result_checkpoint \
	--old_traineddata ./tesseract/tessdata/kor.traineddata \
	--traineddata ./single_train/my_kor/my_kor.traineddata \
	--model_output ./single_train/my_kor.traineddata