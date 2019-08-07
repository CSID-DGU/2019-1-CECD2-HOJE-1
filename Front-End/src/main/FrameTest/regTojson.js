const callExec = require('./callExec');
const fs = require('fs');
let data = fs.readFileSync(`./reg/reg.json`, 'utf8');

let k = [], v = [];
let key = [], pattern = [];
data = JSON.parse(data);
//파일 경로와 설정에서 선택한 리스트들이 인자값
async function TessNreg(filePath){
    let textOriginal = await callExec('C:\\Users\\FASOO_499\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe',filePath);
    let text = textOriginal.replace(/ /gi,""); //문자열내에 모든 공백을 제거하기 위해서 사용
    text = text.replace(/:|\.|\,/gi," ");
    let result = await regExe(text);
    result.sentence = textOriginal;
    return result;
};

//정규식 표현을 읽어드리는 모듈
function regRead(checkList){
    for (const t of data.reg) {
        k.push(t.key);
        v.push(t.value);
    }
    for(let i = 0 ; i < k.length; i++){
        for(const t of checkList){
            if(t.match(k[i])){
                pattern.push(v[i]);
                key.push(k[i]);
            }
        }
    }
}

const check = (text, pattern, index, result) => {
    return new Promise((resolve) => {
        let reg = new RegExp(pattern);
        let tmp = reg.test(text); //정규표현식으로 입력값이 어떤 항목인지 검출
        // console.log('text : ', text + ' pattern : ' + pattern + 'index : ', index + ' flag : ' + tmp + '\n');
        if (tmp) {
            result.key.push(key[index]);
            resolve(result); //항목에 일치하는 값이 있을 경우 resolve
        }
    }).then((result) => {
        result.count += 1;
        //console.log('검출된 항목 : ',result.key, 'count : ', result.count);
    });
};

//정규식을 수행하기 위한 함수
async function regExe(text) {
    let promise;
    let result = { //정보를 저장할 객체
        key: [],
        count: 0,
        sentence: ''
    };
    let textArray = text.split(/ |\r|\n|\r\n/); //정규식으로 표현
    for (const t of textArray) {
        promise = pattern.map((element, index) => {
            check(t.trim(), element, index, result);
        });
        await Promise.all(promise);
    }
    result.key = Array.from(new Set(result.key)); //중복되는 부분 set으로 변환시킨후 다시 Array로 변환
    return result;
}

//리스트 리셋
function regReset(){
    k =[];
    v = [];
    key = [];
    pattern = [];
}
module.exports ={
    regRead : regRead,
    regReset : regReset,
    TessNreg : TessNreg
};