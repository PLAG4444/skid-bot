require('../settings.js')
const { cmd, getBuffer, pickRandom } = require('../lib')
const yts = require("youtube-yts")

cmd({
pattern: 'apk',
desc: 'descargar y buscar aplicaciónes de aptoide',
use: 'whatsapp',
category: 'downloaders',
}, 
async (conn, m, { text }) => {
let { search, download } = require('aptoide-scraper')
if (!text) throw '*❗Que vas a buscar*'
try {     
let searchA = await search(text); 
let data5 = await download(searchA[0].id); 
let response = `📲 *Descargador de Aptoide* 📲\n\n📌 *Nombre:* ${data5.name}\n📦 *Package:* ${data5.package}\n🕒 *Última actualización:* ${data5.lastup}\n📥 *Tamaño:* ${data5.size}` 
await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m}); 
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) { 
return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*'}, {quoted: m}); 
} 
await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m}); 
} catch { 
throw `*[❗] Error, no se encontrarón resultados para su búsqueda.*`; 
}    
})

cmd({
pattern: 'play',
desc: 'Descarga de videos de YouTube',
use: 'tsb',
category: 'downloaders',
}, 
async (conn, m, { text, args }) => { // ?
let { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
   let { search } = require('../lib')
   let enviando
   let _limit1 = 100
   let _limit2 = 400
   if (!text) throw `*❗ Ingresa algo para buscar -_- *\n*Ejemplo: ${prefix + command} tsb combos*`
   let yt_play = await search(args.join(' '))
   let text1 = `*——⌈📽️ YOUTUBE PLAY 📽️⌋——*\n📌 *Titulo*: _${yt_play[0].title}_\n📆 *Publicado*: ${yt_play[0].ago}\n*🔗 Link*: ${yt_play[0].url}`
   conn.sendMessage(m.chat, {image: {url: yt_play[0].thumbnail}, caption: text1 }, {quoted: m})
   if (enviando) return
   enviando = true
   try {
   let qu = '360'
   let q = qu + 'p'
   let v = yt_play[0].url
   let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
   let _tetme = await yt.title
   let size_api = await yt.size
   let bochilDownload = await yt.video[q].download()
   let sex = await getBuffer(bochilDownload)
   let fileSizeInBytes = sex.byteLength; 
   let fileSizeInKB = fileSizeInBytes / 1024; 
   let fileSizeInMB = fileSizeInKB / 1024; 
   let size = fileSizeInMB.toFixed(2);    
    
    if (size >= _limit2) {  
    await conn.sendMessage(m.chat, {text: `*❗ el archivo es demasiado pesado*\nDescargue en: ${bochilDownload}`}, {quoted: m});
    enviando = false  
    return    
    }    
      
    if (size >= _limit1 && size <= _limit2) {  
    await conn.sendMessage(m.chat, {document: sex, caption: `*✅ Aqui tienes tu video*`, mimetype: 'video/mp4', fileName: _tetme + `.mp4`}, {quoted: m})
    enviando = false 
    return    
    } else {
    await conn.sendMessage(m.chat, {video: sex, caption: `*✅ Aqui tienes tu video*`, mimetype: 'video/mp4', fileName: _tetme + `.mp4`,  contextInfo: { externalAdReply: { 
     title: _tetme, 
     body: `00:00 ━━━━⬤─────── 04:05`, 
     thumbnailUrl: yt_play[0].thumbnail,  
     mediaType: 1, 
     showAdAttribution: true, 
     renderLargerThumbnail: false
     }}} , { quoted: m })      
    enviando = false            
    return    
    }
      
   } catch (error) {
     enviando = false
     console.log(error)
     throw `*[❗] Error, no fue posible descargar el video.*`
     throw new Error(error)
  }
})
cmd({
pattern: "tiktok",
alias: ["tiktokvideo"],
desc: "descargar videos de tiktok",
use: ">link<",
category: "downloaders"
}, 
async (conn, m, { text }) => {
    if (!text) return m.reply(`*Ejemplo de uso*\n${global.prefix}${cmd.use}`)
    if (!text.includes('tiktok')) return m.reply(`*link invalido!*`)
    m.reply(mess.wait)
    require('../lib').Tiktok(m.text).then( data => {
    conn.sendMessage(m.chat, { video: { url: data.nowm }}, { quoted: m })})
})


cmd({
pattern: "tiktokmp3",
alias: ["tiktokaudio", "tiktokaudios"],
desc: "descargar audios de tiktok",
use: "<link>",
category: "downloaders",
}, 
async (conn, m, { text }) => {
    if (!text) return m.reply(`*Ejemplo de uso*\n${global.prefix}${cmd.use}`)
    if (!q.includes('tiktok')) return m.reply(`*link invalido!*`)
    m.reply(mess.wait)
    require('../lib').Tiktok(m.text).then( data => {
    conn.sendMessage(m.chat, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
    })
    })


cmd({
pattern: "play2",
desc: "descarga audios de YouTube",
category: "downloaders",
use: "tsb",
},
async (conn, m, { text, args }) => {
 let limit_a1 = 50
 let limit_a2 = 400
 if (!text) throw `*❗No hay cancion o texto para buscar*\n*ejemplo: ${prefix + command} everyone wants to rule the world*`
 try { 
 let { search } = require('../lib')
 let { youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
 let yt_play = await search(args.join(' '))
 let text1 = `*——⌈🔊 YOUTUBE PLAY 🔊⌋——*\n📌 *Titulo*: _${yt_play[0].title}_\n📆 *Publicado*: ${yt_play[0].ago}\n*🔗 Link*: ${yt_play[0].url}`
 conn.sendMessage(m.chat, {image: {url: yt_play[0].thumbnail}, caption: text1 }, {quoted: m})
 let q = '128kbps'
 let v = yt_play[0].url
 let yt = await youtubedl(v).catch(async (_) => await youtubedlv2(v))
 let _tetme = await yt.title
 let size_api = await yt.size
 let bochilDownload = await yt.audio[q].download()
 let sex = await getBuffer(bochilDownload)
 let fileSizeInBytes = sex.byteLength; 
 let fileSizeInKB = fileSizeInBytes / 1024; 
 let fileSizeInMB = fileSizeInKB / 1024; 
 let size = fileSizeInMB.toFixed(2);    
     if (size >= limit_a2) {   
     await conn.sendMessage(m.chat, {text: `*[ ✔ ] Descargue su audio en ${bochilDownload}*`}, {quoted: m}); 
     return     
     }      
     if (size >= limit_a1 && size <= limit_a2) {   
     await conn.sendMessage(m.chat, {document: sex, mimetype: 'audio/mpeg', fileName: _tetme+ `.mp3`}, {quoted: m});    
     return 
     } else { 
     await conn.sendMessage(m.chat, {audio: sex, mimetype: 'audio/mpeg', fileName: _tetme + `.mp3`, contextInfo: { externalAdReply: { 
     title: _tetme, 
     body: "", 
     thumbnailUrl: yt_play[0].thumbnail,  
     mediaType: 1, 
     showAdAttribution: true, 
     renderLargerThumbnail: true 
     }}} , { quoted: m })
     return     
     }       
 } catch (error) {
 throw `*❗ Hubo un error al descargar música*\n` + error
 }
 })
cmd({
pattern: "yts",
alias: ["ytsearch", "yt"],
desc: "buscar videos de youtube",
category: "downloaders",
use: "shitpost",
},
async (conn, m, { text, body, args }) => {
    if (!text) throw `Ejemplo: ${prefix + comand} historia wa anime`;   
     const search = await yts(text);   
     let teks = 'Búsqueda en YouTube\n\nResultados de ' + text + '\n\n';   
     let no = 1;   
     let themeemoji = pickRandom(["🌐", "🌟", "✨", "📍", "🚩"])
     for (let i of search.all) {   
       teks += `${themeemoji} No: ${no++}\n${themeemoji} Tipo: ${i.type}\n${themeemoji} ID del Video: ${i.videoId}\n${themeemoji} Título: ${i.title}\n${themeemoji} Vistas: ${i.views}\n${themeemoji} Duración: ${i.timestamp}\n${themeemoji} Subido: ${i.ago}\n${themeemoji} URL: ${i.url}\n\n━━━━━━━━━━━━\n\n`;   
     }   
     await conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: global.fkontak });   

})