
import { useState, useEffect } from 'react';
import './style.css';

import firebase from "./firebaseConnection";

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [idPost, setIdPost] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    async function loadPosts(){
      await firebase.firestore().collection('posts')
      .onSnapshot((doc)=>{
        let meusPosts = [];

        doc.forEach((item)=>{
          meusPosts.push({
            id: item.id,
            titulo: item.data().titulo,
            autor: item.data().autor,
          })
        });

        setPosts(meusPosts);

      })
    }

    loadPosts();

  }, []);

  async function handleAdd() {    
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

  async function buscaPost() {
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
  
  async function litaPosts() {
    await firebase.firestore().collection('posts')
    .get()
    .then((snapshot)=>{
      let lista = [];

      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
        })
      })

      setPosts(lista);

    })
    .catch(()=>{
      console.log('DEU ALGUM ERRO!');
    })
  }

  async function editarPost(){
    await firebase.firestore().collection('posts')
    .doc(idPost)
    .update({
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('DADOS ATUALIZADOS COM SUCESSO!');
      setIdPost('');
      setTitulo('');
      setAutor('');
    })
    .catch(()=>{
      console.log('ERRO AO ATUALIZAR');
    });
  }

  async function excluirPost(id){
    await firebase.firestore().collection('posts').doc(id)
    .delete()
    .then(()=>{
      alert('Post Excluído!')
    })
  }

  async function novoUsuario(){
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((value)=>{
      console.log(value);
    })
    .catch((error)=>{ 
      if(error.code === 'auth/weak-password'){
        alert('Senha muito fraca..');
      } else if (error.code === 'auth/email-already-in-use'){
        alert('Esse email já existe!');
      }
    })
  }

  return (
    <div>
      <h1>ReactJs + Firebase</h1> <br />

      <div className="container">
        <label>Email</label>
        <input type="text" value={email} onChange={ (e) => setEmail(e.target.value) } /> <br/>

        <label>Senha</label>
        <input type="password" value={senha} onChange={ (e) => setSenha(e.target.value) } /> <br/> 

        <button onClick={ novoUsuario }>Cadastrar</button>     
      </div>

      <hr/> <br/>

      <div className="container">

        <label>ID: </label>
        <input type="text" value={idPost} onChange={ (e) => setIdPost(e.target.value)} />

        <label>Titulo: </label>
        <textarea type="text" value={titulo} onChange={ (e) => setTitulo(e.target.value)} />

        <label>Autor: </label>
        <input type="text" value={autor} onChange={ (e) => setAutor(e.target.value) }  />

        <button onClick={ handleAdd }>Cadastrar</button>
        <button onClick={ buscaPost }>Buscar Post</button>
        <button onClick={ litaPosts }>Listar Posts</button>
        <button onClick={ editarPost }>Editar</button> <br/>

        <ul>
          {posts.map((post)=>{
            return(
              <li key={post.id} >
                <span>ID - {post.id} </span> <br/>
                <span>Titulo: {post.titulo} </span> <br/>
                <span>Autor: {post.autor} </span> <br/> <br/>
                <button onClick={ () => excluirPost(post.id) } >Excluir post</button> <br/> <br/>
              </li>
            )
          })}
        </ul>
      </div>
      
    </div>
  );
}

export default App;
