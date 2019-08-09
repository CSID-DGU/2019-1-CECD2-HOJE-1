var request = require('request');
var fs = require('fs');

export default function usingRequestModule(send,fileName,depart){
    const options = {
        method: "POST",
        url : "http://192.168.40.206:8080/singleFileUpload",
        headers:{
            "Authorization" : "test",
            "Content-Type" : "multipart/form-data"
        },
        formData : {
            "mediaFile" : fs.createReadStream(fileName),
            "comment" : send,
            "request_depart" : depart   
        }
    };

    request(options, function(err, body){
        if(err) console.log(err);
        console.log(body);
    });
}
