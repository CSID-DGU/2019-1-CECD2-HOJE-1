"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var BorderLinearProgress = (0, _styles.withStyles)({
  root: {
    height: 30,
    backgroundColor: (0, _styles.lighten)('#ff6c5c', 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: '#ff6c5c'
  }
})(_core.LinearProgress);
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%'
    },
    image: {
      padding: theme.spacing(2),
      textAlign: 'center',
      height: 200,
      width: '100%'
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
    alignItems: "center",
    spacing: 1
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 4
  }, _react["default"].createElement(_core.CardMedia, {
    border: 1,
    className: classes.image
  })), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: true,
    textAlign: "center"
  }, _react["default"].createElement("h1", null, "HOJE OCR"), _react["default"].createElement(BorderLinearProgress, null)), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 4
  }, _react["default"].createElement(_core.CardMedia, {
    border: 1,
    className: classes.image
  }))));
}

(0, _reactDom.render)(_react["default"].createElement(Test, null), document.getElementById('root'));