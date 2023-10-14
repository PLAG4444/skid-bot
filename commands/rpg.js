const { cmd, msToTime, pickRandom }= require('../lib/commands.js')

cmd({
pattern: "lb",
desc: "muestra la leadboard",
category: "rpg",
filename: __filename,
},
async (conn, m, { participants }) => {
var body = (typeof m.text == 'string' ? m.text : '') 
const args = body.trim().split(/ +/).slice(1)  || []
 let member = participants.map(u => u.id) 
 let me = m.split 
 const users = Object.entries(global.db.data.users).map(([key, value]) => {
 return {...value, jid: key}}); 
 const sortedExp = users.map(toNumber('exp')).sort(sort('exp')); 
 const sortedLim = users.map(toNumber('limit')).sort(sort('limit')); 
 const sortedLevel = users.map(toNumber('level')).sort(sort('level')); 
 const usersExp = sortedExp.map(enumGetKey); 
 const usersLim = sortedLim.map(enumGetKey); 
 const usersLevel = sortedLevel.map(enumGetKey); 
 const len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length);
   const adventurePhrases = [ 
   "Lidera la aventura y forja tu camino hacia la cima.", 
   "¡Desafía lo desconocido y alcanza nuevas alturas!", 
   "Tu valentía te guiará a la cima de la tabla de clasificación.", 
   "En cada paso, esculpe tu leyenda en esta gran aventura.", 
   "Explora, compite y demuestra tu grandeza en esta tabla.", 
   "Cada paso cuenta en tu viaje hacia la cima del ranking.", 
   "La emoción de la competencia te impulsa hacia adelante.", 
   "Aventúrate y conquista los primeros lugares con determinación.", 
 ]; 
   const randomAdventurePhrase = adventurePhrases[Math.floor(Math.random() * adventurePhrases.length)]; 
   const texto = ` 
 *< TABLA DE LOS AVENTUREROS MÁS DESTACADOS />* 
      
 —◉ *TOP ${len} EXP 🌟* 
 *👤 Tú posición:* ${usersExp.indexOf(m.sender) + 1} de ${usersExp.length} 
  
 ${sortedExp.slice(0, len).map(({jid, exp}, i) => `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${exp} exp*`).join`\n`} 
  
 —◉ *TOP ${len} DIAMANTES 💎* 
 *👤 Tú posición:* ${usersLim.indexOf(m.sender) + 1} de ${usersLim.length} 
  
 ${sortedLim.slice(0, len).map(({jid, limit}, i) => `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *${limit} diamantes*`).join`\n`} 
  
 —◉ *TOP ${len} NIVEL 🎚️* 
 *👤 Tú posición:* ${usersLevel.indexOf(m.sender) + 1} de ${usersLevel.length} 
  
 ${sortedLevel.slice(0, len).map(({jid, level}, i) => `${i + 1}. ${participants.some((p) => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *nivel ${level}*`).join`\n`} 
  
 *⚔️ ${randomAdventurePhrase} ⚔️*`.trim(); 
   conn.sendTextWithMentions(m.chat, texto, m)
 })


cmd({
pattern: "aventura",
desc: "aventurate por recompensas",
category: "rpg",
filename: __filename,
},
async (conn, m) => {
  let cooldown = 10000
  let user = global.db.data.users[m.sender]
  let timer = (cooldown - (new Date - user.lastadventure))
  if (new Date() - user.lastadventure < 10000) throw `*estas demasiado cansado*\n*espera ${msToTime(cooldown - new Date())} para volver a aventurar*`
  if (user.health < 80) return conn.reply(m.chat, `*estas herido*\npara poder aventurar necesitas minimo 80 de *salud* ♥️\ncompra pociones con ${global.prefix}buy potion y curate con ${global.prefix}health`, m)
  let rewards = reward(user)
  let txt = '*fuiste a una aventura peligrosa*\n*donde perdiste*'
  for (let lost in rewards.lost) {
  let total= rewards.lost[lost].getRandom()
  user[lost] -= total * 1
  if (total) txt += `\n*${global.rpg.emoticon(lost)}:* ${total}`
  }
  txt += '\n\nPero consigues'
  for (let rewardItem in rewards.reward) {
  let total = rewards.reward[rewardItem].getRandom()
  user[rewardItem] += total * 1
  if (total) txt += `\n*${global.rpg.emoticon(rewardItem)}:* ${total}`
  }
  m.reply(txt.trim())
  user.lastadventure = new Date() * 1
  
  function reward(user = {}) { 
     let rewards = { 
         reward: { 
             money: 201 + user.dog * 2000,
             exp: 301 + user.dog * 2000,
             trash: 101, 
             potion: 2, 
             rock: 2, 
             wood: 2, 
             string: 2, 
             common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1), 
             uncommon: [0, 0, 0, 1, 0].concat( 
                 new Array(5 - ( 
                     (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2 
                 )).fill(0) 
             ), 
             mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat( 
                 new Array(8 - ( 
                     (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3 
                 )).fill(0) 
             ), 
             legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat( 
                 new Array(10 - ( 
                     (user.dog > 8 && user.dog) || 4 
                 )).fill(0) 
             ), 
             iron: [0, 0, 0, 1, 0, 0], 
             gold: [0, 0, 0, 0, 0, 1, 0], 
             diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat( 
                 new Array(5 - ( 
                     (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0 
                 )).fill(0) 
             ), 
         }, 
         lost: { 
             health: 101 - user.cat * 4 
         } 
     } 
     return rewards 
 }
})
cmd({
pattern: "craft",
desc: "craftea varias herramientas con este comando",
category: 'rpg',
},
async (conn, m) => {
let repairs =  (args[0] || '').toLowerCase()
let user = global.db.data.users[m.sender] 
let caption = `
*Por alguna razon tienes estas recetas*
*(por un momento piensas crear una...)*
 
 *❏ Recetas*

*talvez un trabajo pida un hacha... nunca se sabe*
 ▧ Hacha 🪓
 〉4 madera
 〉3 hierro
 
*una buena decisión para conseguir materiales*
 ▧ Pico ⛏️ 
 〉 10 roca
 〉 5 Hierro 
 〉 2 madera

*necesitas pelear? esta es tu opcion*
 ▧ espada ⚔️ 
 〉 10 madera
 〉 15 hierro
 
*un poco de protección nunca viene mal*
 ▧ Armadura 🥼 
 〉 30 diamantes
 `
 switch (repairs) {

 case 'hacha': {
 if (user.axe > 0) m.reply(`*te sientes estupido al intentar crear una hacha cuando ya tienes una...*\n(talvez querías mejorarlo con ${global.prefix}mejorar)`)
 if (user.wood < 4 || user.iron < 3)  m.reply(`*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`)
 user.wood -= 4
 user.iron -= 3
 user.axe += 1
 user.axedurability = 70
 m.reply('*solo te cortaste una mano para tenér una fabulosa hacha 🪓*')
 }
 break
 
 case 'pico': {
 if (user.pickaxe > 0) throw `*te sientes estupido al intentar crear un pico cuando ya tienes uno...*\n(talvez querías mejorarlo con ${global.prefix}mejorar)`
 if (user.rock < 10 || user.iron < 5 || user.wood < 2) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.rock -= 10
 user.iron -= 5
 user.wood -= 2
 user.pickaxe += 1
 user.pickaxedurability = 70
 m.reply('*crafteaste un pico ⚒️*')
 }
 break
 
 case 'espada': {
 if (user.pickaxe > 0) throw `*te sientes estupido al intentar crear una espada cuando ya tienes una...*\n(talvez querías mejorarlo con ${global.prefix}mejorar)`
 if (user.wood < 10 || user.iron < 15) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.wood -= 10
 user.iron -= 15
 user.sword += 1
 user.sworddurability = 70
 m.reply('*con unas cuantas lesiones y cortaduras creaste una espada ⚔️*')
 }
 break
 
 case 'armadura': {
 if (user.armor > 0) throw `*te sientes estupido al intentar crear una armadura cuando ya tienes una...*\n(talvez querías mejorarlo con ${global.prefix}mejorar)`
 if (user.diamond < 30) throw `*Te das cuenta que te faltan materiales...*\n(puedes intentar checar tu inventario con .inv)`
 user.diamond -= 30
 user.armor += 1
 user.armordurability = 70
 m.reply('*como diablos hiciste una armadura con diaman.. da igual, lo bueno es que tienes ahora una armadura*')
 }
 break
 
 default: 
 m.reply(caption)
 }
 })

 function sort(property, ascending = true) { 
   if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]; 
   else return (...args) => args[ascending & 1] - args[!ascending & 1]; 
 } 
  
 function toNumber(property, _default = 0) { 
   if (property) { 
     return (a, i, b) => { 
       return {...b[i], [property]: a[property] === undefined ? _default : a[property]}; 
     }; 
   } else return (a) => a === undefined ? _default : a; 
 } 
  
 function enumGetKey(a) { 
   return a.jid; 
 }

