const mc = require("minecraft-protocol");
const server = mc.createServer({ maxPlayers: 1 });

// Update Server Info
const s = "\u00a7";
const motd = [
  `3Follow ${s}b@alleshq${s}3 on Twitter`,
  `2This server runs on renewable energy!`,
  `7Made with ${s}4\u2764 ${s}7by ${s}9Alles`,
  `9https://mcauth.alles.cx`,
];
let m = 0;
const updateInfo = () => {
  if (m >= motd.length - 1) m = 0;
  else m++;
  server.motd = `${s}c\u21d2 Join to get an auth code\n${s}${motd[m]}`;
};
setInterval(updateInfo, 1000);
updateInfo();
