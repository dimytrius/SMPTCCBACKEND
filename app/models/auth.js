var request = require('request');
var sleep = require('sleep');
var firebase = require('firebase');
var fs = require('fs');
var unixTime = require('unix-time');
var strftime = require('strftime');
var request = require('request-promise');
var Int64 = require('int64-native');
    username = "59f874e19e93a14edbf55ccd",
    password = "da1d5d3a093ad05f59e7827c26b6a6af",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    const config ={
        apiKey: "AIzaSyC46odkupDof1kgyj780MOyiwQJBc5k3lU",
        authDomain: "selftracking-39d34.firebaseapp.com",
        databaseURL: "https://selftracking-39d34.firebaseio.com",
        projectId: "selftracking-39d34",
        storageBucket: "selftracking-39d34.appspot.com",
        messagingSenderId: "671481167610"
      };
    
      firebase.initializeApp(config);
      var device_idstring;
      var device_id;
      var indexdeviceid;


    request(
    {
        url : "https://backend.sigfox.com/api/devicetypes",
        headers : {
            "Authorization" : auth
        }
    },
    function (error, response, body) {
        //console.log(body);
        device_idstring = JSON.stringify(body);
        var indexdeviceid = device_idstring.indexOf('id');
        device_id = device_idstring.substring(indexdeviceid+7,indexdeviceid+31);
        //console.log('statusCode:', response && response.statusCode);  
        console.log(device_id);
    }
  )

  function arredondar(str, casas) {
    //if (str.indexOf('.') != -1) str = str.replace(',', '.');
    if (!casas) casas = 0;
    casas = Math.pow(10, casas);
    str = parseFloat(str) * casas;
    return Math.floor(str) / casas;
}



  function convertfloat(str) {
    var float = 0, sign, order, mantiss,exp,
    int = 0, multi = 1;
    if (/^0x/.exec(str)) {
        int = parseInt(str,16);
    }else{
        for (var i = str.length -1; i >=0; i -= 1) {
            if (str.charCodeAt(i)>255) {
                console.log('Wrong string parametr'); 
                return false;
            }
            int += str.charCodeAt(i) * multi;
            multi *= 256;
        }
    }
    sign = (int>>>31)?-1:1;
    exp = (int >>> 23 & 0xff) - 127;
    mantiss = ((int & 0x7fffff) + 0x800000).toString(2);
    for (i=0; i<mantiss.length; i+=1){
        float += parseInt(mantiss[i])? Math.pow(2,exp):0;
        exp--;
    }
    return float*sign;
}
//(convertfloat(str));


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
        var mac = a.substring(index1+13,index1+27);
        var rssi = mac.substring(12,14);
        rssi = -parseInt(rssi,16);
        mac = mac.substr(0,2)+"."+mac.substring(2,4)+"."+mac.substring(4,6)+"."+mac.substring(6,8)+"."+mac.substring(8,10)+"."+mac.substring(10,12);
        var devicename = a.substring(15,21);
        var index2 = a.indexOf('time');
        var index3 = a.indexOf('computedLocation');
        var hourcrip = a.substring(index2+7,index2+17);
        //var battery = a.substring(index1+31,index1+33);
        //var battery2 = a.substring(index1+29,index1+31);
        var hour = strftime(' %H:%M:%S', unixTime(new Date(hourcrip)));
        var date = strftime('%b %d, %Y', unixTime(new Date(hourcrip)));
        var lathex =  "0x"+data.substring(4,12);
        var lnghex = "0x"+data.substring(12,20);
        var battery = data.substring(22,24);
        console.log(battery);
        console.log(lathex);
        console.log(lnghex);
        
        battery = parseInt('0x'+battery);
        //battery = battery * 2.44;
        //battery2 = battery2 *2.44;
        var lat = 0;
        var lng = 0;
        var latstatus13 = a.substring(index3+28,index3+40);
        var lngstatus13 = a.substring(index3+56,index3+63);
        latstatus13 = parseFloat(latstatus13);
        lngstatus13 = parseFloat(lngstatus13);
        var status = data.substring(0,4);
        if(status[3]=='5'){
            lathex = 0,0;
            lnghex = 0,0;
        }else{
            lathex = convertfloat(lathex);
            lnghex = convertfloat(lnghex);
        }
        
        console.log("Device name:" + devicename);
        console.log("Status:" + status);
        console.log("Data:" + data);
        console.log("Hour:" + hour);
        console.log("Date: " + date);
        
        console.log("battery:"+ battery);
        console.log("Mac:"+mac);
        console.log("rssi:"+ rssi);
        //console.log(device);
        
        
        //firebase
        lathex = arredondar(lathex, 4);
        lnghex = arredondar(lnghex, 4);
        console.log("Lat:"+ lathex);
        console.log("lng:"+ lnghex);
    //GET DATA FROM API PYTHON
    
    var device = firebase.database().ref(devicename);
    const db = firebase.database();
    const deviceRef = firebase.database().ref(devicename);
    const query = deviceRef
                  .orderByChild(devicename)
                  .limitToFirst(2)

                  
