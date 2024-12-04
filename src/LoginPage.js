import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegação

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook de navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = { email, senha };

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', usuario);
      localStorage.setItem('token', response.data.token);
      console.log(response.data);  // Verifique se o token está vindo da API
      alert(response.data.message);  // Exibe a mensagem do backend (exemplo: "Login bem-sucedido")

      // Armazenando o token no localStorage

      // setErrorMessage('');  // Limpa qualquer erro de mensagem
      if (response.data.token) {
        navigate('/home');  // Redireciona para a página inicial se o token for recebido
      }
    } catch (error) {
      console.error('Erro no login:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message);  // Exibe erro se a resposta contiver uma mensagem
      } else {
        setErrorMessage('Erro de conexão ou servidor não disponível');  // Exibe erro caso o servidor não responda
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redireciona para a página de registro
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="form-label">Senha</label>
          <input
            type="password"
            id="senha"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      {/* Botão para redirecionar à página de cadastro */}
      <div className="mt-3 text-center">
        <button onClick={handleRegisterRedirect} className="btn btn-link">Criar uma conta</button>
      </div>
    </div>
  );
};

export default LoginPage;
