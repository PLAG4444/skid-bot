const { cmd, msToTime, pickRandom, getRandom }= require('../lib/commands.js')

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
cmd({
pattern: "minar",
alias: ["mineria"],
desc: "minar como un malnacido por premios",
category: "rpg",
},
async (conn, m, { text }) => {
let cooldown = 10000
  let user = global.db.data.users[m.sender]
  let timer = (cooldown - (new Date - user.lastmining))
  if (user.health < 80) return conn.reply(m.chat, `*estas herido*\npara poder minar necesitas minimo 80 de *salud* ♥️\ncompra pociones con ${prefix}buy potion y curate con ${prefix}health`, m)
  if (user.pickaxe == 0) return m.reply('*quieres minar sin pico 💀*')
  if (user.pickaxedurability < 30) throw '*tu pico esta roto*'
  if (new Date() - user.lastmining < 10000) throw `*estas demasiado cansado*\n*espera ${msToTime(cooldown - new Date())} para volver a minar*`
  let rewards = reward(user)
  let txt = '*minaste demasiado*\n*pero a costa perdiste'
  for (let lost in rewards.lost) if (user[lost]) {
  let total= rewards.lost[lost].getRandom()
  user[lost] -= total * 1
  if (total) txt += `\n*${global.rpg.emoticon(lost)}:* ${total}`
  }
  txt += '\n\nPero consigues'
  for (let rewardItem in rewards.reward) if (rewardItem in user) {
  let total = rewards.reward[rewardItem].getRandom()
  user[rewardItem] += total * 1
  if (total) txt += `\n*${global.rpg.emoticon(rewardItem)}:* ${total}`
  }
  m.reply(txt.trim())
  user.lastmining = new Date * 1
  
  function reward(user = {}) {
  let rewards = {
  reward: {
  exp: 702 + user.level * 5000,
  trash: 103,
  string: 25,
  rock: 30,
  iron: 25,
  diamond: 5,
  emerald: 5,
  common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1), 
  uncommon: [0, 0, 0, 1, 0].concat(new Array(5 - ((user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2 )).fill(0)), 
  },
  lost: {
  health: 80 - user.cat * 4,
  pickaxedurability: 30 - user.fox * 3
  }
  }
  return rewards
  }
})
cmd({
pattern: "health",
alias: ["curar", "curarme"],
desc: "curate de los daños de las aventuras",
category: "rpg",
}, 
async (conn, m) => {
  let user = global.db.data.users[m.sender]
  if (user.health >= 100) throw '*Tu salud esta llena ♥️*'
  let heal = 40 + user.cat * 4
  let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0])) || Math.round((90 - user.health) / heal))) * 1
  if (user.potion < count) return m.reply(`*❌ No tienes pociónes*\n*necesitas ${count - user.potion} pocion para curarte*\n*Solo tienes ${user.potion}!!*`)
  user.potion -= count * 1 //1 potion = count (1) 
  user.health += heal * count
  m.reply(`*Tu salud esta completa ✅*\n*usaste ${count} pociones para curarte*\n*Nueva salud: ${user.health} ♥️*`)  
  function isNumber(number) { 
   if (!number) return number; 
   number = parseInt(number); 
   return typeof number == "number" && !isNaN(number); 
  }
})
cmd({
pattern: "inventario",
alias: ["inv", "inventory"],
desc: "checar el inventario",
category: "fun",
},
async (conn, m) => {
let inventory = { 
   others: { 
     health: true, 
     money: true, 
     exp: true, 
     limit: true, 
     level: true, 
     role: true, 
   }, 
   items: { 
     potion: true, 
     trash: true, 
     wood: true, 
     rock: true, 
     string: true, 
     emerald: true, 
     diamond: true, 
     gold: true, 
     iron: true, 
     upgrader: true, 
     pet: true, 
   }, 
   durabi: { 
     sworddurability: true, 
     pickaxedurability: true, 
     axedurability: true,
     fishingroddurability: true, 
     armordurability: true,
   }, 
   tools: { 
     armor: { 
       '0': 'ropa desgastada', 
       '1': 'ropa comun', 
       '2': 'traje policial', 
       '3': 'traje militar', 
       '4': 'armadura antidisturbios', 
       '5': 'traje mecánico', 
       '6': 'traje legendario', 
       '7': 'armadura mejorada', 
       '8': 'armadura reforzada', 
       '9': 'armadura antimounstros', 
     }, 
     sword: { 
       '0': 'no tiene', 
       '1': 'espada inservible', 
       '2': 'espada desgastada',
       '3': 'espada de hierro',
       '4': 'doble espada afilada',
       '5': 'espada de oro', 
       '6': 'espada de oro reforzado', 
       '7': 'espada cazadora de mounstros',
     }, 
     pickaxe: { 
       '0': 'no tiene', 
       '1': 'pico quebradizo', 
       '2': 'pico desgastado', 
       '3': 'pico normal', 
       '4': 'pico de oro', 
       '5': 'pico de oro reforzado',
       '6': 'pico de diamante', 
       '7': 'pico de cristal'
     },
     axe: {
     '0': 'hacha normal',
     '1': 'hacha reforzada'
     },
     
     fishingrod: true, 
  
   }, 
   crates: { 
     common: true, 
     uncommon: true, 
     mythic: true, 
     legendary: true, 
   }, 
   pets: { 
     horse: 10, 
     cat: 10, 
     fox: 10, 
     dog: 10, 
   }
   } 
  let user = global.db.data.users[m.sender] 
  let tools = Object.keys(inventory.tools).map(v => user[v] && `${global.rpg.emoticon(v)} : ${typeof inventory.tools[v] === 'object' ? inventory.tools[v][user[v]?.toString()] : `nivel ${user[v]}`}`).filter(v => v).join('\n').trim() 
  let items = Object.keys(inventory.items).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n').trim() //`
  let dura = Object.keys(inventory.durabi).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n').trim() 
  let crates = Object.keys(inventory.crates).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n').trim() 
  let pets = Object.keys(inventory.pets).map(v => user[v] && `${global.rpg.emoticon(v)} : ${user[v] >= inventory.pets[v] ? 'nivel maximo' : `nivel ${user[v]}`}`).filter(v => v).join('\n').trim() //`
  let txt = `
👤 Nombre: ${await conn.getName(m.sender)}
🛡️ Rol ${user.role}

${Object.keys(inventory.others).map(v => user[v] && `➔ ${global.rpg.emoticon(v)} : ${user[v]}`).filter(v => v).join('\n')}${tools ? `
* Herramientas ⚔️*

${tools}` : ''}${dura ?`
${dura}` : ''}${items ? `

* Items ♦️*
${items}
Items totales: ${Object.keys(inventory.items).map(v => user[v]).reduce((a, b) => a + b, 0)} Items` : ''}${crates ? `

* Cajas 📦*
${crates}

Cajas totales:  ${Object.keys(inventory.crates).map(v => user[v]).reduce((a, b) => a + b, 0)} Cajas` : ''}${pets || user.petFood ? ` 

${pets ? pets + '\n' : ''}${user.petFood ? '🍖 comida para mascotas: ' + user.petFood : ''}` : ''}`.trim() // `
m.reply(txt)
})
 function sort(property, ascending = true) { 
   if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]; 
   else return (...args) => args[ascending & 1] - args[!ascending & 1]; 
 }
 cmd({
 pattern: "work",
 alias: ["chambear", "jalar", "trabajar"],
 desc: "trabaja por el sueldo mínimo!!",
 category: "rpg",
 },
 async (conn, m, { args }) => {
 let works = (args[0] || '').toLowerCase()
 let txt = `
*Hola ${await conn.getName(m.sender)}*

*Aqui tienes una lista de trabajos donde puedes ser contratado*

 *Cajero 🏧*
- No necesitas nada para que te contraten el el cajero
- paga miserable 
- sin bonus exp

 *Leñador 🪵*
- necesitas un hacha (crafteable)
- paga buena
- bonus exp

 *Repartidor 🚚* (próximamente)
- Nivel 45 requerido
- Coche requerido
- Cada pedido 500 dolares
- Bonus xp
- Bonus items
`
switch (works) {

case 'cajero': {
let user = global.db.data.users[m.sender] 
let time = global.db.data.users[m.sender].lastwork + 600000  
if (new Date - global.db.data.users[m.sender].lastwork < 600000) return m.reply(`*Estas cansado*\n*Espera ${msToTime(time - new Date())} para volver a trabajar!!*`)
let pay = Math.floor(Math.random() * 300)
user.money += pay + user.dog * 1000
user.lastwork = new Date() * 1
let work = pickRandom(['los ruidos de lo clientes molestos no te dejan en paz, sin embargo tu paga fue de', 'fue una noche tranquila...\nganaste', 'porque elegiste este trabajo\n*esta pregunta retumba en tu cabeza*, sin embargo ganaste tu miseria de paga de'])
m.reply(`${work} ${pay} dólares 💵`)
}
break
case 'leñador': { 
let user = global.db.data.users[m.sender] 
let time = global.db.data.users[m.sender].lastwork + 600000  
if (new Date - global.db.data.users[m.sender].lastwork < 600000) return m.reply(`*Estas cansado*\n*Espera ${msToTime(time - new Date())} para volver a trabajar!!*`)
if (user.axe == 0) throw '*no fuistes contratado por la simple razon de que no tienes un hacha, subnormal*'
if (user.axedurability < 50) throw `tu hacha puede *romperse* en esas condiciones sin aviso\npuedes reparar tu hacha con *${prefix}repair hacha*`
let pay = pickRandom([900, 300, 700, 999])
let bonus = Math.floor(Math.random() * 3000)
let lost = Math.floor(Math.random() * 80)
user.money += pay + user.dog * 1000
user.exp += bonus + user.dog * 1000
user.lastwork = new Date() * 1
user.axedurability -= lost - user.fox * 4
let work = pickRandom(['este trabajo es demasiado bueno pero agotador, asi que este esfuerzo es recompensado por', '*piensas en cortar 20 troncos mas pero tu trabajo es tan bueno que ganas*'])
m.reply(`${work} ${pay + user.dog * 1000} dolares 💵\n*a costa de este trabajo ganaste ${bonus + user.dog * 1000} XP*\n*pero tu hacha perdio ${lost - user.fox * 4} de durabilidad*`)
}
break
default:

m.reply(txt)

}
})

