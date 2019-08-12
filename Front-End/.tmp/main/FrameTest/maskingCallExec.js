"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = maskingCallExec;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var util = require('util');

function maskingCallExec(_x, _x2, _x3) {
  return _maskingCallExec.apply(this, arguments);
}

function _maskingCallExec() {
  _maskingCallExec = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(moduleName, filePath, mode) {
    var exec, result, sysArgc, modeArgc, config, _ref, stdout, stderr;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            exec = util.promisify(require('child_process').exec);
            result = ''; //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe'
            //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textDetect_and_recognize\\x64\\Release\\textDetect_and_recognize.exe'

            sysArgc = filePath;
            modeArgc = mode;
            config = moduleName + ' ' + sysArgc + ' ' + modeArgc;
            console.log(config);
            _context.next = 8;
            return exec(config);

          case 8:
            _ref = _context.sent;
            stdout = _ref.stdout;
            stderr = _ref.stderr;
            return _context.abrupt("return", stdout);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _maskingCallExec.apply(this, arguments);
}

;