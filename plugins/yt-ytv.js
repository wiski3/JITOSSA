import fetch from 'node-fetch';

let handler = async (m, { conn, args, command, usedPrefix }) => {
    try {
        if (!args[0]) throw `*تحميـل الفيديوهـات من  YouTube*\nمثـال: ${usedPrefix + command} https://www.youtube.com/watch?v=UUfVNNrihNs`;

        const pattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = args[0].match(pattern);
        if (!match) throw 'رابط YouTube غير صالح';
        const videoId = match[1];
        
        await conn.reply(m.chat, `جاري جلب الفيديو بأعلى جودة...\n${wait}`, m);

        const url = 'https://aemt.me/' + encodeURIComponent(videoId) + '.mp4?filter=&quality=high&contenttype=video/mp4';

        const response = await fetch(url, {
            headers: {
                'Connection': 'keep-alive',
            }
        });

        if (!response.ok) throw 'فشل جلب الفيديو';

        const buffer = await response.buffer();
        
        await conn.sendFile(m.chat, buffer, `${videoId}_الجودة_العالية.mp4`, `فيديو بأعلى جودة \n \n ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊɪᴛᴏssᴀ`, m);
    } catch (error) {
        console.error('خطأ في الجلب:', error);
        conn.reply(m.chat, error, m);
    }
};

handler.command = /^(getvid|ytmp4|youtubemp4|ytv|youtubevideo)$/i;
handler.help = ['ytmp4 <رابطYT>', 'youtubemp4 <رابطYT>'];
handler.tags = ['downloader'];

export default handler;