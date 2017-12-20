var axios = require('axios');
setInterval(() =>{
    axios.get('https://www.automi-api.herokuapp.com')
        .then((result) =>{
            var lat = result.data.data[0].latitude
            var long = result.data.data[0].longitude
            console.log(lat)
            console.log(long)
            
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





