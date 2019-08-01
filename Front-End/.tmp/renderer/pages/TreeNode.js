'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 2px 2px;\n  padding-left: ', 'px;\n\n  &:hover {\n    background: lightgray;\n  }\n'], ['\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 2px 2px;\n  padding-left: ', 'px;\n\n  &:hover {\n    background: lightgray;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  font-size: 12px;\n  margin-right: ', 'px;\n'], ['\n  font-size: 12px;\n  margin-right: ', 'px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fa = require('react-icons/fa');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _last = require('lodash/last');

var _last2 = _interopRequireDefault(_last);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _core = require('@material-ui/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var getPaddingLeft = function getPaddingLeft(level, type) {
  var paddingLeft = level * 20;
  if (type === 'file') paddingLeft += 20;
  return paddingLeft;
};
var StyledTreeNode = _styledComponents2.default.div(_templateObject, function (props) {
  return getPaddingLeft(props.level, props.type);
});

var NodeIcon = _styledComponents2.default.div(_templateObject2, function (props) {
  return props.marginRight ? props.marginRight : 5;
});

var getNodeLabel = function getNodeLabel(node) {
  return (0, _last2.default)(node.path.split('/'));
};

var TreeNode = function TreeNode(props) {
  var node = props.node,
      getChildNodes = props.getChildNodes,
      level = props.level,
      checked = props.checked,
      onToggle = props.onToggle,
      onNodeSelect = props.onNodeSelect,
      onChecked = props.onChecked;
  //console.log(node.checked, '   checked: ', checked);

  return _react2.default.createElement(
    _react2.default.Fragment,
    null,
    _react2.default.createElement(
      StyledTreeNode,
      { level: level, type: node.type },
      _react2.default.createElement(_core.Checkbox, { checked: node.checked || checked, onChange: function onChange() {
          return onChecked(node);
        } }),
      _react2.default.createElement(
        NodeIcon,
        { onClick: function onClick() {
            return onToggle(node);
          } },
        node.type === 'folder' && (node.isOpen ? _react2.default.createElement(_fa.FaChevronDown, null) : _react2.default.createElement(_fa.FaChevronRight, null))
      ),
      _react2.default.createElement(
        NodeIcon,
        { marginRight: 5 },
        node.type === 'file' && _react2.default.createElement(_fa.FaFile, null),
        node.type === 'folder' && node.isOpen === true && _react2.default.createElement(_fa.FaFolderOpen, null),
        node.type === 'folder' && !node.isOpen && _react2.default.createElement(_fa.FaFolder, null)
      ),
      _react2.default.createElement(
        'span',
        { role: 'button', onClick: function onClick() {
            return onNodeSelect(node);
          } },
        getNodeLabel(node)
      )
    ),
    node.isOpen && getChildNodes(node).map(function (childNode) {
      return _react2.default.createElement(TreeNode, _extends({}, props, {
        node: childNode,
        level: level + 1,
        checked: node.checked || checked
      }));
    })
  );
};

TreeNode.propTypes = {
  node: _propTypes2.default.object.isRequired,
  getChildNodes: _propTypes2.default.func.isRequired,
  level: _propTypes2.default.number.isRequired,
  onToggle: _propTypes2.default.func.isRequired,
  onNodeSelect: _propTypes2.default.func.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

exports.default = TreeNode;