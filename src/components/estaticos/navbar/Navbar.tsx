import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import './Navbar.css';

function Navbar() {
    //const [token, setToken] = useLocalStorage('token');
    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    );
    let history = useHistory();
    const dispatch = useDispatch();

    function goLogout() {
        //setToken('')
        dispatch(addToken(''));
        //alert('Usuário deslogado')
        toast.info('Usuário deslogado', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            progress: undefined,
        });
        history.push('/login')
    }

    var navbarComponent;

    if (token != '') {
        navbarComponent = <AppBar position='static'>
            <Toolbar variant='dense'>
                <Link to='/home' className='text-decorator-none'>
                    <Box className='cursor'>
                        <Typography variant='h5' color='inherit'>
                            BlogPessoal
                        </Typography>
                    </Box>
                </Link>

                <Box display='flex' justifyContent='start'>
                    <Link to='/home' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                home
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/postagens' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                postagens
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/temas' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                temas
                            </Typography>
                        </Box>
                    </Link>

                    <Link to='/formularioTema' className='text-decorator-none'>
                        <Box mx={1} className='cursor'>
                            <Typography variant='h6' color='inherit'>
                                cadastrar temas
                            </Typography>
                        </Box>
                    </Link>


                    <Box mx={1} className='cursor' onClick={goLogout}>
                        <Typography variant='h6' color='inherit'>
                            logout
                        </Typography>
                    </Box>

                </Box>
            </Toolbar>
        </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;