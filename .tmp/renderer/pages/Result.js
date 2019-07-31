'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');
function createData(fileName, filePath, detectList, detectCount, formLevel, fitness) {
    return { fileName: fileName, filePath: filePath, detectList: detectList, detectCount: detectCount, formLevel: formLevel, fitness: fitness };
}

// FormLevel : 1, 2, 3 -> 낮은 숫자일 수록 높은 등급
var rows = [createData('card2(1).jpg', 'C:/Users/HYS/Desktop/test/images/card2(1).jpg', ['카드번호'], 1, 2, '경고'), createData('card2(2).jpg', 'C:/Users/HYS/Desktop/test/images/card2(2).jpg', ['카드번호'], 1, 2, '정상'), createData('card3.jpg', 'C:/Users/HYS/Desktop/test/images/card3.jpg', ['카드번호'], 1, 2, '경고'), createData('text-out.jpg', 'C:/Users/HYS/Desktop/test/images/text-out.jpg', [''], 0, 4, '위험'), createData('sample.jpg', 'C:/Users/HYS/Desktop/test/images/sample.jpg', ['주소', '주민등록번호'], 2, 2, '정상'), createData('sample2.jpg', 'C:/Users/HYS/Desktop/test/images/sample2.jpg', ['주소', '주민등록번호'], 2, 2, '정상'), createData('sample3.jpg', 'C:/Users/HYS/Desktop/test/images/sample3.jpg', ['주소', '주민등록번호'], 2, 2, '정상'), createData('sample2.jpg', 'C:/Users/HYS/Desktop/test/sample2.jpg', ['주소', '주민등록번호'], 2, 2, '정상')];

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

var headRows = [{ id: 'fileName', numeric: false, disablePadding: true, label: '파일명' }, { id: 'filePath', numeric: false, disablePadding: false, label: '파일 경로' }, { id: 'detectList', numeric: false, disablePadding: false, label: '검출 내역' }, { id: 'detectCount', numeric: true, disablePadding: false, label: '검출 개수' }, { id: 'formLevel', numeric: false, disablePadding: false, label: '문서등급' }, { id: 'fitness', numeric: false, disablePadding: false, label: '위반여부' }];

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

var EnhancedTableToolbar = function EnhancedTableToolbar(props) {
    var classes = useToolbarStyles();
    var numSelected = props.numSelected;


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
            numSelected > 0 ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _Tooltip2.default,
                    { title: '\uBE44\uC2DD\uBCC4\uD654' },
                    _react2.default.createElement(
                        _Fab2.default,
                        { className: classes.actions, variant: 'extended', label: '\uBE44\uC2DD\uBCC4\uD654' },
                        '\uBE44\uC2DD\uBCC4\uD654'
                    )
                ),
                _react2.default.createElement(
                    _Tooltip2.default,
                    { title: '\uBB38\uC758' },
                    _react2.default.createElement(
                        _Fab2.default,
                        { className: classes.actions, variant: 'extended', label: '\uBB38\uC758' },
                        '\uBB38\uC758'
                    )
                )
            ) : _react2.default.createElement('div', null)
        )
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: _propTypes2.default.number.isRequired
};

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

    function handleRequestSort(event, property) {
        var isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    (0, _react.useEffect)(function () {
        if (fs.exists('resultfile.json', function (exists) {
            if (exists) {
                rows = fs.readFileSync('resultfile.json', 'utf8');
                rows = JSON.parse(rows);
            }
            setUpdate();
        })) ;
    }, []); //렌더링 이후 한번만 수행

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            var newSelecteds = rows.map(function (n) {
                return n.FilePath;
            });
            setSelected(newSelecteds);
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
        if (input === '정상') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(_FiberManualRecord2.default, { color: 'primary' })
        );else if (input === '경고') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(_Error2.default, {
                color: 'secondary' })
        );else if (input === '위험') return _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: theme },
            _react2.default.createElement(_Warning2.default, { color: 'error' })
        );
        return _react2.default.createElement(_FiberManualRecord2.default, { color: 'disabled' });
    };

    return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
            _Paper2.default,
            { className: classes.paper },
            _react2.default.createElement(EnhancedTableToolbar, { numSelected: selected.length }),
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
                                        row.FileName
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
                rowsPerPageOptions: [5, 10, 25],
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