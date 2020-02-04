
import React, { useEffect, useState } from "react";
import { shouldUpdateLoggedInUser, fetchEditAccount } from '../actions/index';
import { Register } from './registration';
import EditAccount from "./settings/editaccount"

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom'

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import CompareIcon from '@material-ui/icons/Compare';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#BBDEFB',
    position: 'fixed',
    zIndex: '5'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function isLoggedIn() {
    return props.loggedInUser.firstName && props.loggedInUser.lastName && localStorage.getItem("token") && localStorage.getItem("userID");
  }

  function businessSearch () {
    props.history.push("/search/business");
    console.log("businessSearch");
  }

  function settings () {
    props.history.push('/settings')
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
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="fixed">
        <Toolbar style={{height: "8vh", color: 'black', boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)"}}>
          {/* <Typography variant="h3" className={classes.title} style={{border: "1px solid black", width: "400px"}}>
            Tally AI
            backgroundColor: "#BBDEFB"
          </Typography> */}
          <div style={{display: 'flex', width: '25%', color: '#0D47A1'}}>
                <Link style={{color: '#0D47A1', textDecoration: "none", fontSize:'1.4rem'}} to="/"><h1>tally</h1></Link>
          </div>
          {
          isLoggedIn() ? (
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '6vh', justifyContent: 'flex-end'}}>
            <List> 
              <div style={{width: '75%', color: "#0D47A1"}}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              </div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
              
              <ListItem button onClick={handleClose} component={Link} to="/Dashboard">
               <ListItemIcon>
              <DashboardIcon />
              </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <Link style={{ color: "black", textDecoration: "none"}} to={{ pathname: 'Search', searchMode: false }}>
                <ListItem button onClick={() => { handleClose(); businessSearch(); } } component={Link}>
                  <ListItemIcon>
                    <LibraryAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add a Business" />
                </ListItem>
              </Link>

              <Link style={{ color: "black", textDecoration: "none" }} to="Search">
                <ListItem button onClick={() => { handleClose(); competitorSearch(); } } component={Link}>
                  <ListItemIcon>
                    <LibraryAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add a Competitor" />
                </ListItem>
              </Link>
              
              <Link style={{ color: "black", textDecoration: "none" }} to="Settings">
              <ListItem button onClick={() => { handleClose(); settings(); } } component={Link}>
                <ListItemIcon >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary=" Account Settings" />
              </ListItem>
              </Link>
              <Divider />

              <ListItem button onClick={handleClick} component={Link} to="/">
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
              </Menu>
            </List>
            </div>
          ) :
          (//not logged in
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '6vh', justifyContent: 'flex-end'}}>

              <div style={{width: '100%', height: '6vh'}}>

                <List>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>

                    <ListItem style={{width: '15%', fontSize: '15px', textAlign:'center'}} button onClick={handleClose} component={Link} to="/">
                      <ListItemText primary="Home" />
                    </ListItem>

                    <ListItem style={{width: '15%', fontSize: '15px', textAlign:'center'}} button onClick={handleClose} component={Link} to="/AboutUs">
                      <ListItemText primary="About Us" />
                    </ListItem>

                    <ListItem style={{width: '15%', fontSize: '15px', textAlign:'center'}} button onClick={handleClose} component={Link} to="/Login">
                      <ListItemText primary="Log In" />
                    </ListItem>

                    <ListItem style={{width: '15%', fontSize: '15px', textAlign:'center', background: '#DFAB26', borderRadius: '40px'}} button onClick={handleClose} component={Link} to="/Register">
                      <ListItemText primary="Register" />
                    </ListItem>
                  </div>
                </List>

              </div>

            </div>
          )
      }
        </Toolbar>
      </AppBar>
    </div>
  );
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