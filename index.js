(async () => {
require("./settings")
const { makeInMemoryStore, useMultiFileAuthState, DisconnectReason, proto , jidNormalizedUser,WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, getAggregateVotesInPollMessage, MessageRetryMap } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const moment = require('moment')
const ws = require('ws')
const { Boom } = require('@hapi/boom')   
const fs = require('fs')
const yargs = require('yargs/yargs')
const { smsg, sleep, makeWaSocket, protoType, serialize }= require('./lib/fuctions')
const _ = require('lodash')
const NodeCache = require('node-cache')
const os = require('os')
const { execSync } = require('child_process')
const util = require('util')
const pino = require('pino')
const store = require('./lib/store.js')
const { tmpdir } = require('os')
const { join, basename } = require('path')
const { readdirSync, statSync, unlinkSync } = require('fs')
const color = (text, color) => {
return !color ? chalk.green(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
}
protoType()
serialize()
//base de datos
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./database/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./database/mongoDB')

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
       if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'temp'], tmp.forEach((filename) => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete']))) 
     }, 30 * 1000) 
   } 
 }
setInterval(async () => {
await clearTmp()
await this.logger?.info(
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ ✅ Eliminando archivos temporales\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`, '#00FFFF')
        )
}, 180000)
//_________________
    
async function startBot() {

console.info = () => {}
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
global.authFile = 'authFolder'
const {state, saveState, saveCreds} = await useMultiFileAuthState(global.authFile)
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

let conn = makeWaSocket(connectionSettings)
conn.isInit = false
conn.well = false
conn.logger.info(`Ƈᴀʀɢᴀɴᴅᴏ．．．\n`)


/*async function connection(chatUpdate) {
try {
if (!chatUpdate) {
return
}
  this.pushMessage(chatUpdate.messages).catch(console.error);
  let m = chatUpdate.messages[chatUpdate.messages.length - 1];
  if (!m) {
    return
  }
    try {
        mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return
        if (!conn.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        if (mek.key.id.startsWith('FatihArridho_')) return        
        global.numBot = conn.user.id.split(":")[0] + "@s.whatsapp.net"
        global.numBot2 = conn.user.id
        m = smsg(conn, mek) || m
        if (!m) {
        return
        }
        
        } catch (e) {
        console.log(e)
        }
       
    } catch (err) {
        console.log(err)
    }
}*/
    


async function connectionUpdate(update) {
  const {connection, lastDisconnect, isNewLogin, qr} = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code && code !== DisconnectReason.loggedOut && conn?.ws?.socket == null) {
    await global.reload(true).catch(console.error)
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
        await global.reload(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionLost) {
        conn.logger.warn(`[ ⚠ ] Conexión perdida con el servidor, reconectando...`)
        await global.reload(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionReplaced) {
        conn.logger.error(`[ ⚠ ] Conexión reemplazada, se ha abierto otra nueva sesión. Por favor, cierra la sesión actual primero.`)
        //process.exit()
    } else if (reason === DisconnectReason.loggedOut) {
        conn.logger.error(`[ ⚠ ] Conexion cerrada, por favor elimina la carpeta ${global.authFile} y escanea nuevamente.`)
        //process.exit()
    } else if (reason === DisconnectReason.restartRequired) {
        conn.logger.info(`[ ⚠ ] Reinicio necesario, reinicie el servidor si presenta algún problema.`)
        await global.reload(true).catch(console.error)
    } else if (reason === DisconnectReason.timedOut) {
        conn.logger.warn(`[ ⚠ ] Tiempo de conexión agotado, reconectando...`)
        await global.reload(true).catch(console.error)
    } else {
        conn.logger.warn(`[ ⚠ ] Razón de desconexión desconocida. ${reason || ''}: ${connection || ''}`)
        await global.reload(true).catch(console.error)
    }
}
}


let isInit = true
let handler = require('./handler.js')
global.reload = async function(restatConn) {

  if (restatConn) {
    const oldChats = conn.chats;
    try {
    conn.ws.close()
    } catch { }
    conn.ev.removeAllListeners();
    conn = makeWaSocket(connectionSettings, {chats: oldChats});
    isInit = true;
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.connection)
    conn.ev.off('call', conn.onCall)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off("groups.update", conn.groupsUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate);
    conn.ev.off('creds.update', conn.credsUpdate);
    conn.ev.off('message.delete', conn.deleteUpdate);
    conn.ev.off('messages.update', conn.pollCmd);
  }

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
  conn.ev.on('message.delete', conn.deleteUpdate);
  conn.ev.on('connection.update', conn.connectionUpdate);
  conn.ev.on('creds.update', conn.credsUpdate);
  conn.ev.on('messages.update', conn.pollCmd);
  isInit = false;
  return true;
}

await global.reload()



conn.public = true

process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)


}

startBot()

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

_quickTest()
})()
