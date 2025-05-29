import React, { useState } from 'react';
import axios from 'axios';

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      descricao,
      preco,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/produtos', novoProduto);
      alert(response.data.message);  // Mensagem de sucesso
      setNome('');
      setDescricao('');
      setPreco('');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cadastrar Produto</h1>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="number"
            id="preco"
            className="form-control"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default CadastroPage;
