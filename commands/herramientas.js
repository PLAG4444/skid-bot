const { cmd, getRandom, fetchJson, TelegraPh } = require('../lib')
const mimetype = require("mime-types")
require('../settings.js')
const fs = require("fs")
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");


cmd({
pattern: "toimg",
alias: ["tojpg", "topng", "jpg"],
desc: "convierte stickers en imagenes",
category: "herramientas",
},
async (conn, m, { text, args }) => {
const mime = (m.quoted).mimetype || '' 
if (!m.quoted) m.reply('*uhh... puedes responder a un sticker ಠ⁠_⁠ಠ*')
  if (!/webp/.test(mime)) m.reply('*uhh... puedes responder a un sticker ಠ⁠_⁠ಠ*')
  let media = await conn.downloadAndSaveMediaMessage(m.quoted)
  let ran = await getRandom('sk.png')
  exec(`ffmpeg -i ${media} ${ran}`, (err) => {
  fs.unlinkSync(media)
  if (err) m.reply(err)
  let buffer = fs.readFileSync(ran)
  conn.sendMessage(m.chat, { image: buffer }, { quoted: m})
  fs.unlinkSync(ran)
  })
})
cmd({
pattern: "s",
alias: ["crearsticker", "sticker", "tosticker"],
desc: "simplemente un creador de stickers",
category: "stickers",
},
async (conn, m, { args }) => {
const quoted = m.quoted ? m.quoted : m 
const mime = (quoted.msg || quoted).mimetype || ''  
          if (/image/.test(mime)) {  
          m.reply(global.mess.wait)  
          media = await quoted.download()  
          let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })  
          await fs.unlinkSync(encmedia)  
        } else if (/video/.test(mime)) {  
          if ((m.quoted).seconds > 40) return m.reply('¡Máximo 40 segundos!')  
          media = await quoted.download()  
          let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: packname, author: author })  
          await new Promise((resolve) => setTimeout(resolve, 2000));   
          await fs.unlinkSync(encmedia)  
      } else {  
          m.reply(`*Envía una imagen/video con ${prefix + command}*\n_*(La duración del video solo puede ser de 10 segundos)*_`)  
          }  
})
cmd({
        pattern: "stickerround",
        alias: ["roundstic","roundsticker"],
        desc: "crea un sticker en forma de redonda.",
        category: "sticker",
filename: __filename,
        use: '<responde a una imagen/video.>'
    },
    async(conn, m, text) => {
        if (!m.quoted) return m.reply('responde a una imagen qwq')
        let mime = m.quoted.mtype
        pack = packname
        author = author
       if (mime =="imageMessage" || mime =="stickerMessage") {
            let media = await m.quoted.download()
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.ROUNDED ,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(m.chat, {sticker: buffer}, {quoted: m });
        } else return m.reply(`${cmd.use}`)})
