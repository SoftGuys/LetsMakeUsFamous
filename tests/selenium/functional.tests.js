/* eslint-disable */

const { expect } = require('chai');
const { $ } = require('jquery');

const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const url = 'http://localhost';

describe(`Bulgaria's National Tourist Sites Selenium Tests`, () => {
    let driver = null;
    beforeEach(() => {
        driver = setDriver();
        driver.manage().window().maximize();
    });
    afterEach(() => {
        driver.quit();
    });

    test.it('Should see if app is on and homepage is ok', (done) => {
        return driver.get(`${url}/home`)
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
    }); // 1
    test.it('Should register new user successful', (done) => {
        return driver.get(`${url}/users/register`)
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
            .then((givenUrl) => {
                expect(givenUrl).to.contain(`${url}/users/login`.toString());
                done();
            });
    }); // 2
    test.it('Should login as a user[Admin] successful', (done) => {
        return driver.get(`${url}/users/login`)
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
    }); // 3
    test.it('Should have or can upload picture successful', (done) => {
        // eslint-disable-next-line
        driver.executeScript('var s=window.document.createElement(\'script\');\
                  s.src=\'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js\';\
                  window.document.head.appendChild(s);');
        return driver.get(`${url}/users/login`)
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
    }); // 4
    test.it('Destinations page is working', (done) => {
        return driver.get(`${url}/destinations`)
            .then(() => {
                return driver.findElement(
                    webdriver.By.xpath(
                        '//*[@id="destinations-container"]/div[4]/a/h3')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain(
                    `гр. Мелник`);
                done();
            });
    }); // 5
    test.it('Search button to be working for destinations', (done) => {
        return driver.get(`${url}/destinations`)
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('landmarks-search')
                );
            })
            .then((el) => {
                el.sendKeys('гр. Благоевград');
            })
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css(
                        '#search-destination-form > span > button > span')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(3000);
                return driver.findElement(
                    webdriver.By.xpath(
                        '//*[@id="destinations-container"]/div[5]/a/h3')
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
    }); // 6
    test.it('Seach button should work for users', (done) => {
        return driver.get(`${url}/users`)
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
    }); // 7
    test.it('View button should work for user', (done) => {
        return driver.get(`${url}/users`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css(
                        `#users-container > div:nth-child(2) > div >
                         div > div.col-sm-6.col-md-8 > div > a`
                    ));
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
    }); // 8
    test.it('Expect next page to go one page forward', (done) => {
        return driver.get(`${url}/users/ranking`)
            .then(() => {
                driver.sleep(1000);
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
    }); // 9
    test.it('Chat page should load succesful', (done) => {
        return driver.get(`${url}/users/login`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.id('usernamesignup')
                );
            })
            .then((el) => {
                return el.sendKeys('testUser');
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
                const givenUrl = driver.getCurrentUrl();
                driver.get(givenUrl);
                driver.sleep(2000);
            })
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css('#navbarNavDropdown >' +
                        ' ul.nav.navbar-nav.navbar-right > li:nth-child(4) > a')
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
    }); // 10
    test.it('User should be abble to logout', (done) => {
        return driver.get(`${url}/users/login`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.id('usernamesignup')
                );
            })
            .then((el) => {
                return el.sendKeys('testUser');
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
                const givenUrl = driver.getCurrentUrl();
                driver.get(givenUrl);
                driver.sleep(2000);
            })
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css('#navbarNavDropdown >' +
                        ' ul.nav.navbar-nav.navbar-right' +
                        ' > li:nth-child(4) > a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('#profileMenu > li:nth-child(4) > a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css(
                        '#navbarNavDropdown > ul.nav' +
                        '.navbar-nav.navbar-right >' +
                        ' li:nth-child(2) > a'
                    )
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Login');
                done();
            });
    }); // 11
    test.it('Expect Button Readmore to show more information', (done) => {
        let text = null;
        return driver.get(`${url}/destinations/5974ec36a6f1bac1f0cea529`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.xpath(
                        '/html/body/div[2]/div[1]/div/button[1]'
                    )
                );
            })
            .then((el) => {
                text = el.getAttribute('data-content');
                return text;
            })
            .then((upperText) => {
                    expect(upperText).to.contain(
                        `Градският исторически музей`);
                },
                done()
            );
    }); // 12
    test.it('Profile mylandmark should redirect when pressed', (done) => {
        const user = 'testUser';
        return driver.get(`${url}/users/login`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.id('usernamesignup')
                );
            })
            .then((el) => {
                return el.sendKeys(user);
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
                const givenUrl = driver.getCurrentUrl();
                driver.get(givenUrl);
                driver.sleep(2000);
            })
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css('#navbarNavDropdown >' +
                        ' ul.nav.navbar-nav.navbar-right > li:nth-child(4) > a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.xpath('//*[@id="profileMenu"]/li[3]/a')
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(1000);
                return driver.getCurrentUrl();
            })
            .then((newUrl) => {
                expect(newUrl).to.contain(`${url}/users/${user}`);
                done();
            });
    }); // 13

    test.it('About Us', (done) => {
        return driver.get(`${url}`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css(
                        '#aboutli > a'
                    )
                );
            })
            .then((el) => {
                el.click();
                return driver.getCurrentUrl();
            })
            .then((newUrl) => {
                expect(newUrl).to.be.equal(`${url}/about`);
                done();
            });
    });
    test.it('Contact Us', (done) => {
        return driver.get(`${url}`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css(
                        'body > footer > ul > li:nth-child(2) > a'
                    )
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(1000);
                return driver.getCurrentUrl();
            })
            .then((newUrl) => {
                expect(newUrl).to.contain('https://github.com/SoftGuys/LetsMakeUsFamous');
                done();
            });
    });
    test.it('Report Bug', (done) => {
        return driver.get(`${url}`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.css(
                        'body > footer > ul > li:nth-child(3) > a'
                    )
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(1000);
                return driver.getCurrentUrl();
            })
            .then((newUrl) => {
                expect(newUrl).to.be.equal('https://github.com/SoftGuys/LetsMakeUsFamous/issues');
                done();
            });
    });
    test.it('Check Map', (done) => {
        return driver.get(`${url}/destinations/5974ec36a6f1bac1f0cea529`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.id(
                        'googleMapActivate'
                    )
                );
            })
            .then((el) => {
                el.click();
            })
            .then((el) => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.xpath('//*[@id="myModal"]/div/div/div[1]/h4')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.be.contain('гр. Мелник');
                done();
            });
    });
    test.it('Check Comment', (done) => {
        return driver.get(`${url}/destinations/5974ec36a6f1bac1f0cea529`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.xpath(
                        '/html/body/div[2]/div[1]/div/button[2]'
                    )
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.id(
                        'comment-destination'
                    )
                );
            })
            .then((el) => {
                el.sendKeys(generateRandomName());
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.css(
                        '#add-destination-comment > button'
                    )
                );
            })
            .then((el) => {
                el.click();
            })
            .then(() => {
                return driver.findElement(
                    webdriver.By.id('toast-container')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.be.equal('You must be logged in in order to comment!');
                done();
            });
    });
    test.it('Check 404 Error Page', (done) => {
        return driver.get(`${url}/404`)
            .then(() => {
                driver.sleep(1000);
                return driver.findElement(
                    webdriver.By.id(
                        'page-not-found'
                    )
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('Oooops! This page');
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

function maxWindow() {
    window.moveTo(0, 0);
    if (document.all) {
        top.window.resizeTo(screen.availWidth, screen.availHeight);
    } else if (document.layers || document.getElementById) {
        if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
            top.window.outerHeight = screen.availHeight;
            top.window.outerWidth = screen.availWidth;
        }
    }
}
