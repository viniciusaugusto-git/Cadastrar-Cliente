import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(express.json());

// 👉 SERVIR ARQUIVOS DO FRONT
app.use(express.static(path.join(__dirname, "../front-end")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../front-end/index.html"));
});

app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000");
});