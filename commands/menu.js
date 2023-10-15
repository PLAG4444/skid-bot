const { cmd } = require('../lib')
const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
cmd({
pattern: "menu",
alias: ["help"],
desc: "comandos del bot",
filename: __filename
},
async(conn, m ) => {
const { commands } = require('../lib/commands.js') 

    const cmds = {}
    commands.map(async(command, index) => {
    if (command.dontAddCommandList === false && command.pattern !== undefined) {
    if (!cmds[command.category]) cmds[command.category] = []
    cmds[command.category].push(command.pattern)
    }
    })
    
    const time = moment(moment()).format('HH:mm:ss')
    moment.tz.setDefault('Asia/KOLKATA').locale('id')
    const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
    let str = `╭────《 ` + global.botname + ` 》─────⊷\n`
str += `│ ╭──────────────◆
│ │ usuario: ${await conn.getName(m.sender)}
│ │ creador: Skid
│ │ Plugins: ${commands.length}
│ │ Hora: ${time}
│ │ Fecha: ${date}
│ ╰──────────────◆
╰───────────────⊷\n
`
for (const category in cmds) {
str += `╭────❏ *${category}* ❏\n` ;
if (m.text.toLowerCase() == category.toLowerCase()) {
str = `╭─────❏ *${category}* ❏\n` ;      
for (const plugins of cmds[category]) { 
str += `│ ${plugins}\n` 
}
str += `╰━━━━━━━━━━━━━──⊷\n`  ;
break ;
} else {
for (const plugins of cmds[category]) {
str += `│ ${plugins}\n`
}
str += `╰━━━━━━━━━━━━━━──⊷\n`  ; 
}}

str += `🌟 *Pro tip*: usa ${global.prefix}serbot para convertirte en bot`
await conn.sendMessage(m.chat, {   
    text: str,  
    contextInfo:{  
    forwardingScore: 9999999,  
    isForwarded: true,   
    mentionedJid: [m.sender],  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": true,  
    "title": global.botname,   
    "body": 'made with ♥️',
    "containsAutoReply": true,  
    "mediaType": 1,   
    "thumbnail": global.menu,  
    "mediaUrl": `https://chat.whatsapp.com/JPJ0n2V0uujCRvmJRNM7ZU`,  
    "sourceUrl": `https://chat.whatsapp.com/JPJ0n2V0uujCRvmJRNM7ZU`  
    }
    }  
    }, { quoted: m})
    await conn.sendNyanCat(m.chat, '*ATENCION*\n*durante esta semana se estara mejorando al bot, por lo que habra muchos reinicios*', global.menu3, '[ I N F O ]', 'nueva update!!', m)
    })
    
    