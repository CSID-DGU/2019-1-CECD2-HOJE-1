import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper, FormControl, InputLabel, Select, MenuItem, Fab, Grid, TextField, Popover } from '@material-ui/core';
import { List, Divider, CardActionArea, CardMedia, CardContent } from '@material-ui/core';
import testimage from './text.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    minHeight: 360,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  spacer: {
    flex: '1 1 auto',
  },
  fab: {
    width: 70,
  },
  imagecrop: {
    width: 130,
  },
})); 
const mylistStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 330,
  },
  listSection: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  image: {
    height: 40,
  },
  card: {
    maxHeight: 343.5,
  },
  fullimage: {
    width: '100%',
    height: 100,
  },
  textfiled: {
    maxWidth: 300,
  },
  item: {
    padding: 10,
  },
  media: {
    height: 300,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {children}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function QnAMail(props){
  const { sendingImagePath } = props;
  const classes = useStyles(); 
  const classes2 = mylistStyles();
  const [value, setValue] = React.useState(1);
  const [file, ] = React.useState(['Pattern.png','Bookmark.png','Find.png','Identification.png','SearchIcon.png']);
  const [send, setSend] = React.useState([])
  const [init, setInit] = React.useState(true);
  // 
  function handleChange(event) {
    setValue(event.target.value);
  }

  const txtChange = prop => event => {
    //setSend({ ...send, [prop]: event.target.value });
    let index = file.indexOf(prop);
    send[index] = event.target.value;
    console.log(send);
  };

  console.log(file.length);
  if(init)
  {
    for(let i = 0; i < file.length; i++)
    {
      const newsend = send;
      newsend.push(i);
      setSend(newsend);
    }
    setInit(false);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      {sendingImagePath}
      <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      >
        {/* 첫번째 줄 */}
        <Grid item xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="Tabs-simple">구 분</InputLabel>
            <Select
              value={value}
              onChange={handleChange}
              inputProps={{
                name: 'Tabs',
                id: 'Tabs-simple',
              }}
            >
              <MenuItem value={1}>분류구분 추가신청</MenuItem>
              <MenuItem value={2}>오탐지 수정요청</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div className={classes.spacer}/>
        <Fab variant="extended" className={classes.fab}>전  송</Fab>
        {/* 두번째 줄 */}
        <Grid item xs={9}>
          <TextField
            label="이미지 경로"
            style={{ margin: 8 }}
            placeholder="경로"
            fullWidth
            margin="normal"
            variant="outlined"
            value={''}
            InputLabelProps={{
              shrink: true,
            }}
          />
          </Grid>
          <Fab variant="extended" disabled={value !== 2? true : false} className={classes.imagecrop}>이미지 자르기</Fab>
      </Grid>
      <Paper className={classes.list}>
      <TabPanel value={value} index={null}>{ /* 문의 초기 화면 */ }
        구분을 선택해 주세요.
      </TabPanel>
      <TabPanel value={value} index={1}>{ /* 분류구분 추가신청 화면 */ }
        <Grid item alignItems="center" justify="center">
          <Grid xs={12} item><CardActionArea onClick={handleClick}><CardContent>해당되는 이미지에 대한 설명을 적으려면 이미지를 클릭하세요</CardContent><CardMedia className={classes2.media} image={testimage}/></CardActionArea></Grid>
        </Grid>
        <Popover 
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <TextField className={classes2.content} label="이미지 설명을 적어주세요" multiline 
          rows="6" fullWidth margin="normal" variant="outlined"/>
        </Popover>
      </TabPanel>
      <TabPanel value={value} index={2}>{ /* 오탐지 수정요청 화면 */ }
          <List className={classes2.root} >
            {
              ['Pattern.png','Bookmark.png','Find.png','Identification.png','SearchIcon.png'].map(item =>
              <div>
              <Grid container zeroMinWidth className={classes2.item}>
                <Grid xs={6} item><img style={{marginTop: 12, marginBottom: 12}} maxHeight="303" maxWidth="343" height="98%" width="100%" src={testimage}/></Grid>
                <Grid xs={6} item>
                  <TextField className={classes2.item} id={item} label="이미지 내의 텍스트를 적어주세요" multiline 
                   fullWidth margin="normal" variant="outlined" onChange={txtChange(item)}/>
                </Grid>
              </Grid>
              <Divider/>
              </div>
              )
            }
          </List>
      </TabPanel>
      </Paper>
    </div>
  )
}
