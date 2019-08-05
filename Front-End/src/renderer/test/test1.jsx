import React, {useEffect, useState} from 'react';
import {ipcRenderer} from "electron";

export default function test1(){
    console.log('test1 rendering....');
    const [value,setValue] = useState('');
    useEffect(()=>{
        ipcRenderer.once('TEST2',(e,result)=>{
            console.log('Test : ' ,result);
            setValue(result);
        })
    });
    return(
        <div>
           TEST1 :  {value}
        </div>
    )
};