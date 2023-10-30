// slack-bot.js
const { WebClient } = require('@slack/web-api');

const slackBotToken = process.env['SLACK_BOT_TOKEN'];
const slackChannelId = process.env['YOUR_SLACK_CHANNEL_ID'];
const testChannelId = ('C060HJRHDC7');

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
