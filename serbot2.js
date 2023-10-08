const path = require('path')
const pino = require('pino')
const ws = require('ws')
const qrcode = require('qrcode') 
const store = require('./lib/store.js')
const { useMultiFileAuthState, DisconnectReason, msgRetryCounterMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")
const { smsg, makeWaSocket, sleep } = require('./lib/fuctions')
const fs = require('fs')


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


  if (global.listJadibot instanceof Array) console.log()   
  else global.listJadibot = []   
  
  const jadibots = async (mod, m, command, args) => {
  const skmod = mod
  if (!global.db.data.settings[skmod.user.jid].jadibot) return m.reply(`*[❗] este comando fue desabilitado por el creador*`)
  if (skmod.user.jid !== global.numBot) return m.reply(`*[❗] Este comando solo puede ser usado en el Bot principal!!*\n\n*—◉ Da click aquí para ir:*\n*◉* https://api.whatsapp.com/send/?phone=${global.numBot.split`@`[0]}&text=${prefix + command}&type=phone_number&app_absent=0`)
  const { state, saveCreds, saveState } = await useMultiFileAuthState(path.join(__dirname, `./jadibot/${m.sender.split("@")[0]}`), pino({ level: "silent" }))
  
  async function jadibts() {
  const mcode = args[0] && args[0].includes("--code") ? true : args[1] && args[1].includes("--code") ? true : false // stoled from aiden hehe
  if (mcode) {
    args[0] = args[0].replace("--code", "").trim()
    if (args[1]) args[1] = args[1].replace("--code", "").trim()
    if (args[0] == "") args[0] = undefined
    console.log(args[0])
  }
  
  console.info = () => {}
  let { version, isLatest } = await fetchLatestBaileysVersion()
  const msgRetry = (MessageRetryMap) => { }
  const connectionSettings = {
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
    msgRetry,
    version,
    browser: mcode ? ['Chrome (Linux)','',''] : ['SkidBot', 'Safari', '1.0.0'],
    getMessage: async (key) => { 
    if (store) { 
    const msg = await store.loadMessage(key.remoteJid, key.id) 
    return conn.chats[key.remoteJid] && conn.chats[key.remoteJid].messages[key.id] ? conn.chats[key.remoteJid].messages[key.id].message : undefined 
    } 
    return proto.Message.fromObject({})
    },
    defaultQueryTimeoutMs: undefined
  }
  
  /**
  * @type {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket | import('./lib/fuctions.js').makeWaSocket}
  */
  
  const conn = makeWaSocket(connectionSettings)

async function connection(up) {
const { connection, lastDisconnect, isNewLogin, qr } = up
  if (isNewLogin) conn.isInit = false
  if (global.db.data == null) loadDatabase()
   if (qr && !mcode) return skmod.sendMessage(m.chat, {image: await qrcode.toBuffer(qr, { scale: 8 }) , caption : rtx + crm9 }, { quoted: m })
    if (qr && mcode) {
        await skmod.sendMessage(m.chat, {text : rtx2 + crm9 }, { quoted: m })
        await sleep(5000)
        let code = await conn.requestPairingCode((m.sender.split`@`[0]))
        await skmod.sendMessage(m.chat, {text : code}, { quoted: m })
    }
   if (connection == "open") {   
   global.listJadibot.push(skmod)   
   let userId = await conn.user.jid
   global.jadibotConn = conn.user.jid
   await  skmod.sendMessage(m.chat, { text: args ? "*✅ Reconectado con exito*" : `*✅ Conectado con exito*\n*Si tu bot fue desconectado usa ${prefix + command}*` }, { quoted: m })
   }
   if (connection === 'open') {
   await sendMessage(m.chat, { text: args ?  `*✅ Reconexion Exitosa*\n*tus mensajes se estan cargando*` : `*✅ Jadibot Conectado*\n*se te enviara un codigo para volver a conectarte*` }, { quoted: m })
   await sleep(5000)
   if (!args) skmod.sendMessage(m.chat, { text: `${prefix + command } ` + Buffer.from(fs.readFileSync(`./jadibot/${m.sender.split("@")[0]}/creds.json`), "utf-8").toString("base64") }, { quoted: m })
   }
   const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
   if (connection === 'close') {
   console.log(reason)
   
   
   if (reason == 405) {
   await fs.unlinkSync(path.join(__dirname, `./jadibot/${m.sender.split("@")[0]}/creds.json`))
   // thank you aiden_notLogic
   return await m.reply(`*❗ Reenvia el comando*`)
   }
   if (reason == 428) return m.reply(`*❌ Connection failure*\nMax retries to reconect into jadibot instance`)
   if (reason === DisconnectReason.restartRequired) {
   jadibts()
   return m.reply(`*⚠️ Reinicio requerido,*\n*Reiniciando...*`)
   } else if (reason === DisconnectReason.loggedOut) {
   sleep(4000)
   return m.reply(`*❌ Dispositivo desconectado*\n\n*Tendras que volver a iniciar sesion (usa .deljadibot)*`)
   } else if (reason == 428) {
   await jadibts()
   return m.reply(`*⚠️ Conexion cerrada\n*Reconexion Forzada...*`)
   } else if (reason === DisconnectReason.connectionLost) {
   await jadibts()
   return await m.reply(`*❗ Conexion perdida del servidor*\n*reconexion Forzada*`)
   } else if (reason === DisconnectReason.badSession) {
   return await m.reply(`*❌ Tu conexion es invalida*\n*no se te reconectara*`)
   } else if (reason === DisconnectReason.timedOut) {
   await jadibts()
   return reply(`*❗ se agoto el tiempo de conexión...*`)
   } else {
   reply(`*⚠️ error desconocido*\n${reason || ''}: ${connection || ''}\n*Reportalo al creador*`) // also aiden lol
   }
   let i = global.listJadibot.indexOf(skmod)
        if (i < 0) return console.log("no se encontro")
        delete global.listJadibot[i]
        global.listJadibot.splice(i, 1) // I stole it from aiden (credits to him)
   }
  }
  setInterval(async () => {
    if (!conn.user) {
      try { conn.ws.close() } catch { }
      conn.ev.removeAllListeners()

    let i = global.conns.indexOf(conn)
						
     if (i < 0) return
      delete global.conns[i]
      global.conns.splice(i, 1)
    }}, 60000)
  
conn.ev.on("messages.upsert", async (chatUpdate) => {
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
m = smsg(conn, m) || m
if (!m) return
if (m.isBaileys) return
if (!chatUpdate) return
if (!conn.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (global.db.data == null) await loadDatabase()
global.numBot = conn.user.jid
global.numBot2 = conn.user.id    
require('./main.js')(conn, m, chatUpdate, store)
})
conn.ev.on("call", async (fuckedcall) => {
const anticall = global.db.data.settings[conn.user.jid].antiCall
if (!anticall) return
for (let fucker of fuckedcall) {
if (fucker.isGroup == false) {
const callmsg = await conn.reply(fucker.from, `*${conn.user.name} no recibe ${fucker.isVideo ? `videollamadas` : `llamadas` }*\n*@${fucker.from.split('@')[0]} serás bloqueado.*\n*Si accidentalmente llamaste, comunícate con el propietario para que lo desbloquee.*`, false, {mentions: [fucker.from]})
const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:SKID CREADOR ✨\nSKID CREADOR ✨\nORG:GITHUB\nTITLE:\nitem1.TELwaid=5218442114446:+521 844 211 4446\nitem1.X-ABLabel:SKID CREADOR ✨\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:SKID CREADOR ✨nEND:VCARD`
await conn.sendMessage(fucker.from, {contacts: {displayName: 'SKID CREADOR ✨', contacts: [{vcard}]}}, {quoted: callmsg})
await conn.updateBlockStatus(fucker.from, 'block')
}}
})
conn.ev.on('group-participants.update', async ({id, participants, action}) => {
const chat = global.db.data.chats[id] || {}
const botTt = global.db.data.settings[conn?.user?.jid] || {}
let text = ''
switch (action) {
case 'add':
case 'remove':
if (chat.welcome) {
const groupMetadata = await conn.groupMetadata(id) || (conn.chats[id] || {}).metadata
for (const user of participants) {
let pp = global.noperfil
try {
pp = await conn.profilePictureUrl(user, 'image')
} catch (e) {
} finally {
const api = await conn.getFile(pp)
const bot = groupMetadata.participants.find((u) => conn.decodeJid(u.id) == conn.user.jid) || {}
const isBotAdmin = bot?.admin === 'admin' || false
text = (action === 'add' ? (chat.sWelcome || conn.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await conn.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '*sin descripción :(*') :
(chat.sBye || conn.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
conn.sendFile(id, api.data, 'pp.jpg', text, null, false, { mentions: [user] })
}}}
break
case 'promote':
case 'daradmin':
case 'darpoder':
text = (chat.sPromote || conn.spromote || conn.spromote || '@user ```is now Admin```')
case 'demote':
case 'quitaradmin':
case 'quitarpoder':
if  (!text) {
text = (chat.sDemote || conn.sdemote || conn.sdemote || '@user ```is no longer Admin```')
}
text = text.replace('@user', '@' + participants[0].split('@')[0])
if (chat.detect) {
conn.sendNyanCat(id, text, api.data, 'Dejaste de ser admin!!', '-_-')
}
break
}})
  conn.connection = connection.bind(conn)
  conn.ev.on('connection.update', conn.connection)
  conn.ev.on('creds.update', saveCreds)
  }
  jadibts()
  }
  
  
  const killJadibot = async (conn, m, command) => {
  try {
  if (!fs.existsSync(path.join(__dirname, `./jadibot/${m.sender.split("@")[0]}`))) {
  return m.reply(`tu sesion no existe`)
  } else {
  fs.rmdirSync(`./jadibot/${m.sender.split("@")[0]}`, { recursive: true })
  return m.reply(`*❗ se elimino correctamente tu sesion*`)
  }
  } catch (e) {
  throw e
  }
  }
  
  exports.listJadibot = listJadibot
  exports.jadibot = jadibots
  exports.killJadibot = killJadibot
