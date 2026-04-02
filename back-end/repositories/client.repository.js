import db from "../db/connection.js";

/**
 * Retorna todos os clientes do banco de dados, ordenados por ID em ordem decrescente.
 * @returns {Promise<Array>} Uma promessa que resolve para um array de clientes.
 */
async function getAll() {
  const result = await db.query("SELECT * FROM clients ORDER BY id DESC");
  return result.rows;
}

/**
 * Buscar cliente por ID
 * @param {string} id - ID do cliente a ser buscado.
 * @returns {Promise<Object>} Uma promessa que resolve para o cliente encontrado, ou null se nenhum cliente for encontrado.
 */
async function getById(id) {
  const result = await db.query("SELECT * FROM clients WHERE id = $1", [id]);
  return result.rows[0] || null;
}

/**
 * Salva um novo cliente no banco de dados. O cliente deve ser um objeto contendo as propriedades name, email e phone.  
 * @param {*} client - Objeto contendo os dados do cliente a ser criado. Deve conter as propriedades name, email e phone.
 * @returns {Promise<Object>} Uma promessa que resolve para o cliente criado, incluindo seu ID gerado pelo banco de dados.
 */
async function create(client) {
  const { name, email, phone } = client;

  const result = await db.query(
    "INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, email, phone]
  );

  return result.rows[0];
}

/**
 * Atualiza um cliente existente no banco de dados com base no ID fornecido. O cliente deve ser um objeto contendo as propriedades name, email e phone.
 * @param {number} id - ID do usuário a ser atualizado.
 * @param {*} client - Objeto contendo os dados do cliente a ser atualizado. Deve conter as propriedades name, email e phone.
 * @returns {Promise<Object>} Uma promessa que resolve para o cliente atualizado, incluindo seu ID gerado pelo banco de dados.
 */
async function update(id, client) {
  const { name, email, phone } = client;

  const result = await db.query(
    "UPDATE clients SET name=$1, email=$2, phone=$3 WHERE id=$4 RETURNING *",
    [name, email, phone, id]
  );

  return result.rows[0];
}

/**
 * Remove um cliente existente do banco de dados com base no ID fornecido.
 * @param {string} id - ID do cliente a ser removido.
 */
async function remove(id) {
  const existingClient = await getById(id);
  if (!existingClient) {
    throw new Error("Cliente não encontrado");
  }

  await db.query("DELETE FROM clients WHERE id = $1", [id]);
}

const repository = {
  getAll,
  create,
  update,
  remove,
  getById,

};

export default repository;