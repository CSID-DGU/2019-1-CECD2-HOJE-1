"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var maskingCallexec = require('./maskingCallExec.js');

exports.default = async function main(filePath) {

    var modulePath = "C:\\Users\\FASOO_499\\source\\repos\\recoveringMasking\\x64\\Release\\recoveringMasking.exe";
    //"C:\\Users\\FASOO_499\\Desktop\\sample6.mask.jpg"; //making file name is sample2.mask.jpg
    var mode = "masking"; // or unmasking

    var log = await maskingCallexec(modulePath, filePath, mode);

    console.log(log);
};