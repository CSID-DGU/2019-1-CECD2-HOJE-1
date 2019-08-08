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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _values = _interopRequireDefault(require("lodash/values"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var Tree =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(Tree, _React$Component);

  function Tree(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Tree);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Tree).call(this, props));
    _this.state = {
      nodes: props.data
    };
    _this.getRootNodes = _this.getRootNodes.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getChildNodes = _this.getChildNodes.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onToggle = _this.onToggle.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onNodeSelect = _this.onNodeSelect.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onChecked = _this.onChecked.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(Tree, [{
    key: "getRootNodes",
    value: function getRootNodes() {
      var nodes = this.state.nodes;
      return (0, _values["default"])(nodes).filter(function (node) {
        return node.isRoot === true;
      });
    }
  }, {
    key: "getChildNodes",
    value: function getChildNodes(node) {
      var nodes = this.state.nodes;
      if (!node.children) return [];
      return node.children.map(function (path) {
        return nodes[path];
      });
    }
  }, {
    key: "onToggle",
    value: function onToggle(node) {
      var nodes = this.state.nodes;
      var onToggle = this.props.onToggle;
      nodes[node.path].isOpen = !node.isOpen;
      this.setState({
        nodes: nodes
      });
      onToggle(node);
    }
  }, {
    key: "onNodeSelect",
    value: function onNodeSelect(node) {
      var onSelect = this.props.onSelect;
      onSelect(node);
    }
  }, {
    key: "onChecked",
    value: function onChecked(node) {
      var nodes = this.state.nodes;
      var onChecked = this.props.onChecked;
      nodes[node.path].checked = !node.checked;
      this.setState({
        nodes: nodes
      });
      onChecked(node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var rootNodes = this.getRootNodes();
      return _react["default"].createElement("div", null, rootNodes.map(function (node) {
        return _react["default"].createElement(_TreeNode["default"], {
          node: node,
          getChildNodes: _this2.getChildNodes,
          onToggle: _this2.onToggle,
          onNodeSelect: _this2.onNodeSelect,
          onChecked: _this2.onChecked
        });
      }));
    }
  }]);
  return Tree;
}(_react["default"].Component);

exports["default"] = Tree;
Tree.propTypes = {
  onSelect: _propTypes["default"].func.isRequired
};