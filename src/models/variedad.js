const mongoose = require("mongoose");
const variedadSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Variedades", variedadSchema);
