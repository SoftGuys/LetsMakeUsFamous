/* globals __dirname */

const morgan = require('morgan');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const configApp = (app) => {
    app.set('view engine', 'pug');
    //app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/static", express.static(path.join(__dirname,'../../public')));
    app.use('/libs', express.static(path.join(__dirname,'../../node_modules')));
};

module.exports = configApp;
