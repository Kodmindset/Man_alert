const { By, Key, Builder, until } = require("selenium-webdriver");
const { Options, ServiceBuilder } = require('selenium-webdriver/chrome');

require("chromedriver");

async function test_case() {
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

    // Navigate to the login page
    await driver.get("https://client.manduu.work/login");

    // Add an explicit wait for the page to load completely
    await driver.wait(until.urlIs('https://client.manduu.work/login'));

    // Find the username and password fields
    let usernameField = await driver.findElement(By.name("username"));
    let passwordField = await driver.findElement(By.name("password"));

    // Enter the username and password
    await usernameField.sendKeys("kenn@kennpalm.com");
    await passwordField.sendKeys("Test1234");

    // Submit the form (assuming it's a form submission)
    await passwordField.sendKeys(Key.RETURN);

    // Use explicit wait to wait for the pop-up dialog
    let popUp = await driver.wait(until.elementLocated(By.className('swal2-popup')), 10000);

    // Find the "OK" button within the pop-up and click it
    let okButton = await popUp.findElement(By.className('swal2-confirm'));
    await okButton.click();

    // Click on a specific day (e.g., 2023-09-28)
    let dayElement = await driver.wait(
      until.elementLocated(By.xpath("//td[@data-date='2023-10-10']//a[@class='fc-daygrid-day-number']")),
      10000
    );
    await dayElement.click();

    // Explicit wait to allow time for the dropdown to appear
    await driver.sleep(2000);

    // Locate the dropdown element
    let dropdown = await driver.findElement(By.css('select.form-control'));

    // Click on the dropdown using JavaScript
    await driver.executeScript("arguments[0].click();", dropdown);

    // Find the option with the text "3:00 PM (2)" and select it
    let option = await dropdown.findElement(By.xpath("//option[contains(text(), '3:00 PM (2)')]"));
    await option.click();

    // Locate the "Book" button by its text content
    let bookButton = await driver.findElement(By.xpath("//button[contains(text(), 'Book')]"));

    // Wait for the button to be clickable (enabled)
    await driver.wait(until.elementIsEnabled(bookButton), 10000);

    // Click the "Book" button
    await bookButton.click();

    // await driver.quit();
  } catch (error) {
    // Handle any errors or exceptions
    console.error(error);
  }
}

// Call the test_case function
test_case();
