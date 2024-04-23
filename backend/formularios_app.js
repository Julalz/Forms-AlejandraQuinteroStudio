require(`dotenv`).config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const userRouter = require("./src/routes/userRouter");
const formulariosRouter = require("./src/routes/formulariosRouter");

const app = express();
const { PORT } = process.env;
const port = PORT | 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/forms", formulariosRouter);

app.listen(port, () => console.log(`Running at ${port}`));
