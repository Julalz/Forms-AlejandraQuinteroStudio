const getPool = require("../infrastructure/database");

const createUser = async (user) => {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT INTO users(
        name, email, password, verificationCode, role, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?)`;

  const { name, email, password, verificationCode } = user;

  const [created] = await pool.query(sql, [
    name,
    email,
    password,
    verificationCode,
    "reader",
    now,
  ]);

  return created.insertId;
};

const findUserByEmail = async (email) => {
  const pool = await getPool();
  const sql =
    "SELECT id, name, email,role, password FROM users WHERE email = ?";
  const [user] = await pool.query(sql, email);

  return user[0];
};

const lastVisit = async (name) => {
  const pool = await getPool();
  // const sql = `SELECT u.name, u.id, lv.Ultima_visita
  // FROM users AS u
  // LEFT JOIN lastvisit AS lv ON u.id = lv.id
  // WHERE u.name LIKE '%${name}%'`;

  const sql = `SELECT u.name, u.id, lv.Ultima_visita
  FROM users AS u
  LEFT JOIN lastvisit AS lv ON u.id = lv.id
  WHERE u.name LIKE CONCAT('%', ?, '%');`;

  const [data_lastVisit] = await pool.query(sql, name);

  return data_lastVisit;
};

module.exports = { createUser, findUserByEmail, lastVisit };
