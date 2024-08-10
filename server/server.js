import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import "./config/dotenv.js";

import bossesRouter from "./routes/bosses.js";

const app = express();

app.use("/pages", express.static("../client/pages"));
app.use("/assets", express.static("../client/assets"));
app.use("/styles", express.static("../client/styles"));
app.use("/scripts", express.static("../client/scripts"));

app.use("/pages/boss/:id", (_, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  res.sendFile(path.resolve(__dirname, "../client/pages/boss.html"));
});

app.use("/bosses", bossesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
