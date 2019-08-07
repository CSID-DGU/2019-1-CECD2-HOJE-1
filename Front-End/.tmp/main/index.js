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

var _UploadLog = require('./FrameTest/UploadLog');

var _UploadLog2 = _interopRequireDefault(_UploadLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var PATH = require('path');
var notifier = require('node-notifier');

var _require = require('./FrameTest/regTojson'),
    regRead = _require.regRead,
    TessNreg = _require.TessNreg,
    regReset = _require.regReset;

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var win = void 0;
var data = void 0;

var isPlaying = true;
var isStop = false; //일시 정지 버튼 클릭 여부
var isDoing = false; //반복문이 동작하는지 여부
var isDone = false; //검색 중지
var check = true; //통신 여부
var de = (0, _delay2.default)(250000); //Todo 일시정지 시간 조정
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
    splash.loadURL('file://' + __dirname + '/../../splash.html');
    win = (0, _createWindow2.default)();
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
    _electron.ipcMain.on('START_SEARCH', async function (event, result) {
        //검색 시작
        isDoing = true;
        isDone = false;
        isPlaying = true;
        isStop = false;
        await regRead(result); //정규 표현식 파일 읽음
        var tmp = await Exec('C:\\Users\\FASOO_499\\Desktop\\FrameTest', ['.jpg', '.png', '.tif']); //함수 실행
    });
    _electron.ipcMain.on('STOP_SEARCH', function (event, result) {
        isDone = result; //검사 종료
        _electron.ipcMain.once('TEST1', function (event, result) {
            tmpList = result;
            if (tmpList.length > 0 && check === true) {
                //배열에 값이 들어 갔을 경우 && 완전히 통신이 완료 됐을 경우
                var json = JSON.stringify(tmpList);
                fs.writeFileSync('resultfile.json', json, 'utf8'); //Todo 경로 위치 바꿔야 됨
                console.log('file created');
                // UploadLog(tmpList);
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
                if (!check) return 'break'; //통신 오류시 멈춤
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
    //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel);
    /*xhr.onload = async function () {
        console.log('connection success............');
        data = xhr.responseText;
        let tmp = await makeDictionary(data, name, ppath, result1); //검사 결과를 딕션너리 형태로
        win.window.webContents.send('RESULT_DICTIONARY',tmp);
        //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel, ' fitness : ' , tmp.fitness);
    };*/

    xhr.onreadystatechange = async function () {
        if (this.readyState === 4 && this.status === 200) {
            data = xhr.responseText;
            var _tmp = await (0, _makeDictionary2.default)(data, name, ppath, result1); //검사 결과를 딕션너리 형태로
            win.window.webContents.send('RESULT_DICTIONARY', _tmp);
        } else if (this.readyState === 4 && this.status === 0) {
            check = false;
            notifier.notify({
                title: "Connection failed..",
                message: '서버와 연결이 끊어 졌습니다.'
            });
        }
    };
    xhr.ontimeout = function () {
        console.log('connection failed..............');
        check = false;
    };
    xhr.send();
};