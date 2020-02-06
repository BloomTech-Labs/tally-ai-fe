
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
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //backgroundColor: '#3f51b5',
    position: 'fixed',
    zIndex: '5'
  },
  menuButton: {
    marginRight: theme.spacing(1),
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

  function businessSearch() {
    props.history.push("/search/business");
    console.log("businessSearch");
  }

  function settings() {
    props.history.push('/settings')
  }

  function competitorSearch() {
    props.history.push("/search/competitor");
    console.log("compSearch");
  }

  const handleClick = event => {
    //event.preventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    props.shouldUpdateLoggedInUser(true);
  }

  function isOnHomePage() {

    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split('/')[1];

    return firstParam === "";
  }

  function isOnDashboard() {

    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split('/')[1];

    return firstParam.toUpperCase() === "Dashboard".toUpperCase();
  }

  return (
    <div className={classes.root} style={{position: "fixed"}}>
      {isOnHomePage() ? <div className="landing-top-section"
      >

        <Link className="homeNavLink" to="/About">About</Link>
        <Link className="homeNavLink" to="/Login">Sign In</Link>
        <Link to="/register"><button className="Signup" >Sign Up</button></Link>


      </div> :
        isLoggedIn() ? (
          <AppBar position="fixed" style={{ boxShadow: "none", backgroundColor: "#0F3088", height: "8vh" }} >
            <Toolbar style={{ minHeight: "0", color: 'black' }}>
              {/* <Typography variant="h3" className={classes.title} style={{border: "1px solid black", width: "400px"}}>
            Tally AI
            backgroundColor: "#BBDEFB"
          </Typography> */}
              <div style={{ display: 'flex', width: '25%', color: '#0D47A1' }}>
                <Link style={{ color: '#0D47A1', textDecoration: "none", fontSize: '2vh' }} to="/"><h1 style={{ color: 'white' }}>tally</h1></Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                <List>
                  <div style={{ width: '75%', color: "#0D47A1" }}>
                    {/* <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                    >
                      <AccountCircle />
                    </IconButton> */}
<Avatar style={{backgroundColor: "white", color: "black", cursor: "pointer"}} onClick={handleMenu}>{props.loggedInUser.firstName[0].toUpperCase()}</Avatar>
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

                    <Link style={{ color: "black", textDecoration: "none" }} to={{ pathname: 'Search', searchMode: false }}>
                      <ListItem button onClick={() => { handleClose(); businessSearch(); }} component={Link}>
                        <ListItemIcon>
                          <LibraryAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add a Business" />
                      </ListItem>
                    </Link>

                    <Link style={{ color: "black", textDecoration: "none" }} to="Search">
                      <ListItem button onClick={() => { handleClose(); competitorSearch(); }} component={Link}>
                        <ListItemIcon>
                          <LibraryAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add a Competitor" />
                      </ListItem>
                    </Link>

                    <Link style={{ color: "black", textDecoration: "none" }} to="Settings">
                      <ListItem button onClick={() => { handleClose(); settings(); }} component={Link}>
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
            </Toolbar>
          </AppBar>
        ) :
          (//not logged in
            isOnDashboard() ? (
            <AppBar style={{ position: "fixed", boxShadow: "none", backgroundColor: "#0F3088", height: "8vh", width: "100%" }} >
              <Toolbar style={{ minHeight: "0", color: 'black' }}>
                {/* <Typography variant="h3" className={classes.title} style={{border: "1px solid black", width: "400px"}}>
            Tally AI
            backgroundColor: "#BBDEFB"
          </Typography> */}
                <div style={{ display: 'flex', width: '25%', color: '#0D47A1' }}>
                  <Link style={{ color: '#0D47A1', textDecoration: "none", fontSize: '2vh' }} to="/"><h1 style={{ color: 'white' }}>tally</h1></Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '6vh', justifyContent: 'flex-end', alignItems: "center" }}>

                  <div style={{ width: '100%' }}>

                    <List>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>

                        {/* <ListItem style={{ width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center' }} button onClick={handleClose} component={Link} to="/">
                            <ListItemText className="homeNavLink"  primary="Home" />
                          </ListItem> */}

                        <ListItem style={{ color: "white", width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center' }} button onClick={handleClose} component={Link} to="/About">
                          <ListItemText className="homeNavLink" primary="About" />
                        </ListItem>

                        <ListItem style={{ color: "white", width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center' }} button onClick={handleClose} component={Link} to="/Login">
                          <ListItemText className="homeNavLink" primary="Sign In" />
                        </ListItem>

                        <ListItem style={{ boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)", color: "black", width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center', backgroundColor: 'white', borderRadius: '40px' }} component={Link} to="/Register">
                          <ListItemText style={{ background: '#67FFD2;' }} primary="Sign Up" />
                        </ListItem>
                      </div>
                    </List>

                  </div>

                </div>
              </Toolbar>
            </AppBar>
            ) : (
              <AppBar style={{ position: "fixed", boxShadow: "none", backgroundColor: "white", height: "8vh", width: "100%" }} >
              <Toolbar style={{ minHeight: "0", color: 'black' }}>
                {/* <Typography variant="h3" className={classes.title} style={{border: "1px solid black", width: "400px"}}>
            Tally AI
            backgroundColor: "#BBDEFB"
          </Typography> */}
                <div style={{ display: 'flex', width: '25%', color: '#0D47A1' }}>
                  <Link style={{ color: '#0D47A1', textDecoration: "none", fontSize: '2vh' }} to="/"><h1 style={{ color: '#0D47A1' }}>tally</h1></Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '6vh', justifyContent: 'flex-end', alignItems: "center" }}>

                  <div style={{ width: '100%' }}>

                    <List>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>

                        {/* <ListItem style={{ width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center' }} button onClick={handleClose} component={Link} to="/">
                            <ListItemText className="homeNavLink"  primary="Home" />
                          </ListItem> */}

                        <ListItem style={{ width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center' }} button onClick={handleClose} component={Link} to="/About">
                          <ListItemText className="homeNavLink" primary="About" />
                        </ListItem>

                        <ListItem style={{ width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center' }} button onClick={handleClose} component={Link} to="/Login">
                          <ListItemText className="homeNavLink" primary="Sign In" />
                        </ListItem>

                        <ListItem style={{ boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)", color: "white", width: '15%', minWidth: "100px", fontSize: '1rem', textAlign: 'center', backgroundColor: '#1E4DC7', borderRadius: '40px' }} component={Link} to="/Register">
                          <ListItemText style={{ background: '#67FFD2;' }} primary="Sign Up" />
                        </ListItem>
                      </div>
                    </List>

                  </div>

                </div>
              </Toolbar>
            </AppBar>
            )
          )
      }
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