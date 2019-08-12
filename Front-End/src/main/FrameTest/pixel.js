var assert = require('assert');

export default function pixel(pixels, width, x, y){
    var px = width * y + x;
    assert(px < pixels.length);
    return pixels[px];
}