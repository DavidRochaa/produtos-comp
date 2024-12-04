const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET; // Usar chave secreta do arquivo .env

// Método para gerar o Token JWT
function generateToken(user) {
    const { id, email } = user; // Usando destructuring para facilitar
    const token = jwt.sign({ id, email }, secret, { expiresIn: '1h' });
    return token;
};

// Método para verificar a validade do token JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Acesso negado. Token não fornecido.' });
    }
  
    const tokenWithoutBearer = token.replace('Bearer ', '');  // Remove "Bearer " se houver
  
    // Verifica o token com a chave secreta
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
      }
  
      // Se o token for válido, salva as informações decodificadas (ex: id, email) no request
      req.user = decoded;
      next();
    });
  };

module.exports = { generateToken, verifyToken };
