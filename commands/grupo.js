const { cmd } = require('../lib')
require('../settings.js')

cmd({
pattern: "hidetag",
desc: "taguea a todos los usuarios",
category: 'grupos',
}, 
async (conn, m) => {
    if (!m.isGroup) return m.reply(mess.group)
    if (!isGroupAdmins) return m.reply(mess.admin)
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
}, 
async (conn, m, { text, args, isGroupAdmins, isBotAdmins }) => {
if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
})
cmd({
pattern: "demote",
alias: ["quitaradmin", "quitarpoder"],
desc: "promueve a un usuario",
use: "@tag",
category: 'grupos',
}, 
async (conn, m, { text, args, isGroupAdmins, isBotAdmins }) => {
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'demote')
})
cmd({
pattern: "kick",
desc: "elimina a un usuario",
use: "@tag",
category: 'grupos',
}, 
async (conn, m, { text, args, isGroupAdmins, isBotAdmins }) => {
if (global.db.data.chats[m.chat].restrict) m.reply(mess.restrict)
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    conn.groupParticipantsUpdate(m.chat, [users], 'remove');  
})

  
  
  
  let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })