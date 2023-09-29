const { proto, DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')
const { makeWaSocket, sleep } = require('./lib/fuctions.js')
const qrcode = require('qrcode')   
const NodeCache = require('node-cache')
const pino = require('pino')
const ws = require('ws')
const store = require('./lib/store.js')
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
  const {state, saveState, saveCreds} = await useMultiFileAuthState('./jadibot/' + id)
  const { version, isLatest } = await fetchLatestBaileysVersion()   

  const connectionSettings = {
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
    msgRetry,
    msgRetryCache,
    version,
    syncFullHistory: true,
    browser: mcode ? ['Chrome (Linux)','',''] : ['SkidBot', 'Safari', '1.0.0'],
    getMessage: async (key) => { 
    if (store) { 
    const msg = await store.loadMessage(key.remoteJid, key.id) 
    return conn.chats[key.remoteJid] && conn.chats[key.remoteJid].messages[key.id] ? conn.chats[key.remoteJid].messages[key.id].message : undefined 
    } 
    return proto.Message.fromObject({})
    }
  }
  
  /**
  * @type {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket | import('./lib/fuctions.js').makeWaSocket}
  */
  
  let conn = makeWaSocket(connectionSettings)
  let isInit = true
  conn.isInit = false
  
  async function connectionUpdate(up) {
  const { connection, lastDisconnect, isNewLogin, qr } = up
  if (isNewLogin) conn.isInit = false
  if (global.db.data == null) loadDatabase()
   const _0x24bde8=_0x53f7;(function(_0x6d302e,_0x11d41e){const _0x15870d=_0x53f7,_0x36c214=_0x6d302e();while(!![]){try{const _0x32686d=parseInt(_0x15870d(0x1b8))/0x1+parseInt(_0x15870d(0x1b7))/0x2+-parseInt(_0x15870d(0x1b2))/0x3+parseInt(_0x15870d(0x1b1))/0x4+parseInt(_0x15870d(0x1ba))/0x5+parseInt(_0x15870d(0x1b3))/0x6+-parseInt(_0x15870d(0x1b6))/0x7;if(_0x32686d===_0x11d41e)break;else _0x36c214['push'](_0x36c214['shift']());}catch(_0x4c2faa){_0x36c214['push'](_0x36c214['shift']());}}}(_0x2e67,0xea015));if(qr&&!mcode)skmod['sendMessage'](m[_0x24bde8(0x1b0)],{'image':await qrcode[_0x24bde8(0x1b4)](qr,{'scale':0x8}),'caption':rtx+crm9},{'quoted':m});function _0x53f7(_0x333d67,_0x1db60c){const _0x2e673a=_0x2e67();return _0x53f7=function(_0x53f703,_0x34f672){_0x53f703=_0x53f703-0x1b0;let _0x551fb7=_0x2e673a[_0x53f703];return _0x551fb7;},_0x53f7(_0x333d67,_0x1db60c);}function _0x2e67(){const _0x4535e7=['836572OevVNN','requestPairingCode','2583245vMAdpi','chat','5673296lFxeop','2893536YDbUoK','8807304Luxpcu','toBuffer','sendMessage','29228647PiqIIg','3718178cJmfpk'];_0x2e67=function(){return _0x4535e7;};return _0x2e67();}if(qr&&mcode){let supercode=await conn[_0x24bde8(0x1b9)](m['sender']['split']`@`[0x0]);skmod[_0x24bde8(0x1b5)](m[_0x24bde8(0x1b0)],{'text':rtx2+crm9},{'quoted':m}),await sleep(0x1388),skmod[_0x24bde8(0x1b5)](m['chat'],{'text':supercode},{'quoted':m});}
   if (connection == "open") {   
   conn.isInit = true
   global.listJadibot.push(conn)
   await skmod.sendMessage(m.chat, { text: args[0] ? "*✅ Reconectando...*" : `*✅ Conectado con exito*\n*Si tu bot fue desconectado usa ${prefix + command}*` }, { quoted: m })
   return console.log(await reloadHandler(true).catch(console.error))
   }
   if (connection === 'open') {
   await skmod.sendMessage(m.chat, { text: args[0] ?  `*✅ Reconexion Exitosa*\n*tus mensajes se estan cargando*` : `*✅ Jadibot Conectado*\n*se te enviara un codigo para volver a conectarte*` }, { quoted: m })
   await sleep(5000)
   if (!args[0]) skmod.sendMessage(m.chat, { text: `${prefix + command } ` + Buffer.from(fs.readFileSync(`./jadibot/${id}/creds.json`), "utf-8").toString("base64") }, { quoted: m })
   }
   const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode 
   console.log(code) 
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
   await jadibots().catch(console.error) 
   } else if (code === DisconnectReason.connectionLost) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se perdió, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await jadibots().catch(console.error) 
   } else if (code === DisconnectReason.connectionReplaced) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se reemplazó, Su conexion se cerro*"}, { quoted: m }) 
   } else if (code === DisconnectReason.loggedOut) { 
   skmod.sendMessage(m.chat, {text : "*❗ La sesión actual se cerró, Si desea volver a conectarse tendra que iniciar sesion de nuevo*"}, { quoted: m }) 
   } else if (code === DisconnectReason.restartRequired) { 
   skmod.sendMessage(m.chat, {text : "*❗ Reinicio requerido, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await jadibots().catch(console.error) 
   } else if (code === DisconnectReason.timedOut) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se agotó, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await jadibots().catch(console.error) 
   } else { 
   skmod.sendMessage(m.chat, {text : ` ⚠  Razón de desconexión desconocida. ${code || ''}: ${connection || ''} Por favor reporte al desarollador.`}, { quoted: m }) 
   } 
  let i = global.listJadibot.indexOf(conn)  
  if (i < 0) return console.log("No se encontro")  
  delete global.listJadibot[i]  
  global.listJadibot.splice(i, 1) // I stole it from aiden (credits to him)  
  }}
  
setInterval(async () => { 
  if (!conn.user) { 
  try { 
  conn.ws.close() 
  } catch {  
  } 
  
  conn.ev.removeAllListeners() 
  let i = global.listJadibot.indexOf(conn) 
  if (i < 0) return  
  delete global.listJadibot[i] 
  global.listJadibot.splice(i, 1) 
  }}, 60000) //again aiden -.-
  
  
  let handler = require('./handler.js') 

  

  
  

  
  conn.connection = handler.handler.bind(conn) 
  conn.participantsUpdate = handler.participantsUpdate.bind(conn) 
  conn.groupsUpdate = handler.groupsUpdate.bind(conn) 
  conn.deleteUpdate = handler.deleteUpdate.bind(conn) 
  conn.onCall = handler.callUpdate.bind(conn) 
  conn.pollCmd = handler.pollCmd.bind(conn) 
  conn.connectionUpdate = connectionUpdate.bind(conn) 
  conn.credsUpdate = saveCreds.bind(conn, true)   
  conn.ev.on('messages.upsert', conn.connection) 
  conn.ev.on('call', conn.onCall) 
  conn.ev.on('group-participants.update', conn.participantsUpdate) 
  conn.ev.on("groups.update", conn.groupsUpdate) 
  conn.ev.on('message.delete', conn.deleteUpdate) 
  conn.ev.on('connection.update', conn.connectionUpdate) 
  conn.ev.on('creds.update', conn.credsUpdate) 
  conn.ev.on('messages.update', conn.pollCmd)  
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
