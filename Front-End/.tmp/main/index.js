'use strict';

var _electron = require('electron');

var _createWindow = require('./createWindow');

var _createWindow2 = _interopRequireDefault(_createWindow);

var _react = require('react');

var _delay = require('delay');

var _delay2 = _interopRequireDefault(_delay);

var _hashExec = require('./FrameTest/hashExec');

var _hashExec2 = _interopRequireDefault(_hashExec);

var _makeDictionary = require('./FrameTest/makeDictionary');

var _makeDictionary2 = _interopRequireDefault(_makeDictionary);

var _electronFetch = require('electron-fetch');

var _electronFetch2 = _interopRequireDefault(_electronFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var PATH = require('path');

var _require = require('./FrameTest/regTojson'),
    regRead = _require.regRead,
    TessNreg = _require.TessNreg;

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var win = void 0;
var data = void 0;

var isPlaying = true;
var isStop = false; //일시 정지 버튼 클릭 여부
var isDoing = false; //반복문이 동작하는지 여부
var isDone = false; //검색 중지
var check = true; //통신 여부
var de = (0, _delay2.default)(250000); //일시 중지

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
    splash.loadURL('file://' + __dirname + '/../../splash.html');
    win = (0, _createWindow2.default)();
    win.window.once('ready-to-show', function () {
        splash.close();
        win.window.show();
        win.window.webContents.openDevTools();
    });
    _electron.ipcMain.on('RESULT1', function (event, result) {
        //결과 이미지 전송 및 반환
        data = result;
        _electron.ipcMain.on('QNA_READY', function () {
            win.window.webContents.send('RESULT2', data);
        });
    });
    _electron.ipcMain.on('TEST1', async function (event, result) {
        for (var i = 0; i < 100; i++) {
            console.log(i);
            win.window.webContents.send('TEST3', i);
            await (0, _delay2.default)(1000);
        }
    });
    _electron.ipcMain.once('START_SEARCH', async function (event, result) {
        isDoing = true;
        await regRead(result); //정규 표현식 파일 읽음
        var tmp = await Exec('C:\\Users\\FASOO_499\\Desktop\\FrameTest', ['.jpg', '.png', '.tif']); //함수 실행
    });
    _electron.ipcMain.once('STOP_SEARCH', function (event, result) {
        isDone = result; //검사 종료
        if (isStop && isPlaying) {
            de.clear();
        }
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
});

_electron.app.on('window-all-closed', function () {
    _electron.app.quit();
});

_electron.app.on('activate', function (_e, hasVisibleWindow) {
    if (!hasVisibleWindow) {
        win = (0, _createWindow2.default)();
    }
});

var Exec = async function Exec(startPath, extension) {
    var files = fs.readdirSync(startPath, { withFileTypes: true }); //해당 디렉토리에 파일 탐색
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = async function _loop() {
            var tmp = _step.value;

            if (isStop && isDoing) {
                //일시 정지
                await de; //딜레이가 종료 될때까지 반복문 await
                de = (0, _delay2.default)(250000);
            }
            if (isDone) return 'break';
            if (tmp.isDirectory()) {
                //디렉토리 경우
                await Exec(PATH.join(startPath, tmp.name), extension); //디렉토리 안의 파일을 탐색(재귀적으로 호출)
            } else {
                //파일 경우
                var ppath = PATH.join(startPath, tmp.name);
                var extname = PATH.extname(ppath);
                //console.log('extname : ' , extname);
                if (extname.match(extension[0]) || extname.match(extension[1]) || extname.match(extension[2])) {
                    //확장자가 jpg,png,tif 일 경우
                    var result1 = void 0,
                        result2 = void 0;
                    result1 = TessNreg(ppath); //Tesseract OCR 및 정규식 표현
                    result2 = (0, _hashExec2.default)(ppath); //문서 분류
                    //결과값을 프로미스 형태로 받기 때문에 프로미스가 완전히 완료 될 때 까지 await
                    await Promise.all([result1, result2]).then(function (resolve) {
                        //ToDO 한개씩 보여줄것인지
                        imageClassification(resolve[0], resolve[1], "HR", ppath, tmp.name); //서버 통신을 통해서 얻은 결과물
                    });
                }
                win.window.webContents.send('SEARCH_START', ppath);
                await (0, _delay2.default)(3);
            }
            await (0, _delay2.default)(3); //사용자에게 가시적으로 보여주기 위한 딜레이
        };

        for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ret = await _loop();

            if (_ret === 'break') break;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return 0; //재귀 호출이기 때문에 리턴
};

var imageClassification = async function imageClassification(result1, hash, depart, ppath, name) {
    var xhr = new XMLHttpRequest(); //서버 통신
    xhr.open('GET', 'http://192.168.40.206:8080/classification?dhashValue=' + hash + '&depart=' + depart);
    var data = null;
    var tmp = await (0, _makeDictionary2.default)(data, name, ppath, result1);
    //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel);
    xhr.onload = async function () {
        console.log('connection success............');
        data = xhr.responseText;
        var tmp = await (0, _makeDictionary2.default)(data, name, ppath, result1); //검사 결과를 딕션너리 형태로
        win.window.webContents.send('RESULT_DICTIONARY', tmp);
        //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel, ' fitness : ' , tmp.fitness);
    };
    xhr.timeout = 2; //시간 2~3초
    xhr.ontimeout = function () {
        console.log('connection failed..............');
        check = false;
    };
    xhr.send();
    // win.window.webContents.send('RESULT_DICTIONARY',tmp);
};