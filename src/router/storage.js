const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {createStorage} = require("../controller/storage");


/* PUBLIC_URL = http://localhost:3015
en esta ruta puedo probar el envio del archivo en postman
pero para verlo, la url es http://localhost:3015/nameFile configurado en el controlador */

// single es para un archivo
// Ruta para guardar archivos de storage

router.post("/storage", uploadMiddleware.single("myFile"), createStorage)



module.exports = router;