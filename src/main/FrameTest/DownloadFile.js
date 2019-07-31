var request = require('request');
var fs = require('fs');
const notifier = require('node-notifier'); //notification 을 사용하기 위한 모듈

let check1= false,check2 = false;
function DownloadTrainedFile (){
    var req = request("http://192.168.40.206:8080/downloadTrainedFile");
    req.on('response', function (res) {
        //console.log(res);
        let file_name = res.headers['content-disposition'].replace("attachment;filename=", "");
        var fws = fs.createWriteStream('./' + file_name);
        res.pipe(fws);
        res.on('end',()=>{
            check1 = true;
           notification(check1,check2);
        })
    }).on('error',err =>{
        notifier.notify({
            title : "Time out",
            message : "서버와 연결이 끊겼습니다!"
            }
        );
    });
}
function DownloadRex(){
    var req = request("http://192.168.40.206:8080/downloadRexFile");
    req.on('response', function (res) {
        //console.log(res);
        let file_name = res.headers['content-disposition'].replace("attachment;filename=", "")
        var fws = fs.createWriteStream('./' + file_name);
        res.pipe(fws);

        res.on('end', function () {
            check2= true;
            notification(check1,check2);
        });
    });
}

function notification(check1,check2){
    if(check1 && check2){
        notifier.notify({
            title : "업데이트 완료",
            message : "최신 정규식 및 학습 데이터"
        })
    }
}
//학습 파일과 정규식 표현 다운로드

//ToDo 파일의 경로 지정
export default function DownloadFile() {
   DownloadTrainedFile();
   DownloadRex();
}