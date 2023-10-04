
const { smsg, sleep, makeWaSocket, protoType, serialize, getGroupAdmins, clockString }= require('./lib/fuctions')
const { areJidsSameUser, useMultiFileAuthState, DisconnectReason, proto, jidNormalizedUser, WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, getAggregateVotesInPollMessage } = require("@whiskeysockets/baileys")
const gradient = require('gradient-string')
const store = require('./lib/store.js')
const fs = require('fs')
const { watchFile, unwatchFile } = require('fs')
const chalk = require('chalk')
const fetch = require('node-fetch')
const path = require('path')



// handle message.upsert event (conn.ev) imported from ('@whiskeysockets/baileys')
/**
  * @type {import('@whiskeysockets/baileys').WASocket | import('@whiskeysockets/baileys').WALegacySocket | import('./lib/fuctions.js').makeWaSocket}
  */

async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  this.uptime = this.uptime || Date.now()
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!chatUpdate) return
  if (!m) return
  
  try {
  m = smsg(this, m) || m    
  if (m.key.id.startsWith("BAE5")) return  
  var body = (typeof m.text == 'string' ? m.text : '')
  
  
  const msgs = (message) => { 
  if (message.length >= 10) { 
  return `${message.substr(0, 500)}` 
  } else { 
  return `${message}`}}
  

  const _isBot = this.user.jid
  const args = body.trim().split(/ +/).slice(1) 
  const pushname = m.pushName || "Sin nombre" 
  const userSender = m.key.fromMe ? _isBot : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid  
  const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender) 
  const itsMe = m.sender == this.user.id ? true : false 
  const text = args.join(" ") 
  const quoted = m.quoted ? m.quoted : m 
  const sender = m.key.fromMe ? _isBot : m.isGroup ? m.key.participant : m.key.remoteJid 
  const mime = (quoted.msg || quoted).mimetype || ''  
  const isMedia = /image|video|sticker|audio/.test(mime)
  const mentions = []  

  const groupMetadata = m.isGroup ? await this.groupMetadata(m.chat) : ''
  const groupName = m.isGroup ? groupMetadata.subject : '' 
  const participants = m.isGroup ? await groupMetadata.participants : '' 
  const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '' 
  
  const isBotAdmins = m.isGroup ? groupAdmins.includes(this.user.jid) : false  
  const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false 
  const isBaneed = m.isGroup ? blockList.includes(userSender) : false 
  const isPremium = m.isGroup ? premium.includes(userSender) : false   
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
  

  
  
  
  if (!this.public && m.key.fromMe) return
  if (typeof m.text !== 'string') {
  m.text = ''
  }
  if (m.isBaileys) return
  if (!this.public && !m.key.fromMe && chatUpdate.type === 'notify') return
  
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
  }
  
  let setting = global.db.data.settings[this?.user?.jid]
  if (typeof setting !== 'object') global.db.data.settings[this?.user?.jid] = {}  
  if (setting) {  
  if (!isNumber(setting.status)) setting.status = 0  
  if (!('autobio' in setting)) setting.autobio = true
  if(!('privateMode' in setting)) setting.privateMode = false
  if (!('jadibot' in setting)) setting.jadibot = true 
  if(!('antiCall' in setting)) setting.antiCall = false
  } else global.db.data.settings[this?.user?.jid] = {  
  status: 0,  
  autobio: true,
  privateMode: false,
  jadibot: true,
  antiCall: false
  }


global.db.data.sticker = global.db.data.sticker || {} // sticker for addcmd

