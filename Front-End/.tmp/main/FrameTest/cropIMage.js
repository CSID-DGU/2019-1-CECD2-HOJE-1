"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cropImageCallExec = require('./cropImageCallExec.js');

exports.default = async function main(filePath) {

    var modulePath = "C:\\Users\\FASOO_499\\source\\repos\\subTextCreater\\x64\\Release\\subTextCreater.exe";
    //"C:\\Users\\FASOO_499\\Desktop\\sample6.mask.jpg"; //making file name is sample2.mask.jpg
    var log = await cropImageCallExec(modulePath, filePath);

    console.log(log);
};