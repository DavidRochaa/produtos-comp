import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // Verifique se há um token
  if (!token) return false; // Se não há token, o usuário não está autenticado

  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decodificando o JWT
    const isExpired = decoded.exp < Date.now() / 1000; // Verifica se o token está expirado
    return !isExpired; // Se não expirou, é válido
  } catch (e) {
    return false; // Se não puder decodificar ou se o token for inválido
  }
};

// Componente de Rota Protegida
const PrivateRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);  // Estado de carregamento

  useEffect(() => {
    // Simula um tempo de carregamento para verificar a autenticação (opcional)
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);  // Limpa o timer quando o componente for desmontado
  }, []);

  if (loading) {
    return <div>Carregando...</div>;  // Exibe um carregamento enquanto verifica a autenticação
  }

  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
