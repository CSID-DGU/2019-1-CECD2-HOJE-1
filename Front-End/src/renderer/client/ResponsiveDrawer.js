import React from 'react';
import {Route, NavLink, Link} from 'react-router-dom';
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
import {makeStyles, useTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import UpdataIcon from '@material-ui/icons/Update';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ResultIcon from '@material-ui/icons/Assignment'
import SettingIcon from '@material-ui/icons/Settings';
import MailIcon from '@material-ui/icons/Mail';

import Home from '../../renderer/pages/Home';
import Search from '../pages/Search';
import Setting from '../../renderer/pages/Setting';
import QnAMail from '../../renderer/pages/QnAMail';
import Result from '../../renderer/pages/Result';
import DownloadFile from '../../main/FrameTest/DownloadFile';
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
    active: {
        background: '#9e9e9e',
    }
}));

export default function ResponsiveDrawer(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    // Forced ReRendering
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        HOJE-OCR
                    </Typography>
                </Grid>
                <Grid>
                    <IconButton onClick={()=> {
                        console.log('Download...');
                        DownloadFile();
                        forceUpdate();
                    }}>
                        <UpdataIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Toolbar>
    );
    // 왼쪽 메뉴 부분
    const drawer = (
        <div>
            <div className={classes.toolbar}/>
            <List>
                <ListItem
                    button
                    activeClassName={classes.active}
                    component={NavLink} exact to="/"
                >
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary="홈"/>
                </ListItem>
                <ListItem
                    button
                    activeClassName={classes.active}
                    component={NavLink} to="/search"
                >
                    <ListItemIcon><SearchIcon/></ListItemIcon>
                    <ListItemText primary="검사"/>
                </ListItem>
                <ListItem
                    button
                    activeClassName={classes.active}
                    component={NavLink} to="/result"
                >
                    <ListItemIcon><ResultIcon/></ListItemIcon>
                    <ListItemText primary="검출내역"/>
                </ListItem>
                <ListItem
                    button
                    activeClassName={classes.active}
                    component={NavLink} to="/setting"
                >
                    <ListItemIcon><SettingIcon/></ListItemIcon>
                    <ListItemText primary="설정"/>
                </ListItem>
                <ListItem
                    button
                    activeClassName={classes.active}
                    activeClassName={classes.active}
                    component={NavLink} to="/qna"
                >
                    <ListItemIcon><MailIcon/></ListItemIcon>
                    <ListItemText primary="문의"/>
                </ListItem>
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            <CssBaseline/>
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
                <div className={classes.toolbar}/>
                <Route exact={true} path={"/"} component={Home}/>
                <Route path={"/search"} component={Search}/>
                <Route path="/setting" component={Setting}/>
                <Route path="/qna" component={QnAMail}/>
                <Route path="/result" component={Result}/>
            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};