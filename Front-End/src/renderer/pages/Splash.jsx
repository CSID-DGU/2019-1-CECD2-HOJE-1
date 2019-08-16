import React from 'react';
import {render } from 'react-dom'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
const nativeImage = require('electron').nativeImage;
const background = nativeImage.createFromPath('assets/background.png');

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: 600,
        height: 300,
    },
    background: {
        maxWidth: '100%',
        height: 300,
        backgroundSize: '100% 100%',
        backgroundImage: `url(${background.toDataURL()})`,
    },
    content: {
        marginLeft: 10,
        fontSize: 65,
        fontWeight: 'bolder',
        color: '#ffffff',
    },
}));



function Test(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="flex-end"
                  spacing={1}
                  className={classes.background}
            >
                <Grid item xs textAlign='center' className={classes.content}>
                    HOJE OCR
                </Grid>
            </Grid>
        </div>
    )
}

render(<Test/>,document.getElementById('root'));