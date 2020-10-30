//let express = require('express');
//let routes = express.Router();

module.exports = (app) => {
    //rota /
    app.get('/', (req, res) => {
        res.statusCode = 200;

        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Hello</h1>');
    });
}