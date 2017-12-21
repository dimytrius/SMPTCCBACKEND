var request = require('request'),
    username = "59f874e19e93a14edbf55ccd",
    password = "da1d5d3a093ad05f59e7827c26b6a6af",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

request(
    {
        url : "https://backend.sigfox.com/api/devicetypes",
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
        //onsole.log(body);
        //console.log('statusCode:', response && response.statusCode);  
    }
);

request(
    {
        url : 'https://backend.sigfox.com/api/devicetypes/59f86c293c87894c07cf4984/messages?limit=2',
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
        var device = JSON.stringify(body);
        //console.log(data[1]);
       
    
        //console.log('statusCode:', response && response.statusCode);  
    }
);