// Código desde cero y comentarios hecho por:   
// @gata_dios  
// @Skidy89  
// Ladron de codigo
// @elrebelde21
  
  // Importaciones   
  require("./settings")
  const { WaMessageStubType, areJidsSameUser, downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent, generateWAMessage, prepareWAMessageMedia, relayMessage} = require('@whiskeysockets/baileys'); 
  const moment = require('moment-timezone')  
  const yts = require("youtube-yts")
  const gradient = require('gradient-string')
  const { execSync, exec, spawn  } = require('child_process') 
  const chalk = require('chalk')   
  const os = require('os') 
  const fs = require('fs') 
  const fetch = require('node-fetch')  
  const axios = require('axios')  
  const cheerio = require('cheerio')
  const qrcode = require('qrcode')
  const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./lib/uploader.js')
  const { toAudio, toPTT, toVideo } = require('./lib/converter.js')
  const mimetype = require("mime-types")  
  const ws = require('ws')
  const webp = require("node-webpmux")  
  const ffmpeg = require('fluent-ffmpeg')
  const JavaScriptObfuscator = require('javascript-obfuscator')
  const { smsg, fetchBuffer, getBuffer, buffergif, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, msToTime, downloadMediaMessage, protoType, serialize } = require('./lib/fuctions')  
  const { proto } = require("@whiskeysockets/baileys")
  const speed = require("performance-now")  
  const util = require('util')
  const diskusage = require('diskusage')
  const { pinterest, formatByte } = require('./lib/RandomFuctions.js')  
  const { skmenu } = require('./lib/menu.js')
  const { skrpg } = require('./lib/rpg.js')
  const { jadibot, listJadibot, killJadibot } = require('./serbot2.js')
  const { canLevelUp, xpRange } = require('./lib/levelling.js')
  
    
   

  
  /**  
  * @param {proto.IWebMessageInfo.message} mek  
  * @param {proto.IWebMessageInfo} chatUpdate  
  * @param {import("@whiskeysockets/baileys").WASocket}   
  */  
  module.exports = conn = async (conn, m, chatUpdate, store) => {  
  var body = (typeof m.text == 'string' ? m.text : '') 
  var _prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#%^&.©^]/gi)[0] : ""
  global.prefix = _prefix
  const isCmd = body.startsWith(prefix)   
  const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
  const args = body.trim().split(/ +/).slice(1) 
  
  const pushname = m.pushName || "Sin nombre" 
  const _isBot = conn.user.jid
  const userSender = m.key.fromMe ? _isBot : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid  
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
  const itsMe = m.sender == conn.user.id ? true : false 
  const text = args.join(" ") || m.text
  const quoted = m.quoted ? m.quoted : m 
  const sender = m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid 
  const mime = (quoted.msg || quoted).mimetype || ''  
  const isMedia = /image|video|sticker|audio/.test(mime)
  const mentions = []  

  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  
  const isBotAdmins = m.isGroup ? groupAdmins.includes(_isBot) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false 
  const isBaneed = m.isGroup ? blockList.includes(userSender) : false 
  const isPremium = m.isGroup ? premium.includes(userSender) : false   
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
  const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: menu, surface: 200, message: "puta gata", orderTitle: "puto aiden me lo folle", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}  
  const fdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: "A", jpegThumbnail: null}}}  
  const fgif = { key: {  participant: "0@s.whatsapp.net", }, message: { videoMessage: { title: botname, h: `Hmm`, seconds: "999999999", gifPlayback: "true", caption: m.pushName, jpegThumbnail: success, }, }, }
  global.fakevovid = { key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { videoMessage: { mimetype: 'video/mp4', caption: botname, jpegThumbnail: success, viewOnce: true }}}
  global.fpay = { "key": { "participant": `0@s.whatsapp.net`, "remoteJid": "6287834993722-1621306547@g.us", "fromMe": false, "id": "3B64558B07848BD81108C1D14712018E" }, "message": { "requestPaymentMessage": { "currencyCodeIso4217": "USD", "amount1000": "100000", "requestFrom": "5218442114446@s.whatsapp.net", "noteMessage": { "extendedTextMessage": { "text": botname }}, "expiryTimestamp": "0", "amount": { "value": "100000", "offset": 1000, "currencyCode": "USD" }, "background": { "id": "BBB9307B17C17F928E57A7435E45033E", "fileLength": "94896", "width": 64, "height": 64, "mimetype": "image/webp", "placeholderArgb": 4288282521, "textArgb": 4278190080, "subtextArgb": 4288282521}}}}
  
  
  
  const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(m.chat, { image:  {url: url }, caption: caption }, { quoted: m })}  

  this.confirm = this.confirm ? this.confirm : {}
  if (this.confirm[m.sender]) {
  let { timeout, sender, message, to, type, count } = this.confirm[m.sender]
  let user = global.db.data.users[sender]
  let _user = global.db.data.users[to]
  if (/^No|no$/i.test(body)) {
  clearTimeout(timeout)
  delete this.confirm[sender]
  return this.sendTextWithMentions(m.chat, `@${sender.split("@")[0]} *cancelo la transferencia*`, m)
  }

  if (/^Si|si$/i.test(m.text)) { 
   let previous = user[type] * 1
   let _previous = _user[type] * 1
   user[type] -= count * 1
   _user[type] += count * 1
   if (previous > user[type] * 1 && _previous < _user[type] * 1) {
   conn.sendMessage(m.chat, {text: `*[❗] Se transfirierón correctamente ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m}); 
     } else { 
       user[type] = previous; 
       _user[type] = _previous; 
       conn.sendMessage(m.chat, {text: `*[❗] Error al transferir ${count} ${type} a @${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, mentions: [to]}, {quoted: m}); 
     } 
     clearTimeout(timeout); 
     delete this.confirm[sender]; 
   }
  }
  this.bet = this.bet ? this.bet : {}
  if (m.sender in this.bet) {
     if (m.isBaileys) return 
     let { timeout, count } = this.bet[m.sender] 
     let user = global.db.data.users[m.sender] 
     let beforemoney = user.money * 1 
     try {
         if (/^(Si|si|sí)?$/i.test(m.text)) { 
             let Bot = (Math.ceil(Math.random() * 91)) * 1 
             let you = (Math.floor(Math.random() * 71)) * 1 
             let status = 'perdiste'
             if (Bot < you) { 
                 user.money += count * 1 
                 status = 'ganaste'
             } else if (Bot > you) { 
                 user.money -= count * 1 
             } else { 
                 status = 'empataste'
                 user.money += (Math.floor(count / 1.5)) * 1 
             } 
             m.reply(` 
 | *JUGADOR* | *PUNTOS* | 
 *🤖 BOT:*   ${Bot} 
 *👤 TU:*    ${you} 
  
 *tu ${status}*, tu ${status == 'ganaste' ? `Conseguiste *+${count * 2}*` : status == 'perdiste' ? `Perdido *-${count * 1}*` : `Conseguiste *+${Math.floor(count / 1.5)}*`} dolares`.trim()) //`//`
             clearTimeout(timeout) 
             delete this.bet[m.sender] 
             return !0 
         } else if (/^(✖️|no)?$/i.test(txt)) { 
             clearTimeout(timeout) 
             delete this.bet[m.sender] 
             m.reply('Rejected') 
             return !0 
         } 
  
     } catch (e) { 
         clearTimeout(timeout) 
         delete this.bet[m.sender] 
         if (beforemoney > (user.money * 1)) user.money = beforemoney * 1 
         m.reply('Error saat melakukan judi (Rejected)') 
         return !0 
     } finally { 
         clearTimeout(timeout) 
         delete this.bet[m.sender] 
         return !0 
     } 
 }
 
 
  try {  
  switch (command) {
  
  case 'aventura': {
  let cooldown = 10000
  let user = global.db.data.users[m.sender]
  let timer = (cooldown - (new Date - user.lastadventure))
  if (new Date() - user.lastadventure < 10000) throw `*estas demasiado cansado*\n*espera ${msToTime(cooldown - new Date())} para volver a aventurar*`
  if (user.health < 80) return conn.reply(m.chat, `*estas herido*\npara poder aventurar necesitas minimo 80 de *salud* ♥️\ncompra pociones con ${prefix}buy potion y curate con ${prefix}health`, m)
  let rewards = reward(user)
  let txt = '*fuiste a una aventura peligrosa*\n*donde perdiste*'
  for (let lost in rewards.lost) {
  let total= rewards.lost[lost].getRandom()
  user[lost] -= total * 1
  if (total) txt += `\n*${global.rpg.emoticon(lost)}:* ${total}`
  }
  txt += '\n\nPero consigues'
  for (let rewardItem in rewards.reward) {
  let total = rewards.reward[rewardItem].getRandom()
  user[rewardItem] += total * 1
  if (total) txt += `\n*${global.rpg.emoticon(rewardItem)}:* ${total}`
  }
  m.reply(txt.trim())
  user.lastadventure = new Date() * 1
  
  function reward(user = {}) { 
     let rewards = { 
         reward: { 
             money: 201, 
             exp: 301, 
             trash: 101, 
             potion: 2, 
             rock: 2, 
             wood: 2, 
             string: 2, 
             common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1), 
             uncommon: [0, 0, 0, 1, 0].concat( 
                 new Array(5 - ( 
                     (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2 
                 )).fill(0) 
             ), 
             mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat( 
                 new Array(8 - ( 
                     (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3 
                 )).fill(0) 
             ), 
             legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat( 
                 new Array(10 - ( 
                     (user.dog > 8 && user.dog) || 4 
                 )).fill(0) 
             ), 
             iron: [0, 0, 0, 1, 0, 0], 
             gold: [0, 0, 0, 0, 0, 1, 0], 
             diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat( 
                 new Array(5 - ( 
                     (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0 
                 )).fill(0) 
             ), 
         }, 
         lost: { 
             health: 101 - user.cat * 4 
         } 
     } 
     return rewards 
 }
 }
 break
  
  case 'minar': case 'minar': {
  let cooldown = 10000
  let user = global.db.data.users[m.sender]
  let timer = (cooldown - (new Date - user.lastmining))
  if (user.health < 80) return conn.reply(m.chat, `*estas herido*\npara poder minar necesitas minimo 80 de *salud* ♥️\ncompra pociones con ${prefix}buy potion y curate con ${prefix}health`, m)
  if (user.pickaxe == 0) return m.reply('*quieres minar sin pico 💀*')
  if (user.pickaxedurability < 30) throw '*tu pico esta roto*'
  if (new Date() - user.lastmining < 10000) throw `*estas demasiado cansado*\n*espera ${msToTime(cooldown - new Date())} para volver a minar*`
  let rewards = reward(user)
  let txt = '*minaste demasiado*\n*pero a costa perdiste'
  for (let lost in rewards.lost) if (user[lost]) {
  let total= rewards.lost[lost].getRandom()
  user[lost] -= total * 1
  if (total) txt += `\n*${global.rpg.emoticon(lost)}:* ${total}`
  }
  txt += '\n\nPero consigues'
  for (let rewardItem in rewards.reward) if (rewardItem in user) {
  let total = rewards.reward[rewardItem].getRandom()
  user[rewardItem] += total * 1
  if (total) txt += `\n*${global.rpg.emoticon(rewardItem)}:* ${total}`
  }
  m.reply(txt.trim())
  user.lastmining = new Date * 1
  
  function reward(user = {}) {
  let rewards = {
  reward: {
  exp: 702 * user.level,
  trash: 103,
  string: 25,
  rock: 30,
  iron: 25,
  diamond: 5,
  emerald: 5,
  common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1), 
  uncommon: [0, 0, 0, 1, 0].concat(new Array(5 - ((user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2 )).fill(0)), 
  },
  lost: {
  health: 80 - user.cat * 4,
  pickaxedurability: 30 - user.fox * 3
  }
  }
  return rewards
  }
  }
  break
  
  
  case 'health': {
  let user = global.db.data.users[m.sender]
  if (user.health >= 100) throw '*Tu salud esta llena ♥️*'
  let heal = 40 + user.cat * 4
  let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0])) || Math.round((90 - user.health) / heal))) * 1
  if (user.potion < count) return m.reply(`*❌ No tienes pociónes*\n*necesitas ${count - user.potion} pocion para curarte*\n*Solo tienes ${user.potion}!!*`)
  user.potion -= count * 1 //1 potion = count (1) 
  user.health += heal * count
  m.reply(`*Tu salud esta completa ✅*\n*usaste ${count} pociones para curarte*\n*Nueva salud: ${user.health} ♥️*`)  
  function isNumber(number) { 
   if (!number) return number; 
   number = parseInt(number); 
   return typeof number == "number" && !isNaN(number); 
  }
  }
  break
  
  
  
  
  
  case 'inventario': case 'inv': {
  let inventory = { 
   others: { 
     health: true, 
     money: true, 
     exp: true, 
     limit: true, 
     level: true, 
     role: true, 
   }, 
   items: { 
     potion: true, 
     trash: true, 
     wood: true, 
     rock: true, 
     string: true, 
     emerald: true, 
     diamond: true, 
     gold: true, 
     iron: true, 
     upgrader: true, 
     pet: true, 
   }, 
   durabi: { 
     sworddurability: true, 
     pickaxedurability: true, 
     fishingroddurability: true, 
     armordurability: true, 
   }, 
   tools: { 
     armor: { 
       '0': 'ropa desgastada', 
       '1': 'ropa comun', 
       '2': 'traje policial', 
       '3': 'traje militar', 
       '4': 'armadura antidisturbios', 
       '5': 'traje mecánico', 
       '6': 'traje legendario', 
       '7': 'armadura mejorada', 
       '8': 'armadura reforzada', 
       '9': 'armadura antimounstros', 
     }, 
     sword: { 
       '0': 'no tiene', 
       '1': 'espada inservible', 
       '2': 'espada desgastada',
       '3': 'espada de hierro',
       '4': 'doble espada afilada',
       '5': 'espada de oro', 
       '6': 'espada de oro reforzado', 
       '7': 'espada cazadora de mounstros',
     }, 
     pickaxe: { 
       '0': 'no tiene', 
       '1': 'pico quebradizo', 
       '2': 'pico desgastado', 
       '3': 'pico normal', 
       '4': 'pico de oro', 
       '5': 'pico de oro reforzado',
       '6': 'pico de diamante', 
       '7': 'pico de cristal'
     },
     axe: {
     '0': 'hacha normal',
     '1': 'hacha reforzada'
     },
     
     fishingrod: true, 
  
   }, 
   crates: { 
     common: true, 
     uncommon: true, 
     mythic: true, 
     legendary: true, 
   }, 
   pets: { 
     horse: 10, 
     cat: 10, 
     fox: 10, 
     dog: 10, 
   }
   } 
  let user = global.db.data.users[m.sender] 
  let tools = Object.keys(inventory.tools).map(v => user[v] && `${global.rpg.emoticon(v)} : ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][user[v]?.toString()] : `nivel ${user[v]}`}`).filter(v => v).join('\n').trim() 
  let items = Object.keys(inventory.items).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n').trim() //`
  let dura = Object.keys(inventory.durabi).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n').trim() 
  let crates = Object.keys(inventory.crates).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n').trim() 
  let pets = Object.keys(inventory.pets).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v] >= inventory.pets[v] ? 'nivel maximo' : `nivel ${user[v]}`}`).filter(v => v).join('\n').trim() //`
  let txt = `
👤 Nombre: ${await conn.getName(m.sender)}
🛡️ Rol ${user.role}

${Object.keys(inventory.others).map(v => user[v] && `➔ ${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n')}${tools ? `
* Herramientas ⚔️*

${tools}` : ''}${dura ?`
${dura}` : ''}${items ? `

* Items ♦️*
${items}
Items totales: ${Object.keys(inventory.items).map(v => user[v]).reduce((a, b) => a + b, 0)} Items` : ''}${crates ? `

* Cajas 📦*
${crates}

Cajas totales:  ${Object.keys(inventory.crates).map(v => user[v]).reduce((a, b) => a + b, 0)} Cajas` : ''}${pets || user.petFood ? ` 

${pets ? pets + '\n' : ''}${user.petFood ? '🍖 comida para mascotas: ' + user.petFood : ''}` : ''}`.trim() // `
m.reply(txt)
 }
 break
 
 case 'work': case 'chambear': {
 let works = (args[0] || '').toLowerCase()
 let txt = `
*Hola ${await conn.getName(m.sender)}*

*Aqui tienes una lista de trabajos donde puedes ser contratado*

 *Cajero 🏧*
- No necesitas nada para que te contraten el el cajero
- paga miserable 
- sin bonus exp

 *Leñador 🪵*
- necesitas un hacha (crafteable)
- paga buena
- bonus exp

 *Repartidor 🚚* (próximamente)
- Nivel 45 requerido
- Cada pedido 500 dolares
- Bonus xp 
`
switch (works) {
case 'cajero': {
let user = global.db.data.users[m.sender] 
let time = global.db.data.users[m.sender].lastwork + 600000  
if (new Date - global.db.data.users[m.sender].lastwork < 600000) return m.reply(`*Estas cansado*\n*Espera ${msToTime(time - new Date())} para volver a trabajar!!*`)
let pay = Math.floor(Math.random() * 300)
user.money += pay + user.dog * 1000
user.lastwork = new Date() * 1
let work = pickRandom(['los ruidos de lo clientes molestos no te dejan en paz, sin embargo tu paga fue de', 'fue una noche tranquila...\nganaste', 'porque elegiste este trabajo\n*esta pregunta retumba en tu cabeza*, sin embargo ganaste tu miseria de paga de'])
m.reply(`${work} ${pay} dólares 💵`)
}
break
case 'leñador': { 
let user = global.db.data.users[m.sender] 
let time = global.db.data.users[m.sender].lastwork + 600000  
if (new Date - global.db.data.users[m.sender].lastwork < 600000) return m.reply(`*Estas cansado*\n*Espera ${msToTime(time - new Date())} para volver a trabajar!!*`)
if (user.axe == 0) throw '*no fuistes contratado por la simple razon de que no tienes un hacha, subnormal*'
if (user.axedurability < 50) throw `tu hacha puede *romperse* en esas condiciones sin aviso\npuedes reparar tu hacha con *${prefix}repair hacha*`
let pay = pickRandom([900, 300, 700, 999])
let bonus = Math.floor(Math.random() * 3000)
let lost = Math.floor(Math.random() * 80)
user.money += pay + user.dog * 1000
user.exp += bonus + user.dog * 1000
user.lastwork = new Date() * 1
user.axedurability -= lost - user.fox * 4
let work = pickRandom(['este trabajo es demasiado bueno pero agotador, asi que este esfuerzo es recompensado por', '*piensas en cortar 20 troncos mas pero tu trabajo es tan bueno que ganas*'])
m.reply(`${work} ${pay + user.dog * 1000} dolares 💵\n*a costa de este trabajo ganaste ${bonus + user.dog * 1000} pero tu hacha perdio ${lost - user.fox * 4} de durabilidad`)
}
break
default:

m.reply(txt)

}
function pickRandom(list) { 
   return list[Math.floor(list.length * Math.random())]; 
}
}
break


  
 
