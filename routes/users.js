const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'isa',
  password: 'qwerpoiu',
  database: 'produtos_db',
});

// Rota para registrar um usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  // Verifica se o email já existe no banco
  const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(checkEmailQuery, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro no servidor' });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    try {
      const hashedPassword = await bcrypt.hash(senha, 10);  // Criptografa a senha

      const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
      db.query(query, [nome, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        }
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
      });
    } catch (err) {
      return res.status(500).json({ message: 'Erro ao processar a senha' });
    }
  });
});

// Rota para login (geração de token JWT)
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    const usuario = result[0];

    // Verifica a senha
    const validPassword = await bcrypt.compare(senha, usuario.senha);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido', token });
  });
});

module.exports = router;
