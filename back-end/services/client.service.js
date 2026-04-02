import repository from "../repositories/client.repository.js";

function normalizeClient(client) {
  return {
    name: client.name.trim().toLowerCase(),
    email: client.email.trim().toLowerCase(),
    phone: client.phone?.trim() || "",
  };
}

async function getClients() {
  return repository.getAll();
}

async function getClientById(id) {
  return repository.getById(id);
}

async function createClient(client) {
  const normalizedClient = normalizeClient(client);
  const existingClient = await repository.getByEmail(normalizedClient.email);

  if (existingClient) {
    const error = new Error("Já existe um cliente com esse email");
    error.status = 409;
    throw error;
  }

  return repository.create(normalizedClient);
}

async function updateClient(id, client) {
  const clientExists = await repository.getById(id);
  if (!clientExists) {
    const error = new Error("Cliente não encontrado");
    error.status = 404;
    throw error;
  }

  const normalizedClient = normalizeClient(client);
  const existingEmail = await repository.getByEmail(normalizedClient.email);
  if (existingEmail && Number(existingEmail.id) !== Number(id)) {
    const error = new Error("Já existe um cliente com esse email");
    error.status = 409;
    throw error;
  }

  return repository.update(id, normalizedClient);
}

async function deleteClient(id) {
  const clientExists = await repository.getById(id);
  if (!clientExists) {
    const error = new Error("Cliente não encontrado");
    error.status = 404;
    throw error;
  }

  return repository.remove(id);
}

const service = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};

export default service;
