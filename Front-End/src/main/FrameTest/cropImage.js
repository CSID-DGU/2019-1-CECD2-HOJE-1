var cropImageCallExec = require('./cropImageCallExec.js');

export default async function main(filePath){

    var modulePath="C:\\Users\\GIGABYTE\\source\\repos\\SubtTextCreator\\x64\\Release\\SubtTextCreator.exe";
    //"C:\\Users\\FASOO_499\\Desktop\\sample6.mask.jpg"; //making file name is sample2.mask.jpg
    var log = await cropImageCallExec(modulePath, filePath);

    console.log(log);
}