case 'petshop': {
let shop = (args[0] || '').toLowerCase()
let user = global.db.data.users[m.sender] 
let hdog = 5000
let hcat = 5000
let hfox = 20000
let hpetfood = 1
let txt = `
*compra una mascota hoy...*

 🐈 • *Gato:*
 ➞ ${hcat} dolares
 ➞ 4% mas salud en cualquier accion
 
 
 🐕 • *Perro:* 
 ➞ ${hdog} dolares
 ➞ Bonus extra en dolares y xp (%400)
 
 
 🦊 • *Zorro:*  (próximamente)
 ➞ ${hfox} dolares
 ➞ bonus en ataques 
 ➞ Los cooldown se rebajan 30 segundos
 
 🍖 • *Comida para mascotas*:
  ➞ ${hpetfood} Pet token
  ➞ Sube de nivel tus mascotas
`

switch (shop) {
case 'gato': {
if (user.cat) throw 'ya tienes esa mascota!!'
if (user.money < hdog) throw 'te falta dinero!!'
user.money -= hdog
user.cat += 1
m.reply('*gracias por comprar a este lindo gatito*\n*(la curacion de vida sube un %4)*')
}
break
case 'perro': {
if (user.dog) throw 'ya tienes esa mascota!!'
if (user.money < hdog) throw 'te falta dinero!!'
user.money -= hdog
user.dog += 1
m.reply('*gracias por adoptar a un lindo perro*\n*(desde ahora las ganancias se duplicaran)*')
}
break
case 'zorro': {
if (user.fox) throw 'ya tienes esa mascota!!'
if (user.money < hfox) throw 'te falta dinero!!'
user.money -= hfox
user.fox += 1
m.reply('*gracias por adoptar a un zorro*\n*(bonus de ataque, cooldowns reducidos)*')
}
break
default: 
m.reply(txt)
}
}
break
  
