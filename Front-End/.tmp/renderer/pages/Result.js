'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _electron = require('electron');

var _clsx2 = require('clsx');

var _clsx3 = _interopRequireDefault(_clsx2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _colors = require('@material-ui/core/colors');

var _Table = require('@material-ui/core/Table');

var _Table2 = _interopRequireDefault(_Table);

var _TableBody = require('@material-ui/core/TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableCell = require('@material-ui/core/TableCell');

var _TableCell2 = _interopRequireDefault(_TableCell);

var _TableHead = require('@material-ui/core/TableHead');

var _TableHead2 = _interopRequireDefault(_TableHead);

var _TablePagination = require('@material-ui/core/TablePagination');

var _TablePagination2 = _interopRequireDefault(_TablePagination);

var _TableRow = require('@material-ui/core/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _TableSortLabel = require('@material-ui/core/TableSortLabel');

var _TableSortLabel2 = _interopRequireDefault(_TableSortLabel);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _Paper = require('@material-ui/core/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Checkbox = require('@material-ui/core/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Fab = require('@material-ui/core/Fab');

var _Fab2 = _interopRequireDefault(_Fab);

var _Tooltip = require('@material-ui/core/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _FiberManualRecord = require('@material-ui/icons/FiberManualRecord');

var _FiberManualRecord2 = _interopRequireDefault(_FiberManualRecord);

var _Error = require('@material-ui/icons/Error');

var _Error2 = _interopRequireDefault(_Error);

var _Warning = require('@material-ui/icons/Warning');

var _Warning2 = _interopRequireDefault(_Warning);

var _masking = require('../../main/FrameTest/masking');

var _masking2 = _interopRequireDefault(_masking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');
var notifier = require('node-notifier');

function createData(fileName, filePath, detectList, detectCount, formLevel, fitness) {
    return { fileName: fileName, filePath: filePath, detectList: detectList, detectCount: detectCount, formLevel: formLevel, fitness: fitness };
}

// FormLevel : 1, 2, 3 -> 낮은 숫자일 수록 높은 등급
var rows = [];

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    var stabilizedThis = array.map(function (el, index) {
        return [el, index];
    });
    stabilizedThis.sort(function (a, b) {
        var order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(function (el) {
        return el[0];
    });
}

function getSorting(order, orderBy) {
    return order === 'desc' ? function (a, b) {
        return desc(a, b, orderBy);
    } : function (a, b) {
        return -desc(a, b, orderBy);
    };
}

var headRows = [{ id: 'fileName', numeric: false, disablePadding: true, label: '파일명' }, { id: 'filePath', numeric: false, disablePadding: false, label: '파일 경로' }, { id: 'detectList', numeric: false, disablePadding: false, label: '검출 내역' }, { id: 'detectCount', numeric: true, disablePadding: false, label: '검출 개수' }, { id: 'formLevel', numeric: false, disablePadding: false, label: '문서등급' }, { id: 'fitness', numeric: false, disablePadding: false, label: '적합도' }];

function EnhancedTableHead(props) {
    var onSelectAllClick = props.onSelectAllClick,
        order = props.order,
        orderBy = props.orderBy,
        numSelected = props.numSelected,
        rowCount = props.rowCount,
        onRequestSort = props.onRequestSort;

    var createSortHandler = function createSortHandler(property) {
        return function (event) {
            onRequestSort(event, property);
        };
    };

    return _react2.default.createElement(
        _TableHead2.default,
        null,
        _react2.default.createElement(
            _TableRow2.default,
            null,
            _react2.default.createElement(
                _TableCell2.default,
                { padding: 'checkbox' },
                _react2.default.createElement(_Checkbox2.default, {
                    indeterminate: numSelected > 0 && numSelected < rowCount,
                    checked: numSelected === rowCount,
                    onChange: onSelectAllClick,
                    inputProps: { 'aria-label': 'Select all Result' }
                })
            ),
            headRows.map(function (row) {
                return _react2.default.createElement(
                    _TableCell2.default,
                    {
                        key: row.id,
                        align: row.numeric ? 'right' : 'left',
                        padding: row.disablePadding ? 'none' : 'default',
                        sortDirection: orderBy === row.id ? order : false
                    },
                    _react2.default.createElement(
                        _TableSortLabel2.default,
                        {
                            active: orderBy === row.id,
                            direction: order,
                            onClick: createSortHandler(row.id)
                        },
                        row.label
                    )
                );
            })
        )
    );
}

EnhancedTableHead.propTypes = {
    numSelected: _propTypes2.default.number.isRequired,
    onRequestSort: _propTypes2.default.func.isRequired,
    onSelectAllClick: _propTypes2.default.func.isRequired,
    order: _propTypes2.default.string.isRequired,
    orderBy: _propTypes2.default.string.isRequired,
    rowCount: _propTypes2.default.number.isRequired
};

var parsingPath = function parsingPath(ppath, mode) {
    var r = rows.find(function (item) {
        return item.filePath === ppath;
    });
    var dir = path.dirname(ppath);
    var ext = path.extname(ppath);
    var basename = path.basename(ppath, ext); //파일 이름
    if (mode === 1) {
        var renaming = basename + '.mask';
        basename = renaming + ext; //새로운 파일 이름
        var renew = path.join(dir, basename); //새로운 경로
        r.fileName = basename;
        r.filePath = renew;
        r.detectList = [];
        r.detectCount = 0;
        notifier.notify({ //수행이 다 된 후 알람
            title: 'Masking Success!',
            message: '파일이 마스킹 됐습니다.',
            wait: true,
            timeout: false
        }, function (err, response) {
            _electron.shell.openItem(r.filePath);
        });
    } else if (mode === 2) {
        basename = basename.substring(0, basename.length - 5) + ext; //새로운 파일 이름
        var _renew = path.join(dir, basename); //새로운 경로
        r.fileName = basename;
        r.filePath = _renew;
        r.detectList = [];
        r.detectCount = 0;
        notifier.notify({ //수행이 다 된 후 알람
            title: 'Unmasking Success!',
            message: '파일이 재식별화 됐습니다.',
            wait: true,
            timeout: false
        }, function (err, response) {
            _electron.shell.openItem(r.filePath);
        });
    }
};

var useToolbarStyles = (0, _styles.makeStyles)(function (theme) {
    return {
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1)
        },
        highlight: theme.palette.type === 'light' ? {
            color: theme.palette.primary.main,
            backgroundColor: (0, _styles.lighten)(theme.palette.primary.light, 0.85)
        } : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark
        },
        spacer: {
            flex: '1 1 auto'
        },
        actions: {
            color: theme.palette.text.primary
        },
        title: {
            flex: '0 0 auto'
        }
    };
});

/*
const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const {numSelected, selected} = props;
    const masked = [];
    const noneMasked = [];
    selected.forEach(element => {
        if (element.indexOf('.mask') !== -1) masked.push(element);
        else noneMasked.push(element);
    });
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        검사 내역
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div>
                {numSelected > 0 ? (
                        masked.length > 0 && noneMasked.length > 0 ? ('재식별화 항목과 비식별화 항목을 각각 선택하세요') :
                            (masked.length > 0 ? (
                                    <Tooltip title="재식별화">
                                        <Fab className={classes.actions} variant="extended" label='재식별화'>재식별화</Fab>
                                    </Tooltip>
                                ) :
                                (noneMasked.length > 0 ? (
                                        <Tooltip title="비식별화">
                                            <Fab className={classes.actions} variant="extended" label='비식별화' onClick={async ()=>{
                                                for (const path of selected) {
                                                    await masking(path); //마스킹
                                                    await parsingPath(path);
                                                };
                                                notifier.notify({ //수행이 다 된 후 알람
                                                    title: '마스킹 성공!',
                                                    message: selected.length + '개의 파일이 마스킹 됐습니다.',
                                                });
                                            }}>비식별화</Fab>
                                        </Tooltip>) :
                                    ('')))
                    ) :
                    ('')
                }
                {numSelected > 0 && numSelected === 1 && masked.length === 0 ? (
                    <Tooltip title="문의">
                        <Fab className={classes.actions} variant="extended" label='문의' component={Link}
                             to='/qna'onClick={()=>{
                            ipcRenderer.send('RESULT1', selected.pop());
                        }}>문의</Fab>
                    </Tooltip>
                ) : ('')
                }
            </div>
        </Toolbar>
    );
};
*/

var useStyles = (0, _styles.makeStyles)(function (theme) {
    return {
        root: {
            width: '100%',
            marginTop: theme.spacing(3)
        },
        paper: {
            width: '100%'
        },
        table: {
            minWidth: 700
        },
        tableWrapper: {
            overflowX: 'auto'
        },
        filepath: {
            width: 140
        },
        detectlist: {
            width: 100
        }
    };
});

var theme = (0, _styles.createMuiTheme)({
    palette: {
        primary: { main: _colors.green[500] }, // Purple and green play nicely together.
        secondary: { main: _colors.yellow[500] }, // This is just green.A700 as hex.
        error: { main: _colors.red[500] }
    }
});

function Result() {
    var classes = useStyles();

    var _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        setUpdate = _useState2[1]; //강제 렌더링


    var _React$useState = _react2.default.useState('desc'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        order = _React$useState2[0],
        setOrder = _React$useState2[1];

    var _React$useState3 = _react2.default.useState('formLevel'),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        orderBy = _React$useState4[0],
        setOrderBy = _React$useState4[1];

    var _React$useState5 = _react2.default.useState([]),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        selected = _React$useState6[0],
        setSelected = _React$useState6[1];

    var _React$useState7 = _react2.default.useState(0),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        page = _React$useState8[0],
        setPage = _React$useState8[1];

    var _React$useState9 = _react2.default.useState(5),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        rowsPerPage = _React$useState10[0],
        setRowsPerPage = _React$useState10[1];

    var EnhancedTableToolbar = function EnhancedTableToolbar(props) {
        var classes = useToolbarStyles();
        var numSelected = props.numSelected,
            selected = props.selected;

        var masked = [];
        var noneMasked = [];
        selected.forEach(function (element) {
            if (element.indexOf('.mask') !== -1) masked.push(element);else noneMasked.push(element);
        });
        return _react2.default.createElement(
            _Toolbar2.default,
            {
                className: (0, _clsx3.default)(classes.root, _defineProperty({}, classes.highlight, numSelected > 0))
            },
            _react2.default.createElement(
                'div',
                { className: classes.title },
                numSelected > 0 ? _react2.default.createElement(
                    _Typography2.default,
                    { color: 'inherit', variant: 'subtitle1' },
                    numSelected,
                    ' selected'
                ) : _react2.default.createElement(
                    _Typography2.default,
                    { variant: 'h6', id: 'tableTitle' },
                    '\uAC80\uC0AC \uB0B4\uC5ED'
                )
            ),
            _react2.default.createElement('div', { className: classes.spacer }),
            _react2.default.createElement(
                'div',
                null,
                numSelected > 0 ? masked.length > 0 && noneMasked.length > 0 ? '재식별화 항목과 비식별화 항목을 각각 선택하세요' : masked.length > 0 ? _react2.default.createElement(
                    _Tooltip2.default,
                    { title: '\uC7AC\uC2DD\uBCC4\uD654' },
                    _react2.default.createElement(
                        _Fab2.default,
                        { className: classes.actions, variant: 'extended', label: '\uC7AC\uC2DD\uBCC4\uD654',
                            onClick: async function onClick() {
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;

                                try {
                                    for (var _iterator = selected[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var _path = _step.value;

                                        await (0, _masking2.default)(_path, 'unmasking'); //재 식별화
                                        await parsingPath(_path, 2);
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                            _iterator.return();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }

                                ;
                                setSelected([]);
                            } },
                        '\uC7AC\uC2DD\uBCC4\uD654'
                    )
                ) : noneMasked.length > 0 ? _react2.default.createElement(
                    _Tooltip2.default,
                    { title: '\uBE44\uC2DD\uBCC4\uD654' },
                    _react2.default.createElement(
                        _Fab2.default,
                        { className: classes.actions, variant: 'extended', label: '\uBE44\uC2DD\uBCC4\uD654',
                            onClick: async function onClick() {
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = selected[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var _path2 = _step2.value;

                                        await (0, _masking2.default)(_path2, 'masking'); //마스킹
                                        await parsingPath(_path2, 1);
                                    }
                                } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                            _iterator2.return();
                                        }
                                    } finally {
                                        if (_didIteratorError2) {
                                            throw _iteratorError2;
                                        }
                                    }
                                }

                                ;
                                setSelected([]);
                            } },
                        '\uBE44\uC2DD\uBCC4\uD654'
                    )
                ) : '' : '',
                numSelected > 0 && numSelected === 1 && masked.length === 0 ? _react2.default.createElement(
                    _Tooltip2.default,
                    { title: '\uBB38\uC758' },
                    _react2.default.createElement(
                        _Fab2.default,
                        { className: classes.actions, variant: 'extended', label: '\uBB38\uC758', component: _reactRouterDom.Link,
                            to: '/qna', onClick: function onClick() {
                                _electron.ipcRenderer.send('RESULT1', selected.pop());
                            } },
                        '\uBB38\uC758'
                    )
                ) : ''
            )
        );
    };
    EnhancedTableToolbar.propTypes = {
        numSelected: _propTypes2.default.number.isRequired
    };

    function handleRequestSort(event, property) {
        var isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    /*
        useEffect(() => {
            let tmpList = [];
            rows = [];
            if (fs.exists('resultfile.json', (exists => { //
                console.log('file read');
                if (exists) {
                    tmpList = fs.readFileSync('resultfile.json', 'utf8');
                    tmpList = JSON.parse(tmpList);
                    for(const t of tmpList){
                        rows.push(createData(t.fileName,t.filePath,t.detectList,t.detectCount,t.formLevel,t.fitness));
                    }
                }
                setUpdate();
            })));
        }, []); //렌더링 이후 한번만 수행
    */
    (0, _react.useEffect)(function () {
        _electron.ipcRenderer.send('RESULT_PAGE', true);
        _electron.ipcRenderer.once('RESULT_LIST', function (event, result) {
            if (result.length > 0) {
                rows = [];
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = result[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var t = _step3.value;

                        rows.push(createData(t.fileName, t.filePath, t.detectList, t.detectCount, t.formLevel, t.fitness));
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                setUpdate();
            }
        });
        return function () {
            _electron.ipcRenderer.removeAllListeners('RESULT_LIST');
        };
    }, []);

    function handleSelectAllClick(event) {
        if (event.target.checked && selected.length === 0) {
            var tmp = [];
            var newSelecteds = rows.map(function (n) {
                return n.filePath;
            });
            var newCounts = rows.map(function (n) {
                return n.detectCount;
            });
            for (var i = 0; i < newSelecteds.length; i++) {
                if (newCounts[i] !== 0) tmp.push(newSelecteds[i]);
            }
            setSelected(tmp);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name) {
        var selectedIndex = selected.indexOf(name);
        var newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    var isSelected = function isSelected(name) {
        return selected.indexOf(name) !== -1;
    };

    var emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    var iconDisplay = function iconDisplay(input) {
        if (input === 'GREEN') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uC815\uC0C1', placement: 'top' },
                _react2.default.createElement(_FiberManualRecord2.default, { color: 'primary' })
            )
        );else if (input === 'YELLOW') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uACBD\uACE0', placement: 'top' },
                _react2.default.createElement(_Error2.default, { color: 'secondary' })
            )
        );else if (input === 'RED') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(
                _Tooltip2.default,
                { title: '\uC704\uD5D8', placement: 'top' },
                _react2.default.createElement(_Warning2.default, { color: 'error' })
            )
        );
        return _react2.default.createElement(
            _Tooltip2.default,
            { title: '\uBBF8\uB4F1\uB85D', placement: 'top' },
            _react2.default.createElement(_FiberManualRecord2.default, { color: 'disabled' })
        );
    };
    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            _Paper2.default,
            { className: classes.paper },
            _react2.default.createElement(EnhancedTableToolbar, { numSelected: selected.length, selected: selected }),
            _react2.default.createElement(
                'div',
                { className: classes.tableWrapper },
                _react2.default.createElement(
                    _Table2.default,
                    {
                        className: classes.table,
                        'aria-labelledby': 'tableTitle',
                        size: 'small'
                    },
                    _react2.default.createElement(EnhancedTableHead, {
                        numSelected: selected.length,
                        order: order,
                        orderBy: orderBy,
                        onSelectAllClick: handleSelectAllClick,
                        onRequestSort: handleRequestSort,
                        rowCount: rows.length
                    }),
                    _react2.default.createElement(
                        _TableBody2.default,
                        null,
                        stableSort(rows, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(function (row, index) {
                            var isItemSelected = isSelected(row.filePath);
                            var labelId = 'table-checkbox-' + index;

                            return _react2.default.createElement(
                                _TableRow2.default,
                                {
                                    hover: true,
                                    onClick: function onClick(event) {
                                        return handleClick(event, row.filePath);
                                    },
                                    role: 'checkbox',
                                    'aria-checked': isItemSelected,
                                    tabIndex: -1,
                                    key: row.filePath,
                                    selected: isItemSelected
                                },
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { padding: 'checkbox' },
                                    _react2.default.createElement(_Checkbox2.default, {
                                        checked: isItemSelected,
                                        inputProps: { 'aria-labelledby': labelId }
                                    })
                                ),
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { component: 'th', id: labelId, scope: 'row', padding: 'none' },
                                    _react2.default.createElement(
                                        _Typography2.default,
                                        { noWrap: true },
                                        row.fileName
                                    )
                                ),
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { align: 'right' },
                                    _react2.default.createElement(
                                        _Typography2.default,
                                        { className: classes.filepath,
                                            noWrap: true },
                                        row.filePath
                                    )
                                ),
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { className: classes.detectlist, wrap: 'nowrap',
                                        align: 'right' },
                                    row.detectList
                                ),
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { align: 'right' },
                                    row.detectCount
                                ),
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { align: 'right' },
                                    row.formLevel
                                ),
                                _react2.default.createElement(
                                    _TableCell2.default,
                                    { align: 'right' },
                                    iconDisplay(row.fitness)
                                )
                            );
                        }),
                        emptyRows > 0 && _react2.default.createElement(
                            _TableRow2.default,
                            { style: { height: 49 * emptyRows } },
                            _react2.default.createElement(_TableCell2.default, { colSpan: 6 })
                        )
                    )
                )
            ),
            _react2.default.createElement(_TablePagination2.default, {
                rowsPerPageOptions: [5],
                component: 'div',
                count: rows.length,
                rowsPerPage: rowsPerPage,
                page: page,
                backIconButtonProps: {
                    'aria-label': 'Previous Page'
                },
                nextIconButtonProps: {
                    'aria-label': 'Next Page'
                },
                onChangePage: handleChangePage,
                onChangeRowsPerPage: handleChangeRowsPerPage
            })
        )
    );
}