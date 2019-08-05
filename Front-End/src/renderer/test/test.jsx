import React, {useEffect, useState} from 'react';
import {render} from 'react-dom';
import Test1 from './test1';
import {ipcRenderer} from 'electron';
import Test2 from './test2';
export default function test(){
    console.log('test rendering....');
    const t = () =>{
        ipcRenderer.send('TEST1','Hello World');
    };
    return(
        <div>
            <button onClick={()=>t()} > 버튼 </button>
            <Test1/>
            <Test2/>
        </div>
    )

}
