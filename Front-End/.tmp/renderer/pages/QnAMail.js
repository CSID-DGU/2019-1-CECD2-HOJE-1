"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = QnAMail;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _core = require("@material-ui/core");

var _KeyboardArrowLeft = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("@material-ui/icons/KeyboardArrowRight"));

var _electron = require("electron");

var _cropImage = _interopRequireDefault(require("../../main/FrameTest/cropImage"));

var _uploadSubImage = _interopRequireDefault(require("../../main/FrameTest/uploadSubImage"));

var _uploadImage = _interopRequireDefault(require("../../main/FrameTest/uploadImage"));

var PATH = "C:\\Users\\FASOO_499\\Desktop\\image";

var path = require('path');

var fs = require('fs');

var nativeImage = require('electron').nativeImage;

var findImage = nativeImage.createFromPath('');
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      minHeight: 360
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    spacer: {
      flex: '1 1 auto'
    },
    fab: {
      width: 70,
      backgroundColor: '#e6ee9c',
      color: '#000000'
    },
    imagecrop: {
      width: 130,
      backgroundColor: '#e6ee9c',
      color: '#000000'
    },
    paper: {
      background: '#ffffff',
      width: '100%',
      height: 500
    }
  };
});
var mylistStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 380
    },
    listSection: {
      backgroundColor: 'inherit',
      padding: 0
    },
    image: {
      height: 40
    },
    card: {
      maxHeight: 343.5
    },
    fullimage: {
      width: '100%',
      height: 100
    },
    textfiled: {
      maxWidth: 300
    },
    item: {
      padding: 10
    },
    media: {
      maxHeight: 278,
      maxWidth: 800,
      height: '100%',
      width: '100%',
      borderRadius: '10px'
    },
    center: {
      margin: 'auto',
      width: '50%',
      textAlign: 'center'
    },
    content: {
      padding: theme.spacing(2),
      width: 330
    }
  };
});

var notifier = require('node-notifier');

