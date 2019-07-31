'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function (startPath, extension) {

    var fileList = [];
    if (!fs.existsSync(startPath)) {
        console.log("no dir", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);

    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);

        fileList.push(filename.replace(/\\/gi, "\/"));
        if (filename.indexOf(extension) >= 0) {
            fileList.push(filename.replace(/\\/gi, "\/"));
        };
    };

    return fileList;
};