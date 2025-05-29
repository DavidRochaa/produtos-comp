import React, { useState } from 'react';
import axios from 'axios';

const EstoquePage = () => {
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('entrada');
  const [mensagem, setMensagem] = useState('');
  const [saldo, setSaldo] = useState(null);

  const token = localStorage.getItem('token'); // Certifique-se que você salva o token ao fazer login

  const registrarMovimentacao = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/estoque/movimentar',
        { produto_id: produtoId, quantidade: parseInt(quantidade), tipo },
        { headers: { Authorization: token } }
      );
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao registrar movimentação');
    }
  };

  const consultarSaldo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/estoque/saldo/${produtoId}`,
        { headers: { Authorization: token } }
      );
      setSaldo(response.data.saldo);
    } catch (error) {
      setMensagem('Erro ao consultar saldo');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Estoque</h2>

      <div className="form-group">
        <label>ID do Produto</label>
        <input type="text" className="form-control" value={produtoId} onChange={(e) => setProdutoId(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Quantidade</label>
        <input type="number" className="form-control" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Tipo de Movimentação</label>
        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>

      <button className="btn btn-primary mt-3" onClick={registrarMovimentacao}>Registrar</button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={consultarSaldo}>Consultar Saldo</button>

      {mensagem && <p className="mt-3">{mensagem}</p>}
      {saldo !== null && <p>Saldo atual: {saldo}</p>}
    </div>
  );
};

export default EstoquePage;
