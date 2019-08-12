"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = pixel;

var assert = require('assert');

function pixel(pixels, width, x, y) {
  var px = width * y + x;
  assert(px < pixels.length);
  return pixels[px];
}