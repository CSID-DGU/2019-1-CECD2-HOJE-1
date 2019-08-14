"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Home;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _reactChartjs = require("react-chartjs-2");

var _reactSwipeableViews = _interopRequireDefault(require("react-swipeable-views"));

var _reactSwipeableViewsUtils = require("react-swipeable-views-utils");

var _CalendarToday = _interopRequireDefault(require("@material-ui/icons/CalendarToday"));

var _Update = _interopRequireDefault(require("@material-ui/icons/Update"));

var fs = require('fs');

var AutoPlaySwipeableViews = (0, _reactSwipeableViewsUtils.autoPlay)(_reactSwipeableViews["default"]);
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    maincontent: {
      backgroundColor: '#bdbdbd'
    },
    maincontentActive: {
      backgroundColor: '#ffffff'
    },
    image: {
      height: 150,
      width: '100%'
    },
    imagecontent: {
      textAlign: 'center'
    },
    chartTitle: {
      textAlign: 'center'
    },
    paper: {
      height: 500,
      width: '100%',
      backgroundColor: '#e8f5e9'
    },
    test: {
      textAlign: 'center',
      backgroundColor: '#ffffff'
    },
    versions: {
      textAlign: 'right'
    }
  };
});
var test = []; // 막대

var classifyData = {
  labels: [''],
  datasets: [{
    label: '대외비',
    data: [0],
    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)'],
    borderWidth: 1
  }, {
    label: '사내한',
    data: [0],
    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
    borderColor: ['rgba(54, 162, 235, 1)'],
    borderWidth: 1
  }, {
    label: '공개',
    data: [0],
    backgroundColor: ['rgba(255, 206, 86, 0.2)'],
    borderColor: ['rgba(255, 206, 86, 1)'],
    borderWidth: 1
  }, {
    label: 'None',
    data: [0],
    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
    borderColor: ['rgba(75, 192, 192, 1)'],
    borderWidth: 1
  }] // 원형

};
var detectData = {
  labels: ['주민등록번호', '여권번호', '통장번호'],
  datasets: [{
    data: [0, 0, 0],
    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
    borderWidth: 1
  }]
};
var classifyOptions = {
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
      fontSize: 17
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
};
var detectOptions = {
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
      fontSize: 17
    }
  }
};

function getRandomInt(min, max) {
  //min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (max - min)) + min;
}

var classifyChart = function classifyChart() {
  var temp = test.map(function (value) {
    return value;
  });
  var no1 = temp.filter(function (value) {
    return value.formLevel === '대외비';
  });
  var no2 = temp.filter(function (value) {
    return value.formLevel === '사내한';
  });
  var no3 = temp.filter(function (value) {
    return value.formLevel === '공개';
  });
  var no4 = temp.filter(function (value) {
    return value.formLevel === 'None';
  });
  classifyData.datasets[0].data[0] = no1.length; //수정

  classifyData.datasets[1].data[0] = no2.length;
  classifyData.datasets[2].data[0] = no3.length;
  classifyData.datasets[3].data[0] = no4.length + 1;
  return _react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(_reactChartjs.HorizontalBar, {
    height: 82,
    data: classifyData,
    options: classifyOptions
  })));
};

var detectListChart = function detectListChart() {
  var listOfPattern = ['주민등록번호', '여권번호', '통장번호', '운전면허번호', 'A', 'B'];
  var temp = test.map(function (value) {
    return value;
  });
  var no1 = temp.filter(function (value) {
    return value.detectList.indexOf('주민등록번호') !== -1;
  });
  var no2 = temp.filter(function (value) {
    return value.detectList.indexOf('여권번호') !== -1;
  });
  var no3 = temp.filter(function (value) {
    return value.detectList.indexOf('통장번호') !== -1;
  });
  var no4 = temp.filter(function (value) {
    return value.detectList.indexOf('운전면허번호') !== -1;
  });
  detectData.labels = listOfPattern; // 수정

  detectData.datasets[0].data = [no1.length, no2.length + 1, no3.length + 3, no4.length + 7, 9, 8];
  detectData.datasets[0].backgroundColor = [];
  detectData.datasets[0].borderColor = [];

  for (var i = 0; i < detectData.datasets[0].data.length; i++) {
    //랜덤으로 채워지는 것
    var r = getRandomInt(0, 255),
        g = getRandomInt(0, 255),
        b = getRandomInt(0, 255);
    detectData.datasets[0].backgroundColor.push("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", 0.2)"));
    detectData.datasets[0].borderColor.push("rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", 1.0)"));
  }

  return _react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(_reactChartjs.Polar, {
    height: 130,
    data: detectData,
    options: detectOptions
  })));
};

var testImageList = ['test.jpg', 'test.jpg', 'test.jpg'];
console.log('Home Rendering');

