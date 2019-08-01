'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_React$Component) {
    _inherits(Tree, _React$Component);

    function Tree(props) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        _this.state = {
            nodes: props.data
        };
        _this.getRootNodes = _this.getRootNodes.bind(_this);
        _this.getChildNodes = _this.getChildNodes.bind(_this);
        _this.onToggle = _this.onToggle.bind(_this);
        _this.onNodeSelect = _this.onNodeSelect.bind(_this);
        _this.onChecked = _this.onChecked.bind(_this);
        return _this;
    }

    _createClass(Tree, [{
        key: 'getRootNodes',
        value: function getRootNodes() {
            var nodes = this.state.nodes;

            return (0, _values2.default)(nodes).filter(function (node) {
                return node.isRoot === true;
            });
        }
    }, {
        key: 'getChildNodes',
        value: function getChildNodes(node) {
            var nodes = this.state.nodes;

            if (!node.children) return [];
            return node.children.map(function (path) {
                return nodes[path];
            });
        }
    }, {
        key: 'onToggle',
        value: function onToggle(node) {
            var nodes = this.state.nodes;
            var onToggle = this.props.onToggle;

            nodes[node.path].isOpen = !node.isOpen;
            this.setState({ nodes: nodes });
            onToggle(node);
        }
    }, {
        key: 'onNodeSelect',
        value: function onNodeSelect(node) {
            var onSelect = this.props.onSelect;

            onSelect(node);
        }
    }, {
        key: 'onChecked',
        value: function onChecked(node) {
            var nodes = this.state.nodes;
            var onChecked = this.props.onChecked;

            nodes[node.path].checked = !node.checked;
            this.setState({ nodes: nodes });
            onChecked(node);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var rootNodes = this.getRootNodes();
            return _react2.default.createElement(
                'div',
                null,
                rootNodes.map(function (node) {
                    return _react2.default.createElement(_TreeNode2.default, {
                        node: node,
                        getChildNodes: _this2.getChildNodes,
                        onToggle: _this2.onToggle,
                        onNodeSelect: _this2.onNodeSelect,
                        onChecked: _this2.onChecked
                    });
                })
            );
        }
    }]);

    return Tree;
}(_react2.default.Component);

exports.default = Tree;


Tree.propTypes = {
    onSelect: _propTypes2.default.func.isRequired
};