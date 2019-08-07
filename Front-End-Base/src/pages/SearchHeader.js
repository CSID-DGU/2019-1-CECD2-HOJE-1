import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 360,
  },
  spacer: {
    flex: '1 1 auto',
  },
})); 
let currentPath;
export default function SearchHeader(props) {
  currentPath = props.currentPath;
  const classes = useStyles(); 
  const [puase, setPuase] = React.useState(0);

  // Forced ReRendering
  const [,updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  React.useEffect(() => {
    setTimeout(forceUpdate, 2000); console.log('header reload')
  })

  return (
  <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
    <Grid item xs={12} sm={8}>
      <TextField
      id="outlined-read-only-input"
      label="검사중 파일"
      margin="normal"
      InputProps={{
        readOnly: true,
      }}
      variant="outlined"
      value={currentPath}
      fullWidth
      />
    </Grid>
    <div className={classes.spacer}/>
    {/* 일시 중지 및 다시 시작 버튼 */}
      {/* 일시 중지 버튼 */}
      <div hidden={puase%2 === 0 ? false : true}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          className={classes.margin}
          onClick={()=>setPuase(1)}
        >
          일시 중지
        </Fab>
      </div>
      {/* 다시 시작 버튼 */}
      <div hidden={puase%2 === 1 ? false : true}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="Add"
          className={classes.margin}
          onClick={()=>setPuase(0)}
        >
          다시 시작
        </Fab>
      </div>
    {/* 검사 중지 버튼 */}
      <Fab
        variant="extended"
        color="primary"
        aria-label="Add"
        className={classes.margin}
        component={Link} to='/result'
      >
        검사 중지
      </Fab>
  </Grid>
  );
}