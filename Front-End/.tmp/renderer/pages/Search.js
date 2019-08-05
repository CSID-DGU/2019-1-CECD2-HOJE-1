'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Search;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _electron = require('electron');

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Fab = require('@material-ui/core/Fab');

var _Fab2 = _interopRequireDefault(_Fab);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Popper = require('@material-ui/core/Popper');

var _Popper2 = _interopRequireDefault(_Popper);

var _Fade = require('@material-ui/core/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Settings = require('@material-ui/icons/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _settingdata = require('./settingdata.json');

var _settingdata2 = _interopRequireDefault(_settingdata);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _SearchHeader = require('./SearchHeader');

var _SearchHeader2 = _interopRequireDefault(_SearchHeader);

var _SearchBody = require('./SearchBody');

var _SearchBody2 = _interopRequireDefault(_SearchBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');

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

function TabPanel(props) {
    var children = props.children,
        value = props.value,
        index = props.index;


    return _react2.default.createElement(
        _Typography2.default,
        {
            component: 'div',
            role: 'tabpanel',
            hidden: value !== index,
            id: 'simple-tabpanel-' + index,
            'aria-labelledby': 'simple-tab-' + index
        },
        children
    );
}

TabPanel.propTypes = {
    children: _propTypes2.default.node,
    index: _propTypes2.default.any.isRequired,
    value: _propTypes2.default.any.isRequired
};

var test = [];
_settingdata2.default.searchSetting.map(function (value) {
    if (value.checked === true) {
        test.push(value.name);
    }
});

var testvalue = 0;

function Search() {
    var classes = useStyles();

    var _React$useState = _react2.default.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        value = _React$useState2[0],
        setValue = _React$useState2[1];

    var _React$useState3 = _react2.default.useState(null),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        anchorEl = _React$useState4[0],
        setAnchorEl = _React$useState4[1];

    var _React$useState5 = _react2.default.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        open = _React$useState6[0],
        setOpen = _React$useState6[1];

    var _React$useState7 = _react2.default.useState(),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        placement = _React$useState8[0],
        setPlacement = _React$useState8[1];

    var _React$useState9 = _react2.default.useState([]),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        selectedFile = _React$useState10[0],
        setSelectedFile = _React$useState10[1];

    var _React$useState11 = _react2.default.useState(false),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        ReRender = _React$useState12[0],
        setReRender = _React$useState12[1];

    var handleClick = function handleClick(newPlacement) {
        return function (event) {
            setAnchorEl(event.currentTarget);
            setOpen(function (prev) {
                return placement !== newPlacement || !prev;
            });
            setPlacement(newPlacement);
        };
    };

    var _React$useState13 = _react2.default.useState(test),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        checked = _React$useState14[0],
        setChecked = _React$useState14[1];

    var handleToggle = function handleToggle(value) {
        return function () {
            var currentIndex = checked.indexOf(value);
            var newChecked = [].concat(_toConsumableArray(checked));

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            setChecked(newChecked);
        };
    };

    ////// 경로 출력
    var assignObjectPaths = function assignObjectPaths(obj, stack) {
        Object.keys(obj).forEach(function (k) {
            var node = obj[k];
            if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) === "object") {
                node.path = stack ? stack + '.' + k : k;
                assignObjectPaths(node, node.path);
            }
        });
    };

    // 기본 경로( Windows 기준 )

    var _React$useState15 = _react2.default.useState({
        'C:/': {
            path: 'C:/',
            type: 'folder',
            checked: false,
            isRoot: true,
            children: []
        }
    }),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        path_data = _React$useState16[0],
        setPathData = _React$useState16[1];

    // Forced ReRendering


    var _React$useState17 = _react2.default.useState(),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        updateState = _React$useState18[1];

    var forceUpdate = _react2.default.useCallback(function () {
        updateState({});
        setReRender(false);
    }, []);
    _react2.default.useEffect(function () {
        if (ReRender) {
            setTimeout(forceUpdate, 1000);
        }
    });

    var onToggle = function onToggle(currentNode) {
        var tmp_path_data = path_data;
        if (currentNode.isOpen) {
            //console.log(currentNode);
            fs.readdir(currentNode.path, function (error, dir) {
                dir.map(function (value) {
                    if (value.match('\\.') === null) {
                        var path = currentNode.path + '/' + value;
                        if (tmp_path_data[currentNode.path].children.indexOf(path) === -1) {
                            //console.log(path);
                            tmp_path_data[currentNode.path].children.push(path);
                            tmp_path_data[path] = {
                                path: '' + path,
                                type: 'folder',
                                checked: false,
                                children: []
                            };
                        }
                    }
                });
            });
            setPathData(tmp_path_data);
            //console.log(path_data);
        }
        setReRender(true);
    };

    // 체크 목록 넣기
    var onChecked = function onChecked(value) {
        var currentIndex = selectedFile.indexOf(value.path);
        var newSelectFile = [].concat(_toConsumableArray(selectedFile));

        if (currentIndex === -1) {
            newSelectFile.push(value.path);
        } else {
            newSelectFile.splice(currentIndex, 1);
        }
        setSelectedFile(newSelectFile);
    };

    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            TabPanel,
            { value: value, index: 0 },
            _react2.default.createElement(
                _Grid2.default,
                { container: true, direction: 'row', justify: 'flex-start', alignItems: 'center', spacing: 2 },
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 12, sm: 8 },
                    _react2.default.createElement(
                        _TextField2.default,
                        {
                            id: 'outlined-read-only-input',
                            label: '\uCD5C\uADFC \uAC80\uC0AC',
                            margin: 'normal',
                            InputProps: {
                                readOnly: true
                            },
                            defaultValue: '\uC774\uC804 \uAC80\uC0AC\uC77C\uC744 \uC54C \uC218 \uC5C6\uC74C',
                            variant: 'outlined'
                        },
                        '\uAC80\uC0AC\uB0B4\uC5ED'
                    )
                ),
                _react2.default.createElement('div', { className: classes.spacer }),
                _react2.default.createElement(
                    _Fab2.default,
                    {
                        variant: 'extended',
                        color: 'primary',
                        'aria-label': 'Add',
                        className: classes.margin,
                        onClick: async function onClick() {
                            if (open === true) setOpen(false);
                            setReRender(false);
                            setValue(1);
                            _electron.ipcRenderer.send('START_SEARCH', checked);
                        }
                    },
                    '\uAC80\uC0AC \uC2DC\uC791'
                ),
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: handleClick('bottom-end') },
                    _react2.default.createElement(_Settings2.default, null)
                ),
                _react2.default.createElement(
                    _Popper2.default,
                    { open: open, anchorEl: anchorEl, placement: placement, transition: true },
                    function (_ref) {
                        var TransitionProps = _ref.TransitionProps;
                        return _react2.default.createElement(
                            _Fade2.default,
                            _extends({}, TransitionProps, { timeout: 350 }),
                            _react2.default.createElement(
                                _Paper2.default,
                                null,
                                _react2.default.createElement(
                                    _List2.default,
                                    { className: classes.root },
                                    _settingdata2.default.searchSetting.map(function (value) {
                                        var labelId = 'op-' + value.id;
                                        return _react2.default.createElement(
                                            _ListItem2.default,
                                            { disabled: value.disable, key: value.id, role: undefined, dense: true,
                                                button: true, onClick: handleToggle(value.name) },
                                            _react2.default.createElement(
                                                _ListItemIcon2.default,
                                                null,
                                                _react2.default.createElement(_Checkbox2.default, {
                                                    edge: 'start',
                                                    checked: checked.indexOf(value.name) !== -1,
                                                    tabIndex: -1,
                                                    disableRipple: true,
                                                    inputProps: { 'aria-labelledby': labelId }
                                                })
                                            ),
                                            _react2.default.createElement(_ListItemText2.default, { id: labelId, primary: '' + value.name })
                                        );
                                    })
                                )
                            )
                        );
                    }
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { container: true, justify: 'center', alignItems: 'center', spacing: 5 },
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: true },
                    _react2.default.createElement(_Tree2.default, { onChecked: onChecked, onToggle: onToggle, data: path_data })
                )
            )
        ),
        _react2.default.createElement(
            TabPanel,
            { value: value, index: 1 },
            _react2.default.createElement(_SearchHeader2.default, null),
            _react2.default.createElement(_SearchBody2.default, null)
        )
    );
}