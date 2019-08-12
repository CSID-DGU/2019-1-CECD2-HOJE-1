var callexec = require('./callExec.js');
//분류 모듈
export default async function hashExec(filePath) {
    var hash = await callexec(`C:\\Users\\FASOO_499\\source\\repos\\DhashModule\\DhashModule.exe`, filePath);
    hash = hash.replace(/\s+$|\n|\r/g, "");
    return hash;
};