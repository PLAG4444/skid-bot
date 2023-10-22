const { cmd, getRandom, fetchJson, TelegraPh, getBuffer } = require('../lib')
const mimetype = require("mime-types")
const fetch = require("node-fetch")
require('../settings.js')
const fs = require("fs")
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter")
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require('child_process')
const JavaScriptObfuscator = require('javascript-obfuscator')

cmd({
pattern: "dalle",
category: "herramientas",
},
async (conn, m, { text, command }) => {
if (!text) throw `*[❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝚄𝙽 𝚃𝙴𝚇𝚃𝙾 𝙿𝙰𝚁𝙰 𝙲𝚁𝙴𝙰𝚁 𝚄𝙽𝙰 𝙸𝙼𝙰𝙶𝙴𝙽 𝚈 𝙰𝚂𝙸 𝚄𝚂𝙰𝚁 𝙻𝙰 𝙵𝚄𝙽𝙲𝙸𝙾𝙽 𝙳𝙴 𝙳𝙰𝙻𝙻-𝙴*\n\n*—◉ 𝙴𝙹𝙴𝙼𝙿𝙻𝙾𝚂 𝙳𝙴 𝙿𝙴𝚃𝙸𝙲𝙸𝙾𝙽𝙴𝚂*\n*${command} gatitos llorando*\n* ${command} hatsune miku beso*`;
    await conn.sendMessage(m.chat, {text: '*[❗] Realizando imagen, aguarde un momento.*'}, {quoted: m});
  try {
    const tiores1 = await fetch(`https://vihangayt.me/tools/imagine?q=${text}`);
    const json1 = await tiores1.json();
    await conn.sendMessage(m.chat, {image: {url: json1.data}}, {quoted: m});
  } catch {  
      console.log('[❗] Error en la api numero 1 de dall-e.');  
  try {
    const tiores2 = await conn.getFile(`https://vihangayt.me/tools/midjourney?q=${text}`);
    await conn.sendMessage(m.chat, {image: {url: tiores2.data}}, {quoted: m});
  } catch {
      console.log('[❗] Error en la api numero 2 de dall-e.');
  try {
    const tiores3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${text}`);
    const json3 = await tiores3.json();
    await conn.sendMessage(m.chat, {image: {url: json3.data[0].images[0].url}}, {quoted: m});
  } catch {
      console.log('[❗] Error en la api numero 3 de dall-e.');
  try {
    const tiores4 = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`);
    await conn.sendMessage(m.chat, {image: {url: tiores4.data}}, {quoted: m});
  } catch {
    console.log('[❗] Error, ninguna api funcional.');
    throw `*[❗] Error, no se obtuvierón resultados.*`;
  }}
 }}
})
cmd({
pattern: "whatmusic",
category: "herramientas",
},
async (conn, m, { mime }) => {
let acrcloud = require('acrcloud')
         const acr = new acrcloud({ 
   host: 'identify-eu-west-1.acrcloud.com', 
   access_key: 'c33c767d683f78bd17d4bd4991955d81', 
   access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu', 
 }); 
  
   
   if (/audio|video/.test(mime)) {
     if ((quoted.msg || quoted).seconds > 20) return m.reply('El archivo que carga es demasiado grande, le sugerimos que corte el archivo grande a un archivo más pequeño, 10-20 segundos Los datos de audio son suficientes para identificar'); 
     let media = await quoted.download(); 
     let ext = mime.split('/')[1]; 
     fs.writeFileSync(`../temp/${m.sender}.${ext}`, media); 
     let  res = await acr.identify(fs.readFileSync(`../temp/${m.sender}.${ext}`)); 
     let {code, msg} = res.status; 
     if (code !== 0) throw msg; 
     let {title, artists, album, genres, release_date} = res.metadata.music[0]; 
     let txt = ` 
 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾𝚂 𝙳𝙴 𝙻𝙰 𝙱𝚄𝚂𝚀𝚄𝙴𝙳𝙰 
  
 • 📌 𝚃𝙸𝚃𝚄𝙻𝙾: ${title} 
 • 👨‍🎤 𝙰𝚁𝚃𝙸𝚂𝚃𝙰: ${artists !== undefined ? artists.map((v) => v.name).join(', ') : 'No encontrado'} 
 • 💾 𝙰𝙻𝙱𝚄𝙼: ${album.name || 'No encontrado'} 
 • 🌐 𝙶𝙴𝙽𝙴𝚁𝙾: ${genres !== undefined ? genres.map((v) => v.name).join(', ') : 'No encontrado'} 
 • 📆 𝙵𝙴𝙲𝙷𝙰 𝙳𝙴 𝙻𝙰𝙽𝚉𝙰𝙼𝙸𝙴𝙽𝚃𝙾: ${release_date || 'No encontrado'} 
 `.trim(); 
     m.reply(txt); 
   } else { 
   m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙰 𝙰 𝚄𝙽 𝙰𝚄𝙳𝙸𝙾*')}
 })

const Effects = [
  'bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'squirrel'
]

Effects.forEach(effect => {
  cmd({
    pattern: effect,
    desc: `Aplica efecto de audio ${effect}`,
    category: 'Efectos de Audio',
    use: 'Responde a un audio con este comando',
  },
  async (conn, m, { mime, command }) => {
    try {
      let set
      if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
      if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
      if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
      if (/earrape/.test(command)) set = '-af volume=12'
      if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
      if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
      if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
      if (/reverse/.test(command)) set = '-filter_complex "areverse"'
      if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
      if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
      if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
      if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'

      if (/audio/.test(mime)) {
        let media = await conn.downloadAndSaveMediaMessage(m.quoted)
        let ran = getRandom('.mp3')
        exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
          fs.unlinkSync(media)
          if (err) return m.reply(err)
          let buff = fs.readFileSync(ran)
          conn.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m })
          fs.unlinkSync(ran)
        })
      } else {
        m.reply(`Responde a un audio con este comando: *${prefix + effect}*`)
      }
    } catch (e) {
      m.reply(`Hubo un error... ${e}`)
    }
  })
})



