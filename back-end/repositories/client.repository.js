import db from "../db/connection.js";

async function getAll() {
  const result = await db.query("SELECT * FROM clients ORDER BY id DESC");
  return result.rows;
}

async function getById(id) {
  const result = await db.query("SELECT * FROM clients WHERE id = $1", [id]);
  return result.rows[0] || null;
}

async function getByEmail(email) {
  const result = await db.query("SELECT * FROM clients WHERE email = $1", [email]);
  return result.rows[0] || null;
}

async function create(client) {
  const { name, email, phone } = client;
  const result = await db.query(
    "INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, email, phone]
  );
  return result.rows[0];
}

async function update(id, client) {
  const { name, email, phone } = client;
  const result = await db.query(
    "UPDATE clients SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
    [name, email, phone, id]
  );
  return result.rows[0] || null;
}

async function remove(id) {
  await db.query("DELETE FROM clients WHERE id = $1", [id]);
}

const repository = {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  remove,
};

export default repository;