cmd({
        pattern: "stickercrop",
        alias: ["scrop","cropsticker"],
        desc: "crea un sticker cortado.",
        category: "sticker",
filename: __filename,
        use: '<responde a una imagen/video.>'
    },
    async(conn, m, text) => {
        if (!m.quoted) return m.reply('responde a una imagen qwq')
        let mime = m.quoted.mtype
        pack = packname
        author = author
       if (mime =="imageMessage" || mime =="stickerMessage") {
            let media = await m.quoted.download()
            let sticker = new Sticker(media, {
                pack: pack, // The pack name
                author: author, // The author name
                type: StickerTypes.CIRCLE ,
                categories: ["🤩", "🎉"], // The sticker category
                id: "12345", // The sticker id
                quality: 75, // The quality of the output file
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(m.chat, {sticker: buffer}, {quoted: m });
        } else return m.reply(`${cmd.use}`)})
cmd({
pattern: "ia",
desc: "habla con chatgpt :v",
category: "herramientas",
},
async (conn, m, { text }) => {
if (!text) return m.reply(`*ingresa un texto para hablar con chatgpt ♡*`)
          try {     
         let tioress = await fetchJson(`https://api.lolhuman.xyz/api/openai-turbo?apikey=${lolkeysapi}&text=${text}`) 
         let hasill = await tioress.json() 
         m.reply(`${hasill.result}`.trim())    
         } catch {
         let mygpt = await fetch(`https://vihangayt.me/tools/chatgpt4?q=${text}`)
         let _result = await mygpt.json()
         m.reply(`${_result.data}`)
        }
})
cmd({
pattern: "tourl",
desc: "convierte imágenes a links",
category: 'herramientas',
},
async (conn, m, { text, args }) => {
const mime = (m.quoted).mimetype || '' 
if (/image/.test(mime)) {
   _miMedia = await conn.downloadAndSaveMediaMessage(m.quoted)
   _upload = await TelegraPh(_miMedia)
   m.reply(mess.wait)
   sleep(1000)
   m.reply(_upload)
   } else { 
   m.reply(`*❗ responde a una imagen *`)
   }
})
cmd({
pattern: "toanime",
desc: "convierte imágenes a anime",
category: 'herramientas',
},
async (conn, m, { text, args }) => {
const mime = (m.quoted).mimetype || '' 
if (/image/.test(mime)) {
   let _miMedia = await conn.downloadAndSaveMediaMessage(m.quoted)
   let _upload = await TelegraPh(_miMedia)
   try {
   let anime = await `https://api.lolhuman.xyz/api/imagetoanime?apikey=${lolkeysapi}&img=${_upload}`
   await m.reply(mess.wait)
   await conn.sendFile(m.chat, anime, 'error.jpg', null, m) 
   } catch (e) {
   m.reply('❗ *Hubo un error*\n*Responde solo a imagenes que tengas caras visibles* (⁠-⁠_⁠-⁠;⁠)')
   }
   } else { 
   m.reply(`*❗ responde a una imagen unu*`)
   }
})

cmd({
pattern: "vergrupo",
desc: "inspeciona grupos de WhatsApp",
category: 'herramientas',
},
async (conn, m, { text, body, args}) => {
let linkRegex = args.join(" ")
    let textt = ``
    let coded = linkRegex.split("https://chat.whatsapp.com/")[1]
    if (!coded) return m.reply("Link Invalid")
    conn.query({
    tag: "iq",
    attrs: {
    type: "get",
    xmlns: "w:g2",
    to: "@g.us"
    },
    content: [{ tag: "invite", attrs: { code: coded } }]
    }).then(async(res) => { 
    textt = `「 inspector de grupos」
▸ Nombre del grupo: ${res.content[0].attrs.subject ? res.content[0].attrs.subject : "undefined"}

▸ Descripción: ${res.content[0].attrs.s_t ? moment(res.content[0].attrs.s_t *1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Creador del grupo: ${res.content[0].attrs.creator ? "@" + res.content[0].attrs.creator.split("@")[0] : "undefined"}
▸ Grupo creado: ${res.content[0].attrs.creation ? moment(res.content[0].attrs.creation * 1000).tz("Asia/Jakarta").format("DD-MM-YYYY, HH:mm:ss") : "undefined"}
▸ Miembros: ${res.content[0].attrs.size ? res.content[0].attrs.size : "undefined"} Miembros

▸ ID: ${res.content[0].attrs.id ? res.content[0].attrs.id : "undefined"}

`
    try {
    pp = await conn.profilePictureUrl(res.content[0].attrs.id + "@g.us", "image")
    } catch {
    pp = "https://tse2.mm.bing.net/th?id=OIP.n1C1oxOvYLLyDIavrBFoNQHaHa&pid=Api&P=0&w=153&h=153"
    }
    conn.sendMessage(m.chat, { text: textt }, { quoted: m })
    })
})
cmd({
pattern: "tomp3",
desc: "convertir videos a mp3",
category: "herramientas",
},
async (conn, m, { body, args, text }) => {
const quoted = m.quoted ? m.quoted : m 
const mime = (m.quoted).mimetype || '' 
if (!/video/.test(mime) && !/audio/.test(mime)) m.reply(`*❗ Etiqueta un audio con ${global.prefix + cmd.pattern}*`)
                  if (!quoted) m.reply(`*❗ Etiqueta un video con ${global.prefix + cmd.pattern}*`)
                  let { toAudio } = require('../lib')
                  let media  = await conn.downloadMediaMessage(quoted)
                  let audio = await toAudio(media, 'mp4')
                  await conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg', contextInfo:{  externalAdReply: { showAdAttribution: true,
                  mediaType:  1,
                  mediaUrl: 'https://github.com/Skidy89',
                  title: global.botname,
                  sourceUrl: `https://github.com/Skidy89`, 
                  thumbnail: global.success
                  }}}, { quoted: m })
})

cmd({
pattern: "lyrics",
alias: ["findlyrics", "findLyrics"],
desc: "buscar letras de canciones",
use: "everyone wants to rule the world",
category: "herramientas",
},
async (conn, m, { text } => {
 if (!text) throw `*⚠️ que música quieres ${conn.getName(m.sender)}?*\n*ejempo: ${prefix + command} say with me*`
 const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
 const resu = await lyricsv2(text).catch(async _ => await lyrics(text))
 m.reply(`*Titulo: ${resu.title}*\n*Autor: ${resu.author}*\n*link: ${resu.link}*\n*lyrics: ${resu.lyrics}*`)
})

cmd({
pattern: "imagen",
alias: ["image", "google"],
desc: "buscar letras de canciones",
use: "gawr gura",
category: "herramientas",
},
async (conn, m, { text } => {
 let { googleImage } = require('@bochilteam/scraper')
 let res = await googleImage(text)
 image = res[Math.floor(Math.random() * res.length)];
 ulr = image
 conn.sendMessage(m.chat, { image: { url: ulr }, caption: global.botname }, { quoted: global.fkontak })
})




let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })
