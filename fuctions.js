const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, toAudio } = require('./functions2.js')
const { default: _makeWaSocket, makeWALegacySocket, WAMessageStubType, getContentType, relayMessage, areJidsSameUser, generateWAMessage, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto } = require("@whiskeysockets/baileys")
const chalk = require('chalk')
const fs = require('fs')
const child_process = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const Crypto = require('crypto')
const axios = require('axios')
const pino = require('pino')
const fetch = require('node-fetch')
const moment = require('moment-timezone')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const jimp = require('jimp')
const { defaultMaxListeners } = require('stream')
const FileType = require("file-type")
const path = require("path")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const PhoneNumber = require('awesome-phonenumber')

function makeWaSocket(connectionOptions, options = {}) { // CRÉDITOS @SKIDY89 ANTI MARIO.JS
/**
* @type {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket}
*/
const conn = (global.opts['legacy'] ? makeWALegacySocket : _makeWaSocket)(connectionOptions)
const sock = Object.defineProperties(conn, {
    chats: {
      value: {...(options.chats || {})},
      writable: true,
    },
    decodeJid: {
    value(jid) {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
    let decode = jidDecode(jid) || {}
    return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
    },
    },
    logger: {
      get() {
        return {
          info(...args) {
            console.log(
                chalk.bold.bgRgb(51, 204, 51)('INFO '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.cyan(format(...args)),
            );
          },
          error(...args) {
            console.log(
                chalk.bold.bgRgb(247, 38, 33)('ERROR '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.rgb(255, 38, 0)(format(...args)),
            );
          },
          warn(...args) {
            console.log(
                chalk.bold.bgRgb(255, 153, 0)('WARNING '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.redBright(format(...args)),
            );
          },
          trace(...args) {
            console.log(
                chalk.grey('TRACE '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.white(format(...args)),
            );
          },
          debug(...args) {
            console.log(
                chalk.bold.bgRgb(66, 167, 245)('DEBUG '),
                `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                chalk.white(format(...args)),
            );
          },
        }
      },
      enumerable: true
      },
    appendTextMessage: {
    async value(text, chatUpdate) {
    let messages = await generateWAMessage(this.chat, { text: text, mentions: this.mentionedJid }, {
            userJid: conn.user.id,
            quoted: this.quoted && this.quoted.fakeObj
        })
    messages.key.fromMe = areJidsSameUser(this.sender, conn.user.id)
        messages.key.id = this.key.id
        messages.pushName = this.pushName
        if (this.isGroup) messages.participant = this.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        conn.ev.emit('messages.upsert', msg)
        },
    },
    getFile: {
    async value(PATH, saveToFile = false) {
     let res; let filename; 
         const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0); 
         if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer'); 
         const type = await FileType.fromBuffer(data) || { 
           mime: 'application/octet-stream', 
           ext: '.bin', 
         }; 
         if (data && saveToFile && !filename) (filename = path.join(__dirname, '../temp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data)); 
         return { 
           res, 
           filename, 
           ...type, 
           data, 
           deleteFile() { 
             return filename && fs.promises.unlink(filename); 
           }, 
           }
           },
           enumerable: true
    },
    sendPoll: {
    value(jid, name = '', values = [], selectableCount = 1) {
    return conn.sendMessage(jid, { poll: { name, values, selectableCount }})
    },
    },
    fakeReply: {
    value(jid, caption,  fakeNumber, fakeCaption) {
    conn.sendMessage(jid, { text: caption }, {quoted: { key: { fromMe: false, participant: fakeNumber, ...(jid ? { remoteJid: null } : {}) }, message: { conversation: fakeCaption }}})
    },
    },
    downloadAndSaveMediaMessage: {
    async value(message, filename, attachExtension = true) {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])}
    let type = await FileType.fromBuffer(buffer)
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
    },
    enumerable: true
    },
    sendFile: {
    async value(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
    const type = await conn.getFile(path, true); 
         let {res, data: file, filename: pathFile} = type; 
         if (res && res.status !== 200 || file.length <= 65536) { 
           try { 
             throw {json: JSON.parse(file.toString())}; 
           } catch (e) { 
             if (e.json) throw e.json; 
           } 
         }      
         const opt = {}; 
         if (quoted) opt.quoted = quoted; 
         if (!type) options.asDocument = true; 
         let mtype = ''; let mimetype = options.mimetype || type.mime; let convert; 
         if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'; 
         else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'; 
         else if (/video/.test(type.mime)) mtype = 'video'; 
         else if (/audio/.test(type.mime)) { 
           ( 
             convert = await toAudio(file, type.ext), 
             file = convert.data, 
             pathFile = convert.filename, 
             mtype = 'audio', 
             mimetype = options.mimetype || 'audio/mpeg; codecs=opus' 
           ); 
         } else mtype = 'document'; 
         if (options.asDocument) mtype = 'document'; 
  
         delete options.asSticker; 
         delete options.asLocation; 
         delete options.asVideo; 
         delete options.asDocument; 
         delete options.asImage; 
  
         const message = { 
           ...options, 
           caption, 
           ptt, 
           [mtype]: {url: pathFile}, 
           mimetype, 
           fileName: filename || pathFile.split('/').pop(), 
         }; 
         /** 
                  * @type {import('@whiskeysockets/baileys').proto.WebMessageInfo} 
                  */ 
         let m; 
         try { 
           m = await conn.sendMessage(jid, message, {...opt, ...options}); 
         } catch (e) { 
           console.error(e); 
           m = null; 
         } finally { 
           if (!m) m = await conn.sendMessage(jid, {...message, [mtype]: file}, {...opt, ...options}); 
           file = null; // releasing the memory 
           return m; 
         } 
    },
    enumerable: true
    },
    getName: {
    async value(jid = '', withoutContact = false) {
    jid = conn.decodeJid(jid);
        withoutContact = conn.withoutContact || withoutContact;
        let v;
        if (jid.endsWith('@g.us')) {
          return new Promise(async (resolve) => {
            v = conn.chats[jid] || {};
            if (!(v.name || v.subject)) v = await conn.groupMetadata(jid) || {};
            resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'));
          });
        } else {
          v = jid === '0@s.whatsapp.net' ? {
            jid,
            vname: 'WhatsApp',
          } : areJidsSameUser(jid, conn.user.id) ?
                    conn.user :
                    (conn.chats[jid] || {});
        }
        return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
      },
      enumerable: true,
      },
      sendVideoAsSticker: {
      async value(jid, path, quoted, options = {}) {
      let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    },
    },
    downloadMediaMessage: {
    async value(message) {
    let mime = (message.msg || message).mimetype || ''
        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
        let extension = mime.split('/')[1]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    },
    },
    sendTextWithMentions: {
    async value(jid, text, quoted, options = {}) {
    conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
    },
    },
    sendText: {
    async value(jid, text, quoted = '', options) {
    conn.sendMessage(jid, { text: text, ...options }, { quoted })
    },
    },
    parseAudio: {
    async value(jid, audio, quoted, ppt, name, link, image) {
    await conn.sendPresenceUpdate('recording', jid)
    await conn.sendMessage(jid, { audio: { url: audio }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: ppt ? ptt : true, contextInfo:{  externalAdReply: { showAdAttribution: true,
    mediaType:  1,
    mediaUrl: link ? link : 'https://github.com/Skidy89',
    title: name ? name : global.botname,
    sourceUrl: link ? link : `https://github.com/Skidy89`, 
    thumbnail: image ? image : global.success
    }}}, { quoted: quoted ? quoted : m })
    },
    },
    sendImageAsSticker: {
    async value(jid, path, quoted, options = {}) {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    },
    },
    reply: {
    value(jid, text = '', quoted, options) {
        return Buffer.isBuffer(text) ? conn.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, {...options, text}, {quoted, ...options});
      },
    },
    parseMention: {
    value(text = '') {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    },
    enumerable: true,
    },    
    sendPayment: {
    async value(jid, amount, text, quoted, options) {
    conn.relayMessage(jid, { 
           requestPaymentMessage: { 
             currencyCodeIso4217: 'PEN', 
             amount1000: amount, 
             requestFrom: null, 
             noteMessage: { 
               extendedTextMessage: { 
                 text: text, 
                 contextInfo: { 
                   externalAdReply: { 
                     showAdAttribution: true, 
                   }, mentionedJid: conn.parseMention(text)}}}}}, {})
    },
    },
    sendImage: {
    async value(jid, path, caption = '', quoted = '', options) {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0) 
    return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted }) 
    },
    },
    adReply: {
    value(jid, caption, thumbnail, quoted, inTrue) {
    conn.sendMessage(jid ? jid : this.chat, {   
    text: caption,  
    contextInfo:{  
    forwardingScore: 9999999,  
    isForwarded: true,   
    mentionedJid:[this.sender],  
    "externalAdReply": {  
    "showAdAttribution": true,  
    "containsAutoReply": true,
    "renderLargerThumbnail": inTrue ? inTrue : false,  
    "title": botname,   
    "containsAutoReply": false,  
    "mediaType": 1,   
    "thumbnail": thumbnail ? thumbnail : global.menu,  
    "mediaUrl": `https://chat.whatsapp.com/Ebbo3i9xxiZFErul4gyApJ`,  
    "sourceUrl": `https://chat.whatsapp.com/Ebbo3i9xxiZFErul4gyApJ`  
    }
    }  
    }, { quoted: quoted ? quoted : null })
    },
    },
    editMessage: {
    async value(jid, text, editedText, seconds, quoted) {
    const {key} = await conn.sendMessage(jid, { text: text }, { quoted: quoted })
     await delay(1000 * seconds); // message in seconds?? (delay)
     await conn.sendMessage(jid, { text: editedText, edit: key })
     },
     },
     sendAudio: {
     async value(jid, audio, quoted, ppt, options) {
     await conn.sendPresenceUpdate('recording', jid)
     await conn.sendMessage(jid, { audio: { url: audio }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: ppt ? ptt : true, ...options }, { quoted: quoted })
     },
     },
     sendCart: {
     async value(jid, text, thumbail, orderTitle, userJid) {
     var messa = await prepareWAMessageMedia({ image: thumbail ? thumbail : success }, { upload: conn.waUploadToServer })
     var order = generateWAMessageFromContent(jid, proto.Message.fromObject({
     "orderMessage":{ "orderId":"3648563358700955",
     "thumbnail": thumbail ? thumbail : success,
     "itemCount": 999999,
     "status": "INQUIRY",
     "surface": "CATALOG",
     "message": text,
     "orderTitle": orderTitle ? orderTitle : 'unknown',
     "sellerJid": "5218442114446@s.whatsapp.net",
     "token": "AR4flJ+gzJw9zdUj+RpekLK8gqSiyei/OVDUFQRcmFmqqQ==",
     "totalAmount1000": "-500000000",
     "totalCurrencyCode":"USD",
     "contextInfo":{ "expiration": 604800, "ephemeralSettingTimestamp":"1679959486","entryPointConversionSource":"global_search_new_chat","entryPointConversionApp":"whatsapp","entryPointConversionDelaySeconds":9,"disappearingMode":{"initiator":"CHANGED_IN_CHAT"}}}
     }), { userJid: userJid ? userJid : conn.user.id})
     conn.relayMessage(jid, order.message, { messageId: order.key.id })
     },
     },
    copyNForward: {
      async value(jid, message, forwardingScore = true, options = {}) {
        let vtype;
        if (options.readViewOnce && message.message.viewOnceMessage?.message) {
          vtype = Object.keys(message.message.viewOnceMessage.message)[0];
          delete message.message.viewOnceMessage.message[vtype].viewOnce;
          message.message = proto.Message.fromObject(
              JSON.parse(JSON.stringify(message.message.viewOnceMessage.message)),
          );
          message.message[vtype].contextInfo = message.message.viewOnceMessage.contextInfo;
        }
        const mtype = Object.keys(message.message)[0];
        let m = generateForwardMessageContent(message, !!forwardingScore);
        const ctype = Object.keys(m)[0];
        if (forwardingScore && typeof forwardingScore === 'number' && forwardingScore > 1) m[ctype].contextInfo.forwardingScore += forwardingScore;
        m[ctype].contextInfo = {
          ...(message.message[mtype].contextInfo || {}),
          ...(m[ctype].contextInfo || {}),
        };
        m = generateWAMessageFromContent(jid, m, {
          ...options,
          userJid: conn.user.jid,
        });
        await conn.relayMessage(jid, m.message, {messageId: m.key.id, additionalAttributes: {...options}});
        return m;
      },
      enumerable: true,
    },
    processMessageStubType: {
        async value(m) {
        if (!m.messageStubType) return;
        const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '');
        if (!chat || chat === 'status@broadcast') return;
        const emitGroupUpdate = (update) => {
          ev.emit('groups.update', [{id: chat, ...update}]);
        };
        switch (m.messageStubType) {
          case WAMessageStubType.REVOKE:
          case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
            emitGroupUpdate({revoke: m.messageStubParameters[0]});
            break;
          case WAMessageStubType.GROUP_CHANGE_ICON:
            emitGroupUpdate({icon: m.messageStubParameters[0]});
            break;
          default: {
            console.log({
              messageStubType: m.messageStubType,
              messageStubParameters: m.messageStubParameters,
              type: WAMessageStubType[m.messageStubType],
            });
            break;
          }
        }
        const isGroup = chat.endsWith('@g.us');
        if (!isGroup) return;
        let chats = conn.chats[chat];
        if (!chats) chats = conn.chats[chat] = {id: chat};
        chats.isChats = true;
        const metadata = await conn.groupMetadata(chat).catch((_) => null);
        if (!metadata) return;
        chats.subject = metadata.subject;
        chats.metadata = metadata;
      },
    },
    insertAllGroup: {
      async value() {
        const groups = await conn.groupFetchAllParticipating().catch((_) => null) || {};
        for (const group in groups) conn.chats[group] = {...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group]};
        return conn.chats;
      },
    },
    serializeM: {
      /**
             * Serialize Message, so it easier to manipulate
             * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} m
             */
      value(m) {
        return smsg(conn, m);
      },
    },
    })
  if (sock.user?.id) sock.user.jid = sock.decodeJid(sock.user.id)
  return sock
}

    


