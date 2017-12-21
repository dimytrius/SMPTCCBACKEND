var axios = require('axios');
var cont;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
setInterval(() =>{
    axios.get('http://automi-api.herokuapp.com/')
        .then((response) =>{
            var lat = response.data.data[0].latitude;
            var lng = response.data.data[0].longitude;
            var status = response.data.data[0].status;
            var date = new Date();
            var minutes = date.getMinutes();
            var pastminutes;
            const msg = {
                to: 'dimy.rocha@gmail.com',
                from: 'dimy.rocha@gmail.com',
                subject: 'Latitude e Longitude',
                text: 'lat'+lat +'long' + lng,
                html: 'lat = '+lat +'long = ' + lng,
            };
            
            console.log(minutes)
            console.log(status)
            
            if(status=='13'){
                //sgMail.send(msg);
                console.log("email") 
                setTimeout(function() {
                    console.log("delay para test")
                }, 300000);
                   
            }
           
            console.log(lat);
            console.log(lng);
        }) 
        .catch((error) =>{
            console.log(error)
        })
            
}, 1200);



