import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import IntagramIcon from '@material-ui/icons/Instagram';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import {Typography, Box, Grid} from '@material-ui/core';

function Footer() {
    return (
        <>
            <Grid container direction="row" justifyContent="center">
                <Grid alignItems="center" item xs={12}>
                    <Box style={{ backgroundColor: "#3F51B5", height: "120px" }}>
                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5" align="center" gutterBottom style={{ color: "white" }}>Siga-nos nas redes sociais </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <a href="https://www.facebook.com/" target="blank">
                                <FacebookIcon style={{ fontSize: 60, color: "white" }} />
                            </a>
                            <a href="https://www.instagram.com/" target="blank">
                                <IntagramIcon style={{ fontSize: 60, color: "white" }} />
                            </a>
                            <a href="https://www.linkedin.com/" target="blank">
                                <LinkedinIcon style={{ fontSize: 60, color: "white" }} />
                            </a>
                        </Box>
                    </Box >
                </Grid>
            </Grid>
        </>
    )
}

export default Footer;