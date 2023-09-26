// no es literalmente un handler pero maneja los eventos de baileys
const { smsg, sleep, makeWaSocket, protoType, serialize, getGroupAdmins }= require('./lib/fuctions')
const { areJidsSameUser, useMultiFileAuthState, DisconnectReason, proto, jidNormalizedUser, WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys")
const gradient = require('gradient-string')
const store = require('./lib/store.js')
const fs = require('fs')
const { watchFile, unwatchFile } = require('fs')
const fetch = require('node-fetch')
const chalk = require('chalk')

async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  this.uptime = this.uptime || Date.now()
  if (!chatUpdate) {
    return
  }
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m) {
    return
  }
  try {
  m = smsg(this, m) || m
    if (!m) {
      return
    }
    if (opts['pconly'] && m.chat.endsWith('g.us')) {
      return
    }
    if (opts['gconly'] && !m.chat.endsWith('g.us')) {
      return
    }
    if (opts['swonly'] && m.chat !== 'status@broadcast') {
      return
    }
    
  var budy = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
  if (m.key.id.startsWith("BAE5")) return  
  var body = (typeof m.text == 'string' ? m.text : '') 
  const msgs = (message) => { 
  if (message.length >= 10) { 
  return `${message.substr(0, 500)}` 
  } else { 
  return `${message}`}}
  
  const isCmd = body.startsWith(global.prefix)   
  const from = m.chat 
  const msg = JSON.parse(JSON.stringify(m, undefined, 2)) 
  const content = JSON.stringify(m.message) 
  const type = m.mtype 
  const arg = body.substring(body.indexOf(' ') + 1) 
  const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
  const args = body.trim().split(/ +/).slice(1) 
  const q = args.join(" ") 
  let t = m.messageTimestamp 
  const pushname = m.pushName || "Sin nombre" 
  const _isBot = this.user.jid
  const userSender = m.key.fromMe ? _isBot : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid  
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
  const itsMe = m.sender == this.user.id ? true : false 
  const text = args.join(" ") 
  const quoted = m.quoted ? m.quoted : m 
  const sender = m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid 
  const mime = (quoted.msg || quoted).mimetype || ''  
  const isMedia = /image|video|sticker|audio/.test(mime)
  const mentions = []  

  const groupMetadata = m.isGroup ? await this.groupMetadata(from) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  
  const isBotAdmins = m.isGroup ? groupAdmins.includes(_isBot) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false 
  const isBaneed = m.isGroup ? blockList.includes(userSender) : false 
  const isPremium = m.isGroup ? premium.includes(userSender) : false   
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
  
  
  const isAudio = type == 'audioMessage' // Mensaje de Audio  
  const isSticker = type == 'stickerMessage' // Mensaje de Sticker  
  const isContact = type == 'contactMessage' // Mensaje de Contacto  
  const isLocation = type == 'locationMessage' // Mensaje de Localización   
  const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')  
  const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')  
  const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')  
  const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')  
  const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')  
  const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message') // Mensaje citado de cualquier tipo  
  const isViewOnce = (type === 'viewOnceMessage') // Verifica si el tipo de mensaje es (mensaje de vista única)
        
        
  
    if (!this.public && m.key.fromMe) {
    return
    }
    if (typeof m.text !== 'string') {
      m.text = ''
    }
    if (m.isBaileys) {
      return
    }
  if (!this.public && !m.key.fromMe && chatUpdate.type === 'notify') return
  try {
  let isNumber = x => typeof x === 'number' && !isNaN(x)  // NaN in number?
  let user = global.db.data.users[m.sender]  
  if (typeof user !== 'object') global.db.data.users[m.sender] = {}  
  if (user) { 
  if (!('registered' in user)) 
     user.registered = false // register
     if (!user.registered) { 
     if (!('name' in user)) 
     user.name = this.user.name
     if (!isNumber(user.age)) 
     user.age = -1 
     if (!isNumber(user.regTime)) 
     user.regTime = -1 
  }
  if (!isNumber(user.afkTime)) user.afkTime = -1  
  if (!('afkReason' in user)) user.afkReason = ''  
  if (!isNumber(user.limit)) user.limit = 20  
  if(!isNumber(user.money)) user.money = 100  
  if(!isNumber(user.health)) user.health = 100  
  if(!isNumber(user.warn)) user.warn = 0  
  if(!isNumber(user.exp)) user.exp = 100
  if(!isNumber(user.role)) user.role = '🍱 Novato I'
  if(!isNumber(user.level)) user.level = 0
  if(!isNumber(user.armor)) user.armor = 0
  if(!isNumber(user.sword)) user.sword = 0
  if(!isNumber(user.pickaxe)) user.pickaxe = 0
  if(!isNumber(user.axe)) user.axe = 0
  if(!isNumber(user.gems)) user.gems = 0
  if(!isNumber(user.gold)) user.gold = 0
  if(!isNumber(user.copper)) user.copper = 0
  if(!isNumber(user.diamonds)) user.diamonds = 0
  if(!isNumber(user.swordDurability)) user.swordDurability = 100
  if(!isNumber(user.pickaxeDurability)) user.pickaxeDurability = 100
  if(!isNumber(user.axeDurability)) user.axeDurability = 100
  if(!isNumber(user.armorDurability)) user.armorDurability = 100
  if(!isNumber(user.lastMining)) user.lastMining = 0
  if(!isNumber(user.potion)) user.potion = 0
  if(!isNumber(user.rock)) user.rock = 0
  if(!isNumber(user.iron)) user.iron = 0
  if(!isNumber(user.trash)) user.trash = 0
  if(!isNumber(user.lastClaim)) user.lastClaim = 0
  if(!isNumber(user.common)) user.common = 0
  if(!isNumber(user.rare)) user.rare = 0
  if(!isNumber(user.lastmiming)) user.lastmiming = 0
  if(!isNumber(user.weekly)) user.weekly = 0
  if(!isNumber(user.monthly)) user.monthly = 0
  if(!isNumber(user.dog)) user.dog = 0
  if(!isNumber(user.cat)) user.cat = 0
  if(!isNumber(user.multiplier)) user.multiplier = 0
  if(!isNumber(user.lastgift)) user.lastgift = 0
   } else global.db.data.users[m.sender] = {  
  afkTime: -1,  
  afkReason: '',  
  limit: 20,  
  money: 100,  
  health: 100,  
  warn: 0, 
  exp: 100,
  role: '🍱 Novato I',
  level: 1,
  armor: 0,
  sword: 0,
  pickaxe: 0,
  axe: 0,
  gems: 0,
  gold: 0,
  copper: 0,
  diamonds: 0,
  swordDurability: 100,
  pickaxeDurability: 100,
  axeDurability: 100,
  armorDurability: 100,
  lastMining: 0,
  potion: 0,
  rock: 0,
  iron: 0,
  trash: 0,
  lastClaim: 0,
  common: 0,
  rare: 0,
  lastmiming: 0,
  weekly: 0,
  monthly: 0,
  dog: 0,
  cat: 0,
  multiplier: 0,
  }  
  
  let chats = global.db.data.chats[m.chat]  
  if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}  
  if (chats) {  
  if (!('antilink' in chats)) chats.antilink = false  
  if (!('isBanned' in chats)) chats.isBanned = false  
  if (!('modeadmin' in chats)) chats.modeadmin = false  
  if (!('welcome' in chats)) chats.welcome = false
  if (!('audios' in chats)) chats.audios = false
  if (!('antiNsfw' in chats)) chats.welcome = false  
  if (!('antiFake' in chats)) chats.antiFake = false
  if (!('antiArabe' in chats)) chats.antiArabe = false
  if (!('autoDetect' in chats)) chats.autoDetect = false 
  if (!('antiBadWord' in chats)) chats.antiBadWord = false
  if (!('detect2' in chats)) chats.detect2 = false
  if (!('sWelcome' in chats)) chatssWelcome = ''
  if (!('sBye' in chats)) chats.sBye = ''
  if (!('sPromote' in chats)) chats.sPromote = ''
  if (!('sDemote' in chats)) chats.sDemote = ''
  if (!('antidelete' in chats)) chats.antidelete = false
  if (!('antiviewonce' in chats)) chats.antiviewonce = false
  } else global.db.data.chats[m.chat] = {  
  antilink: false,  
  isBanned: false,   
  modeAdmin: false,  
  welcome: false,  
  audios: false,
  antiNsfw: false,  
  audios: false,
  antiFake: false,
  antiArabe: false,
  autoDetect: false,
  antiBadWord: false,
  detect2: false,
  sWelcome: '',
  sBye: '',
  sPromote: '',
  sDemote: '',
  antidelete: false,
  antiviewonce: false,
  }
  
  let setting = global.db.data.settings[this?.user?.jid]
  if (typeof setting !== 'object') global.db.data.settings[this?.user?.jid] = {}  
  if (setting) {  
  if (!isNumber(setting.status)) setting.status = 0  
  if (!('autobio' in setting)) setting.autobio = true
  if(!('privateMode' in setting)) setting.privateMode = false
  if (!('jadibot' in setting)) setting.jadibot = true 
  if(!('antiCall' in setting)) setting.antiCall = false
  } else global.db.data.settings[this?.user?.jid] = {  
  status: 0,  
  autobio: true,
  privateMode: false,
  jadibot: true,
  antiCall: false
  }


global.db.data.sticker = global.db.data.sticker || {} // sticker for addcmd

if (user) { //@skidy89 

 if (user.level <= 3) { 
   user.role = 'NOVATO(A) I' 
 } else if (user.level <= 6) { 
   user.role = 'NOVATO(A) II' 
 } else if (user.level <= 9) { 
   user.role = 'NOVATO(A) III' 
 } else if (user.level <= 12) { 
   user.role = 'NOVATO(A) IV' 
 } else if (user.level <= 15) { 
   user.role = 'APRENDIS I' 
 } else if (user.level <= 18) { 
   user.role = 'APRENDIS II' 
 } else if (user.level <= 21) { 
   user.role = 'APRENDIS III' 
 } else if (user.level <= 24) { 
   user.role = 'APRENDIS IV' 
 } else if (user.level <= 27) { 
   user.role = 'EXPLORADOR(A) I' 
 } else if (user.level <= 30) { 
   user.role = 'EXPLORADOR(A) II' 
 } else if (user.level <= 33) { 
   user.role = 'EXPLORADOR(A) III' 
 } else if (user.level <= 36) { 
   user.role = 'EXPLORADOR(A) IV' 
 } else if (user.level <= 39) { 
   user.role = '🏆 Elite I' 
 } else if (user.level <= 42) { 
   user.role = '🏆 Elite II' 
 } else if (user.level <= 45) { 
   user.role = '🏆 Elite III' 
 } else if (user.level <= 48) { 
   user.role = '🏆 Elite IV' 
 } else if (user.level <= 51) { 
   user.role = '👑 Maestro I' 
 } else if (user.level <= 54) { 
   user.role = '👑 Maestro II' 
 } else if (user.level <= 57) { 
   user.role = '👑 Maestro III' 
 } else if (user.level <= 60) { 
   user.role = '🌟 Leyenda I' 
 } else if (user.level <= 63) { 
   user.role = '🌟 Leyenda II' 
 } else if (user.level <= 66) { 
   user.role = '🌟 Leyenda III' 
 } else if (user.level <= 69) { 
   user.role = '🔥 Mítico I' 
 } else if (user.level <= 72) { 
   user.role = '🔥 Mítico II' 
 } else if (user.level <= 75) { 
   user.role = '🔥 Mítico III' 
 } else if (user.level <= 78) { 
   user.role = '💫 Supremo I' 
 } else if (user.level <= 81) { 
   user.role = '💫 Supremo II' 
 } else if (user.level <= 84) { 
   user.role = '💫 Supremo III' 
 } else if (user.level <= 87) { 
   user.role = '🌀 Divino I' 
 } else if (user.level <= 90) { 
   user.role = '🌀 Divino II' 
 } else if (user.level <= 93) { 
   user.role = '🌀 Divino III' 
 } else if (user.level <= 96) { 
   user.role = '🌌 Celestial I' 
 } else if (user.level <= 99) { 
   user.role = '🌌 Celestial II' 
 } else if (user.level <= 102) { 
   user.role = '🌌 Celestial III' 
 } else if (user.level <= 105) { 
   user.role = '🌟 Estelar I' 
 } else if (user.level <= 108) { 
   user.role = '🌟 Estelar II' 
 } else if (user.level <= 111) { 
   user.role = '🌟 Estelar III' 
 } else if (user.level <= 114) { 
   user.role = '🌠 Universal I' 
 } else if (user.level <= 117) { 
   user.role = '🌠 Universal II' 
 } else if (user.level <= 120) { 
   user.role = '🌠 Universal III' 
 } else if (user.level <= 123) { 
   user.role = '🎖️ Supremacía I' 
 } else if (user.level <= 126) { 
   user.role = '🎖️ Supremacía II' 
 } else if (user.level <= 129) { 
   user.role = '🎖️ Supremacía III' 
 } else if (user.level <= 132) { 
   user.role = '🔱 Divinidad I' 
 } else if (user.level <= 135) { 
   user.role = '🔱 Divinidad II' 
 } else if (user.level <= 138) { 
   user.role = '🔱 Divinidad III' 
 } else if (user.level <= 141) { 
   user.role = '🌌 Infinito I' 
 } else if (user.level <= 144) { 
   user.role = '🌌 Infinito II' 
 } else if (user.level <= 147) { 
   user.role = '🌌 Infinito III' 
 } else if (user.level <= 150) { 
   user.role = '🌠 Eterno' 
 }}} catch (error) { 
 m.error = error 
 if (error) { 
 console.error(m.error) 
 }}

