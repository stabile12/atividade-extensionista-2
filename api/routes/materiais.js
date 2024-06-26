const router = require('express').Router();
const Material = require('../models/Materiais');

router.post('/cadastro', async (req, res) => {
  try {
    const novoMaterial = new Material({
      descricao: req.body.descricao,
      quantidade: req.body.quantidade,
    })

    const material = await novoMaterial.save()
    res.status(200).json(material)
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.get('/listar', async (req, res) => {
  try {
    const materiais = await Material.find();
  
    res.status(200).json(materiais);

  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/excluir/:id', async (req, res) => {
  try {
    const id = req.params.id
    const deletar = await Material.findByIdAndDelete(id);
    
    res.status(200).send('material excluído');
  } catch (err) {
    res.status(500).json(err)
  }
  
})

module.exports = router;