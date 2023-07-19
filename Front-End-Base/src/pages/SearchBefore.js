import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red, yellow, green, blue } from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SettingIcon from '@material-ui/icons/Settings';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import setting_data from './settingdata.json';

import Typography from '@material-ui/core/Typography';

import Tree from '../components/Tree';

import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Tooltip from '@material-ui/core/Tooltip';
import NormalIcon from '@material-ui/icons/FiberManualRecord'
import WarningIcon from '@material-ui/icons/Error';
import DangerIcon from '@material-ui/icons/Warning';

const fs = require('fs');


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
    test.push(value.name);
  }
})

export default function SearchBefore() {
  const classes = useStyles(); 
  const [value, setValue] = React.useState(0);
  const [puase, setPuase] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState(); 
  const [selectedFile, setSelectedFile] = React.useState([]);
  const [ReRender, setReRender] = React.useState(0);

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

  // 기본 경로( Windows 기준 )
  const [path_data, setPathData] = React.useState({
    'C:/': {
      path: 'C:/',
      type: 'folder',
      checked: false,
      isRoot: true,
      children: [],
    },
  });

  const onClick = () => {
    console.log(path_data);
  }

  // Forced ReRendering
  const [,updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  React.useEffect(() => {
    if(ReRender !== 0) 
    {
      var tmp = ReRender;
      tmp = tmp - 1;
      forceUpdate();
      setReRender(tmp);
    }
  })
  
  const onToggle = (currentNode) => {
    let tmp_path_data = path_data;
    if(currentNode.isOpen){
      //console.log(currentNode);
      fs.readdir(currentNode.path, function(error, dir){
        dir.map(value => {
          if(value.match('\\.') === null){
            const path = currentNode.path + '/' + value;
            if(tmp_path_data[currentNode.path].children.indexOf(path) === -1)
            {
              //console.log(path);
              tmp_path_data[currentNode.path].children.push(path);
              tmp_path_data[path] = {
                path: `${path}`,
                type: 'folder',
                checked: false,
                children: [],
              }
            }
          }
        });
      });
      setPathData(tmp_path_data);
      //console.log(path_data);
    }
    setReRender(3);
  }

  // 체크 목록 넣기
  const onChecked  = (value) => {
    const currentIndex = selectedFile.indexOf(value.path);
    const newSelectFile = [...selectedFile];

    if (currentIndex === -1) {
      newSelectFile.push(value.path);
    } else {
      newSelectFile.splice(currentIndex, 1);
    }
    setSelectedFile(newSelectFile);
  };

  const reset = () => {
    setValue(0);
    setPuase(0);
    for (var member in path_data) 
    {
      if(member === 'C:/') path_data[member].children = [];
      else delete path_data[member];
    }
  }

  ///////////////////// 검색결과 //////////////////////////
  // 검색 결과 추가
  const addRow = () => {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(rows.length, ...randomSelection));
    forceUpdate();
  }

  const styles = theme => ({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  });
  
  const theme = createMuiTheme({
    palette: {
      primary: { main: green[500] }, 
      secondary: { main: yellow[500] },
      error: { main: red[500] },
      default: { main: blue[500] },
    },
  });
  
  const iconDisplay = (input) => {
    if(input === '정상') 
    return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title="정상" placement="top"><NormalIcon color='primary' /></Tooltip>
    </MuiThemeProvider>)
    else if(input === '경고') return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title="경고" placement="top"><WarningIcon color='secondary'/></Tooltip>
    </MuiThemeProvider>)
    else if(input === '위험') return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title="위험" placement="top"><DangerIcon color='error'/></Tooltip>
    </MuiThemeProvider>)
    return <Tooltip title="미등록" placement="top"><NormalIcon color='disabled' /></Tooltip>
  }
  
  const cellDisplay = (input) => {
    let tmp = [];
    for(var i = 0; i < input.length; i++)
    {
      tmp.push(input[i]);
      if(i < input.length-1) tmp.push('/');
    }
    return tmp;
  }
  
  class MuiVirtualizedTable extends React.PureComponent {
    static defaultProps = {
      headerHeight: 48,
      rowHeight: 40,
    };
  
    getRowClassName = ({ index }) => {
      const { classes, onRowClick } = this.props;
  
      return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
      });
    };
  
    cellRenderer = ({ cellData, columnIndex }) => {
      const { columns, classes, rowHeight, onRowClick } = this.props;
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          style={{ height: rowHeight }}
          align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
        >
          {columnIndex === 2 ? cellDisplay(cellData) : (columnIndex === 4 ? iconDisplay(cellData) : cellData)}
        </TableCell>
      );
    };
  
    headerRenderer = ({ label, columnIndex }) => {
      const { headerHeight, columns, classes } = this.props;
  
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="head"
          style={{ height: headerHeight }}
          align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        >
          <span>{label}</span>
        </TableCell>
      );
    };
  
    render() {
      const { classes, columns, rowHeight, headerHeight, rowCount, rowGetter } = this.props;
      return (
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={rowHeight}
              headerHeight={headerHeight}
              rowCount={rowCount}
              rowGetter={rowGetter}
              rowClassName={this.getRowClassName}
            >
              {columns.map(({ dataKey, width, label, numeric }, index) => {
                return (
                  <Column
                    key={dataKey}
                    headerRenderer={() =>
                      this.headerRenderer({
                        label: label,
                        columnIndex: index,
                      })
                    }
                    className={classes.flexContainer}
                    cellRenderer={this.cellRenderer}
                    dataKey={dataKey}
                    width={width}
                    label={label}
                    numeric={numeric}
                  />
                );
              })}
            </Table>
          )}
        </AutoSizer>
      );
    }
  }
  
  MuiVirtualizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        dataKey: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        numeric: PropTypes.bool,
        width: PropTypes.number.isRequired,
      }),
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
  };
  
  const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);
  
  const sample = [
    ['card2[1].jpg', 'card2', ['카드번호'], 1, '경고'],
    ['card2[2].jpg', 'card2', ['카드번호'], 1, '경고'],
    ['card3.jpg', 'card3', ['카드번호'], 1, '정상'],
    ['text-out.jpg', 'Unregistered', [], 0, 'None'],
    ['sample.jpg', 'registCard', ['주소', '주민등록번호'], 2, '정상'],
    ['sample2.jpg', 'registCard', ['주소', '주민등록번호'], 2, '정상'],
    ['sample3.jpg', 'registCard', ['주소', '주민등록번호'], 2, '정상'],
    ['sample2.jpg', 'registCard', ['주소', '주민등록번호'], 2, '정상'],
    ['good.jpg', 'Unregistered', [], 0, 'None'],
  ];
  
  function createData(id, fileName, classification, detectList, detectCount, formLevel) {
    return {id, fileName, classification, detectList, detectCount, formLevel };
  }
  
  const rows = [];
  
  for (let i = 0; i < 20; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
  }

  return (
    <div className={classes.root}>
      <TabPanel value={value} index={0}>{ /* 검색 시작 화면 */ }
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>{/* 검색화면 헤더 */}
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
          <div className={classes.spacer}/>
          {/* 검색 시작 버튼 */ }
            <Fab
              variant="extended"
              color="primary"
              aria-label="Add"
              className={classes.margin}
              onClick={()=>{ if(open === true) setOpen(false); setValue(1);}}
            >
              검사 시작
            </Fab>
          {/* 검색 설정 */ }
            <IconButton onClick={handleClick('bottom-end')}>
              <SettingIcon/>
            </IconButton>
            <Popper open={open} anchorEl={anchorEl} placement={placement} transition >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <List className={classes.root}>
                    {setting_data.searchSetting.map(value => {
                      const labelId = `op-${value.id}`;
                      return (
                        <ListItem disabled={value.disable} key={value.id} role={undefined} dense button onClick={handleToggle(value.name)}>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(value.name) !== -1}
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
        <Grid container justify="center" alignItems="center" spacing={5}>{/* 검색 경로 설정 */ }
          <Grid item xs>
            <Tree onChecked={onChecked} onToggle={onToggle} data={path_data}/>
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
              onClick={()=>{reset()}}
            >
              검사 중지
            </Fab>
        </Grid>
        <Paper style={{ height: 400, width: '100%' }}>
          <VirtualizedTable
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={[
              {
                width: 200,
                label: '파일명',
                dataKey: 'fileName',
              },
              {
                width: 120,
                label: '분류',
                dataKey: 'classification',
              },
              {
                width: 120,
                label: '검출 내역',
                dataKey: 'detectList',
              },
              {
                width: 120,
                label: '검출 개수',
                dataKey: 'detectCount',
                numeric: true,
              },
              {
                width: 120,
                label: '문서등급',
                dataKey: 'formLevel',
                numeric: true,
              },
            ]}
          />
        </Paper>
      </TabPanel>
    </div>
  );
}