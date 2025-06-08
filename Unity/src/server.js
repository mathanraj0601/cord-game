const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const app = express();

// Resolve the path relative to the current file directory
const gameDir = path.join(__dirname, "unity-cord-game");

app.use(
  serveStatic(gameDir, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".wasm.br")) {
        res.setHeader("Content-Encoding", "br");
        res.setHeader("Content-Type", "application/wasm");
      } else if (filePath.endsWith(".js.br")) {
        res.setHeader("Content-Encoding", "br");
        res.setHeader("Content-Type", "application/javascript");
      } else if (filePath.endsWith(".data.br")) {
        res.setHeader("Content-Encoding", "br");
        res.setHeader("Content-Type", "application/octet-stream");
      } else if (filePath.endsWith(".br")) {
        res.setHeader("Content-Encoding", "br");
      }
    },
  })
);

app.listen(8000, () => {
  console.log("Server has started at http://localhost:8000/");
});
