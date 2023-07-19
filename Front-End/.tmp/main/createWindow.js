"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createWindow;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _electron = require("electron");

var MainWindow = function MainWindow() {
  var _this = this;

  (0, _classCallCheck2["default"])(this, MainWindow);
  this.window = new _electron.BrowserWindow({
    width: 1200,
    height: 650,
    show: false,
    webPreferences: {
      nodeIntegration: true
    } // resizable : false

  });
  this.window.loadURL("file://".concat(__dirname, "/../../index.html"));
  this.window.on("closed", function () {
    _this.window = null;
  });
};

function createWindow() {
  return new MainWindow();
}