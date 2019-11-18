var request = require('request');
var fs = require('fs');
const path = require('path');
const PATH = 'C:\\Users\\GIGABYTE\\Desktop\\project\\2019-1-CECD2-HOJE-1\\Front-End\\subImage'; //Todo 경로 설정
const notifier = require('node-notifier');

export default function UploadSubImage(textList,fileName,depart){
    let files = fs.readdirSync(PATH);
    let name = path.basename(fileName);
    let mediaList = [];
    let dataList = textList;
    for(const tmp of files){
        let tmpPath = path.join(PATH,tmp);
        mediaList.push(fs.createReadStream(tmpPath));
    }

    const options = {
        method: "POST",
        url : "http://localhost:8080/multipleFileUpload",
        headers:{
            "Authorization" : "test",
            "Content-Type" : "multipart/form-data"
        },
        formData : {
            "mediaFile" : mediaList,
            "text" : dataList,
            "originFileName" : name,
            "depart" : depart
        }
    };

    //Todo 성공했을 시 noti 작성
    request(options, function(err, body){
        if(err){
            console.log(err);
            notifier.notify({
                title : "Connection failed",
                message : "서버와 연결이 끊어졌습니다."
            })
        }
        console.log(body);
        recursiveDelete(PATH);
    });
}

function recursiveDelete(ppath){
    if(fs.existsSync(ppath)) { //폴더가 존재할 경우
        let files = fs.readdirSync(ppath);
        for (const tmp of files) {
            fs.unlinkSync(path.join(ppath, tmp)); //파일 각각 삭제
        }
        fs.rmdirSync(ppath); //빈 디렉토리 삭제
    }
}