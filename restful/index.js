const express = require('express');
const consign = require('consign');
const bodyParser= require('body-parser');
const expressValidator = require('express-validator');
//let routesIndex = require('./routes/index');
//let routesUsers = require('./routes/users');

let app = express();

app.use(bodyParser.urlencoded({extended: false}));
// todos os dados q recebe.. converte em json
app.use(bodyParser.json());
app.use(expressValidator());
 
//app.use(routesIndex);
//app.use('/users', routesUsers);
consign().include('routes').include('utils').into(app);

app.listen(4000, '127.0.0.1', () => {
    console.log('server running');
});