// dependecias
const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();

// rutas
const usuario = require("./router/usuarios");
const variedad = require("./router/variedad");
const tipoProceso = require("./router/tipoProceso");
const maquina = require("./router/maquina");
const loteCafe = require("./router/loteCafe");
const seguimiento = require("./router/seguimiento");
const datos = require("./router/datos");
const auth = require("./router/auth");

// mongoDB
const mongoConnection = require("./DB/mongoDB.js")

const port = process.env.PORT || 8000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// implementacion de las rutas
app.use("/api", usuario);
app.use("/api", variedad);
app.use("/api", tipoProceso);
app.use("/api", maquina);
app.use("/api", loteCafe);
app.use("/api", seguimiento);
app.use("/api", datos);
app.use("/api", auth);

// Iniciar el servidor
app.listen(port, () => console.log("Servidor funcionando en el puerto", port));
// conexion con mongoDB
mongoConnection();