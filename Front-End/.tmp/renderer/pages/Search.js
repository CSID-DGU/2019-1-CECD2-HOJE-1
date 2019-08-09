"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Search;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _electron = require("electron");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Popper = _interopRequireDefault(require("@material-ui/core/Popper"));

var _Fade = _interopRequireDefault(require("@material-ui/core/Fade"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Settings = _interopRequireDefault(require("@material-ui/icons/Settings"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _reg = _interopRequireDefault(require("../../../reg/reg"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Tree = _interopRequireDefault(require("./Tree"));

var _SearchHeader = _interopRequireDefault(require("./SearchHeader"));

var _SearchBody = _interopRequireDefault(require("./SearchBody"));

var fs = require('fs');

var PATH = require('path');

var tree = require('electron-tree-view');

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

var moment = require('moment');

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
var test = [];

_reg["default"].reg.map(function (value) {
  if (value.checked === true) {
    test.push(value.key);
  }
});

function Search() {
  var classes = useStyles();

  var _React$useState = _react["default"].useState(0),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(null),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      anchorEl = _React$useState4[0],
      setAnchorEl = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(false),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      open = _React$useState6[0],
      setOpen = _React$useState6[1];

  var _React$useState7 = _react["default"].useState(),
      _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
      placement = _React$useState8[0],
      setPlacement = _React$useState8[1];

  var _React$useState9 = _react["default"].useState([]),
      _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
      selectedFile = _React$useState10[0],
      setSelectedFile = _React$useState10[1];

  var _React$useState11 = _react["default"].useState(false),
      _React$useState12 = (0, _slicedToArray2["default"])(_React$useState11, 2),
      ReRender = _React$useState12[0],
      setReRender = _React$useState12[1];

  var _React$useState13 = _react["default"].useState(''),
      _React$useState14 = (0, _slicedToArray2["default"])(_React$useState13, 2),
      birth = _React$useState14[0],
      setBirth = _React$useState14[1];

  var handleClick = function handleClick(newPlacement) {
    return function (event) {
      setAnchorEl(event.currentTarget);
      setOpen(function (prev) {
        return placement !== newPlacement || !prev;
      });
      setPlacement(newPlacement);
    };
  };

  (0, _react.useEffect)(function () {
    fs.exists("".concat(__dirname, "/../../../resultfile.json"), function (exists) {
      if (exists) {
        fs.stat("".concat(__dirname, "/../../../resultfile.json"), function (err, stat) {
          var data = moment(stat.atime).format('YYYY년 MM월 DD일');
          console.log('date : ', data);
          setBirth(data);
        });
      } else setBirth('이전 검사일을 알 수 없음');
    });
  });

  var _React$useState15 = _react["default"].useState(test),
      _React$useState16 = (0, _slicedToArray2["default"])(_React$useState15, 2),
      checked = _React$useState16[0],
      setChecked = _React$useState16[1];

  var handleToggle = function handleToggle(value) {
    return function () {
      var currentIndex = checked.indexOf(value);
      var newChecked = (0, _toConsumableArray2["default"])(checked);

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };
  }; ////// 경로 출력


  var assignObjectPaths = function assignObjectPaths(obj, stack) {
    Object.keys(obj).forEach(function (k) {
      var node = obj[k];

      if ((0, _typeof2["default"])(node) === "object") {
        node.path = stack ? "".concat(stack, ".").concat(k) : k;
        assignObjectPaths(node, node.path);
      }
    });
  }; // 기본 경로( Windows 기준 )


  var _React$useState17 = _react["default"].useState({
    'C:\\': {
      path: 'C:\\',
      type: 'folder',
      checked: false,
      isRoot: true,
      children: []
    }
  }),
      _React$useState18 = (0, _slicedToArray2["default"])(_React$useState17, 2),
      path_data = _React$useState18[0],
      setPathData = _React$useState18[1]; // Forced ReRendering


  var _React$useState19 = _react["default"].useState(),
      _React$useState20 = (0, _slicedToArray2["default"])(_React$useState19, 2),
      updateState = _React$useState20[1];

  var forceUpdate = _react["default"].useCallback(function () {
    updateState({});
    setReRender(false);
  }, []);
  /*
  React.useEffect(() => {
      if (ReRender) {
          setTimeout(forceUpdate, 100);
      }
  });
  */


  var onToggle = function onToggle(currentNode) {
    var tmp_path_data = path_data;

    if (currentNode.isOpen) {
      var tmp = fs.readdirSync(currentNode.path, {
        withFileTypes: true
      }); //console.log(currentNode);

      tmp.map(function (value) {
        var path = currentNode.path + '/' + value.name;

        if (tmp_path_data[currentNode.path].children.indexOf(path) === -1) {
          //console.log(path);
          tmp_path_data[currentNode.path].children.push(path);

          if (value.isDirectory()) {
            tmp_path_data[path] = {
              path: "".concat(path),
              type: 'folder',
              checked: false,
              children: []
            };
          } else {
            tmp_path_data[path] = {
              path: "".concat(path),
              type: 'file',
              content: '',
              checked: false
            };
          }
        }
      });
      setPathData(tmp_path_data); //console.log(path_data);
    }

    setReRender(true);
  }; // 체크 목록 넣기


  var onChecked = function onChecked(value) {
    var currentIndex = selectedFile.indexOf(value.path);
    var newSelectFile = (0, _toConsumableArray2["default"])(selectedFile);

    if (currentIndex === -1) {
      newSelectFile.push(value.path);
    } else {
      newSelectFile.splice(currentIndex, 1);
    }

    setSelectedFile(newSelectFile);
  };

  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(TabPanel, {
    value: value,
    index: 0
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    spacing: 2
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    sm: 8
  }, _react["default"].createElement(_TextField["default"], {
    id: "outlined-read-only-input",
    label: "\uCD5C\uADFC \uAC80\uC0AC",
    margin: "normal",
    InputProps: {
      readOnly: true
    },
    value: birth,
    variant: "outlined"
  }, "\uAC80\uC0AC\uB0B4\uC5ED")), _react["default"].createElement("div", {
    className: classes.spacer
  }), _react["default"].createElement(_Fab["default"], {
    variant: "extended",
    color: "primary",
    "aria-label": "Add",
    className: classes.margin,
    onClick:
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (open === true) setOpen(false);
              setReRender(false);
              setValue(1);

              _electron.ipcRenderer.send('START_SEARCH', checked);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  }, "\uAC80\uC0AC \uC2DC\uC791"), _react["default"].createElement(_IconButton["default"], {
    onClick: handleClick('bottom-end')
  }, _react["default"].createElement(_Settings["default"], null)), _react["default"].createElement(_Popper["default"], {
    open: open,
    anchorEl: anchorEl,
    placement: placement,
    transition: true
  }, function (_ref2) {
    var TransitionProps = _ref2.TransitionProps;
    return _react["default"].createElement(_Fade["default"], (0, _extends2["default"])({}, TransitionProps, {
      timeout: 350
    }), _react["default"].createElement(_Paper["default"], null, _react["default"].createElement(_List["default"], {
      className: classes.root
    }, _reg["default"].reg.map(function (value) {
      var labelId = "op-".concat(value.id);
      return _react["default"].createElement(_ListItem["default"], {
        disabled: value.disable,
        key: value.id,
        role: undefined,
        dense: true,
        button: true,
        onClick: handleToggle(value.key)
      }, _react["default"].createElement(_ListItemIcon["default"], null, _react["default"].createElement(_Checkbox["default"], {
        edge: "start",
        checked: checked.indexOf(value.key) !== -1,
        tabIndex: -1,
        disableRipple: true,
        inputProps: {
          'aria-labelledby': labelId
        }
      })), _react["default"].createElement(_ListItemText["default"], {
        id: labelId,
        primary: "".concat(value.key)
      }));
    }))));
  })), _react["default"].createElement(_Grid["default"], {
    container: true,
    justify: "center",
    alignItems: "center",
    spacing: 5
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: true
  }, _react["default"].createElement(_Tree["default"], {
    onChecked: onChecked,
    onToggle: onToggle,
    data: path_data
  })))), _react["default"].createElement(TabPanel, {
    value: value,
    index: 1
  }, _react["default"].createElement(_SearchHeader["default"], null), _react["default"].createElement(_SearchBody["default"], null)));
}