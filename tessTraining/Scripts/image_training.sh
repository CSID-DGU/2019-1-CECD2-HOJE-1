#!/bin/bash

## 항상 추가 ##
cd ~/mytraining
export PATH=/usr/local/bin:$PATH

language=$1
new_language=$2
psm=$3
max_iterations=$4
old_traineddata=$5

if [ $# -ne 5 ] 
then
	echo "Warning: `basename $0` 의 매겨변수의 개수가 올바르지 않습니다."
	exit $WRONG_ARGS
fi

mkdir -p images_train/${language}

# 이전 traineddata에서 정보 추출
combine_tessdata -u ${old_traineddata} ./images_train/${language}/${language}
# all-boxes파일에서 unicharset 추출
unicharset_extractor --output_unicharset "GT/my.unicharset" --norm_mode 2 "all-boxes"
# 추출한 unicharset과 이전 traineddata의 unicharset 병합
merge_unicharsets ./images_train/${language}/${language}.lstm-unicharset ./GT/my.unicharset ./images_train/${new_language}.unicharset

# create lstmf file
for image_file in `find ./GT/ -type f -name '*.png' -o -name '*.jpg' -o -name '*.tif'` 
do
	tesseract $image_file ${image_file%.*} --psm ${psm} lstm.train
done

# lstmf file 위치를 list로 만들기
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

# kor은 필수
combine_tessdata -o ./images_train/${new_language}/${new_language}.traineddata \
	./images_train/${language}/${language}.config

mv -v all-lstmf all-lstmf_old

cat ./kor_train/kor.training_files.txt all-lstmf_old > all-lstmf

rm -v all-lstmf_old


# training
lstmtraining \
	--traineddata ./images_train/${new_language}/${new_language}.traineddata \
    --old_traineddata ${old_traineddata} \
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

cp -v ./images_train/${new_language}.traineddata ./tesseract/tessdata/	

echo "종료"
exit 0
