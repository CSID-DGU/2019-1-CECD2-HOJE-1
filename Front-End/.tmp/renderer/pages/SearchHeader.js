"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SearchHeader;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styles = require("@material-ui/core/styles");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _electron = require("electron");

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _PlayArrow = _interopRequireDefault(require("@material-ui/icons/PlayArrow"));

var _Pause = _interopRequireDefault(require("@material-ui/icons/Pause"));

var _Stop = _interopRequireDefault(require("@material-ui/icons/Stop"));

var _FolderOutlined = _interopRequireDefault(require("@material-ui/icons/FolderOutlined"));

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
    },
    textfield: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      backgroundColor: '#ffffff'
    }
  };
});

function SearchHeader() {
  var classes = useStyles();

  var _React$useState = _react["default"].useState(0),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      puase = _React$useState2[0],
      setPuase = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(''),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
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
  return _react["default"].createElement(_Box["default"], {
    style: {
      background: 'linear-gradient( #f1f8e9, #ffffff )',
      height: 74,
      borderTop: '1px solid',
      borderColor: '#c5e1a5',
      borderTopRightRadius: '10px',
      borderTopLeftRadius: '10px'
    }
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    direction: "row",
    justify: "flex-start",
    alignItems: "center",
    spacing: 2,
    style: {
      paddingTop: 15,
      paddingLeft: 20,
      paddingRight: 30,
      height: 74
    }
  }, _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 12,
    sm: 10
  }, _react["default"].createElement(_Grid["default"], {
    container: true,
    spacing: 1,
    alignItems: "flex-end"
  }, _react["default"].createElement(_Grid["default"], {
    item: true
  }, _react["default"].createElement(_FolderOutlined["default"], null)), _react["default"].createElement(_Grid["default"], {
    item: true,
    xs: 11
  }, _react["default"].createElement(_TextField["default"], {
    id: "input-with-icon-grid",
    label: "\uAC80\uC0AC \uACBD\uB85C",
    value: path,
    fullWidth: true
  })))), _react["default"].createElement("div", {
    className: classes.spacer
  }), _react["default"].createElement("div", {
    hidden: puase % 2 === 0 ? false : true
  }, _react["default"].createElement(_Fab["default"], {
    variant: "extended",
    style: {
      backgroundColor: '#e6ee9c',
      color: '#000000'
    },
    "aria-label": "Pause",
    onClick: function onClick() {
      setPuase(1);

      _electron.ipcRenderer.send('PAUSE_SEARCH', true);
    }
  }, _react["default"].createElement(_Pause["default"], null))), _react["default"].createElement("div", {
    hidden: puase % 2 === 1 ? false : true
  }, _react["default"].createElement(_Fab["default"], {
    variant: "extended",
    style: {
      backgroundColor: '#e6ee9c',
      color: '#000000'
    },
    "aria-label": "Restart",
    onClick: function onClick() {
      setPuase(0);

      _electron.ipcRenderer.send('RESTART_SEARCH', true);
    }
  }, _react["default"].createElement(_PlayArrow["default"], null))), _react["default"].createElement("div", {
    style: {
      width: 14
    }
  }), _react["default"].createElement(_Fab["default"], {
    variant: "extended",
    style: {
      backgroundColor: '#e6ee9c',
      color: '#000000'
    },
    "aria-label": "Stop",
    component: _reactRouterDom.Link,
    to: "/result",
    onClick: function onClick() {
      _electron.ipcRenderer.send('STOP_SEARCH', true);
    }
  }, _react["default"].createElement(_Stop["default"], null))));
}