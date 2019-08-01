'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ResponsiveDrawer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _CssBaseline = require('@material-ui/core/CssBaseline');

var _CssBaseline2 = _interopRequireDefault(_CssBaseline);

var _Drawer = require('@material-ui/core/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Hidden = require('@material-ui/core/Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _ListItemIcon = require('@material-ui/core/ListItemIcon');

var _ListItemIcon2 = _interopRequireDefault(_ListItemIcon);

var _ListItemText = require('@material-ui/core/ListItemText');

var _ListItemText2 = _interopRequireDefault(_ListItemText);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require('@material-ui/core/styles');

var _IconButton = require('@material-ui/core/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Menu = require('@material-ui/icons/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Update = require('@material-ui/icons/Update');

var _Update2 = _interopRequireDefault(_Update);

var _Home = require('@material-ui/icons/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Search = require('@material-ui/icons/Search');

var _Search2 = _interopRequireDefault(_Search);

var _Assignment = require('@material-ui/icons/Assignment');

var _Assignment2 = _interopRequireDefault(_Assignment);

var _Settings = require('@material-ui/icons/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _Mail = require('@material-ui/icons/Mail');

var _Mail2 = _interopRequireDefault(_Mail);

var _Home3 = require('../../renderer/pages/Home');

var _Home4 = _interopRequireDefault(_Home3);

var _Search3 = require('../pages/Search');

var _Search4 = _interopRequireDefault(_Search3);

var _Setting = require('../../renderer/pages/Setting');

var _Setting2 = _interopRequireDefault(_Setting);

var _QnAMail = require('../../renderer/pages/QnAMail');

var _QnAMail2 = _interopRequireDefault(_QnAMail);

var _Result = require('../../renderer/pages/Result');

var _Result2 = _interopRequireDefault(_Result);

var _DownloadFile = require('../../main/FrameTest/DownloadFile');

var _DownloadFile2 = _interopRequireDefault(_DownloadFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var drawerWidth = 180;

var useStyles = (0, _styles.makeStyles)(function (theme) {
    return {
        root: {
            display: 'flex'
        },
        drawer: _defineProperty({}, theme.breakpoints.up('sm'), {
            width: drawerWidth,
            flexShrink: 0
        }),
        appBar: _defineProperty({
            marginLeft: drawerWidth
        }, theme.breakpoints.up('sm'), {
            width: 'calc(100% - ' + drawerWidth + 'px)'
        }),
        menuButton: _defineProperty({
            marginRight: theme.spacing(2)
        }, theme.breakpoints.up('sm'), {
            display: 'none'
        }),
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        },
        active: {
            background: '#9e9e9e'
        }
    };
});

function ResponsiveDrawer(props) {
    var _React$createElement;

    var container = props.container;

    var classes = useStyles();
    var theme = (0, _styles.useTheme)();

    var _React$useState = _react2.default.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        mobileOpen = _React$useState2[0],
        setMobileOpen = _React$useState2[1];

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    // Forced ReRendering

    var _React$useState3 = _react2.default.useState(),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        updateState = _React$useState4[1];

    var forceUpdate = _react2.default.useCallback(function () {
        return updateState({});
    }, []);

    // 위에 툴바
    var drawerToolbar = _react2.default.createElement(
        _Toolbar2.default,
        null,
        _react2.default.createElement(
            _Grid2.default,
            { container: true, direction: 'row', justify: 'space-between' },
            _react2.default.createElement(
                _Grid2.default,
                null,
                _react2.default.createElement(
                    _IconButton2.default,
                    {
                        color: 'inherit',
                        'aria-label': 'Open drawer',
                        edge: 'start',
                        onClick: handleDrawerToggle,
                        className: classes.menuButton
                    },
                    _react2.default.createElement(_Menu2.default, null)
                ),
                _react2.default.createElement(
                    _Typography2.default,
                    { variant: 'h6' },
                    'HOJE-OCR'
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                null,
                _react2.default.createElement(
                    _IconButton2.default,
                    { onClick: function onClick() {
                            console.log('Download...');
                            (0, _DownloadFile2.default)();
                            forceUpdate();
                        } },
                    _react2.default.createElement(_Update2.default, null)
                )
            )
        )
    );
    // 왼쪽 메뉴 부분
    var drawer = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { className: classes.toolbar }),
        _react2.default.createElement(
            _List2.default,
            null,
            _react2.default.createElement(
                _ListItem2.default,
                {
                    button: true,
                    activeClassName: classes.active,
                    component: _reactRouterDom.NavLink, exact: true, to: '/'
                },
                _react2.default.createElement(
                    _ListItemIcon2.default,
                    null,
                    _react2.default.createElement(_Home2.default, null)
                ),
                _react2.default.createElement(_ListItemText2.default, { primary: '\uD648' })
            ),
            _react2.default.createElement(
                _ListItem2.default,
                {
                    button: true,
                    activeClassName: classes.active,
                    component: _reactRouterDom.NavLink, to: '/search'
                },
                _react2.default.createElement(
                    _ListItemIcon2.default,
                    null,
                    _react2.default.createElement(_Search2.default, null)
                ),
                _react2.default.createElement(_ListItemText2.default, { primary: '\uAC80\uC0AC' })
            ),
            _react2.default.createElement(
                _ListItem2.default,
                {
                    button: true,
                    activeClassName: classes.active,
                    component: _reactRouterDom.NavLink, to: '/result'
                },
                _react2.default.createElement(
                    _ListItemIcon2.default,
                    null,
                    _react2.default.createElement(_Assignment2.default, null)
                ),
                _react2.default.createElement(_ListItemText2.default, { primary: '\uAC80\uCD9C\uB0B4\uC5ED' })
            ),
            _react2.default.createElement(
                _ListItem2.default,
                {
                    button: true,
                    activeClassName: classes.active,
                    component: _reactRouterDom.NavLink, to: '/setting'
                },
                _react2.default.createElement(
                    _ListItemIcon2.default,
                    null,
                    _react2.default.createElement(_Settings2.default, null)
                ),
                _react2.default.createElement(_ListItemText2.default, { primary: '\uC124\uC815' })
            ),
            _react2.default.createElement(
                _ListItem2.default,
                (_React$createElement = {
                    button: true,
                    activeClassName: classes.active
                }, _defineProperty(_React$createElement, 'activeClassName', classes.active), _defineProperty(_React$createElement, 'component', _reactRouterDom.NavLink), _defineProperty(_React$createElement, 'to', '/qna'), _React$createElement),
                _react2.default.createElement(
                    _ListItemIcon2.default,
                    null,
                    _react2.default.createElement(_Mail2.default, null)
                ),
                _react2.default.createElement(_ListItemText2.default, { primary: '\uBB38\uC758' })
            )
        )
    );
    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(_CssBaseline2.default, null),
        _react2.default.createElement(
            _AppBar2.default,
            { position: 'fixed', className: classes.appBar },
            drawerToolbar
        ),
        _react2.default.createElement(
            'nav',
            { className: classes.drawer, 'aria-label': 'Mailbox folders' },
            _react2.default.createElement(
                _Hidden2.default,
                { smUp: true, implementation: 'css' },
                _react2.default.createElement(
                    _Drawer2.default,
                    {
                        container: container,
                        variant: 'temporary',
                        anchor: theme.direction === 'rtl' ? 'right' : 'left',
                        open: mobileOpen,
                        onClose: handleDrawerToggle,
                        classes: {
                            paper: classes.drawerPaper
                        },
                        ModalProps: {
                            keepMounted: true // Better open performance on mobile.
                        }
                    },
                    drawer
                )
            ),
            _react2.default.createElement(
                _Hidden2.default,
                { xsDown: true, implementation: 'css' },
                _react2.default.createElement(
                    _Drawer2.default,
                    {
                        classes: {
                            paper: classes.drawerPaper
                        },
                        variant: 'permanent',
                        open: true
                    },
                    drawer
                )
            )
        ),
        _react2.default.createElement(
            'main',
            { className: classes.content },
            _react2.default.createElement('div', { className: classes.toolbar }),
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Home4.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: "/search", component: _Search4.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/setting', component: _Setting2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/qna', component: _QnAMail2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/result', component: _Result2.default })
        )
    );
}

ResponsiveDrawer.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: _propTypes2.default.object
};