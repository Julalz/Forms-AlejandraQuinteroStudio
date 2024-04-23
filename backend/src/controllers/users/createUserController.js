const joi = require("joi");
const bcrypt = require("bcrypt");

const randomstring = require("randomstring");
const {
  createUser,
  findUserByEmail,
} = require("../../repositories/UserRepositories");

const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsnError");
const sendEmailRegister = require("../../helpers/mailSmtp");

const schema = joi.object().keys({
  name: joi.string().min(4).max(125).required(),
  email: joi.string().email().required().messages({
    "string.email": "Debe proporcionar un correo electrónico válido",
    "any.required": "El correo electrónico es obligatorio",
  }),
  password: joi.string().min(4).max(20).required().messages({
    "any.required": "La contraseña es obligatoria",
    "string.min":
      "El la contraseña de usuario y/o debe tener los caracteres obligatorios caracteres",
  }),
  verifyPassword: joi.any().equal(joi.ref("password")).required().messages({
    "any.only": "Las contraseñas no coinciden",
    "any.required": "Debes verificar tu contraseña",
  }),
});

async function createAccount(req, res) {
  try {
    const { body } = req;
    const { name, email, password } = body;

    await schema.validateAsync(body);

    const user = await findUserByEmail(email);

    if (user) {
      throwJsonError(409, "Este usuario ya existe");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    console.log(`Contraseña encriptada ${passwordHash}`);

    const verificationCode = randomstring.generate(64);
    console.log(`codigo de verificacion  ${verificationCode}`);

    const userData = {
      name,
      email,
      password: passwordHash,
      verificationCode,
    };
    const userID = await createUser(userData);
    await sendEmailRegister(name, email, verificationCode);

    res.status(201);
    res.send({
      massage: "Usuario creado correctamente",
      data: { id: userID, name, email, verificationCode },
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createAccount;
