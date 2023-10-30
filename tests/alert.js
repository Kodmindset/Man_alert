const { By, Key, Builder, until } = require("selenium-webdriver");
const { Options, ServiceBuilder } = require('selenium-webdriver/chrome');
require("chromedriver");

async function checkServerStatus() {
  try {
    // Set the path to Chromedriver
    const chromedriverPath = 'C:/Chromedriver/chromedriver.exe';

    // Create a new driver instance for Chrome
    const chromeOptions = new Options();
    chromeOptions.addArguments("--start-maximized"); // Maximize the browser window

    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .setChromeService(new ServiceBuilder(chromedriverPath))
      .build();

    await driver.get("https://client.manduu.work/login");
    // ... (rest of your server-checking logic) ...

    console.log("Server is up and running!");
    await driver.quit();
  } catch (error) {
    console.error("Server is down!");
  }
}

// Run the checkServerStatus function every minute (60,000 milliseconds)
setInterval(checkServerStatus, 60 * 1000); // 1 minute
