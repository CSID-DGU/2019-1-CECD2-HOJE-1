'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UploadSubImage;
var request = require('request');
var fs = require('fs');
var path = require('path');
var PATH = 'C:\\Users\\FASOO_499\\Desktop\\image'; //Todo 경로 설정
var notifier = require('node-notifier');

function UploadSubImage(textList, fileName, depart) {
    var files = fs.readdirSync(PATH);
    var name = path.basename(fileName);
    var mediaList = [];
    var dataList = textList;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var tmp = _step.value;

            var tmpPath = path.join(PATH, tmp);
            mediaList.push(fs.createReadStream(tmpPath));
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

    var options = {
        method: "POST",
        url: "http://192.168.40.206:8080/multipleFileUpload",
        headers: {
            "Authorization": "test",
            "Content-Type": "multipart/form-data"
        },
        formData: {
            "mediaFile": mediaList,
            "text": dataList,
            "originFileName": name,
            "depart": depart
        }
    };

    //Todo 성공했을 시 noti 작성
    request(options, function (err, body) {
        if (err) {
            console.log(err);
            notifier.notify({
                title: "Connection failed",
                message: "서버와 연결이 끊어졌습니다."
            });
        }
        console.log(body);
    });
}