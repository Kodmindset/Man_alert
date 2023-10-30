const { Builder, By, Key } = require("selenium-webdriver");

async function main() {
  // Create a WebDriver instance (you can adjust the browser as needed)
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to the GitHub website
    await driver.get("https://ratings.fide.com/top_lists.phtml");

    // Click the "Sign in" link
   var names = await driver.findElement(By.css(".flag-wrapper"));
   for(let n of names){
    console.log(await n.getText());
   }

   

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the WebDriver session when done
    // await driver.quit();
  }
}

main();
