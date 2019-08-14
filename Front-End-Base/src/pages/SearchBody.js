import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red, yellow, green, blue } from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';

import setting_data from './settingdata.json';

import Typography from '@material-ui/core/Typography';

import TableCell from '@material-ui/core/TableCell';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Tooltip from '@material-ui/core/Tooltip';
import NormalIcon from '@material-ui/icons/FiberManualRecord'
import WarningIcon from '@material-ui/icons/Error';
import DangerIcon from '@material-ui/icons/Warning';


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

let test = [];
setting_data.searchSetting.forEach(value => {
  if(value.checked === true){
    test.push(value.name);
  }
})

export default function SearchBody(props) {
  const { resultList } = props;
  const [ReRender, setReRender] = React.useState(false);

  // Forced ReRendering
  const [,updateState] = React.useState();
  const forceUpdate = React.useCallback(() => {updateState({}); setReRender(false)}, []);
  React.useEffect(() => {
    if(ReRender) {setTimeout(forceUpdate, 1000);}
  })

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
    if(input === '정상') 
    return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title="정상" placement="top"><NormalIcon color='primary' /></Tooltip>
    </MuiThemeProvider>)
    else if(input === '경고') return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title="경고" placement="top"><WarningIcon color='secondary'/></Tooltip>
    </MuiThemeProvider>)
    else if(input === '위험') return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title="위험" placement="top"><DangerIcon color='error'/></Tooltip>
    </MuiThemeProvider>)
    return <Tooltip title="미등록" placement="top"><NormalIcon color='disabled' /></Tooltip>
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
    static defaultProps = {
      headerHeight: 48,
      rowHeight: 40,
    };
  
    getRowClassName = ({ index }) => {
      const { classes, onRowClick } = this.props;
  
      return clsx(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
      });
    };
  
    cellRenderer = ({ cellData, columnIndex }) => {
      const { columns, classes, rowHeight, onRowClick } = this.props;
      const center = false;
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          })}
          variant="body"
          style={{ height: rowHeight }}
          align={(columnIndex != null && columns[columnIndex].numeric) || false ? (center ?'center':'right') : 'left'}
        >
          {columnIndex === 2 ? cellDisplay(cellData) : (columnIndex === 4 ? iconDisplay(cellData) : cellData)}
        </TableCell>
      );
    };
  
    headerRenderer = ({ label, columnIndex }) => {
      const { headerHeight, columns, classes } = this.props;
  
      return (
        <TableCell
          component="div"
          className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
          variant="head"
          style={{ height: headerHeight, paddingBottom: 0}}
          align={columns[columnIndex].numeric || false ? 'right' : 'left'}
        >
          <span style={{ fontSize: 16, fontWeight: 'bold', color: '#212121' }}>{label}</span>
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

  
  function createData(id, fileName, classification, detectList, detectCount, formLevel) {
    return {id, fileName, classification, detectList, detectCount, formLevel };
  }
  
  const rows = [];

  // 검색 결과 추가
  const addRow = (input) => {
    rows.push(createData(rows.length, input[0], input[1], input[2], input[3], input[4]));
    //forceUpdate();
  }
  for (let i = 0; i < resultList.length; i += 1) {
    //const randomSelection = resultList[Math.floor(Math.random() * resultList.length)];
    addRow(resultList[i]);
  }

  return (
    <Paper style={{ height: 400, width: '100%', border: 100, borderColor: '#000000', paddingLeft: 10, }} elevation={0}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 200+84,
            label: '파일명',
            dataKey: 'fileName',
          },
          {
            width: 120+84,
            label: '분류',
            dataKey: 'classification',
          },
          {
            width: 120+84,
            label: '검출 내역',
            dataKey: 'detectList',
          },
          {
            width: 110+84,
            label: '검출 개수',
            dataKey: 'detectCount',
            numeric: true,
          },
          {
            width: 110+84,
            label: '문서등급',
            dataKey: 'formLevel',
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}