global.mess = {
admin: "*❗ Este comando es solo para admins!!* (⁠・⁠_⁠・)",
owner: "*❗ Solo un creador/moderador del bot puede usar esto* (⁠ ⁠･ั⁠﹏⁠･ั⁠)",
group: "*❗ Este comando es para Grupos* -_-",
priv: "*❗ Este comando es para chats privados* -_-",
botAdmin: " 𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚜𝚎𝚌𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗 𝚙𝚊𝚛𝚊 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘",
wait: `*Por favor espera...*\n*tengo ${Object.keys(global.db.data.users).length} usuarios usandome, Puedo ser lenta >w<*`
}


  
  
  if (global.db.data.chats[m.chat].autoSticker) {  
          if (/image/.test(mime)) {  
          reply(mess.wait)  
          media = await quoted.download()  
          let encmedia = await this.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((quoted.msg || quoted).seconds > 40) return reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await this.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      }}
      
    

    if (global.db.data.chats[m.chat].antiFake) {
     if (m.chat && m.sender.startsWith('1')) return this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    
    if (global.db.data.chats[m.chat].antiArabe) {
      if (m.chat && m.sender.startsWith('212')) return this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }

    if (global.db.data.chats[m.chat].isBanned && isCmd && !isGroupAdmins) {
    return
    }
  

  if (global.db.data.chats[m.chat].antilink) {  
  if (budy.match(`chat.whatsapp.com`)) {  
  let delet = m.key.participant  
  let bang = m.key.id  
  reply(`*「 ANTI LINK 」*\n\n*𝚕𝚒𝚗𝚔 𝚍𝚎𝚝𝚎𝚌𝚝𝚊𝚍𝚘*\n*𝚕𝚘 𝚜𝚒𝚎𝚗𝚝𝚘 𝚙𝚎𝚛𝚘 𝚗𝚘 𝚜𝚎 𝚙𝚎𝚛𝚖𝚒𝚝𝚎𝚗 𝚕𝚒𝚗𝚔𝚜 𝚜𝚎𝚛𝚊𝚜 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘*`)  
  if (!isBotAdmins) return reply(`𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚌𝚎𝚜𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗`)  
  if (isGroupAdmins) throw '*eres admin -_-*'
  let gclink = (`https://chat.whatsapp.com/`+await this.groupInviteCode(m.chat))  
  let isLinkThisGc = new RegExp(gclink, 'i')  
  let isgclink = isLinkThisGc.test(m.text)  
  this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})  
  this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}  
  
  
  try {
  if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
        if (m.isBaileys) return
        if (!m.message) return
        let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
        let { text, mentionedJid } = hash
        let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
            userJid: this.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        this.ev.emit('messages.upsert', msg)
        }
        
   let chats = global.db.data.chats[m.chat]  
   if (chats.antiviewonce) {
   if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return 
   if (m.mtype == 'viewOnceMessageV2') { 
     const msg = m.message.viewOnceMessageV2.message 
     const type = Object.keys(msg)[0] 
     const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video') 
     let buffer = Buffer.from([]) 
     for await (const chunk of media) { 
       buffer = Buffer.concat([buffer, chunk]) 
     } 
     const cap = '*- En este grupo, no se permite ocultar nada.*' 
     if (/video/.test(type)) { 
       return this.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m) 
     } else if (/image/.test(type)) { 
       return this.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m) 
     } 
   }}
   
 if (m.message) { 
 this.logger.info(chalk.bold.white(`\n▣────────────···\n│${botname} ${this.user.id == global.numBot2 ? '' : '(jadibot)'}`),  
 chalk.bold.white('\n│📑TIPO (SMS): ') + chalk.yellowBright(`${type}`),  
 chalk.bold.white('\n│📊USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(m.sender),  
 m.isGroup ? chalk.bold.white('\n│📤GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(from) : chalk.bold.greenBright('\n│📥PRIVADO'),  
 //chalk.bold.white('\n️│🏷️ TAGS: ') + chalk.bold.white(`[${this.public ? 'Publico' : 'Privado'}]`),  
 chalk.bold.white('\n│💬MENSAJE: ') + chalk.bold.white(`${msgs(m.text)}`) + chalk.whiteBright(`\n▣────────────···\n`)) 
 }
 
  require("./main")(this, m, chatUpdate, store)
  } catch (e) {
  console.log(e)
  }
  
} catch (e) {
console.error(e)
}
}

