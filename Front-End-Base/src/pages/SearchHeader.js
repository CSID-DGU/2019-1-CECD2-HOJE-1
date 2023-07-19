import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box'

import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import FolderIcon from '@material-ui/icons/FolderOutlined';

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
  textfield: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#ffffff',
  },
})); 
let currentPath;
export default function SearchHeader(props) {
  currentPath = props.currentPath;
  const classes = useStyles(); 
  const [puase, setPuase] = React.useState(0);

  const [ReRender, setReRender] = React.useState(false);
  // Forced ReRendering
  const [,updateState] = React.useState();
  const forceUpdate = React.useCallback(() => {updateState({}); setReRender(false)}, []);
  React.useEffect(() => {
    if(ReRender) {setTimeout(forceUpdate, 1000);}
  })

  return (
  <Box style={{ background: 'linear-gradient( #f1f8e9, #ffffff )', height: 74, borderTop: '1px solid', borderColor: '#c5e1a5', borderTopRightRadius: '10px', borderTopLeftRadius: '10px'}} >
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2} style={{ paddingTop: 15, paddingLeft: 20, paddingRight: 30, height: 74 }}>
      <Grid item xs={12} sm={8}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <FolderIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="검사 경로" value={"이전 검사일을 알 수 없음"} />
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.spacer}/>
      {/* 일시 중지 및 다시 시작 버튼 */}
        {/* 일시 중지 버튼 */}
        <div hidden={puase%2 === 0 ? false : true}>
          <Fab
            variant="extended"
            style={{backgroundColor: '#e6ee9c', color: '#000000',}}
            aria-label="Pause"
            onClick={()=>setPuase(1)}
          >
            <PauseIcon/>
          </Fab>
        </div>
        {/* 다시 시작 버튼 */}
        <div hidden={puase%2 === 1 ? false : true}>
          <Fab
            variant="extended"
            style={{backgroundColor: '#e6ee9c', color: '#000000',}}
            aria-label="Restart"
            onClick={()=>setPuase(0)}
          >
            <PlayIcon/>
          </Fab>
        </div>
        <div style={{width: 14}} />
      {/* 검사 중지 버튼 */}
        <Fab
          variant="extended"
          style={{backgroundColor: '#e6ee9c', color: '#000000',}}
          aria-label="Stop"
          component={Link} to='/result'
        >
          <StopIcon/>
        </Fab>
    </Grid>
  </Box>
  );
}