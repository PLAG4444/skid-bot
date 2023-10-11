const { cmd } = require('./lib')

cmd({
pattern: "test777",
desc: "hello world",
category: "general",
filename: __filename,
},
async (conn, m, text) => {
m.reply('hello world') 
})
