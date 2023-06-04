import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import Tema from '../../../models/Tema';
import './ListaTemas.css';
import useLocalStorage from 'react-use-localstorage';
import {useNavigate} from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/token/Reducer';
import { toast } from 'react-toastify';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([])
  //const [token, setToken] = useLocalStorage('token');
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  )
  let navigate = useNavigate();

  useEffect(()=>{
    if(token == ''){
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
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


  async function getTemas(){
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }


  useEffect(()=>{
    getTemas()
  }, [temas.length])

  return (
    <>
    {
      temas.map(temas =>(
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
             {temas.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${temas.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${temas.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
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
  );
}


export default ListaTemas;