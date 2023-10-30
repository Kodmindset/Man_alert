const https = require('https');
const { sendSlackAlert } = require('./slack-bot');

const websiteUrl = 'client.manduu.work';

let checkInterval = 60 * 1000; // Initial interval: 1 minute

function checkWebsiteStatus() {
  const options = {
    method: 'GET',
    hostname: websiteUrl,
  };

  const start = Date.now(); // Record the start time before making the request

  const req = https.request(options, (res) => {
    const end = Date.now(); // Record the end time when the response is received
    const responseTime = end - start; // Calculate the response time in milliseconds

    // Send alerts only when the server is down or the response time exceeds 1 second
    if (res.statusCode !== 200 || responseTime > 1000) {
      let alertMessage = `Server Status: ${res.statusCode === 200 ? 'Online' : 'Offline'}`;
      alertMessage += `\nResponse Time: ${responseTime} ms`;

      // You can add more detailed checks here if needed.

      console.log(alertMessage);
      sendSlackAlert(alertMessage); // Send a comprehensive alert message to Slack

      // Reduce the check interval when the server is down
      checkInterval = Math.min(10 * 1000, checkInterval * 2);
    } else {
      // Reset the check interval when the server is up
      checkInterval = 60 * 1000; // 1 minute
    }
  });

  req.on('error', (err) => {
    const errorMessage = `Server Status: Offline\nError: ${err.message}`;
    console.error(errorMessage);
    sendSlackAlert(errorMessage); // Send an alert with the error message

    // Reduce the check interval when the server is down
    checkInterval = Math.min(10 * 1000, checkInterval * 2);
  });

  req.end();

  // Schedule the next check with the updated interval
  setTimeout(checkWebsiteStatus, checkInterval);
}

checkWebsiteStatus();
