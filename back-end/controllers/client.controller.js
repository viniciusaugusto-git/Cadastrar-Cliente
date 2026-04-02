import service from "../services/client.service.js";

async function getAll(req, res) {
  const clients = await service.getClients();
  res.json(clients);
}

async function getById(req, res) {
  const { id } = req.params;
  const client = await service.getClientById(id);
  if (!client) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
  res.json(client);
}

async function create(req, res) {
  const client = await service.createClient(req.body);
  res.status(201).json(client);
}

async function update(req, res) {
  const clientExists = await service.getClientById(req.params.id);
  if (!clientExists) return

  const newClient = {
    ...clientExists,
    ...req.body,
  }

  const { id } = req.params;
  const client = await service.updateClient(id, newClient);
  res.json(client);
}

async function remove(req, res) {
  const clientExists = await service.getClientById(req.params.id);
  if (!clientExists) {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
  const { id } = req.params;
  await service.deleteClient(id);
  res.sendStatus(204);
}

const controller = {
  getAll,
  create,
  update,
  remove,
  getById,
};

export default controller;