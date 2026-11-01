require("dotenv").config({ path: "./.env" });

const { createApp } = require("./app");
const { close } = require("./db");

const port = Number(process.env.PORT) || 3011;
const app = createApp();
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`codereader-server listening on ${port}`);
});

function shutdown() {
  server.close(() => {
    close();
    process.exit(0);
  });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
