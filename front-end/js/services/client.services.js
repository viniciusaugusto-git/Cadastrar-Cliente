const API_URL = "http://localhost:3000/api/client";

async function getClients() {
  const res = await fetch(API_URL);
  return res.json();
}

async function getClientById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

async function createClient(client) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });

  if (!res.ok) throw new Error("Erro ao criar");
}

async function updateClient(id, client) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(client)
  });

  if (!res.ok) throw new Error("Erro ao atualizar");
}

async function deleteClient(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Erro ao deletar");
}

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};