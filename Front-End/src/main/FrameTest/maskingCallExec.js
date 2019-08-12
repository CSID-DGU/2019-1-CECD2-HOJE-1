const util = require('util');

module.exports = async function(moduleName, filePath, mode){
    var exec = util.promisify(require('child_process').exec);
    var result = '';

    //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe'
    //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textDetect_and_recognize\\x64\\Release\\textDetect_and_recognize.exe'
    var sysArgc = filePath;
    var modeArgc = mode;
    var config = moduleName + ' ' + sysArgc + ' ' + modeArgc;

    console.log(config);
    
    var { stdout, stderr } = await exec(config);
        

    return stdout;
};