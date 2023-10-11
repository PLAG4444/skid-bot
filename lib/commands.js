var commands = []
const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({
id: { type: String,  unique: true ,required: true },
url: { type: String }
})
const plugindb = mongoose.model("Plugindb", pluginSchema )

 function cmd(info, func) { 
     var data = info 
     data.function = func 
     if (!data.dontAddCommandList) data.dontAddCommandList = false 
     if (!info.desc) info.desc = '' 
     if (!data.fromMe) data.fromMe = false 
     if (!info.category) data.category = 'misc' 
     if(!info.filename) data.filename = "Not Provided" 
     commands.push(data) 
     return data 
 } 
 module.exports = { 
     cmd, 
     AddCommand:cmd, 
     Function:cmd, 
     Module:cmd, 
     commands, 
     plugindb
 }