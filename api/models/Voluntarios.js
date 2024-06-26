const mongoose = require('mongoose');

const voluntarioSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
});

const Voluntario = mongoose.model('Voluntario', voluntarioSchema)

module.exports = Voluntario;