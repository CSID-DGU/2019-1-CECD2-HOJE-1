var assert = require('assert');

module.exports = function(pixels, width, x, y){
    var px = width * y + x;
    assert(px < pixels.length);
    return pixels[px];
}