if (user) { //@skidy89 

 if (user.level <= 3) { 
   user.role = 'NOVATO(A) I' 
 } else if (user.level <= 6) { 
   user.role = 'NOVATO(A) II' 
 } else if (user.level <= 9) { 
   user.role = 'NOVATO(A) III' 
 } else if (user.level <= 12) { 
   user.role = 'NOVATO(A) IV' 
 } else if (user.level <= 15) { 
   user.role = 'APRENDIS I' 
 } else if (user.level <= 18) { 
   user.role = 'APRENDIS II' 
 } else if (user.level <= 21) { 
   user.role = 'APRENDIS III' 
 } else if (user.level <= 24) { 
   user.role = 'APRENDIS IV' 
 } else if (user.level <= 27) { 
   user.role = 'EXPLORADOR(A) I' 
 } else if (user.level <= 30) { 
   user.role = 'EXPLORADOR(A) II' 
 } else if (user.level <= 33) { 
   user.role = 'EXPLORADOR(A) III' 
 } else if (user.level <= 36) { 
   user.role = 'EXPLORADOR(A) IV' 
 } else if (user.level <= 39) { 
   user.role = '🏆 Elite I' 
 } else if (user.level <= 42) { 
   user.role = '🏆 Elite II' 
 } else if (user.level <= 45) { 
   user.role = '🏆 Elite III' 
 } else if (user.level <= 48) { 
   user.role = '🏆 Elite IV' 
 } else if (user.level <= 51) { 
   user.role = '👑 Maestro I' 
 } else if (user.level <= 54) { 
   user.role = '👑 Maestro II' 
 } else if (user.level <= 57) { 
   user.role = '👑 Maestro III' 
 } else if (user.level <= 60) { 
   user.role = '🌟 Leyenda I' 
 } else if (user.level <= 63) { 
   user.role = '🌟 Leyenda II' 
 } else if (user.level <= 66) { 
   user.role = '🌟 Leyenda III' 
 } else if (user.level <= 69) { 
   user.role = '🔥 Mítico I' 
 } else if (user.level <= 72) { 
   user.role = '🔥 Mítico II' 
 } else if (user.level <= 75) { 
   user.role = '🔥 Mítico III' 
 } else if (user.level <= 78) { 
   user.role = '💫 Supremo I' 
 } else if (user.level <= 81) { 
   user.role = '💫 Supremo II' 
 } else if (user.level <= 84) { 
   user.role = '💫 Supremo III' 
 } else if (user.level <= 87) { 
   user.role = '🌀 Divino I' 
 } else if (user.level <= 90) { 
   user.role = '🌀 Divino II' 
 } else if (user.level <= 93) { 
   user.role = '🌀 Divino III' 
 } else if (user.level <= 96) { 
   user.role = '🌌 Celestial I' 
 } else if (user.level <= 99) { 
   user.role = '🌌 Celestial II' 
 } else if (user.level <= 102) { 
   user.role = '🌌 Celestial III' 
 } else if (user.level <= 105) { 
   user.role = '🌟 Estelar I' 
 } else if (user.level <= 108) { 
   user.role = '🌟 Estelar II' 
 } else if (user.level <= 111) { 
   user.role = '🌟 Estelar III' 
 } else if (user.level <= 114) { 
   user.role = '🌠 Universal I' 
 } else if (user.level <= 117) { 
   user.role = '🌠 Universal II' 
 } else if (user.level <= 120) { 
   user.role = '🌠 Universal III' 
 } else if (user.level <= 123) { 
   user.role = '🎖️ Supremacía I' 
 } else if (user.level <= 126) { 
   user.role = '🎖️ Supremacía II' 
 } else if (user.level <= 129) { 
   user.role = '🎖️ Supremacía III' 
 } else if (user.level <= 132) { 
   user.role = '🔱 Divinidad I' 
 } else if (user.level <= 135) { 
   user.role = '🔱 Divinidad II' 
 } else if (user.level <= 138) { 
   user.role = '🔱 Divinidad III' 
 } else if (user.level <= 141) { 
   user.role = '🌌 Infinito I' 
 } else if (user.level <= 144) { 
   user.role = '🌌 Infinito II' 
 } else if (user.level <= 147) { 
   user.role = '🌌 Infinito III' 
 } else if (user.level <= 150) { 
   user.role = '🌠 Eterno' 
 }}} catch (error) { 
 m.error = error 
 if (error) { 
 console.error(m.error) 
 }}

