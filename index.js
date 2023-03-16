const { Telegraf, Markup } = require('telegraf')
const openai = require('openai');


const TOKEN = '5680266528:AAHIYBoNg13JXq3A_tydrENH6SjzcNHB3HU';
const bot = new Telegraf(TOKEN);

// Set up OpenAI credentials
const OPENAI_API_KEY = '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'
openai.apiKey = OPENAI_API_KEY;

console.log('key', openai)


bot.start((ctx) => {
  ctx.reply('Welcome to my Telegram bot!')
})

bot.help((ctx) => {
  ctx.reply('This is a simple Telegram bot built with Telegraf.')
})

console.log(openai)

bot.on('message', async (ctx) => {
  try {
    // Use OpenAI to generate a response to the user's message
   
    const prompt = ctx.message.text;
    const response = await openai.complete({
      engine: 'code-davinci-002',
      prompt: prompt,
      maxTokens: 100,
      n: 1,
      stop: '\n'
    });
    ctx.reply(response.data[0].text);
    
  } catch (err) {
    console.error(err);
    ctx.reply('Oops, something went wrong. Please try again later.');
  }
});



bot.launch()