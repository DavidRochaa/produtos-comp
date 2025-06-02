import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Para verificar se o usuário está autenticado
  const navigate = useNavigate(); // Hook para navegação

  // Função para verificar o token JWT
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');  // Verificando o token no localStorage
    if (!token) {
      setIsAuthenticated(false);  // Se não houver token, redireciona para o login
    }
  };

  // Efeito para verificar a autenticação quando a página for carregada
  useEffect(() => {
    checkAuthentication();

    // Carrega os itens do carrinho armazenados no localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCarrinho(JSON.parse(storedCart));  // Atualiza o estado com os itens do carrinho
    }
  }, []);

  // Função para adicionar um produto ao carrinho
  const addToCart = (produto) => {
    const existingProduct = carrinho.find(item => item.id === produto.id);
    let updatedCarrinho;

    if (existingProduct) {
      // Se o produto já existe no carrinho, aumenta a quantidade
      updatedCarrinho = carrinho.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      // Se não existe no carrinho, adiciona o produto
      updatedCarrinho = [...carrinho, { ...produto, quantidade: 1 }];
    }

    setCarrinho(updatedCarrinho);
    localStorage.setItem('cart', JSON.stringify(updatedCarrinho));  // Atualiza o localStorage
  };

  // Função para remover um item do carrinho
  const removeFromCart = (produtoId) => {
    const updatedCart = carrinho.filter((produto) => produto.id !== produtoId);
    setCarrinho(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Atualiza o localStorage
  };

  // Função para calcular o total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
  };

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Carrinho de Compras</h1>

      {/* Exibe a lista de produtos no carrinho */}
      <ul className="list-group">
        {carrinho.length > 0 ? (
          carrinho.map((produto, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {produto.nome} - R$ {produto.preco} x {produto.quantidade}
              <button 
                className="btn btn-danger ms-3"
                onClick={() => removeFromCart(produto.id)}
              >
                Remover
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">Carrinho vazio</li>
        )}
      </ul>

      {/* Total do carrinho */}
      <h3 className="mt-3">Total: R$ {calcularTotal().toFixed(2)}</h3>

      {/* Botão para finalizar a compra */}
      <button className="btn btn-success mt-3">Finalizar Compra</button>

      {/* Botão para voltar à página inicial */}
      <button 
        className="btn btn-secondary mt-3 ms-3"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </div>
  );
};

export default CartPage;
