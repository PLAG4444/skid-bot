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
 }
 global.rpg = { 
   emoticon(string) { 
     string = string.toLowerCase(); 
     const emot = { 
       level: '🧬 Nivel', 
       limit: '💎 Diamante', 
       exp: '⚡ Experiencia', 
       bank: '🏦 Banco', 
       diamond: '💎 Diamante', 
       health: '❤️ Salud', 
       kyubi: '🌀 Magia', 
       joincount: '🪙 Token', 
       emerald: '💚 Esmeralda', 
       stamina: '✨ Energía', 
       role: '💪 Rango', 
       premium: '🎟️ Premium', 
       pointxp: '📧 Exp', 
       gold: '👑 Oro', 
       trash: '🗑 Basura', 
       crystal: '🔮 Cristal', 
       intelligence: '🧠 Inteligencia', 
       string: '🕸️ Cuerda', 
       keygold: '🔑 Llave de Oro', 
       keyiron: '🗝️ Llave de Hierro', 
       emas: '🪅 Piñata', 
       fishingrod: '🎣 Caña de Pescar', 
       gems: '🍀 Gemas', 
       magicwand: '⚕️ Varita Mágica', 
       mana: '🪄 Hechizo', 
       agility: '🤸‍♂️ Agilidad', 
       darkcrystal: '♠️ Cristal Oscuro', 
       iron: '⛓️ Hierro', 
       rock: '🪨 Roca', 
       potion: '🥤 Poción', 
       superior: '💼 Superior', 
       robo: '🚔 Robo', 
       upgrader: '🧰 Aumentar Mejora', 
       wood: '🪵 Madera', 
       strength: '💪 Fuerza', 
       arc: '🏹 Arco', 
       armor: '🥼 Armadura', 
       bow: '🏹 Super Arco', 
       pickaxe: '⛏️ Pico', 
       sword: '⚔️ Espada', 
       common: '📦 Caja Común', 
       uncoommon: '🥡 Caja Poco Común', 
       mythic: '🗳️ Caja Mítico', 
       legendary: '🎁 Caja Legendaria', 
       petFood: '🍖 Alimento para Mascota', 
       pet: '🍱 Caja para Mascota', 
       bibitanggur: '🍇 Semilla de Uva', 
       bibitapel: '🍎 Semilla de Manzana', 
       bibitjeruk: '🍊 Semillas de naranja', 
       bibitmangga: '🥭 Semilla de Mango', 
       bibitpisang: '🍌 Semillas de Plátano', 
       ayam: '🐓 Pollo', 
       babi: '🐖 Puerco', 
       Jabali: '🐗 Jabali', 
       bull: '🐃 Toro', 
       buaya: '🐊 Cocodrilo', 
       cat: '🐈 Gato', 
       centaur: '🐐 Centauro', 
       chicken: '🐓 Pollo', 
       cow: '🐄 Vaca', 
       dog: '🐕 Perro', 
       dragon: '🐉 Dragón', 
       elephant: '🐘 Elefante', 
       fox: '🦊 Zorro', 
       giraffe: '🦒 Jirafa', 
       griffin: '🦅 Ave', 
       horse: '🐎 Caballo', 
       kambing: '🐐 Cabra', 
       kerbau: '🐃 Búfalo', 
       lion: '🦁 León', 
       money: '💵 Dolares', 
       monyet: '🐒 Mono', 
       panda: '🐼 Panda', 
       snake: '🐍 Serpiente', 
       phonix: '🕊️ Fénix', 
       rhinoceros: '🦏 Rinoceronte', 
       wolf: '🐺 Lobo', 
       tiger: '🐅 Tigre', 
       cumi: '🦑 Calamar', 
       udang: '🦐 Camarón', 
       ikan: '🐟 Pez', 
       fideos: '🍝 Fideos', 
       ramuan: '🧪 Ingrediente NOVA', 
       knife: '🔪 Cuchillo', 
     }; 
     const results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string)); 
     if (!results.length) return ''; 
     else return emot[results[0][0]]; 
   }}
   global.rpgg = { // Solo emojis 
   emoticon(string) { 
     string = string.toLowerCase(); 
     const emott = { 
       level: '🧬', 
       limit: '💎', 
       exp: '⚡', 
       bank: '🏦', 
       diamond: '💎+', 
       health: '❤️', 
       kyubi: '🌀', 
       joincount: '🪙', 
       emerald: '💚', 
       stamina: '✨', 
       role: '💪', 
       premium: '🎟️', 
       pointxp: '📧', 
       gold: '👑', 
       trash: '🗑', 
       crystal: '🔮', 
       intelligence: '🧠', 
       string: '🕸️', 
       keygold: '🔑', 
       keyiron: '🗝️', 
       emas: '🪅', 
       fishingrod: '🎣', 
       gems: '🍀', 
       magicwand: '⚕️', 
       mana: '🪄', 
       agility: '🤸‍♂️', 
       darkcrystal: '♠️', 
       iron: '⛓️', 
       rock: '🪨', 
       potion: '🥤', 
       superior: '💼', 
       robo: '🚔', 
       upgrader: '🧰', 
       wood: '🪵', 
       strength: '🦹‍ ♀️', 
       arc: '🏹', 
       armor: '🥼', 
       bow: '🏹', 
       pickaxe: '⛏️', 
       sword: '⚔️', 
       common: '📦', 
       uncoommon: '🥡', 
       mythic: '🗳️', 
       legendary: '🎁', 
       petFood: '🍖', 
       pet: '🍱', 
       bibitanggur: '🍇', 
       bibitapel: '🍎', 
       bibitjeruk: '🍊', 
       bibitmangga: '🥭', 
       bibitpisang: '🍌', 
       ayam: '🐓', 
       babi: '🐖', 
       Jabali: '🐗', 
       bull: '🐃', 
       buaya: '🐊', 
       cat: '🐈', 
       centaur: '🐐', 
       chicken: '🐓', 
       cow: '🐄', 
       dog: '🐕', 
       dragon: '🐉', 
       elephant: '🐘', 
       fox: '🦊', 
       giraffe: '🦒', 
       griffin: '🦅', 
       horse: '🐎', 
       kambing: '🐐', 
       kerbau: '🐃', 
       lion: '🦁', 
       money: '💵', 
       monyet: '🐒', 
       panda: '🐼', 
       snake: '🐍', 
       phonix: '🕊️', 
       rhinoceros: '🦏', 
       wolf: '🐺', 
       tiger: '🐅', 
       cumi: '🦑', 
       udang: '🦐', 
       ikan: '🐟', 
       fideos: '🍝', 
       ramuan: '🧪', 
       knife: '🔪', 
     }; 
     const results = Object.keys(emott).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string)); 
     if (!results.length) return ''; 
     else return emott[results[0][0]]; 
   }}; 
 global.rpgshop = { // Tienda 
   emoticon(string) { 
     string = string.toLowerCase(); 
     const emottt = { 
       exp: '⚡ Experiencia', 
       limit: '💎 Diamante', 
       diamond: '💎 Diamante', 
       joincount: '🪙 Token', 
       emerald: '💚 Esmeralda', 
       berlian: '♦️ Joya', 
       kyubi: '🌀 Magia', 
       gold: '👑 Oro', 
       money: '💵 dolares', 
       tiketcoin: '🎫 ticket', 
       stamina: '✨ Energía', 
       potion: '🥤 Poción', 
       aqua: '💧 Agua', 
       trash: '🗑 Basura', 
       wood: '🪵 Madera', 
       rock: '🪨 Roca', 
       batu: '🥌 Piedra', 
       string: '🕸️ Cuerda', 
       iron: '⛓️ Hierro', 
       coal: '⚱️ Carbón', 
       botol: '🍶 Botella', 
       kaleng: '🥫 Lata', 
       kardus: '🪧 Cartón', 
       eleksirb: '💡 Electricidad', 
       emasbatang: '〽️ Barra de Oro', 
       emasbiasa: '🧭 Oro Común', 
       rubah: '🦊🌫️ Zorro Grande', 
       sampah: '🗑🌫️ Super Basura', 
       serigala: '🐺🌫️ Super Lobo', 
       kayu: '🛷 Super Madera', 
       sword: '⚔️ Espada', 
       umpan: '🪱 Carnada', 
       healtmonster: '💵 Billetes', 
       emas: '🪅 Piñata', 
       pancingan: '🪝 Gancho', 
       pancing: '🎣 Caña de Pescar', 
       common: '📦 Caja Común', 
       uncoommon: '🥡 Caja Poco Común', 
       mythic: '🗳️ Caja Mítica', 
       pet: '📫 Caja de Mascotas', // ? 
       gardenboxs: '💐 Caja de Jardinería', // ? 
       legendary: '🎁 Caja Legendaria', 
       anggur: '🍇 Uva', 
       apel: '🍎 Manzana', 
       jeruk: '🍊 Naranja', 
       mangga: '🥭 Mango', 
       pisang: '🍌 Platano', 
       bibitanggur: '🌾🍇 Semillas de uva', 
       bibitapel: '🌾🍎 Semillas de manzana', 
       bibitjeruk: '🌾🍊 Semillas de naranja', 
       bibitmangga: '🌾🥭 Semillas de Mango', 
       bibitpisang: '🌾🍌 Semillas de plátano', 
       centaur: '🐐 Centauro', 
       griffin: '🦅 Ave', 
       kucing: '🐈 Gato', 
       naga: '🐉 Dragón', 
       fox: '🦊 Zorro', 
       kuda: '🐎 Caballo', 
       phonix: '🕊️ Fénix', 
       wolf: '🐺 Lobo', 
       anjing: '🐶 Perro', 
       petFood: '🍖 Alimento para Mascota', // ? 
       makanancentaur: '🐐🥩 Comida de Centauro', 
       makanangriffin: '🦅🥩 Comida de Ave', 
       makanankyubi: '🌀🥩 Comida Mágica', 
       makanannaga: '🐉🥩 Comida de Dragón', 
       makananpet: '🍱🥩 Alimentos de mascotas', 
       makananphonix: '🕊️🥩 Comida de Fénix', 
     }; 
     const results = Object.keys(emottt).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string)); 
     if (!results.length) return ''; 
     else return emottt[results[0][0]]; 
   }}; 
 global.rpgshopp = { // Tienda 
   emoticon(string) { 
     string = string.toLowerCase(); 
     const emotttt = { 
       exp: '⚡', 
       limit: '💎', 
       diamond: '💎+', 
       joincount: '🪙', 
       emerald: '💚', 
       berlian: '♦️', 
       kyubi: '🌀', 
       gold: '👑', 
       money: '💵', 
       tiketcoin: '🎫', 
       stamina: '✨', 
       potion: '🥤', 
       aqua: '💧', 
       trash: '🗑', 
       wood: '🪵', 
       rock: '🪨', 
       batu: '🥌', 
       string: '🕸️', 
       iron: '⛓️', 
       coal: '⚱️', 
       botol: '🍶', 
       kaleng: '🥫', 
       kardus: '🪧', 
       eleksirb: '💡', 
       emasbatang: '〽️', 
       emasbiasa: '🧭', 
       rubah: '🦊🌫️', 
       sampah: '🗑🌫️', 
       serigala: '🐺🌫️', 
       kayu: '🛷', 
       sword: '⚔️', 
       umpan: '🪱', 
       healtmonster: '💵', 
       emas: '🪅', 
       pancingan: '🪝', 
       pancing: '🎣', 
       common: '📦', 
       uncoommon: '🥡', 
       mythic: '🗳️', 
       pet: '📫', // ? 
       gardenboxs: '💐', // ? 
       legendary: '🎁', 
       anggur: '🍇', 
       apel: '🍎', 
       jeruk: '🍊', 
       mangga: '🥭', 
       pisang: '🍌', 
       bibitanggur: '🌾🍇', 
       bibitapel: '🌾🍎', 
       bibitjeruk: '🌾🍊', 
       bibitmangga: '🌾🥭', 
       bibitpisang: '🌾🍌', 
       centaur: '🐐', 
       griffin: '🦅', 
       kucing: '🐈', 
       naga: '🐉', 
       fox: '🦊', 
       kuda: '🐎', 
       phonix: '🕊️', 
       wolf: '🐺', 
       anjing: '🐶', 
       petFood: '🍖', // ? 
       makanancentaur: '🐐🥩', 
       makanangriffin: '🦅🥩', 
       makanankyubi: '🌀🥩', 
       makanannaga: '🐉🥩', 
       makananpet: '🍱🥩', 
       makananphonix: '🕊️🥩', 
     }; 
     const results = Object.keys(emotttt).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string)); 
     if (!results.length) return ''; 
     else return emotttt[results[0][0]]; 
   }};
 

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update'${__filename}'`))
delete require.cache[file]
require(file)
})
