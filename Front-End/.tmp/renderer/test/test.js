'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = test;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _test = require('./test1');

var _test2 = _interopRequireDefault(_test);

var _electron = require('electron');

var _test3 = require('./test2');

var _test4 = _interopRequireDefault(_test3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test() {
    console.log('test rendering....');
    var t = function t() {
        _electron.ipcRenderer.send('TEST1', 'Hello World');
    };
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                    return t();
                } },
            ' \uBC84\uD2BC '
        ),
        _react2.default.createElement(_test2.default, null),
        _react2.default.createElement(_test4.default, null)
    );
}