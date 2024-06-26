const mongoose = require('mongoose');

const materiaisSchema = new mongoose.Schema({
  descricao: String,
  quantidade: String,
});

const Material = mongoose.model('Material', materiaisSchema)

module.exports = Material;