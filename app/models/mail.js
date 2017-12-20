var axios = require('axios');


setInterval(() =>{
    axios.get('http://automi-api.herokuapp.com/')
        .then((response) =>{
            var lat = response.data.data[0].latitude;
            var lng = response.data.data[0].longitude;
            console.log(lat);
            console.log(lng);

            
        })
        .catch((error) =>{
            console.log(error)
        })
            
}, 1200);

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'dimy.rocha@gmail.com',
//   from: 'dimy.rocha@gmail.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);





