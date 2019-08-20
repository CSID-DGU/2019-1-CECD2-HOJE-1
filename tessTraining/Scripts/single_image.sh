#!/bin/bash

## 항상 추가 ##
cd ~/mytraining
export PATH=/usr/local/bin:$PATH

image_file=$1
language=$2
new_language=$3
psm=$4
max_iterations=$5
old_traineddata=$6

if [ $# -ne 6 ] 
then
	echo "Warning: `basename $0` 의 매겨변수의 개수가 올바르지 않습니다."
	exit $WRONG_ARGS
fi

imgae_file_nopath=`basename $image_file`
image_name="${imgae_file_nopath%.*}"
image_file_extension="${imgae_file_nopath##*.}"

# box file 여부 확인 후 없으면 종료
box_file=${image_file/%.${image_file_extension}/.box}
if [ -f $box_file ]
then
	echo "box file exist"
else
	echo "box file not exist"
	exit 0
fi

cp $image_file ~/mytraining/single_train/
cp $box_file ~/mytraining/single_train/

mkdir -p single_train/${language}

# 이전 traineddata에서 정보 추출
combine_tessdata -u ${old_traineddata} ./single_train/${language}/${language}
# all-boxes파일에서 unicharset 추출
unicharset_extractor --output_unicharset "./single_train/my.unicharset" --norm_mode 2 "${box_file}"
# 추출한 unicharset과 이전 traineddata의 unicharset 병합
merge_unicharsets ./single_train/${language}/${language}.lstm-unicharset ./single_train/my.unicharset  ./single_train/${new_language}.unicharset

# create lstmf file
tesseract $image_file ${image_file%.*} --psm ${psm} lstm.train

# lstmf file 위치를 list로 만들기
mv ${image_file/%.${image_file_extension}/.lstmf} ~/mytraining/single_train/
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

# kor은 필수
combine_tessdata -o ./single_train/${new_language}/${new_language}.traineddata \
	./single_train/${language}/${language}.config

# training
lstmtraining \
	--traineddata ./single_train/${new_language}/${new_language}.traineddata \
    --old_traineddata ${old_traineddata} \
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
	
cp -v ./single_train/${new_language}.traineddata ./tesseract/tessdata/

echo "종료"
exit 0