const styles = [
  'blackpink', 'neon', 'greenneon', 'advanceglow', 'futureneon', 'sandwriting', 'sandsummer', 'sandengraved', 
  'metaldark', 'neonlight', 'holographic', 'text1917', 'minion', 'deluxesilver', 'newyearcard', 'bloodfrosted',
  'halloween', 'jokerlogo', 'fireworksparkle', 'natureleaves', 'bokeh', 'toxic', 'strawberry', 'box3d',
  'roadwarning', 'breakwall', 'icecold', 'luxury', 'cloud', 'summersand', 'horrorblood', 'thunder', 'wetglass', 'multicolor3d', 'watercolor', 'luxurygold', 'galaxywallpaper', 'lighttext', 'beautifulflower',
  'puppycute', 'royaltext', 'heartshaped', 'birthdaycake', 'galaxystyle', 'hologram3d', 'greenneon',
  'glossychrome', 'greenbush', 'metallogo', 'noeltext', 'glittergold', 'textcake', 'starsnight', 'wooden3d',
  'textbyname', 'writegalacy', 'galaxybat', 'snow3d', 'birthdayday', 'goldplaybutton', 'silverplaybutton', 'freefire',
  'shadow', 'cup', 'cup1', 'romance', 'smoke', 'burnpaper', 'lovemessage', 'undergrass', 'love', 'coffe',
  'woodheart', 'woodenboard', 'summer3d', 'wolfmetal', 'nature3d', 'underwater', 'golderrose', 'summernature',
  'letterleaves', 'glowingneon', 'fallleaves', 'flamming', 'harrypotter', 'carvedwood'
]

styles.forEach(style => {
  cmd({
    pattern: style,
    desc: `Crea un logo de estilo ${style}`,
    category: 'LogosV2',
    use: 'Skid bot',
  },
  async (conn, m, { args }) => {
    if (args.length == 0) return m.reply(`Ejemplo de uso: ${global.prefix + style} Skid bot`)
    conn.sendMessage(m.chat, { image: { url: `https://api.lolhuman.xyz/api/textprome/${style}?apikey=${lolkeysapi}&text=${args.join(' ')}` }, caption: "aqui tienes" })
  })
})

