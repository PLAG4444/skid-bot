require('./settings.js')
const { smsg, sleep, makeWaSocket, protoType, serialize, getGroupAdmins, clockString }= require('./lib')
const events = require('./lib/commands')
const { useMultiFileAuthState, DisconnectReason, proto, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
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
const { format } = require('util')
const pino = require('pino')
const store = require('./lib')
protoType()
serialize()
var low
try {
low = require('lowdb')
} catch (e) {
low = require('./database/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./database/mongoDB')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const dbAdapter = /^https?:\/\//.test(opts['db'])
  ? new cloudDBAdapter(opts['db'])
  : /mongodb/.test(opts['db'])
  ? new mongoDB(opts['db'])
  : new JSONFile(`./database.json`)
global.db = new Low(dbAdapter)
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
setInterval(async () => {
if (global.db.data || global.db ) await global.db.write()
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

async function startBot() {
console.info = () => {}
const msgRetryMap = (MessageRetryMap) => { }
const {state, saveState, saveCreds} = await useMultiFileAuthState('./authFolder')
let { version, isLatest } = await fetchLatestBaileysVersion()

const connectionSettings = {
    printQRInTerminal: true,
    logger: pino({ level: 'silent' }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
    msgRetryMap,
    version,
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
conn.welcome = '*「 Grupos 」*\n\n*Hola @user bienvenido a @subject*\n*「 Reglas y desc 」*\n\n@desc'
conn.bye = '*「 Grupos 」*\n*se nos fue @user*\n*adios bro 👋*'
conn.spromote = '*「 Grupos 」*\n*Tenemos a un nuevo admin*\n*saluden a @user como nuevo admin*'
conn.sdemote = '*「 Grupos 」*\n*@user deja de ser admin :<*'
conn.sDesc = '*「 Grupos 」*\n*un admin modifico la descripción*\n*nueva descripción:*\n@desc'
conn.sSubject = '*「 Grupos 」*\n*el nombre del grupo fue cambiado!!*\n*el nuevo nombre es* @subject ^w^'
conn.sIcon = '*「 Grupos 」*\n*Se cambio la foto del grupo ^w^*'
conn.sRevoke = '*「 Grupos 」*\n*Hay un nuevo link del grupo nwn*\n*nuevo link:* @revoke'

conn.ev.on("messages.upsert", async (chatUpdate) => {
conn.pushMessage(chatUpdate.messages).catch(console.error)
let m = chatUpdate.messages[chatUpdate.messages.length - 1]
m = smsg(conn, m) || m
if (!m) return
if (m.isBaileys) return
if (!chatUpdate) return
if (!conn.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (global.db.data == null) await loadDatabase()
var body = (typeof m.text == 'string' ? m.text : '') 
global.numBot = conn.user.jid
global.numBot2 = conn.user.id
  const prefix = new RegExp('^[' + ('/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
  const isCmd = body ? prefix.test(body) : false
  const args = body.trim().split(/ +/).slice(1) 
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(m.sender) 
  const isBot = conn.user?.jid
  const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  
  const isBotAdmins = m.isGroup ? groupAdmins.includes(isBot) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false 
  const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false
  if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
  try {
  const text = m.text
  cmd.function(conn, m, { text, args, isCreator, body, isBot, isGroupAdmins, isBotAdmins, groupAdmins, participants, groupMetadata, groupName })
  } catch (e) {
  m.reply(format(e))
  }}}
  
  events.commands.map(async(command) => {
  if (body && command.on === "body") {
  command.function(conn, m, { text, args, isCreator, body, isBot, isGroupAdmins, isBotAdmins, groupAdmins, participants, groupMetadata, groupName, body });
  } else if (m.text && command.on === "text") {
  command.function(conn, m, { text, args, isCreator, body, isBot, isGroupAdmins, isBotAdmins, groupAdmins, participants, groupMetadata, groupName });
  } else if (
  (command.on === "image" || command.on === "photo") &&
  m.mtype === "imageMessage"
  ) {
  command.function(conn, m, { text, args, isCreator, body, isBot, isGroupAdmins, isBotAdmins, groupAdmins, participants, groupMetadata, groupName });
  } else if (
  command.on === "sticker" &&
  m.mtype === "stickerMessage"
  ) {
  command.function(conn, m, { text, args, isCreator, body, isBot, isGroupAdmins, isBotAdmins, groupAdmins, participants, groupMetadata, groupName });
  }
  })

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
conn.sendNyanCat(this.chat, text, api.data, 'Dejaste de ser admin!!', '-_-')
}
break
}})
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
await conn.sendNyanCat(id, text, global.menu2, '[ I N F O ]', 'ajustes del grupo!!')
}})
conn.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (connection == 'connecting') {
conn.logger.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊🧡 INICIANDO AGUARDE UN MOMENTO...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
} 
if (qr !== undefined) {
conn.logger.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ESCANEA EL QR, EXPIRA 45 SEG...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
}
if (connection === 'close') {
conn.logger.warn(`\n⚠️ CONEXION CERRADA, INTENTANDO RECONECTAR...`)
lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startBot() : conn.logger.error(`\n❌ WA WEB LOGGED OUT`)
} 
if (connection == 'open') {
conn.logger.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊Skid bot Se Conecto Correctamente a WhatsApp\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
fs.readdirSync(__dirname + "/commands").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require(__dirname + "/commands/" + plugin);
}
})
}})
conn.ev.on('creds.update', saveCreds)
conn.public = true
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
}
process.on('uncaughtException', console.error);
startBot()