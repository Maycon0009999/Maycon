const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rota de cadastro de usuário
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    // Hash da senha antes de salvar no banco
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [name, email, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao cadastrar usuário." });
            }
            res.json({ message: "Usuário cadastrado com sucesso!" });
        }
    );
});

// Rota de login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Usuário não encontrado." });
        }

        // Comparar a senha digitada com a do banco
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Senha incorreta." });
        }

        res.json({ message: "Login bem-sucedido!", user: { name: user.name, email: user.email } });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
