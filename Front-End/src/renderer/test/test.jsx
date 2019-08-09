import React from 'react'
//import TreeCheckbox from 'react-styled-tree-checkbox'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import PowerTree from 'react-power-tree';
const nodes = [{
    "name": "search me",
    "value": "searchme",
    "children": [
        {
            "name": "search me too",
            "value": "searchmetoo",
            "children": [
                {
                    "name": "No one can get me",
                    "value": "anonymous"
                }
            ]
        }
    ]
}]
export default function Test() {
    return (
        <PowerTree
            data={nodes}
            onNodeSelect={(nodeData) => {
                console.log('Select : ' , nodeData);
            }}
            onNodeExpand={(nodeData,operations)=>{
                console.log('expand');
            }}
        />
    )

}