const TelegramApi = require('node-telegram-bot-api')

const token = '2089243935:AAGwGLybXUJL5i4ONaJp7NnKFnw5B0eqbho'

const bot = new TelegramApi(token, {polling: true})

bot.setMyCommands([
    {command: '/start', description: 'Расписание'}
])

const even = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Четная', callback_data: '/even'}],
            [{text: 'Нечетная', callback_data: '/notEven'}],

        ]

    })
}

const calendar = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Понедельник', callback_data: '/monday'}],
            [{text: 'Вторник', callback_data: '/tuesday'}],
            [{text: 'Среда', callback_data: '/wednesday'}],
            [{text: 'Четверг', callback_data: '/thursday'}],
            [{text: 'Пятница', callback_data: '/friday'}],
            [{text: 'Назад', callback_data: '/back'}]
        ]

    })
}
let raspisanie = [[['9:30-11:10 ОПЕРАЦИОННЫЕ СИСТЕМЫ – ПРАКТ., АУД. каф.САПРиУ Разыграев', '11:30-13:10 МОДЕЛИРОВАНИЕ СИСТЕМ — ЛАБОР., ПРАКТ., Холоднов В.А. АУД. каф.', '14:00-15:40 ТЕОРЕТИЧЕСКИЕ ОСНОВЫ ХИМИЧЕСКОЙ ТЕХНОЛОГИИ –ЛЕКЦИЯ, АУД. 206 Черемисина О.А.', '16:00-17:40 УПРАВЛЕНИЕ ПРОЕКТАМИ РАЗРАБОТКИ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ И СИСТЕМНАЯ АНАЛИТИКА ПРИКЛАДНОЙ ОБЛАСТИ -ЛЕКЦИЯ, ПРАКТ, АУД. КАФ. доц. Мамаева Г.А.'],
    ['9:30-11:10 ФИЗИЧЕСКАЯ ПОДГОТОВКА', '11:30-13:10 ТЕОРЕТИЧЕСКИЕ ОСНОВЫ ХИМИЧЕСКОЙ ТЕХНОЛОГИИ - ПРАКТ., Торлопов., АУД. 205', '14:00-15:40 ОФОРМЛЕНИЕ АВТОРСКОЙ ДОКУМЕНТАЦИИ — ЛЕКЦИЯ, проф. Юленец Ю.П., АУД. каф', '16:00-17:40 ОФОРМЛЕНИЕ АВТОРСКОЙ ДОКУМЕНТАЦИИ — ЛЕКЦИЯ, проф. Юленец Ю.П., АУД. каф'],
    ['9:30-11:10 ТЕОРИЯ АВТОМАТИЧЕСКОГО УПРАВЛЕНИЯ –ЛАБОР., АУД. КАФ. АПХП Ремизова О.А.', '11:30-13:10 ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ, СИСТЕМЫ И СЕТИ – ЛЕКЦИЯ, ПРОФ. РУСИНОВ Л.А. АУД. 394', '14:00-15:40 ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ, СИСТЕМЫ И СЕТИ – ПРАКТ., ПРОФ. РУСИНОВ Л.А. АУД. КАФ.', '16:00 - 17:40 ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ, СИСТЕМЫ И СЕТИ – ПРАКТ., ПРОФ. РУСИНОВ Л.А. АУД. КАФ.'],
    ['9:30-11:10 ФИЗИЧЕСКАЯ ПОДГОТОВКА', '11:30-13:10 МОДЕЛИРОВАНИЕ СИСТЕМ — ЛЕКЦИЯ, проф. Холоднов В.А., ауд. каф.', '14:00-15:40 ТЕОРИЯ ВЕРОЯТНОСТЕЙ И МАТЕМАТИЧЕСКАЯ СТАТИСТИКА — ПРАКТ., АУД. каф. Мусаев А.А.', '16:00 - 17:40 '],
    ['9:30-11:10 ПРОЦЕССЫ И АППАРАТЫ В ХИМИЧЕСКОЙ ТЕХНОЛОГИИ — ЛЕКЦИЯ, проф.Марков А.В., АУД. 260', '11:30-13:10 ПРОЦЕССЫ И АППАРАТЫ В ХИМИЧЕСКОЙ ТЕХНОЛОГИИ — ЛАБОР., , АУД. каф. ПРиАПП', '14:00-15:40 ТЕОРИЯ АВТОМАТИЧЕСКОГО УПРАВЛЕНИЯ - ЛЕКЦИЯ, доц. ЧЕРНИКОВА А.В., АУД. 211', '16:00 - 17:40 ТЕОРИЯ АВТОМАТИЧЕСКОГО УПРАВЛЕНИЯ - ЛЕКЦИЯ, доц. ЧЕРНИКОВА А.В., АУД. 211']],

    [['9:30-11:10 ', '11:30-13:10 МОДЕЛИРОВАНИЕ СИСТЕМ — ЛАБОР., ПРАКТ., Холоднов В.А. АУД. каф.', '14:00-15:40 Нечетн. ТЕОРЕТИЧЕСКИЕ ОСНОВЫ ХИМИЧЕСКОЙ ТЕХНОЛОГИИ – ПРАКТ., Торлопов, АУД. 210', '16:00 - 17:40 УПРАВЛЕНИЕ ПРОЕКТАМИ РАЗРАБОТКИ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ И СИСТЕМНАЯ АНАЛИТИКА ПРИКЛАДНОЙ ОБЛАСТИ -ЛЕКЦИЯ, ПРАКТ, АУД. КАФ. доц. Мамаева Г.А.'],
        ['9:30-11:10 ', '11:30-13:10', '14:00-15:40 ', '16:00 - 17:40 '],
        ['9:30-11:10 ПРОЦЕССЫ И АППАРАТЫ В ХИМИЧЕСКОЙ ТЕХНОЛОГИИ — ПРАКТ., АУД. 259', '11:30-13:10 ТЕОРИЯ ВЕРОЯТНОСТЕЙ И МАТЕМАТИЧЕСКАЯ СТАТИСТИКА — ПРАКТ., АУД. каф. Мусаев А.А.', '14:00-15:40 ', '16:00 - 17:40 '],
        ['9:30-11:10 ТЕОРИЯ АВТОМАТИЧЕСКОГО УПРАВЛЕНИЯ –ЛАБОР., АУД. КАФ. АПХП Ремизова О.А.', '11:30-13:10 ФИЗИЧЕСКАЯ ПОДГОТОВКА', '14:00-15:40 ТЕОРИЯ ВЕРОЯТНОСТЕЙ И МАТЕМАТИЧЕСКАЯ СТАТИСТИКА — ПРАКТ., АУД. каф. Мусаев А.А.', '16:00 - 17:40 '],
        ['9:30-11:10 ПРОЦЕССЫ И АППАРАТЫ В ХИМИЧЕСКОЙ ТЕХНОЛОГИИ — ЛЕКЦИЯ, проф.Марков А.В., АУД. 260', '11:30-13:10 ПРОЦЕССЫ И АППАРАТЫ В ХИМИЧЕСКОЙ ТЕХНОЛОГИИ — ЛАБОР., , АУД. каф. ПРиАПП', '14:00-15:40 ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ, СИСТЕМЫ И СЕТИ –ЛАБОР.,АУД.каф. доц. Воробьев Н.В., Гоголь И.В.', '16:00 - 17:40 ВЫЧИСЛИТЕЛЬНЫЕ МАШИНЫ, СИСТЕМЫ И СЕТИ –ЛАБОР.,АУД.каф. доц. Воробьев Н.В., Гоголь И.В.']]]

