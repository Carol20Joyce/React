import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'



function Navbar (){
    return (
        <>
            <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;