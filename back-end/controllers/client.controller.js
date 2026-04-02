import service from "../services/client.service.js";

async function getAll(req, res, next) {
  try {
    const clients = await service.getClients();
    res.json(clients);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const client = await service.getClientById(id);

    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json(client);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const client = await service.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;
    const client = await service.updateClient(id, req.body);
    res.json(client);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await service.deleteClient(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
