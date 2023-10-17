const { cmd, pickRandom, fetchJson } = require('../lib')
const fs = require('fs')
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
if (!text) m.reply('*falta un texto*')
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
async (conn, m, { body }) => {
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
cmd({
pattern: "suitpvp",
alias: ["pvp", "suit"],
desc: "juega contra un usuario",
use: "@tag",
category: "games",
},
async (conn, m, { text, args, participants }) => {
this.suit = this.suit ? this.suit : {}
let poin = 10
let poin_lose = 10
let timeout = 60000
if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) m.reply(`Selesaikan suit mu yang sebelumnya`)
if (m.mentionedJid[0] === m.sender) return m.reply(`acaso eres idiota\nno puedes jugar contigo!`)
if (!m.mentionedJid[0]) return m.reply(`con quien quieres jugar?\netiqueta a alguien...\n\nejemplo : ${global.prefix}suit @0`, m.chat, { mentions: ['0@s.whatsapp.net'] })
if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) m.reply(`La persona a la que estás desafiando está jugando con otra persona :(`)
let id = 'suit_' + new Date() * 1
let caption = `_*PVP*_

@${m.sender.split`@`[0]} desafío a @${m.mentionedJid[0].split`@`[0]} 

Por favor @${m.mentionedJid[0].split`@`[0]} Por favor escriba aceptar/rechazar`
this.suit[id] = {
chat: await conn.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (this.suit[id]) conn.sendText(m.chat, `_se acabo el tiempo_`, m)
delete this.suit[id]
}, 60000), poin, poin_lose, timeout
}
})
cmd({
on: "text"
},
async (conn, m, { text, args, participants }) => {
this.suit = this.suit ? this.suit : {}
let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
if (roof) {
let win = ''
let tie = false
if (m.sender == roof.p2 && /^(Acepto|aceptar|si|Si|acepto)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
if (/^(NO|no|No|despues)/i.test(m.text)) {
conn.sendTextWithMentions(m.chat, `@${roof.p2.split`@`[0]} *no acepto tu juego -_-*\n*juego cancelado*`, m)
delete this.suit[roof.id]
return !0
}
roof.status = 'play'
roof.asal = m.chat
clearTimeout(roof.waktu)
//delete roof[roof.id].waktu
conn.sendText(m.chat, `
*🎮 El juego empezo 🎮*

@${roof.p.split`@`[0]} Reto a
@${roof.p2.split`@`[0]}

*por favor vayan al privado del bot*
https://wa.me/${conn.user.jid.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })
if (!roof.pilih) conn.sendText(roof.p, `*elige* \n\nPiedra🗿\nPapel📄\nTijeras✂️`, m)
if (!roof.pilih2) conn.sendText(roof.p2, `*elige* \n\nPiedra🗿\nPapel📄\nTijeras✂️`, m)
roof.waktu_milih = setTimeout(() => {
if (!roof.pilih && !roof.pilih2) conn.sendText(m.chat, `*ambos jugadores no quieren jugar\nGame over`, m)
else if (!roof.pilih || !roof.pilih2) {
win = !roof.pilih ? roof.p2 : roof.p
conn.sendTextWithMentions(m.chat, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} *no eligio*\nJuego terminado`, m)
}
delete this.suit[roof.id]
return !0
}, roof.timeout)
}
let jwb = m.sender == roof.p
let jwb2 = m.sender == roof.p2
let g = /Tijeras/i
let b = /Piedra/i
let k = /Papel/i
let reg = /^(Tijeras|Piedra|Papel)/i
if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
roof.pilih = reg.exec(m.text.toLowerCase())[0]
roof.text = m.text
m.reply(`Has elegido ${m.text} ${!roof.pilih2 ? `\nEsperando al otro jugador` : ''}`)
if (!roof.pilih2) conn.sendText(roof.p2, '_Tu oponente ha elegido_\nAhora es tu turno', 0)
}
if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
roof.text2 = m.text
m.reply(`Has elegido ${m.text} ${!roof.pilih2 ? `\nEsperando al otro jugador` : ''}`)
if (!roof.pilih) conn.sendText(roof.p, '_Tu oponente ha elegido_\nAhora es tu turno', 0)
}
let stage = roof.pilih
let stage2 = roof.pilih2
if (roof.pilih && roof.pilih2) {
clearTimeout(roof.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = roof.p
else if (b.test(stage) && k.test(stage2)) win = roof.p2
else if (g.test(stage) && k.test(stage2)) win = roof.p
else if (g.test(stage) && b.test(stage2)) win = roof.p2
else if (k.test(stage) && b.test(stage2)) win = roof.p
else if (k.test(stage) && g.test(stage2)) win = roof.p2
else if (stage == stage2) tie = true
conn.sendText(roof.asal, `_*PVP*_${tie ? '\n Empate' : ''}

@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Gano \n` : ` perdio \n`}
@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Gano \n` : ` perdio \n`}
`.trim(), m, { mentions: [roof.p, roof.p2] })
delete this.suit[roof.id]
}
}
})


let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })