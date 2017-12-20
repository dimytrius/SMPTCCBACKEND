var axios = require('axios');

//var lat = response.data.data[0].latitude

setInterval(() =>{
    axios.get('https://automi-api.herokuapp.com')
        .then((response) =>{
            console.log(response.content)
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





