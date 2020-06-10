import React, { useState, useEffect } from 'react';
import './App.css';
import socketIOClient from "socket.io-client"

function App() {

  const [quantProdutos, setQuantProdutos] = useState('')
  const [quantCategorias, setQuantCategorias] = useState('')

  const socket = socketIOClient('http://localhost:3001')

  fetch('http://localhost:3001/quantprodutos')
    .then(res => res.json())
    .then(quantidade => setQuantProdutos(quantidade['0'].quantidade))
  fetch('http://localhost:3001/quantcategorias')
    .then(res => res.json())
    .then(quantidade => setQuantCategorias(quantidade['0'].quantidade))

  useEffect(() => {
    socket.on('quantidade-produtos', data => {
      fetch('http://localhost:3001/quantprodutos')
        .then(res => res.json())
        .then(quantidade => setQuantProdutos(quantidade['0'].quantidade))
    })
  }, [])

  useEffect(() => {
    socket.on('quantidade-categorias', data => {
      fetch('http://localhost:3001/quantcategorias')
        .then(res => res.json())
        .then(quantidade => setQuantCategorias(quantidade['0'].quantidade))
    })
  }, [])

  return (
    <div className="App">
      <div className="product-container">
        <h2>Quantidade de Produtos</h2>
        <h1>{quantProdutos}</h1>
      </div>
      <div className="categories-container">
        <h2>Quantidade de Categorias</h2>
        <h1>{quantCategorias}</h1>
      </div>
    </div>
  );
}

export default App;
