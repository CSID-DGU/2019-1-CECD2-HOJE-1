'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UploadLog;
var os = require('os');
var moment = require('moment'); //날짜를 사용하기 위한 모듈
var request = require('request');

//ToDo 경로 바꿔야됨
function UploadLog(data) {
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    var ip = detectIpAddress(); //ip 주소
    var jsonArray = new Array();
    var json1 = {};
    var json = {};
    console.log(data);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var t = _step.value;

            var tmp = {
                classification: t.classification,
                fitness: t.fitness,
                fileName: t.fileName,
                filePath: t.filePath,
                detectCount: t.detectCount,
                detectList: t.detectList,
                formLevel: t.formLevel
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
    json1.depart = "HR"; //Todo 부서 동적으로 변경 필요
    json = json1;
    json = JSON.stringify(json);
    //fs.writeFileSync('test.json',json,'utf8'); //테스트 용

    var options = {
        method: "POST",
        url: "http://192.168.40.206:8080/logResultUpload",
        json: true,
        headers: {
            "Authorization": "test",
            "Content-Type": "application/json"
        },
        body: json
    };
    console.log('json : ', json);
    request(options, function (err, body) {
        if (err) console.log('error : ', err);
        console.log('body ', body);
    });
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