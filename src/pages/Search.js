import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SettingIcon from '@material-ui/icons/Settings';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import setting_data from './settingdata.json';

import Typography from '@material-ui/core/Typography';

import DropdownTreeSelect from "react-dropdown-tree-select";
import "./tree.css";
//import MuiTreeView from 'material-ui-treeview';

import * as fs from 'fs';

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

let test = [];
setting_data.searchSetting.map(value => {
  if(value.checked === true){
    test.push(value.id);
  }
})

function getDir(dir){
  fs.readdir(dir, function(error, filelist){
    let testarray = [];
    filelist.map(value => {
      if(value.match('\\.') === null)
        testarray.push(value);
    })
    console.log(testarray);
  });
}

export default function Search() {
  const classes = useStyles(); 
  const [value, setValue] = React.useState(0);
  const [puase, setPuase] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState(); 
  const [select, setSelect] = React.useState([]);

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  
  const [checked, setChecked] = React.useState(test);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };


  ////// 경로 출력
  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach(k => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };
  

  // 기본 경로
  const path = {
    label: '0',
    value: '0',
    children: [
      {
        label: '1',
        value: '1',
        children: [
          {
            label: '2',
            value: '2'
          }
        ]
      },
      {
        label: '11',
        value: '11',
        children: [
          {
            label: '22',
            value: '22'
          }
        ]
      },
      {
        label: '111',
        value: '111',
        children: [
          {
            label: '222',
            value: '222'
          }
        ]
      }
    ]
  };

  // 현재 목록
  let path_data = path;
  // 검색에 사용된 경로 목록
  let select_data = [];
  // checked 변경시
  const onChange = (currentNode, selectedNodes) => {
    select_data = selectedNodes;
    console.log(JSON.stringify(select_data));
  };

  const onClick = () => {
    console.log(JSON.stringify(select_data));
  }

  const onNodeToggle = (currentNode) => {
    console.log(getDir('C:/Users'));
  }

  
  // 초기 셋팅
  assignObjectPaths(path_data);

  
  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>{/* 검색 시작 화면 */ }
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8}>{/* 최근 검사 일자 */ }
            <TextField
              id="outlined-read-only-input"
              label="최근 검사"
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              defaultValue="이전 검사일을 알 수 없음"
              variant="outlined"
            >검사내역</TextField>
          </Grid>
          <Grid item xs={12} sm={3}>{/* 검색 시작 버튼 */ }
            <Fab
              variant="extended"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={()=>{setValue(1); setSelect(select_data);}}
            >
              검사 시작
            </Fab>
          </Grid>
          <Grid item xs={12} sm={1}>{/* 검색 설정 */ }
            <Button onClick={handleClick('bottom-end')}>
              <SettingIcon/>
            </Button>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <List className={classes.root}>
                    {setting_data.searchSetting.map(value => {
                      const labelId = `op-${value.id}`;
                      return (
                        <ListItem disabled={value.disable} key={value.id} role={undefined} dense button onClick={handleToggle(value.id)}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`${value.name}`} />
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </Fade>
            )}
            </Popper>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={5}>{/* 검색 경로 설정 */ }
          <Grid item xs>
            <DropdownTreeSelect 
            data={path_data}
            onChange={onChange}
            onNodeToggle={onNodeToggle}
            className="mdl-demo"
            showDropdown="always"/>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>{/* 검색중 페이지 */ }
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
            value="검사내역"
            />
          </Grid>
          {/* 일시 중지 및 다시 시작 버튼 */}
          <Grid item xs={12} sm>
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
          </Grid>
          {/* 검사 중지 버튼 */}
          <Grid item xs={12} sm>
            <Fab
              variant="extended"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={()=>setValue(0)}
            >
              검사 중지
            </Fab>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center" spacing={5}>
          {JSON.stringify(select)}
        </Grid>
      </TabPanel>
    </div>
  );
}