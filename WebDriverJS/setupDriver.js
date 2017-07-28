/* Globals $ */
const webdriver = require('selenium-webdriver');
const describe = require('mocha');

const setupDriver = () => {
    // eslint-disable-next-line
    const browser = new webdriver.Builder()
        .usingServer().withCapabilities({ 'browserName': 'chrome' })
        .build();
};


//    Homepage Test
const getTitleHomePage = () => {
    const driver = setDriver();
    return driver.get('http://localhost:3001/home')
        .then(() => {
            return driver.findElement(
                webdriver.By.css('h1')
            );
        })
        .then((el) => {
            return el.getText();
        })
        .then((text) => {
            console.log(text);
        });
};
// RegisterPage Test
const registerPage = () => {
    const driver = setDriver();
    return driver.get('http://localhost:3001/users/register')
        .then(() => {
            return driver.findElement(
                webdriver.By.id('usernamesignup')
            );
        })
        .then((el) => {
            return el.sendKeys(generateRandomName());
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('emailsignup')
            );
        })
        .then((el) => {
            return el.sendKeys(generateRandomName() + '@abv.bg');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('passwordsignup')
            );
        })
        .then((el) => {
            return el.sendKeys('xaxaxa22');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('passwordsignup_confirm')
            );
        })
        .then((el) => {
            return el.sendKeys('xaxaxa22');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('signUp')
            );
        })
        .then((el) => {
            return el.click();
        })
        .then(() => {
            return driver.getCurrentUrl();
        })
        .then((url) => {
            console.log(url);
        });
};
// LoginPage Test
const loginPageAdmin = () => {
    const driver = setDriver();
    return driver.get('http://localhost:3001/users/login')
        .then(() => {
            return driver.findElement(
                webdriver.By.id('usernamesignup')
            );
        })
        .then((el) => {
            return el.sendKeys('freakpazo');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('passwordsignup')
            );
        })
        .then((el) => {
            return el.sendKeys('xaxa');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('loginToTheSite')
            );
        })
        .then((el) => {
            return el.click();
        })
        .then(() => {
            driver.sleep(3000);
            return driver.findElement(
                webdriver.By.css('li[id=Admin] a '));
        })
        .then((el) => {
            return el.getText();
        })
        .then((text) => {
            console.log(text);
        });
};
// loginPageUser Test
const loginPageUser = () => {
    const driver = setDriver();
    // eslint-disable-next-line
    driver.executeScript('var s=window.document.createElement(\'script\');\
                  s.src=\'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\';\
                  window.document.head.appendChild(s);');
    return driver.get('http://localhost:3001/users/login')
        .then(() => {
            return driver.findElement(
                webdriver.By.id('usernamesignup')
            );
        })
        .then((el) => {
            return el.sendKeys('vladoshax');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('passwordsignup')
            );
        })
        .then((el) => {
            return el.sendKeys('xaxa');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.id('loginToTheSite')
            );
        })
        .then((el) => {
            return el.click();
        })
        .then(() => {
            driver.sleep(1000);
            return driver.findElement(
                webdriver.By.xpath('//*[@id="imgProfile"]')
            );
        })
        .then((el) => {
            return el.getAttribute('data-name');
        })
        .then((el) => {
            console.log(el);
        });
};
// Destinations Test
const destinationsPage = () => {
    const driver = setDriver();
    return driver.get('http://localhost:3001/destinations')
        .then(() => {
            return driver.findElement(
                webdriver.By.xpath(
                    '//*[@id="destinations-container"]/div[3]/h3')
            );
        })
        .then((el) => {
            return el.getText();
        })
        .then((text) => {
            console.log(text);
        });
};
// Search Test
const searchButton = () => {
    const driver = setDriver();
    return driver.get('http://localhost:3001/destinations')
        .then(() => {
            return driver.findElement(
                webdriver.By.css('form[id=search-destination-form] input')
            );
        })
        .then((el) => {
            el.sendKeys('гр. Благоевград');
        })
        .then(() => {
            return driver.findElement(
                webdriver.By.xpath(
                    '//*[@id="search-destination-form"]/button/span')
            );
        })
        .then((el) => {
            el.click();
        })
        .then(()=>{
        driver.sleep(3000);
            return driver.findElement(
                webdriver.By.xpath(
                    '//*[@id="destinations-container"]/div[4]/h3')
            );
        })
        .then((el)=> {
            return el.getText();
        })
        .then((text)=>{
        console.log(text);
        });
};


function setDriver() {
    return new webdriver.Builder()
        .usingServer().withCapabilities({ 'browserName': 'chrome' })
        .build();
}
function generateRandomName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcd' +
        'efghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

console.log(getTitleHomePage()); // test 1
console.log(registerPage()); // test 2
console.log(loginPageAdmin()); // test 3
console.log(loginPageUser()); // test 4
console.log(destinationsPage());// test 5
console.log(searchButton()); // test 6
module.exports = { setupDriver };
