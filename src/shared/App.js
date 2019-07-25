import React from 'react';
import { Route, Link } from 'react-router-dom';
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
//import Menu from '../component/Menu';

const drawerWidth = 180;

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
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function App(props) {
  const { container } = props;
  const classes = useStyles();
  const [select, setSelect] = React.useState(0);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  // 위에 툴바
	const drawerToolbar = (
		<Toolbar>
      <Grid container direction="row" justify="space-between">
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
          <Typography variant="h6">
            HOJE-OCR
          </Typography>
        </Grid>
        <Grid>
          <IconButton component={Link} to="/#">
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
      selected={select%8 === 0 ? true : false}
      component={Link} to="/"
      onClick={()=>setSelect(0)}
			>
			<ListItemIcon><HomeIcon /></ListItemIcon>
			<ListItemText primary="홈" />
			</ListItem>
			<ListItem
      button
      selected={select%8 === 1 ? true : false}
      component={Link} to="/search"
      onClick={()=>setSelect(1)}
			>
			<ListItemIcon><SearchIcon /></ListItemIcon>
			<ListItemText primary="검사" />
			</ListItem>
			<ListItem
      button
      selected={select%8 === 2 ? true : false}
      component={Link} to="/result"
      onClick={()=>setSelect(2)}
			>
      <ListItemIcon><ResultIcon /></ListItemIcon>
			<ListItemText primary="검출내역" />
			</ListItem>
			<ListItem
      button
      selected={select%8 === 3 ? true : false}
      component={Link} to="/setting"
      onClick={()=>setSelect(3)}
			>
			<ListItemIcon><SettingIcon /></ListItemIcon>
			<ListItemText primary="설정" />
			</ListItem>
			<ListItem
      button
      selected={select%8 === 4 ? true : false}
      component={Link} to="/qna"
      onClick={()=>setSelect(4)}
			>
			<ListItemIcon><MailIcon /></ListItemIcon>
			<ListItemText primary="문의" />
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
      <nav className={classes.drawer} aria-label="Mailbox folders">
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
      </main>
    </div>
  );
}

App.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};