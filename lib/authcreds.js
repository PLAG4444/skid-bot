const { proto } = require("@whiskeysockets/baileys/WAProto") 
const { Curve, signedKeyPair } = require("@whiskeysockets/baileys/lib/Utils/crypto") 
const { generateRegistrationId } = require("@whiskeysockets/baileys/lib/Utils/generics")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { randomBytes } = require("crypto") 
  
 const initAuthCreds = () => {
   const identityKey = Curve.generateKeyPair() 
   return { 
     noiseKey: Curve.generateKeyPair(), 
     signedIdentityKey: identityKey, 
     signedPreKey: signedKeyPair(identityKey, 1), 
     registrationId: generateRegistrationId(), 
     advSecretKey: randomBytes(32).toString("base64"), 
     processedHistoryMessages: [], 
     nextPreKeyId: 1, 
     firstUnuploadedPreKeyId: 1, 
     accountSettings: { 
       unarchiveChats: false, 
     }, 
   } 
 } 
const useLowDBAuthState = async (dbName = 'auth.db') => { 
  const adapter = new FileSync(dbName) 
  const db = low(adapter)

  db.defaults({ creds: {}, data: {} }).write()

  const readData = async (id) => {
    try {
      const data = db.get('data').get(id).value()
      return JSON.parse(data, BufferJSON.reviver)
    } catch (error) {
      return null
    }
  }

  const writeData = (data, id) => {
    const informationToStore = JSON.stringify(data, BufferJSON.replacer)
    db.set(`data.${id}`, informationToStore).write()
  }

  const removeData = async (id) => {
    db.unset(`data.${id}`).write()
  }

  const creds = (await readData('creds')) || initAuthCreds()

  return { 
     state: { 
       creds, 
       keys: { 
         get: async (type, ids) => { 
           const data = {} 
           await Promise.all( 
             ids.map(async (id) => { 
               let value = await readData(`${type}-${id}`) 
               if (type === "app-state-sync-key") { 
                 value = proto.Message.AppStateSyncKeyData.fromObject(data) 
               } 
               data[id] = value 
             }) 
           ) 
           return data 
         }, 
         set: async (data) => { 
           const tasks = [] 
           for (const category of Object.keys(data)) { 
             for (const id of Object.keys(data[category])) { 
               const value = data[category][id] 
               const key = `${category}-${id}` 
               tasks.push(value ? writeData(value, key) : removeData(key)) 
             } 
           } 
           await Promise.all(tasks) 
         }, 
       }, 
     }, 
     saveCreds: () => { 
       return writeData(creds, "creds") 
     }, 
   }
}

module.exports = useLowDBAuthState