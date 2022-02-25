import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Tema from '../../../models/Tema';
import './ListaTema.css';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';

function ListaTema() {
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token');
    let histoty = useHistory();

    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado")
            history.push("/login")
        }
    }, [token])

    async function getTema() {
        await busca("/tema", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        getTema()
    }, [temas.length])

    return (
        <>
            {
                temas.map(tema => (
                    <Box m={2} >
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography color='textSecondary' gutterBottom>
                                    Tema
                                </Typography>
                                <Typography variant='h5' component='h2'>
                                    Minha descrição
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Box display='flex' justifyContent='center' mb={1.5} >

                                    <Link to='' className='text-decorator-none'>
                                        <Box mx={1}>
                                            <Button variant='contained' className='marinLeft' size='small' color='primary' >
                                                atualizar
                                            </Button>
                                        </Box>
                                    </Link>
                                    <Link to='' className='text-decorator-none'>
                                        <Box mx={1}>
                                            <Button variant='contained' size='small' color='secondary'>
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

export default ListaTema;