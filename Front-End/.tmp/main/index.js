"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _electron = require("electron");

var _createWindow = _interopRequireDefault(require("./createWindow"));

var _react = require("react");

var _delay = _interopRequireDefault(require("delay"));

var _hashExec = _interopRequireDefault(require("./FrameTest/hashExec"));

var _makeDictionary = _interopRequireDefault(require("./FrameTest/makeDictionary"));

var _uploadLog = _interopRequireDefault(require("./FrameTest/uploadLog"));

var fs = require('fs');

var PATH = require('path');

var notifier = require('node-notifier');

var _require = require('./FrameTest/regTojson'),
    regRead = _require.regRead,
    TessNreg = _require.TessNreg,
    regReset = _require.regReset;

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var win;
var data;
var isPlaying = true;
var isStop = false; //일시 정지 버튼 클릭 여부

var isDoing = false; //반복문이 동작하는지 여부

var isDone = false; //검색 중지

var check = true; //통신 여부

var de = (0, _delay["default"])(250000); //Todo 일시정지 시간 조정

var tmpList = [];

_electron.app.on('ready', function () {
  var splash = new _electron.BrowserWindow({
    width: 600,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  }); //splash 화면

  splash.loadURL("file://".concat(__dirname, "/../../splash.html"));
  win = (0, _createWindow["default"])();
  win.window.once('ready-to-show', function () {
    splash.close();
    win.window.show();
    win.window.webContents.openDevTools();
  });

  _electron.ipcMain.on('RESULT1', function (event, result) {
    //QnA 페이지에 결과 이미지 전송 및 반환
    data = result;

    _electron.ipcMain.on('QNA_READY', function () {
      win.window.webContents.send('RESULT2', data);
    });
  });

  _electron.ipcMain.on('START_SEARCH',
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(event, result) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              //검색 시작
              isDoing = true;
              isDone = false;
              isPlaying = true;
              isStop = false;
              _context2.next = 6;
              return regRead(result);

            case 6:
              //정규 표현식 파일 읽음
              _electron.ipcMain.on('PATH',
              /*#__PURE__*/
              function () {
                var _ref2 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(event, result) {
                  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tmpPath, tmp;

                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context.prev = 3;
                          _iterator = result[Symbol.iterator]();

                        case 5:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 13;
                            break;
                          }

                          tmpPath = _step.value;
                          _context.next = 9;
                          return Exec(tmpPath, ['.jpg', '.png', '.tif']);

                        case 9:
                          tmp = _context.sent;

                        case 10:
                          _iteratorNormalCompletion = true;
                          _context.next = 5;
                          break;

                        case 13:
                          _context.next = 19;
                          break;

                        case 15:
                          _context.prev = 15;
                          _context.t0 = _context["catch"](3);
                          _didIteratorError = true;
                          _iteratorError = _context.t0;

                        case 19:
                          _context.prev = 19;
                          _context.prev = 20;

                          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                            _iterator["return"]();
                          }

                        case 22:
                          _context.prev = 22;

                          if (!_didIteratorError) {
                            _context.next = 25;
                            break;
                          }

                          throw _iteratorError;

                        case 25:
                          return _context.finish(22);

                        case 26:
                          return _context.finish(19);

                        case 27:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[3, 15, 19, 27], [20,, 22, 26]]);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _electron.ipcMain.on('STOP_SEARCH', function (event, result) {
    isDone = result; //검사 종료

    _electron.ipcMain.once('TEST1', function (event, result) {
      tmpList = result;

      if (tmpList.length > 0 && check === true) {
        //배열에 값이 들어 갔을 경우 && 완전히 통신이 완료 됐을 경우
        var json = JSON.stringify(tmpList);
        fs.writeFileSync('resultfile.json', json, 'utf8'); //Todo 경로 위치 바꿔야 됨

        console.log('file created');
        (0, _uploadLog["default"])(tmpList); //서버에 최근 검사한 내역 전송
      }
    });

    if (isStop && isPlaying) {
      de.clear();
    }

    regReset();
  });

  _electron.ipcMain.on('PAUSE_SEARCH', function (event, result) {
    isStop = result; //일시 정지

    isPlaying = false;
  });

  _electron.ipcMain.on('RESTART_SEARCH', function (event, result) {
    de.clear(); //다시 시작

    isStop = false;
    isPlaying = true;
  });

  _electron.ipcMain.on('RESULT_PAGE', function (event, result) {
    //Result 페이지에 결과 배열 전송
    if (result) {
      win.window.webContents.send('RESULT_LIST', tmpList);
      tmpList = [];
    }
  });
});

_electron.app.on('window-all-closed', function () {
  _electron.app.quit();
});

_electron.app.on('activate', function (_e, hasVisibleWindow) {
  if (!hasVisibleWindow) {
    win = (0, _createWindow["default"])();
  }
});

