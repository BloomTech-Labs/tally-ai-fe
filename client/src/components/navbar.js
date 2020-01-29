
import React, { useEffect, useState } from "react";
import { shouldUpdateLoggedInUser, fetchEditAccount } from '../actions/index';
import { Register } from './registration';
import EditAccount from "./settings/editaccount"

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import CompareIcon from '@material-ui/icons/Compare';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
}));

function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function isLoggedIn() {
    return props.loggedInUser.firstName && props.loggedInUser.lastName && localStorage.getItem("token") && localStorage.getItem("userID");
  }

  function businessSearch () {
    props.history.push("/search/business");
    console.log("businessSearch");
  }

  function competitorSearch () {
    props.history.push("/search/competitor");
    console.log("compSearch");
  }

  const handleClick = event => {
    //event.preventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    props.shouldUpdateLoggedInUser(true);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            Tally AI
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        {
          isLoggedIn() ? (
            <List> 

              <Link style={{ color: "black", textDecoration: "none"}} to={{ pathname: 'Search', searchMode: false }}>
                <ListItem button onClick={() => { handleDrawerClose(); businessSearch(); } } component={Link}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add a Business" />
                </ListItem>
              </Link>

              <Link style={{ color: "black", textDecoration: "none" }} to="Search">
                <ListItem button onClick={() => { handleDrawerClose(); competitorSearch(); } } component={Link}>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add a Competitor" />
                </ListItem>
              </Link>

              
              <ListItem onClick={handleDrawerClose} component={Link} to="/Settings">
                <ListItemIcon >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary=" Account Settings" />
              </ListItem>

              <ListItem button onClick={handleDrawerClose} component={Link} to="/Compset">
               <ListItemIcon>
              <CompareIcon />
              </ListItemIcon>
                <ListItemText primary="Comp Set" />
              </ListItem>

              <Divider />

              <ListItem button onClick={handleClick} component={Link} to="/">
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>

            </List>
          )
            :
            (//not logged in
              <List>

                <ListItem button onClick={handleDrawerClose} component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>

                <ListItem button onClick={handleDrawerClose} component={Link} to="/Login">
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log In" />
                </ListItem>

                <ListItem button onClick={handleDrawerClose} component={Link} to="/Register">
                  <ListItemIcon>
                    <CreateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>

                <Divider />

                <ListItem button onClick={handleDrawerClose} component={Link} to="/AboutUs">
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="About Us" />
                </ListItem>

              </List>
            )
        }
      </Drawer>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.loggedInUser.userID,
    loggedInUser: state.loggedInUser.data,
    isFetching: state.loggedInUser.isFetching,
    error: state.loggedInUser.error
  };
};

export default withRouter(connect(
  mapStateToProps,
  { fetchEditAccount, shouldUpdateLoggedInUser }
)(NavBar))
