 const chalk = require('chalk') 
 const fs = require('fs') 
 const Crypto = require('crypto') 
 const axios = require('axios') 
 const pino = require('pino') 
 const moment = require('moment-timezone') 
 const { sizeFormatter } = require('human-readable') 
 const util = require('util') 
 const jimp = require('jimp') 

exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
        let extension = mime.split('/')[1]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
}



exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
            .then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = exports.bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error')
        }
    })
}


const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds


function msToTime(duration) { 
   const milliseconds = parseInt((duration % 1000) / 100); 
   let seconds = Math.floor((duration / 1000) % 60); 
   let minutes = Math.floor((duration / (1000 * 60)) % 60); 
   let hours = Math.floor((duration / (1000 * 60 * 60)) % 24); 
  
   hours = (hours < 10) ? '0' + hours : hours; 
   minutes = (minutes < 10) ? '0' + minutes : minutes; 
   seconds = (seconds < 10) ? '0' + seconds : seconds; 
  
   return hours + ' Horas ' + minutes + ' Minutos y ' + seconds + ' segundos'
   }

exports.msToTime = msToTime

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}


exports.fetchBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
    //𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗
	var dDisplay = d < 10 ? String("𝟎" + d) : d >= 10 ? String(d) : "𝟎𝟎";
	var hDisplay = h < 10 ? String("𝟎" + h) : h >= 10 ? String(h) : "𝟎𝟎";
	var mDisplay = m < 10 ? String("𝟎" + m) : m >= 10 ? String(m) : "𝟎𝟎";
	var sDisplay = s < 10 ? String("𝟎" + s) : s > 10 ? String(s) : "𝟎𝟎";
    dDisplay = dDisplay.replace(/1/g, "𝟏")
    dDisplay = dDisplay.replace(/2/g, "𝟐")
    dDisplay = dDisplay.replace(/3/g, "𝟑")
    dDisplay = dDisplay.replace(/4/g, "𝟒")
    dDisplay = dDisplay.replace(/5/g, "𝟓")
    dDisplay = dDisplay.replace(/6/g, "𝟔")
    dDisplay = dDisplay.replace(/7/g, "𝟕")
    dDisplay = dDisplay.replace(/8/g, "𝟖")
    dDisplay = dDisplay.replace(/9/g, "𝟗")
    hDisplay = hDisplay.replace(/1/g, "𝟏")
    hDisplay = hDisplay.replace(/2/g, "𝟐")
    hDisplay = hDisplay.replace(/3/g, "𝟑")
    hDisplay = hDisplay.replace(/4/g, "𝟒")
    hDisplay = hDisplay.replace(/5/g, "𝟓")
    hDisplay = hDisplay.replace(/6/g, "𝟔")
    hDisplay = hDisplay.replace(/7/g, "𝟕")
    hDisplay = hDisplay.replace(/8/g, "𝟖")
    hDisplay = hDisplay.replace(/9/g, "𝟗")
    mDisplay = mDisplay.replace(/1/g, "𝟏")
    mDisplay = mDisplay.replace(/2/g, "𝟐")
    mDisplay = mDisplay.replace(/3/g, "𝟑")
    mDisplay = mDisplay.replace(/4/g, "𝟒")
    mDisplay = mDisplay.replace(/5/g, "𝟓")
    mDisplay = mDisplay.replace(/6/g, "𝟔")
    mDisplay = mDisplay.replace(/7/g, "𝟕")
    mDisplay = mDisplay.replace(/8/g, "𝟖")
    mDisplay = mDisplay.replace(/9/g, "𝟗")
    sDisplay = sDisplay.replace(/1/g, "𝟏")
    sDisplay = sDisplay.replace(/2/g, "𝟐")
    sDisplay = sDisplay.replace(/3/g, "𝟑")
    sDisplay = sDisplay.replace(/4/g, "𝟒")
    sDisplay = sDisplay.replace(/5/g, "𝟓")
    sDisplay = sDisplay.replace(/6/g, "𝟔")
    sDisplay = sDisplay.replace(/7/g, "𝟕")
    sDisplay = sDisplay.replace(/8/g, "𝟖")
    sDisplay = sDisplay.replace(/9/g, "𝟗")
    dDisplay = dDisplay.replace(/0/g, "𝟎")
    hDisplay = hDisplay.replace(/0/g, "𝟎")
    mDisplay = mDisplay.replace(/0/g, "𝟎")
    sDisplay = sDisplay.replace(/0/g, "𝟎")

	return dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.buffergif = async (image) => {
const filename = `${Math.random().toString(36)}`
await fs.writeFileSync(`./temp/${filename}.gif`, image)
child_process.exec(`ffmpeg -i ./temp/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./temp${filename}.mp4`)
await sleep(4000)
var buffer5  =  await  fs.readFileSync(`./temp/${filename}.mp4`)
Promise.all([unlink(`./temp/${filename}.mp4`), unlink(`./temp/${filename}.gif`)])
return buffer5
}



exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); // promises?
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
				myDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
				return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

function delay(ms) {
	return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

function format(...args) {
	return util.format(...args)
}

exports.logic = (check, inp, out) => {
	if (inp.length !== out.length) throw new Error('Input and Output must have same length')
	for (let i in inp)
		if (util.isDeepStrictEqual(check, inp[i])) return out[i]
	return null
}

exports.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participantes) => {
	const admins = []
	for (let i of participantes) {
		i.admin ? admins.push(i.id) : ''
	}
	return admins
}