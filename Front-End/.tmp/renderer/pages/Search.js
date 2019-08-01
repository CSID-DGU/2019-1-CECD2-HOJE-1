'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Search;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clsx3 = require('clsx');

var _clsx4 = _interopRequireDefault(_clsx3);

var _styles = require('@material-ui/core/styles');

var _colors = require('@material-ui/core/colors');

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

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Settings = require('@material-ui/icons/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

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

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _reactDropdownTreeSelect = require('react-dropdown-tree-select');

var _reactDropdownTreeSelect2 = _interopRequireDefault(_reactDropdownTreeSelect);

var _delay = require('delay');

var _delay2 = _interopRequireDefault(_delay);

var _hashExec = require('../../main/FrameTest/hashExec');

var _hashExec2 = _interopRequireDefault(_hashExec);

var _makeDictionary = require('../../main/FrameTest/makeDictionary');

var _makeDictionary2 = _interopRequireDefault(_makeDictionary);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _reactVirtualized = require('react-virtualized');

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _FiberManualRecord = require('@material-ui/icons/FiberManualRecord');

var _FiberManualRecord2 = _interopRequireDefault(_FiberManualRecord);

var _Error = require('@material-ui/icons/Error');

var _Error2 = _interopRequireDefault(_Error);

var _Warning = require('@material-ui/icons/Warning');

var _Warning2 = _interopRequireDefault(_Warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var PATH = require('path');
//import { Link } from 'react-router-dom';


var notifier = require('node-notifier'); //notification 을 사용하기 위한 모듈

var _require = require('../../main/FrameTest/regTojson'),
    regRead = _require.regRead,
    regReset = _require.regReset,
    TessNreg = _require.TessNreg;

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

//설정 파일 불러오기
var setting_data = fs.readFileSync(__dirname + '/../pages/settingdata.json', 'utf8');
setting_data = JSON.parse(setting_data);
var test = [];
setting_data.searchSetting.map(function (element) {
    if (element.checked === true) {
        test.push(element.name);
    }
});

var isPlaying = false; //실행 버튼 클릭 여부
var isStop = true; //일시 정지 버튼 클릭 여부
var isDoing = false; //반복문이 동작하는지 여부
var isDone = false; //검색 중지
var check = true; //통신 여부
var de = (0, _delay2.default)(250000); //일시 중지
var rows = [];
function Search() {
    var classes = useStyles();

    var _React$useState = _react2.default.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        value = _React$useState2[0],
        setValue = _React$useState2[1];

    var _React$useState3 = _react2.default.useState(0),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        puase = _React$useState4[0],
        setPuase = _React$useState4[1];

    var _React$useState5 = _react2.default.useState(null),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        anchorEl = _React$useState6[0],
        setAnchorEl = _React$useState6[1];

    var _React$useState7 = _react2.default.useState(false),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        open = _React$useState8[0],
        setOpen = _React$useState8[1];

    var _React$useState9 = _react2.default.useState(),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        placement = _React$useState10[0],
        setPlacement = _React$useState10[1];

    var _React$useState11 = _react2.default.useState([]),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        selectedFile = _React$useState12[0],
        setSelectedFile = _React$useState12[1];

    var _React$useState13 = _react2.default.useState(0),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        ReRender = _React$useState14[0],
        setReRender = _React$useState14[1];

    var _useState = (0, _react.useState)(''),
        _useState2 = _slicedToArray(_useState, 2),
        filePath = _useState2[0],
        setPath = _useState2[1];

    var handleClick = function handleClick(newPlacement) {
        return function (event) {
            setAnchorEl(event.currentTarget);
            setOpen(function (prev) {
                return placement !== newPlacement || !prev;
            });
            setPlacement(newPlacement);
        };
    };

    var _React$useState15 = _react2.default.useState(test),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        checked = _React$useState16[0],
        setChecked = _React$useState16[1];

    var handleToggle = function handleToggle(value) {
        return function () {
            var currentIndex = checked.indexOf(value);
            var newChecked = [].concat(_toConsumableArray(checked));

            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            //newChecked.sort();
            setChecked(newChecked);
        };
    };
    var imageClassification = async function imageClassification(result1, hash, depart, ppath, name) {
        var xhr = new XMLHttpRequest(); //서버 통신
        xhr.open('GET', 'http://192.168.40.206:8080/classification?dhashValue=' + hash + '&depart=' + depart);
        var data = null;
        console.log('name : ', name, ' hash : ', hash);
        xhr.onload = async function () {
            data = xhr.responseText;
            var tmp = await (0, _makeDictionary2.default)(data, name, ppath, result1); //검사 결과를 딕션너리 형태로
            setPath(ppath); //탐색 경로 추가
            addRow(tmp);
        };
        xhr.timeout = 3000; //시간 2~3초
        xhr.ontimeout = function () {
            console.log('connection failed');
            //addRow(tmp);
            check = false;
        };
        xhr.send();
    };
    //핵심 모듈(Tesseract OCR 추출 및 정규식 검출, 문서 분류)
    var Exec = async function Exec(startPath, extension) {
        var files = fs.readdirSync(startPath, { withFileTypes: true }); //해당 디렉토리에 파일 탐색
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = async function _loop() {
                var tmp = _step.value;

                if (isStop && isDoing) {
                    //일시 정지
                    await de; //딜레이가 종료 될때까지 반복문 await
                    de = (0, _delay2.default)(250000);
                }
                if (isDone) return 'break';
                if (tmp.isDirectory()) {
                    //디렉토리 경우
                    await Exec(PATH.join(startPath, tmp.name), extension); //디렉토리 안의 파일을 탐색(재귀적으로 호출)
                } else {
                    //파일 경우
                    var ppath = PATH.join(startPath, tmp.name);
                    setPath(ppath);
                    var extname = PATH.extname(ppath);
                    //console.log('extname : ' , extname);
                    if (extname.match(extension[0]) || extname.match(extension[1]) || extname.match(extension[2])) {
                        //확장자가 jpg,png,tif 일 경우
                        var result1 = void 0,
                            result2 = void 0;
                        result1 = TessNreg(ppath); //Tesseract OCR 및 정규식 표현
                        result2 = (0, _hashExec2.default)(ppath); //문서 분류
                        //결과값을 프로미스 형태로 받기 때문에 프로미스가 완전히 완료 될 때 까지 await
                        await Promise.all([result1, result2]).then(function (resolve) {
                            //ToDO 한개씩 보여줄것인지
                            imageClassification(resolve[0], resolve[1], "HR", ppath, tmp.name); //서버 통신을 통해서 얻은 결과물
                        });
                        console.log(check);
                        if (!check) {
                            return 'break'; //서버와 연결이 끊어짐
                        }
                    }
                }
                await (0, _delay2.default)(3); //사용자에게 가시적으로 보여주기 위한 딜레이
            };

            for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ret = await _loop();

                if (_ret === 'break') break;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return 0; //재귀 호출이기 때문에 리턴
    };
    // 기본 경로( Windows 기준 )

    var _React$useState17 = _react2.default.useState({
        'C:/': {
            path: 'C:/',
            type: 'folder',
            checked: false,
            isRoot: true,
            children: []
        }
    }),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        path_data = _React$useState18[0],
        setPathData = _React$useState18[1];
    // Forced ReRendering


    var _React$useState19 = _react2.default.useState(),
        _React$useState20 = _slicedToArray(_React$useState19, 2),
        updateState = _React$useState20[1];

    var forceUpdate = _react2.default.useCallback(function () {
        return updateState({});
    }, []);
    _react2.default.useEffect(function () {
        if (ReRender !== 0) {
            var tmp = ReRender;
            tmp = tmp - 1;
            forceUpdate();
            setReRender(tmp);
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
        setReRender(3);
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
    //리셋
    var reset = function reset() {
        setValue(0);
        setPuase(0);
        check = true;
        isDone = true;
        regReset();
        for (var member in path_data) {
            if (member === 'C:/') path_data[member].children = [];else delete path_data[member];
        }
    };
    // 검색 결과 추가
    var addRow = function addRow(list) {
        //배열에 있는 위치 방식
        rows.push(createData(rows.length, list.fileName, list.classification, list.detectList, list.detectCount, list.formLevel));
        console.log(rows);
        // forceUpdate();
    };
    var styles = function styles(theme) {
        return {
            flexContainer: {
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box'
            },
            tableRow: {
                cursor: 'pointer'
            },
            tableRowHover: {
                '&:hover': {
                    backgroundColor: theme.palette.grey[200]
                }
            },
            tableCell: {
                flex: 1
            },
            noClick: {
                cursor: 'initial'
            }
        };
    };
    var theme = (0, _styles.createMuiTheme)({
        palette: {
            primary: { main: _colors.green[500] },
            secondary: { main: _colors.yellow[500] },
            error: { main: _colors.red[500] },
            default: { main: _colors.blue[500] }
        }
    });
    var iconDisplay = function iconDisplay(input) {
        if (input === '정상') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uC815\uC0C1', placement: 'top' },
                _react2.default.createElement(_FiberManualRecord2.default, { color: 'primary' })
            )
        );else if (input === '경고') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uACBD\uACE0', placement: 'top' },
                _react2.default.createElement(_Error2.default, { color: 'secondary' })
            )
        );else if (input === '위험') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uC704\uD5D8', placement: 'top' },
                _react2.default.createElement(_Warning2.default, { color: 'error' })
            )
        );
        return _react2.default.createElement(
            _Tooltip2.default,
            { title: '\uBBF8\uB4F1\uB85D', placement: 'top' },
            _react2.default.createElement(_FiberManualRecord2.default, { color: 'disabled' })
        );
    };
    var cellDisplay = function cellDisplay(input) {
        var tmp = [];
        for (var i = 0; i < input.length; i++) {
            tmp.push(input[i]);
            if (i < input.length - 1) tmp.push('/');
        }
        return tmp;
    };

    var MuiVirtualizedTable = function (_React$PureComponent) {
        _inherits(MuiVirtualizedTable, _React$PureComponent);

        function MuiVirtualizedTable(props) {
            _classCallCheck(this, MuiVirtualizedTable);

            var _this = _possibleConstructorReturn(this, (MuiVirtualizedTable.__proto__ || Object.getPrototypeOf(MuiVirtualizedTable)).call(this, props));

            _this.getRowClassName = _this.getRowClassName.bind(_this);
            _this.cellRenderer = _this.cellRenderer.bind(_this);
            _this.headerRenderer = _this.headerRenderer.bind(_this);
            return _this;
        }

        _createClass(MuiVirtualizedTable, [{
            key: 'getRowClassName',
            value: function getRowClassName(_ref) {
                var index = _ref.index;
                var _props = this.props,
                    classes = _props.classes,
                    onRowClick = _props.onRowClick;


                return (0, _clsx4.default)(classes.tableRow, classes.flexContainer, _defineProperty({}, classes.tableRowHover, index !== -1 && onRowClick != null));
            }
        }, {
            key: 'cellRenderer',
            value: function cellRenderer(_ref2) {
                var cellData = _ref2.cellData,
                    columnIndex = _ref2.columnIndex;
                var _props2 = this.props,
                    columns = _props2.columns,
                    classes = _props2.classes,
                    rowHeight = _props2.rowHeight,
                    onRowClick = _props2.onRowClick;

                return _react2.default.createElement(
                    _TableCell2.default,
                    {
                        component: 'div',
                        className: (0, _clsx4.default)(classes.tableCell, classes.flexContainer, _defineProperty({}, classes.noClick, onRowClick == null)),
                        variant: 'body',
                        style: { height: rowHeight },
                        align: columnIndex != null && columns[columnIndex].numeric || false ? 'right' : 'left'
                    },
                    columnIndex === 2 ? cellDisplay(cellData) : columnIndex === 4 ? iconDisplay(cellData) : cellData
                );
            }
        }, {
            key: 'headerRenderer',
            value: function headerRenderer(_ref3) {
                var label = _ref3.label,
                    columnIndex = _ref3.columnIndex;
                var _props3 = this.props,
                    headerHeight = _props3.headerHeight,
                    columns = _props3.columns,
                    classes = _props3.classes;

                return _react2.default.createElement(
                    _TableCell2.default,
                    {
                        component: 'div',
                        className: (0, _clsx4.default)(classes.tableCell, classes.flexContainer, classes.noClick),
                        variant: 'head',
                        style: { height: headerHeight },
                        align: columns[columnIndex].numeric || false ? 'right' : 'left'
                    },
                    _react2.default.createElement(
                        'span',
                        null,
                        label
                    )
                );
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var _props4 = this.props,
                    classes = _props4.classes,
                    columns = _props4.columns,
                    rowHeight = _props4.rowHeight,
                    headerHeight = _props4.headerHeight,
                    rowCount = _props4.rowCount,
                    rowGetter = _props4.rowGetter;

                return _react2.default.createElement(
                    _reactVirtualized.AutoSizer,
                    null,
                    function (_ref4) {
                        var height = _ref4.height,
                            width = _ref4.width;
                        return _react2.default.createElement(
                            _reactVirtualized.Table,
                            {
                                height: height,
                                width: width,
                                rowHeight: rowHeight,
                                headerHeight: headerHeight,
                                rowCount: rowCount,
                                rowGetter: rowGetter,
                                rowClassName: _this2.getRowClassName
                            },
                            columns.map(function (_ref5, index) {
                                var dataKey = _ref5.dataKey,
                                    width = _ref5.width,
                                    label = _ref5.label,
                                    numeric = _ref5.numeric;

                                return _react2.default.createElement(_reactVirtualized.Column, {
                                    key: dataKey,
                                    headerRenderer: function headerRenderer() {
                                        return _this2.headerRenderer({
                                            label: label,
                                            columnIndex: index
                                        });
                                    },
                                    className: classes.flexContainer,
                                    cellRenderer: _this2.cellRenderer,
                                    dataKey: dataKey,
                                    width: width,
                                    label: label,
                                    numeric: numeric
                                });
                            })
                        );
                    }
                );
            }
        }]);

        return MuiVirtualizedTable;
    }(_react2.default.PureComponent);

    MuiVirtualizedTable.defaultProps = {
        headerHeight: 48,
        rowHeight: 40
    };
    MuiVirtualizedTable.propTypes = {
        classes: _propTypes2.default.object.isRequired,
        columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            dataKey: _propTypes2.default.string.isRequired,
            label: _propTypes2.default.string.isRequired,
            numeric: _propTypes2.default.bool,
            width: _propTypes2.default.number.isRequired
        })).isRequired,
        headerHeight: _propTypes2.default.number,
        onRowClick: _propTypes2.default.func,
        rowHeight: _propTypes2.default.number
    };
    var VirtualizedTable = (0, _styles.withStyles)(styles)(MuiVirtualizedTable);
    function createData(id, fileName, classification, detectList, detectCount, formLevel) {
        return { id: id, fileName: fileName, classification: classification, detectList: detectList, detectCount: detectCount, formLevel: formLevel };
    }
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
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 12, sm: 3 },
                    _react2.default.createElement(
                        _Fab2.default,
                        {
                            variant: 'extended',
                            color: 'primary',
                            'aria-label': 'Add',
                            className: classes.margin,
                            onClick: async function onClick() {
                                //시작 버튼
                                if (open === true) {
                                    setOpen(false);
                                }
                                setValue(1);
                                console.log('start');
                                isDoing = true;
                                isPlaying = true;
                                isStop = false;
                                isDone = false;
                                setPath('');
                                rows = [];
                                await regRead(checked); //정규 표현식 파일 읽음
                                //ToDo 해당 경로가 절대 경로, 차후에 상대경로로
                                var tmp = await Exec('C:\\Users\\FASOO_499\\Desktop\\FrameTest', ['.jpg', '.png', '.tif']);
                                console.log(tmp);
                                if (!check) {
                                    notifier.notify({
                                        title: "Connection failed",
                                        message: "서버와 연결이 끊어졌습니다."
                                    });
                                } else {
                                    notifier.notify({
                                        title: "Search Completed",
                                        message: "검사 완료!"
                                    });
                                }
                            }
                        },
                        '\uAC80\uC0AC \uC2DC\uC791'
                    )
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 12, sm: 1 },
                    _react2.default.createElement(
                        _Button2.default,
                        { onClick: handleClick('bottom-end') },
                        _react2.default.createElement(_Settings2.default, null)
                    ),
                    _react2.default.createElement(
                        _Popper2.default,
                        { open: open, anchorEl: anchorEl, placement: placement, transition: true },
                        function (_ref6) {
                            var TransitionProps = _ref6.TransitionProps;
                            return _react2.default.createElement(
                                _Fade2.default,
                                _extends({}, TransitionProps, { timeout: 350 }),
                                _react2.default.createElement(
                                    _Paper2.default,
                                    null,
                                    _react2.default.createElement(
                                        _List2.default,
                                        { className: classes.root },
                                        setting_data.searchSetting.map(function (value) {
                                            var labelId = 'op-' + value.id;
                                            return _react2.default.createElement(
                                                _ListItem2.default,
                                                { disabled: value.disable, key: value.id, role: undefined,
                                                    dense: true, button: true, onClick: handleToggle(value.name) },
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
            _react2.default.createElement(
                _Grid2.default,
                { container: true, direction: 'row', justify: 'flex-start', alignItems: 'center', spacing: 2 },
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 12, sm: 8 },
                    _react2.default.createElement(_TextField2.default, {
                        id: 'outlined-read-only-input',
                        label: '\uAC80\uC0AC\uC911 \uD30C\uC77C',
                        margin: 'normal',
                        fullWidth: true,
                        InputProps: {
                            readOnly: true
                        },
                        variant: 'outlined',
                        value: filePath
                    })
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 12, sm: true },
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
                                    console.log('Pause');
                                    //실행 중인 경우
                                    isPlaying = false;
                                    isStop = true;
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
                                    console.log('restart');
                                    //다시 시작할 경우
                                    de.clear();
                                    isStop = false;
                                    isPlaying = true;
                                }
                            },
                            '\uB2E4\uC2DC \uC2DC\uC791'
                        )
                    )
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 12, sm: true },
                    _react2.default.createElement(
                        _Fab2.default,
                        {
                            variant: 'extended',
                            color: 'primary',
                            'aria-label': 'Add',
                            className: classes.margin,
                            onClick: function onClick() {
                                setValue(0);
                                console.log('done');
                                if (isStop && isPlaying) {
                                    de.clear(); //일시정지 일 경우
                                }
                                reset(); //경로, 검색해야되는 부분 리셋
                                console.log(rows);
                                if (rows.length > 0) {
                                    //배열에 값이 들어 갔을 경우
                                    var json = JSON.stringify(rows);
                                    fs.writeFileSync('resultfile.json', json, 'utf8');
                                    console.log('file created');
                                }
                            }
                        },
                        '\uAC80\uC0AC \uC911\uC9C0'
                    )
                )
            ),
            _react2.default.createElement(
                _Paper2.default,
                { style: { height: 400, width: '100%' } },
                _react2.default.createElement(VirtualizedTable, {
                    rowCount: rows.length,
                    rowGetter: function rowGetter(_ref7) {
                        var index = _ref7.index;
                        return rows[index];
                    },
                    columns: [{
                        width: 200,
                        label: '파일명',
                        dataKey: 'fileName'
                    }, {
                        width: 120,
                        label: '분류',
                        dataKey: 'classification'
                    }, {
                        width: 120,
                        label: '검출 내역',
                        dataKey: 'detectList'
                    }, {
                        width: 120,
                        label: '검출 개수',
                        dataKey: 'detectCount',
                        numeric: true
                    }, {
                        width: 120,
                        label: '문서등급',
                        dataKey: 'formLevel',
                        numeric: true
                    }]
                })
            )
        )
    );
}