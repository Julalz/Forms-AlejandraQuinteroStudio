const createJsonError = require("../../errors/createJsnError");
const throwJsonError = require("../../errors/throwJsonError");
const { isAdmin } = require("../../utils/RoleChecked");

const {
  findFichaByService,
} = require("../../repositories/FormularioRepository");

const findFichaByServiceController = async (req, res) => {
  try {
    const { servicio } = req.params;
    const { name, email, role } = req.auth;
    console.log(name, email, role, "auth");

    isAdmin(name, email, role);

    const fichaServicio = await findFichaByService(servicio, name);

    if (fichaServicio.length === 0) {
      throwJsonError(404, "Ficha de servicio no encontrada");
    }

    res.status(200);
    res.send({ data: fichaServicio });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = findFichaByServiceController;