var Exec =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(startPath, extension) {
    var files, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2, _ret;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            files = fs.readdirSync(startPath, {
              withFileTypes: true
            }); //해당 디렉토리에 파일 탐색

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context4.prev = 4;
            _loop =
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee3() {
              var tmp, ppath, extname, result1, result2;
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      tmp = _step2.value;

                      if (!(isStop && isDoing)) {
                        _context3.next = 5;
                        break;
                      }

                      _context3.next = 4;
                      return de;

                    case 4:
                      //딜레이가 종료 될때까지 반복문 await
                      de = (0, _delay["default"])(250000);

                    case 5:
                      if (!isDone) {
                        _context3.next = 7;
                        break;
                      }

                      return _context3.abrupt("return", "break");

                    case 7:
                      if (!tmp.isDirectory()) {
                        _context3.next = 12;
                        break;
                      }

                      _context3.next = 10;
                      return Exec(PATH.join(startPath, tmp.name), extension);

                    case 10:
                      _context3.next = 24;
                      break;

                    case 12:
                      //파일 경우
                      ppath = PATH.join(startPath, tmp.name);
                      extname = PATH.extname(ppath); //console.log('extname : ' , extname);

                      if (!(extname.match(extension[0]) || extname.match(extension[1]) || extname.match(extension[2]))) {
                        _context3.next = 19;
                        break;
                      }

                      //확장자가 jpg,png,tif 일 경우
                      result1 = TessNreg(ppath); //Tesseract OCR 및 정규식 표현

                      result2 = (0, _hashExec["default"])(ppath); //문서 분류
                      //결과값을 프로미스 형태로 받기 때문에 프로미스가 완전히 완료 될 때 까지 await

                      _context3.next = 19;
                      return Promise.all([result1, result2]).then(function (resolve) {
                        //ToDO 한개씩 보여줄것인지
                        imageClassification(resolve[0], resolve[1], "HR", ppath, tmp.name); //서버 통신을 통해서 얻은 결과물
                      });

                    case 19:
                      if (check) {
                        _context3.next = 21;
                        break;
                      }

                      return _context3.abrupt("return", "break");

                    case 21:
                      //통신 오류시 멈춤
                      win.window.webContents.send('SEARCH_START', ppath);
                      _context3.next = 24;
                      return (0, _delay["default"])(3);

                    case 24:
                      _context3.next = 26;
                      return (0, _delay["default"])(3);

                    case 26:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            });
            _iterator2 = files[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context4.next = 15;
              break;
            }

            return _context4.delegateYield(_loop(), "t0", 9);

          case 9:
            _ret = _context4.t0;

            if (!(_ret === "break")) {
              _context4.next = 12;
              break;
            }

            return _context4.abrupt("break", 15);

          case 12:
            _iteratorNormalCompletion2 = true;
            _context4.next = 7;
            break;

          case 15:
            _context4.next = 21;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t1 = _context4["catch"](4);
            _didIteratorError2 = true;
            _iteratorError2 = _context4.t1;

          case 21:
            _context4.prev = 21;
            _context4.prev = 22;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 24:
            _context4.prev = 24;

            if (!_didIteratorError2) {
              _context4.next = 27;
              break;
            }

            throw _iteratorError2;

          case 27:
            return _context4.finish(24);

          case 28:
            return _context4.finish(21);

          case 29:
            return _context4.abrupt("return", 0);

          case 30:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[4, 17, 21, 29], [22,, 24, 28]]);
  }));

  return function Exec(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var imageClassification =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6(result1, hash, depart, ppath, name) {
    var xhr;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            xhr = new XMLHttpRequest(); //서버 통신

            xhr.open('GET', "http://192.168.40.206:8080/classification?dhashValue=".concat(hash, "&depart=").concat(depart)); //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel);

            /*xhr.onload = async function () {
                console.log('connection success............');
                data = xhr.responseText;
                let tmp = await makeDictionary(data, name, ppath, result1); //검사 결과를 딕션너리 형태로
                win.window.webContents.send('RESULT_DICTIONARY',tmp);
                //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel, ' fitness : ' , tmp.fitness);
            };*/

            xhr.onreadystatechange =
            /*#__PURE__*/
            (0, _asyncToGenerator2["default"])(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee5() {
              var tmp;
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!(this.readyState === 4 && this.status === 200)) {
                        _context5.next = 8;
                        break;
                      }

                      data = xhr.responseText;
                      _context5.next = 4;
                      return (0, _makeDictionary["default"])(data, name, ppath, result1);

                    case 4:
                      tmp = _context5.sent;
                      //검사 결과를 딕션너리 형태로
                      win.window.webContents.send('RESULT_DICTIONARY', tmp);
                      _context5.next = 9;
                      break;

                    case 8:
                      if (this.readyState === 4 && this.status === 0) {
                        check = false;
                        notifier.notify({
                          title: "Connection failed..",
                          message: '서버와 연결이 끊어 졌습니다.'
                        });
                      }

                    case 9:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));

            xhr.ontimeout = function () {
              console.log('connection failed..............');
              check = false;
            };

            xhr.send();

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function imageClassification(_x7, _x8, _x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();