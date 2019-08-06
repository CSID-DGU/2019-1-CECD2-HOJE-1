#!/bin/bash

## 항상 추가 ##
cd ~/mytraining
export PATH=/usr/local/bin:$PATH

language=$1
psm=$2
new_language=$3
max_iterations=$4

mkdir -p images_train/${language}

# create lstmf file
combine_tessdata -u ./tesseract/tessdata/${language}.traineddata  ./images_train/${language}/${language}
unicharset_extractor --output_unicharset "GT/my.unicharset" --norm_mode 2 "all-boxes"
merge_unicharsets ./images_train/${language}/${language}.lstm-unicharset ./GT/my.unicharset  ./images_train/${new_language}.unicharset

# 이름에 .tif들어가면 에러
for tif_file in ./GT/*.tif; do
    tesseract $tif_file ${tif_file/.tif/""} --psm ${psm} lstm.train
done

for jpg_file in ./GT/*.jpg; do
    tesseract $jpg_file ${jpg_file/.jpg/""} --psm ${psm} lstm.train
done


find ./GT -name '*.lstmf' -exec echo {} \; | sort -R -o "all-lstmf"

# make starter traineddata
combine_lang_model \
    --input_unicharset ./images_train/${new_language}.unicharset \
	--script_dir ./langdata_lstm \
	--words ./langdata_lstm/${language}/${language}.wordlist \
	--numbers ./langdata_lstm/${language}/${language}.numbers \
	--puncs ./langdata_lstm/${language}/${language}.punc \
	--output_dir ./images_train \
	--lang ${new_language}

combine_tessdata -o ./images_train/${new_language}/${new_language}.traineddata \
	./images_train/${language}/${language}.config

# training
lstmtraining \
	--traineddata ./images_train/${new_language}/${new_language}.traineddata \
    --old_traineddata ./tesseract/tessdata/${language}.traineddata \
	--net_spec "[1,36,0,1 Ct3,3,16 Mp3,3 Lfys48 Lfx96 Lrx96 Lfx256 O1c`head -n1 ./images_train/${new_language}/${new_language}.unicharset`]" \
	--model_output ./images_train/result \
	--continue_from ./images_train/${language}/${language}.lstm \
	--train_listfile all-lstmf \
	--debug_interval 0 \
	--max_iterations ${max_iterations}

lstmtraining \
	--stop_training \
	--continue_from ./images_train/result_checkpoint \
	--traineddata ./images_train/${new_language}/${new_language}.traineddata \
	--model_output ./images_train/${new_language}.traineddata
	
echo "종료"
exit 0

lstmtraining \
	--traineddata ./images_train/my_kor/my_kor.traineddata \
    --old_traineddata ./tesseract/tessdata/kor.traineddata \
	--net_spec "[1,36,0,1 Ct3,3,16 Mp3,3 Lfys48 Lfx96 Lrx96 Lfx256 O1c`head -n1 ./images_train/my_kor/my_kor.unicharset`]" \
	--model_output ./images_train/result \
	--continue_from ./images_train/kor/kor.lstm \
	--train_listfile all-lstmf \
	--debug_interval 0 \
	--max_iterations 400


lstmtraining \
	--stop_training \
	--convert_to_int \
	--continue_from ./images_train/result_checkpoint \
	--old_traineddata ./tesseract/tessdata/kor.traineddata \
	--traineddata ./images_train/my_kor/my_kor.traineddata \
	--model_output ./images_train/my_kor.traineddata