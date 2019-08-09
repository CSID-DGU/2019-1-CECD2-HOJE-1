"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Test;

var _react = _interopRequireDefault(require("react"));

var _reactDropdownTreeSelect = _interopRequireDefault(require("react-dropdown-tree-select"));

var _reactPowerTree = _interopRequireDefault(require("react-power-tree"));

//import TreeCheckbox from 'react-styled-tree-checkbox'
var nodes = [{
  "name": "search me",
  "value": "searchme",
  "children": [{
    "name": "search me too",
    "value": "searchmetoo",
    "children": [{
      "name": "No one can get me",
      "value": "anonymous"
    }]
  }]
}];

function Test() {
  return _react["default"].createElement(_reactPowerTree["default"], {
    data: nodes,
    onNodeSelect: function onNodeSelect(nodeData) {
      console.log('Select : ', nodeData);
    },
    onNodeExpand: function onNodeExpand(nodeData, operations) {
      console.log('expand');
    }
  });
}