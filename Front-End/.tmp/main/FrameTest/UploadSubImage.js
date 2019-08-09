"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UploadSubImage;

var request = require('request');

var fs = require('fs');

var path = require('path');

var PATH = "C:\\Users\\FASOO_499\\Desktop\\image"; //Todo 경로 설정

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
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
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
  }; //Todo 성공했을 시 noti 작성

  request(options, function (err, body) {
    if (err) {
      console.log(err);
      notifier.notify({
        title: "Connection failed",
        message: "서버와 연결이 끊어졌습니다."
      });
    }

    console.log(body);
    recursiveDelete(PATH);
  });
}

function recursiveDelete(ppath) {
  if (fs.existsSync(ppath)) {
    //폴더가 존재할 경우
    var files = fs.readdirSync(ppath);
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var tmp = _step2.value;
        fs.unlinkSync(path.join(ppath, tmp)); //파일 각각 삭제
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    fs.rmdirSync(ppath); //빈 디렉토리 삭제
  }
}