"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = App;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _CssBaseline = _interopRequireDefault(require("@material-ui/core/CssBaseline"));

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _Hidden = _interopRequireDefault(require("@material-ui/core/Hidden"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));

var _Update = _interopRequireDefault(require("@material-ui/icons/Update"));

var _Home = _interopRequireDefault(require("@material-ui/icons/Home"));

var _Search = _interopRequireDefault(require("@material-ui/icons/Search"));

var _Assignment = _interopRequireDefault(require("@material-ui/icons/Assignment"));

var _Settings = _interopRequireDefault(require("@material-ui/icons/Settings"));

var _Mail = _interopRequireDefault(require("@material-ui/icons/Mail"));

var _Home2 = _interopRequireDefault(require("../../renderer/pages/Home"));

var _Search2 = _interopRequireDefault(require("../pages/Search"));

var _Setting = _interopRequireDefault(require("../../renderer/pages/Setting"));

var _QnAMail = _interopRequireDefault(require("../../renderer/pages/QnAMail"));

var _Result = _interopRequireDefault(require("../../renderer/pages/Result"));

var _downloadFile = _interopRequireDefault(require("../../main/FrameTest/downloadFile"));

var drawerWidth = 60;
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      display: 'flex'
    },
    drawer: (0, _defineProperty2["default"])({}, theme.breakpoints.up('sm'), {
      width: drawerWidth,
      flexShrink: 0
    }),
    appBar: (0, _defineProperty2["default"])({
      marginLeft: drawerWidth,
      backgroundColor: '#aed581'
    }, theme.breakpoints.up('sm'), {
      width: "calc(100% - ".concat(drawerWidth, "px)")
    }),
    appBarbottom: {
      height: 10,
      top: 'auto',
      bottom: 0,
      backgroundColor: '#bdbdbd'
    },
    menuButton: (0, _defineProperty2["default"])({
      marginRight: theme.spacing(2)
    }, theme.breakpoints.up('sm'), {
      display: 'none'
    }),
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      backgroundColor: '#7cb342',
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: '100%'
    },
    footer: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    active: {
      background: '#f5f5f5'
    }
  };
});

function App(props) {
  var container = props.container;
  var classes = useStyles();
  var theme = (0, _styles.useTheme)();

  var _React$useState = _react["default"].useState(false),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      mobileOpen = _React$useState2[0],
      setMobileOpen = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(false),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      updateActive = _React$useState4[0],
      setUpdateActive = _React$useState4[1];

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  } // 위에 툴바


  var drawerToolbar = _react["default"].createElement(_Toolbar["default"], null, _react["default"].createElement(_Grid["default"], {
    container: true,
    direction: "row",
    justify: "space-between",
    alignItems: "center"
  }, _react["default"].createElement(_Grid["default"], null, _react["default"].createElement(_IconButton["default"], {
    color: "inherit",
    "aria-label": "Open drawer",
    edge: "start",
    onClick: handleDrawerToggle,
    className: classes.menuButton
  }, _react["default"].createElement(_Menu["default"], null)), _react["default"].createElement(_Typography["default"], {
    variant: "h6",
    noWrap: true
  }, "HOJE-OCR")))); // 왼쪽 메뉴 부분


  var drawer = _react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: classes.toolbar
  }), _react["default"].createElement(_List["default"], null, _react["default"].createElement(_ListItem["default"], {
    button: true,
    activeClassName: classes.active,
    component: _reactRouterDom.NavLink,
    exact: true,
    to: "/"
  }, _react["default"].createElement(_Tooltip["default"], {
    title: "\uD648",
    placement: "top"
  }, _react["default"].createElement(_Home["default"], null))), _react["default"].createElement(_ListItem["default"], {
    button: true,
    activeClassName: classes.active,
    component: _reactRouterDom.NavLink,
    exact: true,
    to: "/search"
  }, _react["default"].createElement(_Tooltip["default"], {
    title: "\uAC80\uC0AC",
    placement: "top"
  }, _react["default"].createElement(_Search["default"], null))), _react["default"].createElement(_ListItem["default"], {
    button: true,
    activeClassName: classes.active,
    component: _reactRouterDom.NavLink,
    exact: true,
    to: "/result"
  }, _react["default"].createElement(_Tooltip["default"], {
    title: "\uACB0\uACFC",
    placement: "top"
  }, _react["default"].createElement(_Assignment["default"], null))), _react["default"].createElement(_ListItem["default"], {
    button: true,
    activeClassName: classes.active,
    component: _reactRouterDom.NavLink,
    exact: true,
    to: "/setting"
  }, _react["default"].createElement(_Tooltip["default"], {
    title: "\uC124\uC815",
    placement: "top"
  }, _react["default"].createElement(_Settings["default"], null))), _react["default"].createElement(_ListItem["default"], {
    button: true,
    activeClassName: classes.active,
    component: _reactRouterDom.NavLink,
    exact: true,
    to: "/qna"
  }, _react["default"].createElement(_Tooltip["default"], {
    title: "\uBB38\uC758",
    placement: "top"
  }, _react["default"].createElement(_Mail["default"], null))), _react["default"].createElement(_ListItem["default"], {
    button: true,
    activeClassName: classes.active,
    component: _reactRouterDom.NavLink,
    exact: true,
    to: "/test"
  }, _react["default"].createElement(_Mail["default"], null))));

  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(_CssBaseline["default"], null), _react["default"].createElement(_AppBar["default"], {
    position: "fixed",
    className: classes.appBar
  }, drawerToolbar), _react["default"].createElement("nav", {
    className: classes.drawer
  }, _react["default"].createElement(_Hidden["default"], {
    smUp: true,
    implementation: "css"
  }, _react["default"].createElement(_Drawer["default"], {
    container: container,
    variant: "temporary",
    anchor: theme.direction === 'rtl' ? 'right' : 'left',
    open: mobileOpen,
    onClose: handleDrawerToggle,
    classes: {
      paper: classes.drawerPaper
    },
    ModalProps: {
      keepMounted: true // Better open performance on mobile.

    }
  }, drawer)), _react["default"].createElement(_Hidden["default"], {
    xsDown: true,
    implementation: "css"
  }, _react["default"].createElement(_Drawer["default"], {
    classes: {
      paper: classes.drawerPaper
    },
    variant: "permanent",
    open: true
  }, drawer))), _react["default"].createElement("main", {
    className: classes.content
  }, _react["default"].createElement("div", {
    className: classes.toolbar
  }), _react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: _Home2["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/search",
    component: _Search2["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/setting",
    component: _Setting["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/qna",
    component: _QnAMail["default"]
  }), _react["default"].createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/result",
    component: _Result["default"]
  })), _react["default"].createElement(_AppBar["default"], {
    position: "fixed",
    color: "primary",
    className: classes.appBarbottom
  }, _react["default"].createElement(_Toolbar["default"], null)));
}

App.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: _propTypes["default"].object
};