const start = () => {
    let week = ''
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendMessage(chatId, 'Йоу')
            return bot.sendMessage(chatId, 'Расписание:', even)
        }
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/even' ) {
            week = data
            return bot.sendMessage(chatId, 'День недели:', calendar)
        }
        if (data === '/notEven') {
            week = data
            return bot.sendMessage(chatId, 'День недели:', calendar)
        }

        if (data === '/back') {
            return bot.sendMessage(chatId, 'Расписание:', even)
        }

        if (week === '/even') {
            if (data === '/monday') {
                for (let i = 0; i < raspisanie[0][0].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[0][0][i])
                }
            }

            if (data === '/tuesday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[0][1][i])
                }
            }

            if (data === '/wednesday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[0][2][i])
                }
            }

            if (data === '/thursday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[0][3][i])
                }
            }

            if (data === '/friday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[0][4][i])
                }
            }
        }

        if (week === '/notEven') {
            if (data === '/monday') {
                for (let i = 0; i < raspisanie[0][0].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[1][0][i])
                }
            }

            if (data === '/tuesday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[1][1][i])
                }
            }

            if (data === '/wednesday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[1][2][i])
                }
            }

            if (data === '/thursday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[1][3][i])
                }
            }

            if (data === '/friday') {
                for (let i = 0; i < raspisanie[0][1].length; i++) {
                    await bot.sendMessage(chatId, raspisanie[1][4][i])
                }
            }
        }
    })

}

start()
