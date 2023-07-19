"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = quasiFinding;

var request = require('request');

var tableInfo = require('../../../reg/table');

var tableAttribute = Object.keys(tableInfo["table"][0]);

function quasiFinding() {
  var options = {
    method: "POST",
    url: "http://localhost:8080/findingQuasi",
    json: true,
    headers: {
      "Authorization": "test",
      "Content-Type": "application/json"
    },
    formData: {
      "tableInfo": JSON.stringify(tableInfo),
      "attribute": tableAttribute
    }
  };
  return new Promise(function (resolve, reject) {
    request(options, function (err, body) {
      if (err) console.log(err); //console.log('body : ', body.body);

      resolve(body.body);
    });
  });
}