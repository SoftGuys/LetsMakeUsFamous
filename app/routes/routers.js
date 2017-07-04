/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachRoutes = (app) => {
    fs.readdirSync(__dirname)
    .filter((file) => file.includes('routes'))
    .forEach((fileName) => {
        console.log(fileName)
        const currentPathFile = path.join(__dirname, fileName);
        require(currentPathFile)(app);
    });
};

module.exports = attachRoutes;
