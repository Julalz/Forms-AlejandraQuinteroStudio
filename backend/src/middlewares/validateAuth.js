const createJsonError = require("../errors/createJsnError");
const throwJsonError = require("../errors/throwJsonError");
const jwt = require("jsonwebtoken");

const extractAccessToken = (headers) => {
  const { authorization } = headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throwJsonError(403, "Inicia sesion");

  return authorization.split(" ")[1];
};
const validateAuth = (req, res, next) => {
  try {
    const { headers } = req;
    const { JWT_SECRET } = process.env;

    const token = extractAccessToken(headers);

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { name, email, role, id } = decodedToken;

    req.auth = { name, email, role, id };

    console.log(name, email, role, id);
    next();
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = validateAuth;
