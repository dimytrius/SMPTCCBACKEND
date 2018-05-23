var request = require('request');



var headers = {

  'Content-Type': 'application/json'

};



var dataString = require('./input.json'); // Acrescentar o arquivo .json



var options = {

  url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDx-TGi3z__dAF0pUmTFxsPgWCEBPlcaBk',

  method: 'POST',

  headers: headers,

  data: dataString

};





function callback(error, response, body) {

  console.log(body)



}



request(options, callback);