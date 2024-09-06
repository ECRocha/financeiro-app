import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ListaTransacoes() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    api.get('api/transacoes')
      .then(response => setTransacoes(response.data))
      .catch(error => console.error("Erro ao buscar transações", error));
  }, []);

  return (
    <div className="lista-transacoes">
      <h2>Transações</h2>
      <ul>
        {transacoes.map((transacao) => (
          <li key={transacao.id}>
            <p><strong>Tipo:</strong> {transacao.tipo}</p>
            <p><strong>Valor:</strong> R$ {transacao.valor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}