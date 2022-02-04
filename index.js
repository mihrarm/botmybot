const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`բարև ${ctx.message.from.first_name}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('media', async (ctx)=> {
    try{
        await ctx.replyWithHTML('<b>media</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('music', 'btn_1'), Markup.button.callback('image', 'btn_2'), Markup.button.callback('link', 'btn_3')],
                
            ]
        ))
    } catch(e){
        console.error(e)
    }
   
})

function addActionBot (name, src_audio, text){
bot.action(name, async (ctx) => {
    try {
        await ctx.answerCbQuery()
        if(src_audio !== false){
            await ctx.replyWithAudio({
                source: src_audio
            })
        }
        await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
        })
    } catch (e) {
        console.error(e)
    }
})
}

function addActionBot2 (name, src, text){
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: false
            })
        } catch (e) {
            console.error(e)
        }
    })
    }

addActionBot('btn_1', './audio/the-strokes-ode-to-the-mets.mp3', text.text1)
addActionBot2('btn_2', './img/logo.jpg', text.text2)
addActionBot2('btn_3', false, text.text3)
bot.launch()     
 
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
console.log('STARTED')