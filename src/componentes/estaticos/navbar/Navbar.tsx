import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage';
import './Navbar.css';

function Navbar() {
    const [token, setToken] = useLocalStorage('token');
    let navigate = useNavigate();
    
    function goLogout(){
        setToken('')
        alert("Usuario deslogado com sucesso!")
       navigate('/login')
    }
    return (
        <>
            <AppBar position="static" style={{backgroundColor: "#32092d"}}>
                <Toolbar variant="dense" style={{display:"flex", justifyContent:"space-between"}}>
                    <Box mx={1} display="block" width="100px" style={{ cursor: "pointer", marginTop: "10px", marginBottom: "10px", justifyContent: "flex-start" }}>
                        <Typography variant="h5" style={{color:"#C0C0C0", fontWeight:"600"}}>
                            Meu Blog Pessoal
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Link to='/home' className="text-decorator-none">
                            <Box mx={10} style={{ cursor: "pointer"}}>
                                <Typography variant="h6" style={{color:"#ffba08", fontWeight:"600"}}>
                                    Home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to='/postagens' className="text-decorator-none">
                            <Box mx={9} style={{ cursor: "pointer"}}>
                                <Typography variant="h6" style={{color:"#ffba08", fontWeight:"600"}}>
                                    Postagens
                                </Typography>
                            </Box>
                        </Link>
                        <Link to='/temas' className="text-decorator-none">
                            <Box mx={9} style={{ cursor: "pointer"}}>
                                <Typography variant="h6" style={{color:"#ffba08", fontWeight:"600"}}>
                                    Temas
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/formularioTema" className="text-decorator-none">
                        <Box mx={10} style={{ cursor: "pointer"}}>
                            <Typography variant="h6" style={{color:"#ffba08", fontWeight:"600"}}>
                                Cadastrar Tema
                            </Typography>
                        </Box>
                        </Link>
                        
                        <Link to='/login' className="text-decorator-none">
                            <Box mx={6} style={{ cursor: "pointer"}}>
                                <Typography variant="h6" style={{color:"#ffba08", fontWeight:"600"}}>
                                    Logout
                                </Typography>
                            </Box>
                        </Link>
                        
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    )
}

export default Navbar;