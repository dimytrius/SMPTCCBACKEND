module.exports = (Application) => {
    application.post('/json', (res, req) => {
        application.app.controllers.sendmail.auth(application, req, res);
    });
}