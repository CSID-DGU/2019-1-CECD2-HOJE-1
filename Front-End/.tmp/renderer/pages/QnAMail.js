'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = QnAMail;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _core = require('@material-ui/core');

var _electron = require('electron');

var _cropImage = require('../../main/FrameTest/cropImage');

var _cropImage2 = _interopRequireDefault(_cropImage);

var _UploadSubImage = require('../../main/FrameTest/UploadSubImage');

var _UploadSubImage2 = _interopRequireDefault(_UploadSubImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH = 'C:\\Users\\FASOO_499\\Desktop\\image';
var path = require('path');
var fs = require('fs');

var nativeImage = require('electron').nativeImage;
var findImage = nativeImage.createFromPath('');
var useStyles = (0, _styles.makeStyles)(function (theme) {
    return {
        root: {
            flexGrow: 1
        },
        list: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            minHeight: 360
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200
        },
        spacer: {
            flex: '1 1 auto'
        },
        fab: {
            width: 70
        },
        imagecrop: {
            width: 130
        }
    };
});
var mylistStyles = (0, _styles.makeStyles)(function (theme) {
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
var listImage = [];
var send = [];
var notifier = require('node-notifier');
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
var data = null;
function QnAMail(props) {
    var sendingImagePath = props.sendingImagePath;

    var classes = useStyles();
    var classes2 = mylistStyles();

    var _React$useState = _react2.default.useState(1),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        value = _React$useState2[0],
        setValue = _React$useState2[1]; //null: 기본 페이지, 1: 구분요청, 2: 오탐
    // Forced ReRendering


    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        setUpdate = _useState2[1];

    var _React$useState3 = _react2.default.useState(),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        updateState = _React$useState4[1];

    var forceUpdate = _react2.default.useCallback(function () {
        return updateState({});
    }, []);

    var _useState3 = (0, _react.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        crop = _useState4[0],
        setCrop = _useState4[1];

    function handleChange(event) {
        setValue(event.target.value);
    };

    var _React$useState5 = _react2.default.useState(''),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        imagePath = _React$useState6[0],
        setImagePath = _React$useState6[1];

    var _React$useState7 = _react2.default.useState(nativeImage.createFromPath('').toDataURL()),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        iimage = _React$useState8[0],
        setImage = _React$useState8[1];

    (0, _react.useEffect)(function () {
        _electron.ipcRenderer.send('QNA_READY', 'ready'); //페이지 로딩이 완료되면
        _electron.ipcRenderer.once('RESULT2', function (event, result) {
            data = result;
            //console.log('useEffect data : ', data);
            if (data !== null) {
                findImage = nativeImage.createFromPath(path.normalize(data));
                setImage(findImage.toDataURL());
                setImagePath(data);
            }
        });
    });

    var txtChange = function txtChange(prop) {
        return function (event) {
            var index = listImage.indexOf(prop);
            send[index] = event.target.value;
        };
    };

    return _react2.default.createElement(
        'div',
        { className: classes.root },
        sendingImagePath,
        _react2.default.createElement(
            _core.Grid,
            {
                container: true,
                direction: 'row',
                justify: 'space-between',
                alignItems: 'center'
            },
            _react2.default.createElement(
                _core.Grid,
                { item: true, xs: 6 },
                _react2.default.createElement(
                    _core.FormControl,
                    { className: classes.formControl },
                    _react2.default.createElement(
                        _core.InputLabel,
                        { htmlFor: 'Tabs-simple' },
                        '\uAD6C \uBD84'
                    ),
                    _react2.default.createElement(
                        _core.Select,
                        {
                            value: value,
                            onChange: handleChange,
                            inputProps: {
                                name: 'Tabs',
                                id: 'Tabs-simple'
                            }
                        },
                        _react2.default.createElement(
                            _core.MenuItem,
                            { value: 1 },
                            '\uBD84\uB958\uAD6C\uBD84 \uCD94\uAC00\uC2E0\uCCAD'
                        ),
                        _react2.default.createElement(
                            _core.MenuItem,
                            { value: 2 },
                            '\uC624\uD0D0\uC9C0 \uC218\uC815\uC694\uCCAD'
                        )
                    )
                )
            ),
            _react2.default.createElement('div', { className: classes.spacer }),
            _react2.default.createElement(
                _core.Fab,
                { variant: 'extended', className: classes.fab,
                    disabled: value === 2 ? crop ? false : true : false,
                    onClick: function onClick() {
                        (0, _UploadSubImage2.default)(send, data, "HR");
                        send = [];
                        listImage = [];
                        forceUpdate();
                    } },
                '\uC804 \uC1A1'
            ),
            _react2.default.createElement(
                _core.Grid,
                { item: true, xs: 9 },
                _react2.default.createElement(_core.TextField, {
                    label: '\uC774\uBBF8\uC9C0 \uACBD\uB85C',
                    style: { margin: 8 },
                    placeholder: '\uACBD\uB85C',
                    fullWidth: true,
                    margin: 'normal',
                    variant: 'outlined',
                    value: imagePath,
                    InputLabelProps: {
                        shrink: true
                    }
                })
            ),
            _react2.default.createElement(
                _core.Fab,
                { variant: 'extended', disabled: value !== 2 || crop ? true : false, className: classes.imagecrop,
                    onClick: async function onClick() {
                        console.log('imagePath : ', imagePath);
                        await (0, _cropImage2.default)(imagePath); //Todo 경로 설정
                        var files = fs.readdirSync(PATH); //해당 디렉토리 탐색
                        send = [];
                        listImage = [];
                        for (var i = 0; i < files.length; i++) {
                            send.push(i);
                        }
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var tmp = _step.value;

                                var p = path.join(PATH, tmp);
                                listImage.push(nativeImage.createFromPath(p).toDataURL());
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

                        notifier.notify({
                            title: "Image Crop Success",
                            message: "이미지 확인을 하고 싶으면 클릭하세요",
                            wait: true
                        });
                        notifier.on('click', function (object, options, event) {
                            console.log('test');
                            _electron.shell.openItem(PATH);
                        });
                        setCrop(true);
                        setUpdate();
                    } },
                '\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30'
            )
        ),
        _react2.default.createElement(
            _core.Paper,
            { className: classes.list },
            _react2.default.createElement(
                TabPanel,
                { value: value, index: null },
                '\uAD6C\uBD84\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.'
            ),
            _react2.default.createElement(
                TabPanel,
                { value: value, index: 1 },
                _react2.default.createElement(
                    _core.Grid,
                    { container: true, zeroMinWidth: true, className: classes2.item },
                    _react2.default.createElement(
                        _core.Grid,
                        { xs: 6, item: true },
                        _react2.default.createElement('img', { style: { marginTop: 12, marginBottom: 12 }, maxHeight: '303', maxWidth: '352',
                            height: '100%', width: '100%',
                            src: iimage, alt: "" })
                    ),
                    _react2.default.createElement(
                        _core.Grid,
                        { xs: 6, item: true },
                        _react2.default.createElement(_core.TextField, { id: 'classification-require', label: '\uC774\uBBF8\uC9C0 \uBD84\uB958\uB97C \uC704\uD55C \uBB38\uC11C\uC885\uB958\uB97C \uC801\uC73C\uC138\uC694', multiline: true,
                            rows: '14', fullWidth: true, margin: 'normal', variant: 'filled' })
                    )
                )
            ),
            _react2.default.createElement(
                TabPanel,
                { value: value, index: 2 },
                _react2.default.createElement(
                    _core.List,
                    { className: classes2.root },
                    listImage.map(function (item) {
                        return _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                _core.Grid,
                                { container: true, divider: true, zeroMinWidth: true, className: classes2.item },
                                _react2.default.createElement(
                                    _core.Grid,
                                    { xs: 6, item: true },
                                    _react2.default.createElement('img', { style: { marginTop: 12, marginBottom: 12 }, maxHeight: '303',
                                        maxWidth: '343', height: '98%', width: '100%',
                                        src: item, alt: "" })
                                ),
                                _react2.default.createElement(
                                    _core.Grid,
                                    { xs: 6, item: true },
                                    _react2.default.createElement(_core.TextField, { id: 'submit-text-' + item, onChange: txtChange(item), label: '\uC774\uBBF8\uC9C0 \uB0B4\uC758 \uD14D\uC2A4\uD2B8\uB97C \uC801\uC5B4\uC8FC\uC138\uC694', multiline: true,
                                        rows: '3', fullWidth: true, margin: 'normal', variant: 'filled' })
                                )
                            ),
                            _react2.default.createElement(_core.Divider, null)
                        );
                    })
                )
            )
        )
    );
}