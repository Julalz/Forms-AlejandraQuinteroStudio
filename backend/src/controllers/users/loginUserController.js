const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createJsonError = require("../../errors/createJsnError");
const throwJsonError = require("../../errors/throwJsonError");
const { findUserByEmail } = require("../../repositories/UserRepositories");
const {
  findFichaByService,
  findServicioByName,
} = require("../../repositories/FormularioRepository");

const schema = joi.object().keys({
  email: joi.string().email().required().messages({
    "string.email": "Debe proporcionar un correo electrónico válido",
    "any.required": "El correo electrónico es obligatorio",
  }),
  password: joi.string().min(4).max(20).required().messages({
    "any.required": "La contraseña es obligatoria",
    "string.min":
      "El la contraseña de usuario y/o debe tener los caracteres obligatorios caracteres",
  }),
});

async function LoginUser(req, res) {
  try {
    const { body } = req;
    const { email, password } = body;

    await schema.validateAsync(body);

    const userData = await findUserByEmail(email);

    if (!userData) {
      throwJsonError(403, "Usuario y/o contraseña incorrectos1");
    }

    const { id, name, role, password: crypPass } = userData;

    const passwordChecked = await bcrypt.compare(password, crypPass);

    if (!passwordChecked) {
      throwJsonError(403, "Usuario y/o contraseña incorrectos2");
    }

    const { JWT_SECRET } = process.env;
    const tokenload = {
      name,
      id,
      email,
      role,
    };

    const token = jwt.sign(tokenload, JWT_SECRET, {
      expiresIn: `2d`,
    });

    res.status(201);
    res.send({
      message: `${name} ha iniciado sesión correctamente`,
      data: { id, name, email, role, token },
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = LoginUser;
