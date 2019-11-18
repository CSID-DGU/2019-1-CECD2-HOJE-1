import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import NormalIcon from '@material-ui/icons/FiberManualRecord'
import WarningIcon from '@material-ui/icons/Error';
import DangerIcon from '@material-ui/icons/Warning';

import {ipcRenderer, shell} from 'electron';
import masking from '../../main/FrameTest/masking';
import quasi from '../../main/FrameTest/quasiShow';

const path = require('path');
const notifier = require('node-notifier');

function createData(fileName, filePath, detectList, detectCount, formLevel, fitness, classification) {
    return {fileName, filePath, detectList, detectCount, formLevel, fitness, classification};
}

// FormLevel : 1, 2, 3 -> 낮은 숫자일 수록 높은 등급
let rows = [];

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
    {id: 'detectList', numeric: false, disablePadding: false, label: '검출 내역'},
    {id: 'detectCount', numeric: true, disablePadding: false, label: '검출 개수'},
    {id: 'formLevel', numeric: false, disablePadding: false, label: '문서등급'},
    {id: 'fitness', numeric: false, disablePadding: false, label: '적합도'},
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
                            style={{fontSize: 16, fontWeight: 'bold', color: '#212121'}}
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

const parsingPath = function (ppath, mode) {
    let r = rows.find((item) => {
        return item.filePath === ppath;
    });
    let dir = path.dirname(ppath);
    let ext = path.extname(ppath);
    let basename = path.basename(ppath, ext); //파일 이름
    if (mode === 1) {
        let renaming = basename + '.mask';
        basename = renaming + ext; //새로운 파일 이름
        let renew = path.join(dir, basename); //새로운 경로
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
            shell.openItem(r.filePath);
        });

    } else if (mode === 2) {
        basename = basename.substring(0, basename.length - 5) + ext; //새로운 파일 이름
        let renew = path.join(dir, basename); //새로운 경로
        r.fileName = basename;
        r.filePath = renew;
        r.detectList = [];
        r.detectCount = 0;
        notifier.notify({ //수행이 다 된 후 알람
            title: 'Unmasking Success!',
            message: '파일이 재식별화 됐습니다.',
            wait: true,
            timeout: false
        }, function (err, response) {
            shell.openItem(r.filePath);
        });
    }
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
        backgroundColor: '#e6ee9c',
        color: '#000000',
    },
    title: {
        flex: '0 0 auto',
    },
}));

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

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        border: '1px solid',
        borderRadius: '10px',
        borderColor: "#c5e1a5",
        boxShadow: '2px 2px 2px',
    },
    table: {
        minWidth: 700,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {main: green[500]},
        secondary: {main: yellow[500]},
        error: {main: red[500]},
        default: {main: blue[500]},
    },
});


const modalStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

