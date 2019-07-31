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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

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

var _imageClassifications = require('../../main/FrameTest/imageClassifications');

var _imageClassifications2 = _interopRequireDefault(_imageClassifications);

var _makeDictionary = require('../../main/FrameTest/makeDictionary');

var _makeDictionary2 = _interopRequireDefault(_makeDictionary);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var PATH = require('path');
//import { Link } from 'react-router-dom';


var notifier = require('node-notifier'); //notification 을 사용하기 위한 모듈

var _require = require('../../main/FrameTest/reg/regTojson'),
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

var resultList = []; //결과를 저장하는 리스트
var isPlaying = false; //실행 버튼 클릭 여부
var isStop = true; //일시 정지 버튼 클릭 여부
var isDoing = false; //반복문이 동작하는지 여부
var isDone = false; //검색 중지
var de = (0, _delay2.default)(250000); //일시 중지

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
                    Exec(PATH.join(startPath, tmp.name), extension); //디렉토리 안의 파일을 탐색(재귀적으로 호출)
                } else {
                    //파일 경우
                    var ppath = PATH.join(startPath, tmp.name);
                    var data = null;
                    setPath(ppath);
                    var lowerCase = ppath.toLowerCase();
                    console.log(ppath);
                    if (lowerCase.match(extension[0]) || lowerCase.match(extension[1]) || lowerCase.match(extension[2])) {
                        //확장자가 jpg,png,tif 일 경우
                        var result1 = void 0,
                            result2 = void 0;
                        result1 = TessNreg(ppath); //Tesseract OCR 및 정규식 표현
                        result2 = (0, _imageClassifications2.default)(ppath, "HR"); //문서 분류
                        //result2 = null; //서버와 통신을 안할 때의 test용
                        //결과값을 프로미스 형태로 받기 때문에 프로미스가 완전히 완료 될 때 까지 await
                        await Promise.all([result1, result2]).then(async function (resolve) {
                            data = await (0, _makeDictionary2.default)(resolve[1], tmp.name, ppath, resolve[0]); //검사 결과를 딕션너리 형태로
                            setPath(ppath); //탐색 경로 추가
                            //console.log(resolve[0], ' ' , resolve[1]);
                            resultList.push(data); //검사 결과를 리스트에 추가
                        });
                        if (data.CLASSIFICATION === null) return 'break';
                    }
                }
                await (0, _delay2.default)(1000); //사용자에게 가시적으로 보여주기 위한 딜레이
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

    var reset = function reset() {
        setValue(0);
        setPuase(0);
        for (var member in path_data) {
            if (member === 'C:/') path_data[member].children = [];else delete path_data[member];
        }
    };
    var showList = function showList(data) {
        //리스트에 있는 값 출력
        return data.map(function (element) {
            return _react2.default.createElement(
                'div',
                null,
                'FileName : ',
                element.fileName,
                ' | Classification : ',
                element.classification,
                ' | DetectList : ',
                element.detectList,
                ' | DetectCount : ',
                element.detectCount,
                ' | FormLevel : ',
                element.formLevel
            );
        });
    };
    // 초기 셋팅
    assignObjectPaths(path_data);
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
                                resultList = [];
                                await regRead(checked);
                                //ToDo 해당 경로가 절대 경로, 차후에 상대경로로
                                Exec('C:\\Users\\FASOO_499\\Desktop\\FrameTest', ['.jpg', '.png', '.tif']);
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
                                isDone = true;
                                regReset();
                                reset(); //경로, 검색해야되는 부분 리셋
                                console.log(resultList);
                                if (resultList.length > 0) {
                                    //배열에 값이 들어 갔을 경우
                                    var json = JSON.stringify(resultList);
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
                _Grid2.default,
                { container: true, justify: 'center', alignItems: 'center', spacing: 5 },
                _react2.default.createElement(
                    'h3',
                    null,
                    showList(resultList)
                )
            )
        )
    );
}