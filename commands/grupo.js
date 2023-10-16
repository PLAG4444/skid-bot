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
    conn.sendTextWithMentions(m.chat, `@${users.split} *ahora es admin*`, m)
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
    conn.sendTextWithMentions(m.chat, `@${users.split} *dejo de ser admin*`, m)
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
async (conn, m, { text, args ) => {
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    conn.groupParticipantsUpdate(m.chat, [users], 'remove')
})

  
  
  
  let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })