// backend/routes/fornecedores.js
const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const router = express.Router();

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'projetob1', 
  password: '1234',
  database: 'produtos_db',
});

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

// Rota para listar fornecedores
router.get('/fornecedores', verifyToken, (req, res) => {
  const query = 'SELECT * FROM fornecedores';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao carregar fornecedores' });
    }
    res.json(result);
  });
});

module.exports = router;
