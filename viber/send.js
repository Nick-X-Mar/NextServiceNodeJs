const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

// Initialize the Viber Bot with your credentials
const bot = new ViberBot({
  authToken: 'YOUR_AUTH_TOKEN',
  name: 'Your Bot Name',
  avatar: 'https://example.com/avatar.jpg' // URL to your bot's avatar image
});

// Set up event listeners for incoming events
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // Handle incoming messages
});

bot.on(BotEvents.CONVERSATION_STARTED, (userProfile, isSubscribed, context, onFinish) => {
  // Handle conversation started event
});

// Make a Viber call
bot.sendMessage({
  receiver: 'RECIPIENT_VIBER_NUMBER',
  type: 'text',
  text: 'Hello, this is a Viber call!' // Text to be sent during the call
}).then(() => {
  console.log('Viber call sent successfully!');
}).catch((error) => {
  console.error('Failed to send Viber call:', error);
});
