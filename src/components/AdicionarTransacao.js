import React, { useState } from 'react';
import api from '../services/api';

export default function AdicionarTransacao() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('RECEITA');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mapeia o tipo do formulário para "RECEITA" ou "DESPESA"
    const tipoTransacao = tipo === 'Entrada' ? 'RECEITA' : 'DESPESA';

    api.post('api/transacao', { descricao, valor, tipo: tipoTransacao })
      .then(response => {
        alert('Transação adicionada com sucesso');
        // Limpar os campos após adicionar
        setDescricao('');
        setValor('');
        setTipo('Entrada');
      })
      .catch(error => console.error("Erro ao adicionar transação", error));
  };

  return (
    <div className="adicionar-transacao">
      <h2>Adicionar Transação</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo</label>
          <select value={tipo} onChange={e => setTipo(e.target.value)} required>
            <option value="Entrada">Entrada</option>
            <option value="Saída">Saída</option>
          </select>
        </div>
        <div>
          <label>Valor</label>
          <input
            type="number"
            value={valor}
            onChange={e => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}