function TabPanel(props) {
  var children = props.children,
      value = props.value,
      index = props.index;
  return _react["default"].createElement(_Typography["default"], {
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, children);
}

TabPanel.propTypes = {
  children: _propTypes["default"].node,
  index: _propTypes["default"].any.isRequired,
  value: _propTypes["default"].any.isRequired
};
var data = null;

function QnAMail(props) {
  var sendingImagePath = props.sendingImagePath;
  var classes = useStyles();
  var classes2 = mylistStyles();

  var _React$useState = _react["default"].useState(1),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1]; //null: 기본 페이지, 1: 구분요청, 2: 오탐
  // Forced ReRendering


  var _React$useState3 = _react["default"].useState(),
      _React$useState4 = (0, _slicedToArray2["default"])(_React$useState3, 2),
      updateState = _React$useState4[1];

  var forceUpdate = _react["default"].useCallback(function () {
    return updateState({});
  }, []);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      crop = _useState2[0],
      setCrop = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      list = _useState4[0],
      setList = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      send = _useState6[0],
      setSend = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      sendIndex = _useState8[0],
      setSendIndex = _useState8[1];

  var _React$useState5 = _react["default"].useState(['']),
      _React$useState6 = (0, _slicedToArray2["default"])(_React$useState5, 1),
      sendContent = _React$useState6[0];

  var _React$useState7 = _react["default"].useState(0),
      _React$useState8 = (0, _slicedToArray2["default"])(_React$useState7, 2),
      activeStep = _React$useState8[0],
      setActiveStep = _React$useState8[1];

  var theme = (0, _styles.useTheme)();

  var _React$useState9 = _react["default"].useState(0),
      _React$useState10 = (0, _slicedToArray2["default"])(_React$useState9, 2),
      maxSteps = _React$useState10[0],
      setSteps = _React$useState10[1];

  function handleNext() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep + 1;
    });
    setSendIndex(activeStep + 1);
  }

  function handleBack() {
    setActiveStep(function (prevActiveStep) {
      return prevActiveStep - 1;
    });
    setSendIndex(activeStep - 1);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  ;

  var _React$useState11 = _react["default"].useState(''),
      _React$useState12 = (0, _slicedToArray2["default"])(_React$useState11, 2),
      imagePath = _React$useState12[0],
      setImagePath = _React$useState12[1];

  var _React$useState13 = _react["default"].useState(nativeImage.createFromPath('').toDataURL()),
      _React$useState14 = (0, _slicedToArray2["default"])(_React$useState13, 2),
      iimage = _React$useState14[0],
      setImage = _React$useState14[1];

  (0, _react.useEffect)(function () {
    _electron.ipcRenderer.send('QNA_READY', 'ready'); //페이지 로딩이 완료되면


    _electron.ipcRenderer.once('RESULT2', function (event, result) {
      data = result; //console.log('useEffect data : ', data);

      if (data !== null) {
        setImagePath(data);
        findImage = nativeImage.createFromPath(path.normalize(imagePath));
        setImage(findImage.toDataURL());
      }
    });
  });

  var txtChange = function txtChange(prop) {
    return function (event) {
      var index = list.indexOf(prop);
      send[index] = event.target.value;
      if (sendIndex !== '') setSendIndex('');
    };
  };

  var txtContent = function txtContent() {
    return function (event) {
      sendContent[0] = event.target.value;
    };
  };

  var _React$useState15 = _react["default"].useState(null),
      _React$useState16 = (0, _slicedToArray2["default"])(_React$useState15, 2),
      anchorEl = _React$useState16[0],
      setAnchorEl = _React$useState16[1];

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  var open = Boolean(anchorEl);
  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement(_core.Box, {
    className: classes.paper,
    border: 1,
    borderRadius: 10,
    borderColor: "#c5e1a5"
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 3
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 500,
      marginLeft: 10
    }
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(_core.FormControl, {
    className: classes.formControl
  }, _react["default"].createElement(_core.InputLabel, {
    htmlFor: "Tabs-simple"
  }, "\uAD6C \uBD84"), _react["default"].createElement(_core.Select, {
    value: value,
    onChange: handleChange,
    inputProps: {
      name: 'Tabs',
      id: 'Tabs-simple'
    }
  }, _react["default"].createElement(_core.MenuItem, {
    value: 1
  }, "\uBD84\uB958\uAD6C\uBD84 \uCD94\uAC00\uC2E0\uCCAD"), _react["default"].createElement(_core.MenuItem, {
    value: 2
  }, "\uC624\uD0D0\uC9C0 \uC218\uC815\uC694\uCCAD")))), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 6
  }, _react["default"].createElement(_core.Fab, {
    variant: "extended",
    disabled: value !== 2 ? true : false,
    className: classes.imagecrop,
    onClick:
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      var files, newsend, listImage, i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tmp, p;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _cropImage["default"])(imagePath);

            case 2:
              //Todo 경로 설정
              files = fs.readdirSync(PATH); //해당 디렉토리 탐색

              newsend = send;
              listImage = [];
              setSteps(files.length);

              for (i = 0; i < files.length; i++) {
                newsend.push('');
              }

              setSend(newsend);
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 11;

              for (_iterator = files[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                tmp = _step.value;
                p = path.join(PATH, tmp);
                listImage.push(nativeImage.createFromPath(p).toDataURL());
              }

              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](11);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 19:
              _context.prev = 19;
              _context.prev = 20;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 22:
              _context.prev = 22;

              if (!_didIteratorError) {
                _context.next = 25;
                break;
              }

              throw _iteratorError;

            case 25:
              return _context.finish(22);

            case 26:
              return _context.finish(19);

            case 27:
              setList(listImage);
              notifier.notify({
                title: "Image Crop Success",
                message: "이미지 확인을 하고 싶으면 클릭하세요",
                wait: true,
                timeout: 2
              }, function (err, response) {
                if (response.match('clicked')) _electron.shell.openItem(PATH);
              });
              setCrop(true);

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[11, 15, 19, 27], [20,, 22, 26]]);
    }))
  }, "\uC774\uBBF8\uC9C0 \uC790\uB974\uAE30")), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 6
  }, _react["default"].createElement(_core.Fab, {
    variant: "extended",
    className: classes.fab,
    disabled: value === 2 ? crop ? false : true : false,
    onClick: function onClick() {
      if (value == 1) {
        (0, _uploadImage["default"])(sendContent.pop(), data, "HR");
      } else if (value == 2) {
        (0, _uploadSubImage["default"])(send, data, "HR");
        setSend([]);
        setList([]);
        notifier.notify({
          title: "Send Completed",
          message: "전송이 완료됐습니다",
          wait: true,
          timeout: 2
        }, function (err, response) {
          console.log(response);
        });
      } // forceUpdate();

    },
    component: _reactRouterDom.Link,
    to: value === 2 ? '/' : ''
  }, "\uC804  \uC1A1"))))), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 9
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 500
    },
    borderLeft: 1,
    borderColor: "#c5e1a5"
  }, _react["default"].createElement(_core.Grid, {
    container: true,
    direction: "row",
    justify: "center",
    alignItems: "center"
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(_core.TextField, {
    label: "\uC774\uBBF8\uC9C0 \uACBD\uB85C",
    style: {
      padding: 8
    },
    placeholder: "\uACBD\uB85C",
    fullWidth: true,
    margin: "normal",
    variant: "outlined",
    value: imagePath,
    InputLabelProps: {
      shrink: true
    }
  })), _react["default"].createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react["default"].createElement(TabPanel, {
    value: value,
    index: null
  }, "\uAD6C\uBD84\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694."), _react["default"].createElement(TabPanel, {
    value: value,
    index: 1
  }, _react["default"].createElement(_core.Grid, {
    item: true,
    alignItems: "center",
    justify: "center"
  }, _react["default"].createElement(_core.Grid, {
    style: {
      paddingLeft: 10,
      paddingRight: 10
    },
    xs: 12,
    item: true
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 280,
      textAlign: 'center',
      borderTop: '1px solid',
      borderLeft: '1px solid',
      borderRight: '1px solid',
      borderColor: '#c5e1a5',
      borderTopRightRadius: '10px',
      borderTopLeftRadius: '10px',
      boxShadow: '2px 2px 2px'
    }
  }, _react["default"].createElement("img", {
    className: classes2.media,
    src: iimage,
    alt: ""
  })), _react["default"].createElement(_core.Box, {
    style: {
      height: 110,
      background: '#ffffff',
      borderBottom: '1px solid',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderColor: '#c5e1a5',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px',
      boxShadow: '2px 2px 2px'
    }
  }, _react["default"].createElement(_core.InputBase, {
    placeholder: "\uC774\uBBF8\uC9C0 \uC124\uBA85\uC744 \uC801\uC5B4\uC8FC\uC138\uC694",
    multiline: true,
    rows: "4",
    inputProps: {
      'aria-label': 'naked'
    },
    fullWidth: true,
    margin: "normal",
    value: sendContent,
    onChange: txtContent(),
    style: {
      paddingLeft: 15,
      paddingRight: 15
    }
  }))))), _react["default"].createElement(TabPanel, {
    value: value,
    index: 2
  }, _react["default"].createElement(_core.Grid, {
    style: {
      paddingLeft: 10,
      paddingRight: 10
    },
    xs: 12,
    item: true
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 390,
      border: '1px solid',
      borderRadius: '10px',
      borderRight: '1px solid',
      borderColor: '#c5e1a5',
      boxShadow: '2px 2px 2px'
    },
    border: 1
  }, _react["default"].createElement(_core.Box, {
    style: {
      height: 280
    }
  }, _react["default"].createElement("img", {
    className: classes2.media,
    src: list[activeStep],
    alt: ''
  })), _react["default"].createElement(_core.Box, {
    style: {
      height: 60,
      background: '#ffffff'
    }
  }, _react["default"].createElement(_core.InputBase, {
    placeholder: "\uC774\uBBF8\uC9C0 \uC124\uBA85\uC744 \uC801\uC5B4\uC8FC\uC138\uC694",
    multiline: true,
    rows: "2",
    inputProps: {
      'aria-label': 'naked'
    },
    fullWidth: true,
    margin: "normal",
    value: send[sendIndex],
    onChange: txtChange(list[activeStep]),
    style: {
      paddingLeft: 15,
      paddingRight: 15
    }
  })), _react["default"].createElement(_core.MobileStepper, {
    steps: maxSteps,
    position: "static",
    variant: "text",
    activeStep: activeStep,
    nextButton: _react["default"].createElement(_core.Button, {
      size: "small",
      onClick: handleNext,
      disabled: activeStep === maxSteps - 1
    }, "Next", theme.direction === 'rtl' ? _react["default"].createElement(_KeyboardArrowLeft["default"], null) : _react["default"].createElement(_KeyboardArrowRight["default"], null)),
    backButton: _react["default"].createElement(_core.Button, {
      size: "small",
      onClick: handleBack,
      disabled: activeStep === 0
    }, theme.direction === 'rtl' ? _react["default"].createElement(_KeyboardArrowRight["default"], null) : _react["default"].createElement(_KeyboardArrowLeft["default"], null), "Back"),
    style: {
      backgroundColor: '#f1f8e9',
      borderTop: '1px solid #e0e0e0',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px'
    }
  })))))))))));
}