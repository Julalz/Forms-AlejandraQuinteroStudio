const joi = require("joi");
const createJsonError = require("../../errors/createJsnError");
const { pestañasDataBase } = require("../../repositories/FormularioRepository");

const curvaOptions = ["L", "B", "C", "D", "LC", "CC", "DD", "LM", "LU"];
const largorOptions = [
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
];
const grosorOptions = [
  "0.03",
  "0.05",
  "0.07",
  "0.08",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
];

const schema = joi.object({
  datos_medicos: joi.string().required().messages({
    "string.base": `Los datos médicos deben ser una cadena de caracteres.`,
    "any.required": `Los datos médicos son un campo requerido.`,
  }),
  firma: joi.string().required().messages({
    "string.base": `La firma debe ser una cadena de caracteres.`,
    "any.required": `La firma es un campo requerido.`,
  }),
  date_birth: joi.string().isoDate().required().messages({
    "string.base": `La fecha de nacimiento debe ser una cadena de caracteres en formato ISO (YYYY-MM-DD).`,
    "string.isoDate": `La fecha de nacimiento debe ser una fecha válida en formato ISO (YYYY-MM-DD).`,
    "any.required": `La fecha de nacimiento es un campo requerido.`,
  }),
  telefono: joi.string().required().messages({
    "string.base": `El número de teléfono debe ser una cadena de caracteres.`,
    "any.required": `El número de teléfono es un campo requerido.`,
  }),
  aplicacion: joi.string().required().messages({
    "string.base": `La aplicación debe ser una cadena de caracteres.`,
    "any.required": `La aplicación es un campo requerido.`,
  }),
  estilo: joi.string().required().messages({
    "string.base": `El estilo debe ser una cadena de caracteres.`,
    "any.required": `El estilo es un campo requerido.`,
  }),
  curva: joi
    .string()
    .valid(...curvaOptions)
    .required()
    .messages({
      "any.only": `La curva debe ser una de las opciones: ${curvaOptions.join(
        ", "
      )}`,
      "any.required": `La curva es un campo requerido.`,
    }),
  largor: joi
    .string()
    .valid(...largorOptions)
    .required()
    .messages({
      "string.base": `El largo debe ser una cadena de caracteres.`,
      "any.required": `El largo es un campo requerido.`,
    }),
  grosor: joi
    .string()
    .valid(...grosorOptions)
    .required()
    .messages({
      "string.base": `El grosor debe ser una cadena de caracteres.`,
      "any.required": `El grosor es un campo requerido.`,
    }),
  tipo_pestanias: joi.string().required().messages({
    "string.base": `El tipo de pestañas debe ser una cadena de caracteres.`,
    "any.required": `El tipo de pestañas es un campo requerido.`,
  }),
  adhesivo: joi.string().required().messages({
    "string.base": `El adhesivo debe ser una cadena de caracteres.`,
    "any.required": `El adhesivo es un campo requerido.`,
  }),
  FechaUltimoRetoque: joi.string().isoDate().required().messages({
    "string.base": `La fecha del último retoque debe ser una cadena de caracteres en formato ISO (YYYY-MM-DD).`,
    "string.isoDate": `La fecha del último retoque debe ser una fecha válida en formato ISO (YYYY-MM-DD).`,
    "any.required": `La fecha del último retoque es un campo requerido.`,
  }),
  notas: joi.string().required().messages({
    "string.base": `Las notas deben ser una cadena de caracteres.`,
    "any.required": `Las notas son un campo requerido.`,
  }),
});

const pestañas = async (req, res) => {
  try {
    const { body } = req;
    const {
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
    } = body;

    await schema.validateAsync(body);
    const pestaniasData = {
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
    };

    const fichaPestañas = await pestañasDataBase(body);

    console.log(fichaPestañas);
    res.status(201);
    res.send({
      messages: "Ficha de usuario creada",
      data: {
        id: fichaPestañas,
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
        notas,
      },
    });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = pestañas;
