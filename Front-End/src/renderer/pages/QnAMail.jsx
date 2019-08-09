import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Paper, FormControl, InputLabel, Select, MenuItem, Fab, Grid, TextField, Popover} from '@material-ui/core';
import {List, Divider, CardActionArea, CardMedia, CardContent} from '@material-ui/core';
import {ipcRenderer, shell} from 'electron';
import cropImage from '../../main/FrameTest/cropImage';
const PATH = 'C:\\Users\\FASOO_499\\Desktop\\image';
const path = require('path');
const fs = require('fs');
import UploadSubImage from '../../main/FrameTest/uploadSubImage';
import UploadImage from '../../main/FrameTest/uploadImage';
const nativeImage = require('electron').nativeImage;
let findImage = nativeImage.createFromPath('');
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
        maxHeight: 330,
        maxWidth: 600,
        height: '100%',
        width: '100%',
    },
    content: {
        padding: theme.spacing(2),
        width: 330,
    },
}));
const notifier = require('node-notifier');
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
let data = null;
export default function QnAMail(props) {
    const {sendingImagePath} = props;
    const classes = useStyles();
    const classes2 = mylistStyles();
    const [value, setValue] = React.useState(1);//null: 기본 페이지, 1: 구분요청, 2: 오탐
    // Forced ReRendering
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [crop, setCrop] = useState(false);
    const [list,setList] = useState([]);
    const [send,setSend] = useState([]);
    const [sendContent, ] = React.useState(['']);
    function handleChange(event) {
        setValue(event.target.value);
    };
    const [imagePath, setImagePath] = React.useState('');
    const [iimage, setImage] = React.useState(nativeImage.createFromPath('').toDataURL());
    useEffect(() => {
        ipcRenderer.send('QNA_READY', 'ready'); //페이지 로딩이 완료되면
        ipcRenderer.once('RESULT2', (event, result) => {
            data = result;
            //console.log('useEffect data : ', data);
            if (data !== null) {
                setImagePath(data);
                findImage = nativeImage.createFromPath(path.normalize(imagePath));
                setImage(findImage.toDataURL());

            }
        });
    });

    const txtChange = prop => event => {
        const index = list.indexOf(prop);
        send[index] = event.target.value;
    };

    const txtContent = () => event => {
        sendContent[0] = event.target.value;
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
                <Fab variant="extended" className={classes.fab}
                     disabled={value === 2? (crop? false: true) : false}
                onClick={()=>{
                    if(value== 1){
                        UploadImage(sendContent.pop(),data,"HR");
                    }else if(value ==2) {
                        UploadSubImage(send, data, "HR");
                        setSend([]);
                        setList([]);
                        console.log('test')
                    }
                   // forceUpdate();
                }}>전 송</Fab>
                {/* 두번째 줄 */}
                <Grid item xs={9}>
                    <TextField
                        label="이미지 경로"
                        style={{margin: 8}}
                        placeholder="경로"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={imagePath}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Fab variant="extended" disabled={value !== 2 || crop ? true : false} className={classes.imagecrop}
                     onClick={async () => {
                         console.log('imagePath : ', imagePath);
                         await cropImage(imagePath);  //Todo 경로 설정
                         let files = fs.readdirSync(PATH); //해당 디렉토리 탐색
                         const newsend = send;
                         let listImage = [];
                         for(let i = 0; i < files.length; i++)
                         {
                             newsend.push(i);
                         }
                         setSend(newsend);
                         for(const tmp of files){
                             let p = path.join(PATH,tmp);
                             listImage.push(nativeImage.createFromPath(p).toDataURL());
                         }
                         setList(listImage);
                         notifier.notify({
                             title : "Image Crop Success",
                             message : "이미지 확인을 하고 싶으면 클릭하세요",
                             wait : true,
                             timeout : 2
                         },function(err,response){
                             console.log('response  :' , response);
                             if(response.match('clicked'))
                                 shell.openItem(PATH);
                         });
                         setCrop(true);
                     }}>이미지
                    자르기</Fab>
            </Grid>
            <Paper className={classes.list}>
                <TabPanel value={value} index={null}>{ /* 문의 초기 화면 */}
                    구분을 선택해 주세요.
                </TabPanel>
                <TabPanel value={value} index={1}>{ /* 분류구분 추가신청 화면 */}
                    <Grid item alignItems="center" justify="center">
                        <Grid xs={12} item>
                            <CardActionArea onClick={handleClick}>
                                <CardContent>해당되는 이미지에 대한 설명을 적으려면 이미지를 클릭하세요</CardContent>
                                <img height="100%" width="100%" src={iimage} alt={""}/>
                            </CardActionArea>
                        </Grid>
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
                                   rows="6" fullWidth margin="normal" variant="outlined" value={sendContent} onChange={txtContent()}/>
                    </Popover>
                </TabPanel>
                <TabPanel value={value} index={2}>{ /* 오탐지 수정요청 화면 */}
                    <List className={classes2.root}>
                        {
                            list.map(item =>
                                <div>
                                    <Grid container divider zeroMinWidth className={classes2.item}>
                                        <Grid xs={6} item><img style={{marginTop: 12, marginBottom: 12}} maxHeight="303"
                                                               maxWidth="343" height="98%" width="100%"
                                                               src={item} alt={""}/></Grid>
                                        <Grid xs={6} item>
                                            <TextField id={`submit-text-${item}`} onChange={txtChange(item)} label="이미지 내의 텍스트를 적어주세요" multiline
                                                       rows="3" fullWidth margin="normal" variant="filled"/>
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
