const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./stickers')
const { default: _makeWaSocket, makeWALegacySocket, WAMessageStubType, getContentType, relayMessage, areJidsSameUser, generateWAMessage, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto, extractMessageContent } = require("@whiskeysockets/baileys")
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
const store = require('./store.js')
const PhoneNumber = require('awesome-phonenumber')
const { format } = require('../lib/index.js')
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
    appenTextMessage: {
      async value(m, text, chatUpdate) {
        let messages = await generateWAMessage(
          m.chat,
          { text: text, mentions: m.mentionedJid },
          {
            userJid: this.user.id,
            quoted: m.quoted && m.quoted.fakeObj,
          }
        );
        messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
        messages.key.id = m.key.id;
        messages.pushName = m.pushName;
        if (m.isGroup) messages.participant = m.sender;
        let msg = {
          ...chatUpdate,
          messages: [proto.WebMessageInfo.fromObject(messages)],
          type: "append",
        };
        this.ev.emit("messages.upsert", msg);
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
    return this.sendMessage(jid, { poll: { name, values, selectableCount }})
    },
    },
    fakeReply: {
    value(jid, caption,  fakeNumber, fakeCaption) {
    this.sendMessage(jid, { text: caption }, {quoted: { key: { fromMe: false, participant: fakeNumber, ...(jid ? { remoteJid: null } : {}) }, message: { conversation: fakeCaption }}})
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
    const type = await this.getFile(path, true); 
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
           m = await this.sendMessage(jid, message, {...opt, ...options}); 
         } catch (e) { 
           console.error(e); 
           m = null; 
         } finally { 
           if (!m) m = await this.sendMessage(jid, {...message, [mtype]: file}, {...opt, ...options}); 
           file = null; // releasing the memory 
           return m; 
         } 
    },
    enumerable: true
    },
    getName: {
    async value(jid = '', withoutContact = false) {
    jid = this.decodeJid(jid);
        withoutContact = this.withoutContact || withoutContact;
        let v;
        if (jid.endsWith('@g.us')) {
          return new Promise(async (resolve) => {
            v = this.chats[jid] || {};
            if (!(v.name || v.subject)) v = await this.groupMetadata(jid) || {};
            resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'));
          });
        } else {
          v = jid === '0@s.whatsapp.net' ? {
            jid,
            vname: 'WhatsApp',
          } : areJidsSameUser(jid, this.user.id) ?
                    this.user :
                    (this.chats[jid] || {});
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

        await this.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
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
    downloadM: {
      /**
             * Download media message
             * @param {Object} m
             * @param {String} type
             * @param {fs.PathLike | fs.promises.FileHandle} saveToFile
             * @return {Promise<fs.PathLike | fs.promises.FileHandle | Buffer>}
             */
      async value(m, type, saveToFile) {
        let filename;
        if (!m || !(m.url || m.directPath)) return Buffer.alloc(0);
        const stream = await downloadContentFromMessage(m, type);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        if (saveToFile) ({filename} = await this.getFile(buffer, true));
        return saveToFile && fs.existsSync(filename) ? filename : buffer;
      },
      enumerable: true,
    },
    sendTextWithMentions: {
    async value(jid, text, quoted, options = {}) {
    this.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
    },
    },
    sendText: {
    async value(jid, text, quoted = '', options) {
    this.sendMessage(jid, { text: text, ...options }, { quoted })
    },
    },
    parseAudio: {
    async value(jid, audio, quoted, ppt, name, link, image) {
    await this.sendPresenceUpdate('recording', jid)
    await this.sendMessage(jid, { audio: { url: audio }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: ppt ? ptt : true, contextInfo:{  externalAdReply: { showAdAttribution: true,
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

        await this.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
    return buffer
    },
    },
    reply: {
    value(jid, text = '', quoted, options) {
        return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : this.sendMessage(jid, {...options, text}, {quoted, ...options});
      },
    },
    parseMention: {
    value(text = '') {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    },
    enumerable: true,
    },
    sendNyanCat: {
      async value(jid, text = '', buffer, title, body, url, quoted, options) {
        if (buffer) {
          try {
            (type = await this.getFile(buffer), buffer = type.data);
          } catch {
            buffer = buffer;
          }
        }
	     const prep = generateWAMessageFromContent(jid, {extendedTextMessage: {text: text, contextInfo: {externalAdReply: {title: title, body: body, thumbnail: buffer, sourceUrl: url}, mentionedJid: await this.parseMention(text)}}}, {quoted: quoted});
        return this.relayMessage(jid, prep.message, {messageId: prep.key.id});
      },
    },
    pushMessage: {
      /**
             * pushMessage
             * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo[]} m
             */
      async value(m) {
        if (!m) return;
        if (!Array.isArray(m)) m = [m];
        for (const message of m) {
          try {
            // if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/adiwajshing/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
            if (!message) continue;
            if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) this.processMessageStubType(message).catch(console.error);
            const _mtype = Object.keys(message.message || {});
            const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
                            (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
                            _mtype[_mtype.length - 1];
            const chat = this.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '');
            if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
              /**
                             * @type {import('@whiskeysockets/baileys').proto.IContextInfo}
                             */
              const context = message.message[mtype].contextInfo;
              let participant = this.decodeJid(context.participant);
              const remoteJid = this.decodeJid(context.remoteJid || participant);
              /**
                             * @type {import('@whiskeysockets/baileys').proto.IMessage}
                             *
                             */
              const quoted = message.message[mtype].contextInfo.quotedMessage;
              if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
                let qMtype = Object.keys(quoted)[0];
                if (qMtype == 'conversation') {
                  quoted.extendedTextMessage = {text: quoted[qMtype]};
                  delete quoted.conversation;
                  qMtype = 'extendedTextMessage';
                }
                if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {};
                quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || [];
                const isGroup = remoteJid.endsWith('g.us');
                if (isGroup && !participant) participant = remoteJid;
                const qM = {
                  key: {
                    remoteJid,
                    fromMe: areJidsSameUser(this.user.jid, remoteJid),
                    id: context.stanzaId,
                    participant,
                  },
                  message: JSON.parse(JSON.stringify(quoted)),
                  ...(isGroup ? {participant} : {}),
                };
                let qChats = this.chats[participant];
                if (!qChats) qChats = this.chats[participant] = {id: participant, isChats: !isGroup};
                if (!qChats.messages) qChats.messages = {};
                if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM;
                let qChatsMessages;
                if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)); // maybe avoid memory leak
              }
            }
            if (!chat || chat === 'status@broadcast') continue;
            const isGroup = chat.endsWith('@g.us');
            let chats = this.chats[chat];
            if (!chats) {
              if (isGroup) await this.insertAllGroup().catch(console.error);
              chats = this.chats[chat] = {id: chat, isChats: true, ...(this.chats[chat] || {})};
            }
            let metadata; let sender;
            if (isGroup) {
              if (!chats.subject || !chats.metadata) {
                metadata = await this.groupMetadata(chat).catch((_) => ({})) || {};
                if (!chats.subject) chats.subject = metadata.subject || '';
                if (!chats.metadata) chats.metadata = metadata;
              }
              sender = this.decodeJid(message.key?.fromMe && this.user.id || message.participant || message.key?.participant || chat || '');
              if (sender !== chat) {
                let chats = this.chats[sender];
                if (!chats) chats = this.chats[sender] = {id: sender};
                if (!chats.name) chats.name = message.pushName || chats.name || '';
              }
            } else if (!chats.name) chats.name = message.pushName || chats.name || '';
            if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue;
            chats.isChats = true;
            if (!chats.messages) chats.messages = {};
            const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, this.user.id);
            if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
              delete message.message.messageContextInfo;
              delete message.message.senderKeyDistributionMessage;
              chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2));
              let chatsMessages;
              if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length));
            }
          } catch (e) {
            console.error(e);
          }
        }
      },
    },
    sendPayment: {
    async value(jid, amount, text, quoted, options) {
    this.relayMessage(jid, { 
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
                   }, mentionedJid: this.parseMention(text)}}}}}, {})
    },
    },
    loadMessage: {
      /**
             *
             * @param {String} messageID
             * @returns {import('@whiskeysockets/baileys').proto.WebMessageInfo}
             */
      value(messageID) {
        return Object.entries(this.chats)
            .filter(([_, {messages}]) => typeof messages === 'object')
            .find(([_, {messages}]) => Object.entries(messages)
                .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
            ?.[1].messages?.[messageID];
      },
      enumerable: true,
    },
    sendImage: {
    async value(jid, path, caption = '', quoted = '', options) {
    let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0) 
    return await this.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted }) 
    },
    },
    adReply: {
    value(jid, caption, thumbnail, quoted, inTrue) {
    this.sendMessage(jid ? jid : this.chat, {   
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
    "mediaUrl": `https://chat.whatsapp.com/JPJ0n2V0uujCRvmJRNM7ZU`,  
    "sourceUrl": `https://chat.whatsapp.com/JPJ0n2V0uujCRvmJRNM7ZU`  
    }
    }  
    }, { quoted: quoted ? quoted : null })
    },
    },
    editMessage: {
    async value(jid, text, editedText, seconds, quoted) {
    const {key} = await this.sendMessage(jid, { text: text }, { quoted: quoted })
     await delay(1000 * seconds); // message in seconds?? (delay)
     await this.sendMessage(jid, { text: editedText, edit: key })
     },
     },
     sendAudio: {
     async value(jid, audio, quoted, ppt, options) {
     await this.sendPresenceUpdate('recording', jid)
     await this.sendMessage(jid, { audio: { url: audio }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: ppt ? ptt : true, ...options }, { quoted: quoted })
     },
     },
     sendCart: {
     async value(jid, text, thumbail, orderTitle, userJid) {
     var messa = await prepareWAMessageMedia({ image: thumbail ? thumbail : success }, { upload: this.waUploadToServer })
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
     }), { userJid: userJid ? userJid : this.user.id})
     this.relayMessage(jid, order.message, { messageId: order.key.id })
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
          userJid: this.user.jid,
        });
        await this.relayMessage(jid, m.message, {messageId: m.key.id, additionalAttributes: {...options}});
        return m;
      },
      enumerable: true,
    },
    processMessageStubType: {
        async value(m) {
        if (!m.messageStubType) return;
        const chat = this.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '');
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
        let chats = this.chats[chat];
        if (!chats) chats = this.chats[chat] = {id: chat};
        chats.isChats = true;
        const metadata = await this.groupMetadata(chat).catch((_) => null);
        if (!metadata) return;
        chats.subject = metadata.subject;
        chats.metadata = metadata;
      },
    },
    insertAllGroup: {
      async value() {
        const groups = await this.groupFetchAllParticipating().catch((_) => null) || {};
        for (const group in groups) this.chats[group] = {...(this.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group]};
        return this.chats;
      },
    },
    serializeM: {
      /**
             * Serialize Message, so it easier to manipulate
             * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} m
             */
      value(m) {
        return smsg(this, m);
      },
    },
        ...(typeof this.chatRead !== 'function' ? {
      chatRead: {
        /**
                 * Read message
                 * @param {String} jid
                 * @param {String|undefined|null} participant
                 * @param {String} messageID
                 */
        value(jid, participant = this.user.jid, messageID) {
          return this.sendReadReceipt(jid, participant, [messageID]);
        },
        enumerable: true,
      },
    } : {}),
    ...(typeof this.setStatus !== 'function' ? {
      setStatus: {
        /**
                 * setStatus bot
                 * @param {String} status
                 */
        value(status) {
          return this.query({
            tag: 'iq',
            attrs: {
              to: S_WHATSAPP_NET,
              type: 'set',
              xmlns: 'status',
            },
            content: [
              {
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8'),
              },
            ],
          });
        },
        enumerable: true,
      },
    } : {}),
    })
  if (sock.user?.id) sock.user.jid = sock.decodeJid(sock.user.id)
  store.bind(sock)
  return sock
}

    
/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {Boolean} store
 */
