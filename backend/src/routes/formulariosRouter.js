const express = require("express");
const validateAuth = require("../middlewares/validateAuth");

const pestañas = require("../controllers/formularios/pestañasController");
const getAllPestañas = require("../controllers/formularios/allPestañasController");
const findFichaByNameController = require("../controllers/users/findClientByNameController");
const findFichaByServiceController = require("../controllers/users/fichaServicesController");

const formsRouter = express.Router();

formsRouter.route("/pestanias").post(pestañas).get(getAllPestañas);
formsRouter.route("/:name").get(findFichaByNameController);

formsRouter
  .route("/:name/:servicio")
  .all(validateAuth)
  .get(findFichaByServiceController);

module.exports = formsRouter;
