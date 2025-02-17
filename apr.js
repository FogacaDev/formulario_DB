const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware para permitir requisições CORS
app.use(cors());

// Middleware para tratar JSON
app.use(express.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Substitua com sua senha do MySQL
    database: 'apr_digitalDB'
});

// Verificação da conexão com o banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro de conexão com o banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota para receber os dados do formulário e salvar no banco
app.post('/submit', (req, res) => {
    const { email, password, address, address2, city, state, zip, checkbox } = req.body;

    // Query para inserir os dados no banco
    const query = 'INSERT INTO users (email, password, address, address2, city, state, zip, checkbox) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [email, password, address, address2, city, state, zip, checkbox], (err, result) => {
        if (err) {
            console.error('Erro ao salvar dados: ', err);
            return res.json({ success: false, message: 'Erro ao salvar dados' });
        }
        console.log('Dados inseridos com sucesso:', result);
        res.json({ success: true, message: 'Dados enviados com sucesso!' });
    });
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
