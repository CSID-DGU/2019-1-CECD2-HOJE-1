"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Result;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _clsx2 = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _colors = require("@material-ui/core/colors");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableSortLabel = _interopRequireDefault(require("@material-ui/core/TableSortLabel"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Modal = _interopRequireDefault(require("@material-ui/core/Modal"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _FiberManualRecord = _interopRequireDefault(require("@material-ui/icons/FiberManualRecord"));

var _Error = _interopRequireDefault(require("@material-ui/icons/Error"));

var _Warning = _interopRequireDefault(require("@material-ui/icons/Warning"));

var _electron = require("electron");

var _masking = _interopRequireDefault(require("../../main/FrameTest/masking"));

var _quasiShow = _interopRequireDefault(require("../../main/FrameTest/quasiShow"));

var path = require('path');

var notifier = require('node-notifier');

function createData(fileName, filePath, detectList, detectCount, formLevel, fitness, classification) {
  return {
    fileName: fileName,
    filePath: filePath,
    detectList: detectList,
    detectCount: detectCount,
    formLevel: formLevel,
    fitness: fitness,
    classification: classification
  };
} // FormLevel : 1, 2, 3 -> 낮은 숫자일 수록 높은 등급


var rows = [];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function stableSort(array, cmp) {
  var stabilizedThis = array.map(function (el, index) {
    return [el, index];
  });
  stabilizedThis.sort(function (a, b) {
    var order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(function (el) {
    return el[0];
  });
}

function getSorting(order, orderBy) {
  return order === 'desc' ? function (a, b) {
    return desc(a, b, orderBy);
  } : function (a, b) {
    return -desc(a, b, orderBy);
  };
}

var headRows = [{
  id: 'fileName',
  numeric: false,
  disablePadding: true,
  label: '파일명'
}, {
  id: 'detectList',
  numeric: false,
  disablePadding: false,
  label: '검출 내역'
}, {
  id: 'detectCount',
  numeric: true,
  disablePadding: false,
  label: '검출 개수'
}, {
  id: 'formLevel',
  numeric: false,
  disablePadding: false,
  label: '문서등급'
}, {
  id: 'fitness',
  numeric: false,
  disablePadding: false,
  label: '적합도'
}];

function EnhancedTableHead(props) {
  var onSelectAllClick = props.onSelectAllClick,
      order = props.order,
      orderBy = props.orderBy,
      numSelected = props.numSelected,
      rowCount = props.rowCount,
      onRequestSort = props.onRequestSort;

  var createSortHandler = function createSortHandler(property) {
    return function (event) {
      onRequestSort(event, property);
    };
  };

  return _react["default"].createElement(_TableHead["default"], null, _react["default"].createElement(_TableRow["default"], null, _react["default"].createElement(_TableCell["default"], {
    padding: "checkbox"
  }, _react["default"].createElement(_Checkbox["default"], {
    indeterminate: numSelected > 0 && numSelected < rowCount,
    checked: numSelected === rowCount,
    onChange: onSelectAllClick,
    inputProps: {
      'aria-label': 'Select all Result'
    }
  })), headRows.map(function (row) {
    return _react["default"].createElement(_TableCell["default"], {
      key: row.id,
      align: row.numeric ? 'right' : 'left',
      padding: row.disablePadding ? 'none' : 'default',
      sortDirection: orderBy === row.id ? order : false
    }, _react["default"].createElement(_TableSortLabel["default"], {
      active: orderBy === row.id,
      direction: order,
      onClick: createSortHandler(row.id),
      style: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121'
      }
    }, row.label));
  })));
}

EnhancedTableHead.propTypes = {
  numSelected: _propTypes["default"].number.isRequired,
  onRequestSort: _propTypes["default"].func.isRequired,
  onSelectAllClick: _propTypes["default"].func.isRequired,
  order: _propTypes["default"].string.isRequired,
  orderBy: _propTypes["default"].string.isRequired,
  rowCount: _propTypes["default"].number.isRequired
};

var parsingPath = function parsingPath(ppath, mode) {
  var r = rows.find(function (item) {
    return item.filePath === ppath;
  });
  var dir = path.dirname(ppath);
  var ext = path.extname(ppath);
  var basename = path.basename(ppath, ext); //파일 이름

  if (mode === 1) {
    var renaming = basename + '.mask';
    basename = renaming + ext; //새로운 파일 이름

    var renew = path.join(dir, basename); //새로운 경로

    r.fileName = basename;
    r.filePath = renew;
    r.detectList = [];
    r.detectCount = 0;
    notifier.notify({
      //수행이 다 된 후 알람
      title: 'Masking Success!',
      message: '파일이 마스킹 됐습니다.',
      wait: true,
      timeout: false
    }, function (err, response) {
      _electron.shell.openItem(r.filePath);
    });
  } else if (mode === 2) {
    basename = basename.substring(0, basename.length - 5) + ext; //새로운 파일 이름

    var _renew = path.join(dir, basename); //새로운 경로


    r.fileName = basename;
    r.filePath = _renew;
    r.detectList = [];
    r.detectCount = 0;
    notifier.notify({
      //수행이 다 된 후 알람
      title: 'Unmasking Success!',
      message: '파일이 재식별화 됐습니다.',
      wait: true,
      timeout: false
    }, function (err, response) {
      _electron.shell.openItem(r.filePath);
    });
  }
};

var useToolbarStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight: theme.palette.type === 'light' ? {
      color: theme.palette.primary.main,
      backgroundColor: (0, _styles.lighten)(theme.palette.primary.light, 0.85)
    } : {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.dark
    },
    spacer: {
      flex: '1 1 auto'
    },
    actions: {
      backgroundColor: '#e6ee9c',
      color: '#000000'
    },
    title: {
      flex: '0 0 auto'
    }
  };
});
/*
const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const {numSelected, selected} = props;
    const masked = [];
    const noneMasked = [];
    selected.forEach(element => {
        if (element.indexOf('.mask') !== -1) masked.push(element);
        else noneMasked.push(element);
    });
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        검사 내역
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div>
                {numSelected > 0 ? (
                        masked.length > 0 && noneMasked.length > 0 ? ('재식별화 항목과 비식별화 항목을 각각 선택하세요') :
                            (masked.length > 0 ? (
                                    <Tooltip title="재식별화">
                                        <Fab className={classes.actions} variant="extended" label='재식별화'>재식별화</Fab>
                                    </Tooltip>
                                ) :
                                (noneMasked.length > 0 ? (
                                        <Tooltip title="비식별화">
                                            <Fab className={classes.actions} variant="extended" label='비식별화' onClick={async ()=>{
                                                for (const path of selected) {
                                                    await masking(path); //마스킹
                                                    await parsingPath(path);
                                                };
                                                notifier.notify({ //수행이 다 된 후 알람
                                                    title: '마스킹 성공!',
                                                    message: selected.length + '개의 파일이 마스킹 됐습니다.',
                                                });
                                            }}>비식별화</Fab>
                                        </Tooltip>) :
                                    ('')))
                    ) :
                    ('')
                }
                {numSelected > 0 && numSelected === 1 && masked.length === 0 ? (
                    <Tooltip title="문의">
                        <Fab className={classes.actions} variant="extended" label='문의' component={Link}
                             to='/qna'onClick={()=>{
                            ipcRenderer.send('RESULT1', selected.pop());
                        }}>문의</Fab>
                    </Tooltip>
                ) : ('')
                }
            </div>
        </Toolbar>
    );
};
*/

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      width: '100%',
      marginTop: theme.spacing(3)
    },
    paper: {
      width: '100%',
      border: '1px solid',
      borderRadius: '10px',
      borderColor: "#c5e1a5",
      boxShadow: '2px 2px 2px'
    },
    table: {
      minWidth: 700
    },
    tableWrapper: {
      overflowX: 'auto'
    }
  };
});
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
var modalStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  };
});
var quasiTmp = [];

