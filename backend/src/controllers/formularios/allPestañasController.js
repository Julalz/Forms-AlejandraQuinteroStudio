const createJsonError = require("../../errors/createJsnError");
const { allpestañasData } = require("../../repositories/FormularioRepository");

const getAllPestañas = async (req, res) => {
  try {
    const AllDataPestañas = await allpestañasData();
    // console.log(AllDataPestañas);

    res.status(200);
    res.send({ data: AllDataPestañas });
  } catch (error) {
    createJsonError(error, res);
  }
};
module.exports = getAllPestañas;
