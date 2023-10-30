const { Builder, By, Key } = require("selenium-webdriver");

async function main() {
  // Create a WebDriver instance (you can adjust the browser as needed)
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the GitHub website
    await driver.get("https://github.com");

    // Click the "Sign in" link
    await driver.findElement(By.partialLinkText("Sign in")).click();

    // Wait for the login page to load
    await driver.wait(
      async () => (await driver.getTitle()) === "Sign in to GitHub · GitHub",
      10000 // Adjust the timeout as needed
    );

    // Check if the title is correct
    if (await driver.getTitle() === "Sign in to GitHub · GitHub") {
      console.log("Test #1 success");
    } else {
      console.log("Test #1 failed");
      return;
    }

    // Input username
    const usernameInput = await driver.findElement(By.name("login"));
    await usernameInput.sendKeys("YourGitHubUsername");

    // Input password
    const passwordInput = await driver.findElement(By.name("password"));
    await passwordInput.sendKeys("YourGitHubPassword");

    // Submit the form (press Enter)
    await passwordInput.sendKeys(Key.RETURN);

    // Wait for the next page to load (e.g., user dashboard)
    await driver.wait(
      async () => (await driver.getTitle()) !== "Sign in to GitHub · GitHub",
      10000 // Adjust the timeout as needed
    );

    // Check if the user dashboard is displayed
    if (await driver.getTitle() === "Your GitHub profile") {
      console.log("Test #2 success");
    } else {
      console.log("Test #2 failed");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the WebDriver session when done
    await driver.quit();
  }
}

main();
