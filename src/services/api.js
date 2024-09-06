const API_URL = 'https://financeirodio-production.up.railway.app/api';

export const fetchTransacoes = async () => {
  try {
    const response = await fetch(`${API_URL}/transacoes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar transações');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};

export const saveTransacao = async (transacao) => {
  try {
    const response = await fetch(`${API_URL}/transacao`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transacao)
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar transação');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao salvar transação:', error);
    throw error;
  }
};