/* globals __dirname */
const path = require('path');
const fs = require('fs');

const init = (database) => {
    const data = {};

    fs.readdirSync(__dirname)
        .filter((f) => f.includes('.data'))
        .forEach((fileName) => {
            const modulePath = path.join(__dirname, fileName);

            const DataClass = require(modulePath);
            const dataClassName =
                DataClass.name[0].toLowerCase() +
                DataClass.name.substring(1, DataClass.name.indexOf('Data'));

            data[dataClassName] = new DataClass(database);
        });

    return Promise.resolve(data);
};

module.exports = init;
