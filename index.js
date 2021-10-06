const TelegramApi = require('node-telegram-bot-api')

const token = '2089243935:AAGwGLybXUJL5i4ONaJp7NnKFnw5B0eqbho'

const bot = new TelegramApi(token, {polling: true})

const calendar = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Понедельник', callback_data: 'asdasd'}],
            [{text: 'Вторник', callback_data: 'asdasd'}],
            [{text: 'Среда', callback_data: 'asdasd'}],
            [{text: 'Четверг', callback_data: 'asdasd'}],
            [{text: 'Пятница', callback_data: 'asdasd'}]
        ]

    })
}

const start = () => {
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Йоу')
            return bot.sendMessage(chatId, 'Расписание:', calendar)
        }
    })
}

start()