global.mess = {
admin: "*❗ Este comando es solo para admins!!* (⁠・⁠_⁠・)",
owner: "*❗ Solo un creador/moderador del bot puede usar esto* (⁠ ⁠･ั⁠﹏⁠･ั⁠)",
group: "*❗ Este comando es para Grupos* -_-",
priv: "*❗ Este comando es para chats privados* -_-",
botAdmin: " 𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚜𝚎𝚌𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗 𝚙𝚊𝚛𝚊 𝚎𝚜𝚝𝚎 𝚌𝚘𝚖𝚊𝚗𝚍𝚘",
wait: `*Por favor espera...*\n*tengo ${Object.keys(global.db.data.users).length} usuarios usandome, Puedo ser lenta >w<*`
}


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
  
  if (global.db.data.chats[m.chat].autoSticker) {  
          if (/image/.test(mime)) {  
          reply(mess.wait)  
          media = await quoted.download()  
          let encmedia = await this.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((quoted.msg || quoted).seconds > 40) return reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await this.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: goblal.author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      }}
      
    

    if (global.db.data.chats[m.chat].antiFake) {
     if (m.chat && m.sender.startsWith('1')) return this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
    }
    
    if (global.db.data.chats[m.chat].antiArabe) {
      if (m.chat && m.sender.startsWith('212')) return this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }

    if (global.db.data.chats[m.chat].isBanned && isCmd && !isGroupAdmins) {
    return
    }
  

  if (global.db.data.chats[m.chat].antilink) {
  if (body.match(`chat.whatsapp.com`)) {  
  let delet = m.key.participant  
  let bang = m.key.id  
  reply(`*「 ANTI LINK 」*\n\n*𝚕𝚒𝚗𝚔 𝚍𝚎𝚝𝚎𝚌𝚝𝚊𝚍𝚘*\n*𝚕𝚘 𝚜𝚒𝚎𝚗𝚝𝚘 𝚙𝚎𝚛𝚘 𝚗𝚘 𝚜𝚎 𝚙𝚎𝚛𝚖𝚒𝚝𝚎𝚗 𝚕𝚒𝚗𝚔𝚜 𝚜𝚎𝚛𝚊𝚜 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘*`)  
  if (!isBotAdmins) return reply(`𝚎𝚕 𝚋𝚘𝚝 𝚗𝚎𝚌𝚎𝚜𝚒𝚝𝚊 𝚜𝚎𝚛 𝚊𝚍𝚖𝚒𝚗`)  
  if (isGroupAdmins) throw '*eres admin -_-*'
  let gclink = (`https://chat.whatsapp.com/`+await this.groupInviteCode(m.chat))  
  let isLinkThisGc = new RegExp(gclink, 'i')  
  let isgclink = isLinkThisGc.test(m.text)  
  this.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})  
  this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')}}  
  
  
  
  try {
  
    if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
    let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
    let { text, mentionedJid } = hash
    let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
    userJid: this.user.id,
    quoted : m.quoted && m.quoted.fakeObj
    })
    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id)
    messages.key.id = m.key.id
    messages.pushName = m.pushName
    if (m.isGroup) messages.participant = m.sender
    let msg = {
    ...chatUpdate,
    messages: [proto.WebMessageInfo.fromObject(messages)],
    type: 'append'
    }
    this.ev.emit('messages.upsert', msg)
    }  
    
    
    
   let chats = global.db.data.chats[m.chat]  
   if (chats.antiviewonce) {
   if (/^[.~#/\$,](read)?viewonce/.test(m.text)) return 
   if (m.mtype == 'viewOnceMessageV2') { 
     const msg = m.message.viewOnceMessageV2.message 
     const type = Object.keys(msg)[0] 
     const media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video') 
     let buffer = Buffer.from([]) 
     for await (const chunk of media) { 
       buffer = Buffer.concat([buffer, chunk]) 
     } 
     const cap = '*- En este grupo, no se permite ocultar nada.*' 
     if (/video/.test(type)) { 
       return this.sendFile(m.chat, buffer, 'error.mp4', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m) 
     } else if (/image/.test(type)) { 
       return this.sendFile(m.chat, buffer, 'error.jpg', `${msg[type].caption ? msg[type].caption + '\n\n' + cap : cap}`, m) 
     } 
   }}
   
 if (m.message) { 
 this.logger.info(chalk.bold.white(`\n▣────────────···\n│${botname} ${this.user.id == global.numBot2 ? '' : '(jadibot)'}`),  
 chalk.bold.white('\n│📑TIPO (SMS): ') + chalk.yellowBright(`${m.mtype}`),  
 chalk.bold.white('\n│📊USUARIO: ') + chalk.cyanBright(pushname) + ' ➜', gradient.rainbow(m.sender),  
 m.isGroup ? chalk.bold.white('\n│📤GRUPO: ') + chalk.greenBright(groupName) + ' ➜ ' + gradient.rainbow(m.chat) : chalk.bold.greenBright('\n│📥PRIVADO'),  
 chalk.bold.white('\n️│🏷️ TAGS: ') + chalk.bold.white(`[${this.public ? 'Publico' : 'Privado'}]`),  
 chalk.bold.white('\n│💬MENSAJE: ') + chalk.bold.white(`${msgs(m.text)}`) + chalk.whiteBright(`\n▣────────────···\n`)) 
 }
 
    
    

 
 
  require("./main")(this, m, chatUpdate, store)
  
  
  
  } catch (e) {
  console.log(e)
  }
  
} catch (e) {
console.error(e)
}
}

async function groupsUpdate(groupsUpdate) {
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    if (groupUpdate.size == NaN) continue
    if (groupUpdate.subjectTime) continue
    const chats = global.db.data.chats[id]
    let text = ''
    if (!chats?.autoDetect) continue
    if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
    if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
    if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
    if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
    if (!text) continue
    await this.sendMessage(id, {text, mentions: this.parseMention(text)})
  }
}

