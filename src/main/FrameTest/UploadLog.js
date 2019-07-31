const fs = require('fs');
const os = require('os');
const moment = require('moment'); //날짜를 사용하기 위한 모듈
let data = fs.readFileSync(`C:\\Users\\FASOO_499\\Desktop\\resultfile.json`, 'utf8');  //최근 json 파일
function makeJSonFile(data) {
    let date = moment().format('YYYY-MM-DD HH:mm:ss');
    let ip = detectIpAddress(); //ip 주소
    let jsonArray = new Array();
    let json1= {};
    let json = {};

    data = JSON.parse(data);
    for (const t of data) {
        let tmp = {
            Classfication: t.ClASSIFICATION,
            Fitness: t.FITNESS,
            FileName: t.FileName,
            FilePath: t.FILEPATH,
            DetectCount: t.DETECTCOUNT,
            Detectlist: t.DETECTLIST,
            FormLevel: t.formLevel
        }
        jsonArray.push(tmp);
    }
    json1.date = date;
    json1.list = jsonArray;
    json1.ip = ip;
    json = json1;
    json = JSON.stringify(json);
    //fs.writeFileSync('test.json',json,'utf8'); //테스트 용
    console.log(json);
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
makeJSonFile(data);