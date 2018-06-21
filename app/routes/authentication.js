module.exports = (application) => {
    application.post('/json', (res, req) => {
        application.app.controllers.authentication.auth(application, req, res);
    });
}