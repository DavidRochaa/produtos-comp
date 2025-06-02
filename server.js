// Importando dependências
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { generateToken, verifyToken } = require('./auth');  // Importando as funções do auth.js
const usersRouter = require('./routes/users');  // Importando as rotas de usuários

const app = express();

// Configuração de middlewares
app.use(cors());
app.use(bodyParser.json()); // Para processar JSON no corpo da requisição

// Rota principal redirecionando para a página de login
app.get('/', (req, res) => {
  res.redirect('/login'); 
});

// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Verificar se as credenciais são válidas (exemplo simplificado)
    const usuario = { id: 1, email }; // Aqui você consultaria seu banco de dados

    const token = await generateToken(usuario); // Gera o token JWT
    res.json({ token }); // Retorna o token para o cliente
});

// Rota de cadastro (signup)
app.get('/register', (req, res) => {
  res.send('Página de Criação de Conta');
});

// Usando as rotas de usuários
app.use('/api/users', usersRouter);  // Prefixando todas as rotas de usuário com '/api/users'

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'isa',
  password: 'qwerpoiu',
  database: 'produtos_db',
});

// Conectando ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Adicionando a rota para '/api/produtos' com proteção de token
app.get('/api/produtos', verifyToken, async (req, res) => {
  try {
    // Consultando todos os produtos da tabela 'produtos'
    const [rows] = await db.promise().query('SELECT * FROM produtos');
    res.json(rows);  // Retorna os produtos como resposta JSON
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).send('Erro ao listar produtos');
  }
});

// Função para verificar e criar as tabelas 'usuarios' e 'fornecedores' (já está no seu código)
const checkAndCreateTables = async () => {
  try {
    // Verificando e criando a tabela 'usuarios'
    const [usuarioRows] = await db.promise().query(`
      SELECT * FROM information_schema.tables 
      WHERE table_schema = 'produtos_db' AND table_name = 'usuarios';
    `);

    if (usuarioRows.length === 0) {
      const createUsuariosTableQuery = `
        CREATE TABLE usuarios (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          senha VARCHAR(255) NOT NULL
        );
      `;
      await db.promise().query(createUsuariosTableQuery);
      console.log('Tabela "usuarios" criada com sucesso!');
    } else {
      console.log('A tabela "usuarios" já existe.');
    }

    // Verificando e criando a tabela 'fornecedores'
    const [fornecedoresRows] = await db.promise().query(`
      SELECT * FROM information_schema.tables 
      WHERE table_schema = 'produtos_db' AND table_name = 'fornecedores';
    `);

    if (fornecedoresRows.length === 0) {
      const createFornecedoresTableQuery = `
        CREATE TABLE fornecedores (
          id INT AUTO_INCREMENT PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          cnpj VARCHAR(14) NOT NULL UNIQUE,
          telefone VARCHAR(15) NOT NULL,
          endereco VARCHAR(255)
        );
      `;
      await db.promise().query(createFornecedoresTableQuery);
      console.log('Tabela "fornecedores" criada com sucesso!');
    } else {
      console.log('A tabela "fornecedores" já existe.');
    }

  } catch (err) {
    console.error('Erro ao verificar/criar as tabelas:', err);
  }
};

// Chama a função para verificar e criar as tabelas quando o servidor iniciar
checkAndCreateTables();

// Rodando o servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
