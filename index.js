// Create Server
const mc = require("minecraft-protocol");
const server = mc.createServer({
  motd:
    "\u00a7c\u21d2 Join to get an auth code\n" +
    "\u00a77Made with \u00a74\u2764 \u00a77by \u00a79Alles",
  maxPlayers: 1,
});

// Player Login
server.on("login", (client) => {
  console.log({
    id: client.profile.id,
    username: client.profile.name,
  });
  client.end("test");
});
