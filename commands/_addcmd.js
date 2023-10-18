const { proto, generateWAMessage, areJidsSameUser } = require("@whiskeysockets/baileys")
const { cmd } = require('../lib')

cmd({
on: "all"
},
async (conn, m, { chatUpdate }) => {
  if (m.isBaileys) return
  if (!m.message) return
  if (!m.msg.fileSha256) return
  if (!(Buffer.from(m.msg.fileSha256).toString('base64') in global.db.data.sticker)) return

  const hash = global.db.data.sticker[Buffer.from(m.msg.fileSha256).toString('base64')]
  const {text, mentionedJid} = hash
  const messages = await generateWAMessage(m.chat, {text: text, mentions: mentionedJid}, {
    userJid: conn.user.id,
    quoted: m.quoted && m.quoted.fakeObj,
  })
  messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
  messages.key.id = m.key.id
  messages.pushName = m.pushName
  if (m.isGroup) messages.participant = m.sender
  const msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append',
  }
  conn.ev.emit('messages.upsert', msg)
})


cmd({
pattern: "addcmd",
alias: ["cmdadd", "setcmd", "cmdset"],
desc: "agrega cmds a stickers",
category: "stickers",
},
async (conn, m, { text }) => {
                if (!m.quoted) m.reply('*❗ Etiqueta un Sticker*')
                if (!m.quoted.fileSha256) m.reply('*❗ Etiqueta un Sticker*')
                if (!text) m.reply('*Que comando vas a añadir?*')
                let sticker = global.db.data.sticker
                let hash = m.quoted.fileSha256.toString('base64'); 
                sticker[hash] = {text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false};
                m.reply('*✅ Hecho*')
})
cmd({
pattern: "delcmd",
desc: "elimina cmds a stickers",
category: "stickers",
},
async (conn, m, { text }) => {
                let hash = m.quoted.fileSha256.toString('base64')
                if (!hash) m.reply('*Este id de sticker no existe*')
                if (global.db.data.sticker[hash] && global.db.data.sticker[_sh].locked) m.reply('*❌ No tienes permiso de eliminar este comando*')      
                delete global.db.data.sticker[hash]
                m.reply('*✅ Hecho*')
})