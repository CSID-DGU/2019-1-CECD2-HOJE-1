import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, InputLabel, Select, MenuItem, Fab, Grid, TextField } from '@material-ui/core';
import { Box, InputBase } from '@material-ui/core';
import { MobileStepper, Button } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
        backgroundColor: '#e6ee9c',
        color: '#000000',
    },
    imagecrop: {
        width: 130,
        backgroundColor: '#e6ee9c',
        color: '#000000',
    },
    paper: {
        background: '#ffffff',
        width: '100%',
        height: 500,
    },
}));
const mylistStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 380,
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
        maxHeight: 278,
        maxWidth: 800,
        height: '100%',
        width: '100%',
        borderRadius: '10px',
    },
    center: {
        margin: 'auto',
        width: '50%',
        textAlign: 'center',
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
    const [sendIndex, setSendIndex] = useState('');
    const [sendContent, ] = React.useState(['']);
    const [activeStep, setActiveStep] = React.useState(0);
    const theme = useTheme();
    const [maxSteps, setSteps] = React.useState(0);

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSendIndex(activeStep+1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        setSendIndex(activeStep-1);
    }
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
        if(sendIndex !== '') setSendIndex('');
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
            <Box className={classes.paper} border={1} borderRadius={10} borderColor="#c5e1a5">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={3}>
                        <Box style={{ height: 500, marginLeft: 10 }}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
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
                                <Grid item xs={6}>
                                    <Fab variant="extended" disabled={value !== 2 ? true : false} className={classes.imagecrop}
                                         onClick={async () => {
                                             console.log('imagePath : ', imagePath);
                                             await cropImage(imagePath);  //Todo 경로 설정
                                             let files = fs.readdirSync(PATH); //해당 디렉토리 탐색
                                             const newsend = send;
                                             let listImage = [];
                                             setSteps(files.length);
                                             for(let i = 0; i < files.length; i++)
                                             {
                                                 newsend.push('');
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
                                         }}
                                    >이미지 자르기</Fab>
                                </Grid>
                                <Grid item xs={6}>
                                    <Fab variant="extended" className={classes.fab} disabled={value === 2 ? (crop ? false : true) : false}
                                         onClick={() => {
                                             if (value == 1) {
                                                 UploadImage(sendContent.pop(), data, "HR");
                                             } else if (value == 2) {
                                                 UploadSubImage(send, data, "HR");
                                                 setSend([]);
                                                 setList([]);
                                                 console.log('test')
                                             }
                                             // forceUpdate();
                                         }}>전  송</Fab>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <Box style={{ height: 500, }} borderLeft={1} borderColor="#c5e1a5">
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>{/* 이미지 경로 */}
                                    <TextField
                                        label="이미지 경로"
                                        style={{ padding: 8 }}
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
                                <Grid item xs={12}>
                                    <TabPanel value={value} index={null}>{ /* 문의 초기 화면 */}
                                        구분을 선택해 주세요.
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>{ /* 분류구분 추가신청 화면 */}
                                        <Grid item alignItems="center" justify="center">
                                            <Grid style={{ paddingLeft: 10, paddingRight: 10, }} xs={12} item>
                                                <Box style={{ height: 280, textAlign: 'center', borderTop: '1px solid', borderLeft: '1px solid', borderRight: '1px solid', borderColor: '#c5e1a5', borderTopRightRadius: '10px', borderTopLeftRadius: '10px', boxShadow: '2px 2px 2px' }}>
                                                    <img className={classes2.media} src={iimage} alt={""} />
                                                </Box>
                                                <Box style={{ height: 110, background: '#ffffff', borderBottom: '1px solid', borderRight: '1px solid', borderLeft: '1px solid', borderColor: '#c5e1a5', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px', boxShadow: '2px 2px 2px' }}>
                                                    <InputBase placeholder="이미지 설명을 적어주세요" multiline rows='4' inputProps={{ 'aria-label': 'naked' }}
                                                               fullWidth margin="normal" value={sendContent} onChange={txtContent()} style={{ paddingLeft: 15, paddingRight: 15, }} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>{ /* 오탐지 수정요청 화면 */}
                                        <Grid style={{ paddingLeft: 10, paddingRight: 10, }} xs={12} item>
                                            <Box style={{ height: 390, border: '1px solid', borderRadius: '10px', borderRight: '1px solid', borderColor: '#c5e1a5', boxShadow: '2px 2px 2px' }} border={1}>
                                                <Box style={{ height: 280, }}>
                                                    <img className={classes2.media} src={list[activeStep]} alt={''} />
                                                </Box>
                                                <Box style={{ height: 60, background: '#ffffff', }}>
                                                    <InputBase placeholder="이미지 설명을 적어주세요" multiline rows='2' inputProps={{ 'aria-label': 'naked' }}
                                                               fullWidth margin="normal" value={send[sendIndex]} onChange={txtChange(list[activeStep])} style={{ paddingLeft: 15, paddingRight: 15, }} />
                                                </Box>
                                                <MobileStepper
                                                    steps={maxSteps}
                                                    position="static"
                                                    variant="text"
                                                    activeStep={activeStep}
                                                    nextButton={
                                                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                                            Next
                                                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                        </Button>
                                                    }
                                                    backButton={
                                                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                            Back
                                                        </Button>
                                                    }
                                                    style={{ backgroundColor: '#f1f8e9', borderTop: '1px solid #e0e0e0', borderBottomRightRadius: '10px', borderBottomLeftRadius: '10px' }}
                                                />
                                            </Box>
                                        </Grid>
                                    </TabPanel>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}
