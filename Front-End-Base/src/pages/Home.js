import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMedia from'@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';

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

const test = [
  {
    path: '/test',
    FileName: '민증1.jpg',
    Classification: '주민등록증',
    DetectList: ["주민등록번호", " 주소"],
    DetectCount: 2,
    FormLevel: '대외비',
  },
  {
    path: '/test1',
    FileName: '이력서1.jpg',
    Classification: '이력서',
    DetectList: ["주소"],
    DetectCount: 1,
    FormLevel: '사내한',
  },
  {
    path: '/test2',
    FileName: '이력서2.jpg',
    Classification: '이력서',
    DetectList: ["주소"],
    DetectCount: 1,
    FormLevel: '사내한',
  },
  {
    path: '/test3',
    FileName: '민증2.png',
    Classification: '주민등록증',
    DetectList: ["주민등록번호", " 주소"],
    DetectCount: 2,
    FormLevel: '대외비',
  },
  {
    path: '/test4',
    FileName: '휴가.tif',
    Classification: '놀러간 사진',
    DetectList: [],
    DetectCount: 0,
    FormLevel: '공개',
  },
  {
    path: '/test4',
    FileName: '텅장.tif',
    Classification: '통장',
    DetectList: ['계좌번호'],
    DetectCount: 1,
    FormLevel: '공개',
  }
];
function cal_result(index) {
  const classes = new useStyles();
  let Result;
  // 분류된 파일 (공개, 사내한, 대외비, 미분류)
  if(index === 0){
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
      return value.FormLevel === '대외비';})
    let no2 = temp.filter(function(value){
      return value.FormLevel === '사내한';})
    let no3 = temp.filter(function(value){
      return value.FormLevel === '공개';})
    let no4 = temp.filter(function(value){
      return value.FormLevel === 'None';})
    Result = 
      <Grid container justify="center" alignItems="center"
      direction="row" spacing={3} >
        <Grid item xs={3}><Box border={1} className={classes.paper}>대외비 : {no1.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>사내한 : {no2.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>공개 : {no3.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>미분류 : {no4.length}</Box></Grid>
      </Grid>;
  }
  // 검출된 파일 (고유식별 검출, 사내한 분류, 공개 분류)??? 필요할까??
  else if(index === 1){
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
      return value.level === '고유식별정보 검출';})
    let no2 = temp.filter(function(value){
      return value.level === '사내한 분류';})
    let no3 = temp.filter(function(value){
      return value.level === '공개';})
    Result = 
      <Grid container justify="center" alignItems="center"
      direction="row" spacing={3} >
        <Grid item xs={3}><Box border={1} className={classes.paper}>고유식별정보 검출 : {no1.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>사내한 분류 : {no2.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>공개 : {no3.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}></Box></Grid>
      </Grid>;
  }
  // 패턴포함 파일 (주민등록번호, 여권번호, 통장번호)
  else if(index === 2){
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
      return value.DetectList.indexOf('주민등록번호') !== -1;})
    let no2 = temp.filter(function(value){
      return value.DetectList.indexOf('여권번호') !== -1;})
    let no3 = temp.filter(function(value){
      return value.DetectList.indexOf('계좌번호') !== -1;})
    Result = 
      <Grid container justify="center" alignItems="center"
      direction="row" spacing={3} >
        <Grid item xs={3}><Box border={1} className={classes.paper}>주민등록번호 : {no1.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>여권번호 : {no2.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>계좌번호 : {no3.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}></Box></Grid>
      </Grid>;
  }
  // 형식식별 파일 (JPG, PNG, TIF)
  else if(index === 3){
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
      return value.FileName.indexOf('jpg') !== -1;})
    let no2 = temp.filter(function(value){
      return value.FileName.indexOf('png') !== -1;})
    let no3 = temp.filter(function(value){
      return value.FileName.indexOf('tif') !== -1;})
    Result = 
      <Grid container justify="center" alignItems="center"
      direction="row" spacing={3} >
        <Grid item xs={3}><Box border={1} className={classes.paper}>JPG : {no1.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>PNG : {no2.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}>TIF : {no3.length}</Box></Grid>
        <Grid item xs={3}><Box border={1} className={classes.paper}></Box></Grid>
      </Grid>;
  }
  else Result = <div></div>
  
  return Result;
}

function TabPanel(props) {
  const { value, index } = props;

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

  return(
    <div className={classes.root}>
      <Grid container
      justify="center"
      alignItems="center"
      direction="row"
      spacing={3} >
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.paper} image='./Bookmark.png' title="1" onClick={() => {setValue(0)}}/>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.paper} image='Find.png' title="2" onClick={() => {setValue(1)}}/>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.paper} image='Identification.png' title="3" onClick={() => {setValue(2)}}/>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.paper} image='Pattern.png' title="4" onClick={() => {setValue(3)}}/>
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