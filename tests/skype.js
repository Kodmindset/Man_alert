const { Builder, By, Key, until } = require('selenium-webdriver');

async function loginAndSendAlert() {
  // Create a new WebDriver instance (you can specify the browser of your choice)
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the Skype login page
    await driver.get('https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=16&ct=1696426078&rver=7.1.6819.0&wp=MBI_SSL&wreply=https%3A%2F%2Flw.skype.com%2Flogin%2Foauth%2Fproxy%3Fclient_id%3D572381%26redirect_uri%3Dhttps%253A%252F%252Fweb.skype.com%252FAuth%252FPostHandler%253FopenPstnPage%253Dtrue%26state%3D7468225a-189d-4804-8e62-5cd5884d83a3&lc=1033&id=293290&mkt=en-US&psi=skype&lw=1&cobrandid=2befc4b5-19e3-46e8-8347-77317a16a5a5&client_flight=ReservedFlight33%2CReservedFlight67');

    // Find the username field and enter your username
    const usernameField = await driver.findElement(By.name('loginfmt'));
    await usernameField.sendKeys('kodemindset@gmail.com', Key.RETURN);

    // Wait for the password field to be visible
    await driver.wait(until.elementLocated(By.name('passwd')), 10000);

    // Find the password field and enter your password
    const passwordField = await driver.findElement(By.name('passwd'));
    await passwordField.sendKeys('Awabil@24', Key.RETURN);

    // Wait for the login process to complete (you can adjust the timeout)
    await driver.wait(until.titleContains('Skype'), 10000);

    // Find the message input field and send your alert message
    const messageInput = await driver.findElement(By.className('input'));

    // Replace 'Your alert message here' with your desired message
    await messageInput.sendKeys('Your alert message here', Key.RETURN);

    console.log('Alert message sent successfully.');

    // You can add more code here to handle other actions or conditions

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the WebDriver session
   //await driver.quit();
  }
}

// Call the loginAndSendAlert function to log in and send the alert
loginAndSendAlert();
