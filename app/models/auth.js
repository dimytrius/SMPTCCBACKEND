var request = require('request');
var sleep = require('sleep');
var firebase = require('firebase');
var fs = require('fs');
var unixTime = require('unix-time');
const geolocation = require ('google-geolocation') ({
    key: 'AIzaSyB7dhi_XOHuYK5nq0NSkUxfgTqwIU2VIt4'
  });
  
var strftime = require('strftime');
var request = require('request-promise');
var Int64 = require('int64-native');
    username = "59f874e19e93a14edbf55ccd",
    password = "da1d5d3a093ad05f59e7827c26b6a6af",
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

    var config = {
        apiKey: "AIzaSyAHskLOIS27lJQWbnwEAd2xOCmJrr3bTKE",
        authDomain: "tccfirebase-84cb9.firebaseapp.com",
        databaseURL: "https://tccfirebase-84cb9.firebaseio.com",
        projectId: "tccfirebase-84cb9",
        storageBucket: "tccfirebase-84cb9.appspot.com",
        messagingSenderId: "795670737989"
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

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
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

function hexToInt(hex) {
    if (hex.length % 2 != 0) {
        hex = "0" + hex;
    }
    var num = parseInt(hex, 16);
    var maxVal = Math.pow(2, hex.length / 2 * 8);
    
    if (num > maxVal / 2 - 1) {
        num = num - maxVal
        
    }
    return num;
    
    
}

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
        var temperaturatcc = data.substring(18,20);
        temperaturatcc = (parseInt('0x'+temperaturatcc))/2;
        temperaturatcc = temperaturatcc+"°C";
        var bateriatcc = data.substring(22,24);
        

        var x = data.substring(4,8);
        var y = data.substring(8,12);
        var z = data.substring(12,16);
        console.log('x,y,z',x,y,z);
        x=hexToInt(x);
        y=hexToInt(y);
        z=hexToInt(z);
        var mac = a.substring(index1+13,index1+27);
        var batterymac = data.substring(index1+30,index1+31);
        var rssi = mac.substring(12,14);
        rssi = -parseInt(rssi,16);
        mac = mac.substr(0,2)+"."+mac.substring(2,4)+"."+mac.substring(4,6)+"."+mac.substring(6,8)+"."+mac.substring(8,10)+"."+mac.substring(10,12);
        var devicename = a.substring(15,21);
        var index2 = a.indexOf('time');
        var index3 = a.indexOf('computedLocation');
        var hourcrip = a.substring(index2+7,index2+17);
        var hour = strftime(' %H:%M:%S', unixTime(new Date(hourcrip)));
        var date = strftime('%F', unixTime(new Date(hourcrip)));
        var lathex =  "0x"+data.substring(4,12);
        var lnghex = "0x"+data.substring(12,20);
        var battery = data.substring(22,24);
        console.log(battery);
        console.log(lathex);
        console.log(lnghex);
        bateriatcc = parseInt('0x'+bateriatcc);
        battery = parseInt('0x'+battery);
        battery = (battery/2);
        battery = battery+"°C";
        var latstatus13 = a.substring(index3+28,index3+40);
        var lngstatus13 = a.substring(index3+56,index3+63);
        latstatus13 = parseFloat(latstatus13);
        lngstatus13 = parseFloat(lngstatus13);
        var status = data.substring(0,4);
        if(status[3]=='3'){
            lathex = 0,0;
            lnghex = 0,0;
            battery = data.substring(4,6);
             
            //console.log ('Aqui'+battery);
            battery = parseInt('0x'+battery);
            battery = (battery/2);
            battery = battery+"°C";
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
        lathex = arredondar(lathex, 6);
        lnghex = arredondar(lnghex, 6);
        console.log("Lat:"+ lathex);
        console.log("lng:"+ lnghex);
        console.log('x,y,z',x,y,z);
        console.log("bateria tcc"+bateriatcc);
        console.log("temperaturatcc "+temperaturatcc);
        
        
        
   
    //firebase
    var device = firebase.database().ref(devicename);
    const db = firebase.database();
    const deviceRef = firebase.database().ref(devicename);
    const query = deviceRef
                  .orderByChild(devicename)
                  .limitToFirst(2)
      
if (status[0]=='2'&&status[1]=='0'){
    if(status[2]=='0'&&status[3]=='8'){
        console.log("Acelerometro");
        device.push(
            {
              device: devicename,
              x: x,
              y: y,
              z: z,
              hour: hour,
              date: date,
              status: status,
              battery:bateriatcc,
              temperature:temperaturatcc,
            })
    }
}


if (lathex != 0 || lnghex != 0){
        if (status[0]=='2'&&status[1]=='0'){
            if(status[2]=='0'&&status[3]=='2'){
            console.log("GPS");
            var contents = fs.readFile("2002/"+devicename+".json");
            fs.readFile("2002/"+devicename+".json" , "utf8", function(err, data){

                if(err){
                  return console.log("Erro ao ler arquivo");
                }
                
                var jsonData = JSON.parse(data); 
                jsonData = JSON.stringify(jsonData);
                console.log(jsonData);
                
              var indexlat = jsonData.indexOf('lat');
              var indexlng = jsonData.indexOf('lng');
              var indexvir = jsonData.indexOf(',');
              var indexchave = jsonData.indexOf('}');
              console.log(indexlat);
              console.log(indexlng);
              console.log(indexvir);
              console.log(indexchave);
              var lat1 = lathex;
              var lat2 = jsonData.substring(indexlat+5,indexvir);
              var lng1 = lnghex;
              var lng2 = jsonData.substring(indexlng+5,indexchave);
            
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);
            if(lat1!=lat2||lng1!=lng2){
                var distancia = distance(lat1,lng1,lat2,lng2,'K');
                distancia = Math.round(distancia * 1000);
                console.log("dista"+distancia);
                console.log(1);
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(distancia>65){
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
                        
                        console.log(2);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);

                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("2002/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            });
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("13/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });  
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("11/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            }); 
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });  
                         
                }else{
                    var obj = {
                        location: [{lat:lathex , lng:lnghex}]
                     };
                     var json = JSON.stringify(obj);
                     
                        fs.writeFile("2002/"+devicename+".json", json, function(err) {
                        if(err) {
                            console.log(err);
                        } 
                        });
                        var obj = {
                            location: [{lat:999 , lng:999}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("13/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            });  
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("12/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("11/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("50/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });   
                     
                    console.log(3);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                }
            }
            
        });    
        }
        }
        if (status[0]=='2'&&status[1]=='1'){
            if(status[2]=='0'&&status[3]=='2'){
            console.log("GPSMOV");
            var contents = fs.readFile("2102/"+devicename+".json");
            fs.readFile("2102/"+devicename+".json" , "utf8", function(err, data){
                
                if(err){
                  return console.log("Erro ao ler arquivo");
                }
                
                var jsonData = JSON.parse(data); 
                jsonData = JSON.stringify(jsonData);
                console.log(jsonData);
                
              var indexlat = jsonData.indexOf('lat');
              var indexlng = jsonData.indexOf('lng');
              var indexvir = jsonData.indexOf(',');
              var indexchave = jsonData.indexOf('}');
              console.log(indexlat);
              console.log(indexlng);
              console.log(indexvir);
              console.log(indexchave);
              var lat1 = lathex;
              var lat2 = jsonData.substring(indexlat+5,indexvir);
              var lng1 = lnghex;
              var lng2 = jsonData.substring(indexlng+5,indexchave);
            
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);
            if(lat1!=lat2||lng1!=lng2){
                var distancia = distance(lat1,lng1,lat2,lng2,'K');
                distancia = Math.round(distancia * 1000);
                console.log("dista"+distancia);
                console.log(1);
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(distancia>65){
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
                        
                        console.log(2);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);

                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            });
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("13/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });  
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("11/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            }); 
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                }); 

                         
                }else{
                    var obj = {
                        location: [{lat:lathex , lng:lnghex}]
                     };
                     var json = JSON.stringify(obj);
                     
                        fs.writeFile("2102/"+devicename+".json", json, function(err) {
                        if(err) {
                            console.log(err);
                        } 
                        }); 
                        var obj = {
                            location: [{lat:999 , lng:999}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("13/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            });  
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("12/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("11/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        }); 
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("50/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            }); 

                     
                    console.log(3);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                }
            }
            
        });
        }
        }
        
        if (status[0]=='1'&&status[1]=='1'){
        
                
            var contents = fs.readFile("11/"+devicename+".json");
                fs.readFile("11/"+devicename+".json" , "utf8", function(err, data){
    
                    if(err){
                      return console.log("Erro ao ler arquivo");
                    }
                    
                    var jsonData = JSON.parse(data); 
                    jsonData = JSON.stringify(jsonData);
                    console.log(jsonData);
                    
                  var indexlat = jsonData.indexOf('lat');
                  var indexlng = jsonData.indexOf('lng');
                  var indexvir = jsonData.indexOf(',');
                  var indexchave = jsonData.indexOf('}');
                  console.log(indexlat);
                  console.log(indexlng);
                  console.log(indexvir);
                  console.log(indexchave);
                  var lat1 = lathex;
                  var lat2 = jsonData.substring(indexlat+5,indexvir);
                  var lng1 = lnghex;
                  var lng2 = jsonData.substring(indexlng+5,indexchave);
                
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(lat1!=lat2||lng1!=lng2){
                    var distancia = distance(lat1,lng1,lat2,lng2,'K');
                    distancia = Math.round(distancia * 1000);
                    console.log("dista"+distancia);
                    console.log(1);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                    if(distancia>65){
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
                            
                            console.log(2);
                            console.log(lat1);
                            console.log(lat2);
                            console.log(lng1);
                            console.log(lng2);
    
                            var obj = {
                                location: [{lat:lathex , lng:lnghex}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("11/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                }); 
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("13/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });  
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("12/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                                                var obj = {
                                                    location: [{lat:999 , lng:999}]
                                                 };
                                                 var json = JSON.stringify(obj);
                                                 
                                                    fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                    if(err) {
                                                        console.log(err);
                                                    } 
                                                    });   
                                        
                             
                    }else{
                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("11/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            }); 
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("13/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });  
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            }); 
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });  
                                    
                         
                        console.log(3);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);
                    }
                }
                
            });               
            }
        
    }
     
    if (status[0]=='1'&&status[1]=='3'){
        
                
        var contents = fs.readFile("13/"+devicename+".json");
            fs.readFile("13/"+devicename+".json" , "utf8", function(err, data){

                if(err){
                  return console.log("Erro ao ler arquivo");
                }
                
                var jsonData = JSON.parse(data); 
                jsonData = JSON.stringify(jsonData);
                console.log(jsonData);
                
              var indexlat = jsonData.indexOf('lat');
              var indexlng = jsonData.indexOf('lng');
              var indexvir = jsonData.indexOf(',');
              var indexchave = jsonData.indexOf('}');
              console.log(indexlat);
              console.log(indexlng);
              console.log(indexvir);
              console.log(indexchave);
              var lat1 = lathex;
              var lat2 = jsonData.substring(indexlat+5,indexvir);
              var lng1 = lnghex;
              var lng2 = jsonData.substring(indexlng+5,indexchave);
            
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);
            if(lat1!=lat2||lng1!=lng2){
                var distancia = distance(lat1,lng1,lat2,lng2,'K');
                distancia = Math.round(distancia * 1000);
                console.log("dista"+distancia);
                console.log(1);
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(distancia>65){
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
                        
                        console.log(2);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);

                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("13/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            }); 
                             
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("11/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                                                var obj = {
                                                    location: [{lat:999 , lng:999}]
                                                 };
                                                 var json = JSON.stringify(obj);
                                                 
                                                    fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                    if(err) {
                                                        console.log(err);
                                                    } 
                                                    });   
                         
                }else{
                    var obj = {
                        location: [{lat:lathex , lng:lnghex}]
                     };
                     var json = JSON.stringify(obj);
                     
                        fs.writeFile("13/"+devicename+".json", json, function(err) {
                        if(err) {
                            console.log(err);
                        } 
                        }); 
                          
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("12/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("11/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });   
                     
                    console.log(3);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                }
            }
            
        });
        }
         
    if (status[0]=='5'&&status[1]=='0'){
        
                
        var contents = fs.readFile("13/"+devicename+".json");
            fs.readFile("50/"+devicename+".json" , "utf8", function(err, data){

                if(err){
                  return console.log("Erro ao ler arquivo");
                }
                
                var jsonData = JSON.parse(data); 
                jsonData = JSON.stringify(jsonData);
                console.log(jsonData);
                
              var indexlat = jsonData.indexOf('lat');
              var indexlng = jsonData.indexOf('lng');
              var indexvir = jsonData.indexOf(',');
              var indexchave = jsonData.indexOf('}');
              console.log(indexlat);
              console.log(indexlng);
              console.log(indexvir);
              console.log(indexchave);
              var lat1 = lathex;
              var lat2 = jsonData.substring(indexlat+5,indexvir);
              var lng1 = lnghex;
              var lng2 = jsonData.substring(indexlng+5,indexchave);
            
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);
            if(lat1!=lat2||lng1!=lng2){
                var distancia = distance(lat1,lng1,lat2,lng2,'K');
                distancia = Math.round(distancia * 1000);
                console.log("dista"+distancia);
                console.log(1);
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(distancia>65){
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
                        
                        console.log(2);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);

                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("50/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            }); 
                             
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("11/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                                                 var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("13/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });  
                         
                }else{
                    var obj = {
                        location: [{lat:lathex , lng:lnghex}]
                     };
                     var json = JSON.stringify(obj);
                     
                        fs.writeFile("50/"+devicename+".json", json, function(err) {
                        if(err) {
                            console.log(err);
                        } 
                        }); 
                          
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("12/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("11/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });  
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("13/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                     
                    console.log(3);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                }
            }
            
        });
        }
    
            
    if (status[0]=='1'&&status[1]=='3'){
        
                
        var contents = fs.readFile("13/"+devicename+".json");
            fs.readFile("13/"+devicename+".json" , "utf8", function(err, data){

                if(err){
                  return console.log("Erro ao ler arquivo");
                }
                
                var jsonData = JSON.parse(data); 
                jsonData = JSON.stringify(jsonData);
                console.log(jsonData);
                
              var indexlat = jsonData.indexOf('lat');
              var indexlng = jsonData.indexOf('lng');
              var indexvir = jsonData.indexOf(',');
              var indexchave = jsonData.indexOf('}');
              console.log(indexlat);
              console.log(indexlng);
              console.log(indexvir);
              console.log(indexchave);
              var lat1 = lathex;
              var lat2 = jsonData.substring(indexlat+5,indexvir);
              var lng1 = lnghex;
              var lng2 = jsonData.substring(indexlng+5,indexchave);
            
            console.log(lat1);
            console.log(lat2);
            console.log(lng1);
            console.log(lng2);
            if(lat1!=lat2||lng1!=lng2){
                var distancia = distance(lat1,lng1,lat2,lng2,'K');
                distancia = Math.round(distancia * 1000);
                console.log("dista"+distancia);
                console.log(1);
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(distancia>65){
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
                        
                        console.log(2);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);

                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("13/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            }); 
                             
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("12/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("11/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                                                var obj = {
                                                    location: [{lat:999 , lng:999}]
                                                 };
                                                 var json = JSON.stringify(obj);
                                                 
                                                    fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                    if(err) {
                                                        console.log(err);
                                                    } 
                                                    });   
                         
                }else{
                    var obj = {
                        location: [{lat:lathex , lng:lnghex}]
                     };
                     var json = JSON.stringify(obj);
                     
                        fs.writeFile("13/"+devicename+".json", json, function(err) {
                        if(err) {
                            console.log(err);
                        } 
                        }); 
                          
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("12/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("11/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });   
                     
                    console.log(3);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                }
            }
            
        });
        }
    
       
       
    
        if (status[0]=='1'&&status[1]=='2'){
        
                
            var contents = fs.readFile("12/"+devicename+".json");
                fs.readFile("12/"+devicename+".json" , "utf8", function(err, data){
    
                    if(err){
                      return console.log("Erro ao ler arquivo");
                    }
                    
                    var jsonData = JSON.parse(data); 
                    jsonData = JSON.stringify(jsonData);
                    console.log(jsonData);
                    
                  var indexlat = jsonData.indexOf('lat');
                  var indexlng = jsonData.indexOf('lng');
                  var indexvir = jsonData.indexOf(',');
                  var indexchave = jsonData.indexOf('}');
                  console.log(indexlat);
                  console.log(indexlng);
                  console.log(indexvir);
                  console.log(indexchave);
                  var lat1 = lathex;
                  var lat2 = jsonData.substring(indexlat+5,indexvir);
                  var lng1 = lnghex;
                  var lng2 = jsonData.substring(indexlng+5,indexchave);
                
                console.log(lat1);
                console.log(lat2);
                console.log(lng1);
                console.log(lng2);
                if(lat1!=lat2||lng1!=lng2){
                    var distancia = distance(lat1,lng1,lat2,lng2,'K');
                    distancia = Math.round(distancia * 1000);
                    console.log("dista"+distancia);
                    console.log(1);
                    console.log(lat1);
                    console.log(lat2);
                    console.log(lng1);
                    console.log(lng2);
                    if(distancia>65){
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
                            
                            console.log(2);
                            console.log(lat1);
                            console.log(lat2);
                            console.log(lng1);
                            console.log(lng2);
    
                            var obj = {
                                location: [{lat:lathex , lng:lnghex}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("12/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                }); 
                                var obj = {
                                    location: [{lat:999 , lng:999}]
                                 };
                                 var json = JSON.stringify(obj);
                                 
                                    fs.writeFile("13/"+devicename+".json", json, function(err) {
                                    if(err) {
                                        console.log(err);
                                    } 
                                    });  
                                   
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("11/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                                                var obj = {
                                                    location: [{lat:999 , lng:999}]
                                                 };
                                                 var json = JSON.stringify(obj);
                                                 
                                                    fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                                    if(err) {
                                                        console.log(err);
                                                    } 
                                                    });
                                                    var obj = {
                                                        location: [{lat:999 , lng:999}]
                                                     };
                                                     var json = JSON.stringify(obj);
                                                     
                                                        fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                        if(err) {
                                                            console.log(err);
                                                        } 
                                                        });   
                             
                    }else{
                        var obj = {
                            location: [{lat:lathex , lng:lnghex}]
                         };
                         var json = JSON.stringify(obj);
                         
                            fs.writeFile("12/"+devicename+".json", json, function(err) {
                            if(err) {
                                console.log(err);
                            } 
                            }); 
                            var obj = {
                                location: [{lat:999 , lng:999}]
                             };
                             var json = JSON.stringify(obj);
                             
                                fs.writeFile("13/"+devicename+".json", json, function(err) {
                                if(err) {
                                    console.log(err);
                                } 
                                });  
                               
                                    var obj = {
                                        location: [{lat:999 , lng:999}]
                                     };
                                     var json = JSON.stringify(obj);
                                     
                                        fs.writeFile("11/"+devicename+".json", json, function(err) {
                                        if(err) {
                                            console.log(err);
                                        } 
                                        });
                                        var obj = {
                                            location: [{lat:999 , lng:999}]
                                         };
                                         var json = JSON.stringify(obj);
                                         
                                            fs.writeFile("2102/"+devicename+".json", json, function(err) {
                                            if(err) {
                                                console.log(err);
                                            } 
                                            });
                                            var obj = {
                                                location: [{lat:999 , lng:999}]
                                             };
                                             var json = JSON.stringify(obj);
                                             
                                                fs.writeFile("2002/"+devicename+".json", json, function(err) {
                                                if(err) {
                                                    console.log(err);
                                                } 
                                                });
                                                var obj = {
                                                    location: [{lat:999 , lng:999}]
                                                 };
                                                 var json = JSON.stringify(obj);
                                                 
                                                    fs.writeFile("50/"+devicename+".json", json, function(err) {
                                                    if(err) {
                                                        console.log(err);
                                                    } 
                                                    });   
                         
                        console.log(3);
                        console.log(lat1);
                        console.log(lat2);
                        console.log(lng1);
                        console.log(lng2);
                    }
                }
                
            });                
            }
    })
}


setInterval( () =>{
coordenat_data(device_id);
//}, 600000);
}, 60000);