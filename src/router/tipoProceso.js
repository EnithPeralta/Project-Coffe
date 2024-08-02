import express from "express";
import { TiposProcesos } from "../models/tipoProceso.js";
const tipoProcesoRouter = express.Router();

// create tipos de procesos
tipoProcesoRouter.post("/tipoProceso", (req, res) => {
  const tipoProceso = TiposProcesos(req.body);
  tipoProceso
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all tipos of procesos
tipoProcesoRouter.get("/tipoProceso", (req, res) => {
  TiposProcesos
    .find({})
    .populate()

    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a tipos  de procesos
tipoProcesoRouter.get("/tipoProceso/:id", (req, res) => {
  const { id } = req.params;
  TiposProcesos
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// uptade a tipos of procesos
tipoProcesoRouter.put("/tipoProceso/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  TiposProcesos
    .updateOne({ _id: id }, { $set: { nombre } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a tipos of procesos
tipoProcesoRouter.delete("/tipoProceso/:id", (req, res) => {
  const { id } = req.params;
  TiposProcesos
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

export default tipoProcesoRouter;