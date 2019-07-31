'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var result = null;
function Result() {
    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        setUpdate = _useState2[1];

    var showList = function showList(data) {
        //리스트에 있는 값 출력
        if (data !== null) {
            return data.map(function (element) {
                return _react2.default.createElement(
                    'div',
                    null,
                    'Classification : ',
                    element.classification,
                    ' | DetectList : ',
                    element.detectList,
                    ' | DetectCount : ',
                    element.detectCount,
                    ' | FormLevel : ',
                    element.formLevel
                );
            });
        } else return null;
    };
    (0, _react.useEffect)(function () {
        if (fs.exists('resultfile.json', function (exists) {
            if (exists) {
                result = fs.readFileSync('resultfile.json', 'utf8');
                result = JSON.parse(result);
            }
            setUpdate();
        })) ;
    }, []); //렌더링 이후 한번만 수행

    return _react2.default.createElement(
        'div',
        null,
        '\uACB0\uACFC \uD398\uC774\uC9C0',
        showList(result)
    );
}