case 'claim': {
let user = global.db.data.users[m.sender]
let rewards = {
exp: 9999 + user.dog * 1000,
money: 3000 + user.dog * 2000,
potion: 5 + user.cat * 4,
wood: 10,
diamond: 9,
iron: 12
} 
let cooldown = user.lastclaim + 86400000 - user.fox * 30
if (new Date - user.lastclaim < 86400000) throw `*❗ Ya reclamaste tu cofre diario*\n*espera ${msToTime(cooldown - new Date())} para volver a reclamar este cofre*`
let txt = ''
for (let reward of Object.keys(rewards)) {
if (!(reward in user)) continue
user[reward] += rewards[reward]
txt += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}\n`
}
conn.reply(m.chat, '*HAS CONSEGUIDO 🥳*\n' + txt, fkontak)
user.lastclaim = new Date() * 1
}
break
   
  
        
 
case 'crear': case 'craft': {
let repairs =  (args[0] || '').toLowerCase()
let user = global.db.data.users[m.sender] 
let caption = `
*Por alguna razon tienes estas recetas*
*(por un momento piensas crear una...)*
 
 *❏ Recetas*

*talvez un trabajo pida un hacha... nunca se sabe*
 ▧ Hacha 🪓
 〉4 madera
 〉3 hierro
 
*una buena decisión para conseguir materiales*
 ▧ Pico ⛏️ 
 〉 10 roca
 〉 5 Hierro 
 〉 2 madera

*necesitas pelear? esta es tu opcion*
 ▧ espada ⚔️ 
 〉 10 madera
 〉 15 hierro
 
*un poco de protección nunca viene mal*
 ▧ Armadura 🥼 
 〉 30 diamantes
 `
 switch (repairs) {

 case 'hacha': {
 if (user.axe > 0) throw `*te sientes estupido al intentar crear una hacha cuando ya tienes una...*\n(talvez querías mejorarlo con ${prefix}mejorar)`
 if (user.wood < 4 || user.iron < 3) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.wood -= 4
 user.iron -= 3
 user.axe += 1
 user.axedurability = 70
 m.reply('*solo te cortaste una mano para tenér una fabulosa hacha 🪓*')
 }
 break
 
 case 'pico': {
 if (user.pickaxe > 0) throw `*te sientes estupido al intentar crear un pico cuando ya tienes uno...*\n(talvez querías mejorarlo con ${prefix}mejorar)`
 if (user.rock < 10 || user.iron < 5 || user.wood < 2) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.rock -= 10
 user.iron -= 5
 user.wood -= 2
 user.pickaxe += 1
 user.pickaxedurability = 70
 m.reply('*crafteaste un pico ⚒️*')
 }
 break
 
 case 'espada': {
 if (user.pickaxe > 0) throw `*te sientes estupido al intentar crear una espada cuando ya tienes una...*\n(talvez querías mejorarlo con ${prefix}mejorar)`
 if (user.wood < 10 || user.iron < 15) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.wood -= 10
 user.iron -= 15
 user.sword += 1
 user.sworddurability = 70
 m.reply('*con unas cuantas lesiones y cortaduras creaste una espada ⚔️*')
 }
 break
 
 case 'armadura': {
 if (user.armor > 0) throw `*te sientes estupido al intentar crear una armadura cuando ya tienes una...*\n(talvez querías mejorarlo con ${prefix}mejorar)`
 if (user.diamond < 30) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.diamond -= 30
 user.armor += 1
 user.armordurability = 70
 m.reply('*como diablos hiciste una armadura con diaman.. da igual, lo bueno es que tienes ahora una armadura*')
 }
 break
 
 default: 
 m.reply(caption)
 }
 }
 break
 
 
    
  case 'acortar': {
  if (!text) return m.reply(`*[❗] INFO [❗]*\n*Ingresa un link para acortar!!*`)
  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()  
  if (!shortUrl1) return m.reply(`*[❗] ERROR [❗]*`)
  let done = `*LINK ACORTADO CORRECTAMENTE*\n*link: ${text}*\n*Link Acortado: ${shortUrl1}*`
  m.reply(done)
  }
  break
  
  case 'lb': {
  skrpg(conn, args, participants, m)
  }
  break
  case 'toimg': {
  if (!m.quoted) throw '*uhh... puedes responder a un sticker ಠ⁠_⁠ಠ*'
  if (!/webp/.test(mime)) throw '*uhh... puedes responder a un sticker ಠ⁠_⁠ಠ*'
  let media = await conn.downloadAndSaveMediaMessage(m.quoted)
  let ran = await getRandom('sk.png')
  exec(`ffmpeg -i ${media} ${ran}`, (err) => {
  fs.unlinkSync(media)
  if (err) throw err
  let buffer = fs.readFileSync(ran)
  conn.sendMessage(m.chat, { image: buffer }, { quoted: m})
  fs.unlinkSync(ran)
  })
  }
  break


    case 'transfer': {
    let items = ['money', 'exp', 'limit', 'potion']
    this.confirm = this.confirm ? this.confirm : {}
    if (this.confirm[m.sender]) return conn.sendText(m.chat, `*❗ Aun hay una tranferencia, Espera a que acabe esa transferencia*`, m)
    let user = global.db.data.users[m.sender]
    let item = items.filter((v) => v in user && typeof user[v] == 'number')
    let lol = `*Creo que no sabes usar bien este comando -_-*\n*te dare un ejemplo porque me caes bien ^w^*\n${prefix + command} exp 100 @0\n📍 Algunos articulos *Disponibles son*:\nexp\nmoney\nlimit\npotion`
    let type = (args[0] || '').toLowerCase()
    if (!item.includes(type)) return conn.sendTextWithMentions(m.chat, lol, m)
    let count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!(who in global.db.data.users)) throw '*El usuario no esta registrado en mi base de datos :(*'
    if (user[type] * 1 < count) throw `no tienes suficiente *${type}*`
    let confirm = `*estas seguro de transferir ${count}?*\ntienes solamente *60 segundos*\nelige una opción\nsi = transferir ${count}\nno = cancelar`
    await m.reply(confirm)
    this.confirm[m.sender] = {
    sender: m.sender,
    to: who,
    message: m, type, count,
    timeout: setTimeout(() => (m.reply(`*❗ se acabo el tiempo*\n*la transacción se canceló 😓*`), delete this.confirm[m.sender]), 60 * 1000)
    }
    function isNumber(x) { 
    return !isNaN(x); 
    }
    }
    break

 
   
 
 
   case 'menu': {
   conn.adReply(m.chat, skmenu(conn, prefix, pushname, m), global.menu, fkontak, true)
   m.reply(`*Recuerda que este bot aun no esta terminado al %100*\n*se añadieron nuevos comandos >w< ⁠♡*\n*Comandos nuevos:*\n.setwelcome\n.setbye\n.serbot\n.serbot --code\nesta es mi actualización de rendimiento asi que cualquier bug/problema reporten en el grupo oficial`)
   }
   break 
   case 'afk': {
   let user = global.db.data.users[m.sender]
   user.afkTime = + new Date
   user.afkReason = text
   m.reply(`*Esta bien ${pushname}...*\n les dire a los que te etiqueten que estas *AFK* ${text ? 'por ' + text : 'sin razon'} nwn`)
   }
   break
   
  case 'nowa': {
  let regex = /x/g 
  if (!text) m.reply('⚠️ Falto el número.')
  if (!body.match(regex)) m.reply(`*Ejemplo de uso: ${prefix + command} 521999340434x*`)
  let random = body.match(regex).length, total = Math.pow(10, random), array = [] 
  for (let i = 0; i < total; i++) { 
  let list = [...i.toString().padStart(random, '0')] 
  let result = text.replace(regex, () => list.shift()) + '@s.whatsapp.net' 
  if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) { 
  let info = await conn.fetchStatus(result).catch(_ => {}) 
  array.push({ exists: true, jid: result, ...info }) 
  } else { 
  array.push({ exists: false, jid: result }) 
  }} 
  let txt = 'Registrados\n\n' + array.filter(v => v.exists).map(v => `• Nro: wa.me/${v.jid.split('@')[0]}\n*• Bio:* ${v.status || 'Sin descripcion'}\n*• Fecha:* ${formatDate(v.setAt)}`).join('\n\n') + '\n\n*No registrados*\n\n' + array.filter(v => !v.exists).map(v => v.jid.split('@')[0]).join('\n') 
  m.reply(txt) 
  function formatDate(n, locale = 'id') { 
  let d = new Date(n) 
  return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })}
  }
  break 


    case 'addcase': {
    if (!isCreator) throw mess.owner
    if (!text) throw 'envia el case'
    try {
    const addcase =[fs.readFileSync('main.js', 'utf8').slice(0, fs.readFileSync('main.js', 'utf8').lastIndexOf('break') + 5), q, fs.readFileSync('main.js', 'utf8').slice(fs.readFileSync('main.js', 'utf8').lastIndexOf('break') + 5)].join('\n');
    fs.writeFileSync('main.js', addcase)
    conn.editMessage(m.chat, '*adding command temporarily*', '*command added!!*', 5, m)
    } catch (error) {
    throw new error
    }
    }
    break
    
   
   
  
   
   
    case 'follar': {
   let coger = `🥵 te acabas acabas de coger a ${text}!🥵  
      
   te acabas de coger a la puta de ${text} ⁩mientras gemia como una maldita puta 
      
   ${text} ¡te han cogido! 😏 
  `
   conn.sendTextWithMentions(m.chat, coger, m)
   }
   break
    
        
    case 'qc': {
    if (!args[0] && !m.quoted) {
      return conn.adReply(m.chat, `*nesecitas un texto*`)
    }
    let userPfp
    if (m.quoted) {
      try {
        userPfp = await conn.profilePictureUrl(m.quoted.sender, "image")
      } catch (e) {
        userPfp = defaultpp
      }
    } else {
      try {
        userPfp = await conn.profilePictureUrl(m.sender, "image")
      } catch (e) {
        userPfp = defaultpp
      }
    }
    const waUserName = pushname
    const quoteText = m.quoted ? m.quoted.body : args.join(" ")
    const quoteJson = {
      type: "quote",
      format: "png",
      backgroundColor: "#FFFFFF",
      width: 700,
      height: 580,
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: waUserName,
            photo: {
              url: userPfp,
            },
          },
          text: quoteText,
          replyMessage: {},
        },
      ],
    }
    try {
      const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
        headers: { "Content-Type": "application/json" },
      })
      const buffer = Buffer.from(quoteResponse.data.result.image, "base64")
      conn.sendImageAsSticker(m.chat, buffer, m, {
        packname: packname,
        author: author,
      })
    } catch (error) {
      console.error(error)
      conn.adReply(m.chat, 'Error', menu, fkontak)
    }
    }
    break
    
    case 'del': { 
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);
    if (!m.quoted) throw `*❗ Etiqueta un mensaje*`
      try { 
     const delet = m.message.extendedTextMessage.contextInfo.participant; 
     const bang = m.message.extendedTextMessage.contextInfo.stanzaId; 
     return conn.sendMessage(m.chat, {delete: {remoteJid: m.chat, fromMe: false, id: bang, participant: delet}}); 
     } catch { 
     m.quoted.delete()
     }
     }
     break

     case 'grupo': {
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin)
      if (args[0] === 'abrir') {
    m.reply(`*GRUPO ABIERTO CON EXITO✅*`)
    await conn.groupSettingUpdate(m.chat, 'not_announcement')
    } else if (args[0] === 'cerrar') {
    m.reply(`*GRUPO CERRADO CON EXITO✅*`)
    await conn.groupSettingUpdate(m.chat, 'announcement')
    } else {
    conn.sendPoll(m.chat, '*❗ Elige una opcion*', [`${command.charAt(0).toUpperCase()+command.slice(1)} abrir`,`${command.charAt(0).toUpperCase()+command.slice(1)} cerrar`])
    }
    }
    break
    


    case 'public': {
    if(_isBot !== m.sender) return conn.fakeReply(m.chat, 'este comando solo lo pueden usar bots o subbots', '0@s.whatsapp.net', '❌ No eres bot')
      conn.public = true
      m.reply('*ahora el bot es de uso publico*')
      }
      break
      
      case 'test':
      if (!text) throw '*❗ Falta un texto*'
      conn.sendMessage(m.chat, { image: { url: `https://api.clayzaaubert.my.id/api/ai/animediffusion?q=${text}&apikey=gt5JP8QgJl` }, caption: 'aqui tienes ✨' }, { quoted: m })
      break
  
      case 'self':
      if(_isBot !== m.sender) return conn.fakeReply(m.chat, 'este comando solo lo pueden usar bots o subbots', '0@s.whatsapp.net', '❌ No eres bot')
      conn.public = false
      m.reply('*ahora el bot es de uso privado*')
      break
  
  
      case 'serbot':  
      if (m.isGroup) return m.reply(mess.priv) 
      await jadibot(conn, m, command, args)
      break 
      case 'deljadibot':
      killJadibot(conn, m, command)
      break
    case 'bots': { 
    try {
    let user = [... new Set([...global.listJadibot.filter(conn => conn.user).map(conn => conn.user)])];
    te = "*lista de subbots*\n\n";
    for (let i of user) {
      y = await conn.decodeJid(i.id);
      te += "Usuario: " + i.name + "\n";
      te += "Numero: https://wa.me/+" + y.split("@")[0] + "?text=.estado\n\n";
    }
    conn.sendMessage(m.chat, { text: te }, { quoted: m });
  } catch (err) {
    m.reply(`*no hay subbots activos*`);
  }
  }
    break;
 

    case 'fake':
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
    break
    
    case 'apk': {
    let { search, download } = require('aptoide-scraper')
    if (!text) throw '*❗Que vas a buscar*'
      try {     
     let searchA = await search(text); 
     let data5 = await download(searchA[0].id); 
     let response = `📲 *Descargador de Aptoide* 📲\n\n📌 *Nombre:* ${data5.name}\n📦 *Package:* ${data5.package}\n🕒 *Última actualización:* ${data5.lastup}\n📥 *Tamaño:* ${data5.size}` 
     await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m}); 
     if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) { 
     return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*'}, {quoted: m}); 
     } 
     await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m}); 
     } catch { 
     throw `*[❗] Error, no se encontrarón resultados para su búsqueda.*`; 
     }    
     }
     break
    case 'levelup': {
    let { levelup } = require('./lib/canvas.js')
    let name = await conn.getName(m.sender); 
    let user = global.db.data.users[m.sender]; 
   if (!canLevelUp(user.level, user.exp, global.multiplier)) { 
     let {min, xp, max} = xpRange(user.level, global.multiplier); 
     throw ` 
 ┌───⊷ *NIVEL* 
 ▢ Nombre : *${await conn.getName(m.sender)}* 
 ▢ Nivel : *${user.level}* 
 ▢ XP : *${user.exp - min}/${xp}* 
 ▢ Rango : *${user.role}*
 └────────────── 
  
 Te falta *${max - user.exp}* de *XP* para subir de nivel 
 `.trim(); 
   } 
   let before = user.level * 1; 
   while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++; 
   if (before !== user.level) {
   let bonus = Math.ceil(50 * user.level)
   user.money += bonus
   let strt = `.             ${user.role}`
   let str = ` 
 ┌─⊷ *LEVEL UP* 
 ▢ Nivel anterior : *${before}* 
 ▢ Nivel actual : *${user.level}* 
 ▢ Bonus: *+${bonus} dolares*
 └────────────── 
  
 *_Cuanto más interactúes con los bots, mayor será tu nivel_* 
 `.trim()
 let image = await levelup(strt, user.level)
 conn.sendMessage(m.chat, { image: image, caption: str }, {quoted: m})
 }    
 }
 break
    
    
      case 's':  
      case 'sticker': {  
          if (/image/.test(mime)) {  
          m.reply(mess.wait)  
          media = await quoted.download()  
          let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((quoted.msg || quoted).seconds > 40) return m.reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: packname, author: author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      } else {  
          m.reply(`*Envía una imagen/video con ${prefix + command}*\n_*(La duración del video solo puede ser de 10 segundos)*_`)  
          }  
      }  
      break
  
            
      case 'tiktokvideo':
      case 'tiktok':
    if (!text) return m.reply( `*Ejemplo: ${prefix + command} link`)
    if (!q.includes('tiktok')) return m.reply(`*link invalido!*`)
    m.reply(mess.wait)
    require('./lib/tiktok').Tiktok(q).then( data => {
    conn.sendMessage(m.chat, { video: { url: data.nowm }}, { quoted: m })
    })    
    break
    
    
    case 'tiktokmp3':
    case 'tiktokaudio':
    if (!text) return m.reply( `*Ejemplo: ${prefix + command} link*`)
    if (!q.includes('tiktok')) return m.reply(`*link invalido!*`)
    m.reply(mess.wait)
    require('./lib/tiktok').Tiktok(q).then( data => {
    conn.sendMessage(m.chat, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
    })    
    break
            
    
         case 'ofuscar':
       if (!text) return m.reply("*Ingresa el codigo que vas a ofuscar.*"); 
         function obfuscateCode(code) { 
        return JavaScriptObfuscator.obfuscate(code, { 
        compact: false, 
          controlFlowFlattening: true, 
        deadCodeInjection: true, 
        simplify: true, 
          numbersToExpressions: true, 
        }).getObfuscatedCode(); 
       } 
      let obfuscatedCode = await obfuscateCode(text); 
       conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m});
       break
            
  case 'getcase':  
    if (!isCreator) return conn.sendMessage(m.chat, { text: mess.owner }, { quoted: m});  
    if (!text) return m.reply(`no hay comando a buscar o que?`)  
    try {  
    bbreak = 'break'  
  m.reply('case ' + `'${args[0]}'` + fs.readFileSync('./main.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak)  
  } catch (err) {  
  console.error(err)  
  m.reply(" Error, tal vez no existe el comando")  
  }  
  break
  
  case 'sendcase':
  if (!isCreator) return conn.sendCart(m.chat, mess.owner)
  if (!text) return m.reply(`no hay comando a buscar o que?`)  
  if (!who) return m.reply(`*etiqueta a alguien*`)
  try {
  bbreak = 'break'
  m.reply('case ' + `'${args[0]}'` + fs.readFileSync('./main.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak, who)
  conn.sendMessage(m.chat, { text: `enviado con exito a @${who.split("@")[0]}`, mentions: [who] })
  } catch (error) {
  console.error(error)
  m.reply(`no existe el comando`)
  }
  break



  case 'attp':  
    if (!text) return m.reply('ingresa algo para convertirlo a sticker :v')  
    link = `https://api.lolhuman.xyz/api/attp?apikey=${lolkeysapi}&text=${text}`  
    conn.sendMessage(m.chat, { sticker: { url: link } }, { quoted: fkontak })  
    break  
  
  case 'yts':  
    if (!text) throw `Ejemplo: ${prefix + comand} historia wa anime`;  
    const search = await yts(text);  
    let teks = 'Búsqueda en YouTube\n\nResultados de ' + text + '\n\n';  
    let no = 1;  
    let themeemoji = "✨";  
    for (let i of search.all) {  
      teks += `${themeemoji} No: ${no++}\n${themeemoji} Tipo: ${i.type}\n${themeemoji} ID del Video: ${i.videoId}\n${themeemoji} Título: ${i.title}\n${themeemoji} Vistas: ${i.views}\n${themeemoji} Duración: ${i.timestamp}\n${themeemoji} Subido: ${i.ago}\n${themeemoji} URL: ${i.url}\n\n━━━━━━━━━━━━\n\n`;  
    }  
    await conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: fkontak });  
    break  
  
  
  case 'leave': {  
    if (!isCreator) return m.reply(`*este comando solo es para mi jefe*`);  
    m.reply(m.chat, `*Adios fue un gusto estar aqui hasta pronto*`);  
    await conn.groupLeave(m.chat);  
  }  
  break  
  
  case 'kick': {  
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    conn.groupParticipantsUpdate(m.chat, [users], 'remove');  
  }  
  break  
  
  case 'promote': {  
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'promote')
  }  
  break  
  
  case 'demote': {  
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';  
    await conn.groupParticipantsUpdate(m.chat, [users], 'demote')
  }  
  break  
  

  case 'toqr':{
  if (!text) return m.reply('*por favor manda un link para convertirlo en qr*')

   let qruwu = await qrcode.toDataURL(q, { scale: 35 })
   let data = new Buffer.from(qruwu.replace('data:image/png;base64,', ''), 'base64')
   let buff = getRandom('.jpg')
   await fs.writeFileSync('./'+buff, data)
   let medi = fs.readFileSync('./' + buff)
  await conn.sendMessage(m.chat, { image: medi, caption: `*aqui tienes tu qr*\n*${botname}*`}, { quoted: m })
   setTimeout(() => { fs.unlinkSync(buff) }, 10000)
  }
  break		
  
  case 'hidetag':  
    if (!m.isGroup) return m.reply(mess.group)
    if (!isGroupAdmins) return m.reply(mess.admin)
    if (isGroupAdmins || isCreator || !m.quoted ) {  
      conn.sendMessage(m.chat, { text: text ? text : "", mentions: participants.map((a) => a.id) }, { quoted: m })  
    }
    if (m.quoted) return conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) }, { quoted: m }) // Mario is going to steal it
    break;  
  
  case 'tagall': {  
    if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
    let teks = `✿ ━〔 *🍬 𝐈𝐍𝐕𝐎𝐂𝐀𝐂𝐈𝐎́𝐍 𝐌𝐀𝐒𝐈𝐕𝐀  🍬* 〕━ ✿\n\n`;  
    teks += `✿ 𝐒𝐔 𝐀𝐃𝐌𝐈𝐍 𝐋𝐎𝐒 𝐈𝐍𝐕𝐎𝐂𝐀, 𝐑𝐄𝐕𝐈𝐕𝐀𝐍\n\n`;  
    teks += `✿ 𝐌𝐄𝐍𝐒𝐀𝐉𝐄:  ${text ? text : 'no hay mensaje :v'}\n\n`;  
    for (let mem of participants) {  
      teks += `┃@${mem.id.split('@')[0]}\n⁩`;  
    }  
    teks += `┃\n`;  
    teks += `╰━━━━━[ *${botname}* ]━━━━━⬣`;  
    conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m });  
  }  
  break  
  
 case 'estado':
 let cpuInfo = os.cpus()
