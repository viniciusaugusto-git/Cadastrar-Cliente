import express from "express";
import cors from "cors";
import path from "path";
import routerClient from "./routes/clients.route.js";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/index.html"));
});

// ROTAS CLIENTE
app.use("/api/client", routerClient);

app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000");
});