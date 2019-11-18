var request = require('request');
var tableInfo = require('../../../reg/table');
var tableAttribute = Object.keys(tableInfo["table"][0])

export default function quasiFinding(){
    const options = {
        method: "POST",
        url : "http://localhost:8080/findingQuasi",
        json: true,
        headers:{
            "Authorization" : "test",
            "Content-Type" : "application/json",
        },
        formData : {
            "tableInfo" : JSON.stringify(tableInfo),
            "attribute" : tableAttribute,
        }
    }

    return new Promise((resolve,reject)=>{
        request(options, function(err, body){
            if(err) console.log(err);
            //console.log('body : ', body.body);

            resolve(body.body);
        });
    })
}
