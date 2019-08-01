import React, {useState, useEffect} from 'react';

const fs = require('fs');
let result = null;
export default function Result() {
    const [,setUpdate] = useState([]);
    const showList = (data) => { //리스트에 있는 값 출력
        if (data !== null) {
            return data.map(element => {
                return (
                    <div>
                        Classification : {element.classification} | DetectList : {element.detectList} | DetectCount
                        : {element.detectCount} | FormLevel : {element.formLevel}
                    </div>
                )
            })
        } else
            return null;
    };
    useEffect(()=>{
        if(fs.exists('resultfile.json',(exists => {
            if(exists){
                result = fs.readFileSync('resultfile.json','utf8');
                result = JSON.parse(result);
            }
            setUpdate();
        })));
    },[]); //렌더링 이후 한번만 수행

    return (
        <div>
            결과 페이지
            {showList(result)}
        </div>
    )
}