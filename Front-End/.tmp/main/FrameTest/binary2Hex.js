"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = binary2Hex;

function binary2Hex(binaryStr) {
  var output = '';

  for (var i = 0; i < binaryStr.length; i += 4) {
    var bytes = binaryStr.substr(i, 4);
    var decimal = parseInt(bytes, 2);
    var hex = decimal.toString(16);
    output += hex;
  }

  return output;
}