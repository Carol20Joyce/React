import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Box, withStyles, InputBase, Theme, createStyles } from "@material-ui/core"
import './CadastroPostagem.css';
import {useNavigate, useParams } from 'react-router-dom'
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post, put } from '../../../services/Service';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../../store/token/Reducer';
import { toast } from 'react-toastify';
import User from '../../../models/User';
import { addToken } from '../../../store/token/Action';

const BootstrapInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(2),
                color:'black',
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            border: 'px solid #7a959c',
            fontSize: 15,
            padding: '16px 0px 16px 14px',
            color: 'black',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderRadius: 4,
                border: '1px solid #009DDC',
                boxShadow: '0 0 0 0.08rem rgba(118, 38, 114, 1)',
               
            },
        },
    }),
)(InputBase);

//text estilizado
const StyledTitle = withStyles({
    root: {
        color: '#155263',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        textAlign: 'center',
        fontWeight: 'bold'
    },
})(Typography);

//textfield estilizado
const FormStyled = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#762672',
        },
        '& label': {
            color: '#547f8a',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#762672',
        },
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            '& fieldset': {
                borderColor: '#964429',
            },
            '&:hover fieldset': {
                borderColor: '#762672',
                backgroundColor: 'rgba(255, 255, 255, 0.24)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#762672',
            },
        },
    }
})(TextField);

function CadastroPostagem() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])


    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    useEffect(() => {
        if (token == "") {
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

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: '',
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });
        }
        back()

    }

    function back() {
        navigate('/postagens')
    }

    return (
        <Box marginTop={15}>
            <Container maxWidth="sm">
                <Box className='postForm' paddingX={8} borderRadius={4} border={1}>

                    <form onSubmit={onSubmit}>
                        <StyledTitle variant="h4">Cadastrar Postagem</StyledTitle>
                        <FormStyled value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" margin="normal" fullWidth />Minimo de 5 caracteres✌️
                        <FormStyled value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" margin="normal" fullWidth />Minimo de 10 caracteres✌️

                        <FormControl variant="outlined" style={{width:'422px'}}>
                        <InputLabel id="demo-mutiple-chip-label" className='txtTema'>tema</InputLabel>
                            <Select
                            variant="outlined"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                                    headers: {
                                        'Authorization': token
                                    }
                                })}
                                input={<BootstrapInput />}
                            >
                                {
                                    temas.map(temas => (
                                        <MenuItem value={temas.id}>{temas.descricao}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText style={{marginLeft:'0px'}}>Escolha um tema para a postagem</FormHelperText>
                            <Button type="submit" variant="contained" className='btnEnviar'>
                                Enviar
                             </Button> 
                        </FormControl>
                    </form>
                </Box>
            </Container>
        </Box>
    )
}
export default CadastroPostagem;