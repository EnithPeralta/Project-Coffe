const express = require("express");
const tiposProcesoSchema = require("../models/tipoProceso");
const routes = express.Router();

// create tipos de procesos
routes.post("/tipoProceso", (req, res) => {
  const tipoProceso = tiposProcesoSchema(req.body);
  tipoProceso
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all tipos of procesos
routes.get("/tipoProceso", (req, res) => {
  tiposProcesoSchema
    .find({})
    .populate()

    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a tipos  de procesos
routes.get("/tipoProceso/:id", (req, res) => {
  const { id } = req.params;
  tiposProcesoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// uptade a tipos of procesos
routes.put("/tipoProceso/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  tiposProcesoSchema
    .updateOne({ _id: id }, { $set: { nombre } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a tipos of procesos
routes.delete("/tipoProceso/:id", (req, res) => {
  const { id } = req.params;
  tiposProcesoSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = routes;
