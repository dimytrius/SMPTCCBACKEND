var axios = require('axios');
var firebase = require('firebase');


const config ={
    apiKey: "AIzaSyC46odkupDof1kgyj780MOyiwQJBc5k3lU",
    authDomain: "selftracking-39d34.firebaseapp.com",
    databaseURL: "https://selftracking-39d34.firebaseio.com",
    projectId: "selftracking-39d34",
    storageBucket: "selftracking-39d34.appspot.com",
    messagingSenderId: "671481167610"
  };

  firebase.initializeApp(config);

//GET DATA FROM API PYTHON

var device = firebase.database().ref('devices');
const db = firebase.database();
const deviceRef = firebase.database().ref('devices');
const query = deviceRef
              .orderByChild('devices')
              .limitToFirst(2)



    /*         
setInterval( () =>{
  axios.get('https://automi-api.herokuapp.com')
    .then(response => {
      var dev = response.data.data[0].device
      var lat = response.data.data[0].latitude
      var lng = response.data.data[0].longitude
      var hora = response.data.data[0].hour
      var data = response.data.data[0].date
      var state = response.data.data[0].status
      console.log(response.data)
      device.set(
        {
          device: dev,
          latitude: lat,
          longitude: lng,
          hour: hora,
          date: data,
          status: state
        }

      )
    })

}, 120000); */