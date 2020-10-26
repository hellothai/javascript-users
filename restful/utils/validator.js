module.exports = {
    user: (app, req, res) => {
        req.assert('name', 'invalid name').notEmpty();
        req.assert('email', 'invalid email').notEmpty().isEmail();

        let errors = req.validationErrors();
        if (errors) {
            app.utils.error.send(errors, req, res);
            return false;
        } else {
            return true;
        }
 
    }
};