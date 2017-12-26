var unixTime = require('unix-time');
var strftime = require('strftime');
var request = require('request-promise');
var Int64 = require('int64-native');
    username = "59f874e19e93a14edbf55ccd",
    password = "da1d5d3a093ad05f59e7827c26b6a6af",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
function get_device_list(){

    request(
    {
        url : "https://backend.sigfox.com/api/devicetypes",
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
        console.log(body);
        console.log('statusCode:', response && response.statusCode);  
    }
);}
function get_message(device_id){

      
      var options = {
          uri: 'https://backend.sigfox.com/api/devicetypes/'+device_id+'/messages?limit=2',
          headers: {
            "Authorization" : auth
          }
      } 
        return request(options).catch(function(erro){

        }); 
    }

function coordenat_data(device_id){
    
    get_message(device_id).then(function(response){
        device = JSON.stringify(response);
        var index = device.indexOf('data');
        var tamanho = device.length;
        var a = device.substring(index+7,tamanho);
        var index1 = a.indexOf('data');
        var data = a.substring(index1+9,index1+33);
        var devicename = a.substring(15,21);
        var index2 = a.indexOf('time');
        var hourcrip = a.substring(index2+7,index2+17);
        var hour = strftime('%B %d, %Y %H:%M:%S', unixTime(new Date(hourcrip)));
        var lathex =  data.substring(4,11);
        var lnghex = data.substring(12,19);
        var lat = 0;
        var lng = 0;
        var status = data.substring(0,4);
        console.log("Device name:" + devicename);
        console.log("Status:" + status);
        console.log("Data:" + data);
        console.log("Hour:" + hour);
        console.log("Lat:"+ lathex);
        console.log("lng:"+ lnghex);
        console.log(device);
       
       
    })

}


//get_device_list();

coordenat_data('59f86c293c87894c07cf4984');