function Result() {
  var classes = useStyles();

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      setUpdate = _useState2[1]; //강제 렌더링


  var _React$useState = _react["default"].useState('desc'),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      order = _React$useState2[0],
      setOrder = _React$useState2[1];

  var _React$useState3 = _react["default"].useState('formLevel'),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      orderBy = _React$useState4[0],
      setOrderBy = _React$useState4[1];

  var _React$useState5 = _react["default"].useState([]),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      selected = _React$useState6[0],
      setSelected = _React$useState6[1];

  var _React$useState7 = _react["default"].useState([]),
      _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
      selectedClassification = _React$useState8[0],
      setSelectedClassification = _React$useState8[1];

  var _React$useState9 = _react["default"].useState(0),
      _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
      page = _React$useState10[0],
      setPage = _React$useState10[1];

  var _React$useState11 = _react["default"].useState(7),
      _React$useState12 = (0, _slicedToArray2["default"])(_React$useState11, 2),
      rowsPerPage = _React$useState12[0],
      setRowsPerPage = _React$useState12[1];

  var cellDisplay = function cellDisplay(input, selectedClassification) {
    var tmp = []; //console.log('classification', selectedClassification);

    if (selectedClassification.indexOf('국민카드') == -1) return '추론이 불가능한 이미지입니다.';

    for (var i = 0; i < input.length; i++) {
      tmp.push(input[i]);
      if (i < input.length - 1) tmp.push('/');
    }

    tmp.push('가 추론 될 수 있습니다.');
    return tmp;
  };

  var EnhancedTableToolbar = function EnhancedTableToolbar(props) {
    var classes = useToolbarStyles();
    var numSelected = props.numSelected,
        selected = props.selected,
        selectedClassification = props.selectedClassification;
    var masked = [];
    var noneMasked = [];
    selected.forEach(function (element) {
      if (element.indexOf('.mask') !== -1) masked.push(element);else noneMasked.push(element);
    });
    var modalclasses = modalStyles();

    var _React$useState13 = _react["default"].useState(false),
        _React$useState14 = (0, _slicedToArray2["default"])(_React$useState13, 2),
        open = _React$useState14[0],
        setOpen = _React$useState14[1];

    var handleOpen = function handleOpen() {
      setOpen(true);
    };

    var handleClose = function handleClose() {
      setOpen(false);
    };

    return _react["default"].createElement(_Toolbar["default"], {
      className: (0, _clsx2["default"])(classes.root, (0, _defineProperty2["default"])({}, classes.highlight, numSelected > 0)),
      style: {
        height: 74,
        background: 'linear-gradient( #f1f8e9, #fafafa )',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px'
      }
    }, _react["default"].createElement("div", {
      className: classes.title
    }, numSelected > 0 ? _react["default"].createElement(_Typography["default"], {
      color: "inherit",
      variant: "subtitle1"
    }, numSelected, " \uC120\uD0DD\uB428") : _react["default"].createElement(_Typography["default"], {
      variant: "h6",
      id: "tableTitle"
    }, "\uAC80\uC0AC \uB0B4\uC5ED")), _react["default"].createElement("div", {
      className: classes.spacer
    }), _react["default"].createElement("div", null, numSelected > 0 ? masked.length > 0 && noneMasked.length > 0 ? '재식별화 항목과 비식별화 항목을 각각 선택하세요' : masked.length > 0 ? _react["default"].createElement(_Tooltip["default"], {
      title: "\uC7AC\uC2DD\uBCC4\uD654"
    }, _react["default"].createElement(_Fab["default"], {
      className: classes.actions,
      variant: "extended",
      label: "\uC7AC\uC2DD\uBCC4\uD654",
      onClick:
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _path;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = selected[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 14;
                  break;
                }

                _path = _step.value;
                _context.next = 9;
                return (0, _masking["default"])(_path, 'unmasking');

              case 9:
                _context.next = 11;
                return parsingPath(_path, 2);

              case 11:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 14:
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 20:
                _context.prev = 20;
                _context.prev = 21;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 23:
                _context.prev = 23;

                if (!_didIteratorError) {
                  _context.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context.finish(23);

              case 27:
                return _context.finish(20);

              case 28:
                ;
                setSelected([]);

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 16, 20, 28], [21,, 23, 27]]);
      }))
    }, "\uC7AC\uC2DD\uBCC4\uD654")) : noneMasked.length > 0 ? _react["default"].createElement(_Tooltip["default"], {
      title: "\uBE44\uC2DD\uBCC4\uD654"
    }, _react["default"].createElement(_Fab["default"], {
      className: classes.actions,
      variant: "extended",
      label: "\uBE44\uC2DD\uBCC4\uD654",
      onClick:
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _path2;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 3;
                _iterator2 = selected[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 14;
                  break;
                }

                _path2 = _step2.value;
                _context2.next = 9;
                return (0, _masking["default"])(_path2, 'masking');

              case 9:
                _context2.next = 11;
                return parsingPath(_path2, 1);

              case 11:
                _iteratorNormalCompletion2 = true;
                _context2.next = 5;
                break;

              case 14:
                _context2.next = 20;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](3);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 20:
                _context2.prev = 20;
                _context2.prev = 21;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 23:
                _context2.prev = 23;

                if (!_didIteratorError2) {
                  _context2.next = 26;
                  break;
                }

                throw _iteratorError2;

              case 26:
                return _context2.finish(23);

              case 27:
                return _context2.finish(20);

              case 28:
                ;
                setSelected([]);

              case 30:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 16, 20, 28], [21,, 23, 27]]);
      }))
    }, "\uBE44\uC2DD\uBCC4\uD654")) : '' : '', numSelected > 0 && numSelected === 1 && masked.length === 0 ? _react["default"].createElement(_Tooltip["default"], {
      title: "\uC900\uC2DD\uBCC4\uC790 \uD0D0\uC9C0"
    }, _react["default"].createElement(_Fab["default"], {
      className: classes.actions,
      style: {
        marginLeft: 10
      },
      variant: "extended",
      label: "\uC900\uC2DD\uBCC4\uC790 \uD0D0\uC9C0",
      onClick:
      /*#__PURE__*/
      (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return (0, _quasiShow["default"])();

              case 2:
                quasiTmp = _context3.sent;
                console.log('quasi: ', quasiTmp);
                handleOpen();

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))
    }, "\uC900\uC2DD\uBCC4\uC790 \uD0D0\uC9C0")) : '', _react["default"].createElement(_Modal["default"], {
      className: modalclasses.modal,
      open: open,
      onClose: handleClose
    }, _react["default"].createElement(_Fade["default"], {
      "in": open
    }, _react["default"].createElement("div", {
      className: modalclasses.paper
    }, _react["default"].createElement("h2", {
      id: "transition-modal-title"
    }, "\uCD94\uB860 \uC18D\uC131 \uC815\uBCF4"), _react["default"].createElement("p", {
      id: "transition-modal-description"
    }, cellDisplay(quasiTmp, selectedClassification))))), numSelected > 0 && numSelected === 1 && masked.length === 0 ? _react["default"].createElement(_Tooltip["default"], {
      title: "\uBB38\uC758"
    }, _react["default"].createElement(_Fab["default"], {
      className: classes.actions,
      style: {
        marginLeft: 10
      },
      variant: "extended",
      label: "\uBB38\uC758",
      component: _reactRouterDom.Link,
      to: "/qna",
      onClick: function onClick() {
        _electron.ipcRenderer.send('RESULT1', selected.pop());
      }
    }, "\uBB38\uC758")) : ''));
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: _propTypes["default"].number.isRequired
  };

  function handleRequestSort(event, property) {
    var isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }
  /*
      useEffect(() => {
          let tmpList = [];
          rows = [];
          if (fs.exists('resultfile.json', (exists => { //
              console.log('file read');
              if (exists) {
                  tmpList = fs.readFileSync('resultfile.json', 'utf8');
                  tmpList = JSON.parse(tmpList);
                  for(const t of tmpList){
                      rows.push(createData(t.fileName,t.filePath,t.detectList,t.detectCount,t.formLevel,t.fitness));
                  }
              }
              setUpdate();
          })));
      }, []); //렌더링 이후 한번만 수행
  */


  (0, _react.useEffect)(function () {
    _electron.ipcRenderer.send('RESULT_PAGE', true);

    _electron.ipcRenderer.once('RESULT_LIST', function (event, result) {
      if (result.length > 0) {
        rows = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var t = _step3.value;
            rows.push(createData(t.fileName, t.filePath, t.detectList, t.detectCount, t.formLevel, t.fitness, t.classification));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        setUpdate();
      }
    });

    return function () {
      _electron.ipcRenderer.removeAllListeners('RESULT_LIST');
    };
  }, []);

  function handleSelectAllClick(event) {
    if (event.target.checked && selected.length === 0) {
      var tmp = [];
      var newSelecteds = rows.map(function (n) {
        return n.filePath;
      });
      var newCounts = rows.map(function (n) {
        return n.detectCount;
      });

      for (var i = 0; i < newSelecteds.length; i++) {
        if (newCounts[i] !== 0) tmp.push(newSelecteds[i]);
      }

      setSelected(tmp);
      return;
    }

    setSelected([]);
  }

  function handleClick(event, name, classification) {
    var selectedIndex = selected.indexOf(name);
    var newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    var selectedIndexIndex = selectedClassification.indexOf(classification);
    var newSelectedClassification = [];

    if (selectedIndexIndex === -1) {
      newSelectedClassification = newSelectedClassification.concat(selectedClassification, classification);
    } else if (selectedIndexIndex === 0) {
      newSelectedClassification = newSelectedClassification.concat(selectedClassification.slice(1));
    } else if (selectedIndexIndex === selected.length - 1) {
      newSelectedClassification = newSelectedClassification.concat(selectedClassification.slice(0, -1));
    } else if (selectedIndexIndex > 0) {
      newSelectedClassification = newSelectedClassification.concat(selectedClassification.slice(0, selectedIndexIndex), selectedClassification.slice(selectedIndexIndex + 1));
    }

    setSelectedClassification(newSelectedClassification);
    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  var isSelected = function isSelected(name) {
    return selected.indexOf(name) !== -1;
  };

  var emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
      title: "\uACBD\uACE0",
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
      title: "\uBBF8\uB4F1\uB85D",
      placement: "top"
    }, _react["default"].createElement(_FiberManualRecord["default"], {
      color: "disabled"
    }));
  };

  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(_Box["default"], {
    className: classes.paper
  }, _react["default"].createElement(EnhancedTableToolbar, {
    numSelected: selected.length,
    selected: selected,
    selectedClassification: selectedClassification
  }), _react["default"].createElement("div", {
    className: classes.tableWrapper
  }, _react["default"].createElement(_Table["default"], {
    className: classes.table,
    "aria-labelledby": "tableTitle",
    size: 'small'
  }, _react["default"].createElement(EnhancedTableHead, {
    numSelected: selected.length,
    order: order,
    orderBy: orderBy,
    onSelectAllClick: handleSelectAllClick,
    onRequestSort: handleRequestSort,
    rowCount: rows.length
  }), _react["default"].createElement(_TableBody["default"], null, stableSort(rows, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (row, index) {
    var isItemSelected = isSelected(row.filePath);
    var labelId = "table-checkbox-".concat(index);
    return _react["default"].createElement(_TableRow["default"], {
      hover: true,
      onClick: function onClick(event) {
        return handleClick(event, row.filePath, row.classification);
      },
      role: "checkbox",
      "aria-checked": isItemSelected,
      tabIndex: -1,
      key: row.filePath,
      selected: isItemSelected
    }, _react["default"].createElement(_TableCell["default"], {
      padding: "checkbox"
    }, _react["default"].createElement(_Checkbox["default"], {
      checked: isItemSelected,
      inputProps: {
        'aria-labelledby': labelId
      }
    })), _react["default"].createElement(_TableCell["default"], {
      style: {
        width: 200 + 84
      },
      component: "th",
      id: labelId,
      scope: "row",
      padding: "none"
    }, _react["default"].createElement(_Tooltip["default"], {
      title: row.filePath,
      placement: "top"
    }, _react["default"].createElement(_Typography["default"], {
      noWrap: true
    }, row.fileName))), _react["default"].createElement(_TableCell["default"], {
      style: {
        width: 120 + 84
      },
      wrap: "nowrap",
      align: "right"
    }, row.detectList), _react["default"].createElement(_TableCell["default"], {
      style: {
        width: 120 + 84
      },
      align: "right"
    }, row.detectCount), _react["default"].createElement(_TableCell["default"], {
      style: {
        width: 110 + 84
      },
      align: "right"
    }, row.formLevel), _react["default"].createElement(_TableCell["default"], {
      style: {
        width: 110 + 84
      },
      align: "right"
    }, iconDisplay(row.fitness)));
  }), emptyRows > 0 && _react["default"].createElement(_TableRow["default"], {
    style: {
      height: 42 * emptyRows
    }
  }, _react["default"].createElement(_TableCell["default"], {
    colSpan: 6
  }))))), _react["default"].createElement(_TablePagination["default"], {
    style: {
      backgroundColor: '#f1f8e9',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px'
    },
    rowsPerPageOptions: [7],
    component: "div",
    count: rows.length,
    rowsPerPage: rowsPerPage,
    page: page,
    backIconButtonProps: {
      'aria-label': 'Previous Page'
    },
    nextIconButtonProps: {
      'aria-label': 'Next Page'
    },
    onChangePage: handleChangePage,
    onChangeRowsPerPage: handleChangeRowsPerPage
  })));
}