
import { useState } from 'react';
import './style.css';

import firebase from "./firebaseConnection";

function App() {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  async function handleAdd(){
    
    await firebase.firestore().collection('posts')
    .add({
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      console.log('DADOS CADASTRADO COM SUCESSO!');
      setTitulo('');
      setAutor('');
    })
    .catch((error)=>{
      console.log('GEROU ALGUM ERRO: ' + error);
    })

  }

  async function buscaPost(){
    await firebase.firestore().collection('posts')
    .doc('fQHjmKqcSsAdUT9Q7GqJ')
    .get()
    .then((snapshot)=>{

     setTitulo(snapshot.data().titulo);
     setAutor(snapshot.data().autor);

    })
    .catch(()=>{
      console.log('DEU ALGUM ERRO')
    })
  }

  return (
    <div>
      <h1>ReactJs + Firebase</h1> <br />

      <div className="container">
        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value)} />

        <label>Autor: </label>
        <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) }  />

        <button onClick={ handleAdd }>Cadastrar</button>
        <button onClick={ buscaPost }>Buscar Post</button>
      </div>
      
    </div>
  );
}

export default App;
