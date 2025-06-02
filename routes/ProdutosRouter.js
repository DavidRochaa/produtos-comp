const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'isa',
  password: 'qwerpoiu',
  database: 'produtos_db',
});

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Acesso negado');

  try {
    const verified = jwt.verify(token, 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Token inválido');
  }
}

// Rota para adicionar produto (exemplo de manutenção)
router.put('/produtos/:id', verifyToken, (req, res) => {
  const { nome, descricao, preco } = req.body;
  const produtoId = req.params.id;
  
  const query = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
  db.query(query, [nome, descricao, preco, produtoId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
    res.json({ message: 'Produto atualizado com sucesso!' });
  });
});

module.exports = router;