async function callUpdate(fuckedcall) {
  const anticall = global.db.data.settings[this.user.jid].antiCall
  if (!anticall) return
  for (let fucker of fuckedcall) {
    if (fucker.isGroup == false) {
        const callmsg = await this.reply(fucker.from, `*${this.user.name} no recibe ${fucker.isVideo ? `videollamadas` : `llamadas` }*\n*@${fucker.from.split('@')[0]} serás bloqueado.*\n*Si accidentalmente llamaste, comunícate con el propietario para que lo desbloquee.*`, false, {mentions: [fucker.from]})
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:SKID CREADOR ✨\nSKID CREADOR ✨\nORG:GITHUB\nTITLE:\nitem1.TELwaid=5218442114446:+521 844 211 4446\nitem1.X-ABLabel:SKID CREADOR ✨\nX-WA-BIZ-DESCRIPTION:[❗] ᴄᴏɴᴛᴀᴄᴛᴀ ᴀ ᴇsᴛᴇ ɴᴜᴍ ᴘᴀʀᴀ ᴄᴏsᴀs ɪᴍᴘᴏʀᴛᴀɴᴛᴇs.\nX-WA-BIZ-NAME:SKID CREADOR ✨nEND:VCARD`
        await this.sendMessage(fucker.from, {contacts: {displayName: 'SKID CREADOR ✨', contacts: [{vcard}]}}, {quoted: callmsg})
        await this.updateBlockStatus(fucker.from, 'block')
      }
    }
  }


async function participantsUpdate({id, participants, action}) {
if (this.init) return
if (global.db.data == null) await loadDatabase()
const chat = global.db.data.chats[id] || {}
const botTt = global.db.data.settings[this?.user?.jid] || {}
let text = ''
switch (action) {
    case 'add':
    case 'remove':
    if(chat.welcome) {
    const groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
    for (const user of participants) {
    let pp = global.noperfil
    try {
    pp = await this.profilePictureUrl(user, 'image')
    } catch (e) {
    } finally {
    const api = await this.getFile(pp)
    const bot = groupMetadata.participants.find((u) => this.decodeJid(u.id) == this.user.jid) || {}
    const isBotAdmin = bot?.admin === 'admin' || false
    text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '*sin descripción :(*') :
    (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
    this.sendFile(id, api.data, 'pp.jpg', text, null, false, { mentions: [user] })
    }
    }
    }
    break
    case 'promote':
    case 'daradmin':
    case 'darpoder':
      text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
    case 'demote':
    case 'quitarpoder':
    case 'quitaradmin':
      if (!text) {
        text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
      }
      text = text.replace('@user', '@' + participants[0].split('@')[0])
      if (chat.detect) {
        this.sendMessage(id, { text, mentions: this.parseMention(text) })
      }
      break
    }
    }
async function deleteUpdate(message) {
let d = new Date(new Date + 3600000)
let date = d.toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
 let time = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
    try {
        const { fromMe, id, participant } = message
        if (fromMe) return 
        let msg = this.serializeM(this.loadMessage(id))
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
        await this.sendMessage(msg.chat, {text: antideleteMessage, mentions: [participant]}, {quoted: msg})
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
    }
    
    
async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "skid bot"
        }
    }
async function pollCmd(message) { 
   for (const { key, update } of message) { 
             if (message.pollUpdates) { 
                 const pollCreation = await this.serializeM(this.loadMessage(key.id)) 
                 if (pollCreation) { 
                     const pollMessage = await getAggregateVotesInPollMessage({ 
                         message: pollCreation.message, 
                         pollUpdates: pollCreation.pollUpdates, 
                     }) 
                     message.pollUpdates[0].vote = pollMessage 
  
                     await console.log(pollMessage) 
                     this.appenTextMessage(message, message.pollUpdates[0].vote || pollMessage.filter((v) => v.voters.length !== 0)[0]?.name, message.message); 
                 } 
             } 
         } 
 }




    
exports.pollCmd = pollCmd
exports.participantsUpdate = participantsUpdate
exports.groupsUpdate = groupsUpdate
exports.callUpdate = callUpdate
exports.handler = handler
exports.deleteUpdate = deleteUpdate


const file = global.__filename(path.basename(__filename), true);
watchFile(file, async () => {
  unwatchFile(file);
  console.log(chalk.redBright('Update \'handler.js\''));
  if (global.reload) console.log(await global.reload()); 
})