let quasiTmp = [];
export default function Result() {
    const classes = useStyles();
    const [, setUpdate] = useState([]); //강제 렌더링
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('formLevel');
    const [selected, setSelected] = React.useState([]);
    const [selectedClassification, setSelectedClassification] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const cellDisplay = (input, selectedClassification) => {
        let tmp = [];
        //console.log('classification', selectedClassification);
        if(selectedClassification.indexOf('국민카드') == -1) return '추론이 불가능한 이미지입니다.';
        for(var i = 0; i < input.length; i++) {
            tmp.push(input[i]);
            if (i < input.length - 1) tmp.push('/');
        }
        tmp.push('가 추론 될 수 있습니다.');
        return tmp;
    };

    const EnhancedTableToolbar = props => {
        const classes = useToolbarStyles();
        const {numSelected, selected, selectedClassification} = props;
        const masked = [];
        const noneMasked = [];
        selected.forEach(element => {
            if (element.indexOf('.mask') !== -1) masked.push(element);
            else noneMasked.push(element);
        });
        const modalclasses = modalStyles();
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        return (
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
                style={{
                    height: 74,
                    background: 'linear-gradient( #f1f8e9, #fafafa )',
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px'
                }}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subtitle1">
                            {numSelected} 선택됨
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
                                            <Fab className={classes.actions} variant="extended" label='재식별화'
                                                 onClick={async () => {
                                                     for (const path of selected) {
                                                         await masking(path, 'unmasking'); //재 식별화
                                                         await parsingPath(path, 2);
                                                     }
                                                     ;
                                                     setSelected([]);
                                                 }}>재식별화</Fab>
                                        </Tooltip>
                                    ) :
                                    (noneMasked.length > 0 ? (
                                            <Tooltip title="비식별화">
                                                <Fab className={classes.actions} variant="extended" label='비식별화'
                                                     onClick={async () => {
                                                         for (const path of selected) {
                                                             await masking(path, 'masking'); //마스킹
                                                             await parsingPath(path, 1);
                                                         }
                                                         ;
                                                         setSelected([]);
                                                     }}>비식별화</Fab>
                                            </Tooltip>) :
                                        ('')))
                        ) :
                        ('')
                    }
                    {numSelected > 0 && numSelected === 1 && masked.length === 0 ? (
                        <Tooltip title="준식별자 탐지">
                            <Fab className={classes.actions} style={{marginLeft: 10}} variant="extended" label='준식별자 탐지'
                                 onClick={
                                     async () => {
                                         quasiTmp = await quasi();
                                         console.log('quasi: ', quasiTmp);
                                         handleOpen();
                                     }
                                 }>
                                준식별자 탐지
                            </Fab>
                        </Tooltip>
                    ) : ('')
                    }
                    <Modal
                        className={modalclasses.modal}
                        open={open}
                        onClose={handleClose}
                    >
                        <Fade in={open}>
                            <div className={modalclasses.paper}>
                                <h2 id="transition-modal-title">추론 속성 정보</h2>
                                <p id="transition-modal-description">{
                                    cellDisplay(quasiTmp, selectedClassification)
                                }</p>
                            </div>
                        </Fade>
                    </Modal>
                    {numSelected > 0 && numSelected === 1 && masked.length === 0 ? (
                        <Tooltip title="문의">
                            <Fab className={classes.actions} style={{marginLeft: 10}} variant="extended" label='문의'
                                 component={Link}
                                 to='/qna' onClick={() => {
                                ipcRenderer.send('RESULT1', selected.pop());
                            }}>문의</Fab>
                        </Tooltip>
                    ) : ('')
                    }
                </div>
            </Toolbar>
        );
    };
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
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
    useEffect(() => {
        ipcRenderer.send('RESULT_PAGE', true);
        ipcRenderer.once('RESULT_LIST', (event, result) => {
            if (result.length > 0) {
                rows = [];
                for (const t of result) {
                    rows.push(createData(t.fileName, t.filePath, t.detectList, t.detectCount, t.formLevel, t.fitness, t.classification));
                }
                setUpdate();
            }
        });
        return () => {
            ipcRenderer.removeAllListeners('RESULT_LIST');
        }

    }, []);

    function handleSelectAllClick(event) {
        if (event.target.checked && selected.length === 0) {
            let tmp = [];
            const newSelecteds = rows.map(n => n.filePath);
            const newCounts = rows.map(n => n.detectCount);
            for (var i = 0; i < newSelecteds.length; i++) {
                if (newCounts[i] !== 0) tmp.push(newSelecteds[i]);
            }
            setSelected(tmp);
            return;
        }
        setSelected([]);
    }

    function handleClick(event, name, classification) {
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

        const selectedIndexIndex = selectedClassification.indexOf(classification);
        let newSelectedClassification = [];

        if (selectedIndexIndex === -1) {
            newSelectedClassification = newSelectedClassification.concat(selectedClassification, classification);
        } else if (selectedIndexIndex === 0) {
            newSelectedClassification = newSelectedClassification.concat(selectedClassification.slice(1));
        } else if (selectedIndexIndex === selected.length - 1) {
            newSelectedClassification = newSelectedClassification.concat(selectedClassification.slice(0, -1));
        } else if (selectedIndexIndex > 0) {
            newSelectedClassification = newSelectedClassification.concat(
                selectedClassification.slice(0, selectedIndexIndex),
                selectedClassification.slice(selectedIndexIndex + 1),
            );
        }

        setSelectedClassification(newSelectedClassification);

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
        if (input === 'GREEN')
            return (
                <MuiThemeProvider theme={theme}>
                    <Tooltip title="정상" placement="top"><NormalIcon color='primary'/></Tooltip>
                </MuiThemeProvider>)
        else if (input === 'YELLOW') return (
            <MuiThemeProvider theme={theme}>
                <Tooltip title="경고" placement="top"><WarningIcon color='secondary'/></Tooltip>
            </MuiThemeProvider>)
        else if (input === 'RED') return (
            <MuiThemeProvider theme={theme}>
                <Tooltip title='위험' placement="top"><DangerIcon color='error'/></Tooltip>
            </MuiThemeProvider>)
        return <Tooltip title="미등록" placement="top"><NormalIcon color='disabled'/></Tooltip>
    }


    return (
        <div className={classes.root}>
            <Box className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} selectedClassification={selectedClassification}/>
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
                                            onClick={event => handleClick(event, row.filePath, row.classification)}
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
                                            <TableCell style={{width: 200 + 84}} component="th" id={labelId} scope="row"
                                                       padding="none">
                                                <Tooltip title={row.filePath} placement="top"><Typography
                                                    noWrap>{row.fileName}</Typography></Tooltip>
                                            </TableCell>
                                            <TableCell style={{width: 120 + 84}} wrap='nowrap'
                                                       align="right">{row.detectList}</TableCell>
                                            <TableCell style={{width: 120 + 84}}
                                                       align="right">{row.detectCount}</TableCell>
                                            <TableCell style={{width: 110 + 84}}
                                                       align="right">{row.formLevel}</TableCell>
                                            <TableCell style={{width: 110 + 84}} align="right">
                                                {iconDisplay(row.fitness)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 42 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    style={{
                        backgroundColor: '#f1f8e9',
                        borderBottomRightRadius: '10px',
                        borderBottomLeftRadius: '10px'
                    }}
                    rowsPerPageOptions={[7]}
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
            </Box>
        </div>
    );
}
