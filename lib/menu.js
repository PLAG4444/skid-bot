const fs = require("fs")
const { smsg } = require("./fuctions.js")
const path = require("path")
const chalk = require("chalk");
const { listJadibot } = require('../serbot.js')

const skmenu = (skid, prefix, pushname, m) => {
let user = global.db.data.users[m.sender]
let wa = m.key.id.length > 21 ? 'Android' : m.key.id.substring(0, 2) == '3A' ? 'IOS' : 'whatsapp web'

return ` 
╭════════════════════⪩
┃           女⃟⃟女MENU❈⃟き       
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃  👋 *Hola, soy skid bot!!! ${skid.user.id == global.numBot2 ? '' : '(Subbot)'}*
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   👤 Nombre: ${pushname}       
┃   🌍 Modo: ${skid.public ? 'publico' : 'privado'}
┃   🌀 Rol: ${user.role}          
┃   ✨ Exp: ${user.exp}           
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🤖 *SERBOT* 🤖                
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}serbot 
┃   ⪩ ${prefix}serbot --code
┃   ⪩ ${prefix}bots              
┃   ⪩ ${prefix}public (modo publico)
┃   ⪩ ${prefix}self (modo privado)
┃   ⪩ ${prefix}enable antillamadas
┃   ⪩ ${prefix}deljadibot
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🛠️ *HERRAMIENTAS* 🛠️         
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}nowa              
┃   ⪩ ${prefix}ia                
┃   ⪩ ${prefix}ofuscar  
┃   ⪩ ${prefix}toqr
┃   ⪩ ${prefix}inspeccionar   
┃   ⪩ ${prefix}qc          
┃   ⪩ ${prefix}tolink
┃   ⪩ ${prefix}tomp3
┃   ⪩ ${prefix}toimg
┃   ⪩ ${prefix}tomp4
┃   ⪩ ${prefix}acortar
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   😂 *FUN* 😂                  
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}fake @tag|texto|texto
┃   ⪩ ${prefix}simi           
┃   ⪩ ${prefix}gay @tag
┃   ⪩ ${prefix}horny @tag
┃   ⪩ ${prefix}simp @tag
┃   ⪩ ${prefix}dvd @tag
┃   ⪩ ${prefix}comment @tag   
┃   ⪩ ${prefix}follar @tag
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🎤 *MODIFICAR AUDIO* 🎤      
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}bass              
┃   ⪩ ${prefix}blown             
┃   ⪩ ${prefix}deep              
┃   ⪩ ${prefix}earrape           
┃   ⪩ ${prefix}fast              
┃   ⪩ ${prefix}fat               
┃   ⪩ ${prefix}nightcore         
┃   ⪩ ${prefix}reverse           
┃   ⪩ ${prefix}robot             
┃   ⪩ ${prefix}slow              
┃   ⪩ ${prefix}smooth            
┃   ⪩ ${prefix}squirrel          
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   👻 *ADMIN* 👻                
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}ban               
┃   ⪩ ${prefix}promote           
┃   ⪩ ${prefix}demote            
┃   ⪩ ${prefix}del
┃   ⪩ ${prefix}kick              
┃   ⪩ ${prefix}grupo abrir       
┃   ⪩ ${prefix}grupo cerrar      
┃   ⪩ ${prefix}tagall            
┃   ⪩ ${prefix}hidetag           
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   📷 *STIKERS* 📷              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}sticker           
┃   ⪩ ${prefix}s                 
┃   ⪩ ${prefix}attp              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🎤 *AUDIOS* 🎤  *(activable)*
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ _Quien es tu sempai botsito 7w7_ 
┃   ⪩ _Te diagnostico con gay_ 
┃   ⪩ _No digas eso papu_ 
┃   ⪩ _A nadie le importa_ 
┃   ⪩ _Fiesta del admin_ 
┃   ⪩ _Fiesta del administrador_  
┃   ⪩ _Vivan los novios_ 
┃   ⪩ _Feliz cumpleaños_ 
┃   ⪩ _Noche de paz_ 
┃   ⪩ _Buenos dias_ 
┃   ⪩ _Buenos tardes_ 
┃   ⪩ _Buenos noches_ 
┃   ⪩ _Audio hentai_ 
┃   ⪩ _Chica lgante_ 
┃   ⪩ _Feliz navidad_ 
┃   ⪩ _Vete a la vrg_ 
┃   ⪩ _Pasa pack Bot_ 
┃   ⪩ _Atencion grupo_ 
┃   ⪩ _Marica quien_ 
┃   ⪩ _Murio el grupo_ 
┃   ⪩ _Oh me vengo_ 
┃   ⪩ _tio que rico_ 
┃   ⪩ _Viernes_ 
┃   ⪩ _Baneado_ 
┃   ⪩ _Sexo_ 
┃   ⪩ _Hola_ 
┃   ⪩ _Un pato_ 
┃   ⪩ _Nyanpasu_ 
┃   ⪩ _Te amo_ 
┃   ⪩ _Yamete_ 
┃   ⪩ _Bañate_ 
┃   ⪩ _Es puto_ 
┃   ⪩ _La biblia_ 
┃   ⪩ _Onichan_ 
┃   ⪩ _Mierda de Bot_ 
┃   ⪩ _Siuuu_ 
┃   ⪩ _Epico_ 
┃   ⪩ _Shitpost_ 
┃   ⪩ _Rawr_ 
┃   ⪩ _UwU_ 
┃   ⪩ _a_
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⚙️ *ENABLE* ⚙️              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}enable antilink  
┃   ⪩ ${prefix}enable antiarabes
┃   ⪩ ${prefix}enable antifake  
┃   ⪩ ${prefix}enable detect    
┃   ⪩ ${prefix}enable welcome   
┃   ⪩ ${prefix}enable antinsfw  
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⚙️ *DISABLE* ⚙️              
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}disable antilink 
┃   ⪩ ${prefix}disable antiarabes
┃   ⪩ ${prefix}disable antifake 
┃   ⪩ ${prefix}disable detect   
┃   ⪩ ${prefix}disable welcome  
┃   ⪩ ${prefix}disable antinsfw 
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   📥 *DESCARGAS* 📥            
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}play2 + [nombre
┃   ⪩ ${prefix}play + [nombre]
┃   ⪩ ${prefix}tiktok + [link]
┃   ⪩ ${prefix}tiktok + [link]
┃   ⪩ ${prefix}apk + [nombre]
┃   ⪩ ${prefix}mediafire + [link]
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🔍 *BUSQUEDA* 🔍
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ *Para descargas*
┃
┃ ⪩ ${prefix}yts + [nombre]
┃ ⪩ ${prefix}pinterest + [nombre]
┃ ⪩ ${prefix}lyrics + [texto]
┃
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⚔️ *RPG* ⚔️
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ⪩ ${prefix}work
┃   ⪩ ${prefix}claim
┃   ⪩ ${prefix}levelup
┃   ⪩ ${prefix}buy xp
┃   ⪩ ${prefix}buy cofre
┃   ⪩ ${prefix}minar
┃   ⪩ ${prefix}casino
┃   ⪩ ${prefix}apostar
┃   ⪩ ${prefix}perfil
┃   ⪩ ${prefix}transfer
┃   ⪩ ${prefix}afk
┃   ⪩ ${prefix}robar
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   📝 *LOGOS* 📝
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃ ⪩ ${prefix}blackpink [texto]
┃ ⪩ ${prefix}neon [texto]
┃ ⪩ ${prefix}greenneon [texto]
┃ ⪩ ${prefix}advanceglow [texto]
┃ ⪩ ${prefix}advanceglow [texto]
┃ ⪩ ${prefix}thunder [texto]
┃ ⪩ ${prefix}horrorblood [texto]
┃ ⪩ ${prefix}summersand [texto]
┃ ⪩ ${prefix}luxury [texto]
┃ ⪩ ${prefix}icecold [texto]
┃ ⪩ ${prefix}breakwall [texto]
┃ ⪩ ${prefix}roadwarning [texto]
┃ ⪩ ${prefix}box3d [texto]
┃ ⪩ ${prefix}strawberry [texto]
┃ ⪩ ${prefix}toxic [texto]
┃ ⪩ ${prefix}bokeh [texto]
┃ ⪩ ${prefix}natureleaves [texto]
┃ ⪩ ${prefix}fireworksparkle [texto]
┃ ⪩ ${prefix}jokerlogo [texto]
┃ ⪩ ${prefix}halloween [texto]
┃ ⪩ ${prefix}bloodfrosted [texto]
┃ ⪩ ${prefix}newyearcard [texto]
┃ ⪩ ${prefix}deluxesilver [texto]
┃ ⪩ ${prefix}minion [texto]
┃ ⪩ ${prefix}text1917 [texto]
┃ ⪩ ${prefix}holographic [texto]
┃ ⪩ ${prefix}neonlight [texto]
┃ ⪩ ${prefix}metaldark [texto]
┃ ⪩ ${prefix}sandengraved [texto]
┃ ⪩ ${prefix}sandsummer [texto]
┃ ⪩ ${prefix}sandwriting [texto]
┃ ⪩ ${prefix}futureneon [texto]
┃ ⪩ ${prefix}carvedwood [texto]
┃ ⪩ ${prefix}harrypotter [texto]
┃ ⪩ ${prefix}flamming [texto]
┃ ⪩ ${prefix}fallleaves [texto]
┃ ⪩ ${prefix}glowingneon [texto]
┃ ⪩ ${prefix}letterleaves [texto]
┃ ⪩ ${prefix}summernature [texto]    
┃ ⪩ ${prefix}golderrose [texto]
┃ ⪩ ${prefix}underwater [texto]
┃ ⪩ ${prefix}nature3d [texto]
┃ ⪩ ${prefix}wolfmetal [texto]
┃ ⪩ ${prefix}summer3d [texto]
┃ ⪩ ${prefix}woodenboard [texto]
┃ ⪩ ${prefix}woodheart [texto]  
┃ ⪩ ${prefix}coffe [texto]
┃ ⪩ ${prefix}love [texto]
┃ ⪩ ${prefix}undergrass [texto]
┃ ⪩ ${prefix}lovemessage [texto]
┃ ⪩ ${prefix}burnpaper [texto]
┃ ⪩ ${prefix}smoke [texto]
┃ ⪩ ${prefix}romance [texto]
┃ ⪩ ${prefix}cup1 [texto]
┃ ⪩ ${prefix}cup [texto]
┃ ⪩ ${prefix}shadow [texto]
┃ ⪩ ${prefix}freefire [texto]
┃ ⪩ ${prefix}silverplaybutton [texto]
┃ ⪩ ${prefix}goldplaybutton [texto]
┃ ⪩ ${prefix}birthdayday [texto]
┃ ⪩ ${prefix}snow3d [texto]
┃ ⪩ ${prefix}galaxybat [texto]
┃ ⪩ ${prefix}writegalacy [texto]
┃ ⪩ ${prefix}textbyname [texto]
┃ ⪩ ${prefix}wooden3d [texto]
┃ ⪩ ${prefix}starsnight [texto]
┃ ⪩ ${prefix}textcake [texto]
┃ ⪩ ${prefix}glittergold [texto]
┃ ⪩ ${prefix}noeltext [texto]
┃ ⪩ ${prefix}metallogo [texto]
┃ ⪩ ${prefix}greenbush [texto]
┃ ⪩ ${prefix}glossychrome [texto]
┃ ⪩ ${prefix}greenneon [texto]
┃ ⪩ ${prefix}hologram3d [texto]
┃ ⪩ ${prefix}galaxystyle [texto]
┃ ⪩ ${prefix}birthdaycake [texto]
┃ ⪩ ${prefix}heartshaped [texto]
┃ ⪩ ${prefix}royaltext [texto]
┃ ⪩ ${prefix}puppycute [texto]
┃ ⪩ ${prefix}beautifulflower [texto]
┃ ⪩ ${prefix}lighttext [texto]
┃ ⪩ ${prefix}galaxywallpaper [texto]
┃ ⪩ ${prefix}luxurygold [texto]
┃ ⪩ ${prefix}watercolor [texto]
┃ ⪩ ${prefix}multicolor3d [texto]
┃ ⪩ ${prefix}wetglass [texto]
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   🔞 *NSFW* 🔞 (activable)
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ *activa estos comandos con enable*
┃
┃ ⪩ ${prefix}lewd
┃ ⪩ ${prefix}ass
┃ ⪩ ${prefix}feet
┃ ⪩ ${prefix}gasm
┃ ⪩ ${prefix}feed
┃ ⪩ ${prefix}anal
┃ ⪩ ${prefix}kiss
┃ ⪩ ${prefix}tits
┃ ⪩ ${prefix}holo
┃ ⪩ ${prefix}erok
┃ ⪩ ${prefix}smug
┃ ⪩ ${prefix}waifu
┃ ⪩ ${prefix}pussy
┃ ⪩ ${prefix}blowjob
┃ ⪩ ${prefix}wallpaper
┃
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   ∆ *OTROS* ∆ 
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ ${botname}
┃
┃ ⪩ ${prefix}estado
┃ ⪩ ${prefix}ping
┃ ⪩ ${prefix}script
┃
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃   👑 *OWNER* 👑 
┠─╼━━━━━━━━⊱❖⊰━━━━━━━─┨
┃§ ${botname}
┃
┃ ⪩ ${prefix}getcase
┃ ⪩ ${prefix}sendcase
┃ ⪩ ${prefix}enable jadibot
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