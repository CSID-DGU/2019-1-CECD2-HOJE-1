"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var nativeImage = require('electron').nativeImage;

var background = nativeImage.createFromPath('assets/background.png');
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1,
      width: 600,
      height: 300
    },
    background: {
      maxWidth: '100%',
      height: 300,
      backgroundSize: '100% 100%',
      backgroundImage: "url(".concat(background.toDataURL(), ")")
    },
    content: {
      marginLeft: 10,
      fontSize: 65,
      fontWeight: 'bolder',
      color: '#ffffff'
    }
  };
});

function Test() {
  var classes = useStyles();
  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "flex-end",
    spacing: 1,
    className: classes.background
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: true,
    textAlign: "center",
    className: classes.content
  }, "HOJE OCR")));
}

(0, _reactDom.render)(_react["default"].createElement(Test, null), document.getElementById('root'));