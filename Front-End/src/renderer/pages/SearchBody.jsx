import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red, yellow, green, blue } from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';


import Typography from '@material-ui/core/Typography';

import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Tooltip from '@material-ui/core/Tooltip';
import NormalIcon from '@material-ui/icons/FiberManualRecord'
import WarningIcon from '@material-ui/icons/Error';
import DangerIcon from '@material-ui/icons/Warning';
import UploadLog from "../../main/FrameTest/uploadLog";
const {ipcRenderer} = require('electron');
const delay = require('delay');

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(3),
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 360,
    },
    spacer: {
        flex: '1 1 auto',
    },
}));

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {children}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function SearchBefore() {
   // console.log('body rendering......');
    const classes = useStyles();
    const [rows ,setRow] = useState([]);
    useEffect( ()=>{
        ipcRenderer.on('RESULT_DICTIONARY',async (event,result)=>{
            setRow([...rows,createData(rows.length, result.fileName,result.classification,result.detectList,result.detectCount,result.formLevel,result.filePath,result.fitness)]);
            console.log(rows);
            await delay(30);
        });
        return ()=>{
            //console.log('closed : ' ,rows);
            ipcRenderer.send('TEST1',rows);
            ipcRenderer.removeAllListeners('RESULT_DICTIONARY');
        }
    },);
    ///////////////////// 검색결과 //////////////////////////

    const styles = theme => ({
        flexContainer: {
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
        },
        tableRow: {
            cursor: 'pointer',
        },
        tableRowHover: {
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
        },
        tableCell: {
            flex: 1,
        },
        noClick: {
            cursor: 'initial',
        },
    });

    const theme = createMuiTheme({
        palette: {
            primary: { main: green[500] },
            secondary: { main: yellow[500] },
            error: { main: red[500] },
            default: { main: blue[500] },
        },
    });

    const iconDisplay = (input) => {
        if(input === 'GREEN')
            return (
                <MuiThemeProvider theme={theme}>
                    <Tooltip title="정상" placement="top"><NormalIcon color='primary' /></Tooltip>
                </MuiThemeProvider>)
        else if(input === 'YELLOW') return (
            <MuiThemeProvider theme={theme}>
                <Tooltip title="미등록" placement="top"><WarningIcon color='secondary'/></Tooltip>
            </MuiThemeProvider>)
        else if(input === 'RED') return (
            <MuiThemeProvider theme={theme}>
                <Tooltip title='위험' placement="top"><DangerIcon color='error'/></Tooltip>
            </MuiThemeProvider>)
        return <Tooltip title="분류실패" placement="top"><NormalIcon color='disabled' /></Tooltip>
    }

    const cellDisplay = (input) => {
        let tmp = [];
        for(var i = 0; i < input.length; i++)
        {
            tmp.push(input[i]);
            if(i < input.length-1) tmp.push('/');
        }
        return tmp;
    }

    class MuiVirtualizedTable extends React.PureComponent {
        constructor(props){
            super(props);
            this.getRowClassName = this.getRowClassName.bind(this);
            this.cellRenderer = this.cellRenderer.bind(this);
            this.headerRenderer = this.headerRenderer.bind(this);
        }
        getRowClassName({ index }){
            const { classes, onRowClick } = this.props;

            return clsx(classes.tableRow, classes.flexContainer, {
                [classes.tableRowHover]: index !== -1 && onRowClick != null,
            });
        };
        cellRenderer({ cellData, columnIndex }){
            const { columns, classes, rowHeight, onRowClick } = this.props;
            return (
                <TableCell
                    component="div"
                    className={clsx(classes.tableCell, classes.flexContainer, {
                        [classes.noClick]: onRowClick == null,
                    })}
                    variant="body"
                    style={{ height: rowHeight }}
                    align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
                >
                    {columnIndex === 2 ? cellDisplay(cellData) : (columnIndex === 4 ? iconDisplay(cellData) : cellData)}
                </TableCell>
            );
        };
        headerRenderer({ label, columnIndex }){
            const { headerHeight, columns, classes } = this.props;
            return (
                <TableCell
                    component="div"
                    className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
                    variant="head"
                    style={{ height: headerHeight }}
                    align={columns[columnIndex].numeric || false ? 'right' : 'left'}
                >
                    <span>{label}</span>
                </TableCell>
            );
        };
        render() {
            const { classes, columns, rowHeight, headerHeight, rowCount, rowGetter } = this.props;
            return (
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            height={height}
                            width={width}
                            rowHeight={rowHeight}
                            headerHeight={headerHeight}
                            rowCount={rowCount}
                            rowGetter={rowGetter}
                            rowClassName={this.getRowClassName}
                        >
                            {columns.map(({ dataKey, width, label, numeric }, index) => {
                                return (
                                    <Column
                                        key={dataKey}
                                        headerRenderer={() =>
                                            this.headerRenderer({
                                                label: label,
                                                columnIndex: index,
                                            })
                                        }
                                        className={classes.flexContainer}
                                        cellRenderer={this.cellRenderer}
                                        dataKey={dataKey}
                                        width={width}
                                        label={label}
                                        numeric={numeric}
                                    />
                                );
                            })}
                        </Table>
                    )}
                </AutoSizer>
            );
        }
    }
    MuiVirtualizedTable.defaultProps = {
        headerHeight: 48,
        rowHeight: 40,
    };
    MuiVirtualizedTable.propTypes = {
        classes: PropTypes.object.isRequired,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                dataKey: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                numeric: PropTypes.bool,
                width: PropTypes.number.isRequired,
            }),
        ).isRequired,
        headerHeight: PropTypes.number,
        onRowClick: PropTypes.func,
        rowHeight: PropTypes.number,
    };

    const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

    function createData(id, fileName,classification, detectList, detectCount, formLevel, filePath, fitness) {
        return {id, fileName,classification, detectList, detectCount, formLevel, filePath, fitness };
    }

   // console.log('body end........');
    return (
        <Paper style={{ height: 400, width: '100%' }}>
            <VirtualizedTable
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                columns={[
                    {
                        width: 200,
                        label: '파일명',
                        dataKey: 'fileName',
                    },
                    {
                        width: 120,
                        label: '분류',
                        dataKey: 'classification',
                    },
                    {
                        width: 120,
                        label: '검출 내역',
                        dataKey: 'detectList',
                    },
                    {
                        width: 120,
                        label: '검출 개수',
                        dataKey: 'detectCount',
                        numeric: true,
                    },
                    {
                        width: 120,
                        label: '적합도',
                        dataKey: 'fitness',
                        numeric: true,
                    },
                ]}
            />
        </Paper>
    );
}