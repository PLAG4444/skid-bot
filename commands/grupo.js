const { cmd } = require('../lib')
require('../settings.js')
const fs = require("fs")
cmd({
pattern: "hidetag",
desc: "taguea a todos los usuarios",
category: 'grupos',
admin: true,
group: true
}, 
async (conn, m, { isGroupAdmins, text, isCreator }) => {
    if (isGroupAdmins && !m.quoted || isCreator && !m.quoted ) {  
      conn.sendMessage(m.chat, { text: text ? text : "", mentions: participants.map((a) => a.id) }, { quoted: m })  
    }
    if (isCreator && m.quoted || isGroupAdmins && m.quoted) return conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) }, { quoted: m }) // Mario is going to steal it
})
cmd({
pattern: "promote",
alias: ["daradmin", "darpoder"],
desc: "promueve a un usuario",
use: "@tag",
category: 'grupos',
admin: true,
botAdmin: true,
group: true,
}, 
async (conn, m, { text, args }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
    conn.sendTextWithMentions(m.chat, `@${users.split("@")[0]} *ahora es admin*`, m)
})
cmd({
pattern: "demote",
alias: ["quitaradmin", "quitarpoder"],
desc: "promueve a un usuario",
use: "@tag",
category: 'grupos',
admin: true,
botAdmin: true,
group: true,
}, 
async (conn, m, { text, args }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'demote')
    conn.sendTextWithMentions(m.chat, `@${users.split("@")[0]} *dejo de ser admin*`, m)
})
cmd({
pattern: "kick",
desc: "elimina a un usuario",
use: "@tag",
category: 'grupos',
restict: true,
admin: true,
botAdmin: true,
group: true,
}, 
async (conn, m, { text, args }) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    conn.groupParticipantsUpdate(m.chat, [users], 'remove')
})
cmd({
pattern: "tagall",
alias: ["mencionar", 'tag'],
desc: "tagea a todos los usarios",
category: "grupos",
admin: true,
group: true,
},
async (conn, m, { text, participants }) => {
    let teks = `✿ ━〔 *🍬 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀  🍬* 〕━ ✿\n\n`;  
    teks += `✿ 𝐒𝐔 𝐀𝐃𝐌𝐈𝐍 𝐋𝐎𝐒 𝐈𝐍𝐕𝐎𝐂𝐀, 𝐑𝐄𝐕𝐈𝐕𝐀𝐍\n\n`;  
    teks += `✿ 𝐌𝐄𝐍𝐒𝐀𝐉𝐄:  ${text ? text : 'no hay mensaje :v'}\n\n`;  
    for (let mem of participants) {  
      teks += `┃@${mem.id.split('@')[0]}\n⁩`;  
    }  
    teks += `┃\n`;  
    teks += `╰━━━━━[ *${botname}* ]━━━━━⬣`;  
    conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });  
})
cmd({
pattern: "setwelcome",
desc: "agrega una bienvenida personalizada",
category: "grupos",
admin: true,
botAdmin: true,
group: true,
},
async (conn, m, { text }) => {
   let chats = global.db.data.chats[m.chat]
   if (!text) throw '*❗ Pon algo para poner una bienvenida*\n*@user* = etiqueta al usuario\n*@subject* = nombre del grupo\n*@desc* = descripción'
   chats.sWelcome = text
   conn.reply(m.chat, '*❗ tu bienvenida fue configurada correctamente*', m)
})
  

cmd({
pattern: "setbye",
desc: "agrega una despedida personalizada",
category: "grupos",
admin: true,
botAdmin: true,
group: true,
},
async (conn, m, { text }) => {
   let chats = global.db.data.chats[m.chat]
   if (!text) throw '*❗ Pon algo para poner una despedida*\n*@user* = etiqueta al usuario'
   chats.sBye = text
   conn.reply(m.chat, '*❗ tu bienvenida fue configurada correctamente*', m)
   
})

  
  let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })