const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "support",
  alias: ["supportgroup", "help", "channel"],
  desc: "Get TEDDY-XMD support, channel & developer contact",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {

  const jtime = moment.tz('Africa/Nairobi').format("HH:mm:ss");
  const jdate = moment.tz('Africa/Nairobi').format("DD/MM/YY");

  // 🧾 Fake Verified Contact
  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "TEDDY | XMD",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:TEDDY | XMD\nORG:TEDDY;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const contextInfo = {
    externalAdReply: {
      title: "📞 TEDDY-XMD • Support & Channel",
      body: `🕒 ${jtime} | 📅 ${jdate}`,
      thumbnailUrl: 'https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n',
      sourceUrl: 'https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n',
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    },
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363421104812135@newsletter",
      newsletterName: "TEDDY-XMD Official"
    }
  };

  const supportText = `*🛠️ TEDDY-XMD Support Center*\n\n╭─❍ *Support Links*\n│👥 Group: https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n?\n│📡 Channel: https://whatsapp.com/channel/0029Vb6NveDBPzjPa4vIRt3n\n│📞 Dev: wa.me/254799963583 (TEDDY)\n╰───────────────╮\n\n📌 Feel free to ask for help, request features or report bugs.\n\n⏰ *Time:* ${jtime}\n📅 *Date:* ${jdate}\n\n*Powered by Teddy-Tech*`;

  await Void.sendMessage(m.chat, {
    text: supportText,
    contextInfo
  }, { quoted: fakeContact });
});