if (lathex != 0 || lnghex != 0){
        if (status[0]=='2'&&status[1]=='0'){
            console.log("GPS");
            device.push(
                {
                  device: devicename,
                  latitude: lathex,
                  longitude: lnghex,
                  hour: hour,
                  date: date,
                  status: status,
                  battery:battery
                })
        }
        if (status[0]=='2'&&status[1]=='1'){
            console.log("GPSMOV");
            device.push(
                {
                  device: devicename,
                  latitude: lathex,
                  longitude: lnghex,
                  hour: hour,
                  date: date,
                  status: status,
                  battery:battery
                })
        }
        if (status[0]=='1'&&status[1]=='3'){
            device.push(
                {
                  device: devicename,
                  latitude: lathex,
                  longitude: lnghex,
                  hour: hour,
                  date: date,
                  status: status,
                  battery:battery
                })
        }
        if (status[0]=='1'&&status[1]=='1'){
            console.log("ON");
            device.push(
                {
                  device: devicename,
                  latitude: lathex,
                  longitude: lnghex,
                  hour: hour,
                  date: date,
                  status: status,
                  battery:battery
                })
                
        }
        if (status[0]=='1'&&status[1]=='2'){
            console.log("OFF");
            device.push(
                {
                  device: devicename,
                  latitude: lathex,
                  longitude: lnghex,
                  hour: hour,
                  date: date,
                  status: status,
                  battery:battery
                })
                
        }
        /*if (status[0]=='2'&&status[1]=='0'&& status[2]=='0'&&status[3]=='6'){
            console.log("WIFI");
            
            var obj = {
                wifiAccessPoints: []
             };
             var json = JSON.stringify(obj);
             fs.writeFile('jsonloads.json', json, 'utf8',function(err){
                //console.log("Error renaming file:", err )
            });
             fs.readFile('jsonloads.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                obj.wifiAccessPoints.push({macAdress:mac , signalStrength:rssi,signalToNoiseRatio:0}); //add some data
                fs.writeFile('jsonloads.json', json, 'utf8', function(err){
                    //console.log("Error renaming file:", err )
                });
                }
                });
                //console.log (json); // write it back 
                var headers = {
                    'Content-Type': 'application/json'
                   };
                   
                var dataString = require('./jsonloads.json');
                var options = {
                    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDx-TGi3z__dAF0pUmTFxsPgWCEBPlcaBk',
                    method: 'POST',
                    headers: headers,
                    data: json
                   };
                   
                   function callback(error, response, body) {
                    //console.log(body)
                    localização = JSON.stringify(body);
                    //console.log(localização)
                    var latindex = localização.indexOf('lat');
                    var lat2006 = localização.substring(latindex+6,latindex+16);
                    var lngindex = localização.indexOf('lng');
                    var lng2006 = localização.substring(lngindex+6,lngindex+16);
                    lat2006 = parseFloat(lat2006);
                    lng2006 = parseFloat(lng2006);
                    console.log(lat2006);
                    console.log(lng2006);
                    device.push(
                        {
                          device: devicename,
                          latitude: lat2006,
                          longitude: lng2006,
                          hour: hour,
                          date: date,
                          status: status,
                          battery:battery2
                        })
                   
                   }
                   request(options, callback);
            
          
            
        }*/
       
    }
    
    })


    

}


setInterval( () =>{
coordenat_data(device_id);
}, 10000);

