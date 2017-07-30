/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachSockets = (io, socket, passportSocket, data) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.socket'))
        .forEach((fileName) => {
            const currentPathFile = path.join(__dirname, fileName);
            require(currentPathFile)(io, socket, passportSocket, data);
        });
};

module.exports = attachSockets;
