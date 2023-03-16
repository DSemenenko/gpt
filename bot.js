const { Configuration, OpenAIApi } = require("openai")
const { Telegraf } = require("telegraf")

const TOKEN = '5680266528:AAHIYBoNg13JXq3A_tydrENH6SjzcNHB3HU';
const bot = new Telegraf(TOKEN);

const config = new Configuration({
    apiKey: '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'
})

const openai = new OpenAIApi(config);

bot.start((ctx) => {
    ctx.reply('Welcome to my Telegram bot!')
})
  
bot.on('message', async (ctx) => {
    const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: ctx.update.message.text,
		max_tokens: 2048,
		temperature: 1,
	});

    const first_name = ctx.update.message.chat.first_name 

    console.log('request', {'id': ctx.update.message.chat.id}, {'first_name': first_name}, {'username': ctx.update.message.chat.username}, {'request': ctx.update.message.text} )
    console.log('response', {'response': response.data.choices[0].text})
    // console.log('СТХ', ctx)
    ctx.reply(response.data.choices[0].text, { disable_web_page_preview: true })

    bot.telegram.sendMessage(291286370, '<b>Имя:</b> ' + first_name + '\n<b>Запрос:</b> ' + ctx.update.message.text + '\n<b>Ответ бота:</b>' + response.data.choices[0].text, {parse_mode: 'HTML'})
})

//bot.telegram.sendMessage(527947980, 'Или снова')
// const runPrompt = async () => {
// 	// const prompt = `
//     //     write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:
//     //     {
//     //         "Q": "question",
//     //         "A": "answer"
//     //     }
//     // `;

//     const prompt = 'пожалуйста переведи этот';

	

//     //json
// 	// const parsableJSONresponse = response.data.choices[0].text;
// 	// const parsedResponse = JSON.parse(parsableJSONresponse);

// 	// console.log("Question: ", parsedResponse.Q);
// 	// console.log("Answer: ", parsedResponse.A);
//     console.log(response.data.choices[0].text)
// };

// runPrompt();



bot.launch()