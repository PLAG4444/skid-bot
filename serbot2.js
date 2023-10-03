const { smsg, sleep, makeWaSocket, protoType, serialize, getGroupAdmins, clockString }= require('./lib/fuctions')
const { areJidsSameUser, useMultiFileAuthState, DisconnectReason, proto, jidNormalizedUser, WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys")
const gradient = require('gradient-string')
const store = require('./lib/store.js')
const fs = require('fs')
const { watchFile, unwatchFile } = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')
const path = require('path')
const qrcode = require('qrcode')   
const NodeCache = require('node-cache')
const pino = require('pino')
const ws = require('ws')


const _0x450013=_0x23d5;function _0x22f3(){const _0x6ac192=['9nCeAOg','base64','from','5208024nVQcjr','30535wvjicc','724460VqafAm','240348zJpOEy','11QDSPQW','3927546psdvOD','23790wPpgit','7AwNkQE','toString','236tLYryB','utf-8','1944AjaYat','156691TOIYPc','amFkaWJvdCBoZWNobyBwb3IgU2tpZHk4OSA6cA==','6vmFxFp'];_0x22f3=function(){return _0x6ac192;};return _0x22f3();}function _0x23d5(_0x537282,_0x581a5f){const _0x22f3c5=_0x22f3();return _0x23d5=function(_0x23d57b,_0x4a690f){_0x23d57b=_0x23d57b-0x192;let _0x352566=_0x22f3c5[_0x23d57b];return _0x352566;},_0x23d5(_0x537282,_0x581a5f);}(function(_0x2a7f29,_0xb6ba40){const _0x3be318=_0x23d5,_0x175ab1=_0x2a7f29();while(!![]){try{const _0x3eab67=-parseInt(_0x3be318(0x19f))/0x1*(parseInt(_0x3be318(0x1a1))/0x2)+parseInt(_0x3be318(0x196))/0x3+parseInt(_0x3be318(0x19c))/0x4*(parseInt(_0x3be318(0x194))/0x5)+parseInt(_0x3be318(0x198))/0x6*(-parseInt(_0x3be318(0x19a))/0x7)+-parseInt(_0x3be318(0x193))/0x8*(-parseInt(_0x3be318(0x1a2))/0x9)+-parseInt(_0x3be318(0x195))/0xa*(-parseInt(_0x3be318(0x197))/0xb)+parseInt(_0x3be318(0x19e))/0xc*(parseInt(_0x3be318(0x199))/0xd);if(_0x3eab67===_0xb6ba40)break;else _0x175ab1['push'](_0x175ab1['shift']());}catch(_0x52ccae){_0x175ab1['push'](_0x175ab1['shift']());}}}(_0x22f3,0x51f3a));const crm1=_0x450013(0x1a0),crm2=Buffer[_0x450013(0x192)](crm1,_0x450013(0x1a3)),crm9=crm2[_0x450013(0x19b)](_0x450013(0x19d));
   let rtx = `
╭━━━━━━━━━━━━━╮
│ 
│ Escanea este QR para convertirte en un bot temporal
│
│ 1. Haz clic en los tres puntos en la esquina superior derecha
│ 2. Toca WhatsApp Web
│ 3. Escanea este QR
│
│ *El QR expira a los 30 segundos*
│
╰━━━━━━━━━━━━━╯\n\n`
   let rtx2 = `
╭━━━━━━━━━━━━━╮
│ 
│ Usa este codigo para conectarte a skid bot!!
│
│ 1. Haz clic en los tres puntos en la esquina superior derecha
│ 2. Toca WhatsApp Web
│ 3. da click en vincular con codigo de teléfono 
│ 4. pega el codigo a continuación
│ 
│
╰━━━━━━━━━━━━━╯\n\n`

 const imports = (path) => {

  path = require.resolve(path)

  let modules, retry = 0

  do {

    if (path in require.cache) delete require.cache[path]

    modules = require(path)

    retry++

  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)

  return modules

}

  if (global.listJadibot instanceof Array) console.log()   
  else global.listJadibot = []   
  
  const jadibot = async (conn, m, command, args) => {
  const skmod = conn
  
  
  async function jadibots() {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? skmod.user.jid : m.sender
  let id = `${who.split`@`[0]}` 
  const mcode = args[0] && args[0].includes("--code") ? true : args[1] && args[1].includes("--code") ? true : false // stoled from aiden hehe
  if (mcode) {
    args[0] = args[0].replace("--code", "").trim()
    if (args[1]) args[1] = args[1].replace("--code", "").trim()
    if (args[0] == "") args[0] = undefined
    console.log(args[0])
  }
  console.info = () => {} 
  const msgRetry = (MessageRetryMap) => { }
  const msgRetryCache = new NodeCache()
  const {state, saveState, saveCreds} = await useMultiFileAuthState('./jadibot/' + id, pino({ level: 'silent' }))
  const { version, isLatest } = await fetchLatestBaileysVersion()   

  const connectionSettings = {
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
    msgRetry,
    msgRetryCache,
    version,
    browser: mcode ? ['Chrome (Linux)','',''] : ['SkidBot', 'Safari', '1.0.0'],
    getMessage: async (key) => { 
    if (store) { 
    const msg = await store.loadMessage(key.remoteJid, key.id) 
    return lol.chats[key.remoteJid] && lol.chats[key.remoteJid].messages[key.id] ? lol.chats[key.remoteJid].messages[key.id].message : undefined 
    } 
    return proto.Message.fromObject({})
    },
    defaultQueryTimeoutMs: undefined
  }
  
  /**
  * @type {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket | import('./lib/fuctions.js').makeWaSocket}
  */
  
  let lol = makeWaSocket(connectionSettings)
  let isInit = true
  lol.isInit = false
    
  
setInterval(async () => { 
  if (!lol.user) { 
  try { 
  lol.ws.close() 
  } catch {  
  } 
  
  lol.ev.removeAllListeners() 
  let i = global.listJadibot.indexOf(lol) 
  if (i < 0) return  
  delete global.listJadibot[i] 
  global.listJadibot.splice(i, 1) 
  }}, 60000) //again aiden -.-
  
  


  const handler = imports('./handler.js')

  lol.ev.on('messages.upsert', async (chatUpdate) => { 
  this.msgqueque = this.msgqueque || []
  this.uptime = this.uptime || Date.now()
  lol.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!chatUpdate) return
  if (!m) return
  
  m = smsg(lol, m) || m    
  if (m.key.id.startsWith("BAE5")) return  
  var body = (typeof m.text == 'string' ? m.text : '')
  
  
  const msgs = (message) => { 
  if (message.length >= 10) { 
  return `${message.substr(0, 500)}` 
  } else { 
  return `${message}`}}
  

  const _isBot = lol.user.jid
  const args = body.trim().split(/ +/).slice(1) 
  const pushname = m.pushName || "Sin nombre" 
  const userSender = m.key.fromMe ? _isBot : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid  
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
  const itsMe = m.sender == lol.user.id ? true : false 
  const text = args.join(" ") 
  const quoted = m.quoted ? m.quoted : m 
  const sender = m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid 
  const mime = (quoted.msg || quoted).mimetype || ''  
  const isMedia = /image|video|sticker|audio/.test(mime)
  const mentions = []  

  const groupMetadata = m.isGroup ? await lol.groupMetadata(m.chat) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  
  const isBotAdmins = m.isGroup ? groupAdmins.includes(lol.user.jid) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false 
  const isBaneed = m.isGroup ? blockList.includes(userSender) : false 
  const isPremium = m.isGroup ? premium.includes(userSender) : false   
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? lol.user.jid : m.sender;
  

  
  
  
  if (!lol.public && m.key.fromMe) return
  if (typeof m.text !== 'string') {
  m.text = ''
  }
  if (m.isBaileys) return
  if (!lol.public && !m.key.fromMe && chatUpdate.type === 'notify') return
  let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of mentionUser) {
  let user = global.db.data.users[jid]
  if (!user) continue
  let afkTime = user.afkTime
  if (!afkTime || afkTime < 0) continue
  let reason = user.afkReason || ''
  m.reply(`*❗ No lo etiquetes*\n*El esta afk ${reason ? 'por la razon ' + reason : 'Sin ninguna razon -_-'}*\nDurante ${clockString(new Date - afkTime)}`.trim())
  }
  if (global.db.data.users[m.sender].afkTime > -1) {
  let user = global.db.data.users[m.sender]
  m.reply(`*❗Dejaste de estar afk ${user.afkReason ? 'Por ' + user.afkReason : ''}*\n*Durante ${clockString(new Date - user.afkTime)} ^_^*`.trim())
  user.afkTime = -1
  user.afkReason = ''
  }
  
  if (global.db.data.chats[m.chat].autoSticker) {  
          if (/image/.test(mime)) {  
          reply(mess.wait)  
          media = await quoted.download()  
          let encmedia = await lol.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((quoted.msg || quoted).seconds > 40) return reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await lol.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      }}
      
    

    if (global.db.data.chats[m.chat].antiFake) {
     if (m.chat && m.sender.startsWith('1')) return lol.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    
    if (global.db.data.chats[m.chat].antiArabe) {
      if (m.chat && m.sender.startsWith('212')) return lol.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }

    if (global.db.data.chats[m.chat].isBanned && isCmd && !isGroupAdmins) {
    return
    }
  

  if (global.db.data.chats[m.chat].antilink) {
  if (body.match(`chat.whatsapp.com`)) {  
  let delet = m.key.participant  
  let bang = m.key.id  
  reply(`*「 ANTI LINK 」*\n\n*𝚕𝚒𝚗𝚔 𝚍𝚎𝚝𝚎𝚌𝚝𝚊𝚍𝚘*\n*𝚕𝚘 𝚜𝚒𝚎𝚗𝚝𝚘 𝚙𝚎𝚛𝚘 𝚗𝚘 𝚜𝚎 𝚙𝚎𝚛𝚖𝚒𝚝𝚎𝚗 𝚕𝚒𝚗𝚔𝚜 𝚜𝚎𝚛𝚊𝚜 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘*`)  
  if (!isBotAdmins) return reply(`𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚌𝚎𝚜𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗`)  
  if (isGroupAdmins) throw '*eres admin -_-*'
  let gclink = (`https://chat.whatsapp.com/`+await lol.groupInviteCode(m.chat))  
  let isLinkThisGc = new RegExp(gclink, 'i')  
  let isgclink = isLinkThisGc.test(m.text)  
  lol.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})  
  lol.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}  
  
  
  
  
    if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
    let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
    let { text, mentionedJid } = hash
    let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
    userJid: lol.user.id,
    quoted : m.quoted && m.quoted.fakeObj
    })
    messages.key.fromMe = areJidsSameUser(m.sender, lol.user.id)
    messages.key.id = m.key.id
    messages.pushName = m.pushName
    if (m.isGroup) messages.participant = m.sender
    let msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append'
    }
    lol.ev.emit('messages.upsert', msg)
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
       return lol.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m) 
     } else if (/image/.test(type)) { 
       return lol.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m) 
     } 
   }}
   
 if (m.message) { 
 lol.logger.info(chalk.bold.white(`\n▣────────────···\n│${botname} ${lol.user.id == global.numBot2 ? '' : '(jadibot)'}`),  
 chalk.bold.white('\n│📑TIPO (SMS): ') + chalk.yellowBright(`${m.mtype}`),  
 chalk.bold.white('\n│📊USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(m.sender),  
 m.isGroup ? chalk.bold.white('\n│📤GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(m.chat) : chalk.bold.greenBright('\n│📥PRIVADO'),  
 chalk.bold.white('\n️│🏷️ TAGS: ') + chalk.bold.white(`[${lol.public ? 'Publico' : 'Privado'}]`),  
 chalk.bold.white('\n│💬MENSAJE: ') + chalk.bold.white(`${msgs(m.text)}`) + chalk.whiteBright(`\n▣────────────···\n`)) 
 }
 
    
    

 
 
  require("./main")(lol, m, chatUpdate, store)
  
  
    })
  lol.ev.on('call', async (fuckedcall) => { 
  const anticall = global.db.data.settings[lol.user.jid].antiCall
  if (!anticall) return
  for (let fucker of fuckedcall) {
    if (fucker.isGroup == false) {
        const callmsg = await lol.reply(fucker.from, `*${lol.user.name} no recibe ${fucker.isVideo ? `videollamadas` : `llamadas` }*\n*@${fucker.from.split('@')[0]} serás bloqueado.*\n*Si accidentalmente llamaste, comunícate con el propietario para que lo desbloquee.*`, false, {mentions: [fucker.from]})
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:SKID CREADOR ✨\nSKID CREADOR ✨\nORG:GITHUB\nTITLE:\nitem1.TELwaid=5218442114446:+521 844 211 4446\nitem1.X-ABLabel:SKID CREADOR ✨\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:SKID CREADOR ✨nEND:VCARD`
        await lol.sendMessage(fucker.from, {contacts: {displayName: 'SKID CREADOR ✨', contacts: [{vcard}]}}, {quoted: callmsg})
        await lol.updateBlockStatus(fucker.from, 'block')
      }
    }})
  lol.ev.on('group-participants.update', async ({id, participants, action}) => { 
  if (lol.init) return
if (global.db.data == null) await loadDatabase()
const chat = global.db.data.chats[id] || {}
const botTt = global.db.data.settings[lol?.user?.jid] || {}
let text = ''
switch (action) {
    case 'add':
    case 'remove':
    if(chat.welcome) {
    const groupMetadata = await lol.groupMetadata(id) || (conn.chats[id] || {}).metadata
    for (const user of participants) {
    let pp = global.noperfil
    try {
    pp = await lol.profilePictureUrl(user, 'image')
    } catch (e) {
    } finally {
    const api = await lol.getFile(pp)
    const bot = groupMetadata.participants.find((u) => lol.decodeJid(u.id) == lol.user.jid) || {}
    const isBotAdmin = bot?.admin === 'admin' || false
    text = (action === 'add' ? (chat.sWelcome || lol.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await lol.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '*sin descripción :(*') :
    (chat.sBye || lol.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
    lol.sendFile(id, api.data, 'pp.jpg', text, null, false, { mentions: [user] })
    }
    }
    }
    break
    case 'promote':
    case 'daradmin':
    case 'darpoder':
      text = (chat.sPromote || lol.spromote || conn.spromote || '@user ```is now Admin```')
    case 'demote':
    case 'quitarpoder':
    case 'quitaradmin':
      if (!text) {
        text = (chat.sDemote || lol.sdemote || conn.sdemote || '@user ```is no longer Admin```')
      }
      text = text.replace('@user', '@' + participants[0].split('@')[0])
      if (chat.detect) {
        lol.sendMessage(id, { text, mentions: lol.parseMention(text) })
      }
      break
    }})
  lol.ev.on("groups.update", async (groupsUpdate) => { 
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    if (groupUpdate.size == NaN) continue
    if (groupUpdate.subjectTime) continue
    const chats = global.db.data.chats[id]
    let text = ''
    if (!chats?.autoDetect) continue
    if (groupUpdate.desc) text = (chats.sDesc || lol.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
    if (groupUpdate.subject) text = (chats.sSubject || lol.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
    if (groupUpdate.icon) text = (chats.sIcon || lol.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
    if (groupUpdate.revoke) text = (chats.sRevoke || lol.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
    if (!text) continue
    await lol.sendMessage(id, {text, mentions: lol.parseMention(text)})
  } })
  lol.ev.on('message.delete', async (message) => { 
  let d = new Date(new Date + 3600000)
let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
 let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    try {
        const { fromMe, id, participant } = message
        if (fromMe) return 
        let msg = lol.serializeM(lol.loadMessage(id))
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
        await lol.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
        lol.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
   
  } )
  lol.ev.on('connection.update', async (up) => {
  const { connection, lastDisconnect, isNewLogin, qr } = up
  if (isNewLogin) lol.isInit = false
  if (global.db.data == null) loadDatabase()
   const _0x24bde8=_0x53f7;(function(_0x6d302e,_0x11d41e){const _0x15870d=_0x53f7,_0x36c214=_0x6d302e();while(!![]){try{const _0x32686d=parseInt(_0x15870d(0x1b8))/0x1+parseInt(_0x15870d(0x1b7))/0x2+-parseInt(_0x15870d(0x1b2))/0x3+parseInt(_0x15870d(0x1b1))/0x4+parseInt(_0x15870d(0x1ba))/0x5+parseInt(_0x15870d(0x1b3))/0x6+-parseInt(_0x15870d(0x1b6))/0x7;if(_0x32686d===_0x11d41e)break;else _0x36c214['push'](_0x36c214['shift']());}catch(_0x4c2faa){_0x36c214['push'](_0x36c214['shift']());}}}(_0x2e67,0xea015));if(qr&&!mcode)skmod['sendMessage'](m[_0x24bde8(0x1b0)],{'image':await qrcode[_0x24bde8(0x1b4)](qr,{'scale':0x8}),'caption':rtx+crm9},{'quoted':m});function _0x53f7(_0x333d67,_0x1db60c){const _0x2e673a=_0x2e67();return _0x53f7=function(_0x53f703,_0x34f672){_0x53f703=_0x53f703-0x1b0;let _0x551fb7=_0x2e673a[_0x53f703];return _0x551fb7;},_0x53f7(_0x333d67,_0x1db60c);}function _0x2e67(){const _0x4535e7=['836572OevVNN','requestPairingCode','2583245vMAdpi','chat','5673296lFxeop','2893536YDbUoK','8807304Luxpcu','toBuffer','sendMessage','29228647PiqIIg','3718178cJmfpk'];_0x2e67=function(){return _0x4535e7;};return _0x2e67();}if(qr&&mcode){let supercode=await lol[_0x24bde8(0x1b9)](m['sender']['split']`@`[0x0]);skmod[_0x24bde8(0x1b5)](m[_0x24bde8(0x1b0)],{'text':rtx2+crm9},{'quoted':m}),await sleep(0x1388),skmod[_0x24bde8(0x1b5)](m['chat'],{'text':supercode},{'quoted':m});}
   if (connection == "open") {   
   lol.isInit = true
   global.listJadibot.push(lol)
   await skmod.sendMessage(m.chat, { text: args[0] ? "*✅ Reconectando...*" : `*✅ Conectado con exito*\n*Si tu bot fue desconectado usa ${prefix + command}*` }, { quoted: m })
   }
   if (connection === 'open') {
   await skmod.sendMessage(m.chat, { text: args[0] ?  `*✅ Reconexion Exitosa*\n*tus mensajes se estan cargando*` : `*✅ Jadibot Conectado*\n*se te enviara un codigo para volver a conectarte*` }, { quoted: m })
   await sleep(5000)
   if (!args[0]) skmod.sendMessage(m.chat, { text: `${prefix + command } ` + Buffer.from(fs.readFileSync(`./jadibot/${id}/creds.json`), "utf-8").toString("base64") }, { quoted: m })
   }
   const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode 
   console.log(code)
   lol.logger.warn('\n' + lastDisconnect)
   if (connection === 'close') {
   if (code == 405) { 
   fs.unlinkSync("./jadibot/" + id + "/creds.json") 
   return skmod.sendMessage(m.chat, {text : "*❗ Por favor, reenvia el comando*"}, { quoted: m }) 
   }
   
   if (code === DisconnectReason.badSession) { 
   skmod.sendMessage(m.chat, {text : "*❗ La sesión actual es inválida, Tendras que iniciar sesion de nuevo."}, { quoted: m }) 
   fs.rm("./jadibot/" + id, { recursive: true }) 
   } else if (code === DisconnectReason.connectionClosed) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se cerró, se intentara reconectar automáticamente...*\n" }, { quoted: m }) 
   await jadibots()
   } else if (code === DisconnectReason.connectionLost) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se perdió, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await jadibots()
   } else if (code === DisconnectReason.connectionReplaced) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se reemplazó, Su conexion se cerro*"}, { quoted: m }) 
   } else if (code === DisconnectReason.loggedOut) { 
   skmod.sendMessage(m.chat, {text : "*❗ La sesión actual se cerró, Si desea volver a conectarse tendra que iniciar sesion de nuevo*"}, { quoted: m }) 
   } else if (code === DisconnectReason.restartRequired) { 
   skmod.sendMessage(m.chat, {text : "*❗ Reinicio requerido, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await jadibots()
   } else if (code === DisconnectReason.timedOut) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se agotó, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await jadibots()
   } else { 
   skmod.sendMessage(m.chat, {text : ` ⚠  Razón de desconexión desconocida. ${code || ''}: ${connection || ''} Por favor reporte al desarollador.`}, { quoted: m }) 
   }
  let i = global.listJadibot.indexOf(lol)  
  if (i < 0) return console.log("No se encontro")  
  delete global.listJadibot[i]  
  global.listJadibot.splice(i, 1) // I stole it from aiden (credits to him)  
  }
  })
  lol.ev.on('creds.update', saveCreds)
  
  }
  jadibots()
  }
  const killJadibot = async (conn, m, command) => {
  try {
  if (!fs.existsSync(path.join(__dirname, `./jadibot/${id}`))) {
  return m.reply(`tu sesion no existe`)
  } else {
  fs.rmdirSync(`./jadibot/` + id, { recursive: true })
  return m.reply(`*❗ se elimino correctamente tu sesion*`)
  }
  } catch (e) {
  throw e
  }
  }
  
  exports.listJadibot = listJadibot
  exports.jadibot = jadibot
  exports.killJadibot = killJadibot
