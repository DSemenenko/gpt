const TelegramBot = require('node-telegram-bot-api');
const openai = require('openai'); // Import the OpenAI API package
const bot = new TelegramBot('5680266528:AAHIYBoNg13JXq3A_tydrENH6SjzcNHB3HU', { polling: true });

// Initialize the OpenAI API client
openai.apiKey = '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';

// Define a message handler for the '/start' command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello, I am your new Telegram bot!');
});

// Define a message handler for any other messages
bot.on('message', (msg) => {
  // Send the user's message to OpenAI's "davinci" language model for a response
  openai.Completion.create({
    engine: 'davinci',
    prompt: msg.text,
    maxTokens: 150,
    n: 1,
    stop: '\n'
  }).then((response) => {
    // Send the response back to the user
    bot.sendMessage(msg.chat.id, response.choices[0].text);
  }).catch((error) => {
    console.error(error);
  });
});
