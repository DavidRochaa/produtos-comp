const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

// Conexão com banco (pode ser exportado em outro arquivo se quiser centralizar)
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'projetob1',
  password: '1234',
  database: 'produtos_db',
});

// Middleware de verificação JWT
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

// 🔁 Rota para registrar entrada ou saída
router.post('/estoque/movimentar', verifyToken, (req, res) => {
  const { produto_id, quantidade, tipo } = req.body;

  if (!['entrada', 'saida'].includes(tipo)) {
    return res.status(400).json({ message: 'Tipo de movimentação inválido' });
  }

  const query = 'INSERT INTO estoque (produto_id, quantidade, tipo_movimentacao) VALUES (?, ?, ?)';
  db.query(query, [produto_id, quantidade, tipo], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao registrar movimentação', error: err });
    }
    res.json({ message: `Movimentação de ${tipo} registrada com sucesso!` });
  });
});

// Rota para consultar saldo atual do produto
router.get('/estoque/saldo/:produto_id', verifyToken, (req, res) => {
  const produtoId = req.params.produto_id;

  const query = `
    SELECT
      SUM(CASE WHEN tipo_movimentacao = 'entrada' THEN quantidade ELSE 0 END) AS total_entrada,
      SUM(CASE WHEN tipo_movimentacao = 'saida' THEN quantidade ELSE 0 END) AS total_saida
    FROM estoque
    WHERE produto_id = ?
  `;

  db.query(query, [produtoId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao consultar saldo', error: err });
    }

    const entrada = results[0].total_entrada || 0;
    const saida = results[0].total_saida || 0;
    const saldo = entrada - saida;

    res.json({ produto_id: produtoId, saldo });
  });
});

module.exports = router;