let Cores = cpuInfo.length
let Model = cpuInfo[0].model
let arch = os.arch()
let memory = os.totalmem()
let skidCheck = '/'
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
let usedRam = process.memoryUsage()
diskusage.check(skidCheck, (err, info) => {
    if (err) {
        console.error(err)
        return
    }

    let totalUwu = info.total
    let freee = info.free
    let txtt = `
    🌐 Estado del Sistema 🌐

➤ Sistema Operativo: ${os.platform()}
➤ Arquitectura: ${arch}
➤ CPU: ${Model}
➤ Núcleos: ${Cores}
➤ Memoria RAM: ${formatByte(memory)}/${formatByte(usedRam.rss)}
➤ Espacio en Disco Usado: ${formatByte(totalUwu)}
➤ Espacio Total en Disco: ${formatByte(freee)}
    
 
    🌀 Estado del Bot 🌀 (${conn.user.id == global.numBot2 ? 'bot oficial  ' : 'subbot'} )

➤ Jadibots: ${listJadibot.length}
➤ Chats: ${anu.length} 
➤ Usuarios: ${Object.keys(global.db.data.users).length}
➤ Estado: alpha bugs 


`
 let docAd = { 
     'document': {url: `https://github.com/Skidy89`}, 
     'mimetype': `application/pdf`, 
     'fileName': `「  𝑯𝒆𝒍𝒍𝒐 𝑾𝒐𝒓𝒍𝒅 」`, 
     'fileLength': 99999999999999, 
     'pageCount': 2000, 
     'contextInfo': { 
       'forwardingScore': 200, 
       'isForwarded': true, 
       'externalAdReply': { 
         'mediaUrl': 'https://github.com/Skidy89', 
         'mediaType': 2, 
         'previewType': 'pdf', 
         'title': 'ESTADO DEL BOT', 
         'body': botname, 
         'thumbnail': success, 
         'sourceUrl': 'https://chat.whatsapp.com/Ebbo3i9xxiZFErul4gyApJ'}}, 
     'caption': txtt, 
     'footer': botname, 
     'headerType': 6
     }
conn.sendMessage(m.chat, docAd, { quoted: m })
 })
    break
    
    
    
    
    case 'gay':
   conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/gay', { 
     avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*🏳️‍🌈 @${who.split("@")[0]} es tremendo homosexual*`, mentions: [who] }, { quoted: m })
   break
   case 'horny':
   conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/horny', { 
     avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*🔥 @${who.split("@")[0]} tiene licencia para estar horny*`, mentions: [who] }, { quoted: m })
   break
   case 'simp':
   conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/simpcard', { 
     avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*🗿 @${who.split("@")[0]} tu religión es ser un simp!!*`, mentions: [who] }, { quoted: m })
   break
   case 'comentar': case 'comment':
   if (!text) throw '*falta un texto*'
   conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/youtube-comment', { 
     avatar: await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
     comment: text, 
     username: conn.getName(m.sender),
   })}, caption: `*🫵 @${m.sender.split("@")[0]} gracias por comentar!!!*`, mentions: [m.sender] }, { quoted: m })
   break
   case 'dvd':
   conn.sendMessage(m.chat, { image: { url: global.API('https://some-random-api.com', '/canvas/misc/tonikawa', { 
   avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'), 
   })}, caption: `*💿 @${who.split("@")[0]} se convierte en un dvd!!!*`, mentions: [m.sender] }, { quoted: m })
   break
   case 'wallpaper':
   if (!text) throw `*❗ Ejemplo: ${prefix + command} gawr gura*` 
   let { wallpaper, wallpaperv2 } = require('@bochilteam/scraper')
   let _res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(text) 
   let _img = _res[Math.floor(Math.random() * _res.length)]
   conn.sendMessage(m.chat, { image: { url: _img }, caption: `*✨ Aqui tienes tu wallpaper de ${text}*`}, { quoted: fgif })
   break
   case 'anime': {
   if (/image/.test(mime)) {
   let _miMedia = await conn.downloadAndSaveMediaMessage(quoted)
   let _upload = await TelegraPh(_miMedia)
   try {
   let anime = await `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${_upload}`
   await m.reply(mess.wait)
   await conn.sendFile(m.chat, anime, 'error.jpg', null, m) 
   } catch (e) {
   throw '❗ *Hubo un error*\n*Responde solo a imagenes que tengas caras visibles* (⁠-⁠_⁠-⁠;⁠)'
   }
   } else { 
   m.reply(`*❗ responde a una imagen unu*`)
   }
   }
   break
   case 'tolink': case 'tourl': {
   if (/image/.test(mime)) {
   _miMedia = await conn.downloadAndSaveMediaMessage(quoted)
   _upload = await TelegraPh(_miMedia)
   m.reply(mess.wait)
   sleep(1000)
   m.reply(_upload)
   } else { 
   m.reply(`*❗ responde a una imagen *`)
   }
   }
   break
   
   
   case 'removebg': case 'removerfondo': {
   if (/image/.test(mime)) {
   _miMedia = await conn.downloadAndSaveMediaMessage(quoted)
   _upload = await TelegraPh(_miMedia)
   let sremovebg = global.API(`https://api.lolhuman.xyz/api/removebg?apikey=${lolkeysapi}&img=${_upload}`)
   conn.sendFile(m.chat, sremovebg, 'error.png', null, m)
   } else { 
   m.reply(`*❗ responde a una imagen *`)
   }
   }
   break
   case 'play': {
   let { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
   let { search } = require('./lib/RandomFuctions.js')
   let enviando
   let _limit1 = 100
   let _limit2 = 400
   if (!text) throw `*❗ Ingresa algo para buscar -_- *\n*Ejemplo: ${prefix + command} tsb combos*`
   let yt_play = await search(args.join(' '))
   let text1 = `*——⌈📽️ YOUTUBE PLAY 📽️⌋——*\n📌 *Titulo*: _${yt_play[0].title}_\n📆 *Publicado*: ${yt_play[0].ago}\n*🔗 Link*: ${yt_play[0].url}`
   conn.sendMessage(m.chat, {image: {url: yt_play[0].thumbnail}, caption: text1 }, {quoted: m})
   if (enviando) return
   enviando = true
   try {
   let qu = '360'
   let q = qu + 'p'
   let v = yt_play[0].url
   let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
   let _tetme = await yt.title
   let size_api = await yt.size
   let bochilDownload = await yt.video[q].download()
   let sex = await getBuffer(bochilDownload)
   let fileSizeInBytes = sex.byteLength; 
   let fileSizeInKB = fileSizeInBytes / 1024; 
   let fileSizeInMB = fileSizeInKB / 1024; 
   let size = fileSizeInMB.toFixed(2);    
    
    if (size >= _limit2) {  
    await conn.sendMessage(m.chat, {text: `*❗ el archivo es demasiado pesado*\nDescargue en: ${bochilDownload}`}, {quoted: m});
    enviando = false  
    return    
    }    
      
    if (size >= _limit1 && size <= _limit2) {  
    await conn.sendMessage(m.chat, {document: sex, caption: `*✅ Aqui tienes tu video*`, mimetype: 'video/mp4', fileName: _tetme + `.mp4`}, {quoted: m})
    enviando = false 
    return    
    } else {
    await conn.sendMessage(m.chat, {video: sex, caption: `*✅ Aqui tienes tu video*`, mimetype: 'video/mp4', fileName: _tetme + `.mp4`,  contextInfo: { externalAdReply: { 
     title: _tetme, 
     body: `00:00 ━━━━⬤─────── 04:05`, 
     thumbnailUrl: yt_play[0].thumbnail,  
     mediaType: 1, 
     showAdAttribution: true, 
     renderLargerThumbnail: false
     }}} , { quoted: m })      
    enviando = false            
    return    
    }
      
   } catch (error) {
     enviando = false
     console.log(error)
     throw `*[❗] Error, no fue posible descargar el video.*`
     throw new Error(error)
  }
  }
  break
  
case 'play2': {
 let limit_a1 = 50
 let limit_a2 = 400
 if (!text) throw `*❗No hay cancion o texto para buscar*\n*ejemplo: ${prefix + command} everyone wants to rule the world*`
 try { 
 let { search } = require('./lib/RandomFuctions.js')
 let { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
 let yt_play = await search(args.join(' '))
 let text1 = `*——⌈🔊 YOUTUBE PLAY 🔊⌋——*\n📌 *Titulo*: _${yt_play[0].title}_\n📆 *Publicado*: ${yt_play[0].ago}\n*🔗 Link*: ${yt_play[0].url}`
 conn.sendMessage(m.chat, {image: {url: yt_play[0].thumbnail}, caption: text1 }, {quoted: m})
 let q = '128kbps'
 let v = yt_play[0].url
 let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
 let _tetme = await yt.title
 let size_api = await yt.size
 let bochilDownload = await yt.audio[q].download()
 let sex = await getBuffer(bochilDownload)
 let fileSizeInBytes = sex.byteLength; 
 let fileSizeInKB = fileSizeInBytes / 1024; 
 let fileSizeInMB = fileSizeInKB / 1024; 
 let size = fileSizeInMB.toFixed(2);    
     if (size >= limit_a2) {   
     await conn.sendMessage(m.chat, {text: `*[ ✔ ] Descargue su audio en ${bochilDownload}*`}, {quoted: m}); 
     return     
     }      
     if (size >= limit_a1 && size <= limit_a2) {   
     await conn.sendMessage(m.chat, {document: sex, mimetype: 'audio/mpeg', fileName: _tetme+ `.mp3`}, {quoted: m});    
     return 
     } else { 
     await conn.sendMessage(m.chat, {audio: sex, mimetype: 'audio/mpeg', fileName: _tetme + `.mp3`, contextInfo: { externalAdReply: { 
     title: _tetme, 
     body: "", 
     thumbnailUrl: yt_play[0].thumbnail,  
     mediaType: 1, 
     showAdAttribution: true, 
     renderLargerThumbnail: true 
     }}} , { quoted: m })
     return     
     }       
 } catch (error) {
 throw `*❗ Hubo un error al descargar música*\n` + error
 }
 }
 break

 /* case 'code': {
  let usedCode = new Set()
  let user = global.db.data.users[m.sender]
  if (usedCode.has(args[0])) {
  m.reply(`*❗Este código ya fue usado por otra persona*`)
  } else {
  if (args[0] == 'test' || args[0] == 'sk_091' || args[0] == 'Newcode890' || args[0] == 'Gatax' || args[0] == 'BbL016JJQBCSr54OwwW0' || args[0] == 'giftkey01389320007' || args[0] == 'kode013923') {
  m.reply(`*🎉 !FELICIDADES!\nHas recibído:\n50000 XP ✨\n500 diamantes 💎\n5000 dolares 💵`)
  user.exp += 50000
  user.limit += 500
  user.money += 5000
  usedCode.add(args[0])
  } else {
  m.reply('❗ Este código *no existe*')
  }
  }
  }
  break */
  
  case 'togif': {
    if (!quoted) throw 'Responde a un sticker animado'
    if (!/webp/.test(mime)) throw `*Responde a un sticker animado*`
    await m.reply(mess.wait)
    let { webp2mp4File } = require('./lib/uploader')
    let media = await conn.downloadAndSaveMediaMessage(quoted)
    let webpToMp4 = await webp2mp4File(media)
    await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, {quoted:m})
    await fs.unlinkSync(media)
    }
    break


  
 
  

  case 'mediafire':
  let { mediafiredl } = require('@bochilteam/scraper')
  if (!text) throw '*❗Ingresa un elnace de mediafire*'
  try {
  let m_sk =  await mediafiredl(text)
  m.reply(`*📦 Nombre:* ${m_sk.filename}\n*📂 Peso:* ${m_sk.filesizeH}\n*📰 Tipo*: ${m_sk.ext}\n*espera a que tu archivo sea enviado*`)
  await conn.sendFile(m.chat, m_sk.url, m_sk.filename, '', m, null, {mimetype: m_sk.ext, asDocument: true}); 
   } catch (error) {
   throw (error + `\n❗ Reportalo al creador`)
   }
   break

   case 'perfil':
   avatar = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')
   let { money, exp, role, limit, level, health, potion } = global.db.data.users[who]
   conn.sendMessage(m.chat, { image: { url: avatar }, caption: `*Perfil de ${await conn.getName(who)}*\n*♥️ Salud: ${health}*\n*⚔️ Rol: ${role}*\n*⬆️ Nivel: ${level}*\n*✨ Exp: ${exp}*\n*💵 Dinero: ${money}*\n*💎 Diamantes: ${limit}*\n*🥤 Pocion: ${potion}*`}, { quoted: fkontak })
   break
   
   case 'emojimix': {
   let [emoji, emojis] = text.split('+')
   if (!emoji) throw `*❗ Ejemplo: ${prefix + command} 😑+😂*`
   if (!emojis) throw `*❗ Ejemplo: ${prefix + command} 😑+😂*`
   resul = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji)}_${encodeURIComponent(emojis)}`)
   for (let res of resul.results) {
   let mi_Media = await conn.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author })
   await fs.unlinkSync(mi_Media)
   }
   }
   break
   case 'ssweb': {
   try {
   if (text) throw '*❗Ingresa un enlace de google*'
   let ss = await (await fetch(`https://image.thum.io/get/fullpage/${text}`)).buffer()
   conn.sendFile(m.chat, ss, '', '', m)
   } catch (error) {
   throw error
   }
   }
   break
   case 'speedtest': {
   let o
   try { 
     o = await execSync('python3 speed.py')
   } catch (e) { 
     o = e
   } finally { 
     const {stdout, stderr} = o 
     if (stdout) m.reply(stdout) 
     if (stderr) m.reply(stderr)
   }
   }
   break

  
  
  

   case 'apostar': {
   this.bet = this.bet ? this.bet : {}
   if (m.sender in this.bet) throw '¡¡Todavía estás apostando, espera hasta que se acabe!!'
   try { 
   let user = global.db.data.users[m.sender]
   let count = (args[0] && number(parseInt(args[0])) ? Math.max(parseInt(args[0]), 1) : /all/i.test(args[0]) ? Math.floor(parseInt(user.money)) : 1) * 1 
   if ((user.money * 1) < count) return m.reply('¡¡No tienes suficiente dinero!!')
   if (!(m.sender in this.bet)) {
   this.bet[m.sender] = {
   sender: m.sender,
   count,
   timeout: setTimeout(() => (m.reply('*se acabo el tiempo*'), delete this.bet[m.sender]), 60000)
   }
   let txt =`¿Estás seguro de que quieres apostar? (si/no)\n\n*Apuesta:* ${count} 💵\n*⏰ Tienes 60 segundos para tomar una decisión*`
   return conn.reply(m.chat, txt, m)
   }
   } catch (e) {
   console.error(e)
   if (m.sender in this.bet) {
   let { timeout } = this.bet[m.sender]
   clearTimeout(timeout)
   delete this.bet[m.sender]
   m.reply('*No elegiste nada*\n*apuesta rechazada*')
   }
   }
    /** 
  * Detect if thats number 
  * @param {Number} x  
  * @returns Boolean 
  */ 
   function number(x = 0) { 
     x = parseInt(x) 
     return !isNaN(x) && typeof x == 'number' 
 }
   }
