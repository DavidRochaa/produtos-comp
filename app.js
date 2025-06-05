require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./config/db');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/produtos');
const inventoryRoutes = require('./routes/inventario');
const salesRoutes = require('./routes/vendas');
// const notificationRoutes = require('./routes/notificacao');

const app = express();
const path = require('path');
const relatorioRoutes = require('./routes/relatorio');


// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use(express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/relatorio', relatorioRoutes);
app.get('/relatorios.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'relatorios.html'));
});
app.get('/', (req, res) => {
  res.send(`
    <h1>Sistema de Mercado</h1>
    <p>API está funcionando!</p>
    <ul>
      <li><a href="/api/produtos">/api/produtos</a></li>
      <li><a href="/api/auth/login">/api/auth/login</a></li>
    </ul>
  `);
});
// app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Inicialização do banco de dados
initializeDatabase();

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});


// Rota fallback para qualquer página não encontrada (SPA-friendly)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


module.exports = app;