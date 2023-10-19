require('../settings.js')
const { cmd, getBuffer, pickRandom } = require('../lib')
const yts = require("youtube-yts")
const fs = require('fs')
const axios = require("axios")
cmd({
pattern: 'apk',
desc: 'descargar y buscar aplicaciónes de aptoide',
use: 'whatsapp',
category: 'downloaders',
}, 
async (conn, m, { text }) => {
let { search, download } = require('aptoide-scraper')
if (!text) m.reply('*❗Que vas a buscar*')
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
m.reply(`*[❗] Error, no se encontrarón resultados para su búsqueda.*`)
}    
})
cmd({
pattern: "instagramdl",
category: "downloaders",
desc: "descarga videos de Instagram",
}, async (conn, m, { args }) => {
if (!args[0]) return m.reply(`*🚩 Ingresa un enlace de Instagram*\nEjemplo:\n${global.prefix}instagramdl https://www.instagram.com/reel/Cc0NuYBg8CR/?utm_source=ig_web_copy_link`)
m.reply(global.mess.wait)
try {
const img = await instagramDl(args[0])
for (let i = 0; i < img.length; i++) { 
const bufferInfo = await getBuffer(img[i].download_link); 
if (bufferInfo.detectedType.mime.startsWith('image/')) { 
await conn.sendMessage(m.chat, {image: {url: img[i].download_link}}, {quoted: m}); 
} else if (bufferInfo.detectedType.mime.startsWith('video/')) { 
await conn.sendMessage(m.chat, {video: {url: img[i].download_link }}, {quoted: m}); 
}}
} catch (e) {
m.reply(e)
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
   if (!text) m.reply(`*❗ Ingresa algo para buscar -_- *\n*Ejemplo: ${prefix + command} tsb combos*`)
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
     m.reply(`*[❗] Error, no fue posible descargar el video.*`)
     m.reply(new Error(error))
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
 if (!text) m.reply(`*❗No hay cancion o texto para buscar*\n*ejemplo: ${prefix + command} everyone wants to rule the world*`)
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
 m.reply(`*❗ Hubo un error al descargar música*\n` + error)
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
    if (!text) m.reply(`Ejemplo: ${prefix + comand} historia wa anime`)
     const search = await yts(text);   
     let teks = 'Búsqueda en YouTube\n\nResultados de ' + text + '\n\n';   
     let no = 1;   
     let themeemoji = pickRandom(["🌐", "🌟", "✨", "📍", "🚩"])
     for (let i of search.all) {   
       teks += `${themeemoji} No: ${no++}\n${themeemoji} Tipo: ${i.type}\n${themeemoji} ID del Video: ${i.videoId}\n${themeemoji} Título: ${i.title}\n${themeemoji} Vistas: ${i.views}\n${themeemoji} Duración: ${i.timestamp}\n${themeemoji} Subido: ${i.ago}\n${themeemoji} URL: ${i.url}\n\n━━━━━━━━━━━━\n\n`;   
     }   
     await conn.sendMessage(m.chat, { image: { url: search.all[0].thumbnail }, caption: teks }, { quoted: global.fkontak });   

})
cmd({
pattern: "twitter",
desc: "descarga videos de Twitter",
category: "downloaders",
},
async (conn, m, { text, args }) => {
if (!text) m.reply(`*[❗] Ingrese un enlace de X (twitter), ejemplo: ${global.prefix}twitter https://twitter.com/auronplay/status/1586487664274206720?s=20&t=3snvkvwGUIez5iWYQAehpw`)
 if (enviando) return; 
     enviando = true; 
 try { 
    await conn.sendMessage(m.chat, {text: global.wait}, {quoted: m});  
    const res = await TwitterDL(text); 
  if (res?.result.type == 'video') { 
      const caption = res?.result.caption ? res.result.caption : '*Aquí tiene su imagen*'; 
      for (let i = 0; i < res.result.media.length; i++) { 
      await conn.sendMessage(m.chat, {video: {url: res.result.media[i].result[0].url}, caption: caption}, {quoted: m}); 
      }; 
      enviando = false; 
      return; 
  } else if (res?.result.type == 'photo') { 
      const caption = res?.result.caption ? res.result.caption : '*Aquí tiene su imagen*'; 
      for (let i = 0; i < res.result.media.length; i++) { 
      await conn.sendMessage(m.chat, {image: {url: res.result.media[i].url}, caption: caption}, {quoted: m}); 
      }; 
      enviando = false; 
      return; 
   } 
 } catch { 
     enviando = false; 
     m.reply("error")
     return; 
   } 
 })

const _twitterapi = (id) => `https://info.tweeload.site/status/${id}.json`; 
 const getAuthorization = async () => { 
     const { data } = await axios.default.get("https://pastebin.com/raw/SnCfd4ru"); 
     return data; 
 }; 
 const TwitterDL = async (url) => { 
   return new Promise(async (resolve, reject) => { 
     const id = url.match(/\/([\d]+)/); 
     if (!id) 
       return resolve({ 
         status: "error", 
         message: 
           "There was an error getting twitter id. Make sure your twitter url is correct!", 
       }); 
       const response = await axios.default(_twitterapi(id[1]), { 
         method: "GET", 
         headers: { 
           Authorization: await getAuthorization(), 
           "user-agent": 
             "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36", 
         }, 
       }); 
  
       if (response.data.code !== 200) { 
         return resolve({ 
           status: "error", 
           message: "An error occurred while sending the request.", 
         }); 
       } 
  
       const author = { 
         id: response.data.tweet.author.id, 
         name: response.data.tweet.author.name, 
         username: response.data.tweet.author.screen_name, 
         avatar_url: response.data.tweet.author.avatar_url, 
         banner_url: response.data.tweet.author.banner_url, 
       }; 
  
       let media = []; 
       let type; 
  
       if (response.data.tweet?.media?.videos) { 
         type = "video"; 
         response.data.tweet.media.videos.forEach((v) => { 
           const resultVideo = []; 
           v.video_urls.forEach((z) => { 
             resultVideo.push({ 
               bitrate: z.bitrate, 
               content_type: z.content_type, 
               resolution: z.url.match(/([\d ]{2,5}[x][\d ]{2,5})/)[0], 
               url: z.url, 
             }); 
           }); 
           if (resultVideo.length !== 0) { 
             media.push({ 
               type: v.type, 
               duration: v.duration, 
               thumbnail_url: v.thumbnail_url, 
               result: v.type === "video" ? resultVideo : v.url, 
             }); 
           } 
         }); 
       } else { 
         type = "photo"; 
         response.data.tweet.media.photos.forEach((v) => { 
           media.push(v); 
         }); 
       } 
  
       resolve({ 
         status: "success", 
         result: { 
           id: response.data.tweet.id, 
           caption: response.data.tweet.text, 
           created_at: response.data.tweet.created_at, 
           created_timestamp: response.data.tweet.created_timestamp, 
           replies: response.data.tweet.replies, 
           retweets: response.data.tweet.retweets, 
           likes: response.data.tweet.likes, 
           url: response.data.tweet.url, 
           possibly_sensitive: response.data.tweet.possibly_sensitive, 
           author, 
           type, 
           media: media.length !== 0 ? media : null, 
         }, 
       }); 
   }); 
 }
 
let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })