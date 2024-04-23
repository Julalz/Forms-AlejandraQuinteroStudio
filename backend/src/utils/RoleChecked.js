const throwJsonError = require("../errors/throwJsonError");

const isAdmin = (name, email, role) => {
  console.log(name, email, role, "isAdmin");
  if (role !== "admin") {
    throwJsonError(401, `${name} No tienes permisos para realizar esta acción`);
  }

  return true;
};

module.exports = { isAdmin };
