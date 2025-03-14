const sqlite3 = require("sqlite3").verbose();

// Criar conexão com o banco de dados SQLite
const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Erro ao conectar no banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
    }
});

// Criar tabela de usuários se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

module.exports = db;
