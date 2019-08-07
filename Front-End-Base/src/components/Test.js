import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, CardMedia, CircularProgress, LinearProgress } from '@material-ui/core';
import splashIcon1 from '../pages/Splash_1.png';
import splashIcon2 from '../pages/Splash_2.png';
//import Grid from '@material-ui/core/Grid';

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



export default function Test(){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container 
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}>
        <Grid item xs={4}>
          <CardMedia border={1} className={classes.image} image={splashIcon1}/>
        </Grid>
        <Grid item xs textAlign='center'>
          <h1>HOJE OCR is Runnig</h1>
          <td/>
          <h3>This program is made using for OpenCV, TesseractOCR, React, Electron</h3>
          <h3>made by HOJE(maetdol type developer team)</h3>
        </Grid>
        <Grid>
        <CircularProgress />
        </Grid>
      </Grid>
    </div>
  )
}