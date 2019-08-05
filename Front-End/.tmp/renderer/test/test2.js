'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = test2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _electron = require('electron');

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var mylistStyles = (0, _core.makeStyles)(function (theme) {
    return {
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 330
        },
        listSection: {
            backgroundColor: 'inherit',
            padding: 0
        },
        image: {
            height: 40
        },
        fullimage: {
            height: 300,
            width: '100%'
        },
        textfiled: {
            maxWidth: 300
        },
        item: {
            padding: 10
        }
    };
});

function test2() {
    console.log('Test2 rendering...');

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        value = _useState2[0],
        setValue = _useState2[1];

    (0, _react.useEffect)(function () {
        _electron.ipcRenderer.once('TEST3', function (event, result) {
            setValue([].concat(_toConsumableArray(value), [result]));
        });
    });
    var classes2 = mylistStyles();
    return _react2.default.createElement(
        _core.List,
        { className: classes2.root },
        value.map(function (item) {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _core.Grid,
                    { container: true, divider: true, zeroMinWidth: true, className: classes2.item },
                    _react2.default.createElement(
                        _core.Grid,
                        { xs: 6, item: true },
                        item
                    )
                ),
                _react2.default.createElement(_core.Divider, null)
            );
        })
    );
}