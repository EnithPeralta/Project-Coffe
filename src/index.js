const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const usuario = require("./router/usuarios");
const variedad = require("./router/variedad");
const tipoProceso = require("./router/tipoProceso");
const maquina = require("./router/maquina");
const loteCafe = require("./router/loteCafe");
const seguimiento = require("./router/seguimiento");
const datos = require("./router/datos");
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/api", usuario);
app.use("/api", variedad);
app.use("/api", tipoProceso);
app.use("/api", maquina);
app.use("/api", loteCafe);
app.use("/api", seguimiento);
app.use("/api", datos);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// Iniciar el servidor
app.listen(port, () => console.log("Servidor funcionando en el puerto", port));
