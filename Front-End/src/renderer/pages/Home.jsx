import React,{useEffect,useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Box, MobileStepper, Button, Badge } from '@material-ui/core';
import { ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from '@material-ui/core';
import { Polar, HorizontalBar } from 'react-chartjs-2';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import RecentSearchIcon from '@material-ui/icons/CalendarToday';
import UpdataIcon from '@material-ui/icons/Update';

const fs= require('fs');
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const nativeImage = require('electron').nativeImage;
const FasooImage = nativeImage.createFromPath(`assets/fasoo.png`);
const hojeImage = nativeImage.createFromPath('assets/hoje.png');
const moment = require('moment');
import DownloadFile from '../../main/FrameTest/DownloadFile';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    maincontent: {
        backgroundColor: '#bdbdbd',
    },
    maincontentActive: {
        backgroundColor: '#ffffff',
    },
    image: {
        height: 150,
        width: '100%',
    },
    imagecontent: {
        textAlign: 'center',
    },
    chartTitle: {
        textAlign: 'center',
    },
    paper: {
        height: 500,
        width: '100%',
        backgroundColor: '#e8f5e9',
    },
    test: {
        textAlign: 'center',
        backgroundColor: '#ffffff',
    },
    versions: {
        textAlign: 'right',
    },
}));

let test = [];

// 막대
const classifyData = {
    labels : ["검사"],
    datasets: [{
        label: '대외비',
        data: [0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    },{
        label: '사내한',
        data: [0],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    },
        {
            label: '공개',
            data: [0],
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        },
        {
            label: 'None',
            data: [0],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
}
// 원형
const detectData = {
    labels: ['주민등록번호', '여권번호', '통장번호'],
    datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1
    }]
}
const classifyOptions = {
    title: {
        display: true,
        padding: 20,
        fontSize: 15,
        position: 'top',
        text: '최근 검사 분류 결과                                                                                                         '
    },
    legend: {
        position: 'bottom',
        labels: {
            padding: 10,
            fontSize: 17,
        }
    },
    scales: {
        xAxes: [{
            stacked: true
        }],
        yAxes: [{
            stacked: true
        }]
    }
}
const detectOptions = {
    layout: {
        padding: {
            left: 0,
            right: 50,
            top: 0,
            bottom: 0
        }
    },
    legend: {
        position: 'right',
        labels: {
            padding: 20,
            fontSize: 17,
        }
    }
}

function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}

const classifyChart = () => {
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
        return value.formLevel === 'CONFIDENTIALITY';})
    let no2 = temp.filter(function(value){
        return value.formLevel === 'COMPANY_ONLY';}) //Todo 수정
    let no3 = temp.filter(function(value){
        return value.formLevel === 'PUBLIC';})
    let no4 = temp.filter(function(value){
        return value.formLevel === 'NONE';})

    classifyData.datasets[0].data[0] = no1.length;
    classifyData.datasets[1].data[0] = no2.length;
    classifyData.datasets[2].data[0] = no3.length;
    classifyData.datasets[3].data[0] = no4.length;

    for(var i = 0; i < classifyData.datasets.length; i++)
    {
        let r = getRandomInt(0,255), g = getRandomInt(0,255), b = getRandomInt(0,255);
        classifyData.datasets[i].backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
        classifyData.datasets[i].borderColor = `rgba(${r}, ${g}, ${b}, 1.0)`;
    }
    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
                <HorizontalBar height={82} data={classifyData} options={classifyOptions} />
            </Grid>
        </Grid>);
}

const countListPattern = () =>{
    let tmp = [];
    for(const t of test){
        for(const dl of t.detectList){
            tmp.push(dl);
        }
    }
    tmp = Array.from(new Set(tmp));
    return tmp;

};
const detectListChart = () => {
    const listOfPattern = countListPattern();
    let temp = test.map(value => {return value});
    let indexLIst = [];
    for(let i = 0 ; i < listOfPattern.length ; i++){
        let no1 = temp.filter(function(value){
            return value.detectList.indexOf(listOfPattern[i]) !== -1;});
        indexLIst.push(no1);
    }
    detectData.labels = listOfPattern; // 수정
    detectData.datasets[0].data = [];
    for(const t of indexLIst) {
        detectData.datasets[0].data.push(t.length);
    }
    detectData.datasets[0].backgroundColor = [];
    detectData.datasets[0].borderColor = [];

    for(var i = 0; i < detectData.datasets[0].data.length; i++)
    { //랜덤으로 채워지는 것
        let r = getRandomInt(0,255), g = getRandomInt(0,255), b = getRandomInt(0,255);
        detectData.datasets[0].backgroundColor.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
        detectData.datasets[0].borderColor.push(`rgba(${r}, ${g}, ${b}, 1.0)`);
    }

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Polar height={130} data={detectData} options={detectOptions} />
            </Grid>
        </Grid>);
}

