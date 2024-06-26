const router = require('express').Router();
const Voluntario = require('../models/Voluntarios');

router.post('/cadastro', async (req, res) => {
  try {
    const novoVuluntario = new Voluntario({
      nome: req.body.nome,
      telefone: req.body.telefone,
    })

    const voluntario = await novoVuluntario.save()
    res.status(200).json(voluntario)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.get('/listar', async (req, res) => {
  try {
    const voluntarios = await Voluntario.find();
  
    res.status(200).json(voluntarios);

  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/excluir/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletar = await Voluntario.findByIdAndDelete(id);
    
    res.status(200).send('voluntário excluído');
  } catch (err) {
    res.status(500).json(err)
  }
  
})

module.exports = router;
