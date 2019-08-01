'use strict';

var util = require('util');

module.exports = async function (moduleName, filePath) {
    var exec = util.promisify(require('child_process').exec);
    var result = '';

    //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textExtract\\x64\\Release\\textExtract.exe'
    //var moduleName = 'C:\\Users\\GIGABYTE\\source\\repos\\textDetect_and_recognize\\x64\\Release\\textDetect_and_recognize.exe'
    var sysArgc = filePath;
    var config = moduleName + ' ' + sysArgc;

    //console.log(config);

    var _ref = await exec(config),
        stdout = _ref.stdout,
        stderr = _ref.stderr;

    return stdout;
};