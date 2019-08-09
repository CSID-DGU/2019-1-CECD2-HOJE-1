const os = require('os');
const moment = require('moment'); //날짜를 사용하기 위한 모듈
const request = require('request');

//ToDo 경로 바꿔야됨
export default function UploadLog(data) {
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    let ip = detectIpAddress(); //ip 주소
    let jsonArray = [];
    let json1= {};
    let json = {};
    for (const t of data) {
        let tmp = {
            classification: t.classification,
            fitness: t.fitness,
            fileName: t.fileName,
            filePath: t.filePath,
            detectCount: t.detectCount,
            detectList: t.detectList,
            formLevel: t.formLevel
        };
        jsonArray.push(tmp);
    }
    json1.date = date;
    json1.list = jsonArray;
    json1.ip = ip;
    json1.depart = "HR"; //Todo 부서 동적으로 변경 필요
    json = json1;
    json = JSON.stringify(json);
    //fs.writeFileSync('test.json',json,'utf8'); //테스트 용

    const options = {
        method: "POST",
        url : "http://192.168.40.206:8080/logResultUpload",
        json: true,
        headers:{
            "Authorization" : "test",
            "Content-Type" : "application/json",
        },
        body : json
    };
    request(options, function(err, body){
        if(err) console.log('error : ' , err);
        console.log('body ' , body);
    });
}

function detectIpAddress() {
    let address = os.networkInterfaces();
    let keys = Object.keys(address); //json 형태의 키를 가져온다
    let ip = null;
    if (keys.length <= 1) {
        console.log('인터넷을 연결하세요');
    } else {
        ip = parseKey(address, keys[0]);
    }
    return ip;
}
function parseKey(address, key) {
    return address[key][1].address
}