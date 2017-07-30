/* globals */
const { expect } = require('chai');

const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');

describe(`Bulgaria's National Tourist Sites Selenium Tests`, () => {
    let driver = null;
    beforeEach(() => {
        driver = setDriver();
    });
    afterEach(() => {
        driver.quit();
    });

    test.it('Should see if app is on and homepage is ok', (done) => {
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
                expect(text).to.contain(`Bulgaria's National Tourist Sites`);
                done();
            });
    });
    test.it('Should register new user successful', (done) => {
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
                expect(url).to.contain('http://localhost:3001/users/login');
                done();
            });
    });
    test.it('Should login as a user successful', (done) => {
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
                expect(text).to.contain(`Admin: freakpazo`);
                done();
            });
    });
    test.it('Should have or can upload picture successful', (done) => {
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
            .then((text) => {
                expect(text).to.contain('vladoshax');
                done();
            });
    });
    test.it('Destinations page is working', (done) => {
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
                expect(text).to.contain(
                    `гр. Мелник - Градски исторически музей
                     (История, етнография)`);
                done();
            });
    });
    test.it('Search button to be working for destinations', (done) => {
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
            .then(() => {
                driver.sleep(3000);
                return driver.findElement(
                    webdriver.By.xpath(
                        '//*[@id="destinations-container"]/div[4]/h3')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text)
                    .to
                    .contain('гр. Благоевград - Регионален исторически музей');
                done();
            });
    });
    test.it('Seach button should work for users', (done) => {
        return driver.get('http://localhost:3001/users')
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('form[id=search-destination-form] input')
                );
            })
            .then((el) => {
                el.sendKeys('rosenpedal');
            })
            .then(() => {
                driver.sleep(3000);
                return driver.findElement(
                    webdriver.By.xpath(
                        '//*[@id="users-container"]/div/div/div/div[2]/h4')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('rosenpedal');
                done();
            });
    });
    test.it('View button should work for user', (done) => {
        return driver.get('http://localhost:3001/users')
            .then(() => {
                return driver.findElement(
                    webdriver.By.xpath(
                        '//*[@id="users-container"]' +
                        '/div[1]/div/div/div[2]/div/a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(3000);
                return driver.findElement(
                    webdriver.By.xpath(
                        '/html/body/div/div[1]/div/div[2]/h2'
                    )
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text + 'Profile Page').to
                    .be.equal('rosenpedalProfile Page');

                done();
            });
    });
    test.it('Expect next page to go one page forward', (done) => {
        return driver.get('http://localhost:3001/users/ranking')
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('' +
                        'body > div > ul > li:nth-child(6) > a')
                );
            })
            .then((el) => {
                el.click();
                driver.sleep(3000);
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css(
                        'body > div > ul > li.active > a'
                    )
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.be.equal('2');
                done();
            });
    });
    test.it('Chat page should load succesful', (done) => {
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
                const url = driver.getCurrentUrl();
                driver.get(url);
                driver.sleep(2000);
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.xpath('/html/body/nav/div/ul[2]/li[4]/a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.xpath('//*[@id="profileMenu"]/li[2]/a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(3000);
                return driver.findElement(
                    webdriver.By.css(
                        'body > div > div:nth-child(1) > h1 > strong')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.be.equal('Messages');
                done();
            });
    });
});


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
