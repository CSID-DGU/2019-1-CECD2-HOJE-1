'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Home;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('@material-ui/core/styles');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Box = require('@material-ui/core/Box');

var _Box2 = _interopRequireDefault(_Box);

var _CardMedia = require('@material-ui/core/CardMedia');

var _CardMedia2 = _interopRequireDefault(_CardMedia);

var _CardActionArea = require('@material-ui/core/CardActionArea');

var _CardActionArea2 = _interopRequireDefault(_CardActionArea);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var nativeImage = require('electron').nativeImage;
var findImage = nativeImage.createFromPath(path.normalize(__dirname + '/../../../assets/Find.png'));
var BookmarkImage = nativeImage.createFromPath(path.normalize(__dirname + '/../../../assets/Bookmark.png'));
var patternImage = nativeImage.createFromPath(path.normalize(__dirname + '/../../../assets/Pattern.png'));
var identicationImage = nativeImage.createFromPath(path.normalize(__dirname + '/../../../assets/Identification.png'));
var fs = require('fs');
var useStyles = (0, _styles.makeStyles)(function (theme) {
    return {
        root: {
            flexGrow: 1
        },
        paper: {
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: 220
        }
    };
});

var test = [];
function cal_result(index) {
    var classes = new useStyles();
    var Result = void 0;
    // 분류된 파일 (공개, 사내한, 대외비)
    if (index === 0) {
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
        Result = _react2.default.createElement(
            _Grid2.default,
            { container: true, justify: 'center', alignItems: 'center',
                direction: 'row', spacing: 3 },
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _Box2.default,
                    { border: 1, className: classes.paper },
                    '\uB300\uC678\uBE44 : ',
                    no1.length
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _Box2.default,
                    { border: 1, className: classes.paper },
                    '\uC0AC\uB0B4\uD55C : ',
                    no2.length
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _Box2.default,
                    { border: 1, className: classes.paper },
                    '\uACF5\uAC1C : ',
                    no3.length
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _Box2.default,
                    { border: 1, className: classes.paper },
                    '\uBBF8\uBD84\uB958 : ',
                    no4.length
                )
            )
        );
    }
    // 검출된 파일 (고유식별 검출, 사내한 분류, 공개 분류)??? 필요할까??
    else if (index === 1) {
            var _temp = test.map(function (value) {
                return value;
            });
            var _no = _temp.filter(function (value) {
                return value.level === '고유식별정보 검출';
            });
            var _no2 = _temp.filter(function (value) {
                return value.level === '사내한 분류';
            });
            var _no3 = _temp.filter(function (value) {
                return value.level === '공개';
            });
            Result = _react2.default.createElement(
                _Grid2.default,
                { container: true, justify: 'center', alignItems: 'center',
                    direction: 'row', spacing: 3 },
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 3 },
                    _react2.default.createElement(
                        _Box2.default,
                        { border: 1, className: classes.paper },
                        '\uACE0\uC720\uC2DD\uBCC4\uC815\uBCF4 \uAC80\uCD9C : ',
                        _no.length
                    )
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 3 },
                    _react2.default.createElement(
                        _Box2.default,
                        { border: 1, className: classes.paper },
                        '\uC0AC\uB0B4\uD55C \uBD84\uB958 : ',
                        _no2.length
                    )
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 3 },
                    _react2.default.createElement(
                        _Box2.default,
                        { border: 1, className: classes.paper },
                        '\uACF5\uAC1C : ',
                        _no3.length
                    )
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 3 },
                    _react2.default.createElement(_Box2.default, { border: 1, className: classes.paper })
                )
            );
        }
        // 패턴포함 파일 (주민등록번호, 여권번호, 통장번호)
        else if (index === 2) {
                var _temp2 = test.map(function (value) {
                    return value;
                });
                var _no4 = _temp2.filter(function (value) {
                    return value.detectList.indexOf('주민번호') !== -1;
                });
                var _no5 = _temp2.filter(function (value) {
                    return value.detectList.indexOf('여권번호') !== -1;
                });
                var _no6 = _temp2.filter(function (value) {
                    return value.detectList.indexOf('계좌번호') !== -1;
                });
                Result = _react2.default.createElement(
                    _Grid2.default,
                    { container: true, justify: 'center', alignItems: 'center',
                        direction: 'row', spacing: 3 },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3 },
                        _react2.default.createElement(
                            _Box2.default,
                            { border: 1, className: classes.paper },
                            '\uC8FC\uBBFC\uB4F1\uB85D\uBC88\uD638 : ',
                            _no4.length
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3 },
                        _react2.default.createElement(
                            _Box2.default,
                            { border: 1, className: classes.paper },
                            '\uC5EC\uAD8C\uBC88\uD638 : ',
                            _no5.length
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3 },
                        _react2.default.createElement(
                            _Box2.default,
                            { border: 1, className: classes.paper },
                            '\uACC4\uC88C\uBC88\uD638 : ',
                            _no6.length
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3 },
                        _react2.default.createElement(_Box2.default, { border: 1, className: classes.paper })
                    )
                );
            }
            // 형식식별 파일 (JPG, PNG, TIF)
            else if (index === 3) {
                    var _temp3 = test.map(function (value) {
                        return value;
                    });
                    var _no7 = _temp3.filter(function (value) {
                        return value.fileName.indexOf('jpg') !== -1;
                    });
                    var _no8 = _temp3.filter(function (value) {
                        return value.fileName.indexOf('png') !== -1;
                    });
                    var _no9 = _temp3.filter(function (value) {
                        return value.fileName.indexOf('tif') !== -1;
                    });
                    Result = _react2.default.createElement(
                        _Grid2.default,
                        { container: true, justify: 'center', alignItems: 'center',
                            direction: 'row', spacing: 3 },
                        _react2.default.createElement(
                            _Grid2.default,
                            { item: true, xs: 3 },
                            _react2.default.createElement(
                                _Box2.default,
                                { border: 1, className: classes.paper },
                                'JPG : ',
                                _no7.length
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { item: true, xs: 3 },
                            _react2.default.createElement(
                                _Box2.default,
                                { border: 1, className: classes.paper },
                                'PNG : ',
                                _no8.length
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { item: true, xs: 3 },
                            _react2.default.createElement(
                                _Box2.default,
                                { border: 1, className: classes.paper },
                                'TIF : ',
                                _no9.length
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { item: true, xs: 3 },
                            _react2.default.createElement(_Box2.default, { border: 1, className: classes.paper })
                        )
                    );
                } else Result = _react2.default.createElement('div', null);

    return Result;
}

function TabPanel(props) {
    var value = props.value,
        index = props.index;


    return _react2.default.createElement(
        'div',
        { hidden: value !== index },
        cal_result(index)
    );
}

TabPanel.propTypes = {
    index: _propTypes2.default.any.isRequired,
    value: _propTypes2.default.any.isRequired
};

function Home() {
    var classes = useStyles();

    var _React$useState = _react2.default.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        value = _React$useState2[0],
        setValue = _React$useState2[1];

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        setUpdate = _useState2[1];

    (0, _react.useEffect)(function () {
        fs.exists('resultfile.json', function (exists) {
            if (exists) {
                test = fs.readFileSync('resultfile.json', 'utf8');
                test = JSON.parse(test);
            }
            setUpdate();
        });
    }, []);
    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            _Grid2.default,
            { container: true,
                justify: 'center',
                alignItems: 'center',
                direction: 'row',
                spacing: 3 },
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _CardActionArea2.default,
                    null,
                    _react2.default.createElement(_CardMedia2.default, { className: classes.paper, image: BookmarkImage.toDataURL(), title: '1', onClick: function onClick() {
                            setValue(0);
                        } })
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _CardActionArea2.default,
                    null,
                    _react2.default.createElement(_CardMedia2.default, { className: classes.paper, image: findImage.toDataURL(), title: '2', onClick: function onClick() {
                            setValue(1);
                        } })
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _CardActionArea2.default,
                    null,
                    _react2.default.createElement(_CardMedia2.default, { className: classes.paper, image: identicationImage.toDataURL(), title: '3', onClick: function onClick() {
                            setValue(2);
                        } })
                )
            ),
            _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 3 },
                _react2.default.createElement(
                    _CardActionArea2.default,
                    null,
                    _react2.default.createElement(_CardMedia2.default, { className: classes.paper, image: patternImage.toDataURL(), title: '4', onClick: function onClick() {
                            setValue(3);
                        } })
                )
            )
        ),
        _react2.default.createElement(TabPanel, { value: value, index: 0 }),
        _react2.default.createElement(TabPanel, { value: value, index: 1 }),
        _react2.default.createElement(TabPanel, { value: value, index: 2 }),
        _react2.default.createElement(TabPanel, { value: value, index: 3 })
    );
}