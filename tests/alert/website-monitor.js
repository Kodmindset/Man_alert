const https = require('https');
const { sendSlackAlert } = require('./slack-bot');

const websiteUrl_Client = 'client.manduu.work';
const websiteUrl = 'app.manduu.work';

let lastAlertTime = 0;

function checkWebsiteStatus() {
  const options = {
    method: 'GET',
    hostname: websiteUrl,
  };

  const start = Date.now(); // Record the start time before making the request

  const req = https.request(options, (res) => {
    const end = Date.now(); // Record the end time when the response is received
    const responseTime = end - start; // Calculate the response time in milliseconds

    if (responseTime > 1000) {
      const currentTime = Date.now();
      if (currentTime - lastAlertTime > 3600000) {
        let alertMessage = `HTTP Status Code: ${res.statusCode}\nResponse Time: ${responseTime} ms\nHigh Server Load Detected\nMessage sent to Slack at ${new Date(currentTime).toLocaleString()}`;
        console.log(alertMessage);
        sendSlackAlert(alertMessage); // Send a comprehensive alert message to Slack
        lastAlertTime = currentTime;
      }
    }
  });

  req.on('error', (err) => {
    const currentTime = Date.now();
    if (currentTime - lastAlertTime > 3600000) {
      const errorMessage = `Server Status: Offline\nError: ${err.message}`;
      console.error(errorMessage);
      sendSlackAlert(errorMessage); // Send an alert with the error message
      lastAlertTime = currentTime;
    }
  });

  req.end();
}

setInterval(checkWebsiteStatus, 30000); // Check the website status every 30 seconds

module.exports = {
  checkWebsiteStatus,
};
