import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import routerClient from "./routes/clients.route.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontEndPath = path.join(__dirname, "../front-end");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(frontEndPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontEndPath, "index.html"));
});

app.use("/api/client", routerClient);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.status || 500;
  const message = error.message || "Erro interno do servidor";
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
