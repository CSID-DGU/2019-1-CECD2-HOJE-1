"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hashExec;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var callexec = require('./callExec.js'); //분류 모듈


function hashExec(_x) {
  return _hashExec.apply(this, arguments);
}

function _hashExec() {
  _hashExec = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(filePath) {
    var hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return callexec("C:\\Users\\FASOO_499\\source\\repos\\DhashModule\\DhashModule.exe", filePath);

          case 2:
            hash = _context.sent;
            hash = hash.replace(/\s+$|\n|\r/g, "");
            return _context.abrupt("return", hash);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _hashExec.apply(this, arguments);
}

;