cmd({
pattern: "lewd",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/lewd?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "gasm",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/gasm?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "anal",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/anal?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { video: buffer, caption: "*Aqui tienes*", gifPlayBack: true }, { quoted: global.fkontak })
})
cmd({
pattern: "holo",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/holo?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "tetas",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/tits?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "kiss",
category: "rpg",
group: true,
},
async (conn, m) => {
if (!m.mentionedJid[0]) return m.reply("*A quien vas a besar qwq*")
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/kiss,apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { video: buffer, caption: `@${m.sender.split("@")[0]} Beso a ${m.mentionedJid[0].split("@")[0]}`, gifPlayBack: true, mentions: [m.sender, m.mentionedJid] }, { quoted: global.fkontak })
})
cmd({
pattern: "erok",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/erok?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "solog",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/solog?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "feet",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/feetg?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})
cmd({
pattern: "pussy",
category: "nsfw",
group: true,
nsfw: true,
},
async (conn, m) => {
const buffer = await getBuffer(`https://api.lolhuman.xyz/api/random2/pussy?apikey=${lolkeysapi}`)
conn.sendMessage(m.chat, { image: buffer, caption: "*Aqui tienes*" }, { quoted: global.fkontak })
})

    		
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
          await new Promise((resolve) => setTimeout(resolve, 2000))   
          await fs.unlinkSync(encmedia)  
      } else {  
          m.reply(`*Envía una imagen/video con ${prefix + cmd.pattern}*\n_*(La duración del video solo puede ser de 10 segundos)*_`)  
          }  
})
cmd({
        pattern: "stickerround",
        alias: ["roundstic","roundsticker", "sround"],
        desc: "crea un sticker en forma de redonda.",
        category: "stickers",
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
            })
            const buffer = await sticker.toBuffer()
            return conn.sendMessage(m.chat, {sticker: buffer}, {quoted: m })
        } else return m.reply(`${cmd.use}`)})
cmd({
pattern: "acortar",
category: "herramientas",
use: "Github.com/Skidy89/skid-bot",
},
async (conn, m, { text }) => {
if (!text) return m.reply(`*[❗] INFO [❗]*\n*Ingresa un link para acortar!!*`)
  let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text()  
  if (!shortUrl1) return m.reply(`*[❗] ERROR [❗]*`)
  let done = `*LINK ACORTADO CORRECTAMENTE*\n*link: ${text}*\n*Link Acortado: ${shortUrl1}*`
  m.reply(done)
})
cmd({
        pattern: "stickercrop",
        alias: ["scrop","cropsticker"],
        desc: "crea un sticker cortado.",
        category: "stickers",
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
            })
            const buffer = await sticker.toBuffer()
            return conn.sendMessage(m.chat, {sticker: buffer}, {quoted: m })
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
   m.reply('❗ *Hubo un error*\n*Responde solo a imagenes que tengas caras visibles* (⁠-⁠_⁠-⁠⁠)')
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
async (conn, m, { text }) => {
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
async (conn, m, { text }) => {
 let { googleImage } = require('@bochilteam/scraper')
 let res = await googleImage(text)
 image = res[Math.floor(Math.random() * res.length)]
 ulr = image
 conn.sendMessage(m.chat, { image: { url: ulr }, caption: global.botname }, { quoted: global.fkontak })
})
cmd({
pattern: "qc",
category: "stickers",
},
async (conn, m, { args, text }) => {
if (!args[0] && !m.quoted) return m.reply('pon un texto')
    let userPfp
    if (m.quoted) {
      try {
        userPfp = await conn.profilePictureUrl(m.quoted.sender, "image")
      } catch (e) {
        userPfp = noperfil
      }
    } else {
      try {
        userPfp = await conn.profilePictureUrl(m.sender, "image")
      } catch (e) {
        userPfp = noperfil
      }
    }
    const waUserName = m.pushName
    const quoteText = m.quoted ? m.quoted.body : args.join(" ")
    const quoteJson = {
      type: "quote",
      format: "png",
      backgroundColor: "#FFFFFF",
      width: 700,
      height: 580,
      scale: 2,
      messages: [
        {
          entities: [],
          avatar: true,
          from: {
            id: 1,
            name: waUserName,
            photo: {
              url: userPfp,
            },
          },
          text: quoteText,
          replyMessage: {},
        },
      ],
    }
    try {
      const quoteResponse = await axios.post("https://bot.lyo.su/quote/generate", quoteJson, {
        headers: { "Content-Type": "application/json" },
      })
      const buffer = Buffer.from(quoteResponse.data.result.image, "base64")
      conn.sendImageAsSticker(m.chat, buffer, m, {
        packname: packname,
        author: author,
      })
    } catch (error) {
      console.error(error)
    }
})

cmd({
pattern: "removebg",
category: "herramientas",
},
async (conn, { mime }) => {
if (/image/.test(mime)) {
   const miMedia = await conn.downloadAndSaveMediaMessage(m.quoted)
   const upload = await TelegraPh(miMedia)
   let sremovebg = global.API(`https://api.lolhuman.xyz/api/removebg?apikey=${lolkeysapi}&img=${upload}`)
   conn.sendFile(m.chat, sremovebg, 'error.png', null, this)
   } else { 
   this.reply(`*❗ responde a una imagen *`)
   }
})

