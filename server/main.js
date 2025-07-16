const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const monstersRouter = require("./routers/monstersRouter");

app.use("/api/monsters", monstersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});