const nodemailer = require("nodemailer");
const { HTTP_SERVER, SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM } =
  process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendEmailRegister = async (name, email, code) => {
  const linkActivation = `${HTTP_SERVER}/api/v1/users/activation?code=${code}`;
  const mailData = {
    from: SMTP_FROM,
    to: email,
    subject: "Bienvenida a Alejandra Quintero",
    text: `Hola ${name} puedes confirmar tu cuenta directamente aqui ${linkActivation}`,
  };
  const data = await transporter.sendMail(mailData);

  return true;
};

module.exports = sendEmailRegister;
