"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SearchBody;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx3 = _interopRequireDefault(require("clsx"));

var _styles = require("@material-ui/core/styles");

var _colors = require("@material-ui/core/colors");

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _reactVirtualized = require("react-virtualized");

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _FiberManualRecord = _interopRequireDefault(require("@material-ui/icons/FiberManualRecord"));

var _Error = _interopRequireDefault(require("@material-ui/icons/Error"));

var _Warning = _interopRequireDefault(require("@material-ui/icons/Warning"));

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
  return _react["default"].createElement(_Typography["default"], {
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, children);
}

TabPanel.propTypes = {
  children: _propTypes["default"].node,
  index: _propTypes["default"].any.isRequired,
  value: _propTypes["default"].any.isRequired
};

function SearchBody() {
  // console.log('body rendering......');
  var classes = useStyles();

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      rows = _useState2[0],
      setRow = _useState2[1]; //배열 결과를 메인으로 넘기기 위해 사용


  (0, _react.useEffect)(function () {
    ipcRenderer.on('RESULT_DICTIONARY',
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(event, result) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setRow([].concat((0, _toConsumableArray2["default"])(rows), [createData(rows.length, result.fileName, result.classification, result.detectList, result.detectCount, result.formLevel, result.filePath, result.fitness)]));
                console.log(rows);
                _context.next = 4;
                return delay(30);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
    return function () {
      //console.log('closed : ' ,rows);
      ipcRenderer.send('TEST1', rows);
      ipcRenderer.removeAllListeners('RESULT_DICTIONARY');
    };
  }); ///////////////////// 검색결과 //////////////////////////

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
      primary: {
        main: _colors.green[500]
      },
      secondary: {
        main: _colors.yellow[500]
      },
      error: {
        main: _colors.red[500]
      },
      "default": {
        main: _colors.blue[500]
      }
    }
  });

  var iconDisplay = function iconDisplay(input) {
    if (input === 'GREEN') return _react["default"].createElement(_styles.MuiThemeProvider, {
      theme: theme
    }, _react["default"].createElement(_Tooltip["default"], {
      title: "\uC815\uC0C1",
      placement: "top"
    }, _react["default"].createElement(_FiberManualRecord["default"], {
      color: "primary"
    })));else if (input === 'YELLOW') return _react["default"].createElement(_styles.MuiThemeProvider, {
      theme: theme
    }, _react["default"].createElement(_Tooltip["default"], {
      title: "\uBBF8\uB4F1\uB85D",
      placement: "top"
    }, _react["default"].createElement(_Error["default"], {
      color: "secondary"
    })));else if (input === 'RED') return _react["default"].createElement(_styles.MuiThemeProvider, {
      theme: theme
    }, _react["default"].createElement(_Tooltip["default"], {
      title: "\uC704\uD5D8",
      placement: "top"
    }, _react["default"].createElement(_Warning["default"], {
      color: "error"
    })));
    return _react["default"].createElement(_Tooltip["default"], {
      title: "\uBD84\uB958\uC2E4\uD328",
      placement: "top"
    }, _react["default"].createElement(_FiberManualRecord["default"], {
      color: "disabled"
    }));
  };

  var cellDisplay = function cellDisplay(input) {
    var tmp = [];

    for (var i = 0; i < input.length; i++) {
      tmp.push(input[i]);
      if (i < input.length - 1) tmp.push('/');
    }

    return tmp;
  };

  var MuiVirtualizedTable =
  /*#__PURE__*/
  function (_React$PureComponent) {
    (0, _inherits2["default"])(MuiVirtualizedTable, _React$PureComponent);

    function MuiVirtualizedTable(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, MuiVirtualizedTable);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MuiVirtualizedTable).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "headerRenderer", function (_ref2) {
        var label = _ref2.label,
            columnIndex = _ref2.columnIndex;
        var _this$props = _this.props,
            headerHeight = _this$props.headerHeight,
            columns = _this$props.columns,
            classes = _this$props.classes;
        return _react["default"].createElement(_TableCell["default"], {
          component: "div",
          className: (0, _clsx3["default"])(classes.tableCell, classes.flexContainer, classes.noClick),
          variant: "head",
          style: {
            height: headerHeight,
            paddingBottom: 0
          },
          align: columns[columnIndex].numeric || false ? 'right' : 'left'
        }, _react["default"].createElement("span", {
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#212121'
          }
        }, label));
      });
      _this.getRowClassName = _this.getRowClassName.bind((0, _assertThisInitialized2["default"])(_this));
      _this.cellRenderer = _this.cellRenderer.bind((0, _assertThisInitialized2["default"])(_this));
      _this.headerRenderer = _this.headerRenderer.bind((0, _assertThisInitialized2["default"])(_this));
      return _this;
    }

    (0, _createClass2["default"])(MuiVirtualizedTable, [{
      key: "getRowClassName",
      value: function getRowClassName(_ref3) {
        var index = _ref3.index;
        var _this$props2 = this.props,
            classes = _this$props2.classes,
            onRowClick = _this$props2.onRowClick;
        return (0, _clsx3["default"])(classes.tableRow, classes.flexContainer, (0, _defineProperty2["default"])({}, classes.tableRowHover, index !== -1 && onRowClick != null));
      }
    }, {
      key: "cellRenderer",
      value: function cellRenderer(_ref4) {
        var cellData = _ref4.cellData,
            columnIndex = _ref4.columnIndex;
        var _this$props3 = this.props,
            columns = _this$props3.columns,
            classes = _this$props3.classes,
            rowHeight = _this$props3.rowHeight,
            onRowClick = _this$props3.onRowClick;
        return _react["default"].createElement(_TableCell["default"], {
          component: "div",
          className: (0, _clsx3["default"])(classes.tableCell, classes.flexContainer, (0, _defineProperty2["default"])({}, classes.noClick, onRowClick == null)),
          variant: "body",
          style: {
            height: rowHeight
          },
          align: columnIndex != null && columns[columnIndex].numeric || false ? 'right' : 'left'
        }, columnIndex === 2 ? cellDisplay(cellData) : columnIndex === 4 ? iconDisplay(cellData) : cellData);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props4 = this.props,
            classes = _this$props4.classes,
            columns = _this$props4.columns,
            rowHeight = _this$props4.rowHeight,
            headerHeight = _this$props4.headerHeight,
            rowCount = _this$props4.rowCount,
            rowGetter = _this$props4.rowGetter;
        return _react["default"].createElement(_reactVirtualized.AutoSizer, null, function (_ref5) {
          var height = _ref5.height,
              width = _ref5.width;
          return _react["default"].createElement(_reactVirtualized.Table, {
            height: height,
            width: width,
            rowHeight: rowHeight,
            headerHeight: headerHeight,
            rowCount: rowCount,
            rowGetter: rowGetter,
            rowClassName: _this2.getRowClassName
          }, columns.map(function (_ref6, index) {
            var dataKey = _ref6.dataKey,
                width = _ref6.width,
                label = _ref6.label,
                numeric = _ref6.numeric;
            return _react["default"].createElement(_reactVirtualized.Column, {
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
          }));
        });
      }
    }]);
    return MuiVirtualizedTable;
  }(_react["default"].PureComponent);

  MuiVirtualizedTable.defaultProps = {
    headerHeight: 48,
    rowHeight: 40
  };
  MuiVirtualizedTable.propTypes = {
    classes: _propTypes["default"].object.isRequired,
    columns: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      dataKey: _propTypes["default"].string.isRequired,
      label: _propTypes["default"].string.isRequired,
      numeric: _propTypes["default"].bool,
      width: _propTypes["default"].number.isRequired
    })).isRequired,
    headerHeight: _propTypes["default"].number,
    onRowClick: _propTypes["default"].func,
    rowHeight: _propTypes["default"].number
  };
  var VirtualizedTable = (0, _styles.withStyles)(styles)(MuiVirtualizedTable);

  function createData(id, fileName, classification, detectList, detectCount, formLevel, filePath, fitness) {
    return {
      id: id,
      fileName: fileName,
      classification: classification,
      detectList: detectList,
      detectCount: detectCount,
      formLevel: formLevel,
      filePath: filePath,
      fitness: fitness
    };
  } // console.log('body end........');


  return _react["default"].createElement(_Paper["default"], {
    style: {
      height: 400,
      width: '100%',
      border: 100,
      borderColor: '#000000',
      paddingLeft: 10
    },
    elevation: 0
  }, _react["default"].createElement(VirtualizedTable, {
    rowCount: rows.length,
    rowGetter: function rowGetter(_ref7) {
      var index = _ref7.index;
      return rows[index];
    },
    columns: [{
      width: 200 + 84,
      label: '파일명',
      dataKey: 'fileName'
    }, {
      width: 120 + 84,
      label: '분류',
      dataKey: 'classification'
    }, {
      width: 120 + 84,
      label: '검출 내역',
      dataKey: 'detectList'
    }, {
      width: 110 + 84,
      label: '검출 개수',
      dataKey: 'detectCount',
      numeric: true
    }, {
      width: 110 + 84,
      label: '적합도',
      dataKey: 'fitness',
      numeric: true
    }]
  }));
}