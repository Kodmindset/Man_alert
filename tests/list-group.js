const { WebClient } = require('@slack/web-api');

const slackBotToken = "xoxb-2041212478179-6010157515522-lbUWmpmxKshNWrubHRDnZ9Ae" // Replace with your bot token

const slackClient = new WebClient(slackBotToken);

async function listChannelsAndGroups() {
  try {
    const response = await slackClient.conversations.list();
    const channels = response.channels;

    channels.forEach((channel) => {
      console.log(`Name: ${channel.name}, ID: ${channel.id}`);
    });
  } catch (error) {
    console.error('Error listing channels and groups:', error.message);
  }
}

listChannelsAndGroups();

