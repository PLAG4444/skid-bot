const { cmd } = require('../lib')


cmd({
pattern: "getcase",
category: "owner",
owner: true,
}, async (conn, m, { text, args }) => {
if (!text) return m.reply(`no hay comando a buscar o que?`)  
try {  
bbreak = 'break'  
m.reply('case ' + `'${args[0]}'` + fs.readFileSync('./main.js').toString().split(`case '${args[0]}'`)[1].split(bbreak)[0] + bbreak)  
} catch (err) {  
console.error(err)  
m.reply(" Error, tal vez no existe el comando")  
}  
})