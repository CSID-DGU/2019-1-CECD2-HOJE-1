import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMedia from'@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import SearchIcon from './SearchIcon.png';
import UpdateIcon from './UpdateIcon.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 220,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 220,
  },
}));

export default function Home() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Grid container
      justify="center"
      alignItems="center"
      direction="row"
      spacing={3} >
        <Grid xs={3} className={classes.paper}>
          <CardActionArea>
            <CardMedia className={classes.media} image={UpdateIcon} title="1"/>
          </CardActionArea>
        </Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">2</Box></Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">3</Box></Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">4</Box></Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">5</Box></Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">6</Box></Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">7</Box></Grid>
        <Grid xs={3} className={classes.paper}><Box border={1} height="200px">8</Box></Grid>
      </Grid>
      
    </div>
  )
}