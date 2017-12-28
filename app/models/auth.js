var fs = require('fs');
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
        var data = a.substring(index1+9,index1+29);
        var devicename = a.substring(15,21);
        var index2 = a.indexOf('time');
        var index3 = a.indexOf('computedLocation');
        var hourcrip = a.substring(index2+7,index2+17);
        var battery = a.substring(index1+31,index1+33);
        var hour = strftime(' %H:%M:%S', unixTime(new Date(hourcrip)));
        var date = strftime('%b %d, %Y', unixTime(new Date(hourcrip)));
        //var lathex =  data.substring(4,12);
        var lathex = 'c1b6df66';
        var lnghex = data.substring(12,20);
        battery = parseInt("0x"+battery);
        battery = battery * 2.44;
        var lat = ~lathex.toString(2);
        
        var lng = 0;
        var latstatus13 = a.substring(index3+28,index3+40);
        var lngstatus13 = a.substring(index3+56,index3+63);
        var status = data.substring(0,4);
        console.log("Device name:" + devicename);
        console.log("Status:" + status);
        console.log("Data:" + data);
        console.log("Hour:" + hour);
        console.log("Date: " + date);
        console.log("Lat:"+ lat);
        console.log("lng:"+ lnghex);
        console.log("battery:"+ battery);
        //console.log(device);
        if (status[0]=='2'&&status[1]=='0'){
            console.log("GPS");
            var obj = {
                data: []
             };
             var json = JSON.stringify(obj);
             fs.writeFile('jsonloads.json', json, 'utf8');
             fs.readFile('jsonloads.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                obj.data.push({date: date, hour: hour,status:status,latitude:lathex,longitude:lnghex,device:devicename,battery:battery}); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('jsonloads.json', json, 'utf8'); // write it back 
            }});
             
        }
        if (status[0]=='1'&&status[1]=='3'){
            console.log("SOS");
            var obj = {
                data: []
             };
             var json = JSON.stringify(obj);
             fs.writeFile('jsonloads.json', json, 'utf8');
             fs.readFile('jsonloads.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                obj.data.push({date: date, hour: hour,status:status,latitude:latstatus13,longitude:lngstatus13,device:devicename,battery:null}); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('jsonloads.json', json, 'utf8'); // write it back 
            }});
             
        }
        if (status[0]=='1'&&status[1]=='1'){
            console.log("ON");
            var obj = {
                data: []
             };
             var json = JSON.stringify(obj);
             fs.writeFile('jsonloads.json', json, 'utf8');
             fs.readFile('jsonloads.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                obj.data.push({date: date, hour: hour,status:status,latitude:latstatus13,longitude:lngstatus13,device:devicename,battery:null}); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('jsonloads.json', json, 'utf8'); // write it back 
            }});
             
        }
        if (status[0]=='1'&&status[1]=='2'){
            console.log("OFF");
            var obj = {
                data: []
             };
             var json = JSON.stringify(obj);
             fs.writeFile('jsonloads.json', json, 'utf8');
             fs.readFile('jsonloads.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                obj.data.push({date: date, hour: hour,status:status,latitude:latstatus13,longitude:lngstatus13,device:devicename,battery:null}); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('jsonloads.json', json, 'utf8'); // write it back 
            }});
             
        }
       
       
    })

}






//get_device_list();

coordenat_data('59f86c293c87894c07cf4984');


