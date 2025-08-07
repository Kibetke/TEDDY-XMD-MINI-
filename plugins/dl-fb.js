const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook"],
  desc: "Download Facebook video using link",
  category: "download",
  filename: __filename
}, async (conn, m, match, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ *Usage:* fb <Facebook Video URL>");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    // Tumia API yako ya Vercel
    const { data } = await axios.get(`https://nova-downloadbmb.vercel.app/api/fb?url=${encodeURIComponent(q)}`);

    if (!data || !data.videoUrl) {
      return reply("⚠️ *Failed to fetch Facebook video. Please try another link.*");
    }

    const caption = `📹 *Facebook Video*\n🎬 *Title:* ${data.title || 'No Title'}\n\n🔗 *Powered by TEDDY-XMD ✅*`;

    await conn.sendMessage(from, {
      video: { url: data.videoUrl },
      mimetype: "video/mp4",
      caption: caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363421104812135@newsletter",
          newsletterName: "TEDDY-XMD",
          serverMessageId: 144
        }
      }
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (err) {
    console.error("Facebook Downloader Error:", err);
    reply("❌ *An error occurred while processing your request. Please try again later.*");
  }
});
