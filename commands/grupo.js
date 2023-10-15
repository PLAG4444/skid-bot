const { cmd } = require('../lib')

cmd({
pattern: "hidetag",
desc: "taguea a todos los usuarios"
category: 'grupos'
}, 
async (conn, m) => {
    if (!m.isGroup) return m.reply(mess.group)
    if (!isGroupAdmins) return m.reply(mess.admin)
    if (isGroupAdmins && !m.quoted || isCreator && !m.quoted ) {  
      conn.sendMessage(m.chat, { text: text ? text : "", mentions: participants.map((a) => a.id) }, { quoted: m })  
    }
    if (isCreator && m.quoted || isGroupAdmins && m.quoted) return conn.sendMessage(m.chat, { forward: m.quoted.fakeObj, mentions: participants.map(a => a.id) }, { quoted: m }) // Mario is going to steal it
})