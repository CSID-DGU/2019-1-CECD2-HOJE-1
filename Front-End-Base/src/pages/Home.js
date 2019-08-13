import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardMedia from'@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChartIcon1 from './image/Chart1.png';
import ChartIcon2 from './image/Chart2.png';
import { Doughnut, Bar, Polar } from 'react-chartjs-2';
import { random } from 'node-forge';

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
    height: 150,
    width: '100%',
  },
  imagecontent: {
    textAlign: 'center',
  },
  chartTitle: {
    textAlign: 'center',
  },
  chartArea: {
    height: 300,
  },
  item: {
    padding: 5,
  },
  test: {
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
}));

const test = [
  {
    path: '/test',
    FileName: '민증1.jpg',
    Classification: '주민등록증',
    detectList: ["주민등록번호", " 주소"],
    DetectCount: 2,
    formLevel: '대외비',
  },
  {
    path: '/test1',
    FileName: '이력서1.jpg',
    Classification: '이력서',
    detectList: ["주소"],
    DetectCount: 1,
    formLevel: '사내한',
  },
  {
    path: '/test2',
    FileName: '이력서2.jpg',
    Classification: '이력서',
    detectList: ["주소"],
    DetectCount: 1,
    formLevel: '사내한',
  },
  {
    path: '/test3',
    FileName: '민증2.png',
    Classification: '주민등록증',
    detectList: ["주민등록번호", " 주소"],
    DetectCount: 2,
    formLevel: '대외비',
  },
  {
    path: '/test4',
    FileName: '휴가.tif',
    Classification: '놀러간 사진',
    detectList: [],
    DetectCount: 0,
    formLevel: '공개',
  },
  {
    path: '/test4',
    FileName: '텅장.tif',
    Classification: '통장',
    detectList: ['계좌번호'],
    DetectCount: 1,
    formLevel: '공개',
  }
];

// 원형
const classifyData = {
  labels: ['대외비', '사내한', '공개', 'None'],
  datasets: [{
      data: [0, 0, 0, 0],
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
// 막대
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
    fontSize: 24,
    position: 'bottom',
    text: '                   최근 검사 분류 결과'
  },
  legend: {
    position: 'left',
    labels: {
      padding: 20,
      fontSize: 17,
    }
  }
}
const detectOptions = {
  title: {
    display: true,
    padding: 20,
    fontSize: 24,
    position: 'bottom',
    text: '                           최근 검사 검출 결과'
  },
  legend: {
    position: 'left',
    labels: {
      padding: 20,
      fontSize: 17,
    }
  }
}

function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
}

function cal_result(index) {
  const classes = new useStyles();
  
  let Result;
  // 분류된 파일 (공개, 사내한, 대외비, 미분류)
  if(index === 0){
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
      return value.formLevel === '대외비';})
    let no2 = temp.filter(function(value){
      return value.formLevel === '사내한';})
    let no3 = temp.filter(function(value){
      return value.formLevel === '공개';})
    let no4 = temp.filter(function(value){
      return value.formLevel === 'None';})
    classifyData.datasets[0].data = [no1.length, no2.length, no3.length, no4.length]
    Result = 
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12}>
        <Polar height={250} data={classifyData} options={classifyOptions} />
      </Grid>
    </Grid>;
  }
  // 검출된패턴 (주민등록번호, 여권번호, 통장번호, 운전면허번호)
  else if(index === 1){
    const listOfPattern = ['주민등록번호', '여권번호', '통장번호', '운전면허번호', 'A', 'B', 'C']
    let temp = test.map(value => {return value});
    let no1 = temp.filter(function(value){
      return value.detectList.indexOf('주민등록번호') !== -1;})
    let no2 = temp.filter(function(value){
      return value.detectList.indexOf('여권번호') !== -1;})
    let no3 = temp.filter(function(value){
      return value.detectList.indexOf('통장번호') !== -1;})
    let no4 = temp.filter(function(value){
      return value.detectList.indexOf('운전면허번호') !== -1;})
    detectData.labels = listOfPattern;
    detectData.datasets[0].data = [no1.length, no2.length+1, no3.length+3, no4.length+7, 9, 8, 7];
    detectData.datasets[0].backgroundColor = [];
    detectData.datasets[0].borderColor = [];
    for(var i = 0; i < detectData.datasets[0].data.length; i++)
    {
      let r = getRandomInt(0,255), g = getRandomInt(0,255), b = getRandomInt(0,255);
      detectData.datasets[0].backgroundColor.push(`rgba(${r}, ${g}, ${b}, 0.2)`);
      detectData.datasets[0].borderColor.push(`rgba(${r}, ${g}, ${b}, 1.0)`);
    }
    
    Result = <Grid container direction="row" justify="center" alignItems="center">
    
    <Grid item xs={12}>
      <Polar height={250} data={detectData} options={detectOptions}/>
    </Grid>
  </Grid>;
  }
  // 형식식별 파일 (JPG, PNG, TIF)
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

console.log('Home Rendering');

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
        <Grid item xs={6}>
        <TabPanel value={0} index={0}></TabPanel>
        </Grid>
        <Grid item xs={6}>
        <TabPanel value={1} index={1}></TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}