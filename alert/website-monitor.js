const https = require('https');
const { sendEmailAlert } = require('./slack-bot'); // Import the sendEmailAlert function

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
      if (currentTime - lastAlertTime > 3600) {
        let emailSubject = 'Website Alert';
        let emailMessage = `HTTP Status Code: ${res.statusCode}\nResponse Time: ${responseTime} ms\nHigh Server Load Detected\nMessage sent at ${new Date(currentTime).toLocaleString()}`;
        sendEmailAlert(emailSubject, emailMessage); // Send an email alert
        lastAlertTime = currentTime;
      }
    }
  });

  req.on('error', (err) => {
    const currentTime = Date.now();
    if (currentTime - lastAlertTime > 3600) {
      const errorMessage = `Server Status: Offline\nError: ${err.message}`;
      sendEmailAlert('Server Offline Alert', errorMessage); // Send an email alert with the error message
      lastAlertTime = currentTime;
    }
  });

  req.end();
}

setInterval(checkWebsiteStatus, 30000); // Check the website status every 30 seconds

module.exports = {
  checkWebsiteStatus,
};
