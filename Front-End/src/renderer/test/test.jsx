import React from 'react'
const fs = require('fs');
const path = require('path');
//import TreeCheckbox from 'react-styled-tree-checkbox'
import DropdownTreeSelect from 'react-dropdown-tree-select'

import PowerTree from './powerTree';
const nodes = [{
    "name": "c:",
    "value": "c:\\",
    "children":[],
    "dir" : true,
    "check" : false
}];

function directory (ppath){
    let files = fs.readdirSync(ppath,{withFileTypes: true});
    console.log(nodes);
    let jsonList = [];
    for(const tmp of files){
        let tmpPath = path.join(ppath,tmp.name);
        //let data = fs.statSync(tmpPath);
        try {
            fs.accessSync(tmpPath, (fs.R_OK && fs.W_OK));
            let json = {
                "name": tmp.name,
                "value": tmpPath,
            };
            if (tmp.isDirectory()) {
                json["dir"] = true
            }
            jsonList.push(json);
        }catch(exception){
        }
    }
    return jsonList;
}
export default function Test() {
    return (
        <PowerTree
            data={nodes}
            onNodeSelect={(nodeData) => {
                console.log('Select : ' , nodeData);
            }}
            onNodeExpand={(nodeData,operations)=>{
                console.log('expand');
                const {addChildren} = operations;
                let tmp = directory(nodeData.value);
                const childNodes = [...tmp];
                addChildren(childNodes);
            }}
        />
    )
}