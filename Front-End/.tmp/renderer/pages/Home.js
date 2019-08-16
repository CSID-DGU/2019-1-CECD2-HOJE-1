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

var _DownloadFile = _interopRequireDefault(require("../../main/FrameTest/DownloadFile"));

var fs = require('fs');

var AutoPlaySwipeableViews = (0, _reactSwipeableViewsUtils.autoPlay)(_reactSwipeableViews["default"]);

var nativeImage = require('electron').nativeImage;

var FasooImage = nativeImage.createFromPath("assets/fasoo.png");
var hojeImage = nativeImage.createFromPath('assets/hoje.png');

var moment = require('moment');

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
  labels: ["검사"],
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
    return value.formLevel === 'CONFIDENTIALITY';
  });
  var no2 = temp.filter(function (value) {
    return value.formLevel === 'COMPANY_ONLY';
  }); //Todo 수정

  var no3 = temp.filter(function (value) {
    return value.formLevel === 'PUBLIC';
  });
  var no4 = temp.filter(function (value) {
    return value.formLevel === 'NONE';
  });
  classifyData.datasets[0].data[0] = no1.length;
  classifyData.datasets[1].data[0] = no2.length;
  classifyData.datasets[2].data[0] = no3.length;
  classifyData.datasets[3].data[0] = no4.length;
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

var countListPattern = function countListPattern() {
  var tmp = [];

  for (var _i = 0, _test = test; _i < _test.length; _i++) {
    var t = _test[_i];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = t.detectList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var dl = _step.value;
        tmp.push(dl);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  tmp = Array.from(new Set(tmp));
  return tmp;
};

var detectListChart = function detectListChart() {
  var listOfPattern = countListPattern();
  var temp = test.map(function (value) {
    return value;
  });
  var indexLIst = [];

  var _loop = function _loop(_i2) {
    var no1 = temp.filter(function (value) {
      return value.detectList.indexOf(listOfPattern[_i2]) !== -1;
    });
    indexLIst.push(no1);
  };

  for (var _i2 = 0; _i2 < listOfPattern.length; _i2++) {
    _loop(_i2);
  }

  detectData.labels = listOfPattern; // 수정

  detectData.datasets[0].data = [];

  for (var _i3 = 0, _indexLIst = indexLIst; _i3 < _indexLIst.length; _i3++) {
    var t = _indexLIst[_i3];
    detectData.datasets[0].data.push(t.length);
  }

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
}; //이미지 보여지는 곳


var testImageList = [FasooImage.toDataURL(), hojeImage.toDataURL()];

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

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      setUpdate = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      birth = _useState4[0],
      setBirth = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      jpg = _useState6[0],
      setJPG = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      png = _useState8[0],
      setPNG = _useState8[1];

  var _useState9 = (0, _react.useState)(),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      gif = _useState10[0],
      setGIF = _useState10[1];

  var maxSteps = testImageList.length;
  (0, _react.useEffect)(function () {
    fs.exists('resultfile.json', function (exists) {
      if (exists) {
        test = fs.readFileSync('resultfile.json', 'utf8');
        test = JSON.parse(test);
        fs.stat("".concat(__dirname, "/../../../resultfile.json"), function (err, stat) {
          var data = moment(stat.atime).format('YYYY년 MM월 DD일');
          setBirth(data);
        });
        var temp = test.map(function (value) {
          return value;
        });
        var no1 = temp.filter(function (value) {
          return value.fileName.indexOf('jpg') !== -1;
        });
        var no2 = temp.filter(function (value) {
          return value.fileName.indexOf('png') !== -1;
        });
        var no3 = temp.filter(function (value) {
          return value.fileName.indexOf('gif') !== -1;
        });
        setJPG(no1.length);
        setPNG(no2.length);
        setGIF(no3.length);
      } else setBirth('이전 검사일을 알 수 없음');

      setUpdate();
    });
  }, []); // Forced ReRendering

  var _React$useState5 = _react["default"].useState(),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 2),
      updateState = _React$useState6[1];

  var forceUpdate = _react["default"].useCallback(function () {
    return updateState({});
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
    secondary: birth
  })), _react["default"].createElement(_core.ListItem, null, _react["default"].createElement(_core.ListItemAvatar, null, _react["default"].createElement(_core.Avatar, {
    style: {
      backgroundColor: '#212121'
    }
  }, _react["default"].createElement(_core.IconButton, null, _react["default"].createElement(_Update["default"], {
    style: {
      color: '#ffffff'
    },
    onClick: function onClick() {
      console.log('Download...');
      (0, _DownloadFile["default"])();
      forceUpdate();
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
    badgeContent: test.length,
    showZero: "true",
    color: "secondary"
  }, _react["default"].createElement(_core.Button, {
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
    badgeContent: jpg,
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
    badgeContent: png,
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
    badgeContent: gif,
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
      src: step,
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