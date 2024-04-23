const createJsonError = require("../../errors/createJsnError");
const {
  findServicioByName,
} = require("../../repositories/FormularioRepository");
const {
  findUserByEmail,
  lastVisit,
} = require("../../repositories/UserRepositories");

const userProfile = async (req, res) => {
  try {
    const { email, name } = req.auth;

    const user = await findUserByEmail(email);
    const { role, id, image } = user;

    const data_lastVisitConDB = await lastVisit(name);
    const { Ultima_visita } = data_lastVisitConDB[0];

    const serviciosHechosDB = await findServicioByName(name);

    res.status(200);
    res.send({
      role,
      id,
      name,
      image,
      Ultima_visita,
      serviciosHechosDB,
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = userProfile;
