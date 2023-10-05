(async () => {
require("./settings")
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")
const { smsg, sleep, makeWaSocket, protoType, serialize }= require('./lib/fuctions')
const { spawn, execSync } = require('child_process')
const { MongoClient } = require("mongodb")
const { tmpdir } = require('os')
const { join, basename } = require('path')
const { readdirSync, statSync, unlinkSync } = require('fs')
const { Boom } = require('@hapi/boom')
const useMongoDBAuthState = require("./lib/authcreds.js")
const fs = require('fs')
const yargs = require('yargs/yargs')
const chalk = require('chalk')
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

global.__filename = function filename(pathURL = path.basename(__filename), rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}

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



if (!opts['test']) { 
   if (global.db) { 
     setInterval(async () => { 
       if (global.db.data) await global.db.write() 
       if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [tmpdir(), 'temp'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete']))) 
     }, 30 * 1000) 
   } 
 }
setInterval(async () => {
await clearTmp()
await this.logger?.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ ✅ Eliminando archivos temporales\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
}, 180000)

protoType()
serialize()

async function startbot() {
console.info = () => {}
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()


const {state, saveState, saveCreds} = await useMultiFileAuthState('./authFolder/')
let { version, isLatest } = await fetchLatestBaileysVersion()  
//const { state, saveCreds } = await useMongoDBAuthState(collection) 

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

global.conn = makeWaSocket(connectionSettings)
conn.isInit = false
conn.well = false
conn.logger.info(`Ƈᴀʀɢᴀɴᴅᴏ．．．\n`)

async function connectionUpdate(update) {
  const {connection, lastDisconnect, isNewLogin, qr} = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws?.socket == null) {
    await startbot().catch(console.error)
  }
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
}


let isInit = true
let handler = require('./handler.js')


  conn.welcome = '*「 Grupos 」*\n\n*Hola @user bienvenido a @subject*\n*「 Reglas y desc 」*\n\n@desc'
  conn.bye = '*「 Grupos 」*\n*se nos fue @user*\n*adios bro 👋*'
  conn.spromote = '*「 Grupos 」*\n*Tenemos a un nuevo admin*\n*saluden a @user como nuevo admin*'
  conn.sdemote = '*「 Grupos 」*\n*@user deja de ser admin :<*'
  conn.sDesc = '*「 Grupos 」*\n*un admin modifico la descripción*\n*nueva descripción:*\n@desc'
  conn.sSubject = '*「 Grupos 」*\n*el nombre del grupo fue cambiado!!*\n*el nuevo nombre es* @subject ^w^'
  conn.sIcon = '*「 Grupos 」*\n*Se cambio la foto del grupo ^w^*'
  conn.sRevoke = '*「 Grupos 」*\n*Hay un nuevo link del grupo nwn*\n*nuevo link:* @revoke'

  conn.connection = handler.handler.bind(conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(conn)
  conn.deleteUpdate = handler.deleteUpdate.bind(conn)
  conn.onCall = handler.callUpdate.bind(conn)
  conn.pollCmd = handler.pollCmd.bind(conn)
  conn.connectionUpdate = connectionUpdate.bind(conn);
  conn.credsUpdate = saveCreds.bind(conn, true);

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
  conn.ev.on('message.delete', conn.deleteUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('messages.update', conn.pollCmd)
  conn.ev.on('creds.update', conn.credsUpdate)
}


conn.public = true

process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)

setInterval(async () => {
await clearTmp()
await this.logger?.info(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ ✅ Eliminando archivos temporales\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`)
}, 180000)
setInterval(async () => {
startbot()
}, 2 * 60 * 60 * 1000)

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
startbot()
_quickTest()
})()