//이미지 보여지는 곳
const testImageList = [
    FasooImage.toDataURL(),
    hojeImage.toDataURL()
]

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [activeStep, setActiveStep] = React.useState(0);
    const [,setUpdate] = useState([]);
    const [birth, setBirth] = useState('');
    const [jpg , setJPG] = useState();
    const [png,setPNG] = useState();
    const [gif, setGIF] = useState();
    const maxSteps = testImageList.length;
    useEffect(()=>{
        fs.exists('resultfile.json', (exists => {
            if (exists) {
                test = fs.readFileSync('resultfile.json', 'utf8');
                test = JSON.parse(test);
                fs.stat(`${__dirname}/../../../resultfile.json`,(err,stat)=>{
                    let data = moment(stat.atime).format('YYYY년 MM월 DD일');
                    setBirth(data);
                })
                let temp = test.map(value => {
                    return value
                });
                let no1 = temp.filter(function (value) {
                    return value.fileName.indexOf('jpg') !== -1;
                })
                let no2 = temp.filter(function (value) {
                    return value.fileName.indexOf('png') !== -1;
                })
                let no3 = temp.filter(function (value) {
                    return value.fileName.indexOf('gif') !== -1;
                })
                setJPG(no1.length);
                setPNG(no2.length);
                setGIF(no3.length);

            }else
                setBirth('이전 검사일을 알 수 없음');
            setUpdate();
        }));
    },[]);

    // Forced ReRendering
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    function handleStepChange(step) {
        setActiveStep(step);
    }

    return(
        <div className={classes.root}>
            <Box border={1} borderColor='#c5e1a5' borderRadius={10} className={classes.paper}>
                <Grid container
                      justify="center"
                      alignItems="center"
                      direction="row">
                    {/* 요약 및 광고 구역 */}
                    <Grid item xs={5}>
                        <Box borderRight={2} borderColor='#827717'>
                            <Grid container
                                  justify="center"
                                  alignItems="center"
                                  direction="row">
                                <Grid item xs={12}>
                                    <Grid container
                                          justify="center"
                                          alignItems="center"
                                          direction="row">
                                        <Grid item xs={9}>
                                            <Box style={{height: 246, padding: 10, backgroundColor: '#e8f5e9', borderTopLeftRadius: '10px'}}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar style={{backgroundColor: '#212121'}}>
                                                            <RecentSearchIcon style={{color: '#ffffff'}}/>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="최근 검사일" secondary={birth} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar style={{backgroundColor: '#212121'}}>
                                                            <IconButton>
                                                                <UpdataIcon style={{color: '#ffffff'}} onClick={()=> {
                                                                    console.log('Download...');
                                                                    DownloadFile();
                                                                    forceUpdate();
                                                                }
                                                                }/>
                                                            </IconButton>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="최근 업데이트" secondary={"Jan 9, 2014"} />
                                                </ListItem>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box style={{height: 246, textAlign: 'center', backgroundColor: '#e8f5e9'}}>
                                                <Box style={{padding: 8}}>
                                                    <Badge badgeContent={test.length} showZero='true' color="secondary">
                                                        <Button style={{backgroundColor: '#1b5e20', color: '#ffffff', borderRadius: '10px', height: 44, width: 80}}>
                                                            Total
                                                        </Button>
                                                    </Badge>
                                                </Box>
                                                <Box style={{padding: 8}}>
                                                    <Badge badgeContent={jpg} showZero='true' color="secondary">
                                                        <Button style={{backgroundColor: '#33691e', color: '#ffffff', borderRadius: '10px', height: 44, width: 80}}>
                                                            JPG
                                                        </Button>
                                                    </Badge>
                                                </Box>
                                                <Box style={{padding: 8}}>
                                                    <Badge badgeContent={png} showZero='true' color="secondary">
                                                        <Button style={{backgroundColor: '#827717', color: '#ffffff', borderRadius: '10px', height: 44, width: 80}}>
                                                            PNG
                                                        </Button>
                                                    </Badge>
                                                </Box>
                                                <Box style={{padding: 8}}>
                                                    <Badge badgeContent={gif} showZero='true' color="secondary">
                                                        <Button style={{backgroundColor: '#e65100', color: '#ffffff', borderRadius: '10px', height: 44, width: 80}}>
                                                            GIF
                                                        </Button>
                                                    </Badge>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box borderTop={3} borderColor='#c5e1a5' style={{height: 250}}>
                                        <AutoPlaySwipeableViews
                                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                            index={activeStep}
                                            onChangeIndex={handleStepChange}
                                            enableMouseEvents
                                            style={{height: 224, overflow: 'hidden',}}
                                        >
                                            {testImageList.map((step, index) => (
                                                <div>
                                                    {Math.abs(activeStep - index) <= 2 ? (
                                                        <img style={{height: 224, width: '100%'}} src={step} alt={''} />
                                                    ) : null}
                                                </div>
                                            ))}
                                        </AutoPlaySwipeableViews>
                                        <MobileStepper
                                            variant="dots"
                                            steps={maxSteps}
                                            position="static"
                                            activeStep={activeStep}
                                            style={{backgroundColor: '#f1f8e9', borderBottomLeftRadius: '10px'}}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    {/* 차트 구역 */}
                    <Grid item xs={7}>
                        <Box style={{boxShadow: '1px 1px 1px', marginTop: 15, marginBottom: 15, marginLeft: 10, marginRight: 10, backgroundColor: '#ffffff', borderRadius: 10}}>
                            <Grid container
                                  justify="center"
                                  alignItems="center"
                                  direction="row"
                                  spacing={3}>
                                <Grid item xs={12}>{classifyChart()}</Grid>
                                <Grid item xs={12}>{detectListChart()}</Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}