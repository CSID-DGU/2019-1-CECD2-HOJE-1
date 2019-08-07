'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = SearchHeader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _styles = require('@material-ui/core/styles');

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Fab = require('@material-ui/core/Fab');

var _Fab2 = _interopRequireDefault(_Fab);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _electron = require('electron');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
    return {
        root: {
            flexGrow: 1
        },
        formControl: {
            margin: theme.spacing(3)
        },
        list: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 360
        },
        spacer: {
            flex: '1 1 auto'
        }
    };
});
var currentPath = '';
function SearchHeader() {
    var classes = useStyles();

    var _React$useState = _react2.default.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        puase = _React$useState2[0],
        setPuase = _React$useState2[1];

    var _React$useState3 = _react2.default.useState(''),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        path = _React$useState4[0],
        setPath = _React$useState4[1];

    (0, _react.useEffect)(function () {
        _electron.ipcRenderer.on('SEARCH_START', function (event, result) {
            setPath(result); //경로 바꿈
        });
        return function () {
            _electron.ipcRenderer.removeAllListeners('SEARCH_START');
        };
    });
    return _react2.default.createElement(
        _Grid2.default,
        { container: true, direction: 'row', justify: 'flex-start', alignItems: 'center', spacing: 2 },
        _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 12, sm: 8 },
            _react2.default.createElement(_TextField2.default, {
                id: 'outlined-read-only-input',
                label: '\uAC80\uC0AC\uC911 \uD30C\uC77C',
                margin: 'normal',
                InputProps: {
                    readOnly: true
                },
                variant: 'outlined',
                value: path,
                fullWidth: true
            })
        ),
        _react2.default.createElement('div', { className: classes.spacer }),
        _react2.default.createElement(
            'div',
            { hidden: puase % 2 === 0 ? false : true },
            _react2.default.createElement(
                _Fab2.default,
                {
                    variant: 'extended',
                    color: 'primary',
                    'aria-label': 'Add',
                    className: classes.margin,
                    onClick: function onClick() {
                        setPuase(1);
                        _electron.ipcRenderer.send('PAUSE_SEARCH', true);
                    }
                },
                '\uC77C\uC2DC \uC911\uC9C0'
            )
        ),
        _react2.default.createElement(
            'div',
            { hidden: puase % 2 === 1 ? false : true },
            _react2.default.createElement(
                _Fab2.default,
                {
                    variant: 'extended',
                    color: 'primary',
                    'aria-label': 'Add',
                    className: classes.margin,
                    onClick: function onClick() {
                        setPuase(0);
                        _electron.ipcRenderer.send('RESTART_SEARCH', true);
                    }
                },
                '\uB2E4\uC2DC \uC2DC\uC791'
            )
        ),
        _react2.default.createElement(
            _Fab2.default,
            {
                variant: 'extended',
                color: 'primary',
                'aria-label': 'Add',
                className: classes.margin,
                component: _reactRouterDom.Link, to: '/result',
                onClick: function onClick() {
                    _electron.ipcRenderer.send('STOP_SEARCH', true);
                }
            },
            '\uAC80\uC0AC \uC911\uC9C0'
        )
    );
}