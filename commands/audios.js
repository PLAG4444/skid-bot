const { cmd } = require('../lib')
cmd({
on: "text",
},
async (conn, m, { body, args, text }) => {
if (/^hola$/i.test(m.text)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Hola.mp3' 
     conn.sendAudio(m.chat, vn, m)
   }
  
   if (body.match(/(anadieleimporta|a nadie le importa)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/dylan1.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(araara|ara ara)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Ara.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(miarda de bot|mierda de bot|mearda de bot|Miarda de Bot|Mierda de Bot|Mearda de Bot)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/insultar.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(bañate|Bañate)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Banate.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(baneado|Baneado)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/baneado.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(bebito fiu fiu|bff|Bebito Fiu Fiu|Bff)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/bff.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(buenas noches|Buenas noches|Boanoite|boanoite)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/boanoite.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(buenas tardes|Buenas tardes|boatarde|Boatarde)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/boatarde.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(buenos dias|Buenos dias|buenos dias|Buenos dias)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Buenos-dias-2.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(chica lgante|Chica lgante|Chicalgante|chicalgante|chical gante|Chical gante)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/chica lgante.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(giagnosticadocongay|diagnosticado con gay|diagnosticado gay|te diagnÃ³stico con gay|diagnÃ³stico gay|te diagnostico con gay|te diagnÃ³stico con gay|te diagnosticÃ³ con gay|te diagnostico con gay)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/DiagnosticadoConGay.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(es puto|eeesss putoo|es putoo|esputoo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Es putoo.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(feliz cumpleaños|felizcumpleaños|happy birthday)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Feliz cumple.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Fiesta del admin|fiesta del admin)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/admin.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(fiesta del administrador)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/fiesta.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(fiesta del admin 3|atencion grupo|atencion grupo|aviso importante|fiestadeladmin3)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Fiesta1.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(gemidos|gemime|gime|gemime|gemi2)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/gemi2.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(audio hentai|Audio hentai|audiohentai|Audiohentai)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/hentai.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(sexo|Sexo|Hora de sexo|hora de sexo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/maau1.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(laoracion|La biblia|La oracion|La biblia|La oracion|la biblia|La Biblia)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/ora.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Marica tu|cancion1|Marica quien)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/cancion.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(MuriÃ³ el grupo|Murio el grupo|murio el grupo|muriò el grupo|Grupo muerto|grupo muerto)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Murio.m4a' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Feliz navidad|feliz navidad|Merry Christmas|merry chritmas)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/navidad.m4a' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(noche de paz|Noche de paz|Noche de amor|noche de amor|Noche de Paz)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Noche.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Nyapasu|Nyanpasu|nyapasu|Nyapasu|Gambure|Yabure)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/otaku.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(ho me vengo|oh me vengo|o me vengo|Ho me vengo|Oh me vengo|O me vengo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/vengo.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(oni-chan|onichan|o-onichan)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Onichan.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Pasa pack|vendes tu nudes|pasa video hot|pasa tu pack|pasa fotos hot|vendes tu pack|Vendes tu pack|Vendes tu pack?|vendes tu pack|Pasa Pack Bot|pasa pack Bot|pasa tu pack Bot|PÃ¡same tus fotos desnudas|pÃ¡same tu pack|me pasas tu pak|me pasas tu pack|pasa pack)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Elmo.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(QuiÃ©n es tu senpai botsito 7u7|Quien es tu senpai botsito 7u7|QuiÃ©n es tu sempai botsito 7u7|Quien es tu sempai botsito 7u7|QuiÃ©n es tu senpai botsito 7w7|Quien es tu senpai botsito 7w7|quiÃ©n es tu senpai botsito 7u7|quien es tu senpai botsito 7u7|QuiÃ©n es tu sempai botsito 7w7|Quien es tu sempai botsito 7w7|QuiÃ©n es tu senpai botsito|Quien es tu senpai botsito|QuiÃ©n es tu sempai botsito|Quien es tu sempai botsito|QuiÃ©n es tu senpai botsito|Quien es tu senpai botsito|quiÃ©n es tu senpai botsito|quien es tu senpai botsito|QuiÃ©n es tu sempai botsito|Quien es tu sempai botsito)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Tu.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(rawr|Rawr|RAWR|raawwr|rraawr|rawwr)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/rawr.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(siu|siiuu|ssiiuu|siuuu|siiuuu|siiiuuuu|siuuuu|siiiiuuuuu|siu|SIIIIUUU)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/siu.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(te amo|teamo)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Te-amo.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(ooo tio|tio que rico)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/oh_tio.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(un Pato| un pato|un pato que va caminando alegremente|Un pato|Un Pato)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/pato.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(UwU|uwu|Uwu|uwU|UWU)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/UwU.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(vetealavrg|vete a la vrg|vete a la verga)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/vete a la verga.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(fiesta viernes|viernes|Viernes|viernes fiesta)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/viernes.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(vivan!!|vivan los novios|vivanlosnovios)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/vivan.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(Yamete|yamete|Yamete kudasai|yamete kudasai)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Yamete-kudasai.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(epico|esto va a ser epico)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/Epico.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(shitpost)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/shitpost.mp3' 
     conn.sendAudio(m.chat, vn, m)
   } 
  
   if (body.match(/(no digas eso papu)/gi)) { 
     if (!global.db.data.chats[m.chat].audios) return 
     const vn = '../audios/nopapu.mp3' 
     conn.sendAudio(m.chat, vn, m)
   }
})