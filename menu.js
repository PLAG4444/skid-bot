const { cmd } = require('./lib')
const os = require('os')
const moment = require("moment-timezone")
const fs = require("fs")
cmd({
pattern: "menu",
alias: ["help"],
desc: "comandos del bot",
filename: __filename
},
async(conn, m) => {
const { commands } = require('./lib')
if (m.text.split(" ")[0]) {
let arr = []
const cmd = commands.find((cmd) => cmd.pattern === (text.split(" ")[0].toLowerCase()))
if (!cmd) return conn.reply(m.chat, '*❌No hay commandos disponibles*', m)
else arr.push(`⪩ *Comando:* ${cmd.pattern}`)
if (cmd.category) arr.push(`⪩ *Categoría*: ${cmd.category}`)
if (cmd.alias) arr.push(`⪩ *Alias:* ${cmd.alias}`)
if (cmd.desc) arr.push(`⪩ *uso*: ${global.prefix}${cmd.pattern} ${cmd.use}`)
return m.reply(arr.join("\n"))
    } else {
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
if(text.toLowerCase() == category.toLowerCase()){ str = `╭─────❏ *${tiny(category)}* ❏\n` ;      
for (const plugins of cmds[category]) { str += `│ ${fancytext(plugins,1)}\n` ; }
str += `╰━━━━━━━━━━━━━──⊷\n`  ;
break ;
}
else { for (const plugins of cmds[category]) { str += `│ ${fancytext(plugins,1)}\n` ; }
str += `╰━━━━━━━━━━━━━━──⊷\n`  ; 
}}
}
str += `🌟 *Pro tip*: usa ${global.prefix}help para ver el uso de algun commando`
conn.sendMessage(m.chat, {   
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
    })