import React from 'react';
import {render} from 'react-dom';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, CardMedia, LinearProgress } from '@material-ui/core';
const BorderLinearProgress = withStyles({
    root: {
        height: 30,
        backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#ff6c5c',
    },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    },
    image: {
        padding: theme.spacing(2),
        textAlign: 'center',
        height: 200,
        width: '100%',
    },
}));

function Test(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={1}>
                <Grid item xs={4}>
                    <CardMedia border={1} className={classes.image}/>
                </Grid>
                <Grid item xs textAlign='center'>
                    <h1>HOJE OCR</h1>
                    <BorderLinearProgress />
                </Grid>
                <Grid item xs={4}>
                    <CardMedia border={1} className={classes.image}/>
                </Grid>
            </Grid>
        </div>
    )
}

render(<Test/>,document.getElementById('root'));