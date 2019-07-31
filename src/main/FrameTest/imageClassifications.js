var callexec = require('./callExec.js');
//분류 모듈
module.exports = async function Classifications(filePath, depart) {
    var hash = await callexec(`${__dirname}/DhashModule/DhashModule.exe`, filePath);
    hash = hash.replace(/\s+$|\n|\r/g, "");
    let xhr = new XMLHttpRequest(); //서버 통신
    xhr.open('GET', `http://192.168.40.206:8080/classification?dhashValue=${hash}&depart=${depart}`); //url 216=> 206으로 수정해야됨
    let data = null;
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4 && xhr.status === 200){
            data = xhr.responseText;
        }
    };
    xhr.timeout = 4000; //시간 4초
    xhr.send(null);
    return data; //받은 값 반환

}
