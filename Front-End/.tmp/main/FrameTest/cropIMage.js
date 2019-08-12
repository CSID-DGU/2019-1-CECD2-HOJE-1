"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cropImage;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var cropImageCallExec = require('./cropImageCallExec.js');

function cropImage(_x) {
  return _cropImage.apply(this, arguments);
}

function _cropImage() {
  _cropImage = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(filePath) {
    var modulePath, log;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modulePath = "C:\\Users\\FASOO_499\\source\\repos\\subTextCreater\\x64\\Release\\subTextCreater.exe"; //"C:\\Users\\FASOO_499\\Desktop\\sample6.mask.jpg"; //making file name is sample2.mask.jpg

            _context.next = 3;
            return cropImageCallExec(modulePath, filePath);

          case 3:
            log = _context.sent;
            console.log(log);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _cropImage.apply(this, arguments);
}