function Home() {
  var classes = useStyles();
  var theme = (0, _styles.useTheme)();

  var _React$useState = _react["default"].useState(0),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _React$useState3 = _react["default"].useState(0),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      activeStep = _React$useState4[0],
      setActiveStep = _React$useState4[1];

  var maxSteps = testImageList.length;
  (0, _react.useEffect)(function () {
    fs.exists('resultfile.json', function (exists) {
      if (exists) {
        test = fs.readFileSync('resultfile.json', 'utf8');
        test = JSON.parse(test);
      }

      setUpdate();
    });
  }, []);

  function handleStepChange(step) {
    setActiveStep(step);
  }

  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(_core.Box, {
    border: 1,
    borderColor: "#c5e1a5",
    borderRadius: 10,
    className: classes.paper
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    justify: "center",
    alignItems: "center",
    direction: "row"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 5
  }, _react["default"].createElement(_core.Box, {
    borderRight: 2,
    borderColor: "#827717"
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    justify: "center",
    alignItems: "center",
    direction: "row"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    justify: "center",
    alignItems: "center",
    direction: "row"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 9
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 246,
      padding: 10,
      backgroundColor: '#e8f5e9',
      borderTopLeftRadius: '10px'
    }
  }, _react["default"].createElement(_core.ListItem, null, _react["default"].createElement(_core.ListItemAvatar, null, _react["default"].createElement(_core.Avatar, {
    style: {
      backgroundColor: '#212121'
    }
  }, _react["default"].createElement(_CalendarToday["default"], {
    style: {
      color: '#ffffff'
    }
  }))), _react["default"].createElement(_core.ListItemText, {
    primary: "\uCD5C\uADFC \uAC80\uC0AC\uC77C",
    secondary: "Jan 9, 2014"
  })), _react["default"].createElement(_core.ListItem, null, _react["default"].createElement(_core.ListItemAvatar, null, _react["default"].createElement(_core.Avatar, {
    style: {
      backgroundColor: '#212121'
    }
  }, _react["default"].createElement(_core.IconButton, null, _react["default"].createElement(_Update["default"], {
    style: {
      color: '#ffffff'
    }
  })))), _react["default"].createElement(_core.ListItemText, {
    primary: "\uCD5C\uADFC \uC5C5\uB370\uC774\uD2B8",
    secondary: "Jan 9, 2014"
  })))), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 3
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 246,
      textAlign: 'center',
      backgroundColor: '#e8f5e9'
    }
  }, _react["default"].createElement(_core.Box, {
    style: {
      padding: 8
    }
  }, _react["default"].createElement(_core.Badge, {
    badgeContent: 110,
    showZero: "true",
    color: "secondary"
  }, " //\uC218\uC815", _react["default"].createElement(_core.Button, {
    style: {
      backgroundColor: '#1b5e20',
      color: '#ffffff',
      borderRadius: '10px',
      height: 44,
      width: 80
    }
  }, "Total"))), _react["default"].createElement(_core.Box, {
    style: {
      padding: 8
    }
  }, _react["default"].createElement(_core.Badge, {
    badgeContent: 110,
    showZero: "true",
    color: "secondary"
  }, _react["default"].createElement(_core.Button, {
    style: {
      backgroundColor: '#33691e',
      color: '#ffffff',
      borderRadius: '10px',
      height: 44,
      width: 80
    }
  }, "JPG"))), _react["default"].createElement(_core.Box, {
    style: {
      padding: 8
    }
  }, _react["default"].createElement(_core.Badge, {
    badgeContent: 11,
    showZero: "true",
    color: "secondary"
  }, _react["default"].createElement(_core.Button, {
    style: {
      backgroundColor: '#827717',
      color: '#ffffff',
      borderRadius: '10px',
      height: 44,
      width: 80
    }
  }, "PNG"))), _react["default"].createElement(_core.Box, {
    style: {
      padding: 8
    }
  }, _react["default"].createElement(_core.Badge, {
    badgeContent: 0,
    showZero: "true",
    color: "secondary"
  }, _react["default"].createElement(_core.Button, {
    style: {
      backgroundColor: '#e65100',
      color: '#ffffff',
      borderRadius: '10px',
      height: 44,
      width: 80
    }
  }, "GIF"))))))), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(_core.Box, {
    borderTop: 3,
    borderColor: "#c5e1a5",
    style: {
      height: 250
    }
  }, _react["default"].createElement(AutoPlaySwipeableViews, {
    axis: theme.direction === 'rtl' ? 'x-reverse' : 'x',
    index: activeStep,
    onChangeIndex: handleStepChange,
    enableMouseEvents: true,
    style: {
      height: 224,
      overflow: 'hidden'
    }
  }, testImageList.map(function (step, index) {
    return _react["default"].createElement("div", null, Math.abs(activeStep - index) <= 2 ? _react["default"].createElement("img", {
      style: {
        height: 224,
        width: '100%'
      },
      src: 'step',
      alt: ''
    }) : null);
  })), _react["default"].createElement(_core.MobileStepper, {
    variant: "dots",
    steps: maxSteps,
    position: "static",
    activeStep: activeStep,
    style: {
      backgroundColor: '#f1f8e9',
      borderBottomLeftRadius: '10px'
    }
  })))))), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 7
  }, _react["default"].createElement(_core.Box, {
    style: {
      boxShadow: '1px 1px 1px',
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: '#ffffff',
      borderRadius: 10
    }
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    justify: "center",
    alignItems: "center",
    direction: "row",
    spacing: 3
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, classifyChart()), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, detectListChart())))))));
}