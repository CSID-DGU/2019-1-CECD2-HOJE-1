import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import MenuIcon from '@material-ui/icons/Menu';
import UpdataIcon from '@material-ui/icons/Update';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ResultIcon from '@material-ui/icons/Assignment'
import SettingIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';

import Home from '../pages/Home';
import Search from '../pages/Search';
import Setting from '../pages/Setting';
import QnAMail from '../pages/QnAMail';
import Result from '../pages/Result';
import Test from '../components/Test';
//import Menu from '../component/Menu';

const drawerWidth = 60;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    backgroundColor: '#aed581',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  appBarbottom: {
    height: 10,
    top: 'auto',
    bottom: 0,
    backgroundColor: '#bdbdbd',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    backgroundColor: '#7cb342',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
  },
  footer: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  active: {
    background: '#f5f5f5',
  },
}));

export default function App(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [updateActive, setUpdateActive] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  // 위에 툴바
	const drawerToolbar = (
		<Toolbar>
      <Grid container direction="row" justify="space-between"  alignItems="center">
        <Grid>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HOJE-OCR
          </Typography>
        </Grid>
        <Grid>
          <IconButton disabled={updateActive} component={Link} to="#/">
            <UpdataIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  )

  // 왼쪽 메뉴 부분
  const drawer = (
		<div>
		<div className={classes.toolbar} />
    <List>
			<ListItem
      button
      activeClassName={classes.active}
      component={NavLink} exact to="/"
      onClick={()=>setUpdateActive(false)}
			>
        <Tooltip title='홈' placement="top"><HomeIcon /></Tooltip>
			</ListItem>
			<ListItem
      button
      activeClassName={classes.active}
      component={NavLink} exact to="/search"
      onClick={()=>setUpdateActive(true)}
			>
			<Tooltip title='검사' placement="top"><SearchIcon /></Tooltip>
			</ListItem>
			<ListItem
      button
      activeClassName={classes.active}
      component={NavLink} exact to="/result"
      onClick={()=>setUpdateActive(false)}
			>
      <Tooltip title='결과' placement="top"><ResultIcon /></Tooltip>
			</ListItem>
			<ListItem
      button
      activeClassName={classes.active}
      component={NavLink} exact to="/setting"
      onClick={()=>setUpdateActive(false)}
			>
			<Tooltip title='설정' placement="top"><SettingIcon /></Tooltip>
			</ListItem>
			<ListItem
      button
      activeClassName={classes.active}
      component={NavLink} exact to="/qna"
			>
			<Tooltip title='문의' placement="top"><MailIcon /></Tooltip>
			</ListItem>
      <ListItem
      button
      activeClassName={classes.active}
      component={NavLink} exact to="/test"
      onClick={()=>setUpdateActive(false)}
			>
			<MailIcon />
			</ListItem>
		</List>
		</div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        {drawerToolbar}
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path="/" component={ Home } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/setting" component={ Setting } />
        <Route exact path="/qna" component={ QnAMail } />
        <Route exact path="/result" component={ Result } />
        <Route exact path="/test" component={ Test } />
      </main>
      <AppBar position="fixed" color="primary" className={classes.appBarbottom}>
        <Toolbar>
        </Toolbar>
      </AppBar>
    </div>
  );
}

App.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};