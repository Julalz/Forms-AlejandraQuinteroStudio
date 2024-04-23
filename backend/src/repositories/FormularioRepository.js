const getPool = require("../infrastructure/database");

const pestañasDataBase = async (datosFicha) => {
  const pool = await getPool();
  const now = new Date();
  const sql = `
      INSERT INTO pestanias(
        datos_medicos, firma, date_birth, telefono, aplicacion, estilo, curva,
        largor, grosor, tipo_pestanias, adhesivo, FechaUltimoRetoque, notas
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const sqlUltimaVisita = `
      INSERT INTO lastVisit (Ultima_visita) VALUES (?)
    `;
  const {
    datos_medicos,
    firma,
    date_birth,
    telefono,
    aplicacion,
    estilo,
    curva,
    largor,
    grosor,
    tipo_pestanias,
    adhesivo,
    FechaUltimoRetoque,
    notas,
  } = datosFicha;

  const [created] = await pool.query(sql, [
    datos_medicos,
    firma,
    date_birth,
    telefono,
    aplicacion,
    estilo,
    curva,
    largor,
    grosor,
    tipo_pestanias,
    adhesivo,
    now,
    notas,
  ]);

  const [createVisit] = await pool.query(sqlUltimaVisita, [FechaUltimoRetoque]);

  return created.insertId, createVisit;
};

const allpestañasData = async () => {
  const pool = await getPool();
  const sql = "SELECT * FROM pestanias";

  const [allDataPestañas] = await pool.query(sql);

  return allDataPestañas;
};

const findServicioByName = async (name) => {
  const pool = await getPool();

  const sql = `
    SELECT tipo_servicio
    FROM (
        SELECT 'microblanding' AS tipo_servicio, u.name
        FROM microblading AS m
        JOIN users AS u ON m.user_id = u.id
        WHERE u.name LIKE CONCAT('%', ?, '%')
        UNION
        SELECT 'pestanias' AS tipo_servicio, u.name
        FROM pestanias AS p
        JOIN users AS u ON p.user_id = u.id
        WHERE u.name LIKE CONCAT('%', ?, '%')
        UNION
        SELECT 'extensiones de pelo' AS tipo_servicio, u.name
        FROM extensiones_de_pelo AS e
        JOIN users AS u ON e.user_id = u.id
        WHERE u.name LIKE CONCAT('%', ?, '%')
        UNION
        SELECT 'limpiezas faciales' AS tipo_servicio, u.name
        FROM limpiezas_faciales AS l
        JOIN users AS u ON l.user_id = u.id
        WHERE u.name LIKE CONCAT('%', ?, '%')
    ) AS servicios
    GROUP BY tipo_servicio;
  `;

  const [fichaCliente] = await pool.query(sql, [name, name, name, name]);

  return fichaCliente;
};

const findFichaByService = async (servicio, name) => {
  const pool = await getPool();
  const sql = `
    SELECT *
    FROM ${servicio} AS s
    JOIN users AS u ON s.user_id = u.id
    WHERE LOWER(u.name) LIKE LOWER(?)`;

  console.log(sql);

  const [fichaServicio] = await pool.query(sql, `%${name}%`);

  return fichaServicio;
};

module.exports = {
  pestañasDataBase,
  allpestañasData,
  findServicioByName,
  findFichaByService,
};
