const { cmd, pickRandom, fetchJson } = require('../lib')

cmd({
pattern: "gay",
category: "fun",
desc: "Foto de gay tageado",
use: "@tag",
},
async (conn, m) => {
const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/gay', { 
     avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*🏳️‍🌈 @${who.split("@")[0]} es tremendo homosexual*`, mentions: [who] }, { quoted: m })
})
cmd({
pattern: "horny",
category: "fun",
desc: "Foto horny de tageado",
use: "@tag",
},
async (conn, m) => {
const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/horny', { 
     avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*🔥 @${who.split("@")[0]} tiene licencia para estar horny*`, mentions: [who] }, { quoted: m })   
})
cmd({
pattern: "simp",
category: "fun",
desc: "Foto simp de tageado",
use: "@tag",
},
async (conn, m) => {
const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/simpcard', { 
     avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*🗿 @${who.split("@")[0]} tu religión es ser un simp!!*`, mentions: [who] }, { quoted: m })
})
cmd({
pattern: "comment",
category: "fun",
desc: "comentar",
use: "@tag",
},
async (conn, m, { text }) => {
const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!text) throw '*falta un texto*'
   conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/youtube-comment', { 
     avatar: await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
     comment: text, 
     username: conn.getName(m.sender),
   })}, caption: `*🫵 @${m.sender.split("@")[0]} gracias por comentar!!!*`, mentions: [m.sender] }, { quoted: m })
})
cmd({
pattern: "fake",
category: "fun",
desc: "un tag falso de la gente :v",
use: "@tag",
},
async (conn, m) => {
var gh = body.slice(11);
    var mentioned = m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.mentionedJid ? m.message.extendedTextMessage.contextInfo.mentionedJid[0] : null;
    var replace = gh.split("|")[0];
    var target = gh.split("|")[1];
    var bot = gh.split("|")[2];
    if (mentioned && target && bot) {
    conn.fakeReply(m.chat, bot, mentioned, target)
    } else {
      conn.sendTextWithMentions(m.chat, `Uso incorrecto del comando. Ejemplo: ${prefix + command} @0|soy gay (mensaje falso)|ya sabiamos (mensaje del bot)`, m)
    }
})
cmd({
pattern: "follar",
alias: ["coger", "violar", "fuck"],
desc: "follate a alguien XD",
use: "@tag",
category: "fun",
},
async (conn, m) => {
let coger = `🥵 te acabas acabas de coger a ${text}!🥵  
      
   te acabas de coger a la puta de ${text} ⁩mientras gemia como una maldita puta 
      
   ${text} ¡te han cogido! 😏 
  `
   conn.sendTextWithMentions(m.chat, coger, m)
})

cmd({
pattern: "bot",
alias: ["simi"],
desc: "hablar con simi (no friends?)",
use: "hola uwu <= no tengo amigos"
},
async (conn, m, { text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `*Dime algo para hablar contigo (sim simi) ♡*` }, { quoted: m});  
await conn.sendPresenceUpdate('composing', m.chat);  
let anu = await fetchJson(`https://api.simsimi.net/v2/?text=${text}&lc=es&cf=false`);  
let res = anu.success;  
m.reply(res)
})