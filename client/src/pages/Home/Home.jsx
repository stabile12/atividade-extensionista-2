import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import css from './Home.module.css';
import axios from 'axios';

export default function Home() {
  const {autorizado, setAutorizado} = useContext(Context)
  const [alunosAtivos, setAlunosAtivos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({ nome: '', idade: '', turma: '', telResp: '' });
  const [voluntarios, setVoluntarios] = useState([]);
  const [novoVoluntario, setNovoVoluntario] = useState({ nome: '', telefone: '' });
  const [materiais, setMateriais] = useState([])
  const [novoMaterial, setNovoMaterial] = useState({ descricao: '', quantidade: '' });

  const [ativos, setAtivos] = useState(true);
  const navigate = useNavigate();
  



  // ALUNOS
  async function getAlunosAtivos() {
    try {
      const response = await axios.get('http://localhost:8080/api/alunos/listarAtivos');
      const data = response.data;
      setAlunosAtivos(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function inativarAluno(id) {
    try {
      await axios.put(`http://localhost:8080/api/alunos/inativar/${id}`);
      getAlunosAtivos();
    } catch (e) {
      console.log(e);
    }
  }

  async function adicionarAluno(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/alunos/cadastro', novoAluno);
      setNovoAluno({ nome: '', idade: '', turma: '', telResp: '' });
      getAlunosAtivos();
    } catch (e) {
      console.log(e);
    }
  }

  async function getAlunosInativos() {
    try {
      if (ativos == true) {
        const response = await axios.get('http://localhost:8080/api/alunos/listarInativos');
        const data = response.data;
        setAlunosAtivos(data);
      } else {
        const response = await axios.get('http://localhost:8080/api/alunos/listarAtivos');
        const data = response.data;
        setAlunosAtivos(data);
      }

    
    } catch (e) {
      console.log(e);
    }
  }

  // VOLUNTÁRIOS
  async function getVoluntários() {
    try {
      const response = await axios.get('http://localhost:8080/api/voluntarios/listar');
      setVoluntarios(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function apagaVoluntario(id) {
    try {
      await axios.delete(`http://localhost:8080/api/voluntarios/excluir/${id}`);
      getVoluntários();
    } catch (e) {
      console.log(e);
    }
  }

  async function adicionarVoluntario(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/voluntarios/cadastro', novoVoluntario);
      setNovoVoluntario({ nome: '', telefone: '' });
      getVoluntários();
    } catch (e) {
      console.log(e);
    }
  }


  // MATERIAIS
  async function getMateriais() {
    try {
      const response = await axios.get('http://localhost:8080/api/materiais/listar');
      setMateriais(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function adicionarMaterial(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/materiais/cadastro', novoMaterial);
      setNovoMaterial({ descricao: '', quantidade: '' });
      getMateriais()
    } catch (e) {
      console.log(e);
    }
  }

  async function excluiMaterial(id) {
    try {
      await axios.delete(`http://localhost:8080/api/materiais/excluir/${id}`);
      getMateriais();
    } catch (e) {
      console.log(e);
    }
  }

  function redirect() {
    if (autorizado === false) {
      navigate("/login")
    }
  }

  useEffect(() => {
    redirect();
    getAlunosAtivos();
    getVoluntários();
    getMateriais();
  }, []);

  return (
    <div className={css.container}>
      <h1>Academia de Futebol</h1>
      <div className={css.setores}>
        <div className={css.alunos}>
          <h2>Alunos</h2>
          <form className={css.form} onSubmit={adicionarAluno}>
            <input 
              type="text" 
              placeholder="Nome" 
              value={novoAluno.nome} 
              onChange={e => setNovoAluno({ ...novoAluno, nome: e.target.value })} 
              required 
            />
            <input 
              type="number" 
              placeholder="Idade" 
              value={novoAluno.idade} 
              onChange={e => setNovoAluno({ ...novoAluno, idade: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Turma" 
              value={novoAluno.turma} 
              onChange={e => setNovoAluno({ ...novoAluno, turma: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Telefone Responsável" 
              value={novoAluno.telResp} 
              onChange={e => setNovoAluno({ ...novoAluno, telResp: e.target.value })} 
              required 
            />
            <button type="submit">Adicionar Aluno</button>
          </form>
          <button style={{marginBottom: 10, backgroundColor: "blue"}} onClick={() => {
            getAlunosInativos()
            setAtivos(!ativos)
            }}>
              {ativos ? `Listar Inativos` : `Listar Ativos`}</button>
          {alunosAtivos.map(aluno => (
            <div key={aluno._id} className={css.aluno}>
              <p>Nome: {aluno.nome}</p>
              <p>Idade: {aluno.idade}</p>
              <p>Turma: {aluno.turma}</p>
              <p>Telefone Responsável: {aluno.telResp}</p>
              <button onClick={() => inativarAluno(aluno._id)}>Inativar</button>
            </div>
          ))}
        </div>
        
        <div className={css.voluntarios}>
          <h2>Voluntários</h2>
          <form className={css.form} onSubmit={adicionarVoluntario}>
            <input 
              type="text" 
              placeholder="Nome" 
              value={novoVoluntario.nome} 
              onChange={e => setNovoVoluntario({ ...novoVoluntario, nome: e.target.value })} 
              required 
            />
            <input 
              type="text" 
              placeholder="Telefone" 
              value={novoVoluntario.telefone} 
              onChange={e => setNovoVoluntario({ ...novoVoluntario, telefone: e.target.value })} 
              required 
            />
            <button type="submit">Adicionar Voluntário</button>
          </form>
          {voluntarios.map(voluntario => (
            <div key={voluntario._id} className={css.voluntario}>
              <p>Nome: {voluntario.nome}</p>
              <p>Telefone: {voluntario.telefone}</p>
              <button onClick={() => apagaVoluntario(voluntario._id)}>Excluir</button>
            </div>
          ))}
        </div>
        
        <div className={css.materiais}>
          <h2>Materiais</h2>
          <form className={css.form} onSubmit={adicionarMaterial}>
            <input 
              type="text" 
              placeholder="Descrição" 
              value={novoMaterial.nome} 
              onChange={e => setNovoMaterial({ ...novoMaterial, descricao: e.target.value })} 
              required 
            />
            <input 
              type="number" 
              placeholder="Quantidade" 
              value={novoMaterial.quantidade} 
              onChange={e => setNovoMaterial({ ...novoMaterial, quantidade: e.target.value })} 
              required 
            />
            <button type="submit">Adicionar Material</button>
          </form>
          {materiais.map(material => (
            <div className={css.material}>
              <p>Descrição: {material.descricao}</p>
              <p>Quantidade: {material.quantidade}</p>
              <button onClick={() => excluiMaterial(material._id)}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
