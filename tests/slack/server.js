const express = require('express');
const websiteMonitor = require('./website-monitor');
const slackBot = require('./slack-bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Start the website monitoring after the server is running
  websiteMonitor.checkWebsiteStatus();
});

// Periodically check the website status (e.g., every 5 minutes)
const checkInterval = 60 * 1000; // 5 minutes
setInterval(websiteMonitor.checkWebsiteStatus, checkInterval);
