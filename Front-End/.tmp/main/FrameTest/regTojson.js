"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var callExec = require('./callExec');

var fs = require('fs');

var data = fs.readFileSync("./reg/reg.json", 'utf8');
var k = [],
    v = [];
var key = [],
    pattern = [];
data = JSON.parse(data); //파일 경로와 설정에서 선택한 리스트들이 인자값

function TessNreg(_x) {
  return _TessNreg.apply(this, arguments);
}

function _TessNreg() {
  _TessNreg = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(filePath) {
    var textOriginal, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return callExec("C:\\Users\\FASOO_499\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe", filePath);

          case 2:
            textOriginal = _context.sent;
            //let text = textOriginal.replace(/ /gi,""); //문자열내에 모든 공백을 제거하기 위해서 사용
            console.log(textOriginal); //text = text.replace(/:|\.|\,/gi," ");

            _context.next = 6;
            return regExe(textOriginal);

          case 6:
            result = _context.sent;
            result.sentence = textOriginal;
            console.log(result);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _TessNreg.apply(this, arguments);
}

; //정규식 표현을 읽어드리는 모듈

function regRead(checkList) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.reg[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _t = _step.value;
      k.push(_t.key);
      v.push(_t.value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = 0; i < k.length; i++) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = checkList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var t = _step2.value;

        if (t.match(k[i])) {
          pattern.push(v[i]);
          key.push(k[i]);
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
}

var check = function check(text, pattern, index, result) {
  return new Promise(function (resolve) {
    var reg = new RegExp(pattern);
    var tmp = reg.test(text); //정규표현식으로 입력값이 어떤 항목인지 검출
    // console.log('text : ', text + ' pattern : ' + pattern + 'index : ', index + ' flag : ' + tmp + '\n');

    if (tmp) {
      result.key.push(key[index]);
      resolve(result); //항목에 일치하는 값이 있을 경우 resolve
    }
  }).then(function (result) {
    result.count += 1; //console.log('검출된 항목 : ',result.key, 'count : ', result.count);
  });
}; //정규식을 수행하기 위한 함수


function regExe(_x2) {
  return _regExe.apply(this, arguments);
} //리스트 리셋


function _regExe() {
  _regExe = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(text) {
    var promise, result, textArray, tmpArray, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = {
              //정보를 저장할 객체
              key: [],
              count: 0,
              sentence: ''
            };
            textArray = text.split(/\r|\n|\r\n/); //정규식으로 표현

            tmpArray = textArray.filter(function (element) {
              //정규식으로 나뉘어진 배열에 '' 요소 제거
              if (element !== '') {
                return element;
              }
            });
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 6;
            _loop =
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee2() {
              var t;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      t = _step3.value;
                      promise = pattern.map(function (element, index) {
                        check(t.trim(), element, index, result);
                      });
                      _context2.next = 4;
                      return Promise.all(promise);

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            });
            _iterator3 = tmpArray[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context3.next = 14;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 11);

          case 11:
            _iteratorNormalCompletion3 = true;
            _context3.next = 9;
            break;

          case 14:
            _context3.next = 20;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t1 = _context3["catch"](6);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t1;

          case 20:
            _context3.prev = 20;
            _context3.prev = 21;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 23:
            _context3.prev = 23;

            if (!_didIteratorError3) {
              _context3.next = 26;
              break;
            }

            throw _iteratorError3;

          case 26:
            return _context3.finish(23);

          case 27:
            return _context3.finish(20);

          case 28:
            result.key = Array.from(new Set(result.key)); //중복되는 부분 set으로 변환시킨후 다시 Array로 변환

            return _context3.abrupt("return", result);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[6, 16, 20, 28], [21,, 23, 27]]);
  }));
  return _regExe.apply(this, arguments);
}

function regReset() {
  k = [];
  v = [];
  key = [];
  pattern = [];
}

module.exports = {
  regRead: regRead,
  regReset: regReset,
  TessNreg: TessNreg
};