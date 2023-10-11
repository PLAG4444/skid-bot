const { cmd } = require('./lib')

cmd({
pattern: "test"
desc: "hello world"
},
async (conn, m, args) => {
m.reply('hello world') 
})
