'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = SearchBefore;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clsx3 = require('clsx');

var _clsx4 = _interopRequireDefault(_clsx3);

var _styles = require('@material-ui/core/styles');

var _colors = require('@material-ui/core/colors');

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _settingdata = require('./settingdata.json');

var _settingdata2 = _interopRequireDefault(_settingdata);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

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

var _UploadLog = require('../../main/FrameTest/UploadLog');

var _UploadLog2 = _interopRequireDefault(_UploadLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('electron'),
    ipcRenderer = _require.ipcRenderer;

var delay = require('delay');
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
var check = false;
function SearchBefore() {
    // console.log('body rendering......');
    var classes = useStyles();

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        rows = _useState2[0],
        setRow = _useState2[1];

    (0, _react.useEffect)(function () {
        ipcRenderer.on('RESULT_DICTIONARY', async function (event, result) {
            setRow([].concat(_toConsumableArray(rows), [createData(rows.length, result.fileName, result.classification, result.detectList, result.detectCount, result.formLevel, result.filePath, result.fitness)]));
            //console.log(rows);
            await delay(30);
        });
        return function () {
            //console.log('closed : ' ,rows);
            ipcRenderer.send('TEST1', rows);
            ipcRenderer.removeAllListeners('RESULT_DICTIONARY');
        };
    });
    ///////////////////// 검색결과 //////////////////////////

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
        if (input === 'GREEN') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uC815\uC0C1', placement: 'top' },
                _react2.default.createElement(_FiberManualRecord2.default, { color: 'primary' })
            )
        );else if (input === 'YELLOW') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uBBF8\uB4F1\uB85D', placement: 'top' },
                _react2.default.createElement(_Error2.default, { color: 'secondary' })
            )
        );else if (input === 'RED') return _react2.default.createElement(
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
            { title: '\uBD84\uB958\uC2E4\uD328', placement: 'top' },
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

    function createData(id, fileName, classification, detectList, detectCount, formLevel, filePath, fitness) {
        return { id: id, fileName: fileName, classification: classification, detectList: detectList, detectCount: detectCount, formLevel: formLevel, filePath: filePath, fitness: fitness };
    }

    // console.log('body end........');
    return _react2.default.createElement(
        _Paper2.default,
        { style: { height: 400, width: '100%' } },
        _react2.default.createElement(VirtualizedTable, {
            rowCount: rows.length,
            rowGetter: function rowGetter(_ref6) {
                var index = _ref6.index;
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
                dataKey: 'fitness',
                numeric: true
            }]
        })
    );
}