cmd({
pattern: "ofuscar",
category: "herramientas",
},
async (conn, m, { text }) => {
if (!text) return m.reply("*Ingresa el codigo que vas a ofuscar.*"); 
         function obfuscateCode(code) { 
        return JavaScriptObfuscator.obfuscate(code, { 
        compact: false, 
          controlFlowFlattening: true, 
        deadCodeInjection: true, 
        simplify: true, 
          numbersToExpressions: true, 
        }).getObfuscatedCode(); 
       } 
      let obfuscatedCode = await obfuscateCode(text); 
       conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m});
})

/*case 'toqr':{
  if (!text) return m.reply('*por favor manda un link para convertirlo en qr*')

   let qruwu = await qrcode.toDataURL(q, { scale: 35 })
   let data = new Buffer.from(qruwu.replace('data:image/png;base64,', ''), 'base64')
   let buff = getRandom('.jpg')
   await fs.writeFileSync('./'+buff, data)
   let medi = fs.readFileSync('./' + buff)
  await conn.sendMessage(m.chat, { image: medi, caption: `*aqui tienes tu qr*\n*${botname}*`}, { quoted: m })
   setTimeout(() => { fs.unlinkSync(buff) }, 10000)
  }
  break		
  
  
     
   case 'wallpaper':
   if (!text) throw `*❗ Ejemplo: ${prefix + command} gawr gura*` 
   let { wallpaper, wallpaperv2 } = require('@bochilteam/scraper')
   let _res = await (/2/.test(command) ? wallpaperv2 : wallpaper)(text) 
   let _img = _res[Math.floor(Math.random() * _res.length)]
   conn.sendMessage(m.chat, { image: { url: _img }, caption: `*✨ Aqui tienes tu wallpaper de ${text}*`}, { quoted: fgif })
   break
   

  case 'togif': {
    if (!quoted) throw 'Responde a un sticker animado'
    if (!/webp/.test(mime)) throw `*Responde a un sticker animado*`
    await m.reply(mess.wait)
    let { webp2mp4File } = require('./lib')
    let media = await conn.downloadAndSaveMediaMessage(quoted)
    let webpToMp4 = await webp2mp4File(media)
    await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, {quoted:m})
    await fs.unlinkSync(media)
    }
    break

          case 'pinterest':  
          if (!text) return m.reply('𝚒𝚗𝚐𝚛𝚎𝚜𝚊 𝚞𝚗 𝚝𝚎𝚡𝚝𝚘 𝚙𝚊𝚛𝚊 𝚋𝚞𝚜𝚌𝚊𝚛 𝚎𝚗 𝚙𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝')  
          m.reply(mess.wait)  
          lol = await pinterest(text) //.catch(m.reply)  
          result = lol[Math.floor(Math.random() * lol.length)];  
          sendImageAsUrl(result, `*-------「 PINTEREST 」-------*\n🤠 busqueda de ${text}\n🔗 url ${result}`)  
          break*/
cmd({
pattern: "nowa",
category: "herramientas",
},
async (conn, m, { body, text }) => {
let regex = /x/g 
  if (!text) m.reply('⚠️ Falto el número.')
  if (!body.match(regex)) m.reply(`*Ejemplo de uso: ${prefix + command} 521999340434x*`)
  let random = body.match(regex).length, total = Math.pow(10, random), array = [] 
  for (let i = 0; i < total; i++) { 
  let list = [...i.toString().padStart(random, '0')] 
  let result = text.replace(regex, () => list.shift()) + '@s.whatsapp.net' 
  if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) { 
  let info = await conn.fetchStatus(result).catch(_ => {}) 
  array.push({ exists: true, jid: result, ...info }) 
  } else { 
  array.push({ exists: false, jid: result }) 
  }} 
  let txt = 'Registrados\n\n' + array.filter(v => v.exists).map(v => `• Nro: wa.me/${v.jid.split('@')[0]}\n*• Bio:* ${v.status || 'Sin descripcion'}\n*• Fecha:* ${formatDate(v.setAt)}`).join('\n\n') + '\n\n*No registrados*\n\n' + array.filter(v => !v.exists).map(v => v.jid.split('@')[0]).join('\n') 
  m.reply(txt) 
  function formatDate(n, locale = 'id') { 
  let d = new Date(n) 
  return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })}
})

let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(`Update ${__filename}`)
  delete require.cache[file]  
  require(file)  
  })
