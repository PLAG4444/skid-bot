const chalk = require("chalk")
const fs = require("fs")

global.owner = [
["5218442114446"],
["595992611272", "nombre1", true],
["50664668406", "nombre2", true],
["593968585383"], 
['584125778026'],
["543458437331"],
["5218441029462"]
]

global.noperfil = fs.readFileSync('./media/sinfoto.jpg')
global.chatgpt = fs.readFileSync('./media/chatgpt.jpg')
global.query = fs.readFileSync('./media/query.jpg')
global.menu = fs.readFileSync('./media/menu.jpg')
global.hentai = fs.readFileSync('./media/hentai.jpg')
global.simi = fs.readFileSync('./media/simi.jpeg')
global.success = fs.readFileSync('./media/unused.jpg')
global.wagrupo = 'https://chat.whatsapp.com/Ebbo3i9xxiZFErul4gyApJ'
global.script = 'https://www.github.com/Skidy89/skid-bot'
global.ownername = `skid`
global.yt = '@skid921'
global.github = '@skidy89'
global.location = 'mexico'

global.botname = "sᴋɪᴅ ʙᴏᴛ ᴍᴅ"
global.packname = "sᴋɪᴅ ʙᴏᴛ ❥"
global.author = "𝚍𝚒𝚎𝚐𝚊 𝚜𝚎 𝚕𝚊 𝚌𝚘𝚖𝚎"
global.vs = '1.0.1'
global.place = 'America/Bogota' // Aquí puede encontrar su ubicación https://momentjs.com/timezone/
global.language = 'es' // Aquí puede encontrar su idioma https://cloud.google.com/translate/docs/languages?hl=es-419

global.multiplier = 150

global.blockList = []  
global.premium = []  



global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]; 
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']; 
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]; 
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']; 
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]; 
global.lolkeysapi = ['GataDios']; // ['BrunoSobrino_2'] 
global.itsrose = ['4b146102c4d500809da9d1ff'];
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');
global.APIs = { 
   xteam: 'https://api.xteam.xyz', 
   dzx: 'https://api.dhamzxploit.my.id', 
   lol: 'https://api.lolhuman.xyz', 
   neoxr: 'https://api.neoxr.my.id', 
   zenzapis: 'https://api.zahwazein.xyz', 
   akuari: 'https://api.akuari.my.id', 
   akuari2: 'https://apimu.my.id', 
   fgmods: 'https://api-fgmods.ddns.net', 
   botcahx: 'https://api.botcahx.biz.id', 
   ibeng: 'https://api.ibeng.tech/docs', 
   github: 'https://api.github.com',
   rose: 'https://api.itsrose.site', 
   popcat: 'https://api.popcat.xyz', 
   xcoders: 'https://api-xcoders.site', 
   vihangayt: 'https://vihangayt.me', 
   erdwpe: 'https://api.erdwpe.com', 
   xyroinee: 'https://api.xyroinee.xyz', 
   nekobot: 'https://nekobot.xyz' 
 }, 
 global.APIKeys = { 
   'https://api.xteam.xyz': `${keysxteam}`, 
   'https://api.lolhuman.xyz': 'GataDios', 
   'https://api.neoxr.my.id': `${keysneoxr}`, 
   'https://api.zahwazein.xyz': `${keysxxx}`, 
   'https://api-fgmods.ddns.net': 'fg-dylux', 
   'https://api.botcahx.biz.id': 'Admin', 
   'https://api.ibeng.tech/docs': 'tamvan', 
   'https://api.itsrose.site': 'Rs-Zeltoria', 
   'https://api-xcoders.site': 'Frieren', 
   'https://api.xyroinee.xyz': 'uwgflzFEh6' 
 }; 
 

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})