async function groupsUpdate(groupsUpdate) {
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    if (groupUpdate.size == NaN) continue
    if (groupUpdate.subjectTime) continue
    const chats = global.db.data.chats[id]
    let text = ''
    if (!chats?.autoDetect) continue
    if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
    if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
    if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
    if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
    if (!text) continue
    await this.sendMessage(id, {text, mentions: this.parseMention(text)})
  }
}

async function callUpdate(fuckedcall) {
  const anticall = global.db.data.settings[this.user.jid].antiCall
  if (!anticall) return
  for (let fucker of fuckedcall) {
    if (fucker.isGroup == false) {
        const callmsg = await this.reply(fucker.from, `*${this.user.name} no recibe ${fucker.isVideo ? `videollamadas` : `llamadas` }*\n*@${fucker.from.split('@')[0]} serás bloqueado.*\n*Si accidentalmente llamaste, comunícate con el propietario para que lo desbloquee.*`, false, {mentions: [fucker.from]})
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:SKID CREADOR ✨\nSKID CREADOR ✨\nORG:GITHUB\nTITLE:\nitem1.TELwaid=5218442114446:+521 844 211 4446\nitem1.X-ABLabel:SKID CREADOR ✨\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:SKID CREADOR ✨nEND:VCARD`
        await this.sendMessage(fucker.from, {contacts: {displayName: 'SKID CREADOR ✨', contacts: [{vcard}]}}, {quoted: callmsg})
        await this.updateBlockStatus(fucker.from, 'block')
      }
    }
  }


async function participantsUpdate({id, participants, action}) {
if (this.init) return
if (global.db.data == null) await loadDatabase()
const chat = global.db.data.chats[id] || {}
const botTt = global.db.data.settings[this?.user?.jid] || {}
let text = ''
switch (action) {
    case 'add':
    case 'remove':
    if(chat.welcome) {
    const groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
    for (const user of participants) {
    let pp = global.noperfil
    try {
    pp = await this.profilePictureUrl(user, 'image')
    } catch (e) {
    } finally {
    const api = await this.getFile(pp)
    const bot = groupMetadata.participants.find((u) => this.decodeJid(u.id) == this.user.jid) || {}
    const isBotAdmin = bot?.admin === 'admin' || false
    text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '*sin descripción :(*') :
    (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
    this.sendFile(id, api.data, 'pp.jpg', text, null, false, { mentions: [user] })
    }
    }
    }
    break
    case 'promote':
    case 'daradmin':
    case 'darpoder':
      text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
    case 'demote':
    case 'quitarpoder':
    case 'quitaradmin':
      if (!text) {
        text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
      }
      text = text.replace('@user', '@' + participants[0].split('@')[0])
      if (chat.detect) {
        this.sendMessage(id, { text, mentions: this.parseMention(text) })
      }
      break
    }
    }
async function deleteUpdate(message) {
let d = new Date(new Date + 3600000)
let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
 let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    try {
        const { fromMe, id, participant } = message
        if (fromMe) return 
        let msg = this.serializeM(this.loadMessage(id))
	let chat = global.db.data.chats[msg?.chat] || {}
	if (!chat?.antidelete) return 
        if (!msg) return 
	if (!msg?.isGroup) return 
	const antideleteMessage = `
┏━━━━━━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━━━━━━
*■ Usuario:* @${participant.split`@`[0]}
*■ Hora:* ${time}
*■ Fecha:* ${date}
*■ Enviando el mensaje eliminado...*
    
*■ Para desactivar esta función, escribe el comando:*
*#disable antidelete
┗━━━━━━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━━━━━━`.trim()
        await this.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
    }
    
    
async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "skid bot"
        }
    }
async function pollCmd(chatUpdate) {
for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = global.prefix+toCmd
	                this.appendTextMessage(prefCmd, chatUpdate)
				}
			}
		}
		}
		
		



    
exports.pollCmd = pollCmd
exports.participantsUpdate = participantsUpdate
exports.groupsUpdate = groupsUpdate
exports.callUpdate = callUpdate
exports.handler = handler
exports.deleteUpdate = deleteUpdate


const file = global.__filename(require.meta.url, true);
watchFile(file, async () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'handler.js\''));
  if (global.reload) console.log(await global.reload()); 
})