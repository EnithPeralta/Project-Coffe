// dependecias
const express = require("express");
const cors = require('cors');
require("dotenv").config();
const app = express();
const path = require("path")

// rutas
const usuario = require("./router/usuarios");
const variedad = require("./router/variedad");
const tipoProceso = require("./router/tipoProceso");
const maquina = require("./router/maquina");
const loteCafe = require("./router/loteCafe");
const seguimiento = require("./router/seguimiento");
const datos = require("./router/datos");
const auth = require("./router/auth");
const storage = require("./router/storage")

// mongoDB
const mongoConnection = require("./DB/mongoDB.js")

const port = process.env.PORT || 8000;

app.use(express.json());
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
app.use("/api", storage);



// los recursos publicos salen de la carpeta storage
// app.use(express.static("almacenamiento"))

// Los recursos públicos salen de la carpeta almacenamiento
app.use(express.static(path.join(__dirname, 'almacenamiento')));

// Iniciar el servidor
app.listen(port, () => console.log(console.log(`Servidor corriendo en http://localhost:${port}`)));

// conexion con mongoDB
mongoConnection();