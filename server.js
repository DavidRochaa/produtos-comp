// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const sql = require('mssql');
// const bodyParser = require('body-parser');
// const { generateToken, verifyToken } = require('./auth');
// const usersRouter = require('./routes/users');

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// // Configuração da conexão com SQL Server (Azure)
// const dbConfig = {
//   user: 'root-mercado',
//   password: 'c#<NFX(931Y]H|t',
//   server: 'gerenciamentomercado-dbserver.database.windows.net',
//   database: 'gerenciamentomercado-db',
//   port: 1433,
//   options: {
//     encrypt: true,
//     trustServerCertificate: false
//   }
// };

// // Middleware de pool
// async function getPool() {
//   try {
//     const pool = await sql.connect(dbConfig);
//     return pool;
//   } catch (err) {
//     console.error('Erro ao conectar no banco SQL Server:', err);
//     throw err;
//   }
// }

// // Rota principal
// app.get('/', (req, res) => {
//   res.redirect('/login');
// });

// // Rota de login simplificada
// app.post('/login', async (req, res) => {
//   const { email, senha } = req.body;
//   const usuario = { id: 1, email }; // Exemplo fictício
//   const token = await generateToken(usuario);
//   res.json({ token });
// });

// // Página de cadastro
// app.get('/register', (req, res) => {
//   res.send('Página de Criação de Conta');
// });

// // Usando as rotas de usuários
// app.use('/api/users', usersRouter);

// // Rota protegida de produtos
// app.get('/api/produtos', verifyToken, async (req, res) => {
//   try {
//     const pool = await getPool();
//     const result = await pool.request().query('SELECT * FROM produtos');
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('Erro ao listar produtos:', err);
//     res.status(500).send('Erro ao listar produtos');
//   }
// });

// // Verifica/cria tabelas se não existirem
// const checkAndCreateTables = async () => {
//   try {
//     const pool = await getPool();

//     // Verifica/cria tabela usuarios
//     const usuariosCheck = await pool.request().query(`
//       IF NOT EXISTS (
//         SELECT * FROM INFORMATION_SCHEMA.TABLES 
//         WHERE TABLE_NAME = 'usuarios'
//       )
//       BEGIN
//         CREATE TABLE usuarios (
//           id INT IDENTITY(1,1) PRIMARY KEY,
//           nome VARCHAR(100) NOT NULL,
//           email VARCHAR(100) NOT NULL UNIQUE,
//           senha VARCHAR(255) NOT NULL
//         )
//       END
//     `);
//     console.log('Verificação da tabela "usuarios" concluída.');

//     // Verifica/cria tabela fornecedores
//     const fornecedoresCheck = await pool.request().query(`
//       IF NOT EXISTS (
//         SELECT * FROM INFORMATION_SCHEMA.TABLES 
//         WHERE TABLE_NAME = 'fornecedores'
//       )
//       BEGIN
//         CREATE TABLE fornecedores (
//           id INT IDENTITY(1,1) PRIMARY KEY,
//           nome VARCHAR(100) NOT NULL,
//           cnpj VARCHAR(14) NOT NULL UNIQUE,
//           telefone VARCHAR(15) NOT NULL,
//           endereco VARCHAR(255)
//         )
//       END
//     `);
//     console.log('Verificação da tabela "fornecedores" concluída.');

//   } catch (err) {
//     console.error('Erro ao verificar/criar tabelas:', err);
//   }
// };

// checkAndCreateTables();

// // Inicia o servidor
// app.listen(5000, () => {
//   console.log('Servidor rodando na porta 5000');
// });

const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});