break

 
   
   
   
   case 'setwelcome': case 'bienvenida': {
   if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
   let chats = global.db.data.chats[m.chat]
   if (!text) throw '*❗ Pon algo para poner una bienvenida*\n*@user* = etiqueta al usuario\n*@subject* = nombre del grupo\n*@desc* = descripción'
   chats.sWelcome = text
   conn.reply(m.chat, '*❗ tu bienvenida fue configurada correctamente*', m)
   }
   break
   case 'setbye': case 'despedida': {
   if (!m.isGroup) return m.reply(mess.group);  
    if (!isBotAdmins) return m.reply(mess.botAdmin);  
    if (!isGroupAdmins) return m.reply(mess.admin);  
   let chats = global.db.data.chats[m.chat]
   if (!text) throw '*❗ Pon algo para poner una despedida*\n*@user* = etiqueta al usuario'
   chats.sBye = text
   conn.reply(m.chat, '*❗ tu bienvenida fue configurada correctamente*', m)
   }
   break
   
   
 case 'lyrics':
 if (!text) throw `*⚠️ que música quieres ${conn.getName(m.sender)}?*\n*ejempo: ${prefix + command} say with me*`
 const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
 const resu = await lyricsv2(text).catch(async _ => await lyrics(text))
 m.reply(`*Titulo: ${resu.title}*\n*Autor: ${resu.author}*\n*link: ${resu.link}*\n*lyrics: ${resu.lyrics}*`)
 break
 case 'image': case 'imagen':
 let { googleImage } = require('@bochilteam/scraper')
 let res = await googleImage(text)
 image = res[Math.floor(Math.random() * res.length)];
 ulr = image
 conn.sendMessage(m.chat, { image: { url: ulr }, caption: botname }, { quoted: fkontak })
 break
 
 
 case 'setcmd':  case 'addcmd': {
                if (!m.quoted) throw '*❗ Etiqueta un Sticker*'
                if (!m.quoted.fileSha256) throw '*❗ Etiqueta un Sticker*'
                if (!text) throw '*Que comando vas a añadir?*'
                let sticker = global.db.data.sticker
                let hash = m.quoted.fileSha256.toString('base64'); 
                sticker[hash] = {text, mentionedJid: m.mentionedJid, creator: m.sender, at: + new Date, locked: false};
                m.reply('*✅ Hecho*')
                }
            break
            case 'delcmd': {
                let hash = m.quoted.fileSha256.toString('base64')
                if (!hash) throw '*Este id de sticker no existe*'
                if (global.db.data.sticker[hash] && global.db.data.sticker[_sh].locked) throw '*❌ No tienes permiso de eliminar este comando*'        
                delete global.db.data.sticker[hash]
                m.reply('*✅ Hecho*')
                }
            break
            case 'listcmd': {
                let _teks = `*Lista de comandos*\n*⚠️ Info los stickers con bold estan bloqueados!!*\n${Object.entries(global.db.data.sticker).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`).join('\n')}`.trim()
                conn.sendText(m.chat, _teks, m, { mentions: Object.values(global.db.data.sticker).map(x => x.mentionedJid).reduce((a,b) => [...a, ...b], []) })
                }
            break
            case 'lockcmd':  {
                if (!isCreator) throw mess.owner
                if (!m.quoted) throw '*❗Etiqueta un sticker*'
                if (!m.quoted.fileSha256) throw '*❗Etiqueta un sticker*'
                let hash = m.quoted.fileSha256.toString('base64')
                if (!(hash in global.db.data.sticker)) throw '*❗Este sticker no esta en mi base de datos*'
                global.db.data.sticker[hash].locked = !/^un/i.test(command)
                m.reply('*✅ Hecho*')
                }
            break
            


    
  
  case 'ping':  
    var timestamp = speed();  
    var latensi = speed() - timestamp  
    conn.sendMessage(m.chat, { text: `*Pong 🏓  ${latensi.toFixed(4)}*` }, { quoted: m});  
    break  
  
          case 'update':  
            if (!isCreator) return conn.sendMessage(m.chat, { text: mess.owner }, { quoted: m});  
           try {  
           let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))  
            await conn.sendMessage(m.chat, { text: stdout.toString() }, { quoted: m});  
          } catch {  
           let updatee = execSync('git remote set-url origin https://github.com/Skidy89/skid-bot && git pull')  
            await conn.sendMessage(m.chat, { text: updatee.toString() }, { quoted: m});  
         }  
           break  
  
         case 'simi': case 'bot': {
          if (!text) return conn.sendMessage(m.chat, { text: `*Dime algo para hablar contigo (sim simi) ♡*` }, { quoted: m});  
          await conn.sendPresenceUpdate('composing', m.chat);  
            let anu = await fetchJson(`https://api.simsimi.net/v2/?text=${text}&lc=es&cf=false`);  
            let res = anu.success;  
            m.reply(res)
            }
         break  
  
          case 'ia': {
          if (!text) return m.reply(`*ingresa un texto para hablar con chatgpt ♡*`)
          try {     
         let tioress = await fetch(`https://api.lolhuman.xyz/api/openai-turbo?apikey=${lolkeysapi}&text=${text}`) 
         let hasill = await tioress.json() 
         m.reply(`${hasill.result}`.trim())    
         } catch {
         let mygpt = await fetch(`https://vihangayt.me/tools/chatgpt4?q=${text}`)
         let _result = await mygpt.json()
         m.reply(`${_result.data}`)
        }
        }
         break
         
         case 'whatmusic': {
         let acrcloud = require('acrcloud')
         const acr = new acrcloud({ 
   host: 'identify-eu-west-1.acrcloud.com', 
   access_key: 'c33c767d683f78bd17d4bd4991955d81', 
   access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu', 
 }); 
  
   
   if (/audio|video/.test(mime)) {
     if ((quoted.msg || quoted).seconds > 20) return m.reply('El archivo que carga es demasiado grande, le sugerimos que corte el archivo grande a un archivo más pequeño, 10-20 segundos Los datos de audio son suficientes para identificar'); 
     let media = await quoted.download(); 
     let ext = mime.split('/')[1]; 
     fs.writeFileSync(`./temp/${m.sender}.${ext}`, media); 
     let  res = await acr.identify(fs.readFileSync(`./temp/${m.sender}.${ext}`)); 
     let {code, msg} = res.status; 
     if (code !== 0) throw msg; 
     let {title, artists, album, genres, release_date} = res.metadata.music[0]; 
     let txt = ` 
 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂 𝙳𝙴 𝙻𝙰 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰 
  
 • 📌 𝚃𝙸𝚃𝚄𝙻𝙾: ${title} 
 • 👨‍🎤 𝙰𝚁𝚃𝙸𝚂𝚃𝙰: ${artists !== undefined ? artists.map((v) => v.name).join(', ') : 'No encontrado'} 
 • 💾 𝙰𝙻𝙱𝚄𝙼: ${album.name || 'No encontrado'} 
 • 🌐 𝙶𝙴𝙽𝙴𝚁𝙾: ${genres !== undefined ? genres.map((v) => v.name).join(', ') : 'No encontrado'} 
 • 📆 𝙵𝙴𝙲𝙷𝙰 𝙳𝙴 𝙻𝙰𝙽𝚉𝙰𝙼𝙸𝙴𝙽𝚃𝙾: ${release_date || 'No encontrado'} 
 `.trim(); 
     m.reply(txt); 
   } else throw '*[❗𝐈𝐍𝐅𝐎❗] 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰 𝚄𝙽 𝙰𝚄𝙳𝙸𝙾*'; 
 }
 break
         
          case 'pinterest':  
          if (!text) return m.reply('𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚙𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝')  
          m.reply(mess.wait)  
          lol = await pinterest(text) //.catch(m.reply)  
          result = lol[Math.floor(Math.random() * lol.length)];  
          sendImageAsUrl(result, `*-------「 PINTEREST 」-------*\n🤠 busqueda de ${text}\n🔗 url ${result}`)  
          break  
  
  

  
 
			
		  
		  
		    case 'blackpink':
    		case 'neon':
	    	case 'greenneon':
	    	case 'advanceglow':
    		case 'futureneon':
	    	case 'sandwriting':
       		case 'sandsummer':
	    	case 'sandengraved':
    		case 'metaldark':
    		case 'neonlight':
    		case 'holographic':
    		case 'text1917':
    		case 'minion':
	    	case 'deluxesilver':
    		case 'newyearcard':
	    	case 'bloodfrosted':
		    case 'halloween':
		    case 'jokerlogo':
		    case 'fireworksparkle':
		    case 'natureleaves':
		    case 'bokeh':
		    case 'toxic':
		    case 'strawberry':
		    case 'box3d':
		    case 'roadwarning':
		    case 'breakwall':
		    case 'icecold':
		    case 'luxury':
		    case 'cloud':
		    case 'summersand':
		    case 'horrorblood':
		    case 'thunder':
			if (args.length == 0) return m.reply(`Ejemplo de uso: ${prefix + command} ${botname}`)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${command}?apikey=${lolkeysapi}&text=${text}` } })
			break
			case 'wetglass':
		    case 'multicolor3d':
    		case 'watercolor':
    		case 'luxurygold':
    		case 'galaxywallpaper':
    		case 'lighttext':
    		case 'beautifulflower':
    		case 'puppycute':
    		case 'royaltext':
    		case 'heartshaped':
    		case 'birthdaycake':
    		case 'galaxystyle':
    		case 'hologram3d':
    		case 'greenneon':
    		case 'glossychrome':
    		case 'greenbush':
    		case 'metallogo':
	    	case 'noeltext':
    		case 'glittergold':
    		case 'textcake':
	    	case 'starsnight':
	    	case 'wooden3d':
	    	case 'textbyname':
	    	case 'writegalacy':
    		case 'galaxybat':
    		case 'snow3d':
    		case 'birthdayday':
    		case 'goldplaybutton':
    		case 'silverplaybutton':
    		case 'freefire':
			if (args.length == 0) return m.reply(`Ejemplo: ${prefix + command} skid bot`)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${lolkeysapi}&text=${text}` } })
			break
			case 'shadow':
	    	case 'cup':
    		case 'cup1':
    		case 'romance':
    		case 'smoke':
    		case 'burnpaper':
    		case 'lovemessage':
    		case 'undergrass':
    		case 'love':
    		case 'coffe':
    		case 'woodheart':
	    	case 'woodenboard':
	    	case 'summer3d':
	    	case 'wolfmetal':
    		case 'nature3d':
    		case 'underwater':
    		case 'golderrose':
    		case 'summernature':
    		case 'letterleaves':
	    	case 'glowingneon':
	    	case 'fallleaves':
	    	case 'flamming':
	    	case 'harrypotter':
	    	case 'carvedwood':
			if (args.length == 0) return m.reply(`Ejemplo de uso: ${prefix + command} ${botname}`)
			conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/photooxy1/${command}?apikey=${lolkeysapi}&text=${text}` }}, {quoted: m })
			break
          case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':  
                  try {  
                  let set  
                  if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'  
                  if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'  
                  if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'  
                  if (/earrape/.test(command)) set = '-af volume=12'  
                  if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'  
                  if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'  
                  if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'  
                  if (/reverse/.test(command)) set = '-filter_complex "areverse"'  
                  if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'  
                  if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'  
                  if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'  
                  if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'  
                  if (/audio/.test(mime)) {  
                  let media = await conn.downloadAndSaveMediaMessage(quoted)  
                  let ran = getRandom('.mp3')  
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {  
                  fs.unlinkSync(media)  
                  if (err) return m.reply(err)  
                  let buff = fs.readFileSync(ran)  
                  conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })  
                  fs.unlinkSync(ran)  
                  })  
                  } else m.reply(`Reply to the audio you want to change with a caption *${prefix + command}*`)  
                  } catch (e) {  
                  m.reply(`hubo un error... ${e}`)  
                  }  
                  break    
                  case 'toaudio': case 'tomp3': {
                  if (!/video/.test(mime) && !/audio/.test(mime)) throw `*❗ Etiqueta un audio con ${prefix + command}*`
                  if (!quoted) throw `*❗ Etiqueta un audio con ${prefix + command}*`
                  let { toAudio } = require('./lib/converter.js')
                  let media  = await conn.downloadMediaMessage(quoted)
                  let audio = await toAudio(media, 'mp4')
                  await conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg', contextInfo:{  externalAdReply: { showAdAttribution: true,
                  mediaType:  1,
                  mediaUrl: 'https://github.com/Skidy89',
                  title: global.botname,
                  sourceUrl: `https://github.com/Skidy89`, 
                  thumbnail: global.success
                  }}}, { quoted: m })
                  }
                  break
       
		
		
		
                 


		    
	    	case 'lewd':
	    	case 'feed':
	    	case 'gasm':
	    	case 'anal':
	    	case 'holo':
	    	case 'tits':
	    	case 'kuni':
	    	case 'kiss':
    		case 'erok':
	    	case 'smug':
	    	case 'solog':
	    	case 'feetg':
	    	case 'lewdk':
	    	case 'waifu':
	    	case 'pussy':
	    	case 'femdom':
	    	case 'cuddle':
	    	case 'eroyuri':
	    	case 'cum_jpg':
	    	case 'blowjob':
		    case 'holoero':
		    case 'erokemo':
		    case 'fox_girl':
		    case 'futanari':
		    if (!m.isGroup) return m.reply(mess.group)
		    if (!global.db.data.chats[m.chat].antiNsfw) return m.reply(`*el comando ${command} no esta activado en este grupo*\n*usa ${prefix}enable antinsfw*`)
	        sendImageAsUrl(`https://api.lolhuman.xyz/api/random2/${command}?apikey=${lolkeysapi}`, `*🔥 ${command} 🔥*`)
		    break
		    
		    case 'rule34':
		    if (!text) throw 'ingresa algo a buscar'
		    if (!m.isGroup) throw '_*este comando solo puede ser utilizado en grupos*_'
		    if (!global.db.data.chats[m.chat].antiNsfw) return conn.sendCart(m.chat, `*el comando ${command} no esta activado en este grupo*\n*usa ${prefix}enable antinsfw*`, global.query, botname)
		    url = await `https://delirius-nsfw.onrender.com/h/image/search?q=${text}`
		    _url = await url[Math.floor(Math.random() * url.length)]
		    searching = _url
		    await conn.sendMessage(m.chat, { image: { url: searching }, caption: `🔥 _${text}_ 🔥` }, { quoted: fpay })
		    break
		
		    case 'enable': {
			let inChat = global.db.data.chats[m.chat] // inChat database ?
			let inBot = global.db.data.settings[conn.user.jid] // inBot database ?
			let inEnable = (args[0] || '').toLowerCase() // args ?
			let actived = `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}enable ${inEnable}*`
			let inSuccess = `*el ${inEnable} fue activado en este grupo*`
			let inBotSuccess = `*el ${inEnable} fue activado en este bot*`
			switch (inEnable) { // inEnable ? inEnable : commands
			case 'antidelete':
	        if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
            if (inChat.antidelete) return conn.sendCart(m.chat, actived, global.query, botname)
            inChat.antidelete = true
            conn.sendCart(m.chat, inSuccess, success)
            break
            case 'antiviewonce':
	        if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
            if (inChat.antiviewonce) return conn.sendCart(m.chat, actived, global.query, botname)
            inChat.antiviewonce = true
            conn.sendCart(m.chat, inSuccess, success)
            break
			case 'antilink':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.antilink) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, global.query, botname)
			inChat.antilink = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antinsfw':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.antiNsfw) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, global.query, botname)
			inChat.antiNsfw = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'detect':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.autoDetect) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.autoDetect = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antifakes':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.antiFake) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.antiFake = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'audios':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.audios) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.audios = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antiarabes':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.antiArabe) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.antiArabe = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'welcome':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.welcome) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.welcome = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'modoadmin':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!inChat.modeAdmin) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inChat.modeAdmin = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antillamadas':
			if (!conn.user.jid) return conn.sendCart(m.chat, `*solo un bot/subbot puede usar este comando*`, query)
			if (inChat.antiCall) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inBot.antiCall = true
			conn.sendCart(m.chat, inBotSuccess, success)
			break
			case 'jadibot':
			if (!isCreator) return conn.sendCart(m.chat, mess.owner, success)
			if (inBot.jadibot) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, query)
			inBot.jadibot = true
			conn.sendCart(m.chat, inBotSuccess, success)
			break
			default:
	        
			
			}
			}
			break
			
			case 'disable': {
			let Chat = global.db.data.chats[m.chat] // Chat database ?
			let Bot = global.db.data.settings[conn.user.jid] // Bot database ?
			let inDisable = (args[0] || '').toLowerCase() // args ?
			let disable = `*el ${inDisable} ya esta desactivado!!*\n*puedes activarlo con ${prefix}enable ${inDisable}*`
			let inSuccessDisable = `*el ${inDisable} fue desactivado en este grupo*`
			let inBotDisable = `*el ${inDisable} fue desactivado en este bot*`
			switch (inDisable) { // inDisable ? inDisable : commands
			
			case 'antilink':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);  
			if (!Chat.antilink) return conn.sendCart(m.chat, disable, global.query, botname)
			Chat.antilink = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antiviewonce':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);  
			if (!Chat.antiviewonce) return conn.sendCart(m.chat, disable, global.query, botname)
			Chat.antiviewonce = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antinsfw': case 'antiporno':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);  
			if (!Chat.antiNsfw) return conn.sendCart(m.chat, disable, global.query, botname)
			Chat.antiNsfw = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'detect':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!Chat.autoDetect) return conn.sendCart(m.chat, disable, query)
			Chat.autoDetect = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antidelete':
	        if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
            if (chat.antidelete) return conn.sendCart(m.chat, disable, global.query, botname)
            Chat.antidelete = false
            conn.sendCart(m.chat, inSuccessDisable, success)
            break
			case 'antifakes':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!Chat.antiFake) return conn.sendCart(m.chat, disable, query)
			Chat.antiFake = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'audios':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!Chat.audios) return conn.sendCart(m.chat, disable, query)
			Chat.audios = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antiarabes':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!Chat.antiArabe) return conn.sendCart(m.chat, disable, query)
			Chat.antiArabe = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'welcome':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!Chat.welcome) return conn.sendCart(m.chat, disable, query)
			Chat.welcome = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'modoadmin':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (!Chat.modeAdmin) return conn.sendCart(m.chat, disable, query)
			Chat.modeAdmin = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antillamadas':
			if (!conn.user.jid) return conn.sendCart(m.chat, `*solo un bot/subbot puede usar este comando*`, query)
			if (!Bot.antiCall) return conn.sendCart(m.chat, disable, query)
			Bot.antiCall = false
			conn.sendCart(m.chat, inBotDisable, success)
			break
			case 'jadibot':
			if (!isCreator) return conn.sendCart(m.chat, mess.owner, success)
			if (!Bot.jadibot) return conn.sendCart(m.chat, disable, query)
			Bot.jadibot = false
			conn.sendCart(m.chat, inBotDisable, success)
			break
			default:
	        
			
			}
			} 
			break
			

    
			

            case 'inspeccionar': case 'vergrupo': {
    let linkRegex = args.join(" ")
    let textt = ``
    let coded = linkRegex.split("https://chat.whatsapp.com/")[1]
    if (!coded) return m.reply("Link Invalid")
    conn.query({
    tag: "iq",
    attrs: {
    type: "get",
    xmlns: "w:g2",
    to: "@g.us"
    },
    content: [{ tag: "invite", attrs: { code: coded } }]
    }).then(async(res) => { 
    textt = `「 inspector de grupos」
▸ Nombre del grupo: ${res.content[0].attrs.subject ? res.content[0].attrs.subject : "undefined"}

▸ Descripción: ${res.content[0].attrs.s_t ? moment(res.content[0].attrs.s_t *1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Creador del grupo: ${res.content[0].attrs.creator ? "@" + res.content[0].attrs.creator.split("@")[0] : "undefined"}
▸ Grupo creado: ${res.content[0].attrs.creation ? moment(res.content[0].attrs.creation * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Miembros: ${res.content[0].attrs.size ? res.content[0].attrs.size : "undefined"} Miembros

▸ ID: ${res.content[0].attrs.id ? res.content[0].attrs.id : "undefined"}

${botname}`
    try {
    pp = await conn.profilePictureUrl(res.content[0].attrs.id + "@g.us", "image")
    } catch {
    pp = "https://tse2.mm.bing.net/th?id=OIP.n1C1oxOvYLLyDIavrBFoNQHaHa&pid=Api&P=0&w=153&h=153"
    }
    conn.sendMessage(m.chat, { text: textt }, { quoted: m })
    })
    }
    break
    
    case 'casino': {
    this.slots = this.slots ? this.slots :{}
    if (m.chat in this.slots) {
    m.reply('*Todavía hay gente jugando al casino aquí, espera hasta que termine* -_-')
    } else {
    this.slots[m.chat] = true
    }
    try {
    
        if (args.length < 1) return m.reply(`*Creo que no sabes usar el comando* -_-\n*Te dare un ejemplo*\n*${prefix + command} 10*`)
        let count = args[0]
        if (global.db.data.users[m.sender].money > count) { 
        let _spin1 = pickRandom(['1', '2', '3', '4', '5']) 
        let _spin2 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin3 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin4 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin5 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin6 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin7 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin8 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin9 = pickRandom(['1', '2', '3', '4', '5'])
        let spin1 = (_spin1 * 1)
        let spin2 = (_spin2 * 1)
        let spin3 = (_spin3 * 1)
        let spin4 = (_spin4 * 1)
        let spin5 = (_spin5 * 1)
        let spin6 = (_spin6 * 1)
        let spin7 = (_spin7 * 1)
        let spin8 = (_spin8 * 1)
        let spin9 = (_spin9 * 1)
        let spins1 = (spin1 == 1 ? '🍊' : spin1 == 2 ? '🍇' : spin1 == 3 ? '🍉' : spin1 == 4 ? '🍌' : spin1 == 5 ? '🍍' : '')
        let spins2 = (spin2 == 1 ? '🍊' : spin2 == 2 ? '🍇' : spin2 == 3 ? '🍉' : spin2 == 4 ? '🍌' : spin2 == 5 ? '🍍' : '')
        let spins3 = (spin3 == 1 ? '🍊' : spin3 == 2 ? '🍇' : spin3 == 3 ? '🍉' : spin3 == 4 ? '🍌' : spin3 == 5 ? '🍍' : '')
        let spins4 = (spin4 == 1 ? '🍊' : spin4 == 2 ? '🍇' : spin4 == 3 ? '🍉' : spin4 == 4 ? '🍌' : spin4 == 5 ? '🍍' : '')
        let spins5 = (spin5 == 1 ? '🍊' : spin5 == 2 ? '🍇' : spin5 == 3 ? '🍉' : spin5 == 4 ? '🍌' : spin5 == 5 ? '🍍' : '')
        let spins6 = (spin6 == 1 ? '🍊' : spin6 == 2 ? '🍇' : spin6 == 3 ? '🍉' : spin6 == 4 ? '🍌' : spin6 == 5 ? '🍍' : '')
        let spins7 = (spin7 == 1 ? '🍊' : spin7 == 2 ? '🍇' : spin7 == 3 ? '🍉' : spin7 == 4 ? '🍌' : spin7 == 5 ? '🍍' : '')
        let spins8 = (spin8 == 1 ? '🍊' : spin8 == 2 ? '🍇' : spin8 == 3 ? '🍉' : spin8 == 4 ? '🍌' : spin8 == 5 ? '🍍' : '')
        let spins9 = (spin9 == 1 ? '🍊' : spin9 == 2 ? '🍇' : spin9 == 3 ? '🍉' : spin9 == 4 ? '🍌' : spin9 == 5 ? '🍍' : '' )
        let user = global.db.data.users[m.sender]
        let WinOrLose, money
        if (spin1 == spin2 && spin2 == spin3 && spin3 == spin4 && spin4 == spin5 && spin5 == spin6 && spin6 == spin7 && spin7 == spin8 && spin8 == spin9) {
            WinOrLose = '*Gran JACKPOT🥳🥳*'
            money = `+${Math.ceil(count * 4)}`
            user.money += Math.ceil(count * 4)
        } else if (spin4 == spin5 && spin5  == spin6) {
           WinOrLose = '*JACKPOT🥳*' 
           money = `+${Math.ceil(count * 2)}`
           user.money += Math.ceil(count * 2)
        } else if ((spin1 == spin2 && spin2 == spin3) || (spin7 == spin8 && spin8 == spin9)) {  
            money = `-${Math.ceil(count * 1)}`
            WinOrLose = '*UN POCO MÁS!!*'
        } else {
             money = `-${Math.ceil(count * 1)}`
             WinOrLose = '*Perdiste* T_T'
             user.money -= Math.ceil(count * 1)
        } 
        conn.sendText(m.chat, `
       *casino*

${spins1}|${spins2}|${spins3}
${spins4}|${spins5}|${spins6}
${spins7}|${spins8}|${spins9}

${WinOrLose} dinero *${money}*
`, m)
} else { 
m.reply(`*No tienes ${count} para apostar en el casino*`)
}
    } catch (e) {
        console.log(e)
        m.reply(`${e}`)
    } finally {
        delete this.slots[m.chat]
    }
    function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
  }
  
}
break



    

