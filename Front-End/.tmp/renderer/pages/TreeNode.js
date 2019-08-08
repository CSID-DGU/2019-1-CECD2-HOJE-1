"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _fa = require("react-icons/fa");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _last = _interopRequireDefault(require("lodash/last"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 12px;\n  margin-right: ", "px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 2px 2px;\n  padding-left: ", "px;\n\n  &:hover {\n    background: lightgray;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var getPaddingLeft = function getPaddingLeft(level, type) {
  var paddingLeft = level * 20;
  if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};

var StyledTreeNode = _styledComponents["default"].div(_templateObject(), function (props) {
  return getPaddingLeft(props.level, props.type);
});

var NodeIcon = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.marginRight ? props.marginRight : 5;
});

var getNodeLabel = function getNodeLabel(node) {
  return (0, _last["default"])(node.path.split('/'));
};

var TreeNode = function TreeNode(props) {
  var node = props.node,
      getChildNodes = props.getChildNodes,
      level = props.level,
      checked = props.checked,
      onToggle = props.onToggle,
      onNodeSelect = props.onNodeSelect,
      onChecked = props.onChecked; //console.log(node.checked, '   checked: ', checked);

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(StyledTreeNode, {
    level: level,
    type: node.type
  }, _react["default"].createElement(_core.Checkbox, {
    checked: node.checked || checked,
    onChange: function onChange() {
      return onChecked(node);
    }
  }), _react["default"].createElement(NodeIcon, {
    onClick: function onClick() {
      return onToggle(node);
    }
  }, node.type === 'folder' && (node.isOpen ? _react["default"].createElement(_fa.FaChevronDown, null) : _react["default"].createElement(_fa.FaChevronRight, null))), _react["default"].createElement(NodeIcon, {
    marginRight: 5
  }, node.type === 'file' && _react["default"].createElement(_fa.FaFile, null), node.type === 'folder' && node.isOpen === true && _react["default"].createElement(_fa.FaFolderOpen, null), node.type === 'folder' && !node.isOpen && _react["default"].createElement(_fa.FaFolder, null)), _react["default"].createElement("span", {
    role: "button",
    onClick: function onClick() {
      return onNodeSelect(node);
    }
  }, getNodeLabel(node))), node.isOpen && getChildNodes(node).map(function (childNode) {
    return _react["default"].createElement(TreeNode, (0, _extends2["default"])({}, props, {
      node: childNode,
      level: level + 1,
      checked: node.checked || checked
    }));
  }));
};

TreeNode.propTypes = {
  node: _propTypes["default"].object.isRequired,
  getChildNodes: _propTypes["default"].func.isRequired,
  level: _propTypes["default"].number.isRequired,
  onToggle: _propTypes["default"].func.isRequired,
  onNodeSelect: _propTypes["default"].func.isRequired
};
TreeNode.defaultProps = {
  level: 0
};
var _default = TreeNode;
exports["default"] = _default;