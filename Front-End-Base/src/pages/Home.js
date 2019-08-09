import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMedia from'@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import imageA from './image/Bookmark-110.png';
import imageB from './image/Find-110.png';
import imageC from './image/Identification-110.png';
import imageD from './image/Pattern-110.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 20, 
    fontSize: 20,
    color: theme.palette.text.secondary,
    height: 160,
    backgroundColor: '#d1c4e9',
  },
  image: {
    height: 120,
  },
  imagecontent: {
    textAlign: 'center',
  },
  item: {
    padding: 5,
  }
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
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>대외비<br/><h2>{no1.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>사내한<br/><h2>{no2.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>공개<br/><h2>{no3.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>미분류<br/><h2>{no4.length}</h2></Box></Grid>
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
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>식별정보검출<br/><h2>{no1.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>사내한<br/><h2>{no2.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>공개<br/><h2>{no3.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}></Box></Grid>
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
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>주민등록번호<br/><h2>{no1.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>여권번호<br/><h2>{no2.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>계좌번호<br/><h2>{no3.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}></Box></Grid>
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
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>JPG<br/><h2>{no1.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>PNG<br/><h2>{no2.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}>TIF<br/><h2>{no3.length}</h2></Box></Grid>
        <Grid item xs={3}><Box paddingTop={4} className={classes.paper}></Box></Grid>
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
      spacing={3}>
        <Grid paddingTop={5} item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.image} image={imageA} title="1" onClick={() => {setValue(0)}}/>
            <CardContent>
            <Typography className={classes.imagecontent} gutterBottom variant="h5" component="h2">
              Classify
            </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <CardActionArea>
            <CardMedia className={classes.image} image={imageB} title="2" onClick={() => {setValue(1)}}/>
            <CardContent>
            <Typography className={classes.imagecontent} gutterBottom variant="h5" component="h2">
              Detect
            </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.image} image={imageC} title="3" onClick={() => {setValue(2)}}/>
            <CardContent>
            <Typography className={classes.imagecontent} gutterBottom variant="h5" component="h2">
              Pattern
            </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia className={classes.image} image={imageD} title="4" onClick={() => {setValue(3)}}/>
            <CardContent>
            <Typography className={classes.imagecontent} gutterBottom variant="h5" component="h2">
              Format
            </Typography>
            </CardContent>
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