"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _ResponsiveDrawer = _interopRequireDefault(require("./client/ResponsiveDrawer"));

var _reactRouterDom = require("react-router-dom");

var _test = _interopRequireDefault(require("./test/test"));

var App =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(App, _React$Component);

  function App() {
    (0, _classCallCheck2["default"])(this, App);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(App).apply(this, arguments));
  }

  (0, _createClass2["default"])(App, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement(_reactRouterDom.BrowserRouter, null, window.location.pathname.includes('index.html') && _react["default"].createElement(_reactRouterDom.Redirect, {
        to: "/"
      }), _react["default"].createElement(_ResponsiveDrawer["default"], null)));
    }
  }]);
  return App;
}(_react["default"].Component);

(0, _reactDom.render)(_react["default"].createElement(App, null), document.getElementById("root"));