/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachControllers =
    (dataToAttach, utilsToAttach, folderPath, controllersObject) => {
        fs.readdirSync(folderPath)
            .filter((f) => f.includes('.controller'))
            .forEach((fileName) => {
                const modulePath = path.join(folderPath, fileName);
                const currentController = require(modulePath);

                controllersObject[currentController.name] = currentController(
                    dataToAttach,
                    utilsToAttach);
            });

        return controllersObject;
    };

const getControllers = (data, utils) => {
    const controllers = {};
    const apiControllersPath = path.join(__dirname, 'api.controllers');
    const serverControllersPath = path.join(__dirname, 'server.controllers');

    const paths = [apiControllersPath, serverControllersPath];
    paths.forEach((p) => {
        attachControllers(data, utils, p, controllers);
    });

    return controllers;
};

module.exports = getControllers;
