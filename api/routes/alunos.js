const router = require('express').Router();
const Aluno = require('../models/Alunos');

router.post('/cadastro', async (req, res) => {
  try {
    const novoAluno = new Aluno({
      nome: req.body.nome,
      idade: req.body.idade,
      turma: req.body.turma,
      telResp: req.body.telResp,
      ativo: true
    })

    const aluno = await novoAluno.save()
    res.status(200).json(aluno)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.get('/listarAtivos', async (req, res) => {
  try {
    const alunos = await Aluno.find({ ativo: true });
    res.status(200).json(alunos);
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/listarInativos', async (req, res) => {
  try {
    const alunos = await Aluno.find({ ativo: false });
    res.status(200).json(alunos);
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/inativar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const inativar = await Aluno.findByIdAndUpdate(
      id,
      { $set: { ativo: false } },
      { new: true }
  );

  res.status(200).send('Aluno inativado');

  if (!inativar) {
    res.status(404).send('Aluno não encontrado');
}
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;