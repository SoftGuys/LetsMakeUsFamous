const path = require('path');

require('fs')
    .readdirSync(__dirname)
    .filter((fileName) => fileName.includes('.extensions'))
    .forEach((moduleName) => {
        const modulePath = path.join(__dirname, moduleName);
        require(modulePath);
    });
