(async () => {
require("./settings")
const { smsg, sleep, makeWaSocket, protoType, serialize, getGroupAdmins, clockString }= require('./lib/fuctions')
const { makeInMemoryStore, areJidsSameUser, useMultiFileAuthState, DisconnectReason, proto, jidNormalizedUser, WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys")
const gradient = require('gradient-string')
const fs = require('fs')
const { watchFile, unwatchFile } = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')
const path = require('path')
const { spawn, execSync } = require('child_process')
const { tmpdir } = require('os')
const { join, basename } = require('path')
const { readdirSync, statSync, unlinkSync } = require('fs')
const { Boom } = require('@hapi/boom')
const yargs = require('yargs/yargs')
const ws = require('ws')
const _ = require('lodash')
const NodeCache = require('node-cache')
const pino = require('pino')
const store = require('./lib/store.js')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./database/lowdb')
}
const { Low, JSONFile } = low
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
users: {},
chats: {},
game: {},
database: {},
settings: {},
setting: {},
others: {},
sticker: {},
...(global.db.data || {})}
  global.db.chain = _.chain(global.db.data)}
loadDatabase() //mario baboso me lo robas y te rompo tu madre
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

function clearTmp() {
  const tmp = [tmpdir(), join(__dirname, './temp')]
  const filename = []
  
  tmp.forEach((dirname) => readdirSync(dirname).forEach((file) => filename.push(join(dirname, file))))
  
  return filename.map((file) => {
    const stats = statSync(file)
    
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) {
      return unlinkSync(file) // 3 minutes
    }
    
    return false
  })
}
async function startbot() {
console.info = () => {}
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const {state, saveState, saveCreds} = await useMultiFileAuthState('./authFolder/')
let { version, isLatest } = await fetchLatestBaileysVersion()
const connectionSettings = {
    printQRInTerminal: true,
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
const conn = makeWaSocket(connectionSettings)
conn.isInit = false
conn.well = false
conn.logger.info(`Ƈᴀʀɢᴀɴᴅᴏ．．．\n`)
let isInit = true
  conn.welcome = '*「 Grupos 」*\n\n*Hola @user bienvenido a @subject*\n*「 Reglas y desc 」*\n\n@desc'
  conn.bye = '*「 Grupos 」*\n*se nos fue @user*\n*adios bro 👋*'
  conn.spromote = '*「 Grupos 」*\n*Tenemos a un nuevo admin*\n*saluden a @user como nuevo admin*'
  conn.sdemote = '*「 Grupos 」*\n*@user deja de ser admin :<*'
  conn.sDesc = '*「 Grupos 」*\n*un admin modifico la descripción*\n*nueva descripción:*\n@desc'
  conn.sSubject = '*「 Grupos 」*\n*el nombre del grupo fue cambiado!!*\n*el nuevo nombre es* @subject ^w^'
  conn.sIcon = '*「 Grupos 」*\n*Se cambio la foto del grupo ^w^*'
  conn.sRevoke = '*「 Grupos 」*\n*Hay un nuevo link del grupo nwn*\n*nuevo link:* @revoke'

  

  
  conn.ev.on('messages.upsert', async (chatUpdate) => {
  conn.msgqueque = conn.msgqueque || []
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!chatUpdate) return
  if (!m) return
  m = smsg(conn, m) || m    
  if (m.key.id.startsWith("BAE5")) return  
  var body = (typeof m.text == 'string' ? m.text : '') 
  const msgs = (message) => { 
  if (message.length >= 10) { 
  return `${message.substr(0, 500)}` 
  } else { 
  return `${message}`}}
  const _isBot = conn.user.jid
  const args = body.trim().split(/ +/).slice(1) 
  const pushname = m.pushName || "Sin nombre" 
  const userSender = m.key.fromMe ? _isBot : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid  
  const quoted = m.quoted ? m.quoted : m 
  const sender = m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid 
  const mime = (quoted.msg || quoted).mimetype || ''  
  const isMedia = /image|video|sticker|audio/.test(mime)
  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  const isBotAdmins = m.isGroup ? groupAdmins.includes(conn.user.jid) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false  
  if (!conn.public && m.key.fromMe) return
  if (typeof m.text !== 'string') {
  m.text = ''
  }
  if (m.isBaileys) return
  if (!conn.public && !m.key.fromMe && chatUpdate.type === 'notify') return
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
 if (m.message) { 
 conn.logger.info(chalk.bold.white(`\n▣────────────···\n│${botname} ${conn.user.id == global.numBot2 ? '' : '(jadibot)'}`),  
 chalk.bold.white('\n│📑TIPO (SMS): ') + chalk.yellowBright(`${m.mtype}`),  
 chalk.bold.white('\n│📊USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(m.sender),  
 m.isGroup ? chalk.bold.white('\n│📤GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(m.chat) : chalk.bold.greenBright('\n│📥PRIVADO'),  
 chalk.bold.white('\n️│🏷️ TAGS: ') + chalk.bold.white(`[${conn.public ? 'Publico' : 'Privado'}]`),  
 chalk.bold.white('\n│💬MENSAJE: ') + chalk.bold.white(`${msgs(m.text)}`) + chalk.whiteBright(`\n▣────────────···\n`)) 
 }
  require("./main")(conn, m, chatUpdate, store)
  })
  conn.ev.on('call', async (fuckedcall) => {
  const anticall = global.db.data.settings[conn.user.jid].antiCall
  if (!anticall) return
  for (let fucker of fuckedcall) {
    if (fucker.isGroup == false) {
        const callmsg = await conn.reply(fucker.from, `*${conn.user.name} no recibe ${fucker.isVideo ? `videollamadas` : `llamadas` }*\n*@${fucker.from.split('@')[0]} serás bloqueado.*\n*Si accidentalmente llamaste, comunícate con el propietario para que lo desbloquee.*`, false, {mentions: [fucker.from]})
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:SKID CREADOR ✨\nSKID CREADOR ✨\nORG:GITHUB\nTITLE:\nitem1.TELwaid=5218442114446:+521 844 211 4446\nitem1.X-ABLabel:SKID CREADOR ✨\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:SKID CREADOR ✨nEND:VCARD`
        await conn.sendMessage(fucker.from, {contacts: {displayName: 'SKID CREADOR ✨', contacts: [{vcard}]}}, {quoted: callmsg})
        await conn.updateBlockStatus(fucker.from, 'block')
      }
    }
  })
  conn.ev.on('group-participants.update', async ({id, participants, action}) => {
  if (global.db.data == null) await loadDatabase()
  const chat = global.db.data.chats[id] || {}
  const botTt = global.db.data.settings[conn?.user?.jid] || {}
  let text = ''
  switch (action) {
    case 'add':
    case 'remove':
    if(chat.welcome) {
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
    }
    }
    }
    break
    case 'promote':
    case 'daradmin':
    case 'darpoder':
      text = (chat.sPromote || conn.spromote || conn.spromote || '@user ```is now Admin```')
    case 'demote':
    case 'quitarpoder':
    case 'quitaradmin':
      if (!text) {
        text = (chat.sDemote || conn.sdemote || conn.sdemote || '@user ```is no longer Admin```')
      }
      text = text.replace('@user', '@' + participants[0].split('@')[0])
      if (chat.detect) {
        conn.sendMessage(id, { text, mentions: conn.parseMention(text) })
      }
      break
    }
  })
  conn.ev.on("groups.update", async (groupsUpdate) => {
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    if (groupUpdate.size == NaN) continue
    if (groupUpdate.subjectTime) continue
    const chats = global.db.data.chats[id]
    let text = ''
    if (!chats?.autoDetect) continue
    if (groupUpdate.desc) text = (chats.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
    if (groupUpdate.subject) text = (chats.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
    if (groupUpdate.icon) text = (chats.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
    if (groupUpdate.revoke) text = (chats.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
    if (!text) continue
    await conn.sendNyanCat(m.chat, text, global.menu2, '[ I N F O ]', 'ajustes del grupo!!')
  }})
/*  conn.ev.on("message.delete", aysnc (mesage) => {
  let d = new Date(new Date + 3600000)
  let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
  let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
  try {
  const { fromMe, id, participant } = mesage
  if (fromMe) return 
  let msg = conn.serializeM(conn.loadMessage(id))
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
        await conn.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
        conn.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
  })*/
  conn.ev.on('connection.update', async (up) => {
  const {connection, lastDisconnect, isNewLogin, qr} = up
  if (isNewLogin) conn.isInit = true
  if (global.db.data == null) loadDatabase()
  if (qr !== undefined) {
    console.log(chalk.yellow(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ESCANEA EL QR, EXPIRA 45 SEG...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`))
  }
  if (connection == 'open') {
    console.log(chalk.yellow(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊Skid bot Se Conecto Correctamente a WhatsApp\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`))
    global.numBot = conn?.user?.jid
   global.numBot2 = conn?.user?.id
  }
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
        conn.logger.error(`[ ⚠ ] Sesión incorrecta, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`)
    } else if (reason === DisconnectReason.connectionClosed) {
        conn.logger.warn(`[ ⚠ ] Conexión cerrada, reconectando...`)
        await startbot().catch(console.error)
    } else if (reason === DisconnectReason.connectionLost) {
        conn.logger.warn(`[ ⚠ ] Conexión perdida con el servidor, reconectando...`)
        await startbot().catch(console.error)
    } else if (reason === DisconnectReason.connectionReplaced) {
        conn.logger.error(`[ ⚠ ] Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`)
        //process.exit()
    } else if (reason === DisconnectReason.loggedOut) {
        conn.logger.error(`[ ⚠ ] Conexion cerrada, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`)
        //process.exit()
    } else if (reason === DisconnectReason.restartRequired) {
        conn.logger.info(`[ ⚠ ] Reinicio necesario, reinicie el servidor si presenta algún problema.`)
        await startbot().catch(console.error)
    } else if (reason === DisconnectReason.timedOut) {
        conn.logger.warn(`[ ⚠ ] Tiempo de conexión agotado, reconectando...`)
        await startbot().catch(console.error)
    } else {
        conn.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`)
        await startbot().catch(console.error)
    }
  }
  })
  conn.ev.on('creds.update', saveCreds)
  conn.public = true
}
async function _quickTest() {
  let test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version'])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on('error', _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

setInterval(async () => {
await clearTmp()
await conn.logger?.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ ✅ Eliminando archivos temporales\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
}, 180000)
setInterval(async () => {
await clearTmp()
await conn.logger?.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ ✅ Eliminando archivos temporales\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
}, 180000)

protoType()
serialize()
startbot()
_quickTest()
process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)
})()