// import React, { useEffect, useState } from "react";
// import { shouldUpdateLoggedInUser, fetchEditAccount } from '../actions/index';
// import { Register } from './registration';
// import EditAccount from "./settings/editaccount"

// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { withRouter } from 'react-router-dom'

// import clsx from 'clsx';

// // Material Ui Core
// import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import { deepOrange } from '@material-ui/core/colors';
// import MenuItem from '@material-ui/core/MenuItem';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';

// //Material Ui Icons
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import HomeIcon from '@material-ui/icons/Home';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
// import ContactMailIcon from '@material-ui/icons/ContactMail';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import CreateIcon from '@material-ui/icons/Create';
// import SettingsIcon from '@material-ui/icons/Settings';
// import InfoIcon from '@material-ui/icons/Info';
// import CompareIcon from '@material-ui/icons/Compare';
// import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';

// const drawerWidth = 240;

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
//   orange: {
//     color: theme.palette.getContrastText(deepOrange[500]),
//     backgroundColor: deepOrange[500],
//   }
// }));

// function NavBar(props) {
//   const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

  // function isLoggedIn() {
  //   return props.loggedInUser.firstName && props.loggedInUser.lastName && localStorage.getItem("token") && localStorage.getItem("userID");
  // }

  // function businessSearch () {
  //   props.history.push("/search/business");
  //   console.log("businessSearch");
  // }

  // function competitorSearch () {
  //   props.history.push("/search/competitor");
  //   console.log("compSearch");
  // }

  // const handleClick = event => {
  //   //event.preventDefault()
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userID");
  //   props.shouldUpdateLoggedInUser(true);
  // }

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className={clsx(classes.appBar, {
//           [classes.appBarShift]: open,
//         })}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             className={clsx(classes.menuButton, open && classes.hide)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h4" noWrap>
//             Tally AI
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         className={classes.drawer}
//         anchor="left"
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </div>
//         <Divider />
        // {
        //   isLoggedIn() ? (
        //     <List> 
              
        //       <ListItem button onClick={handleDrawerClose} component={Link} to="/Dashboard">
        //        <ListItemIcon>
        //       <DashboardIcon />
        //       </ListItemIcon>
        //         <ListItemText primary="Dashboard" />
        //       </ListItem>

        //       <Link style={{ color: "black", textDecoration: "none"}} to={{ pathname: 'Search', searchMode: false }}>
        //         <ListItem button onClick={() => { handleDrawerClose(); businessSearch(); } } component={Link}>
        //           <ListItemIcon>
        //             <LibraryAddIcon />
        //           </ListItemIcon>
        //           <ListItemText primary="Add a Business" />
        //         </ListItem>
        //       </Link>

        //       <Link style={{ color: "black", textDecoration: "none" }} to="Search">
        //         <ListItem button onClick={() => { handleDrawerClose(); competitorSearch(); } } component={Link}>
        //           <ListItemIcon>
        //             <LibraryAddIcon />
        //           </ListItemIcon>
        //           <ListItemText primary="Add a Competitor" />
        //         </ListItem>
        //       </Link>

        //       <ListItem onClick={handleDrawerClose} component={Link} to="/Settings">
        //         <ListItemIcon >
        //           <SettingsIcon />
        //         </ListItemIcon>
        //         <ListItemText primary=" Account Settings" />
        //       </ListItem>
        //       <Divider />

        //       <ListItem button onClick={handleClick} component={Link} to="/">
        //         <ListItemIcon>
        //           <ExitToAppIcon />
        //         </ListItemIcon>
        //         <ListItemText primary="Log Out" />
        //       </ListItem>

        //     </List>
        //   )
        //     :
        //     (//not logged in
        //       <List>

        //         <ListItem button onClick={handleDrawerClose} component={Link} to="/">
        //           <ListItemIcon>
        //             <HomeIcon />
        //           </ListItemIcon>
        //           <ListItemText primary="Home" />
        //         </ListItem>

        //         <ListItem button onClick={handleDrawerClose} component={Link} to="/Login">
        //           <ListItemIcon>
        //             <LockOpenIcon />
        //           </ListItemIcon>
        //           <ListItemText primary="Log In" />
        //         </ListItem>

        //         <ListItem button onClick={handleDrawerClose} component={Link} to="/Register">
        //           <ListItemIcon>
        //             <CreateIcon />
        //           </ListItemIcon>
        //           <ListItemText primary="Register" />
        //         </ListItem>

        //         <Divider />

        //         <ListItem button onClick={handleDrawerClose} component={Link} to="/AboutUs">
        //           <ListItemIcon>
        //             <InfoIcon />
        //           </ListItemIcon>
        //           <ListItemText primary="About Us" />
        //         </ListItem>

        //       </List>
        //     )
        // }
//       </Drawer>
//     </div>
//   )
// }

// const mapStateToProps = state => {
//   return {
//     loggedUser: state.loggedInUser.userID,
//     loggedInUser: state.loggedInUser.data,
//     isFetching: state.loggedInUser.isFetching,
//     error: state.loggedInUser.error
//   };
// };

// export default withRouter(connect(
//   mapStateToProps,
//   { fetchEditAccount, shouldUpdateLoggedInUser }
// )(NavBar))

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
    backgroundColor: '#BBDEFB',
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
        <Toolbar style={{height: "8vh", backgroundColor: "#BBDEFB", color: 'black', boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)"}}>
          {/* <Typography variant="h3" className={classes.title} style={{border: "1px solid black", width: "400px"}}>
            Tally AI
          </Typography> */}
          <div style={{display: 'flex', width: '25%', color: '#0D47A1'}}>
                <Link style={{color: '#0D47A1', textDecoration: "none", fontSize:'1.4rem'}} to="/dashboard"><h1>tally</h1></Link>
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