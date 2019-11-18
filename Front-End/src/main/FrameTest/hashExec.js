var callexec = require('./callExec.js');
//분류 모듈
module.exports = async function hashExec(filePath) {
    var hash = await callexec(`C:\\Users\\GIGABYTE\\Desktop\\project\\2019-1-CECD2-HOJE-1\\Front-End\\DhashModule\\DhashModule.exe`, filePath);
    hash = hash.replace(/\s+$|\n|\r/g, "");
    return hash;
};