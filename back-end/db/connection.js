import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db_neo_node_cadastro",
  password: "n9e8o7",
  port: 5432,
});

export default db;