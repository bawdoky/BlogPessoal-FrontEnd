import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';

function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }
    
    return (
        <>
            <TabContext value={value}>
                <AppBar position='static'>
                    <Tabs centered indicatorColor='secondary' onChange={handleChange}>
                        <Tab label='Todas as postagens' value='1' />
                        <Tab label='Sobre Mim' value='2' />
                    </Tabs>
                </AppBar>

                <TabPanel value='1' >
                    <Box display='flex' flexWrap='wrap' justifyContent='center'>
                        <ListaPostagem />
                    </Box>
                </TabPanel>

                <TabPanel value='2'>
                    <Typography variant='h5' gutterBottom color='textSecondary' component='h5' align='justify' >Quem sou eu!</Typography>
                    <Typography variant="body1" gutterBottom color='textPrimary' align='justify'>Olá, eu me chamo Lucas Oi tenho 26 anos, moro em São Paulo e sou uma pessoa desenvolvedora FullStack </Typography>
                </TabPanel>
            </TabContext>
        </>
    );
}
export default TabPostagem;