function smsg(conn, m, hasParent) {
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
          if (!isNumber(user.exp)) user.exp = 0; 
         if (!('premium' in user)) user.premium = false; 
         if (!isNumber(user.joincount)) user.joincount = 2; 
         if (!isNumber(user.limit)) user.limit = 20; 
         if (!isNumber(user.money)) user.money = 15; 
         if (!('registered' in user)) user.registered = false; 
         if (!user.registered) { 
           if (!('name' in user)) user.name = m.name; 
           if (!isNumber(user.age)) user.age = -1; 
           if (!isNumber(user.anggur)) user.anggur = 0; 
           if (!isNumber(user.apel)) user.apel = 0; 
           if (!isNumber(user.bibitanggur)) user.bibitanggur = 0; 
           if (!isNumber(user.bibitapel)) user.bibitapel = 0; 
           if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0; 
           if (!isNumber(user.bibitmangga)) user.bibitmangga = 0; 
           if (!isNumber(user.bibitpisang)) user.bibitpisang = 0; 
           if (!isNumber(user.emas)) user.emas = 0; 
           if (!isNumber(user.jeruk)) user.jeruk = 0; 
           if (!isNumber(user.kayu)) user.kayu = 0; 
           if (!isNumber(user.makanan)) user.makanan = 0; 
           if (!isNumber(user.mangga)) user.mangga = 0; 
           if (!isNumber(user.pisang)) user.pisang = 0; 
           if (!isNumber(user.premiumDate)) user.premiumDate = -1; 
           if (!isNumber(user.regTime)) user.regTime = -1; 
           if (!isNumber(user.semangka)) user.semangka = 0; 
           if (!isNumber(user.stroberi)) user.stroberi = 0; 
         } 
         if (!isNumber(user.afk)) user.afk = -1; 
         if (!('autolevelup' in user)) user.autolevelup = true; 
         if (!('role' in user)) user.role = 'Novato'
         if (!isNumber(user.agility)) user.agility = 0; 
         if (!isNumber(user.anakanjing)) user.anakanjing = 0; 
         if (!isNumber(user.anakcentaur)) user.anakcentaur = 0; 
         if (!isNumber(user.anakgriffin)) user.anakgriffin = 0; 
         if (!isNumber(user.anakkucing)) user.anakkucing = 0; 
         if (!isNumber(user.anakkuda)) user.anakkuda = 0; 
         if (!isNumber(user.anakkyubi)) user.anakkyubi = 0; 
         if (!isNumber(user.anaknaga)) user.anaknaga = 0; 
         if (!isNumber(user.anakpancingan)) user.anakpancingan = 0; 
         if (!isNumber(user.anakphonix)) user.anakphonix = 0; 
         if (!isNumber(user.anakrubah)) user.anakrubah = 0; 
         if (!isNumber(user.anakserigala)) user.anakserigala = 0; 
         if (!isNumber(user.anggur)) user.anggur = 0; 
         if (!isNumber(user.anjing)) user.anjing = 0; 
         if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0; 
         if (!isNumber(user.antispam)) user.antispam = 0; 
         if (!isNumber(user.antispamlastclaim)) user.antispamlastclaim = 0; 
         if (!isNumber(user.apel)) user.apel = 0; 
         if (!isNumber(user.aqua)) user.aqua = 0; 
         if (!isNumber(user.arc)) user.arc = 0; 
         if (!isNumber(user.arcdurability)) user.arcdurability = 0; 
         if (!isNumber(user.arlok)) user.arlok = 0; 
         if (!isNumber(user.armor)) user.armor = 0; 
         if (!isNumber(user.armordurability)) user.armordurability = 0; 
         if (!isNumber(user.armormonster)) user.armormonster = 0; 
         if (!isNumber(user.as)) user.as = 0; 
         if (!isNumber(user.atm)) user.atm = 0; 
         if (!isNumber(user.axe)) user.axe = 0; 
         if (!isNumber(user.axedurability)) user.axedurability = 0; 
         if (!isNumber(user.ayam)) user.ayam = 0; 
         if (!isNumber(user.ayamb)) user.ayamb = 0; 
         if (!isNumber(user.ayambakar)) user.ayambakar = 0; 
         if (!isNumber(user.ayamg)) user.ayamg = 0; 
         if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0; 
         if (!isNumber(user.babi)) user.babi = 0; 
         if (!isNumber(user.babihutan)) user.babihutan = 0; 
         if (!isNumber(user.babipanggang)) user.babipanggang = 0; 
         if (!isNumber(user.bandage)) user.bandage = 0; 
         if (!isNumber(user.bank)) user.bank = 0; 
         if (!isNumber(user.banteng)) user.banteng = 0; 
         if (!isNumber(user.batu)) user.batu = 0; 
         if (!isNumber(user.bawal)) user.bawal = 0; 
         if (!isNumber(user.bawalbakar)) user.bawalbakar = 0; 
         if (!isNumber(user.bayam)) user.bayam = 0; 
         if (!isNumber(user.berlian)) user.berlian = 10; 
         if (!isNumber(user.bibitanggur)) user.bibitanggur = 0; 
         if (!isNumber(user.bibitapel)) user.bibitapel = 0; 
         if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0; 
         if (!isNumber(user.bibitmangga)) user.bibitmangga = 0; 
         if (!isNumber(user.bibitpisang)) user.bibitpisang = 0; 
         if (!isNumber(user.botol)) user.botol = 0; 
         if (!isNumber(user.bow)) user.bow = 0; 
         if (!isNumber(user.bowdurability)) user.bowdurability = 0; 
         if (!isNumber(user.boxs)) user.boxs = 0; 
         if (!isNumber(user.brick)) user.brick = 0; 
         if (!isNumber(user.brokoli)) user.brokoli = 0; 
         if (!isNumber(user.buaya)) user.buaya = 0; 
         if (!isNumber(user.buntal)) user.buntal = 0; 
         if (!isNumber(user.cat)) user.cat = 0; 
         if (!isNumber(user.catexp)) user.catexp = 0; 
         if (!isNumber(user.catlastfeed)) user.catlastfeed = 0; 
         if (!isNumber(user.centaur)) user.centaur = 0; 
         if (!isNumber(user.centaurexp)) user.centaurexp = 0; 
         if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0; 
         if (!isNumber(user.centaurlastfeed)) user.centaurlastfeed = 0; 
         if (!isNumber(user.clay)) user.clay = 0; 
         if (!isNumber(user.coal)) user.coal = 0; 
         if (!isNumber(user.coin)) user.coin = 0; 
         if (!isNumber(user.common)) user.common = 0; 
         if (!isNumber(user.crystal)) user.crystal = 0; 
         if (!isNumber(user.cumi)) user.cumi = 0; 
         if (!isNumber(user.cupon)) user.cupon = 0; 
         if (!isNumber(user.diamond)) user.diamond = 3; 
         if (!isNumber(user.dog)) user.dog = 0; 
         if (!isNumber(user.dogexp)) user.dogexp = 0; 
         if (!isNumber(user.doglastfeed)) user.doglastfeed = 0; 
         if (!isNumber(user.dory)) user.dory = 0; 
         if (!isNumber(user.dragon)) user.dragon = 0; 
         if (!isNumber(user.dragonexp)) user.dragonexp = 0; 
         if (!isNumber(user.dragonlastfeed)) user.dragonlastfeed = 0; 
         if (!isNumber(user.emas)) user.emas = 0; 
         if (!isNumber(user.emerald)) user.emerald = 0; 
         if (!isNumber(user.enchant)) user.enchant = 0; 
         if (!isNumber(user.esteh)) user.esteh = 0; 
         if (!isNumber(user.exp)) user.exp = 0; 
         if (!isNumber(user.expg)) user.expg = 0; 
         if (!isNumber(user.exphero)) user.exphero = 0; 
         if (!isNumber(user.eleksirb)) user.eleksirb = 0; 
         if (!isNumber(user.emasbatang)) user.emasbatang = 0; 
         if (!isNumber(user.emasbiasa)) user.emasbiasa = 0; 
         if (!isNumber(user.fideos)) user.fideos = 0; 
         if (!isNumber(user.fishingrod)) user.fishingrod = 0; 
         if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0; 
         if (!isNumber(user.fortress)) user.fortress = 0; 
         if (!isNumber(user.fox)) user.fox = 0; 
         if (!isNumber(user.foxexp)) user.foxexp = 0; 
         if (!isNumber(user.foxlastfeed)) user.foxlastfeed = 0; 
         if (!isNumber(user.fullatm)) user.fullatm = 0; 
         if (!isNumber(user.gadodado)) user.gadodado = 0; 
         if (!isNumber(user.gajah)) user.gajah = 0; 
         if (!isNumber(user.gamemines)) user.gamemines = false; 
         if (!isNumber(user.ganja)) user.ganja = 0; 
         if (!isNumber(user.gardenboxs)) user.gardenboxs = 0; 
         if (!isNumber(user.gems)) user.gems = 0; 
         if (!isNumber(user.glass)) user.glass = 0; 
         if (!isNumber(user.glimit)) user.glimit = 20; 
         if (!isNumber(user.glory)) user.glory = 0; 
         if (!isNumber(user.gold)) user.gold = 0; 
         if (!isNumber(user.griffin)) user.griffin = 0; 
         if (!isNumber(user.griffinexp)) user.griffinexp = 0; 
         if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0; 
         if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0; 
         if (!isNumber(user.gulai)) user.gulai = 0; 
         if (!isNumber(user.gurita)) user.gurita = 0; 
         if (!isNumber(user.harimau)) user.harimau = 0; 
         if (!isNumber(user.haus)) user.haus = 100; 
         if (!isNumber(user.healt)) user.healt = 100; 
         if (!isNumber(user.health)) user.health = 100; 
         if (!isNumber(user.healthmonster)) user.healthmonster = 0; 
         if (!isNumber(user.healtmonster)) user.healtmonster = 0; 
         if (!isNumber(user.hero)) user.hero = 1; 
         if (!isNumber(user.herolastclaim)) user.herolastclaim = 0; 
         if (!isNumber(user.hiu)) user.hiu = 0; 
         if (!isNumber(user.horse)) user.horse = 0; 
         if (!isNumber(user.horseexp)) user.horseexp = 0; 
         if (!isNumber(user.horselastfeed)) user.horselastfeed = 0; 
         if (!isNumber(user.ikan)) user.ikan = 0; 
         if (!isNumber(user.ikanbakar)) user.ikanbakar = 0; 
         if (!isNumber(user.intelligence)) user.intelligence = 0; 
         if (!isNumber(user.iron)) user.iron = 0; 
         if (!isNumber(user.jagung)) user.jagung = 0; 
         if (!isNumber(user.jagungbakar)) user.jagungbakar = 0; 
         if (!isNumber(user.jeruk)) user.jeruk = 0; 
         if (!isNumber(user.joinlimit)) user.joinlimit = 1; 
         if (!isNumber(user.judilast)) user.judilast = 0; 
         if (!isNumber(user.kaleng)) user.kaleng = 0; 
         if (!isNumber(user.kambing)) user.kambing = 0; 
         if (!isNumber(user.kangkung)) user.kangkung = 0; 
         if (!isNumber(user.kapak)) user.kapak = 0; 
         if (!isNumber(user.kardus)) user.kardus = 0; 
         if (!isNumber(user.katana)) user.katana = 0; 
         if (!isNumber(user.katanadurability)) user.katanadurability = 0; 
         if (!isNumber(user.kayu)) user.kayu = 0; 
         if (!isNumber(user.kentang)) user.kentang = 0; 
         if (!isNumber(user.kentanggoreng)) user.kentanggoreng = 0; 
         if (!isNumber(user.kepiting)) user.kepiting = 0; 
         if (!isNumber(user.kepitingbakar)) user.kepitingbakar = 0; 
         if (!isNumber(user.kerbau)) user.kerbau = 0; 
         if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0; 
         if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0; 
         if (!isNumber(user.kerjadua)) user.kerjadua = 0; 
         if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0; 
         if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0; 
         if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0; 
         if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0; 
         if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0; 
         if (!isNumber(user.kerjadualima)) user.kerjadualima = 0; 
         if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0; 
         if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0; 
         if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0; 
         if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0; 
         if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0; 
         if (!isNumber(user.kerjaempat)) user.kerjaempat = 0; 
         if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0; 
         if (!isNumber(user.kerjaenam)) user.kerjaenam = 0; 
         if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0; 
         if (!isNumber(user.kerjalima)) user.kerjalima = 0; 
         if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0; 
         if (!isNumber(user.kerjasatu)) user.kerjasatu = 0; 
         if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0; 
         if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0; 
         if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0; 
         if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0; 
         if (!isNumber(user.kerjatiga)) user.kerjatiga = 0; 
         if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0; 
         if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0; 
         if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0; 
         if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0; 
         if (!isNumber(user.korbanngocok)) user.korbanngocok = 0; 
         if (!isNumber(user.kubis)) user.kubis = 0; 
         if (!isNumber(user.kucing)) user.kucing = 0; 
         if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0; 
         if (!isNumber(user.kuda)) user.kuda = 0; 
         if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0; 
         if (!isNumber(user.kyubi)) user.kyubi = 0; 
         if (!isNumber(user.kyubiexp)) user.kyubiexp = 0; 
         if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0; 
         if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0; 
         if (!isNumber(user.labu)) user.labu = 0; 
         if (!isNumber(user.laper)) user.laper = 100; 
         if (!isNumber(user.lastadventure)) user.lastadventure = 0; 
         if (!isNumber(user.lastbansos)) user.lastbansos = 0; 
         if (!isNumber(user.lastberbru)) user.lastberbru = 0; 
         if (!isNumber(user.lastberkebon)) user.lastberkebon = 0; 
         if (!isNumber(user.lastbunga)) user.lastbunga = 0; 
         if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0; 
         if (!isNumber(user.lastcoins)) user.lastcoins = 0; 
         if (!isNumber(user.lastclaim)) user.lastclaim = 0; 
         if (!isNumber(user.lastcode)) user.lastcode = 0; 
         if (!isNumber(user.lastcofre)) user.lastcofre = 0; 
         if (!isNumber(user.lastcodereg)) user.lastcodereg = 0; 
         if (!isNumber(user.lastcrusade)) user.lastcrusade = 0; 
         if (!isNumber(user.lastdagang)) user.lastdagang = 0; 
         if (!isNumber(user.lastdiamantes)) user.lastdiamantes = 0; 
         if (!isNumber(user.lastduel)) user.lastduel = 0; 
         if (!isNumber(user.lastdungeon)) user.lastdungeon = 0; 
         if (!isNumber(user.lasteasy)) user.lasteasy = 0; 
         if (!isNumber(user.lastfight)) user.lastfight = 0; 
         if (!isNumber(user.lastfishing)) user.lastfishing = 0; 
         if (!isNumber(user.lastgift)) user.lastgift = 0; 
         if (!isNumber(user.lastgojek)) user.lastgojek = 0; 
         if (!isNumber(user.lastgrab)) user.lastgrab = 0; 
         if (!isNumber(user.lasthourly)) user.lasthourly = 0; 
         if (!isNumber(user.lasthunt)) user.lasthunt = 0; 
         if (!isNumber(user.lastIstigfar)) user.lastIstigfar = 0; 
         if (!isNumber(user.lastjb)) user.lastjb = 0; 
         if (!isNumber(user.lastkill)) user.lastkill = 0; 
         if (!isNumber(user.lastlink)) user.lastlink = 0; 
         if (!isNumber(user.lastlumber)) user.lastlumber = 0; 
         if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0; 
         if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0; 
         if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0; 
         if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0; 
         if (!isNumber(user.lastmining)) user.lastmining = 0; 
         if (!isNumber(user.lastmisi)) user.lastmisi = 0; 
         if (!isNumber(user.lastmonthly)) user.lastmonthly = 0; 
         if (!isNumber(user.lastmulung)) user.lastmulung = 0; 
         if (!isNumber(user.lastnambang)) user.lastnambang = 0; 
         if (!isNumber(user.lastnebang)) user.lastnebang = 0; 
         if (!isNumber(user.lastngocok)) user.lastngocok = 0; 
         if (!isNumber(user.lastngojek)) user.lastngojek = 0; 
         if (!isNumber(user.lastopen)) user.lastopen = 0; 
         if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0; 
         if (!isNumber(user.lastpago)) user.lastpago = 0; 
         if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0; 
         if (!isNumber(user.lastrampok)) user.lastrampok = 0; 
         if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0; 
         if (!isNumber(user.lastrob)) user.lastrob = 0; 
         if (!isNumber(user.lastroket)) user.lastroket = 0; 
         if (!isNumber(user.lastsda)) user.lastsda = 0; 
         if (!isNumber(user.lastseen)) user.lastseen = 0; 
         if (!isNumber(user.lastSetStatus)) user.lastSetStatus = 0; 
         if (!isNumber(user.lastspam)) user.lastspam = 0; 
         if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0; 
         if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0; 
         if (!isNumber(user.laststringclaim)) user.laststringclaim = 0; 
         if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0; 
         if (!isNumber(user.lastturu)) user.lastturu = 0; 
         if (!isNumber(user.lastwar)) user.lastwar = 0; 
         if (!isNumber(user.lastwarpet)) user.lastwarpet = 0; 
         if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0; 
         if (!isNumber(user.lastweekly)) user.lastweekly = 0; 
         if (!isNumber(user.lastwork)) user.lastwork = 0; 
         if (!isNumber(user.legendary)) user.legendary = 0; 
         if (!isNumber(user.lele)) user.lele = 0; 
         if (!isNumber(user.leleb)) user.leleb = 0; 
         if (!isNumber(user.lelebakar)) user.lelebakar = 0; 
         if (!isNumber(user.leleg)) user.leleg = 0; 
         if (!isNumber(user.level)) user.level = 0; 
         if (!isNumber(user.limit)) user.limit = 20; 
         if (!isNumber(user.limitjoinfree)) user.limitjoinfree = 1; 
         if (!isNumber(user.lion)) user.lion = 0; 
         if (!isNumber(user.lionexp)) user.lionexp = 0; 
         if (!isNumber(user.lionlastfeed)) user.lionlastfeed = 0; 
         if (!isNumber(user.lobster)) user.lobster = 0; 
         if (!isNumber(user.lumba)) user.lumba = 0; 
         if (!isNumber(user.magicwand)) user.magicwand = 0; 
         if (!isNumber(user.magicwanddurability)) user.magicwanddurability = 0; 
         if (!isNumber(user.makanancentaur)) user.makanancentaur = 0; 
         if (!isNumber(user.makanangriffin)) user.makanangriffin = 0; 
         if (!isNumber(user.makanankyubi)) user.makanankyubi = 0; 
         if (!isNumber(user.makanannaga)) user.makanannaga = 0; 
         if (!isNumber(user.makananpet)) user.makananpet = 0; 
         if (!isNumber(user.makananphonix)) user.makananphonix = 0; 
         if (!isNumber(user.makananserigala)) user.makananserigala = 0; 
         if (!isNumber(user.mana)) user.mana = 0; 
         if (!isNumber(user.mangga)) user.mangga = 0; 
         if (!isNumber(user.money)) user.money = 15; 
         if (!isNumber(user.monyet)) user.monyet = 0; 
         if (!isNumber(user.mythic)) user.mythic = 0; 
         if (!isNumber(user.naga)) user.naga = 0; 
         if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0; 
         if (!isNumber(user.net)) user.net = 0; 
         if (!isNumber(user.nila)) user.nila = 0; 
         if (!isNumber(user.nilabakar)) user.nilabakar = 0; 
         if (!isNumber(user.note)) user.note = 0; 
         if (!isNumber(user.ojekk)) user.ojekk = 0; 
         if (!isNumber(user.oporayam)) user.oporayam = 0; 
         if (!isNumber(user.orca)) user.orca = 0; 
         if (!isNumber(user.pancing)) user.pancing = 0; 
         if (!isNumber(user.pancingan)) user.pancingan = 1; 
         if (!isNumber(user.panda)) user.panda = 0; 
         if (!isNumber(user.paus)) user.paus = 0; 
         if (!isNumber(user.pausbakar)) user.pausbakar = 0; 
         if (!isNumber(user.pc)) user.pc = 0; 
         if (!isNumber(user.pepesikan)) user.pepesikan = 0; 
         if (!isNumber(user.pertambangan)) user.pertambangan = 0; 
         if (!isNumber(user.pertanian)) user.pertanian = 0; 
         if (!isNumber(user.pet)) user.pet = 0; 
         if (!isNumber(user.petFood)) user.petFood = 0; 
         if (!isNumber(user.phonix)) user.phonix = 0; 
         if (!isNumber(user.phonixexp)) user.phonixexp = 0; 
         if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0; 
         if (!isNumber(user.phonixlastfeed)) user.phonixlastfeed = 0; 
         if (!isNumber(user.pickaxe)) user.pickaxe = 0; 
         if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0; 
         if (!isNumber(user.pillhero)) user.pillhero= 0; 
         if (!isNumber(user.pisang)) user.pisang = 0; 
         if (!isNumber(user.pointxp)) user.pointxp = 0; 
         if (!isNumber(user.potion)) user.potion = 0; 
         if (!isNumber(user.psenjata)) user.psenjata = 0; 
         if (!isNumber(user.psepick)) user.psepick = 0; 
         if (!isNumber(user.ramuan)) user.ramuan = 0; 
         if (!isNumber(user.ramuancentaurlast)) user.ramuancentaurlast = 0; 
         if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0; 
         if (!isNumber(user.ramuanherolast)) user.ramuanherolast = 0; 
         if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0; 
         if (!isNumber(user.ramuankudalast)) user.ramuankudalast = 0; 
         if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0; 
         if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0; 
         if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0; 
         if (!isNumber(user.ramuanrubahlast)) user.ramuanrubahlast = 0; 
         if (!isNumber(user.ramuanserigalalast)) user.ramuanserigalalast = 0; 
         if (!isNumber(user.reglast)) user.reglast = 0; 
         if (!isNumber(user.rendang)) user.rendang = 0; 
         if (!isNumber(user.rhinoceros)) user.rhinoceros = 0; 
         if (!isNumber(user.rhinocerosexp)) user.rhinocerosexp = 0; 
         if (!isNumber(user.rhinoceroslastfeed)) user.rhinoceroslastfeed = 0; 
         if (!isNumber(user.robo)) user.robo = 0; 
         if (!isNumber(user.roboxp)) user.roboxp = 0; 
         if (!isNumber(user.rock)) user.rock = 0; 
         if (!isNumber(user.roket)) user.roket = 0; 
         if (!isNumber(user.roti)) user.roti = 0; 
         if (!isNumber(user.rubah)) user.rubah = 0; 
         if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0; 
         if (!isNumber(user.rumahsakit)) user.rumahsakit = 0; 
         if (!isNumber(user.sampah)) user.sampah = 0; 
         if (!isNumber(user.sand)) user.sand = 0; 
         if (!isNumber(user.sapi)) user.sapi = 0; 
         if (!isNumber(user.sapir)) user.sapir = 0; 
         if (!isNumber(user.seedbayam)) user.seedbayam = 0; 
         if (!isNumber(user.seedbrokoli)) user.seedbrokoli = 0; 
         if (!isNumber(user.seedjagung)) user.seedjagung = 0; 
         if (!isNumber(user.seedkangkung)) user.seedkangkung = 0; 
         if (!isNumber(user.seedkentang)) user.seedkentang = 0; 
         if (!isNumber(user.seedkubis)) user.seedkubis = 0; 
         if (!isNumber(user.seedlabu)) user.seedlabu = 0; 
         if (!isNumber(user.seedtomat)) user.seedtomat = 0; 
         if (!isNumber(user.seedwortel)) user.seedwortel = 0; 
         if (!isNumber(user.serigala)) user.serigala = 0; 
         if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0; 
         if (!isNumber(user.shield)) user.shield = false; 
         if (!isNumber(user.skillexp)) user.skillexp = 0; 
         if (!isNumber(user.snlast)) user.snlast = 0; 
         if (!isNumber(user.soda)) user.soda = 0; 
         if (!isNumber(user.sop)) user.sop = 0; 
         if (!isNumber(user.spammer)) user.spammer = 0; 
         if (!isNumber(user.spinlast)) user.spinlast = 0; 
         if (!isNumber(user.ssapi)) user.ssapi = 0; 
         if (!isNumber(user.stamina)) user.stamina = 100; 
         if (!isNumber(user.steak)) user.steak = 0; 
         if (!isNumber(user.stick)) user.stick = 0; 
         if (!isNumber(user.strength)) user.strength = 0; 
         if (!isNumber(user.string)) user.string = 0; 
         if (!isNumber(user.superior)) user.superior = 0; 
         if (!isNumber(user.suplabu)) user.suplabu = 0; 
         if (!isNumber(user.sushi)) user.sushi = 0; 
         if (!isNumber(user.sword)) user.sword = 0; 
         if (!isNumber(user.sworddurability)) user.sworddurability = 0; 
         if (!isNumber(user.tigame)) user.tigame = 50; 
         if (!isNumber(user.tiketcoin)) user.tiketcoin = 0; 
         if (!isNumber(user.title)) user.title = 0; 
         if (!isNumber(user.tomat)) user.tomat = 0; 
         if (!isNumber(user.tprem)) user.tprem = 0; 
         if (!isNumber(user.trash)) user.trash = 0; 
         if (!isNumber(user.trofi)) user.trofi = 0; 
         if (!isNumber(user.troopcamp)) user.troopcamp = 0; 
         if (!isNumber(user.tumiskangkung)) user.tumiskangkung = 0; 
         if (!isNumber(user.udang)) user.udang = 0; 
         if (!isNumber(user.udangbakar)) user.udangbakar = 0; 
         if (!isNumber(user.umpan)) user.umpan = 0; 
         if (!isNumber(user.uncoommon)) user.uncoommon = 0; 
         if (!isNumber(user.unreglast)) user.unreglast = 0; 
         if (!isNumber(user.upgrader)) user.upgrader = 0; 
         if (!isNumber(user.vodka)) user.vodka = 0; 
         if (!isNumber(user.wallet)) user.wallet = 0; 
         if (!isNumber(user.warn)) user.warn = 0; 
         if (!isNumber(user.weapon)) user.weapon = 0; 
         if (!isNumber(user.weapondurability)) user.weapondurability = 0; 
         if (!isNumber(user.wolf)) user.wolf = 0; 
         if (!isNumber(user.wolfexp)) user.wolfexp = 0; 
         if (!isNumber(user.wolflastfeed)) user.wolflastfeed = 0; 
         if (!isNumber(user.wood)) user.wood = 0; 
         if (!isNumber(user.wortel)) user.wortel = 0; 
         if (!user.lbars) user.lbars = '[▒▒▒▒▒▒▒▒▒]'; 
         if (!user.job) user.job = 'Desempleo'; 
         if (!user.premium) user.premium = false; 
         if (!user.premium) user.premiumTime = 0; 
         if (!user.wait) user.wait = 0; 
         if (!user.rtrofi) user.rtrofi = 'Bronce'; 
       } else {
         global.db.data.users[m.sender] = { 
           afkTime: -1, 
           wait: 0, 
           afkReason: '', 
           age: -1, 
           agility: 16, 
           anakanjing: 0, 
           anakcentaur: 0, 
           anakgriffin: 0, 
           anakkucing: 0, 
           anakkuda: 0, 
           anakkyubi: 0, 
           anaknaga: 0, 
           anakpancingan: 0, 
           anakphonix: 0, 
           anakrubah: 0, 
           anakserigala: 0, 
           anggur: 0, 
           anjing: 0, 
           anjinglastclaim: 0, 
           antispam: 0, 
           antispamlastclaim: 0, 
           apel: 0, 
           aqua: 0, 
           arc: 0, 
           arcdurability: 0, 
           arlok: 0, 
           armor: 0, 
           armordurability: 0, 
           armormonster: 0, 
           as: 0, 
           atm: 0, 
           autolevelup: true, 
           axe: 0, 
           axedurability: 0, 
           ayam: 0, 
           ayamb: 0, 
           ayambakar: 0, 
           ayamg: 0, 
           ayamgoreng: 0, 
           babi: 0, 
           babihutan: 0, 
           babipanggang: 0, 
           bandage: 0, 
           bank: 0, 
           banned: false, 
           BannedReason: '', 
           Banneduser: false, 
           banteng: 0, 
           batu: 0, 
           bawal: 0, 
           bawalbakar: 0, 
           bayam: 0, 
           berlian: 10, 
           bibitanggur: 0, 
           bibitapel: 0, 
           bibitjeruk: 0, 
           bibitmangga: 0, 
           bibitpisang: 0, 
           botol: 0, 
           bow: 0, 
           bowdurability: 0, 
           boxs: 0, 
           brick: 0, 
           brokoli: 0, 
           buaya: 0, 
           buntal: 0, 
           cat: 0, 
           catlastfeed: 0, 
           catngexp: 0, 
           centaur: 0, 
           centaurexp: 0, 
           centaurlastclaim: 0, 
           centaurlastfeed: 0, 
           clay: 0, 
           coal: 0, 
           coin: 0, 
           common: 0, 
           crystal: 0, 
           cumi: 0, 
           cupon: 0, 
           diamond: 3, 
           dog: 0, 
           dogexp: 0, 
           doglastfeed: 0, 
           dory: 0, 
           dragon: 0, 
           dragonexp: 0, 
           dragonlastfeed: 0, 
           emas: 0, 
           emerald: 0, 
           esteh: 0, 
           exp: 0, 
           expg: 0, 
           exphero: 0, 
           expired: 0, 
                     eleksirb: 0, 
                     emasbatang: 0, 
                     emasbiasa: 0, 
                     fideos: 0, 
           fishingrod: 0, 
           fishingroddurability: 0, 
           fortress: 0, 
           fox: 0, 
           foxexp: 0, 
           foxlastfeed: 0, 
           fullatm: 0, 
           gadodado: 0, 
           gajah: 0, 
           gamemines: false, 
           ganja: 0, 
           gardenboxs: 0, 
           gems: 0, 
           glass: 0, 
           gold: 0, 
           griffin: 0, 
           griffinexp: 0, 
           griffinlastclaim: 0, 
           griffinlastfeed: 0, 
           gulai: 0, 
           gurita: 0, 
           harimau: 0, 
           haus: 100, 
           healt: 100, 
           health: 100, 
           healtmonster: 100, 
           hero: 1, 
           herolastclaim: 0, 
           hiu: 0, 
           horse: 0, 
           horseexp: 0, 
           horselastfeed: 0, 
           ikan: 0, 
           ikanbakar: 0, 
           intelligence: 10, 
           iron: 0, 
           jagung: 0, 
           jagungbakar: 0, 
           jeruk: 0, 
           job: 'Pengangguran', 
                             joincount: 2, 
           joinlimit: 1, 
           judilast: 0, 
           kaleng: 0, 
           kambing: 0, 
           kangkung: 0, 
           kapak: 0, 
           kardus: 0, 
           katana: 0, 
           katanadurability: 0, 
           kayu: 0, 
           kentang: 0, 
           kentanggoreng: 0, 
           kepiting: 0, 
           kepitingbakar: 0, 
           kerbau: 0, 
           kerjadelapan: 0, 
           kerjadelapanbelas: 0, 
           kerjadua: 0, 
           kerjaduabelas: 0, 
           kerjaduadelapan: 0, 
           kerjaduadua: 0, 
           kerjaduaempat: 0, 
           kerjaduaenam: 0, 
           kerjadualima: 0, 
           kerjaduapuluh: 0, 
           kerjaduasatu: 0, 
           kerjaduasembilan: 0, 
           kerjaduatiga: 0, 
           kerjaduatujuh: 0, 
           kerjaempat: 0, 
           kerjaempatbelas: 0, 
           kerjaenam: 0, 
           kerjaenambelas: 0, 
           kerjalima: 0, 
           kerjalimabelas: 0, 
           kerjasatu: 0, 
           kerjasebelas: 0, 
           kerjasembilan: 0, 
           kerjasembilanbelas: 0, 
           kerjasepuluh: 0, 
           kerjatiga: 0, 
           kerjatigabelas: 0, 
           kerjatigapuluh: 0, 
           kerjatujuh: 0, 
           kerjatujuhbelas: 0, 
           korbanngocok: 0, 
           kubis: 0, 
           kucing: 0, 
           kucinglastclaim: 0, 
           kuda: 0, 
           kudalastclaim: 0, 
           kumba: 0, 
           kyubi: 0, 
           kyubilastclaim: 0, 
           labu: 0, 
           laper: 100, 
           lastadventure: 0, 
           lastberbru: 0, 
           lastberkebon: 0, 
           lastbunga: 0, 
           lastbunuhi: 0, 
                     lastcoins: 0, 
           lastclaim: 0, 
           lastcode: 0, 
                     lastcofre: 0, 
           lastcrusade: 0, 
           lastdaang: 0, 
           lastdagang: 0, 
                     lastdiamantes: 0, 
           lastduel: 0, 
           lastdungeon: 0, 
           lasteasy: 0, 
           lastfight: 0, 
           lastfishing: 0, 
           lastgojek: 0, 
           lastgrab: 0, 
           lasthourly: 0, 
           lasthunt: 0, 
           lastjb: 0, 
           lastkill: 0, 
           lastlink: 0, 
           lastlumber: 0, 
           lastmancingeasy: 0, 
           lastmancingextreme: 0, 
           lastmancinghard: 0, 
           lastmancingnormal: 0, 
           lastmining: 0, 
           lastmisi: 0, 
           lastmonthly: 0, 
           lastmulung: 0, 
           lastnambang: 0, 
           lastnebang: 0, 
           lastngocok: 0, 
           lastngojek: 0, 
           lastopen: 0, 
           lastpekerjaan: 0, 
           lastpago: 0, 
           lastpotionclaim: 0, 
           lastramuanclaim: 0, 
           lastspam: 0, 
           lastrob: 0, 
           lastroket: 0, 
           lastseen: 0, 
           lastSetStatus: 0, 
           lastsironclaim: 0, 
           lastsmancingclaim: 0, 
           laststringclaim: 0, 
           lastswordclaim: 0, 
           lastturu: 0, 
           lastwarpet: 0, 
           lastweaponclaim: 0, 
           lastweekly: 0, 
           lastwork: 0, 
           lbars: '[▒▒▒▒▒▒▒▒▒]', 
           legendary: 0, 
           lele: 0, 
           leleb: 0, 
           lelebakar: 0, 
           leleg: 0, 
           level: 0, 
           limit: 20, 
           limitjoinfree: 1, 
           lion: 0, 
           lionexp: 0, 
           lionlastfeed: 0, 
           lobster: 0, 
           lumba: 0, 
           magicwand: 0, 
           magicwanddurability: 0, 
           makanan: 0, 
           makanancentaur: 0, 
           makanangriffin: 0, 
           makanankyubi: 0, 
           makanannaga: 0, 
           makananpet: 0, 
           makananphonix: 0, 
           makananserigala: 0, 
           mana: 20, 
           mangga: 0, 
           misi: '', 
           money: 15, 
           monyet: 0, 
           mythic: 0, 
           naga: 0, 
           nagalastclaim: 0, 
           name: m.name, 
           net: 0, 
           nila: 0, 
           nilabakar: 0, 
           note: 0, 
           ojekk: 0, 
           oporayam: 0, 
           orca: 0, 
           pancingan: 1, 
           panda: 0, 
           pasangan: '', 
           paus: 0, 
           pausbakar: 0, 
           pc: 0, 
           pepesikan: 0, 
           pet: 0, 
           phonix: 0, 
           phonixexp: 0, 
           phonixlastclaim: 0, 
           phonixlastfeed: 0, 
           pickaxe: 0, 
           pickaxedurability: 0, 
           pillhero: 0, 
           pisang: 0, 
           pointxp: 0, 
           potion: 10, 
           premium: false, 
           premiumTime: 0, 
           ramuan: 0, 
           ramuancentaurlast: 0, 
           ramuangriffinlast: 0, 
           ramuanherolast: 0, 
           ramuankucinglast: 0, 
           ramuankudalast: 0, 
           ramuankyubilast: 0, 
           ramuannagalast: 0, 
           ramuanphonixlast: 0, 
           ramuanrubahlast: 0, 
           ramuanserigalalast: 0, 
           registered: false, 
           reglast: 0, 
           regTime: -1, 
           rendang: 0, 
           rhinoceros: 0, 
           rhinocerosexp: 0, 
           rhinoceroslastfeed: 0, 
           rock: 0, 
           roket: 0, 
           role: 'Novato', 
           roti: 0, 
           rtrofi: 'bronce', 
           rubah: 0, 
           rubahlastclaim: 0, 
           rumahsakit: 0, 
           sampah: 0, 
           sand: 0, 
           sapi: 0, 
           sapir: 0, 
           seedbayam: 0, 
           seedbrokoli: 0, 
           seedjagung: 0, 
           seedkangkung: 0, 
           seedkentang: 0, 
           seedkubis: 0, 
           seedlabu: 0, 
           seedtomat: 0, 
           seedwortel: 0, 
           semangka: 0, 
           serigala: 0, 
           serigalalastclaim: 0, 
           sewa: false, 
           shield: 0, 
           skill: '', 
           skillexp: 0, 
           snlast: 0, 
           soda: 0, 
           sop: 0, 
           spammer: 0, 
           spinlast: 0, 
           ssapi: 0, 
           stamina: 100, 
           steak: 0, 
           stick: 0, 
           strength: 30, 
           string: 0, 
           stroberi: 0, 
           superior: 0, 
           suplabu: 0, 
           sushi: 0, 
           sword: 0, 
           sworddurability: 0, 
           tigame: 50, 
           tiketcoin: 0, 
           title: '', 
           tomat: 0, 
           tprem: 0, 
           trash: 0, 
           trofi: 0, 
           troopcamp: 0, 
           tumiskangkung: 0, 
           udang: 0, 
           udangbakar: 0, 
           umpan: 0, 
           uncoommon: 0, 
           unreglast: 0, 
           upgrader: 0, 
           vodka: 0, 
           wallet: 0, 
           warn: 0, 
           weapon: 0, 
           weapondurability: 0, 
           wolf: 0, 
           wolfexp: 0, 
           wolflastfeed: 0, 
           wood: 0, 
           wortel: 0, 
         }}
  
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
  if (!('sWelcome' in chats)) chatssWelcome = ''
  if (!('sBye' in chats)) chats.sBye = ''
  if (!('sPromote' in chats)) chats.sPromote = ''
  if (!('sDemote' in chats)) chats.sDemote = ''
  if (!('antidelete' in chats)) chats.antidelete = false
  if (!('antiviewonce' in chats)) chats.antiviewonce = false
  if (!('restrict' in chats)) chats.restrict = true
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
  antidelete: false,
  antiviewonce: false,
  restrict: true,
  }
  
  let setting = global.db.data.settings[conn?.user?.jid]
  if (typeof setting !== 'object') global.db.data.settings[conn?.user?.jid] = {}  
  if (setting) {  
  if (!isNumber(setting.status)) setting.status = 0  
  if (!('autobio' in setting)) setting.autobio = true
  if(!('privateMode' in setting)) setting.privateMode = false
  if (!('jadibot' in setting)) setting.jadibot = true 
  if(!('antiCall' in setting)) setting.antiCall = false
  } else global.db.data.settings[conn?.user?.jid] = {  
  status: 0,  
  autobio: true,
  privateMode: false,
  jadibot: true,
  antiCall: false
  }


global.db.data.sticker = global.db.data.sticker || {} // sticker for addcmd

} catch (error) { 
 m.error = error 
 if (error) { 
 console.error(m.error) 
 }}

global.mess = {
admin: "*❗ Este comando es solo para admins!!* (⁠・⁠_⁠・)",
owner: "*❗ Solo un creador/moderador del bot puede usar esto* (⁠ ⁠･ั⁠﹏⁠･ั⁠)",
group: "*❗ Este comando es para Grupos* -_-",
priv: "*❗ Este comando es para chats privados* -_-",
botAdmin: "❗ *El bot necesita ser admin para este comando*",
wait: `*Por favor espera...*\n*tengo ${Object.keys(global.db.data.users).length} usuarios usandome, Puedo ser lenta >w<*`,
restrict: `*Este comando fue desabilitado por el creador del bot*`
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
exports.smsg = smsg
exports.makeWaSocket = makeWaSocket