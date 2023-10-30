// slack-bot.js
const { WebClient } = require('@slack/web-api');

const slackBotToken = 'xoxb-2041212478179-6010157515522-lbUWmpmxKshNWrubHRDnZ9Ae';
const slackChannelId = "C060G14N3UK";
const testChannelId = 'C060HJRHDC7';

const slackClient = new WebClient(slackBotToken);

async function sendSlackAlert(message) {
  try {
    await slackClient.chat.postMessage({
      channel: testChannelId, //slackChannelId,
      text: message,
    });

    console.log(`Slack alert sent successfully: ${message}`);
  } catch (error) {
    console.error(`Error sending Slack alert: ${error.message}`);
  }
}


module.exports = {
  sendSlackAlert,
};
