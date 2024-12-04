import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      }
    };

    fetchProdutos(); 
  }, []); 

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Produtos</h1>
      {produtos.length === 0 ? (
        <p className="text-center text-muted">Não há produtos cadastrados.</p>
      ) : (
        <ul className="list-group">
          {produtos.map((produto) => (
            <li className="list-group-item" key={produto.id}>
              {produto.nome} - R${produto.preco}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProdutosPage;
