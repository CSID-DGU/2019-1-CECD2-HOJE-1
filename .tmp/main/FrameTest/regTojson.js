'use strict';

var callExec = require('./callExec');
var fs = require('fs');
var data = fs.readFileSync('./reg/reg.json', 'utf8');

var k = [],
    v = [];
var key = [],
    pattern = [];
data = JSON.parse(data);
//파일 경로와 설정에서 선택한 리스트들이 인자값
async function TessNreg(filePath) {
    var textOriginal = await callExec('C:\\Users\\FASOO_499\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe', filePath);
    var text = textOriginal.replace(/ /gi, ""); //문자열내에 모든 공백을 제거하기 위해서 사용
    text = text.replace(/:|\.|\,/gi, " ");
    var result = await regExe(text);
    result.sentence = textOriginal;
    return result;
};

//정규식 표현을 읽어드리는 모듈
function regRead(checkList) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data.reg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _t = _step.value;

            k.push(_t.key);
            v.push(_t.value);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    for (var i = 0; i < k.length; i++) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = checkList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var t = _step2.value;

                if (t.match(k[i])) {
                    pattern.push(v[i]);
                    key.push(k[i]);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
}

var check = function check(text, pattern, index, result) {
    return new Promise(function (resolve) {
        var reg = new RegExp(pattern);
        var tmp = reg.test(text); //정규표현식으로 입력값이 어떤 항목인지 검출
        // console.log('text : ', text + ' pattern : ' + pattern + 'index : ', index + ' flag : ' + tmp + '\n');
        if (tmp) {
            result.key.push(key[index]);
            resolve(result); //항목에 일치하는 값이 있을 경우 resolve
        }
    }).then(function (result) {
        result.count += 1;
        //console.log('검출된 항목 : ',result.key, 'count : ', result.count);
    });
};

//정규식을 수행하기 위한 함수
async function regExe(text) {
    var promise = void 0;
    var result = { //정보를 저장할 객체
        key: [],
        count: 0,
        sentence: ''
    };
    var textArray = text.split(/ |\r|\n|\r\n/); //정규식으로 표현
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        var _loop = async function _loop() {
            var t = _step3.value;

            promise = pattern.map(function (element, index) {
                check(t.trim(), element, index, result);
            });
            await Promise.all(promise);
        };

        for (var _iterator3 = textArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            await _loop();
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    result.key = Array.from(new Set(result.key)); //중복되는 부분 set으로 변환시킨후 다시 Array로 변환
    return result;
}

//리스트 리셋
function regReset() {
    k = [];
    v = [];
    key = [];
    pattern = [];
}
module.exports = {
    regRead: regRead,
    regReset: regReset,
    TessNreg: TessNreg
};