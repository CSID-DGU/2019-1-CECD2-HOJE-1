"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = usingRequestModule;

var request = require('request');

var fs = require('fs');

function usingRequestModule(send, fileName, depart) {
  var options = {
    method: "POST",
    url: "http://localhost:8080/singleFileUpload",
    headers: {
      "Authorization": "test",
      "Content-Type": "multipart/form-data"
    },
    formData: {
      "mediaFile": fs.createReadStream(fileName),
      "comment": send,
      "request_depart": depart
    }
  };
  request(options, function (err, body) {
    if (err) console.log(err);
    console.log(body);
  });
}