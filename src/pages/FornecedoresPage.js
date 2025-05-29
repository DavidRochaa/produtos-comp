import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FornecedoresPage = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fornecedores', {
          headers: {
            Authorization: token,
          },
        });
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao carregar fornecedores', error);
      }
    };

    fetchFornecedores();
  }, [token]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Fornecedores</h1>
      {fornecedores.length === 0 ? (
        <p>Não há fornecedores cadastrados.</p>
      ) : (
        <ul className="list-group">
          {fornecedores.map((fornecedor) => (
            <li className="list-group-item" key={fornecedor.id}>
              {fornecedor.nome} - {fornecedor.contato}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FornecedoresPage;
