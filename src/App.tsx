import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Footer from './componentes/estaticos/footer/Footer';
import Home from './paginas/home/Home';
import './App.css';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './componentes/temas/listaTemas/ListaTemas';
import ListaPostagem from './componentes/postagens/listaPostagem/ListaPostagem';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Login  />} />

        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastrousuario" element={<CadastroUsuario/>} />

        <Route path="/temas" element={<ListaTema />} />

        <Route path="/postagens" element={<ListaPostagem />} />


      </Routes>
      <Footer />
    </Router>

  );
}

export default App;