import React, { useState, useEffect } from 'react';
import { fetchTransacoes, saveTransacao } from './services/api';
import './App.css';

const App = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('RECEITA');
  const [transacoes, setTransacoes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tipoTransacao = tipo === 'SAÍDA' ? 'DESPESA' : 'RECEITA';
    
    try {
      await saveTransacao({
        descricao,
        valor: parseFloat(valor),
        tipo: tipoTransacao,
      });
      
      setDescricao('');
      setValor('');
      setTipo('RECEITA');
      loadTransacoes();
    } catch (error) {
      console.error('Erro ao adicionar transação', error);
    }
  };

  const loadTransacoes = async () => {
    try {
      const data = await fetchTransacoes();
      setTransacoes(data);
    } catch (error) {
      console.error('Erro ao buscar transações', error);
    }
  };

  useEffect(() => {
    loadTransacoes();
  }, []);

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Controle Financeiro</h1>
      </header>
      <div className="container">
        <div className="adicionar-transacao">
          <h2>Adicionar Transação</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
              required
            />
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Valor"
              required
            />
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="RECEITA">Entrada</option>
              <option value="SAÍDA">Saída</option>
            </select>
            <button type="submit">Adicionar</button>
          </form>
        </div>
        <div className="lista-transacoes">
          <h2>Lista de Transações</h2>
          <ul>
            {transacoes.map((transacao) => (
              <li key={transacao.id}>
                {transacao.descricao} - {transacao.valor} - {transacao.tipo}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;