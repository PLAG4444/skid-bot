const { cmd } = require('../lib')
const fetch = require('node-fetch')
const { WAMessageStubType } = require("@whiskeysockets/baileys")
require('../settings.js')
const fs = require("fs")
cmd({
pattern: "grupo",
category: "grupos",
admin: true,
group: true,
botAdmin: true,
}, async (conn, m, { args }) => {
if (args[0] === 'abrir') {
    m.reply(`*GRUPO ABIERTO CON EXITO✅*`)
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
    } else if (args[0] === 'cerrar') {
    m.reply(`*GRUPO CERRADO CON EXITO✅*`)
    await conn.groupSettingUpdate(m.chat, 'announcement')
    } else {
    conn.sendPoll(m.chat, '*❗ Elige una opcion*', [`${command.charAt(0).toUpperCase()+command.slice(1)} abrir`,`${command.charAt(0).toUpperCase()+command.slice(1)} cerrar`])
    }
})
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
cmd({
pattern: "del",
category: "grupos",
admin: true,
botAdmin: true,
group: true,
},
async (conn, m) => {
if (!m.quoted) throw `*❗ Etiqueta un mensaje*`
      try { 
     const delet = m.message.extendedTextMessage.contextInfo.participant; 
     const bang = m.message.extendedTextMessage.contextInfo.stanzaId; 
     return conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}}); 
     } catch { 
     m.quoted.delete()
     }
})
cmd({ on: "all" }, async (conn, m, { body, isGroupAdmins, isBotAdmins, mime, quoted }) => {
 if (global.db.data.chats[m.chat].antilink) {
  if (body.match(`chat.whatsapp.com`)) {  
  let delet = m.key.participant  
  let bang = m.key.id  
  m.reply(`*「 ANTI LINK 」*\n\n*LINK DETECTADO*\n*No se permiten links de otros grupos, seras eliminado*`)  
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (isGroupAdmins) return m.reply('*Eres admin asi que no seras eliminado ^w^')
  conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})  
  conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}  
 if (global.db.data.chats[m.chat].autoSticker) {  
 if (/image/.test(mime)) {  
 m.reply(mess.wait) 
 media = await quoted.download()  
 let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
 await fs.unlinkSync(encmedia)  
 } else if (/video/.test(mime)) {  
 if ((quoted.msg || quoted).seconds > 40) return m.reply('¡Máximo 40 segundos!')  
 media = await quoted.download()  
 let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author })  
 await new Promise((resolve) => setTimeout(resolve, 2000));   
 await fs.unlinkSync(encmedia)  
 }}
    if (global.db.data.chats[m.chat].antiFake) {
    if (!isBotAdmins) return m.reply(mess.botAdmin)
    if (m.chat && m.sender.startsWith('1')) {
    await conn.sendNyanCat(m.chat, '*Lo siento extraño...*\n*los números de USA no estan permitidos aqui*', global.uhh, 'lo siento', 'los numeros de USA no se permiten aqui')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }}    
    if (global.db.data.chats[m.chat].antiArabe) {
    if (!isBotAdmins) return m.reply(mess.botAdmin)
    if (m.chat && m.sender.startsWith('212')) {
    await conn.sendNyanCat(m.chat, '*Lo siento extraño...*\n*los números arebes no estan permitidos aqui*', global.uhh, 'lo siento', 'los numeros arabes no se permiten aqui')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }}
})
cmd({ on: "all" }, async (conn, m, { participants }) => {
  if (!m.messageStubType || !m.isGroup) return !0; 
   const groupName = (await conn.groupMetadata(m.chat)).subject; 
   const groupAdmins = participants.filter((p) => p.admin); 
   const pp = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png'; 
   const img = await (await fetch(pp)).buffer(); 
   const chat = global.db.data.chats[m.chat]; 
   const mentionsString = [m.sender, m.messageStubParameters[0], ...groupAdmins.map((v) => v.id)]; 
   const mentionsContentM = [m.sender, m.messageStubParameters[0]]; 
   const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'}; 
  
   if (chat.detect2 && m.messageStubType == 29) { 
     let txt1 = `*Recientemente se ha promovido un miembro a administrador.*\n\n`; 
     txt1 += `*◦  Grupo:* ${groupName}\n`; 
     txt1 += `*◦  Nuevo admin:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
     txt1 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     await conn.sendMessage(m.chat, {image: img, caption: txt1, mentions: mentionsString}, {quoted: fkontak2}); 
   } 
  
   if (chat.detect2 && m.messageStubType == 30) { 
     let txt2 = `*Recientemente se ha degradado un administrador a miembro.*\n\n`; 
     txt2 += `*◦  Grupo:* ${groupName}\n`; 
     txt2 += `*◦  Se quitó a:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
     txt2 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     await conn.sendMessage(m.chat, {image: img, caption: txt2, mentions: mentionsString}, {quoted: fkontak2}); 
   } 
  
   if (chat.detect2 && m.messageStubType == 27) { 
     let txt3 = `*Recientemente se ha incorporado al grupo un nuevo miembro.*\n\n`; 
     txt3 += `*◦  Grupo:* ${groupName}\n`; 
     if (!m.sender.endsWith('@g.us')) { 
       txt3 += `*◦  Se añadió a:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
       txt3 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     } else { 
       txt3 += `*◦  Se añadió:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
     } 
     await conn.sendMessage(m.chat, {image: img, caption: txt3, mentions: mentionsContentM}, {quoted: fkontak2}); 
   } 
  
   if (chat.detect2 && m.messageStubType == 28) { 
     let txt4 = `*Recientemente se ha eliminado un miembro del grupo.*\n\n`; 
     txt4 += `*◦  Grupo:* ${groupName}\n`; 
     if (!m.sender.endsWith('@g.us')) { 
       txt4 += `*◦  Se eliminó a:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
       txt4 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     } else { 
       txt4 += `*◦  Se eliminó a:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
     } 
     await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt4, mentions: mentionsContentM}, {quoted: fkontak2}); 
   } 
  
   if (chat.detect2 && m.messageStubType == 32) { 
     let ax; 
     if (m.messageStubParameters[0] === m.sender) { 
       ax = 'salido'; 
     } else { 
       ax = 'eliminado'; 
     } 
     let txt5 = `*Recientemente se ha ${ax} un miembro del grupo.*\n\n`; 
     txt5 += `*◦  Grupo:* ${groupName}\n`; 
     if (ax === 'eliminado') { 
       txt5 += `*◦  Se eliminoó a:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
       txt5 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     } else { 
       txt5 += `*◦  Se salió:* @${m.messageStubParameters[0].split`@`[0]}\n`; 
     } 
     await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt5, mentions: mentionsContentM}, {quoted: fkontak2}); 
   } 
  
   if (chat.detect2 && m.messageStubType == 26) { 
     let accion; 
     if (m.messageStubParameters[0].split`@`[0] === 'on') { 
       accion = 'cerrado'; 
     } else { 
       accion = 'abierto'; 
     } 
     let txt6 = `*Recientemente se han modificado los ajustes del grupo.*\n\n`; 
     txt6 += `*◦  Grupo:* ${groupName}\n`; 
     txt6 += `*◦  El grupo se ha:* ${'```' + accion + '```'}\n`; 
     txt6 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt6, mentions: mentionsContentM}, {quoted: fkontak2}); 
   } 
  
   if (chat.detect2 && m.messageStubType == 21) { 
     let txt7 = `*Recientemente se ha cambiado el nombre del grupo.*\n\n`; 
     txt7 += `*◦  Nuevo nombre:* ${'```' + groupName + '```'}\n`; 
     txt7 += `*◦  Ejecutado por:* @${m.sender.split`@`[0]}`; 
     await conn.sendMessage(m.chat, {image: {url: pp}, caption: txt7, mentions: mentionsContentM}, {quoted: fkontak2}); 
   }
})
  let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })