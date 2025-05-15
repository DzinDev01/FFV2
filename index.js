/*
┏━━━━━━━━━━━━━━━┓  
┃ RIKZ BASE - WHATSAPP     
┣━━━━━━━━━━━━━━━┛
┃♕ Creator: ryzzxd         
┃♕ AI Helper: ChatGPT             
┃♔ Version: 1.0.0                   
┗━━━━━━━━━━━━━━━┛
*/
//========RIKZZ========
require('./system/config');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk')
const readline = require("readline") 
const { toBuffer, toDataURL } = require('qrcode')
const { smsg, fetchJson, await, sleep } = require('./system/lib/myfunction');
//======================
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})};
//====================== 
async function StartZenn() {
const { state, saveCreds } = await useMultiFileAuthState('./session') 

const getMessage = async (key) => {
		if (store) {
			const msg = await store.loadMessage(key.remoteJid, key.id);
			return msg?.message || ''
		}
		return {
			conversation: 'Halo Saya Naze Bot'
		}
	}
	
const rikz = makeWASocket({
logger: pino({ level: "silent" }), 
getMessage, 
syncFullHistory: true, 
maxMsgRetryCount: 15, 
retryRequestDelayMs: 10, 
connectTimeoutMs: 60000, 
printQRInTerminal: true, 
defaultQueryTimeoutMs: undefined,
generateHighQualityLinkPreview: true, 
cachedGroupMetadata: async (jid) => groupCache.get(jid), 
transactionOpts: {
			maxCommitRetries: 10,
			delayBetweenTriesMs: 10,
		},
		appStateMacVerification: {
			patch: true,
			snapshot: true,
		},
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]
});
//======================
rikz.public = global.publik
//======================
rikz.ev.on("connection.update", async (update) => {
const { qr, connection, lastDisconnect } = update;
if (connection === "close") {
const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
const reconnect = () => StartZenn();
const reasons = {
[DisconnectReason.badSession]: "Bad Session, hapus session dan scan ulang!",
[DisconnectReason.connectionClosed]: "Koneksi tertutup, mencoba menghubungkan ulang...",
[DisconnectReason.connectionLost]: "Koneksi terputus dari server, menghubungkan ulang...",
[DisconnectReason.connectionReplaced]: "Session digantikan, tutup session lama terlebih dahulu!",
[DisconnectReason.loggedOut]: "Perangkat keluar, silakan scan ulang!",
[DisconnectReason.restartRequired]: "Restart diperlukan, memulai ulang...",
[DisconnectReason.timedOut]: "Koneksi timeout, menghubungkan ulang..."};
console.log(reasons[reason] || `Unknown DisconnectReason: ${reason}`);
(reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced) ? rikz() : reconnect()}
if (connection === "open") { 
if (qr) {
			app.use('/qr', async (req, res) => {
				res.setHeader('content-type', 'image/png')
				res.end(await toBuffer(qr))
			});
		}
let cnnc = `🕒sᴄʀɪᴘᴛ ʙᴇʀʜᴀsɪʟ ᴛᴇʀʜᴜʙᴜɴɢ ᴅᴇᴠ\n> ©ryzz`;
            await console.clear()
console.log(chalk.red.bold("-[ WhatsApp Terhubung! ]"));
}});
//==========================//
rikz.ev.on("messages.upsert", async ({
messages,
type
}) => {
try {
const msg = messages[0] || messages[messages.length - 1]
if (type !== "notify") return
if (!msg?.message) return
if (msg.key && msg.key.remoteJid == "status@broadcast") return
const m = smsg(rikz, msg, store)
require(`./system/whatsapp`)(rikz, m, msg, store)
} catch (err) { console.log((err)); }})
//=========================//
rikz.decodeJid = (jid) => {
if (!jid) return jid;
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {};
return decode.user && decode.server && decode.user + '@' + decode.server || jid;
} else return jid;
};
//=========================//
rikz.sendText = (jid, text, quoted = '', options) => rikz.sendMessage(jid, { text: text, ...options }, { quoted });
rikz.ev.on('contacts.update', update => {
for (let contact of update) {
let id = rikz.decodeJid(contact.id);
if (store && store.contacts) {
store.contacts[id] = { id, name: contact.notify };
}
}
});
rikz.ev.on('creds.update', saveCreds);
return rikz;
}
//=============================//
console.log(chalk.green.bold(
`⠀⠀⠀⠀⠀⠀⠀⢀⡔⠝⠁⠀⠀⠀⠀⠀⠀⠀⠀⠐⠌⠂⢄⠀
⠀⠀⠀⠀⡠⢒⣾⠟⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠜⣷⠢⢴⡠⠤⠤⡀
⠀⠀⢀⣜⣴⣿⡏⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣷⡌⢃⠁⠀⠌
⠀⣰⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣮⣧⢈⠄
⡾⠑⢜⢯⡛⡿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢋⠃⠿⡙⡝⢷⡀
⢾⣞⡌⣌⢡⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⢠⢘⡘⢸⢁⣟⣨⣿
⠀⠿⣿⣾⣼⣼⡇⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⣀⣧⠀⢸⠀⢸⣿⣷⣿⣿⡿⢻⠛
⠀⠀⢈⣿⡿⡏⠀⢠⠞⣶⣶⣦⡒⠄⠈⠀⠁⣡⣴⣦⣾⠇⠀⠀⠛⣟⠛⢃⠀⠀
⠀⠀⠌⣧⢻⠀⠀⠀⠢⣳⣯⠍⠈⠀⠀⠀⠀⠁⠯⠉⢗⡄⠀⠀⡀⢸⠢⡀⢢⠀
⠀⠘⢰⠃⣸⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣷⣤⡑
⠀⡠⢃⣴⠏⠀⠀⠀⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⣿⡗⠹
⠔⢀⡎⡇⠀⠀⡄⠀⢸⣦⡀⠀⠀⠀⠶⠿⡇⠀⠀⣠⣾⠁⠀⣴⠀⠀⢰⣿⠁⠀
⣠⣿⠁⡇⢰⠀⢰⠀⠈⣿⣿⡖⠤⣀⠀⠀⣀⢤⣾⢻⡿⠀⢠⠀⢠⠀⣿⡟⠀⠀
⣾⣿⠀⢃⠈⠀⠈⡄⢰⡸⢫⡇⠀⠀⠈⠉⠀⢸⠉⠺⡇⠀⡞⡄⣈⡀⣿⢁⠀⠀
⣿⣿⠀⠸⡄⢃⠄⣘⠸⡂⠪⣄⠀⠀⠀⠀⠀⠈⡄⡰⡃⢼⡧⠁⠛⢳⠧⠅⠈⠀
      ${chalk.red.bold("[ RYZZ - 𝗪𝗔 ]")} 
────────────────────────────
 𝙰𝚞𝚝𝚑𝚘𝚛 : Ryzz (𝚒𝚝𝚣𝚖𝚎) 
 𝙷𝚎𝚕𝚙𝚎𝚛 : 𝙲𝚑𝚊𝚝𝙶𝙿𝚃 (𝚘𝚙𝚎𝚗𝚊𝚒)  
────────────────────────────`));
StartZenn()
//======================