cmd({
pattern: "petshop",
desc: "compra mascotas para tener habilidades especiales",
category: "rpg",
},
async (conn, m, { args }) => {
let shop = (args[0] || '').toLowerCase()
let user = global.db.data.users[m.sender] 
let hdog = 5000
let hcat = 5000
let hfox = 20000
let hpetfood = 1
let txt = `
*compra una mascota hoy...*

 🐈 • *Gato:*
 ➞ ${hcat} dolares
 ➞ 4% mas salud en cualquier accion
 
 
 🐕 • *Perro:* 
 ➞ ${hdog} dolares
 ➞ Bonus extra en dolares y xp (%400)
 
 
 🦊 • *Zorro:*  (próximamente)
 ➞ ${hfox} dolares
 ➞ bonus en ataques 
 ➞ Los cooldown se rebajan 30 segundos
 
 🍖 • *Comida para mascotas*:
  ➞ ${hpetfood} Pet token
  ➞ Sube de nivel tus mascotas
`

switch (shop) {
case 'gato': {
if (user.cat) throw 'ya tienes esa mascota!!'
if (user.money < hdog) throw 'te falta dinero!!'
user.money -= hdog
user.cat += 1
m.reply('*gracias por comprar a este lindo gatito*\n*(la curacion de vida sube un %4)*')
}
break
case 'perro': {
if (user.dog) throw 'ya tienes esa mascota!!'
if (user.money < hdog) throw 'te falta dinero!!'
user.money -= hdog
user.dog += 1
m.reply('*gracias por adoptar a un lindo perro*\n*(desde ahora las ganancias se duplicaran)*')
}
break
case 'zorro': {
if (user.fox) throw 'ya tienes esa mascota!!'
if (user.money < hfox) throw 'te falta dinero!!'
user.money -= hfox
user.fox += 1
m.reply('*gracias por adoptar a un zorro*\n*(bonus de ataque, cooldowns reducidos)*')
}
break
default: 
m.reply(txt)
}})

