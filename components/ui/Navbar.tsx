import { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Link, Grid } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UIContext } from '../../context/ui/UIContext';
import NextLink from 'next/link';





export const Navbar = () => {

    const { openSideMenu } = useContext(UIContext)

    return (

        <AppBar position='sticky'>

            <Toolbar>

                <IconButton size='large' edge="start" onClick={openSideMenu}>

                    <MenuOutlinedIcon />

                </IconButton>

                <Grid>

                    <NextLink href='/' passHref >

                        

                       <Typography variant='h6' color={'white'} >OpenJira</Typography>

                      

                    </NextLink>

                </Grid>



            </Toolbar>

        </AppBar>


    )
}
