"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = main;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var maskingCallexec = require('./maskingCallExec.js');

function main(_x, _x2) {
  return _main.apply(this, arguments);
}

function _main() {
  _main = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(filePath, mode) {
    var modulePath, m, log;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modulePath = "C:\\Users\\GIGABYTE\\source\\repos\\recoveringMasking\\x64\\Release\\recoveringMasking.exe"; //"C:\\Users\\FASOO_499\\Desktop\\sample6.mask.jpg"; //making file name is sample2.mask.jpg

            m = mode; // or unmasking

            _context.next = 4;
            return maskingCallexec(modulePath, filePath, m);

          case 4:
            log = _context.sent;
            console.log(log);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _main.apply(this, arguments);
}