const { cmd, commands } = require(__dirname + '/commands')
const { modes, operators, randomInt, pickRandom, genMath } = require('./games/math')
const { TicTacToe } = require('./games/tictactoe.js')
const { makeWaSocket, protoType, serialize, smsg } = require('./auth/simple.js')
const store = require('./auth/store.js')
const { toAudio, toPTT, toVideo, ffmpeg } = require('./converters/converters.js')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif } = require('./converters/stickers.js')
const { growth, xpRange, findLevel, canLevelUp } = require('./others/levelling.js')
const { pinterest, formatByte, search } = require('./others/others.js')
const { fetchBuffer, getBuffer, buffergif, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, msToTime } = require('./others/fuctions.js')
const { Tiktok } = require('./scraper/tiktok.js')
const { TelegraPh, UploadFileUgu, webp2mp4File, floNime } = require('./scraper/uploader.js')
const { useSQliteauth } = require('./auth/auth.js')

module.exports = { 
cmd,
commands,
modes, 
operators, 
randomInt, 
pickRandom, 
genMath,
TicTacToe,
makeWaSocket,
protoType,
serialize,
smsg,
toAudio, 
toPTT, 
toVideo, 
ffmpeg, 
store,
imageToWebp, 
videoToWebp, 
writeExifImg, 
writeExifVid, 
writeExif,
growth,
xpRange,
findLevel,
canLevelUp,
pinterest,
formatByte,
search,
fetchBuffer, 
getBuffer, 
buffergif,
getGroupAdmins, 
formatp, 
tanggal, 
formatDate, 
getTime, 
isUrl, 
sleep, 
clockString, 
runtime, 
fetchJson, 
jsonformat, 
delay, 
format, 
logic, 
generateProfilePicture, 
parseMention, 
getRandom, 
msToTime,
Tiktok,
TelegraPh, 
UploadFileUgu, 
webp2mp4File, 
floNime,
addCommand: cmd,
useSQlite: useSQliteauth,
useSQliteauth
}
