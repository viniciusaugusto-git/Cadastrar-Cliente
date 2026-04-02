const API_URL = "/api/client";

async function parseResponse(res, defaultMessage) {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || defaultMessage);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

async function getClients() {
  const res = await fetch(API_URL);
  return parseResponse(res, "Erro ao buscar clientes");
}

async function getClientById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return parseResponse(res, "Erro ao buscar cliente");
}

async function createClient(client) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  return parseResponse(res, "Erro ao criar cliente");
}

async function updateClient(id, client) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  return parseResponse(res, "Erro ao atualizar cliente");
}

async function deleteClient(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return parseResponse(res, "Erro ao deletar cliente");
}

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
