// backend/routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'projetob1',
  password: '1234',
  database: 'produtos_db',
});


// Rota de registro (cadastro de usuário)
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificando se o email já está cadastrado
    const [rows] = await db.promise().query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografando a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserindo o novo usuário no banco de dados
    const [result] = await db.promise().query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

module.exports = router;
