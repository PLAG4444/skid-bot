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
  const id = `${m.sender.split("@")[0]}`
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
    browser: ['SkidBot', 'Safari', '1.0.0'],
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
  const _0x474876=_0x3af8;function _0x3af8(_0x3f1c8f,_0x21bce5){const _0x9f30e6=_0x9f30();return _0x3af8=function(_0x3af864,_0xe3a2e5){_0x3af864=_0x3af864-0x13f;let _0x2a0b5c=_0x9f30e6[_0x3af864];return _0x2a0b5c;},_0x3af8(_0x3f1c8f,_0x21bce5);}(function(_0x420b0b,_0x482f33){const _0x3b126a=_0x3af8,_0x3d41fa=_0x420b0b();while(!![]){try{const _0x1c923f=-parseInt(_0x3b126a(0x149))/0x1+parseInt(_0x3b126a(0x142))/0x2*(parseInt(_0x3b126a(0x148))/0x3)+parseInt(_0x3b126a(0x14e))/0x4+-parseInt(_0x3b126a(0x152))/0x5+-parseInt(_0x3b126a(0x147))/0x6*(parseInt(_0x3b126a(0x14d))/0x7)+parseInt(_0x3b126a(0x14b))/0x8*(-parseInt(_0x3b126a(0x145))/0x9)+parseInt(_0x3b126a(0x143))/0xa*(parseInt(_0x3b126a(0x141))/0xb);if(_0x1c923f===_0x482f33)break;else _0x3d41fa['push'](_0x3d41fa['shift']());}catch(_0x4be0d6){_0x3d41fa['push'](_0x3d41fa['shift']());}}}(_0x9f30,0x3608c));if(qr&&!mcode)return skmod['sendMessage'](m[_0x474876(0x151)],{'image':await qrcode[_0x474876(0x14a)](qr,{'scale':0x8}),'caption':rtx+crm9[_0x474876(0x140)]('utf-8')},{'quoted':m});if(qr&&mcode){skmod[_0x474876(0x144)](m[_0x474876(0x151)],{'text':rtx2+crm9[_0x474876(0x140)](_0x474876(0x14c))},{'quoted':m}),await sleep(0x1388);let secret=await conn[_0x474876(0x14f)](m[_0x474876(0x13f)][_0x474876(0x146)]`@`[0x0]);await skmod[_0x474876(0x150)](m[_0x474876(0x151)],secret,m);}function _0x9f30(){const _0x4b38b4=['381athFuD','420691MBryCY','toBuffer','3520992unCXaW','utf-8','329NuiNIW','507660kTHtWL','requestPairingCode','reply','chat','1300105avBlay','sender','toString','25399EuYrpb','3502DdOQHb','4610hRvniS','sendMessage','9OBKGHH','split','9138axDPTl'];_0x9f30=function(){return _0x4b38b4;};return _0x9f30();}
  if (connection == "open") {   
   conn.isInit = true
   global.listJadibot.push(conn)
   await skmod.sendMessage(m.chat, { text: args[0] ? "*✅ Reconectando...*" : `*✅ Conectado con exito*\n*Si tu bot fue desconectado usa ${prefix + command}*` }, { quoted: m })
   }
   if (connection === 'open') {
   await sendMessage(m.chat, { text: args[0] ?  `*✅ Reconexion Exitosa*\n*tus mensajes se estan cargando*` : `*✅ Jadibot Conectado*\n*se te enviara un codigo para volver a conectarte*` }, { quoted: m })
   await sleep(5000)
   if (!args[0]) skmod.sendMessage(m.chat, { text: `${prefix + command } ` + Buffer.from(fs.readFileSync(`./jadibot/${id}/creds.json`), "utf-8").toString("base64") }, { quoted: m })
   }
   const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode 
   console.log(code) 
   if (connection === 'close') {
   if (code == 405) { 
   fs.unlinkSync("./jadibots/" + id + "/creds.json") 
   return skmod.sendMessage(m.chat, {text : "*❗ Por favor, reenvia el comando*"}, { quoted: m }) 
   } 
   if (code === DisconnectReason.badSession) { 
   skmod.sendMessage(m.chat, {text : "*❗ La sesión actual es inválida, Tendras que iniciar sesion de nuevo."}, { quoted: m }) 
   fs.rm("./jadibots/" + id, { recursive: true }) 
   } else if (code === DisconnectReason.connectionClosed) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se cerró, se intentara reconectar automáticamente...*\n" }, { quoted: m }) 
   await reloadHandler(true).catch(console.error) 
   } else if (code === DisconnectReason.connectionLost) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se perdió, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await reloadHandler(true).catch(console.error) 
   } else if (code === DisconnectReason.connectionReplaced) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se reemplazó, Su conexion se cerro*"}, { quoted: m }) 
   } else if (code === DisconnectReason.loggedOut) { 
   skmod.sendMessage(m.chat, {text : "*❗ La sesión actual se cerró, Si desea volver a conectarse tendra que iniciar sesion de nuevo*"}, { quoted: m }) 
   } else if (code === DisconnectReason.restartRequired) { 
   skmod.sendMessage(m.chat, {text : "*❗ Reinicio requerido, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await reloadHandler(true).catch(console.error) 
   } else if (code === DisconnectReason.timedOut) { 
   skmod.sendMessage(m.chat, {text : "*❗ La conexión se agotó, se intentara reconectar automáticamente...*"}, { quoted: m }) 
   await reloadHandler(true).catch(console.error) 
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
  let reloadHandler = async function(restatConn) { 
  let handler = require('./handler.js') 
   if (restatConn) { 
   try { conn.ws.close() } catch { } 
   conn.ev.removeAllListeners() 
   conn = makeWaSocket(connectionSettings) 
   isInit = true 
   } 
   if (!isInit) { 
   conn.ev.off('messages.upsert', conn.connection) 
   conn.ev.off('call', conn.onCall) 
   conn.ev.off('group-participants.update', conn.participantsUpdate) 
   conn.ev.off("groups.update", conn.groupsUpdate) 
   conn.ev.off('message.delete', conn.deleteUpdate) 
   conn.ev.off('connection.update', conn.connectionUpdate) 
   conn.ev.off('creds.update', conn.credsUpdate) 
   conn.ev.off('messages.update', conn.pollCmd) 
   } 
  
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
   isInit = false 
   return true 
  } 
  reloadHandler(false)
  }
  jadibots()
  }
  const killJadibot = async (conn, m, command) => {
  try {
  if (!fs.existsSync(path.join(__dirname, `./jadibot/${id}`))) {
  return m.reply(`tu sesion no existe`)
  } else {
  fs.rmdirSync(`./jadibots/` + id, { recursive: true })
  return m.reply(`*❗ se elimino correctamente tu sesion*`)
  }
  } catch (e) {
  throw e
  }
  }
  
  exports.listJadibot = listJadibot
  exports.jadibot = jadibot
  exports.killJadibot = killJadibot
