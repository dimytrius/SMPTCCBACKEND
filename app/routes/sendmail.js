module.exports = (application) =>{
    application.post('/mail', (req, res) =>{
        application.app.controllers.sendmail.mail(application, req, res);
    });
}