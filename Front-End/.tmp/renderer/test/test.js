"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Test;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _reactDropdownTreeSelect = _interopRequireDefault(require("react-dropdown-tree-select"));

var _powerTree = _interopRequireDefault(require("./powerTree"));

var fs = require('fs');

var path = require('path'); //import TreeCheckbox from 'react-styled-tree-checkbox'


var nodes = [{
  "name": "c:",
  "value": "c:\\",
  "children": [],
  "dir": true,
  "check": false
}];

function directory(ppath) {
  var files = fs.readdirSync(ppath, {
    withFileTypes: true
  });
  console.log(nodes);
  var jsonList = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var tmp = _step.value;
      var tmpPath = path.join(ppath, tmp.name); //let data = fs.statSync(tmpPath);

      try {
        fs.accessSync(tmpPath, fs.R_OK && fs.W_OK);
        var json = {
          "name": tmp.name,
          "value": tmpPath
        };

        if (tmp.isDirectory()) {
          json["dir"] = true;
        }

        jsonList.push(json);
      } catch (exception) {}
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return jsonList;
}

function Test() {
  return _react["default"].createElement(_powerTree["default"], {
    data: nodes,
    onNodeSelect: function onNodeSelect(nodeData) {
      console.log('Select : ', nodeData);
    },
    onNodeExpand: function onNodeExpand(nodeData, operations) {
      console.log('expand');
      var addChildren = operations.addChildren;
      var tmp = directory(nodeData.value);
      var childNodes = (0, _toConsumableArray2["default"])(tmp);
      addChildren(childNodes);
    }
  });
}