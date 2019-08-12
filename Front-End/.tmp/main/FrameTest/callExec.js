"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = callExec;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var util = require('util');

function callExec(_x, _x2) {
  return _callExec.apply(this, arguments);
}

function _callExec() {
  _callExec = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(moduleName, filePath) {
    var exec, result, sysArgc, config, _ref, stdout, stderr;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            exec = util.promisify(require('child_process').exec);
            result = ''; //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe'
            //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textDetect_and_recognize\\x64\\Release\\textDetect_and_recognize.exe'

            sysArgc = filePath;
            config = moduleName + ' ' + sysArgc;
            _context.next = 6;
            return exec(config);

          case 6:
            _ref = _context.sent;
            stdout = _ref.stdout;
            stderr = _ref.stderr;
            return _context.abrupt("return", stdout);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _callExec.apply(this, arguments);
}