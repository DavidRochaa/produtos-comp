import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProdutosPage from './ProdutosPage';
import CadastroPage from './CadastroPage';
import LoginPage from './LoginPage';  // Página de Login
import PrivateRoute from './PrivateRoute';  // Componente PrivateRoute
import HomePage from './HomePage';  // Página inicial com funcionalidades de criar produto, listar produtos e carrinho
import CartPage from './CartPage';  // Página para carrinho de compras
import RegisterPage from './RegisterPage'; // Página de Criação de Conta
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redireciona a home page para o login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas protegidas */}
        <Route 
          path="/produtos" 
          element={<PrivateRoute element={<ProdutosPage />} />} 
        /> {/* Protegendo a rota de produtos */}

        <Route 
          path="/home" 
          element={<PrivateRoute element={<HomePage />} />} 
        />

        <Route 
          path="/cart" 
          element={<PrivateRoute element={<CartPage />} />} 
        />

        {/* Página de cadastro de produtos, protegida por token */}
        <Route 
          path="/cadastrar" 
          element={<PrivateRoute element={<CadastroPage />} />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
