const express = require('express');
const websiteMonitor = require('./website-monitor');
const slackBot = require('./slack-bot');

const app = express();
const PORT = process.env.PORT || 3000;

// Periodically check the website status (e.g., every minute)
const checkInterval = 60 * 1000; // 1 minute
setInterval(websiteMonitor.checkWebsiteStatus, checkInterval);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
