require("dotenv").config();

// Database
const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    logging: false,
  }
);
const Token = db.define(
  "token",
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    player: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { updatedAt: false }
);
db.sync();

// Create Server
const mc = require("minecraft-protocol");
const server = mc.createServer({
  motd:
    "\u00a7c\u21d2 Join to get an auth code\n" +
    "\u00a77Made with \u00a74\u2764 \u00a77by \u00a79Alles",
  maxPlayers: 1,
});

// Player Login
const { v4: uuid } = require("uuid");
const { generate: random } = require("randomstring");
server.on("login", async (client) => {
  // Generate Token
  const token = await Token.create({
    id: uuid(),
    token: random({
      length: 7,
      readable: true,
      capitalization: "uppercase",
    }),
    player: client.profile.id,
  });
  client.end(
    `\u00a77Your token is \u00a7a${token.token}\n\n` +
      `\u00a7cDo not enter this anywhere other than Alles.\n` +
      `Expires in 5 minutes.`
  );
});
