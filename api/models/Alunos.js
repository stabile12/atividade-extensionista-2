const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  turma: String,
  telResp: String,
  ativo: Boolean
});

const Aluno = mongoose.model('Aluno', alunoSchema)

module.exports = Aluno;