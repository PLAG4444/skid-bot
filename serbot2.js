   const { MessageRetryMap, useMultiFileAuthState, DisconnectReason, proto , jidNormalizedUser,WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
   const pino = require('pino')
   const { Boom } = require('@hapi/boom')   
   const yargs = require('yargs/yargs')   
   const fs = require('fs')   
   const FileType = require('file-type')   
   const chalk = require('chalk')
   const { makeWaSocket } = require('./lib/fuctions.js')
   const path = require('path')   
   const qrcode = require('qrcode')   
   const NodeCache = require('node-cache')
   const util = require('util')
   const ws = require('ws')
   const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./lib/fuctions')   
   const store = require('./lib/store.js')
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
  exports.listJadibot = listJadibot

  const jadibot = async (conn, m, command, args) => {
  if (!global.db.data.settings[conn.user.jid].jadibot) return m.reply(`*[❗] este comando fue desabilitado por el creador*`)
  if (conn.user.jid !== global.numBot) return m.reply(`*[❗] Este comando solo puede ser usado en el Bot principal!!*\n\n*—◉ Da click aquí para ir:*\n*◉* https://api.whatsapp.com/send/?phone=${global.numBot.split`@`[0]}&text=${prefix + command}&type=phone_number&app_absent=0`)
  const mcode = args[0] && args[0].includes("--code") ? true : args[1] && args[1].includes("--code") ? true : false // stoled from aiden hehe
  async function jadibt() {
  const id = m.sender
      
  if (mcode) {
    args[0] = args[0].replace("--code", "").trim()
    if (args[1]) args[1] = args[1].replace("--code", "").trim()
    if (args[0] == "") args[0] = undefined
    console.log(args[0])
  }
    if (!fs.existsSync("./jadibot/"+ id)){
        fs.mkdirSync("./jadibot/"+ id, { recursive: true });
    }
    args[0] && args[0] != undefined ? fs.writeFileSync("./jadibot/" + id + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""

    if (fs.existsSync("./jadibot/" + id + "/creds.json")) {
        let creds = JSON.parse(fs.readFileSync("./jadibot/" + id + "/creds.json"))
        if (creds) {
            if (creds.registered = false) {
                fs.unlinkSync("./jadibot/" + id + "/creds.json")
            }

        }
    }
  
   console.info = () => {}
   let { version, isLatest } = await fetchLatestBaileysVersion()
   const msgRetryCounterMap = (MessageRetryMap) => { }
   const msgRetryCounterCache = new NodeCache()
   const { state, saveState, saveCreds } = await useMultiFileAuthState("./jadibot/" + id)
   
   
   
   const JadibotSettings = {
   printQRInTerminal: false,
   getMessage: async (key) => {
   if (store) {
   const msg = await store.loadMessage(key.remoteJid, key.id);
   return conn.chats[key.remoteJid] && conn.chats[key.remoteJid].messages[key.id] ? conn.chats[key.remoteJid].messages[key.id].message : undefined }
   return proto.Message.fromObject({})},
   msgRetryCounterMap,
   msgRetryCounterCache,
   version,
   auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
   logger: pino({ level: 'silent'}),    
   browser: mcode ? ["Chrome (Linux)", "", ""] : ['Skid Bot','Safari','1.0.0'],
   defaultQueryTimeoutMs: undefined
   }
   
    
    let conn = makeWaSocket(JadibotSettings)
    conn.isInit = false
    let isInit = true
    const skmod = conn
  async function connection(update) {
  const {connection, lastDisconnect, isNewLogin, qr} = update
  if (isNewLogin) conn.isInit = false
    if (global.db.data == null) loadDatabase()
    function _0x3a1f(){const _0x5aedf5=['675SohFWf','toBuffer','39544TuYslC','requestPairingCode','840322nvVekk','2326535EtnemU','2874174WhzmvO','2001180QaFNnS','chat','209VJAUJY','14wmizqh','sendMessage','2024235vxAfTw','47276RrvOxP','2LMxVjA'];_0x3a1f=function(){return _0x5aedf5;};return _0x3a1f();}const _0x48ce3a=_0x53b6;(function(_0xd3f883,_0x49a3d4){const _0x2613e7=_0x53b6,_0x2de185=_0xd3f883();while(!![]){try{const _0xf99ba2=-parseInt(_0x2613e7(0x11c))/0x1*(parseInt(_0x2613e7(0x117))/0x2)+-parseInt(_0x2613e7(0x115))/0x3+parseInt(_0x2613e7(0x116))/0x4+-parseInt(_0x2613e7(0x11d))/0x5+-parseInt(_0x2613e7(0x11e))/0x6*(parseInt(_0x2613e7(0x113))/0x7)+parseInt(_0x2613e7(0x11a))/0x8*(-parseInt(_0x2613e7(0x118))/0x9)+parseInt(_0x2613e7(0x11f))/0xa*(parseInt(_0x2613e7(0x112))/0xb);if(_0xf99ba2===_0x49a3d4)break;else _0x2de185['push'](_0x2de185['shift']());}catch(_0x257fac){_0x2de185['push'](_0x2de185['shift']());}}}(_0x3a1f,0x7b448));if(qr&&!mcode)skmod[_0x48ce3a(0x114)](m[_0x48ce3a(0x111)],{'image':await qrcode[_0x48ce3a(0x119)](qr,{'scale':0x8}),'caption':rtx+crm9},{'quoted':m});function _0x53b6(_0x3bfeb1,_0x3a6f07){const _0x3a1f80=_0x3a1f();return _0x53b6=function(_0x53b6d5,_0xdca212){_0x53b6d5=_0x53b6d5-0x111;let _0x5d549b=_0x3a1f80[_0x53b6d5];return _0x5d549b;},_0x53b6(_0x3bfeb1,_0x3a6f07);}if(qr&&mcode){let code=await conn[_0x48ce3a(0x11b)](m['sender']['split']`@`[0x0]);skmod[_0x48ce3a(0x114)](m[_0x48ce3a(0x111)],{'text':rtx2+crm9},{'quoted':m}),await sleep(0x1388),skmod[_0x48ce3a(0x114)](m['chat'],{'text':code},{'quoted':m});}
    if (connection == 'open') {
    conn.isInit = true
    global.listJadibot.push(conn)
    await skmod.sendMessage(m.chat, {text : args[0] ? "*[❗] Reconectado con éxito!!*" : `*❗ Conectado con éxito!! Para volver a conectarte usa ${prefix + command}*`}, { quoted: m })
    if (connection === 'open'){
    skmod.sendMessage(m.chat, {text: `*❗Ya estas conectado*,\n*por favor espera a que de carguen tus mensajes*`}, { quoted: m }) 
    return console.log(await reloadHandler(false).catch(console.error))
    await sleep(5000)
    if (!args[0]) return skmod.sendMessage(m.chat, {text: prefix + command + " " + Buffer.from(fs.readFileSync("./jadibot/" + id + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
    }
    
    }
    let code = new Boom(lastDisconnect?.error)?.output?.statusCode
    conn.logger.warn(code)
    if (connection === 'close') {
        if (code == 405) {
            fs.unlinkSync("./jadibot/" + id + "/creds.json")
            return skmod.reply(m.chat, "*❗ reenvia el comando*", m)
          }
        if (code === DisconnectReason.badSession) {
            skmod.sendMessage(m.chat, {text : "*[❗] La sesión actual es inválida, Tendras que iniciar sesion de nuevo."}, { quoted: m })
            fs.rmdirSync("./jadibot/" + id, { recursive: true })
        } else if (code === DisconnectReason.connectionClosed) {
        await reloadHandler(true).catch(console.error)
        skmod.reply('*❗ la conexión se cerro*\n*intentando reconectar*')
        } else if (code === DisconnectReason.connectionLost) {
        await reloadHandler(true).catch(console.error)
        await skmod.reply(m.chat, `*❗ Conexion perdida del servidor*\n*reconexion Forzada*`, m)
        } else if (code === DisconnectReason.connectionReplaced) {
        await skmod.sendMessage(m.chat, {text : "*[❗] La conexión se reemplazó, Su conexion se cerro*"}, { quoted: m })
        } else if (code === DisconnectReason.loggedOut) {
        await skmod.reply(m.chat, `*❗ la conexión se cerrro!!*\nintenta *reconectarte* con *${prefix + command}*`, m)
        } else if (code === DisconnectReason.restartRequired) {
        skmod.reply(m.chat, '*🕐 Espera*\nestoy haciendo un *reinicio requerido* para *tu conexion*', m)
        await reloadHandler(true).catch(console.error)
        } else if (code === DisconnectReason.timedOut) {
        await reloadHandler(true).catch(console.error)
        return skmod.reply(m.chat, '❗ tu conexion *se agoto*\nintentando *reconectar*', m)
        } else {
            skmod.sendMessage(m.chat, {text : `[ ⚠ ] Razón de desconexión desconocida. ${code || ''}: ${connection || ''} Por favor reporte al desarollador.`}, { quoted: m })
        }
 let i = global.listJadibot.indexOf(skmod) 
 if (i < 0) return console.log("No se encontro") 
 delete global.listJadibot[i] 
 global.listJadibot.splice(i, 1) // I stole it from aiden (credits to him) 
}
}
    

  
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
    const oldChats = conn.chats
    try {
    conn.ws.close()
    } catch { }
    conn.ev.removeAllListeners();
    conn = makeWaSocket(JadibotSettings, {chats: oldChats});
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.connection)
    conn.ev.off('call', conn.onCall)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off("groups.update", conn.groupsUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
  }


  conn.connection = handler.handler.bind(conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onCall = handler.callUpdate.bind(global.conn)
  conn.connectionUpdate = connection.bind(global.conn);
  conn.credsUpdate = saveCreds.bind(global.conn, true);

  const currentDateTime = new Date();
  const messageDateTime = new Date(conn.ev);
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  } else {
    const chats = Object.entries(conn.chats).filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats).map((v) => v[0]);
  }

  conn.ev.on('messages.upsert', conn.connection)
  conn.ev.on('call', conn.onCall)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on("groups.update", conn.groupsUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  isInit = false;
  return true;
}
reloadHandler(false)
  }
    jadibt()
  }

const killJadibot = async (conn, m, command) => {
try {
if (!fs.existsSync(path.join(__dirname, `./jadibot/${m.sender}`))) {
return m.reply(`tu sesion no existe`)
} else {
fs.rmdirSync(`./jadibot/` + m.sender, { recursive: true })
return m.reply(`*❗ se elimino correctamente tu sesion*`)
}
} catch (e) {
throw e
}
}
exports.jadibot = jadibot
exports.killJadibot = killJadibot
