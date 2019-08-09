"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = DownloadFile;

var request = require('request');

var fs = require('fs');

var notifier = require('node-notifier'); //notification 을 사용하기 위한 모듈


var path = require('path');

var check1 = false,
    check2 = false;

function DownloadTrainedFile() {
  var req = request("http://192.168.40.206:8080/downloadTrainedFile", {
    timeout: 4000
  }, function (err) {
    if (err) {
      notifier.notify({
        title: "Time out",
        message: "서버와 연결이 끊겼습니다!",
        wait: true
      });
    }
  });
  req.on('response', function (res) {
    var file_name = res.headers['content-disposition'].replace("attachment;filename=", "");
    var fws = fs.createWriteStream('./' + file_name);
    res.pipe(fws);
    res.on('end', function () {
      check1 = true;
    });
  });
}

function DownloadRex() {
  //C:\vcpkg\installed\x64-windows\tools\tesseract\tessdata
  var req = request("http://192.168.40.206:8080/downloadRexFile", {
    timeout: 4000
  }, function (err) {
    if (err) {
      notifier.notify({
        title: "Time out",
        message: "서버와 연결이 끊겼습니다!",
        wait: true
      });
    }
  });
  req.on('response', function (res) {
    var file_name = res.headers['content-disposition'].replace("attachment;filename=", "");
    var fws = fs.createWriteStream('./' + file_name);
    res.pipe(fws);
    res.on('end', function () {
      notification(true);
    });
  });
}

function notification(check2) {
  if (check2) {
    notifier.notify({
      title: "업데이트 완료",
      message: "최신 정규식 및 학습 데이터",
      wait: true
    });
  }
} //학습 파일과 정규식 표현 다운로드
//ToDo 파일의 경로 지정


function DownloadFile() {
  DownloadTrainedFile();
  DownloadRex();
}