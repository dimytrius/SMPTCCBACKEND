var axios = require('axios');
var cont;
var sleep = require('sleep');
var emaildel = 'dimy.rocha@gmail.com'
var email = 'dimy.rocha@gmail.com'
var firebase = require('firebase');
const sgMail = require('@sendgrid/mail');
const config ={
    apiKey: "AIzaSyC46odkupDof1kgyj780MOyiwQJBc5k3lU",
    authDomain: "selftracking-39d34.firebaseapp.com",
    databaseURL: "https://selftracking-39d34.firebaseio.com",
    projectId: "selftracking-39d34",
    storageBucket: "selftracking-39d34.appspot.com",
    messagingSenderId: "671481167610"
  };


firebase.initializeApp(config);
const dataset = firebase.database().ref('devices');
sgMail.setApiKey('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');

setInterval(() => {
    dataset.on('value', (snapshot) => {
      var lat = snapshot.val().latitude;
      var lng = snapshot.val().longitude;
      var status = snapshot.val().status;
      const msg = {
        to: emaildel,
        from: email,
        subject: 'Latitude e Longitude',
        text: 'lat'+lat +'long' + lng,
        html: 'lat = '+lat +'long = ' + lng,
        };
      console.log(status);
      if(status=='1303'){
        sgMail.send(msg);
        console.log("email") 
        sleep.msleep(300000);
        console.log("delay");
        
           
    }
    console.log(lat);
    console.log(lng);
    })
   }, 1000)