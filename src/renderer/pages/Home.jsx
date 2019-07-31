import React, {useState,useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import {Link} from 'react-router-dom';
const path = require('path');
const nativeImage = require('electron').nativeImage;
const findImage = nativeImage.createFromPath(path.normalize(`${__dirname}/../../../assets/Find.png`));
const BookmarkImage = nativeImage.createFromPath(path.normalize(`${__dirname}/../../../assets/Bookmark.png`));
const patternImage = nativeImage.createFromPath(path.normalize(`${__dirname}/../../../assets/Pattern.png`))
const identicationImage = nativeImage.createFromPath(path.normalize(`${__dirname}/../../../assets/Identification.png`))
const fs = require('fs');
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 220,
    },
}));


let test =[];
function cal_result(index) {
    const classes = new useStyles();
    let Result;
    // 분류된 파일 (공개, 사내한, 대외비)
    if (index === 0) {
        let temp = test.map(value => {
            return value
        });
        let no1 = temp.filter(function (value) {
            return value.formLevel === '대외비';
        });
        let no2 = temp.filter(function (value) {
            return value.formLevel === '사내한';
        });
        let no3 = temp.filter(function (value) {
            return value.formLevel === '공개';
        });
        let no4 = temp.filter(function (value) {
            return value.formLevel === 'None';
        });
        Result =
            <Grid container justify="center" alignItems="center"
                  direction="row" spacing={3}>
                <Grid item xs={3}><Box border={1} className={classes.paper}>대외비 : {no1.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>사내한 : {no2.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>공개 : {no3.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>미분류 : {no4.length}</Box></Grid>
            </Grid>;
    }
    // 검출된 파일 (고유식별 검출, 사내한 분류, 공개 분류)??? 필요할까??
    else if (index === 1) {
        let temp = test.map(value => {
            return value
        });
        let no1 = temp.filter(function (value) {
            return value.level === '고유식별정보 검출';
        })
        let no2 = temp.filter(function (value) {
            return value.level === '사내한 분류';
        })
        let no3 = temp.filter(function (value) {
            return value.level === '공개';
        })
        Result =
            <Grid container justify="center" alignItems="center"
                  direction="row" spacing={3}>
                <Grid item xs={3}><Box border={1} className={classes.paper}>고유식별정보 검출 : {no1.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>사내한 분류 : {no2.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>공개 : {no3.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}></Box></Grid>
            </Grid>;
    }
    // 패턴포함 파일 (주민등록번호, 여권번호, 통장번호)
    else if (index === 2) {
        let temp = test.map(value => {
            return value
        });
        let no1 = temp.filter(function (value) {
            return value.detectList.indexOf('주민번호') !== -1;
        })
        let no2 = temp.filter(function (value) {
            return value.detectList.indexOf('여권번호') !== -1;
        })
        let no3 = temp.filter(function (value) {
            return value.detectList.indexOf('계좌번호') !== -1;
        })
        Result =
            <Grid container justify="center" alignItems="center"
                  direction="row" spacing={3}>
                <Grid item xs={3}><Box border={1} className={classes.paper}>주민등록번호 : {no1.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>여권번호 : {no2.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>계좌번호 : {no3.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}></Box></Grid>
            </Grid>;
    }
    // 형식식별 파일 (JPG, PNG, TIF)
    else if (index === 3) {
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
            return value.fileName.indexOf('tif') !== -1;
        })
        Result =
            <Grid container justify="center" alignItems="center"
                  direction="row" spacing={3}>
                <Grid item xs={3}><Box border={1} className={classes.paper}>JPG : {no1.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>PNG : {no2.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}>TIF : {no3.length}</Box></Grid>
                <Grid item xs={3}><Box border={1} className={classes.paper}></Box></Grid>
            </Grid>;
    } else Result = <div></div>

    return Result;
}

function TabPanel(props) {
    const {value, index} = props;

    return (
        <div hidden={value !== index}>
            {cal_result(index)}
        </div>
    );
}

TabPanel.propTypes = {
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function Home() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [,setUpdate] = useState([]);
    useEffect(()=>{
        fs.exists('resultfile.json', (exists => {
            if (exists) {
                test = fs.readFileSync('resultfile.json', 'utf8');
                test = JSON.parse(test);
            }
            setUpdate();
        }));
    },[]);
    return (
        <div className={classes.root}>
            <Grid container
                  justify="center"
                  alignItems="center"
                  direction="row"
                  spacing={3}>
                <Grid item xs={3}>
                    <CardActionArea>
                        <CardMedia className={classes.paper} image={BookmarkImage.toDataURL()} title="1" onClick={() => {
                            setValue(0)
                        }}/>
                    </CardActionArea>
                </Grid>
                <Grid item xs={3}>
                    <CardActionArea>
                        <CardMedia className={classes.paper} image={findImage.toDataURL()} title="2" onClick={() => {
                            setValue(1)
                        }}/>
                    </CardActionArea>
                </Grid>
                <Grid item xs={3}>
                    <CardActionArea>
                        <CardMedia className={classes.paper} image={identicationImage.toDataURL()} title="3" onClick={() => {
                            setValue(2)
                        }}/>
                    </CardActionArea>
                </Grid>
                <Grid item xs={3}>
                    <CardActionArea>
                        <CardMedia className={classes.paper} image={patternImage.toDataURL()} title="4" onClick={() => {
                            setValue(3)
                        }}/>
                    </CardActionArea>
                </Grid>
            </Grid>
            <TabPanel value={value} index={0}/>
            <TabPanel value={value} index={1}/>
            <TabPanel value={value} index={2}/>
            <TabPanel value={value} index={3}/>
        </div>
    )
}