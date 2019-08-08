"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactHierarchyTreeGraph = _interopRequireDefault(require("react-hierarchy-tree-graph"));

var myTreeData = [{
  name: 'Top Level',
  attributes: {
    keyA: 'val A',
    keyB: 'val B',
    keyC: 'val C'
  },
  children: [{
    name: 'Level 2: A',
    attributes: {
      keyA: 'val A',
      keyB: 'val B',
      keyC: 'val C'
    }
  }, {
    name: 'Level 2: B'
  }]
}];

var MyComponent =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MyComponent, _React$Component);

  function MyComponent() {
    (0, _classCallCheck2["default"])(this, MyComponent);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MyComponent).apply(this, arguments));
  }

  (0, _createClass2["default"])(MyComponent, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        id: "treeWrapper",
        style: {
          width: '50em',
          height: '20em'
        }
      }, _react["default"].createElement(_reactHierarchyTreeGraph["default"], {
        data: myTreeData
      }));
    }
  }]);
  return MyComponent;
}(_react["default"].Component);

exports["default"] = MyComponent;