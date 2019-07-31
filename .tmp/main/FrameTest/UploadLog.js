'use strict';

var fs = require('fs');
var os = require('os');
var moment = require('moment'); //날짜를 사용하기 위한 모듈
var data = fs.readFileSync('C:\\Users\\FASOO_499\\Desktop\\resultfile.json', 'utf8'); //최근 json 파일
function makeJSonFile(data) {
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    var ip = detectIpAddress(); //ip 주소
    var jsonArray = new Array();
    var json1 = {};
    var json = {};

    data = JSON.parse(data);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var t = _step.value;

            var tmp = {
                Classfication: t.ClASSIFICATION,
                Fitness: t.FITNESS,
                FileName: t.FileName,
                FilePath: t.FILEPATH,
                DetectCount: t.DETECTCOUNT,
                Detectlist: t.DETECTLIST,
                FormLevel: t.formLevel
            };
            jsonArray.push(tmp);
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

    json1.date = date;
    json1.list = jsonArray;
    json1.ip = ip;
    json = json1;
    json = JSON.stringify(json);
    //fs.writeFileSync('test.json',json,'utf8'); //테스트 용
    console.log(json);
}

function detectIpAddress() {
    var address = os.networkInterfaces();
    var keys = Object.keys(address); //json 형태의 키를 가져온다
    var ip = null;
    if (keys.length <= 1) {
        console.log('인터넷을 연결하세요');
    } else {
        ip = parseKey(address, keys[0]);
    }
    return ip;
}
function parseKey(address, key) {
    return address[key][1].address;
}
makeJSonFile(data);