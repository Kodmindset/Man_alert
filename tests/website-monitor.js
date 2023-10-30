const https = require('https');

const websiteUrl = 'client.manduu.work'; // Remove the protocol from the URL

function checkWebsiteStatus() {
  const options = {
    method: 'GET',
    hostname: websiteUrl, // Use only the host here
  };

  const req = https.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log('Website is up and running.');
    } else {
      console.error(`Website is down (HTTP Status Code: ${res.statusCode}).`);
      // Send an alert to your Slack bot here
    }
  });

  req.on('error', (err) => {
    console.error('Error:', err.message);
    // Send an alert to your Slack bot here
  });

  req.end();
}

// Periodically check the website status (e.g., every 5 minutes)
setInterval(checkWebsiteStatus, 60 * 1000); // Adjust the interval as needed
