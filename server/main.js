const express = require("express");
const cors = require("cors");
const path = require("path");

// Routers
const monstersRouter = require("./routers/monstersRouter");
const encounterRouter = require("./routers/encounterRouter");

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// 🔁 Live reload (development only)
if (process.env.NODE_ENV !== "production") {
  const livereload = require("livereload");
  const connectLivereload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "..", "client"));

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLivereload());
}

// 📂 Serve static files from 'client'
app.use(express.static(path.join(__dirname, "..", "client")));

// 🌐 Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "pages", "home.html"));
});

app.use("/api/monsters", monstersRouter);
app.use("/api/encounter", encounterRouter);

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
