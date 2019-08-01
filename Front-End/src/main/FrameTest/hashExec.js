var callexec = require('./callExec.js');
//분류 모듈
module.exports = async function hashExec(filePath) {
    var hash = await callexec(`${__dirname}/DhashModule/DhashModule.exe`, filePath);
    hash = hash.replace(/\s+$|\n|\r/g, "");
    return hash;
};