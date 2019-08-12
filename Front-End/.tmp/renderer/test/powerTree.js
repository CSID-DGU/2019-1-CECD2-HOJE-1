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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _styles = require("@material-ui/core/styles");

var _Collapse = _interopRequireDefault(require("@material-ui/core/Collapse"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ArrowRight = _interopRequireDefault(require("@material-ui/icons/ArrowRight"));

var _ArrowDropDown = _interopRequireDefault(require("@material-ui/icons/ArrowDropDown"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _InsertDriveFileOutlined = _interopRequireDefault(require("@material-ui/icons/InsertDriveFileOutlined"));

var _Folder = _interopRequireDefault(require("@material-ui/icons/Folder"));

var _Popover = _interopRequireDefault(require("@material-ui/core/Popover"));

var _core = require("@material-ui/core");

var styles = function styles(theme) {
  return {
    root: {},
    list: {
      backgroundColor: 'white',
      paddingLeft: 0,
      paddingRight: 0,
      marginBottom: 0,
      marginTop: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
    listItem: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 10
    },
    listItemActive: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 10,
      backgroundColor: '#c0c0c0'
    },
    listItemIcon: {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      width: 30,
      minWidth: 20
    },
    listItemText: {
      marginLeft: 0
    },
    itemText: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      fontWeight: 'bold',
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: -4,
      marginBottom: -4
    },
    contextMenuListItem: {
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
    contextMenuListItemIcon: {
      marginRight: 0,
      paddingRight: 0,
      width: 30,
      minWidth: 20
    },
    contextMenuItemText: {}
  };
};

var statusOption = {
  loading: 'loading',
  expanded: 'expanded',
  failed: 'failed',
  collapsed: 'collapsed'
};

var getPathString = function getPathString(nodeData) {
  var name = nodeData.name,
      parents = nodeData.parents;
  var names = parents.map(function (node) {
    return node.name;
  });
  return [].concat((0, _toConsumableArray2["default"])(names), [name]).join(',');
};

var getCollapseByNode = function getCollapseByNode(nodeData, status) {
  var collapse = !status || status === statusOption.collapsed;

  if (!status && !!nodeData.defaultExpanded) {
    collapse = false;
  }

  return collapse;
};

var recurToGetTree = function recurToGetTree(props, state, targetNode) {
  var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var onExpandFunc = arguments.length > 4 ? arguments[4] : undefined;
  var onSelectFunc = arguments.length > 5 ? arguments[5] : undefined;
  var onRightClickFunc = arguments.length > 6 ? arguments[6] : undefined;
  var classes = props.classes;
  var pathStatusMap = state.pathStatusMap,
      currentPath = state.currentPath;
  var path = getPathString(targetNode);
  var status = pathStatusMap[path];
  var collapse = getCollapseByNode(targetNode, status);
  return _react["default"].createElement("div", null, !!targetNode.children && targetNode.children.length > 0 && _react["default"].createElement(_Collapse["default"], {
    "in": depth === 0 || !collapse,
    unmountOnExit: true
  }, _react["default"].createElement(_List["default"], {
    className: classes.list
  }, targetNode.children.map(function (nodeData0, i) {
    var nodeData = Object.assign({}, nodeData0);
    nodeData['parents'] = [].concat((0, _toConsumableArray2["default"])(targetNode.parents), [targetNode]);
    var path = getPathString(nodeData);
    var name = nodeData.name,
        children = nodeData.children,
        dir = nodeData.dir,
        check = nodeData.check; //let hasChildren = !!children && children.length > 0; //수정

    var hasChildren;
    if (dir) hasChildren = true;
    var status = pathStatusMap[path];
    var collapse = getCollapseByNode(nodeData, status);
    var arrowIcon = !!collapse ? _react["default"].createElement(_ArrowRight["default"], null) : _react["default"].createElement(_ArrowDropDown["default"], null);

    if (!hasChildren) {
      arrowIcon = _react["default"].createElement("span", null);
    }

    var nodeIcon;

    if (!!nodeData.icon) {
      nodeIcon = nodeData.icon;
    } else {
      nodeIcon = hasChildren ? _react["default"].createElement(_Folder["default"], null) : _react["default"].createElement(_InsertDriveFileOutlined["default"], null);
    }

    return _react["default"].createElement("div", {
      key: path + i
    }, _react["default"].createElement(_ListItem["default"], {
      button: true,
      selected: path === currentPath,
      style: {
        paddingLeft: 20 * depth
      },
      className: path === currentPath ? classes.listItemActive : classes.listItem,
      onClick: function onClick() {
        onSelectFunc(nodeData);
      },
      onDoubleClick: function onDoubleClick(event) {
        event.stopPropagation();
        onExpandFunc(nodeData);
      },
      onContextMenu: function onContextMenu(event) {
        onRightClickFunc(event, nodeData);
      }
    }, _react["default"].createElement(_core.Checkbox, {
      onChange: function onChange(event, checked) {
        console.log('length : ', nodeData.parents.length);
        var data = nodeData.parents.pop();
        console.log('checked: ', checked);
        console.log('data check : ', data.check);
      }
    }), _react["default"].createElement(_ListItemIcon["default"], {
      fontSize: "large",
      className: classes.listItemIcon,
      onClick: function onClick(event) {
        event.stopPropagation();
        onExpandFunc(nodeData);
      }
    }, arrowIcon), _react["default"].createElement(_ListItemIcon["default"], {
      className: classes.listItemIcon
    }, nodeIcon), _react["default"].createElement(_ListItemText["default"], {
      className: classes.listItemText,
      primary: _react["default"].createElement(_Typography["default"], {
        variant: "subtitle1",
        className: classes.itemText
      }, name)
    })), hasChildren && recurToGetTree(props, state, nodeData, depth + 1, onExpandFunc, onSelectFunc, onRightClickFunc));
  }))));
};

var PowerTree =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(PowerTree, _React$Component);

  function PowerTree(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PowerTree);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PowerTree).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleToExpandNode", function (nodeData) {
      var pathStatusMap = _this.state.pathStatusMap;
      var pathSelected = getPathString(nodeData);
      var status = pathStatusMap[pathSelected];
      var collapse = getCollapseByNode(nodeData, status);

      if (collapse) {
        pathStatusMap[pathSelected] = statusOption.expanded;

        _this.setState({
          pathStatusMap: pathStatusMap
        });
      } else {
        pathStatusMap[pathSelected] = statusOption.collapsed;

        _this.setState({
          pathStatusMap: pathStatusMap
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleNodeSelect", function (nodeData) {
      var onNodeSelect = _this.props.onNodeSelect;

      if (!!onNodeSelect) {
        nodeData.parents.splice(0, 1);
        onNodeSelect(nodeData);
      }

      var path = getPathString(nodeData);

      _this.setState({
        currentPath: path
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleNodeExpand", function (nodeData) {
      var onNodeExpand = _this.props.onNodeExpand;
      var hasChildren = !!nodeData.children && nodeData.children.length > 0;

      if (hasChildren) {
        _this.toggleToExpandNode(nodeData);
      } else {
        if (!!onNodeExpand) {
          onNodeExpand(nodeData, {
            addChildren: function addChildren(children0) {
              var children = (0, _toConsumableArray2["default"])(children0);
              var hasChildren = !!nodeData.children && nodeData.children.length > 0;

              if (!hasChildren) {
                _this.addChildrenToNode(nodeData, children);

                _this.toggleToExpandNode(nodeData);
              }
            }
          });
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleRightClick", function (event, nodeData) {
      event.preventDefault();
      event.persist();
      var clientX = event.clientX,
          clientY = event.clientY;
      nodeData.parents.splice(0, 1);

      _this.setState({
        contextMenu: {
          open: true,
          clickX: clientX,
          clickY: clientY,
          nodeData: nodeData
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleContextMenuClose", function () {
      _this.setState({
        contextMenu: {
          open: false,
          clickX: 0,
          clickY: 0,
          nodeData: null
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "addChildrenToNode", function (nodeData, children) {
      var rootNode = _this.state.rootNode; // get path array of node

      var _nodeData = nodeData,
          parents = _nodeData.parents;
      var path = [];

      var _loop = function _loop(i) {
        path = [].concat((0, _toConsumableArray2["default"])(path), ['children', parents[i].children.findIndex(function (item) {
          return item.name === parents[i + 1].name;
        })]);
      };

      for (var i = 0; i < parents.length - 1; i++) {
        _loop(i);
      }

      path = [].concat((0, _toConsumableArray2["default"])(path), ['children', parents[parents.length - 1].children.findIndex(function (item) {
        return item.name === nodeData.name;
      })]);
      nodeData['children'] = children;
      nodeData = _lodash["default"].omit(nodeData, ['parents']);

      _lodash["default"].set(rootNode, path, nodeData);

      _this.setState({
        rootNode: rootNode
      });
    });

    var _children = (0, _toConsumableArray2["default"])(_this.props.data);

    _this.state = {
      pathStatusMap: {},
      currentPath: '',
      rootNode: {
        name: 'root',
        parents: [],
        children: _children
      },
      contextMenu: {
        open: false,
        clickX: 0,
        clickY: 0,
        nodeData: null
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(PowerTree, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          options = _this$props.options;
      var _this$state = this.state,
          rootNode = _this$state.rootNode,
          contextMenu = _this$state.contextMenu;
      var tree = recurToGetTree(this.props, this.state, rootNode, 0, this.handleNodeExpand, this.handleNodeSelect, this.handleRightClick);
      return _react["default"].createElement("div", {
        className: classes.root
      }, tree, !!options && !!options.contextMenu && _react["default"].createElement(_Popover["default"], {
        open: contextMenu.open,
        anchorReference: "anchorPosition",
        anchorPosition: {
          left: contextMenu.clickX,
          top: contextMenu.clickY
        },
        onClose: this.handleContextMenuClose
      }, _react["default"].createElement(_List["default"], {
        dense: true
      }, options.contextMenu.items.map(function (item, i) {
        var icon = item.icon,
            label = item.label;
        return _react["default"].createElement(_ListItem["default"], {
          key: i,
          button: true,
          className: classes.contextMenuListItem,
          onClick: function onClick() {
            options.contextMenu.onSelect(label, contextMenu.nodeData);

            _this2.handleContextMenuClose();
          }
        }, !!icon && _react["default"].createElement(_ListItemIcon["default"], {
          className: classes.contextMenuListItemIcon
        }, icon), _react["default"].createElement(_ListItemText["default"], {
          disableTypography: true,
          primary: _react["default"].createElement(_Typography["default"], {
            variant: "subtitle1",
            className: classes.contextMenuItemText
          }, label)
        }));
      }))));
    }
  }]);
  return PowerTree;
}(_react["default"].Component);

PowerTree.propTypes = {
  classes: _propTypes["default"].object.isRequired
};

var _default = (0, _styles.withStyles)(styles)(PowerTree);

exports["default"] = _default;