import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {lighten, makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {red, yellow, green, blue} from '@material-ui/core/colors';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import NormalIcon from '@material-ui/icons/FiberManualRecord'
import WarningIcon from '@material-ui/icons/Error';
import DangerIcon from '@material-ui/icons/Warning';
const fs = require('fs');
function createData(fileName, filePath, detectList, detectCount, formLevel, fitness) {
    return {fileName, filePath, detectList, detectCount, formLevel, fitness};
}

// FormLevel : 1, 2, 3 -> 낮은 숫자일 수록 높은 등급
let rows = [
    createData('card2(1).jpg', 'C:/Users/HYS/Desktop/test/images/card2(1).jpg', ['카드번호'], 1, 2, '경고'),
    createData('card2(2).jpg', 'C:/Users/HYS/Desktop/test/images/card2(2).jpg', ['카드번호'], 1, 2, '정상'),
    createData('card3.jpg', 'C:/Users/HYS/Desktop/test/images/card3.jpg', ['카드번호'], 1, 2, '경고'),
    createData('text-out.jpg', 'C:/Users/HYS/Desktop/test/images/text-out.jpg', [''], 0, 4, '위험'),
    createData('sample.jpg', 'C:/Users/HYS/Desktop/test/images/sample.jpg', ['주소', '주민등록번호'], 2, 2, '정상'),
    createData('sample2.jpg', 'C:/Users/HYS/Desktop/test/images/sample2.jpg', ['주소', '주민등록번호'], 2, 2, '정상'),
    createData('sample3.jpg', 'C:/Users/HYS/Desktop/test/images/sample3.jpg', ['주소', '주민등록번호'], 2, 2, '정상'),
    createData('sample2.jpg', 'C:/Users/HYS/Desktop/test/sample2.jpg', ['주소', '주민등록번호'], 2, 2, '정상'),
];

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
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    {id: 'fileName', numeric: false, disablePadding: true, label: '파일명'},
    {id: 'filePath', numeric: false, disablePadding: false, label: '파일 경로'},
    {id: 'detectList', numeric: false, disablePadding: false, label: '검출 내역'},
    {id: 'detectCount', numeric: true, disablePadding: false, label: '검출 개수'},
    {id: 'formLevel', numeric: false, disablePadding: false, label: '문서등급'},
    {id: 'fitness', numeric: false, disablePadding: false, label: '위반여부'},
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'Select all Result'}}
                    />
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.primary.main,
                backgroundColor: lighten(theme.palette.primary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.primary.dark,
            },
    spacer: {
        flex: '1 1 auto',
    },
    actions: {
        color: theme.palette.text.primary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const {numSelected} = props;

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
                    <div>
                        <Tooltip title="비식별화">
                            <Fab className={classes.actions} variant="extended" label='비식별화'>비식별화</Fab>
                        </Tooltip>
                        <Tooltip title="문의">
                            <Fab className={classes.actions} variant="extended" label='문의'>문의</Fab>
                        </Tooltip>
                    </div>
                ) : (<div></div>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
    },
    table: {
        minWidth: 700,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    filepath: {
        width: 140,
    },
    detectlist: {
        width: 100,
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {main: green[500]}, // Purple and green play nicely together.
        secondary: {main: yellow[500]}, // This is just green.A700 as hex.
        error: {main: red[500]},
    },
});

export default function Result() {
    const classes = useStyles();
    const [, setUpdate] = useState([]); //강제 렌더링
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('formLevel');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    useEffect(() => {
        let tmpList = [];
        if (fs.exists('resultfile.json', (exists => {
            if (exists) {
                tmpList = fs.readFileSync('resultfile.json', 'utf8');
                tmpList = JSON.parse(tmpList);
            }
            setUpdate();
        }))) ;
    }, []); //렌더링 이후 한번만 수행

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.FilePath);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
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

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    const iconDisplay = (input) => {
        if (input === '정상') return <MuiThemeProvider theme={theme}><NormalIcon color='primary'/></MuiThemeProvider>
        else if (input === '경고') return <MuiThemeProvider theme={theme}><WarningIcon
            color='secondary'/></MuiThemeProvider>
        else if (input === '위험') return <MuiThemeProvider theme={theme}><DangerIcon color='error'/></MuiThemeProvider>
        return <NormalIcon color='disabled'/>
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.filePath);
                                    const labelId = `table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.filePath)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.filePath}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                <Typography noWrap>{row.FileName}</Typography>
                                            </TableCell>
                                            <TableCell align="right"><Typography className={classes.filepath}
                                                                                 noWrap>{row.filePath}</Typography></TableCell>
                                            <TableCell className={classes.detectlist} wrap='nowrap'
                                                       align="right">{row.detectList}</TableCell>
                                            <TableCell align="right">{row.detectCount}</TableCell>
                                            <TableCell align="right">{row.formLevel}</TableCell>
                                            <TableCell align="right">
                                                {iconDisplay(row.fitness)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
