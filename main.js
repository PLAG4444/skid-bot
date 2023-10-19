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
  
  
  
  const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(m.chat, { image:  {url: url }, caption: caption }, { quoted: m })}  
  
 if (global.db.data.chats[m.chat].antilink) {
  if (body.match(`chat.whatsapp.com`)) {  
  let delet = m.key.participant  
  let bang = m.key.id  
  reply(`*「 ANTI LINK 」*\n\n*LINK DETECTADO*\n*No se permiten links de otros grupos, seras eliminado*`)  
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
   
  case 'acortar': {
  if (!text) return m.reply(`*[❗] INFO [❗]*\n*Ingresa un link para acortar!!*`)
  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()  
  if (!shortUrl1) return m.reply(`*[❗] ERROR [❗]*`)
  let done = `*LINK ACORTADO CORRECTAMENTE*\n*link: ${text}*\n*Link Acortado: ${shortUrl1}*`
  m.reply(done)
  }
  break
  
  
  
  break
 
   case 'menu': {
   let user = global.db.data.users[m.sender]
   let caption = `
╭════════════════════⪩
┃           女⃟⃟女MENU❈⃟き       
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃  👋 *Hola, soy skid bot!!!* ${conn.user.id == global.numBot2 ? '' : ' *(Subbot)*'}
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   👤 Nombre: ${pushname}       
┃   🌍 Modo: ${conn.public ? 'publico' : 'privado'}
┃   🌀 Rol: ${user.role}          
┃   ✨ Exp: ${user.exp}           
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🤖 *SERBOT* 🤖                
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}serbot
┃   ⪩ ${prefix}serbot --code 
┃   ⪩ ${prefix}bots              
┃   ⪩ ${prefix}public (modo publico)
┃   ⪩ ${prefix}self (modo privado)
┃   ⪩ ${prefix}enable antillamadas
┃   ⪩ ${prefix}deljadibot
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🛠️ *HERRAMIENTAS* 🛠️         
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}nowa              
┃   ⪩ ${prefix}ia                
┃   ⪩ ${prefix}ofuscar  
┃   ⪩ ${prefix}toqr
┃   ⪩ ${prefix}inspeccionar   
┃   ⪩ ${prefix}qc          
┃   ⪩ ${prefix}tolink
┃   ⪩ ${prefix}tomp3
┃   ⪩ ${prefix}toimg
┃   ⪩ ${prefix}tomp4
┃   ⪩ ${prefix}acortar
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   😂 *FUN* 😂                  
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}fake @tag|texto|texto
┃   ⪩ ${prefix}simi           
┃   ⪩ ${prefix}gay @tag
┃   ⪩ ${prefix}horny @tag
┃   ⪩ ${prefix}simp @tag
┃   ⪩ ${prefix}dvd @tag
┃   ⪩ ${prefix}comment @tag   
┃   ⪩ ${prefix}follar @tag
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🎤 *MODIFICAR AUDIO* 🎤      
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}bass              
┃   ⪩ ${prefix}blown             
┃   ⪩ ${prefix}deep              
┃   ⪩ ${prefix}earrape           
┃   ⪩ ${prefix}fast              
┃   ⪩ ${prefix}fat               
┃   ⪩ ${prefix}nightcore         
┃   ⪩ ${prefix}reverse           
┃   ⪩ ${prefix}robot             
┃   ⪩ ${prefix}slow              
┃   ⪩ ${prefix}smooth            
┃   ⪩ ${prefix}squirrel          
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   👻 *ADMIN* 👻                
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}ban               
┃   ⪩ ${prefix}promote           
┃   ⪩ ${prefix}demote            
┃   ⪩ ${prefix}del
┃   ⪩ ${prefix}kick              
┃   ⪩ ${prefix}grupo abrir       
┃   ⪩ ${prefix}grupo cerrar      
┃   ⪩ ${prefix}tagall            
┃   ⪩ ${prefix}hidetag     
┃   ⪩ ${prefix}setwelcome
┃   ⪩ ${prefix}setbye      
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   📷 *STIKERS* 📷              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}sticker           
┃   ⪩ ${prefix}s                 
┃   ⪩ ${prefix}attp              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🎤 *AUDIOS* 🎤  *(activable)*
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ _Quien es tu sempai botsito 7w7_ 
┃   ⪩ _Te diagnostico con gay_ 
┃   ⪩ _No digas eso papu_ 
┃   ⪩ _A nadie le importa_ 
┃   ⪩ _Fiesta del admin_ 
┃   ⪩ _Fiesta del administrador_  
┃   ⪩ _Vivan los novios_ 
┃   ⪩ _Feliz cumpleaños_ 
┃   ⪩ _Noche de paz_ 
┃   ⪩ _Buenos dias_ 
┃   ⪩ _Buenos tardes_ 
┃   ⪩ _Buenos noches_ 
┃   ⪩ _Audio hentai_ 
┃   ⪩ _Chica lgante_ 
┃   ⪩ _Feliz navidad_ 
┃   ⪩ _Vete a la vrg_ 
┃   ⪩ _Pasa pack Bot_ 
┃   ⪩ _Atencion grupo_ 
┃   ⪩ _Marica quien_ 
┃   ⪩ _Murio el grupo_ 
┃   ⪩ _Oh me vengo_ 
┃   ⪩ _tio que rico_ 
┃   ⪩ _Viernes_ 
┃   ⪩ _Baneado_ 
┃   ⪩ _Sexo_ 
┃   ⪩ _Hola_ 
┃   ⪩ _Un pato_ 
┃   ⪩ _Nyanpasu_ 
┃   ⪩ _Te amo_ 
┃   ⪩ _Yamete_ 
┃   ⪩ _Bañate_ 
┃   ⪩ _Es puto_ 
┃   ⪩ _La biblia_ 
┃   ⪩ _Onichan_ 
┃   ⪩ _Mierda de Bot_ 
┃   ⪩ _Siuuu_ 
┃   ⪩ _Epico_ 
┃   ⪩ _Shitpost_ 
┃   ⪩ _Rawr_ 
┃   ⪩ _UwU_ 
┃   ⪩ _a_
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⚙️ *ENABLE* ⚙️              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}enable antilink  
┃   ⪩ ${prefix}enable antiarabes
┃   ⪩ ${prefix}enable antifake  
┃   ⪩ ${prefix}enable detect    
┃   ⪩ ${prefix}enable welcome   
┃   ⪩ ${prefix}enable antinsfw  
┃   ⪩ ${prefix}enable antiviewonce
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⚙️ *DISABLE* ⚙️              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}disable antilink 
┃   ⪩ ${prefix}disable antiarabes
┃   ⪩ ${prefix}disable antifake 
┃   ⪩ ${prefix}disable detect   
┃   ⪩ ${prefix}disable welcome  
┃   ⪩ ${prefix}disable antinsfw 
┃   ⪩ ${prefix}enable antiviewonce
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   📥 *DESCARGAS* 📥            
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}play2 + [nombre
┃   ⪩ ${prefix}play + [nombre]
┃   ⪩ ${prefix}tiktokmp3 + [link]
┃   ⪩ ${prefix}tiktok + [link]
┃   ⪩ ${prefix}apk + [nombre]
┃   ⪩ ${prefix}mediafire + [link]
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🔍 *BUSQUEDA* 🔍
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ *Para descargas*
┃
┃ ⪩ ${prefix}yts + [nombre]
┃ ⪩ ${prefix}pinterest + [nombre]
┃ ⪩ ${prefix}lyrics + [texto]
┃
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⚔️ *RPG* ⚔️
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}work
┃   ⪩ ${prefix}claim
┃   ⪩ ${prefix}levelup
┃   ⪩ ${prefix}reparar
┃   ⪩ ${prefix}petshop
┃   ⪩ ${prefix}minar
┃   ⪩ ${prefix}apostar
┃   ⪩ ${prefix}perfil
┃   ⪩ ${prefix}transfer
┃   ⪩ ${prefix}afk
┃   ⪩ ${prefix}aventura
┃   ⪩ ${prefix}inv
┃   ⪩ ${prefix}casino
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   📝 *LOGOS* 📝
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃ ⪩ ${prefix}blackpink [texto]
┃ ⪩ ${prefix}neon [texto]
┃ ⪩ ${prefix}greenneon [texto]
┃ ⪩ ${prefix}advanceglow [texto]
┃ ⪩ ${prefix}advanceglow [texto]
┃ ⪩ ${prefix}thunder [texto]
┃ ⪩ ${prefix}horrorblood [texto]
┃ ⪩ ${prefix}summersand [texto]
┃ ⪩ ${prefix}luxury [texto]
┃ ⪩ ${prefix}icecold [texto]
┃ ⪩ ${prefix}breakwall [texto]
┃ ⪩ ${prefix}roadwarning [texto]
┃ ⪩ ${prefix}box3d [texto]
┃ ⪩ ${prefix}strawberry [texto]
┃ ⪩ ${prefix}toxic [texto]
┃ ⪩ ${prefix}bokeh [texto]
┃ ⪩ ${prefix}natureleaves [texto]
┃ ⪩ ${prefix}fireworksparkle [texto]
┃ ⪩ ${prefix}jokerlogo [texto]
┃ ⪩ ${prefix}halloween [texto]
┃ ⪩ ${prefix}bloodfrosted [texto]
┃ ⪩ ${prefix}newyearcard [texto]
┃ ⪩ ${prefix}deluxesilver [texto]
┃ ⪩ ${prefix}minion [texto]
┃ ⪩ ${prefix}text1917 [texto]
┃ ⪩ ${prefix}holographic [texto]
┃ ⪩ ${prefix}neonlight [texto]
┃ ⪩ ${prefix}metaldark [texto]
┃ ⪩ ${prefix}sandengraved [texto]
┃ ⪩ ${prefix}sandsummer [texto]
┃ ⪩ ${prefix}sandwriting [texto]
┃ ⪩ ${prefix}futureneon [texto]
┃ ⪩ ${prefix}carvedwood [texto]
┃ ⪩ ${prefix}harrypotter [texto]
┃ ⪩ ${prefix}flamming [texto]
┃ ⪩ ${prefix}fallleaves [texto]
┃ ⪩ ${prefix}glowingneon [texto]
┃ ⪩ ${prefix}letterleaves [texto]
┃ ⪩ ${prefix}summernature [texto]    
┃ ⪩ ${prefix}golderrose [texto]
┃ ⪩ ${prefix}underwater [texto]
┃ ⪩ ${prefix}nature3d [texto]
┃ ⪩ ${prefix}wolfmetal [texto]
┃ ⪩ ${prefix}summer3d [texto]
┃ ⪩ ${prefix}woodenboard [texto]
┃ ⪩ ${prefix}woodheart [texto]  
┃ ⪩ ${prefix}coffe [texto]
┃ ⪩ ${prefix}love [texto]
┃ ⪩ ${prefix}undergrass [texto]
┃ ⪩ ${prefix}lovemessage [texto]
┃ ⪩ ${prefix}burnpaper [texto]
┃ ⪩ ${prefix}smoke [texto]
┃ ⪩ ${prefix}romance [texto]
┃ ⪩ ${prefix}cup1 [texto]
┃ ⪩ ${prefix}cup [texto]
┃ ⪩ ${prefix}shadow [texto]
┃ ⪩ ${prefix}freefire [texto]
┃ ⪩ ${prefix}silverplaybutton [texto]
┃ ⪩ ${prefix}goldplaybutton [texto]
┃ ⪩ ${prefix}birthdayday [texto]
┃ ⪩ ${prefix}snow3d [texto]
┃ ⪩ ${prefix}galaxybat [texto]
┃ ⪩ ${prefix}writegalacy [texto]
┃ ⪩ ${prefix}textbyname [texto]
┃ ⪩ ${prefix}wooden3d [texto]
┃ ⪩ ${prefix}starsnight [texto]
┃ ⪩ ${prefix}textcake [texto]
┃ ⪩ ${prefix}glittergold [texto]
┃ ⪩ ${prefix}noeltext [texto]
┃ ⪩ ${prefix}metallogo [texto]
┃ ⪩ ${prefix}greenbush [texto]
┃ ⪩ ${prefix}glossychrome [texto]
┃ ⪩ ${prefix}greenneon [texto]
┃ ⪩ ${prefix}hologram3d [texto]
┃ ⪩ ${prefix}galaxystyle [texto]
┃ ⪩ ${prefix}birthdaycake [texto]
┃ ⪩ ${prefix}heartshaped [texto]
┃ ⪩ ${prefix}royaltext [texto]
┃ ⪩ ${prefix}puppycute [texto]
┃ ⪩ ${prefix}beautifulflower [texto]
┃ ⪩ ${prefix}lighttext [texto]
┃ ⪩ ${prefix}galaxywallpaper [texto]
┃ ⪩ ${prefix}luxurygold [texto]
┃ ⪩ ${prefix}watercolor [texto]
┃ ⪩ ${prefix}multicolor3d [texto]
┃ ⪩ ${prefix}wetglass [texto]
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🔞 *NSFW* 🔞 (activable)
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ *activa estos comandos con enable*
┃
┃ ⪩ ${prefix}lewd
┃ ⪩ ${prefix}ass
┃ ⪩ ${prefix}feet
┃ ⪩ ${prefix}gasm
┃ ⪩ ${prefix}feed
┃ ⪩ ${prefix}anal
┃ ⪩ ${prefix}kiss
┃ ⪩ ${prefix}tits
┃ ⪩ ${prefix}holo
┃ ⪩ ${prefix}erok
┃ ⪩ ${prefix}smug
┃ ⪩ ${prefix}waifu
┃ ⪩ ${prefix}pussy
┃ ⪩ ${prefix}blowjob
┃ ⪩ ${prefix}wallpaper
┃
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ∆ *OTROS* ∆ 
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ ${botname}
┃
┃ ⪩ ${prefix}estado
┃ ⪩ ${prefix}ping
┃ ⪩ ${prefix}script
┃
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   👑 *OWNER* 👑 
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ ${botname}
┃
┃ ⪩ ${prefix}getcase
┃ ⪩ ${prefix}sendcase
┃ ⪩ ${prefix}enable jadibot
┃ ⪩ ${prefix}update
┃ ⪩ $
┃ ⪩ >
┃ ⪩ => 
┃
╰══════════════⪨`
await conn.sendMessage(m.chat, {   
    text: caption,  
    contextInfo:{  
    forwardingScore: 9999999,  
    isForwarded: true,   
    mentionedJid: [m.sender],  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": true,  
    "title": botname,   
    "body": 'made with ♥️',
    "containsAutoReply": true,  
    "mediaType": 1,   
    "thumbnail": global.menu,  
    "mediaUrl": `https://chat.whatsapp.com/JPJ0n2V0uujCRvmJRNM7ZU`,  
    "sourceUrl": `https://chat.whatsapp.com/JPJ0n2V0uujCRvmJRNM7ZU`  
    }
    }  
    }, { quoted: fkontak })
   await conn.sendNyanCat(m.chat, '*COMANDOS ARREGLADOS*\n.serbot\n.serbot --code\n.tiktok\n.tiktokmp3\n.qc\n*Recuerda que este bot aun no esta terminado al %100* ^w^', global.menu3, '[ I N F O ]', 'nueva update!!', m)
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
    
    
    case 'levelup': {
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
 throw str
 //let image = await levelup(strt, user.level)
 //conn.sendMessage(m.chat, { image: image, caption: str }, {quoted: m})
 }    
 }
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
  
  
  
  
 
    
    
    
    
    
   case 'wallpaper':
   if (!text) throw `*❗ Ejemplo: ${prefix + command} gawr gura*` 
   let { wallpaper, wallpaperv2 } = require('@bochilteam/scraper')
   let _res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(text) 
   let _img = _res[Math.floor(Math.random() * _res.length)]
   conn.sendMessage(m.chat, { image: { url: _img }, caption: `*✨ Aqui tienes tu wallpaper de ${text}*`}, { quoted: fgif })
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
    let { webp2mp4File } = require('./lib')
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
		    if (!global.db.data.chats[m.chat].antiNsfw) return conn.sendCart(m.chat, `*el comando ${command} no esta activado en este grupo*\n*usa ${prefix}enable antinsfw*`, global.menu2, botname)
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