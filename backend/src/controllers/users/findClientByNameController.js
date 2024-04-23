const {
  findServicioByName,
} = require("../../repositories/FormularioRepository");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsnError");

const findFichaByNameController = async (req, res) => {
  try {
    const { name } = req.params;

    const ficha = await findServicioByName(name);
    console.log("voy por aqui");

    if (ficha.length === 0) {
      throwJsonError(404, "Usuario no encontrado");
    }

    res.status(201);
    res.send({
      data: ficha,
    });
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = findFichaByNameController;
