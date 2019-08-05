import {app, BrowserWindow, ipcMain} from 'electron';
import createWindow from './createWindow';
import {useState} from "react";
import delay from 'delay';
import hashExec from "./FrameTest/hashExec";
import makeDictionary from "./FrameTest/makeDictionary";
const fs = require('fs');
const PATH = require('path');
const {regRead, TessNreg} = require('./FrameTest/regTojson');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import fetch from 'electron-fetch';
let win;
let data;

let isPlaying = true;
let isStop = false; //일시 정지 버튼 클릭 여부
let isDoing = false; //반복문이 동작하는지 여부
let isDone = false; //검색 중지
let check = true; //통신 여부
let de = delay(250000); //일시 중지

app.on('ready', () => {
    let splash = new BrowserWindow({
        width: 600,
        height: 300,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }

    }); //splash 화면
    splash.loadURL(`file://${__dirname}/../../splash.html`);
    win = createWindow();
    win.window.once('ready-to-show', () => {
        splash.close();
        win.window.show();
        win.window.webContents.openDevTools();
    });
    ipcMain.on('RESULT1', (event, result) => { //결과 이미지 전송 및 반환
        data = result;
        ipcMain.on('QNA_READY', () => {
            win.window.webContents.send('RESULT2', data);
        })
    });
    ipcMain.on('TEST1',async (event,result)=>{
        for(let i = 0 ; i < 100 ; i++){
            console.log(i);
            win.window.webContents.send('TEST3',i);
            await delay(1000);
        }
    })
    ipcMain.once('START_SEARCH',async (event,result)=>{
        isDoing = true;
        await regRead(result); //정규 표현식 파일 읽음
        let tmp = await Exec(`C:\\Users\\FASOO_499\\Desktop\\FrameTest`, ['.jpg', '.png', '.tif']); //함수 실행
    });
    ipcMain.once('STOP_SEARCH',(event,result)=>{
        isDone = result; //검사 종료
        if(isStop && isPlaying){
            de.clear();
        }
    });
    ipcMain.on('PAUSE_SEARCH',(event,result)=>{
        isStop = result; //일시 정지
        isPlaying = false;
    });
    ipcMain.on('RESTART_SEARCH',(event,result)=>{
        de.clear(); //다시 시작
        isStop = false;
        isPlaying = true;
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', (_e, hasVisibleWindow) => {
    if (!hasVisibleWindow) {
        win = createWindow();
    }
});

const Exec = async function (startPath, extension) {
    let files = fs.readdirSync(startPath, {withFileTypes: true}); //해당 디렉토리에 파일 탐색
    for (const tmp of files) {
        if (isStop && isDoing) { //일시 정지
            await de; //딜레이가 종료 될때까지 반복문 await
            de = delay(250000);
        }
        if (isDone)
            break;
        if (tmp.isDirectory()) { //디렉토리 경우
            await Exec(PATH.join(startPath, tmp.name), extension); //디렉토리 안의 파일을 탐색(재귀적으로 호출)
        } else { //파일 경우
            let ppath = PATH.join(startPath, tmp.name);
            let extname = PATH.extname(ppath);
            //console.log('extname : ' , extname);
            if (extname.match(extension[0]) || extname.match(extension[1]) || extname.match(extension[2])) { //확장자가 jpg,png,tif 일 경우
                let result1, result2;
                result1 = TessNreg(ppath); //Tesseract OCR 및 정규식 표현
                result2 = hashExec(ppath); //문서 분류
                //결과값을 프로미스 형태로 받기 때문에 프로미스가 완전히 완료 될 때 까지 await
                await Promise.all([result1, result2]).then(resolve => { //ToDO 한개씩 보여줄것인지
                   imageClassification(resolve[0], resolve[1], "HR", ppath, tmp.name); //서버 통신을 통해서 얻은 결과물
                });
            }
            win.window.webContents.send('SEARCH_START',ppath);
            await delay(3);
        }
        await delay(3); //사용자에게 가시적으로 보여주기 위한 딜레이
    }
    return 0; //재귀 호출이기 때문에 리턴
};

const imageClassification = async (result1, hash, depart, ppath, name) => {
    let xhr = new XMLHttpRequest(); //서버 통신
    xhr.open('GET', `http://192.168.40.206:8080/classification?dhashValue=${hash}&depart=${depart}`);
    let data = null;
    let tmp = await makeDictionary(data, name, ppath, result1);
    //console.log('name : ' , name , ' hash : ' , hash , ' filePath : ' , ppath , ' formlevel : ', tmp.formLevel);
    xhr.onload = async function () {
        console.log('connection success............');
        data = xhr.responseText;
        let tmp = await makeDictionary(data, name, ppath, result1); //검사 결과를 딕션너리 형태로
        win.window.webContents.send('RESULT_DICTIONARY',tmp);
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