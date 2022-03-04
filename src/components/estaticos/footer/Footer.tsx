import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import IntagramIcon from '@material-ui/icons/Instagram';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { Typography, Box, Grid } from '@material-ui/core';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';
import './Footer.css';

function Footer() {

    const token = useSelector<TokenState, TokenState['tokens']>(
        (state) => state.tokens
    );

    var footerComponent;

    if (token != '') {
        footerComponent = <Grid container direction='row' justifyContent='center'>
            <Grid alignItems='center' item xs={12}>
                <Box className='box1'>
                    <Box paddingTop={1} display='flex' alignItems='center' justifyContent='center'>
                        <Typography variant='h5' align='center' gutterBottom className='textos'>Siga-nos nas redes sociais </Typography>
                    </Box>
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <a href="https://www.facebook.com/" target='blank'>
                            <FacebookIcon className='redes' />
                        </a>

                        <a href="https://www.instagram.com/" target='blank'>
                            <IntagramIcon className='redes' />
                        </a>

                        <a href="https://www.linkedin.com/" target='blank'>
                            <LinkedinIcon className='redes' />
                        </a>
                    </Box>
                </Box >
                <Box className='box2'>
                    <Box paddingTop={1}>
                        <Typography variant='subtitle2' align='center' gutterBottom className='textos1'>© 2022 Copyright</Typography>
                    </Box>
                    <Box>
                        <a target='blank' href='https://brasil.generation.org'>
                            <Typography variant='subtitle2' gutterBottom className='textos1' align='center'> brasil.generation.org</Typography>
                        </a>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    }

    return (
        <>
            {footerComponent}
        </>
    )
}

export default Footer;