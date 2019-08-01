'use strict';

module.exports = function (binaryStr) {
    var output = '';
    for (var i = 0; i < binaryStr.length; i += 4) {
        var bytes = binaryStr.substr(i, 4);
        var decimal = parseInt(bytes, 2);
        var hex = decimal.toString(16);
        output += hex;
    }

    //console.log(output);
    //return new Buffer.alloc(output.length/2, output, 'hex');
    return output;
};