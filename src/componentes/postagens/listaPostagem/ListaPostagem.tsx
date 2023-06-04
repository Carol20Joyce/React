import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service'
import {Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaPostagem.css';
import useLocalStorage from 'react-use-localstorage';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/token/Reducer';
import { toast } from 'react-toastify';

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  //const [token, setToken] = useLocalStorage('token');
  
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  )
  let navigate = useNavigate();


  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado para continuar!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login")

    }
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [posts.length])


  return (
    <>
      {
        posts.map(post => (

          <Box m={2} style={{ color: "#F7F0D9" }}>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom >
                  Postagens
                </Typography>
                <Typography variant="h5" component="h2">
                  {post.titulo}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.texto}
                </Typography>
                <Typography variant="body2" component="p">
                  {post.tema?.descricao}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft" size='small' color="primary" >
                        Atualizar
                      </Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' color="secondary">
                        Deletar
                      </Button>
                    </Box>
                  </Link>
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  )
}

export default ListaPostagem;