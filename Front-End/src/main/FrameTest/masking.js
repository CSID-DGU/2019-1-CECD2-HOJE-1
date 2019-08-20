var maskingCallexec = require('./maskingCallExec.js');

export default async function main(filePath,mode){

    var modulePath="C:\\Users\\FASOO_499\\source\\repos\\recoveringMasking\\x64\\Release\\recoveringMasking.exe";
    //"C:\\Users\\FASOO_499\\Desktop\\sample6.mask.jpg"; //making file name is sample2.mask.jpg
    var m = mode; // or unmasking

    var log = await maskingCallexec(modulePath, filePath, m);

    console.log(log);
}