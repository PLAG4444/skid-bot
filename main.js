// Código desde cero y comentarios hecho por:   
// @gata_dios  
// @Skidy89  
// Ladron de codigo
// @elrebelde21
  
  // Importaciones   
  require("./settings")
  const { WaMessageStubType, areJidsSameUser, downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent, generateWAMessage, prepareWAMessageMedia, relayMessage} = require('@whiskeysockets/baileys'); 
  const moment = require('moment-timezone')  
  
  const gradient = require('gradient-string')
  const { execSync, exec, spawn  } = require('child_process') 
  const chalk = require('chalk')   
  const os = require('os') 
  const fs = require('fs') 
  const fetch = require('node-fetch')  
  const axios = require('axios')  
  const cheerio = require('cheerio')
  const qrcode = require('qrcode')
  const mimetype = require("mime-types")  
  const ws = require('ws')
  const webp = require("node-webpmux")  
  const ffmpeg = require('fluent-ffmpeg')
  const JavaScriptObfuscator = require('javascript-obfuscator')
  const { canLevelUp, toAudio, toPTT, toVideo, xpRange, pinterest, formatByte, TelegraPh, UploadFileUgu, webp2mp4File, floNime, fetchBuffer, getBuffer, buffergif, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, msToTime } = require('./lib')  
  const { proto } = require("@whiskeysockets/baileys")
  const speed = require("performance-now")  
  const util = require('util')
  const diskusage = require('diskusage')
  const msgs = (message) => { 
  if (message.length >= 10) { 
  return `${message.substr(0, 500)}` 
  } else { 
  return `${message}`}}
    
   

  
  /**  
  * @param {proto.IWebMessageInfo.message} mek  
  * @param {proto.IWebMessageInfo} chatUpdate  
  * @param {import("@whiskeysockets/baileys").WASocket}   
  */  
  module.exports = conn = async (conn, m, chatUpdate, store) => {  
  var body = (typeof m.text == 'string' ? m.text : '')
  var _prefix = /^[°•÷×™+✓_=|~!?@#%^.©^]/gi.test(body) ? body.match(/^[°•÷×™+✓_=|~!?@#%^.©^]/gi)[0] : ""
  global.prefix = _prefix
  const isCmd = body.startsWith(prefix)   
  const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null
  const args = body.trim().split(/ +/).slice(1) 
  
  const pushname = m.pushName || "Sin nombre" 
  const _isBot = conn.user.jid
  const userSender = m.key.fromMe ? _isBot : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid  
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
  const itsMe = m.sender == conn.user.id ? true : false 
  const text = args.join(" ")
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
  global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
  global.ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: menu, surface: 200, message: "puta gata", orderTitle: "puto aiden me lo folle", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}  
  global.fdoc = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: "A", jpegThumbnail: null}}}  
  global.fgif = { key: {  participant: "0@s.whatsapp.net", }, message: { videoMessage: { title: botname, h: `Hmm`, seconds: "999999999", gifPlayback: "true", caption: m.pushName, jpegThumbnail: success, }, }, }
  global.fakevovid = { key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' }, message: { videoMessage: { mimetype: 'video/mp4', caption: botname, jpegThumbnail: success, viewOnce: true }}}
  global.fpay = { "key": { "participant": `0@s.whatsapp.net`, "remoteJid": "6287834993722-1621306547@g.us", "fromMe": false, "id": "3B64558B07848BD81108C1D14712018E" }, "message": { "requestPaymentMessage": { "currencyCodeIso4217": "USD", "amount1000": "100000", "requestFrom": "5218442114446@s.whatsapp.net", "noteMessage": { "extendedTextMessage": { "text": botname }}, "expiryTimestamp": "0", "amount": { "value": "100000", "offset": 1000, "currencyCode": "USD" }, "background": { "id": "BBB9307B17C17F928E57A7435E45033E", "fileLength": "94896", "width": 64, "height": 64, "mimetype": "image/webp", "placeholderArgb": 4288282521, "textArgb": 4278190080, "subtextArgb": 4288282521}}}}
  
  
 if (m.message) { 
 conn.logger.info(chalk.bold.white(`\n▣────────────···\n│${botname} ${conn.user.id == global.numBot2 ? '' : '(jadibot)'}`),  
 chalk.bold.white('\n│📑TIPO (SMS): ') + chalk.yellowBright(`${m.mtype}`),  
 chalk.bold.white('\n│📊USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(m.sender),  
 m.isGroup ? chalk.bold.white('\n│📤GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(m.chat) : chalk.bold.greenBright('\n│📥PRIVADO'),  
 chalk.bold.white('\n️│🏷️ TAGS: ') + chalk.bold.white(`[${conn.public ? 'Publico' : 'Privado'}]`),  
 chalk.bold.white('\n│💬MENSAJE: ') + chalk.bold.white(`${msgs(m.text)}`) + chalk.whiteBright(`\n▣────────────···\n`)) 
 }
 
  try {  
  switch (command) {
	
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
            if (inChat.antidelete) return conn.sendCart(m.chat, actived, global.menu2, botname)
            inChat.antidelete = true
            conn.sendCart(m.chat, inSuccess, success)
            break
            case 'antiviewonce':
	        if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
            if (inChat.antiviewonce) return conn.sendCart(m.chat, actived, global.menu2, botname)
            inChat.antiviewonce = true
            conn.sendCart(m.chat, inSuccess, success)
            break
			case 'antilink':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.antilink) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, global.menu2, botname)
			inChat.antilink = true
			conn.sendCart(m.chat, inSuccess, success)
			break
			case 'antinsfw':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);
			if (inChat.antiNsfw) return conn.sendCart(m.chat, `*el ${inEnable} ya esta activado!!*\n*puedes desactivarlo con ${prefix}disable ${inEnable}*`, global.menu2, botname)
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
			if (!Chat.antilink) return conn.sendCart(m.chat, disable, global.menu2, botname)
			Chat.antilink = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antiviewonce':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);  
			if (!Chat.antiviewonce) return conn.sendCart(m.chat, disable, global.menu2, botname)
			Chat.antiviewonce = false
			conn.sendCart(m.chat, inSuccessDisable, success)
			break
			case 'antinsfw': case 'antiporno':
			if (!m.isGroup) return m.reply(mess.group);  
            if (!isBotAdmins) return m.reply(mess.botAdmin);  
            if (!isGroupAdmins) return m.reply(mess.admin);  
			if (!Chat.antiNsfw) return conn.sendCart(m.chat, disable, global.menu2, botname)
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
            if (chat.antidelete) return conn.sendCart(m.chat, disable, global.menu2, botname)
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

    
          default: 
          
              if (body.startsWith('>')) {  
                  if (!isCreator) return  
                  try {  
                      return m.reply(util.format(eval(body.slice(2))))  
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