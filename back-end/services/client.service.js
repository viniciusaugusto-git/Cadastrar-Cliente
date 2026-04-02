import repository from "../repositories/client.repository.js";

async function getClients() {
    return repository.getAll();
}

async function getClientById(id) {
    return repository.getById(id);
}

async function createClient(client) {
    return repository.create(client);
}

async function updateClient(id, client) {
    return repository.update(id, client);
}

async function deleteClient(id) {
    return repository.remove(id);
}

const service = {
    getClients,
    createClient,
    updateClient,
    deleteClient,
    getClientById,
};

export default service;