const fs = require("fs")
const { smsg } = require("./fuctions.js")
const path = require("path")



const skmenu = (prefix, pushname) => {
return ` 
╭══════════════⪩
┃女⃟⃟女MENU❈⃟き 
┃ © *SKID*®
┃ 👤 Nombre: ${pushname}
╰══════════════⪨
 *SERBOT* 
╭══════════════⪩
┃§ *para que tengas tu propio bot*
┃
┃ ⪩ ${prefix}serbot
┃ ⪩ ${prefix}bots
┃ ⪩ ${prefix}public (modo publico)
┃ ⪩ ${prefix}self (modo privado)
┃
╰══════════════⪨
 ∆ *HERRAMIENTAS* ∆
 ╭══════════════⪩
┃§ *Herramientas*
┃
┃ ⪩ ${prefix}nowa
┃ ⪩ ${prefix}tomp4
┃ ⪩ ${prefix}tovideo
┃ ⪩ ${prefix}toaud
┃ ⪩ ${prefix}toaudio
┃ ⪩ ${prefix}toimg
┃ ⪩ ${prefix}toqr
┃ ⪩ ${prefix}tovn
┃ ⪩ ${prefix}toppt
┃
╰══════════════⪨
 ∆ *FUN* ∆
 ╭══════════════⪩
┃§ *Para chats*
┃
┃ ⪩ ${prefix}ppt @user
┃ ⪩ ${prefix}fake
┃
╰══════════════⪨
 ∆ *LOGOS* ∆
╭══════════════⪩
┃§ *Para logos*
┃
┃ ⪩ ${prefix}blackpink [texto]
┃ ⪩ ${prefix}neon [texto]
┃ ⪩ ${prefix}minion [texto]
┃ ⪩ ${prefix}avenger [texto]
┃ ⪩ ${prefix}space [texto]
┃ ⪩ ${prefix}pornhub [texto]
┃ ⪩ ${prefix}cloud [texto]
┃ ⪩ ${prefix}blackpink [texto]
┃ ⪩ ${prefix}hallowen [texto]
┃
╰══════════════⪨
∆ *MODIFICAR AUDIO* ∆
╭══════════════⪩
┃
┃ ⪩ ${prefix}bass
┃ ⪩ ${prefix}blown
┃ ⪩ ${prefix}deep
┃ ⪩ ${prefix}earrape
┃ ⪩ ${prefix}fast
┃ ⪩ ${prefix}fat
┃ ⪩ ${prefix}nightcore
┃ ⪩ ${prefix}reverse
┃ ⪩ ${prefix}robot
┃ ⪩ ${prefix}slow
┃ ⪩ ${prefix}smooth
┃ ⪩ ${prefix}squirrel
┃
╰══════════════⪨
∆ *ADMIN* ∆
╭══════════════⪩
┃§ *Para admins*
┃
┃ ⪩ ${prefix}ban
┃ ⪩ ${prefix}promote
┃ ⪩ ${prefix}demote
┃ ⪩ ${prefix}banchat off/on 
┃ ⪩ ${prefix}welcome off/on 
┃ ⪩ ${prefix}kick
┃ ⪩ ${prefix}grupo abrir
┃ ⪩ ${prefix}grupo cerrar
┃
╰══════════════⪨
∆ *STIKERS* ∆
╭══════════════⪩
┃§ *Para stickers*
┃
┃ ⪩ ${prefix}sticker
┃ ⪩ ${prefix}s
┃ ⪩ ${prefix}attp
┃
╰══════════════⪨
∆ *DESCARGAS* ∆
╭══════════════⪩
┃§ *Para descargas*
┃
┃ ⪩ ${prefix}play2 + [link]
┃ ⪩ ${prefix}play + [nombre | link]
┃
╰══════════════⪨
∆ *BUSQUEDA* ∆
╭══════════════⪩
┃§ *Para descargas*
┃
┃ ⪩ ${prefix}yts + [nombre]
┃ ⪩ ${prefix}simi + [nombre]
┃ ⪩ ${prefix}pinterest + [nombre]
┃ ⪩ ${prefix}google + [nombre]
┃
╰══════════════⪨
∆ *OTROS* ∆ 
╭══════════════⪩
┃§ ${botname}
┃
┃ ⪩ ${prefix}estado
┃ ⪩ ${prefix}ping
┃
╰══════════════⪨
∆ *OWNER* ∆ 
╭══════════════⪩
┃§ ${botname}
┃
┃ ⪩ ${prefix}getcase
┃ ⪩ ${prefix}update
┃ ⪩ $
┃ ⪩ >
┃ ⪩ => 
┃
╰══════════════⪨`
}

module.exports = { skmenu }

 let file = require.resolve(__filename)  
  fs.watchFile(file, () => {  
  fs.unwatchFile(file)  
  console.log(chalk.redBright(`Update ${__filename}`))  
  delete require.cache[file]  
  require(file)  
  })