cmd({
pattern: "reparar",
alias: ["repair"],
desc: "reparar tus items",
category: "rpg",
},
async (conn, m, { args }) => {
let repairs =  (args[0] || '').toLowerCase()
let user = global.db.data.users[m.sender] 
let caption = `
*una hoja arrugada con recetas para reparar*

 *❏ Recetas*
 
*estas simples dos piedras y un poco de hierro*
*afilara tu hacha*
 ▧ Hacha 🪓
 〉2 roca
 〉2 hierro
 
 *un poco de hierro y madera hacen la diferencia*
 ▧ Pico ⛏️ 
 〉2 madera
 〉2 hierro
`

switch (repairs) {
case 'hacha': {
 if (user.axe < 0) throw '*primero crea un hacha, genio*'
 if (user.rock < 2|| user.iron < 2)  return conn.sendNyanCat(m.chat, '*te faltan materiales para craftear esto*', global.menu2, '[ I N F O ]', 'SIN MATERIALES', m)
 user.rock -= 2
 user.iron -= 2
 user.axedurability = 100
 m.reply('*porque puedes reparar esto...*\n*la logica vale verga porque acabas de reparar tu hacha!!*')
 }
 break
 
 case 'pico': {
 if (user.pickaxe < 0) throw '*primero crea un pico, genio*'
 if (user.iron < 5 || user.wood < 2) return conn.sendNyanCat(m.chat, '*te faltan materiales para craftear esto*', global.menu2, '[ I N F O ]', 'SIN MATERIALES', m)
 user.pickaxedurability = 100
 m.reply('*Bien, te acabas de reparar tu pico a madrazos. dejandolo como nuevo ⚒️*')
 }
 break
default:
conn.reply(m.sender, caption, fkontak)
}
})
cmd({
pattern: "claim",
alias: ["reclamar"],
desc: "reclama tu recompensa diaria",
category: "rpg",
},
async (conn, m) => {
let user = global.db.data.users[m.sender]
let rewards = {
exp: 9999 + user.dog * 1000,
money: 3000 + user.dog * 2000,
potion: 5 + user.cat * 4,
wood: 10,
diamond: 9,
iron: 12
} 
let cooldown = user.lastclaim + 86400000 - user.fox * 30
if (new Date - user.lastclaim < 86400000) throw `*❗ Ya reclamaste tu cofre diario*\n*espera ${msToTime(cooldown - new Date())} para volver a reclamar este cofre*`
let txt = ''
for (let reward of Object.keys(rewards)) {
if (!(reward in user)) continue
user[reward] += rewards[reward]
txt += `*+${rewards[reward]}* ${global.rpg.emoticon(reward)}\n`
}
conn.reply(m.chat, '*HAS CONSEGUIDO 🥳*\n' + txt, global.fkontak)
user.lastclaim = new Date() * 1
})

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

