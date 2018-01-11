var axios = require('axios');
var cont;
var sleep = require('sleep');
var emaildel = 'emailautomaticotest@gmail.com'
var email = 'automi@automi.com.br'
var firebase = require('firebase');
const sgMail = require('@sendgrid/mail');

const dataset = firebase.database().ref('devices');
sgMail.setApiKey('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');


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
      
        if(status=='1302'){
            
        console.log("email")
        sgMail.send(msg); 
        sleep.msleep(180000);
        console.log("delay");
    
            }                
    console.log(lat);
    console.log(lng);
    })
   