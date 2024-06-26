const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const alunosRoutes = require('./routes/alunos');
const voluntariosRoutes = require('./routes/voluntarios')
const materiaisRoutes = require('./routes/materiais')

const app = express();
app.use(cors());

app.use(helmet({
  crossOriginResourcePolicy: false,
}));

mongoose.connect('mongodb://localhost:27017/atividade-extensionista'
  ).then(console.log('conectado ao mongoDB'))

  app.use(express.json());

app.use('/api/alunos', alunosRoutes); 
app.use('/api/voluntarios', voluntariosRoutes);
app.use('/api/materiais', materiaisRoutes) 

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});