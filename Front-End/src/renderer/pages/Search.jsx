import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {ipcRenderer} from'electron';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import SettingIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import setting_data from './settingdata.json';

import Typography from '@material-ui/core/Typography';

import Tree from './Tree';

import SearchHeader from './SearchHeader';
import SearchBody from './SearchBody';

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
    const {children, value, index} = props;

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
    if (value.checked === true) {
        test.push(value.name);
    }
})

let testvalue = 0;

export default function Search() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [selectedFile, setSelectedFile] = React.useState([]);
    const [ReRender, setReRender] = React.useState(false);

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

    // Forced ReRendering
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => {
        updateState({});
        setReRender(false)
    }, []);
    React.useEffect(() => {
        if (ReRender) {
            setTimeout(forceUpdate, 1000);
        }
    })

    const onToggle = (currentNode) => {
        let tmp_path_data = path_data;
        if (currentNode.isOpen) {
            //console.log(currentNode);
            fs.readdir(currentNode.path, function (error, dir) {
                dir.map(value => {
                    if (value.match('\\.') === null) {
                        const path = currentNode.path + '/' + value;
                        if (tmp_path_data[currentNode.path].children.indexOf(path) === -1) {
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
        setReRender(true);
    }

    // 체크 목록 넣기
    const onChecked = (value) => {
        const currentIndex = selectedFile.indexOf(value.path);
        const newSelectFile = [...selectedFile];

        if (currentIndex === -1) {
            newSelectFile.push(value.path);
        } else {
            newSelectFile.splice(currentIndex, 1);
        }
        setSelectedFile(newSelectFile);
    };

    return (
        <div className={classes.root}>
            <TabPanel value={value} index={0}>{ /* 검색 시작 화면 */}
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>{/* 검색화면 헤더 */}
                    <Grid item xs={12} sm={8}>{/* 최근 검사 일자 */}
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
                    {/* 검색 시작 버튼 */}
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="Add"
                        className={classes.margin}
                        onClick={async () => {
                            if (open === true) setOpen(false);
                            setReRender(false);
                            setValue(1);
                            ipcRenderer.send('START_SEARCH',checked);
                        }}
                    >
                        검사 시작
                    </Fab>
                    {/* 검색 설정 */}
                    <IconButton onClick={handleClick('bottom-end')}>
                        <SettingIcon/>
                    </IconButton>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <List className={classes.root}>
                                        {setting_data.searchSetting.map(value => {
                                            const labelId = `op-${value.id}`;
                                            return (
                                                <ListItem disabled={value.disable} key={value.id} role={undefined} dense
                                                          button onClick={handleToggle(value.name)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(value.name) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{'aria-labelledby': labelId}}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText id={labelId} primary={`${value.name}`}/>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={5}>{/* 검색 경로 설정 */}
                    <Grid item xs>
                        <Tree onChecked={onChecked} onToggle={onToggle} data={path_data}/>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>{/* 검색중 페이지 */}
                <SearchHeader/>
                <SearchBody/>
            </TabPanel>
        </div>
    );
}