// case?



    
          default: 
          
              if (body.startsWith('>')) {  
                  if (!isCreator) return  
                  try {  
                      return m.reply(JSON.stringify(eval(body.slice(2)), null, '\t'))  
                  } catch (e) {  
                      e = String(e)  
                      m.reply(e)  
                  }  
              }  
              if (body.startsWith('=>')) {  
                  if (!isCreator) return  
                  try {  
                      return  m.reply(JSON.stringify(eval(`(async () => { ${body.slice(3)} })()`), null, '\t'))   
                  } catch (e) {  
                      e = String(e)  
                      m.reply(e)  
                  }  
              }  
              if (body.startsWith('$')) {  
                  if (!isCreator) return  
                  try {  
                      return m.reply(String(execSync(body.slice(2), { encoding: 'utf-8' })))  
                  } catch (e) {  
                      e = String(e)  
                      m.reply(e)  
                  }  
              }
         
     if (/^hola$/i.test(m.text)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Hola.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   }
  
   if (body.match(/(anadieleimporta|a nadie le importa)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/dylan1.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(araara|ara ara)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Ara.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(miarda de bot|mierda de bot|mearda de bot|Miarda de Bot|Mierda de Bot|Mearda de Bot)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/insultar.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(bañate|Bañate)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Banate.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(baneado|Baneado)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/baneado.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(bebito fiu fiu|bff|Bebito Fiu Fiu|Bff)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/bff.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(buenas noches|Buenas noches|Boanoite|boanoite)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/boanoite.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(buenas tardes|Buenas tardes|boatarde|Boatarde)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/boatarde.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(buenos dias|Buenos dias|buenos dias|Buenos dias)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Buenos-dias-2.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(chica lgante|Chica lgante|Chicalgante|chicalgante|chical gante|Chical gante)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/chica lgante.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(giagnosticadocongay|diagnosticado con gay|diagnosticado gay|te diagnÃ³stico con gay|diagnÃ³stico gay|te diagnostico con gay|te diagnÃ³stico con gay|te diagnosticÃ³ con gay|te diagnostico con gay)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/DiagnosticadoConGay.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(es puto|eeesss putoo|es putoo|esputoo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Es putoo.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(feliz cumpleaños|felizcumpleaños|happy birthday)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Feliz cumple.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Fiesta del admin|fiesta del admin)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/admin.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(fiesta del administrador)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/fiesta.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(fiesta del admin 3|atencion grupo|atencion grupo|aviso importante|fiestadeladmin3)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Fiesta1.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(gemidos|gemime|gime|gemime|gemi2)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/gemi2.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(audio hentai|Audio hentai|audiohentai|Audiohentai)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/hentai.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(sexo|Sexo|Hora de sexo|hora de sexo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/maau1.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(laoracion|La biblia|La oracion|La biblia|La oracion|la biblia|La Biblia)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/ora.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Marica tu|cancion1|Marica quien)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/cancion.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(MuriÃ³ el grupo|Murio el grupo|murio el grupo|muriò el grupo|Grupo muerto|grupo muerto)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Murio.m4a'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/navidad.m4a'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(noche de paz|Noche de paz|Noche de amor|noche de amor|Noche de Paz)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Noche.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/otaku.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(ho me vengo|oh me vengo|o me vengo|Ho me vengo|Oh me vengo|O me vengo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/vengo.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(oni-chan|onichan|o-onichan)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Onichan.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Pasa pack|vendes tu nudes|pasa video hot|pasa tu pack|pasa fotos hot|vendes tu pack|Vendes tu pack|Vendes tu pack?|vendes tu pack|Pasa Pack Bot|pasa pack Bot|pasa tu pack Bot|PÃ¡same tus fotos desnudas|pÃ¡same tu pack|me pasas tu pak|me pasas tu pack|pasa pack)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Elmo.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(QuiÃ©n es tu senpai botsito 7u7|Quien es tu senpai botsito 7u7|QuiÃ©n es tu sempai botsito 7u7|Quien es tu sempai botsito 7u7|QuiÃ©n es tu senpai botsito 7w7|Quien es tu senpai botsito 7w7|quiÃ©n es tu senpai botsito 7u7|quien es tu senpai botsito 7u7|QuiÃ©n es tu sempai botsito 7w7|Quien es tu sempai botsito 7w7|QuiÃ©n es tu senpai botsito|Quien es tu senpai botsito|QuiÃ©n es tu sempai botsito|Quien es tu sempai botsito|QuiÃ©n es tu senpai botsito|Quien es tu senpai botsito|quiÃ©n es tu senpai botsito|quien es tu senpai botsito|QuiÃ©n es tu sempai botsito|Quien es tu sempai botsito)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Tu.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/rawr.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/siu.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(te amo|teamo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Te-amo.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(ooo tio|tio que rico)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/oh_tio.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(un Pato| un pato|un pato que va caminando alegremente|Un pato|Un Pato)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/pato.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(UwU|uwu|Uwu|uwU|UWU)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/UwU.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(vetealavrg|vete a la vrg|vete a la verga)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/vete a la verga.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(fiesta viernes|viernes|Viernes|viernes fiesta)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/viernes.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(vivan!!|vivan los novios|vivanlosnovios)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/vivan.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Yamete|yamete|Yamete kudasai|yamete kudasai)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Yamete-kudasai.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(epico|esto va a ser epico)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/Epico.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(shitpost)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/shitpost.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(no digas eso papu)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return; 
     const vn = './audios/nopapu.mp3'; 
     conn.sendAudio(m.chat, vn, m)
   }
              
          
  
          
          }
        } catch (e) {
   let sktext = util.format(e)
   m.reply(sktext)
   }
          
  
  }
  
  let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(chalk.redBright(`Update ${__filename}`))  
  delete require.cache[file]  
  require(file)  
  })