exports.makeWaSocket = makeWaSocket
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
        let extension = mime.split('/')[1]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
}



exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
            .then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = exports.bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error')
        }
    })
}


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds


function msToTime(duration) { 
   const milliseconds = parseInt((duration % 1000) / 100); 
   let seconds = Math.floor((duration / 1000) % 60); 
   let minutes = Math.floor((duration / (1000 * 60)) % 60); 
   let hours = Math.floor((duration / (1000 * 60 * 60)) % 24); 
  
   hours = (hours < 10) ? '0' + hours : hours; 
   minutes = (minutes < 10) ? '0' + minutes : minutes; 
   seconds = (seconds < 10) ? '0' + seconds : seconds; 
  
   return hours + ' Horas ' + minutes + ' Minutos y ' + seconds + ' segundos'
   }

exports.msToTime = msToTime

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}


exports.fetchBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
    //𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗
	var dDisplay = d < 10 ? String("𝟎" + d) : d >= 10 ? String(d) : "𝟎𝟎";
	var hDisplay = h < 10 ? String("𝟎" + h) : h >= 10 ? String(h) : "𝟎𝟎";
	var mDisplay = m < 10 ? String("𝟎" + m) : m >= 10 ? String(m) : "𝟎𝟎";
	var sDisplay = s < 10 ? String("𝟎" + s) : s > 10 ? String(s) : "𝟎𝟎";
    dDisplay = dDisplay.replace(/1/g, "𝟏")
    dDisplay = dDisplay.replace(/2/g, "𝟐")
    dDisplay = dDisplay.replace(/3/g, "𝟑")
    dDisplay = dDisplay.replace(/4/g, "𝟒")
    dDisplay = dDisplay.replace(/5/g, "𝟓")
    dDisplay = dDisplay.replace(/6/g, "𝟔")
    dDisplay = dDisplay.replace(/7/g, "𝟕")
    dDisplay = dDisplay.replace(/8/g, "𝟖")
    dDisplay = dDisplay.replace(/9/g, "𝟗")
    hDisplay = hDisplay.replace(/1/g, "𝟏")
    hDisplay = hDisplay.replace(/2/g, "𝟐")
    hDisplay = hDisplay.replace(/3/g, "𝟑")
    hDisplay = hDisplay.replace(/4/g, "𝟒")
    hDisplay = hDisplay.replace(/5/g, "𝟓")
    hDisplay = hDisplay.replace(/6/g, "𝟔")
    hDisplay = hDisplay.replace(/7/g, "𝟕")
    hDisplay = hDisplay.replace(/8/g, "𝟖")
    hDisplay = hDisplay.replace(/9/g, "𝟗")
    mDisplay = mDisplay.replace(/1/g, "𝟏")
    mDisplay = mDisplay.replace(/2/g, "𝟐")
    mDisplay = mDisplay.replace(/3/g, "𝟑")
    mDisplay = mDisplay.replace(/4/g, "𝟒")
    mDisplay = mDisplay.replace(/5/g, "𝟓")
    mDisplay = mDisplay.replace(/6/g, "𝟔")
    mDisplay = mDisplay.replace(/7/g, "𝟕")
    mDisplay = mDisplay.replace(/8/g, "𝟖")
    mDisplay = mDisplay.replace(/9/g, "𝟗")
    sDisplay = sDisplay.replace(/1/g, "𝟏")
    sDisplay = sDisplay.replace(/2/g, "𝟐")
    sDisplay = sDisplay.replace(/3/g, "𝟑")
    sDisplay = sDisplay.replace(/4/g, "𝟒")
    sDisplay = sDisplay.replace(/5/g, "𝟓")
    sDisplay = sDisplay.replace(/6/g, "𝟔")
    sDisplay = sDisplay.replace(/7/g, "𝟕")
    sDisplay = sDisplay.replace(/8/g, "𝟖")
    sDisplay = sDisplay.replace(/9/g, "𝟗")
    dDisplay = dDisplay.replace(/0/g, "𝟎")
    hDisplay = hDisplay.replace(/0/g, "𝟎")
    mDisplay = mDisplay.replace(/0/g, "𝟎")
    sDisplay = sDisplay.replace(/0/g, "𝟎")

	return dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.buffergif = async (image) => {
const filename = `${Math.random().toString(36)}`
await fs.writeFileSync(`./temp/${filename}.gif`, image)
child_process.exec(`ffmpeg -i ./temp/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./temp${filename}.mp4`)
await sleep(4000)
var buffer5  =  await  fs.readFileSync(`./temp/${filename}.mp4`)
Promise.all([unlink(`./temp/${filename}.mp4`), unlink(`./temp/${filename}.gif`)])
return buffer5
}



exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); // promises?
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
				myDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
				return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function delay(ms) {
	return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.generateProfilePicture = async (buffer) => {
	const jimp = await jimp_1.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
	}
}

exports.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participantes) => {
	const admins = []
	for (let i of participantes) {
		i.admin ? admins.push(i.id) : ''
	}
	return admins
}



/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {Boolean} store
 */
exports.smsg = (conn, m) => {
if (!m) return m
const M = proto.WebMessageInfo;
  m = M.fromObject(m);
  m.conn = conn;
  let protocolMessageKey;
  if (m.message) {
    if (m.mtype == 'protocolMessage' && m.msg.key) {
      protocolMessageKey = m.msg.key;
      if (protocolMessageKey == 'status@broadcast') protocolMessageKey.remoteJid = m.chat;
      if (!protocolMessageKey.participant || protocolMessageKey.participant == 'status_me') protocolMessageKey.participant = m.sender;
      protocolMessageKey.fromMe = conn.decodeJid(protocolMessageKey.participant) === conn.decodeJid(conn.user.id);
      if (!protocolMessageKey.fromMe && protocolMessageKey.remoteJid === conn.decodeJid(conn.user.id)) protocolMessageKey.remoteJid = m.sender;
    }
    if (m.quoted) if (!m.quoted.mediaMessage) delete m.quoted.download;
  }
  if (!m.mediaMessage) delete m.download;

  try {
    if (protocolMessageKey && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', protocolMessageKey);
  } catch (e) {
    console.error(e);
  }
  


try {   
  let isNumber = x => typeof x === 'number' && !isNaN(x)  // NaN in number?
  let user = global.db.data.users[m.sender]  
  if (typeof user !== 'object') global.db.data.users[m.sender] = {}  
  if (user) { 
  if (!('registered' in user)) 
     user.registered = false // register
     if (!user.registered) { 
     if (!('name' in user)) 
     user.name = conn.user.name
     if (!isNumber(user.age)) 
     user.age = -1 
     if (!isNumber(user.regTime)) 
     user.regTime = -1 
  }
  if (!isNumber(user.afkTime)) user.afkTime = -1  
  if (!('afkReason' in user)) user.afkReason = ''  
  if (!isNumber(user.limit)) user.limit = 20  
  if(!isNumber(user.money)) user.money = 100  
  if(!isNumber(user.health)) user.health = 100  
  if(!isNumber(user.warn)) user.warn = 0  
  if(!isNumber(user.exp)) user.exp = 100
  if(!isNumber(user.role)) user.role = '🍱 Novato I'
  if(!isNumber(user.level)) user.level = 0
  if(!isNumber(user.armor)) user.armor = 0
  if(!isNumber(user.sword)) user.sword = 0
  if(!isNumber(user.pickaxe)) user.pickaxe = 0
  if(!isNumber(user.axe)) user.axe = 0
  if(!isNumber(user.gems)) user.gems = 0
  if(!isNumber(user.gold)) user.gold = 0
  if(!isNumber(user.copper)) user.copper = 0
  if(!isNumber(user.diamonds)) user.diamonds = 0
  if(!isNumber(user.swordDurability)) user.swordDurability = 100
  if(!isNumber(user.pickaxeDurability)) user.pickaxeDurability = 100
  if(!isNumber(user.axeDurability)) user.axeDurability = 100
  if(!isNumber(user.armorDurability)) user.armorDurability = 100
  if(!isNumber(user.lastMining)) user.lastMining = 0
  if(!isNumber(user.potion)) user.potion = 0
  if(!isNumber(user.rock)) user.rock = 0
  if(!isNumber(user.iron)) user.iron = 0
  if(!isNumber(user.trash)) user.trash = 0
  if(!isNumber(user.lastClaim)) user.lastClaim = 0
  if(!isNumber(user.common)) user.common = 0
  if(!isNumber(user.rare)) user.rare = 0
  if(!isNumber(user.lastmiming)) user.lastmiming = 0
  if(!isNumber(user.weekly)) user.weekly = 0
  if(!isNumber(user.monthly)) user.monthly = 0
  if(!isNumber(user.dog)) user.dog = 0
  if(!isNumber(user.cat)) user.cat = 0
  if(!isNumber(user.multiplier)) user.multiplier = 0
  if(!isNumber(user.lastgift)) user.lastgift = 0
   } else global.db.data.users[m.sender] = {  
  afkTime: -1,  
  afkReason: '',  
  limit: 20,  
  money: 100,  
  health: 100,  
  warn: 0, 
  exp: 100,
  role: '🍱 Novato I',
  level: 1,
  armor: 0,
  sword: 0,
  pickaxe: 0,
  axe: 0,
  gems: 0,
  gold: 0,
  copper: 0,
  diamonds: 0,
  swordDurability: 100,
  pickaxeDurability: 100,
  axeDurability: 100,
  armorDurability: 100,
  lastMining: 0,
  potion: 0,
  rock: 0,
  iron: 0,
  trash: 0,
  lastClaim: 0,
  common: 0,
  rare: 0,
  lastmiming: 0,
  weekly: 0,
  monthly: 0,
  dog: 0,
  cat: 0,
  multiplier: 0,
  }  
  
  let chats = global.db.data.chats[m.chat]  
  if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}  
  if (chats) {  
  if (!('antilink' in chats)) chats.antilink = false  
  if (!('isBanned' in chats)) chats.isBanned = false  
  if (!('modeadmin' in chats)) chats.modeadmin = false  
  if (!('welcome' in chats)) chats.welcome = false
  if (!('audios' in chats)) chats.audios = false
  if (!('antiNsfw' in chats)) chats.welcome = false  
  if (!('antiFake' in chats)) chats.antiFake = false
  if (!('antiArabe' in chats)) chats.antiArabe = false
  if (!('autoDetect' in chats)) chats.autoDetect = false 
  if (!('antiBadWord' in chats)) chats.antiBadWord = false
  if (!('detect2' in chats)) chats.detect2 = false
  if (!('sWelcome' in chat)) chat.sWelcome = '';
  if (!('sBye' in chat)) chat.sBye = '';
  if (!('sPromote' in chat)) chat.sPromote = '';
  if (!('sDemote' in chat)) chat.sDemote = '';
  } else global.db.data.chats[m.chat] = {  
  antilink: false,  
  isBanned: false,   
  modeAdmin: false,  
  welcome: false,  
  audios: false,
  antiNsfw: false,  
  audios: false,
  antiFake: false,
  antiArabe: false,
  autoDetect: false,
  antiBadWord: false,
  detect2: false,
  sWelcome: '',
  sBye: '',
  sPromote: '',
  sDemote: '',
  }
  
  let setting = global.db.data.settings[conn.user.jid]
  if (typeof setting !== 'object') global.db.data.settings[conn.user.jid] = {}  
  if (setting) {  
  if (!isNumber(setting.status)) setting.status = 0  
  if (!('autobio' in setting)) setting.autobio = true
  if(!('privateMode' in setting)) setting.privateMode = false
  if (!('jadibot' in setting)) setting.jadibot = true 
  if(!('antiCall' in setting)) setting.antiCall = false
  } else global.db.data.settings[conn.user.jid] = {  
  status: 0,  
  autobio: true,
  privateMode: false,
  jadibot: true,
  antiCall: false
  }


global.db.data.sticker = global.db.data.sticker || {} // sticker for addcmd
if (user) {
const level = {
  3: '🍱 Novato I',
  6: '🍱 Novato II',
  9: '🍱 Novato III',
  12: '🍱 Novato IV',
  15: '📜 Principiante I',
  18: '📜 Principiante II',
  21: '📜 Principiante III',
  24: '📜 Principiante IV',
  27: '⚔️ Veterano I',
  30: '⚔️ Veterano II',
  33: '⚔️ Veterano III',
  36: '⚔️ Veterano IV',
  39: '🏆 Elite I',
  42: '🏆 Elite II',
  45: '🏆 Elite III',
  48: '🏆 Elite IV',
  51: '👑 Maestro I',
  54: '👑 Maestro II',
  57: '👑 Maestro III',
  60: '🌟 Leyenda I',
  63: '🌟 Leyenda II',
  66: '🌟 Leyenda III',
  69: '🔥 Mítico I',
  72: '🔥 Mítico II',
  75: '🔥 Mítico III',
  78: '💫 Supremo I',
  81: '💫 Supremo II',
  84: '💫 Supremo III',
  87: '🌀 Divino I',
  90: '🌀 Divino II',
  93: '🌀 Divino III',
  96: '🌌 Celestial I',
  99: '🌌 Celestial II',
  102: '🌌 Celestial III',
  105: '🌟 Estelar I',
  108: '🌟 Estelar II',
  111: '🌟 Estelar III',
  114: '🌠 Universal I',
  117: '🌠 Universal II',
  120: '🌠 Universal III',
  123: '🎖️ Supremacía I',
  126: '🎖️ Supremacía II',
  129: '🎖️ Supremacía III',
  132: '🔱 Divinidad I',
  135: '🔱 Divinidad II',
  138: '🔱 Divinidad III',
  141: '🌌 Infinito I',
  144: '🌌 Infinito II',
  147: '🌌 Infinito III',
  150: '🌠 Eterno',
  }
  if (user.level <= 150) {
  user.role = level[user.level]
  }
  }
} catch (error) {
m.error = error
if (error) {
console.error(m.error)
}
}
global.mess = {
admin: "*❗ Este comando es solo para admins!!* (⁠・⁠_⁠・)",
owner: "*❗ Solo un creador/moderador del bot puede usar esto* (⁠ ⁠･ั⁠﹏⁠･ั⁠)",
group: "*❗ Este comando es para Grupos* -_-",
priv: "*❗ Este comando es para chats privados* -_-",
botAdmin: " 𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚜𝚎𝚌𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗 𝚙𝚊𝚛𝚊 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘",
wait: `*Por favor espera...*\n*tengo ${Object.keys(global.db.data.users).length} usuarios usandome, Puedo ser lenta >w<*`
}
  


return m

}
function serialize() {
  const MediaType = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'];
  return Object.defineProperties(proto.WebMessageInfo.prototype, {
    conn: {
      value: undefined,
      enumerable: false,
      writable: true,
    },
    id: {
      get() {
        return this.key?.id;
      },
    },
    isBaileys: {
      get() {
        return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 12 || false;
      },
    },
    chat: {
      get() {
        const senderKeyDistributionMessage = this.message?.senderKeyDistributionMessage?.groupId;
        return (
          this.key?.remoteJid ||
                    (senderKeyDistributionMessage &&
                        senderKeyDistributionMessage !== 'status@broadcast'
                    ) || ''
        ).decodeJid();
      },
    },
    isGroup: {
      get() {
        return this.chat.endsWith('@g.us');
      },
      enumerable: true,
    },
    sender: {
      get() {
        return this.conn?.decodeJid(this.key?.fromMe && this.conn?.user.id || this.participant || this.key.participant || this.chat || '');
      },
      enumerable: true,
    },
    fromMe: {
      get() {
        return this.key?.fromMe || areJidsSameUser(this.conn?.user.id, this.sender) || false;
      },
    },
    mtype: {
      get() {
        if (!this.message) return '';
        const type = Object.keys(this.message);
        return (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(type[0]) && type[0]) || // Sometimes message in the front
                    (type.length >= 3 && type[1] !== 'messageContextInfo' && type[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3
                    type[type.length - 1]; // common case
      },
      enumerable: true,
    },
    msg: {
      get() {
        if (!this.message) return null;
        return this.message[this.mtype];
      },
    },
    mediaMessage: {
      get() {
        if (!this.message) return null;
        const Message = ((this.msg?.url || this.msg?.directPath) ? {...this.message} : extractMessageContent(this.message)) || null;
        if (!Message) return null;
        const mtype = Object.keys(Message)[0];
        return MediaType.includes(mtype) ? Message : null;
      },
      enumerable: true,
    },
    mediaType: {
      get() {
        let message;
        if (!(message = this.mediaMessage)) return null;
        return Object.keys(message)[0];
      },
      enumerable: true,
    },
    quoted: {
      get() {
        /**
                 * @type {ReturnType<typeof makeWASocket>}
                 */
        const self = this;
        const msg = self.msg;
        const contextInfo = msg?.contextInfo;
        const quoted = contextInfo?.quotedMessage;
        if (!msg || !contextInfo || !quoted) return null;
        const type = Object.keys(quoted)[0];
        const q = quoted[type];
        const text = typeof q === 'string' ? q : q.text;
        return Object.defineProperties(JSON.parse(JSON.stringify(typeof q === 'string' ? {text: q} : q)), {
          mtype: {
            get() {
              return type;
            },
            enumerable: true,
          },
          mediaMessage: {
            get() {
              const Message = ((q.url || q.directPath) ? {...quoted} : extractMessageContent(quoted)) || null;
              if (!Message) return null;
              const mtype = Object.keys(Message)[0];
              return MediaType.includes(mtype) ? Message : null;
            },
            enumerable: true,
          },
          mediaType: {
            get() {
              let message;
              if (!(message = this.mediaMessage)) return null;
              return Object.keys(message)[0];
            },
            enumerable: true,
          },
          id: {
            get() {
              return contextInfo.stanzaId;
            },
            enumerable: true,
          },
          chat: {
            get() {
              return contextInfo.remoteJid || self.chat;
            },
            enumerable: true,
          },
          isBaileys: {
            get() {
              return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 12 || false;
            },
            enumerable: true,
          },
          sender: {
            get() {
              return (contextInfo.participant || this.chat || '').decodeJid();
            },
            enumerable: true,
          },
          fromMe: {
            get() {
              return areJidsSameUser(this.sender, self.conn?.user.jid);
            },
            enumerable: true,
          },
          text: {
            get() {
              return text || this.caption || this.contentText || this.selectedDisplayText || '';
            },
            enumerable: true,
          },
          mentionedJid: {
            get() {
              return q.contextInfo?.mentionedJid || self.getQuotedObj()?.mentionedJid || [];
            },
            enumerable: true,
          },
          name: {
            get() {
              const sender = this.sender;
              return sender ? self.conn?.getName(sender) : null;
            },
            enumerable: true,

          },
          vM: {
            get() {
              return proto.WebMessageInfo.fromObject({
                key: {
                  fromMe: this.fromMe,
                  remoteJid: this.chat,
                  id: this.id,
                },
                message: quoted,
                ...(self.isGroup ? {participant: this.sender} : {}),
              });
            },
          },
          fakeObj: {
            get() {
              return this.vM;
            },
          },
          download: {
            value(saveToFile = false) {
              const mtype = this.mediaType;
              return self.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile);
            },
            enumerable: true,
            configurable: true,
          },
          reply: {
            /**
                         * Reply to quoted message
                         * @param {String|Object} text
                         * @param {String|false} chatId
                         * @param {Object} options
                         */
            value(text, chatId, options) {
              return self.conn?.reply(chatId ? chatId : this.chat, text, this.vM, options);
            },
            enumerable: true,
          },
          copy: {
            /**
                         * Copy quoted message
                         */
            value() {
              const M = proto.WebMessageInfo;
              return smsg(conn, M.fromObject(M.toObject(this.vM)));
            },
            enumerable: true,
          },
          forward: {
            /**
                         * Forward quoted message
                         * @param {String} jid
                         *  @param {Boolean} forceForward
                         */
            value(jid, force = false, options) {
              return self.conn?.sendMessage(jid, {
                forward: this.vM, force, ...options,
              }, {...options});
            },
            enumerable: true,
          },
          copyNForward: {
            /**
                         * Exact Forward quoted message
                         * @param {String} jid
                         * @param {Boolean|Number} forceForward
                         * @param {Object} options
                         */
            value(jid, forceForward = false, options) {
              return self.conn?.copyNForward(jid, this.vM, forceForward, options);
            },
            enumerable: true,

          },
          cMod: {
            /**
                         * Modify quoted Message
                         * @param {String} jid
                         * @param {String} text
                         * @param {String} sender
                         * @param {Object} options
                         */
            value(jid, text = '', sender = this.sender, options = {}) {
              return self.conn?.cMod(jid, this.vM, text, sender, options);
            },
            enumerable: true,

          },
          delete: {
            /**
                         * Delete quoted message
                         */
            value() {
              return self.conn?.sendMessage(this.chat, {delete: this.vM.key});
            },
            enumerable: true,

          },
        });
      },
      enumerable: true,
    },
    _text: {
      value: null,
      writable: true,
    },
    text: {
      get() {
        const msg = this.msg;
        const text = (typeof msg === 'string' ? msg : msg?.text) || msg?.caption || msg?.contentText || '';
        return typeof this._text === 'string' ? this._text : '' || (typeof text === 'string' ? text : (
                    text?.selectedDisplayText ||
                    text?.hydratedTemplate?.hydratedContentText ||
                    text
                )) || '';
      },
      set(str) {
        return this._text = str;
      },
      enumerable: true,
    },
    mentionedJid: {
      get() {
        return this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || [];
      },
      enumerable: true,
    },
    name: {
      get() {
        return !nullish(this.pushName) && this.pushName || this.conn?.getName(this.sender);
      },
      enumerable: true,
    },
    download: {
      value(saveToFile = false) {
        const mtype = this.mediaType;
        return this.conn?.downloadM(this.mediaMessage[mtype], mtype.replace(/message/i, ''), saveToFile);
      },
      enumerable: true,
      configurable: true,
    },
    reply: {
      value(text, chatId, options) {
        return this.conn?.reply(chatId ? chatId : this.chat, text, this, options);
      },
    },
    copy: {
      value() {
        const M = proto.WebMessageInfo;
        return smsg(this.conn, M.fromObject(M.toObject(this)));
      },
      enumerable: true,
    },
    forward: {
      value(jid, force = false, options = {}) {
        return this.conn?.sendMessage(jid, {
          forward: this, force, ...options,
        }, {...options});
      },
      enumerable: true,
    },
    copyNForward: {
      value(jid, forceForward = false, options = {}) {
        return this.conn?.copyNForward(jid, this, forceForward, options);
      },
      enumerable: true,
    },
    cMod: {
      value(jid, text = '', sender = this.sender, options = {}) {
        return this.conn?.cMod(jid, this, text, sender, options);
      },
      enumerable: true,
    },
    getQuotedObj: {
      value() {
        if (!this.quoted.id) return null;
        const q = proto.WebMessageInfo.fromObject(this.conn?.loadMessage(this.quoted.id) || this.quoted.vM);
        return smsg(this.conn, q);
      },
      enumerable: true,
    },
    getQuotedMessage: {
      get() {
        return this.getQuotedObj;
      },
    },
    delete: {
      value() {
        return this.conn?.sendMessage(this.chat, {delete: this.key});
      },
      enumerable: true,
    },
  });
}

function protoType() {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
      view[i] = this[i];
    }
    return ab;
  };
  /**
     * @return {ArrayBuffer}
     */
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength);
  };
  /**
     * @return {Buffer}
     */
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this));
  };
  // /**
  //  * @returns {String}
  //  */
  // Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
  //     return util.format(this)
  // }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
    return await fileTypeFromBuffer(this);
  };
  /**
     * @returns {Boolean}
     */
  String.prototype.isNumber = Number.prototype.isNumber = isNumber;
  /**
     *
     * @return {String}
     */
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length);
  };
  /**
     * @return {String}
     */
  String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(' ');
    return str.map((v) => v.capitalize()).join(' ');
  };
  String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
      const decode = jidDecode(this) || {};
      return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim();
    } else return this.trim();
  }
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}
function isNumber() {
  const int = parseInt(this);
  return typeof int === 'number' && !isNaN(int);
}
function getRandom() {
  if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)];
  return Math.floor(Math.random() * this);
}


function nullish(args) {
  return !(args !== null && args !== undefined) // ????
}   
exports.protoType = protoType
exports.serialize = serialize


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
