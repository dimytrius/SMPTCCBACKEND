/*
Author: Dimytrius Rocha
Version: 0.0.1
Date: 20/12/17
*/

var axios = require('axios');
var cont;
var sleep = require('sleep');

const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

setInterval(() =>{
    axios.get('http://automi-api.herokuapp.com/')
        .then((response) =>{
            var lat = response.data.data[0].latitude;
            var lng = response.data.data[0].longitude;
            var status = response.data.data[0].status;
            const msg = {
                to: 'dimy.rocha@gmail.com',
                from: 'dimy.rocha@gmail.com',
                subject: 'Latitude e Longitude',
                text: 'lat'+lat +'long' + lng,
                html: 'lat = '+lat +'long = ' + lng,
            };
            
            console.log(status)
            
            if(status=='13'){
                sgMail.send(msg);
                console.log("email") 
                sleep.msleep(300000);
                console.log("delay");
                
                   
            }
           
            console.log(lat);
            console.log(lng);
        }) 
        .catch((error) =>{
            console.log(error)
        })
            
}, 1200);



