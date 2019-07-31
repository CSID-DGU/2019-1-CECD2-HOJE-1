const fs = require('fs');
const PATH = require('path');

import React, {useState, useEffect, useReducer} from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import DropdownTreeSelect from "react-dropdown-tree-select";
import delay from 'delay';
import CLASSIFICATION from '../../main/FrameTest/imageClassifications';
import makeDictionary from "../../main/FrameTest/makeDictionary";
import Tree from './Tree';

const notifier = require('node-notifier'); //notification 을 사용하기 위한 모듈
const {regRead,regReset,TessNreg} = require('../../main/FrameTest/reg/regTojson');
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

//설정 파일 불러오기
let setting_data = fs.readFileSync(`${__dirname}/../pages/settingdata.json`, 'utf8');
setting_data = JSON.parse(setting_data);
let test = [];
setting_data.searchSetting.map(element => {
    if (element.checked === true) {
        test.push(element.name);
    }
});

let resultList = []; //결과를 저장하는 리스트
let isPlaying = false; //실행 버튼 클릭 여부
let isStop = true; //일시 정지 버튼 클릭 여부
let isDoing = false; //반복문이 동작하는지 여부
let isDone = false; //검색 중지
let de = delay(250000); //일시 중지

export default function Search() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [puase, setPuase] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [selectedFile, setSelectedFile] = React.useState([]);
    const [ReRender, setReRender] = React.useState(0);
    const [filePath, setPath] = useState('');
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
        //newChecked.sort();
        setChecked(newChecked);
    };
    //핵심 모듈(Tesseract OCR 추출 및 정규식 검출, 문서 분류)
    const Exec = async function (startPath, extension) {
        let files = fs.readdirSync(startPath, {withFileTypes: true}); //해당 디렉토리에 파일 탐색
        for (const tmp of files) {
            if (isStop && isDoing) { //일시 정지
                await de; //딜레이가 종료 될때까지 반복문 await
                de = delay(250000);
            }
            if(isDone)
                break;
            if (tmp.isDirectory()) { //디렉토리 경우
                Exec(PATH.join(startPath, tmp.name), extension); //디렉토리 안의 파일을 탐색(재귀적으로 호출)
            } else { //파일 경우
                let ppath = PATH.join(startPath, tmp.name);
                let data = null;
                setPath(ppath);
                let lowerCase = ppath.toLowerCase();
                console.log(ppath);
                if (lowerCase.match(extension[0]) || lowerCase.match(extension[1]) || lowerCase.match(extension[2])) { //확장자가 jpg,png,tif 일 경우
                    let result1, result2;
                    result1 = TessNreg(ppath); //Tesseract OCR 및 정규식 표현
                    result2 = CLASSIFICATION(ppath,"HR"); //문서 분류
                    //result2 = null; //서버와 통신을 안할 때의 test용
                    //결과값을 프로미스 형태로 받기 때문에 프로미스가 완전히 완료 될 때 까지 await
                    await Promise.all([result1, result2]).then(async resolve => {
                        data = await makeDictionary(resolve[1], tmp.name,ppath, resolve[0]); //검사 결과를 딕션너리 형태로
                        setPath(ppath); //탐색 경로 추가
                        //console.log(resolve[0], ' ' , resolve[1]);
                        resultList.push(data); //검사 결과를 리스트에 추가
                    });
                    if(data.CLASSIFICATION === null)
                        break;
                }
            }
            await delay(1000); //사용자에게 가시적으로 보여주기 위한 딜레이
        }

        return 0; //재귀 호출이기 때문에 리턴
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
    };

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
    const showList = (data) => { //리스트에 있는 값 출력
        return data.map(element => {
            return (
                <div>
                   FileName : {element.fileName} | Classification : {element.classification} | DetectList : {element.detectList} | DetectCount : {element.detectCount} | FormLevel : {element.formLevel}
                </div>
            )
        })
    };
    // 초기 셋팅
    assignObjectPaths(path_data);
    return (
        <div className={classes.root}>
            <TabPanel value={value} index={0}>{/* 검색 시작 화면 */}
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
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
                    <Grid item xs={12} sm={3}>{/* 검색 시작 버튼 */}
                        <Fab
                            variant="extended"
                            color="primary"
                            aria-label="Add"
                            className={classes.margin}
                            onClick={async () => { //시작 버튼
                                if(open === true) {
                                    setOpen(false);
                                }
                                setValue(1);
                                console.log('start');
                                isDoing = true;
                                isPlaying = true;
                                isStop = false;
                                isDone = false;
                                setPath('');
                                resultList = [];
                                await regRead(checked);
                                //ToDo 해당 경로가 절대 경로, 차후에 상대경로로
                                Exec(`C:\\Users\\FASOO_499\\Desktop\\FrameTest`, ['.jpg','.png','.tif']);
                            }}
                        >
                            검사 시작
                        </Fab>
                    </Grid>
                    <Grid item xs={12} sm={1}>{/* 검색 설정 */}
                        <Button onClick={handleClick('bottom-end')}>
                            <SettingIcon/>
                        </Button>
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <List className={classes.root}>
                                            {setting_data.searchSetting.map(value => {
                                                const labelId = `op-${value.id}`;
                                                return (
                                                    <ListItem disabled={value.disable} key={value.id} role={undefined}
                                                              dense button onClick={handleToggle(value.name)}>
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
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={5}>{/* 검색 경로 설정 */}
                    <Grid item xs>
                        <Tree onChecked={onChecked} onToggle={onToggle} data={path_data}/>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>{/* 검색중 페이지 */}
                <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            id="outlined-read-only-input"
                            label="검사중 파일"
                            margin="normal"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            value={filePath}
                        />
                    </Grid>
                    {/* 일시 중지 및 다시 시작 버튼 */}
                    <Grid item xs={12} sm>
                        {/* 일시 중지 버튼 */}
                        <div hidden={puase % 2 === 0 ? false : true}>
                            <Fab
                                variant="extended"
                                color="primary"
                                aria-label="Add"
                                className={classes.margin}
                                onClick={() => {
                                    setPuase(1);
                                    console.log('Pause');
                                    //실행 중인 경우
                                    isPlaying = false;
                                    isStop = true;
                                }}
                            >
                                일시 중지
                            </Fab>
                        </div>
                        {/* 다시 시작 버튼 */}
                        <div hidden={puase % 2 === 1 ? false : true}>
                            <Fab
                                variant="extended"
                                color="primary"
                                aria-label="Add"
                                className={classes.margin}
                                onClick={() => {
                                    setPuase(0);
                                    console.log('restart');
                                    //다시 시작할 경우
                                    de.clear();
                                    isStop = false;
                                    isPlaying = true;
                                }}
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
                            onClick={() => {
                                setValue(0);
                                console.log('done');
                                if(isStop && isPlaying){
                                    de.clear(); //일시정지 일 경우
                                }
                                isDone = true;
                                regReset();
                                reset(); //경로, 검색해야되는 부분 리셋
                                console.log(resultList);
                                if(resultList.length > 0){ //배열에 값이 들어 갔을 경우
                                    let json = JSON.stringify(resultList);
                                    fs.writeFileSync('resultfile.json',json,'utf8');
                                    console.log('file created');
                                }
                            }}
                        >
                            검사 중지
                        </Fab>
                    </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" spacing={5}>
                    <h3>{showList(resultList)}</h3>
                </Grid>
            </TabPanel>
        </div>
    );
}
