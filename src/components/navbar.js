import React from 'react';
import { shouldUpdateLoggedInUser, fetchEditAccount } from '../actions/settingsActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


import "./navbar.scss";
import MenuBar from './menubar/Menubar';

function NavBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function isLoggedIn() {
    return (
      // props.loggedInUser.firstName &&
      // props.loggedInUser.lastName &&
      localStorage.getItem("token") && localStorage.getItem("userID")
    );
  }

  function businessSearch() {
    props.history.push("/search/business");
    console.log("businessSearch");
  }

  function settings() {
    props.history.push("/settings");
  }

  function competitorSearch() {
    props.history.push("/search/competitor");
    console.log("compSearch");
  }

  const handleClick = (event) => {
    //event.preventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    props.shouldUpdateLoggedInUser(true);
  };

  function isOnHomePage() {
    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split("/")[1];

    return firstParam === "";
  }

  function isOnDashboard() {
    //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")

    var url = window.location;
    var firstParam = url.pathname.split("/")[1];

    return firstParam.toUpperCase() === "Dashboard".toUpperCase();
  }

  return (
    <div className="navbar-container">
      {isOnHomePage() ? (
        <div className="landing-top-section">
          <Link className="homeNavLink" to="/About">
            About
          </Link>
          <Link className="homeNavLink" to="/Login">
            Sign In
          </Link>
          <Link to="/register">
            <button className="Signup">Sign Up</button>
          </Link>
        </div>
      ) : isLoggedIn() ? (
        <MenuBar />
        // <AppBar className="app-bar" position="fixed">
        //   <Toolbar classname="toolbar">
        //     <div className="toolbar-div1">
        //       <Link className="toolbar-link" to="/">
        //         <h1>tally</h1>
        //       </Link>
        //     </div>
        //     <div className="toolbar-div2">
        //       <List className="toolbar-list">
        //         <div className="list-div">
        //           <Avatar
        //             data-testid="settings"
        //             className="avatars"
        //             onClick={handleMenu}
        //           ></Avatar>
        //         </div>
        //         <Menu
        //           id="menu-appbar"
        //           anchorEl={anchorEl}
        //           anchorOrigin={{
        //             vertical: "top",
        //             horizontal: "right",
        //           }}
        //           keepMounted
        //           transformOrigin={{
        //             vertical: "top",
        //             horizontal: "right",
        //           }}
        //           open={open}
        //           onClose={handleClose}
        //         >
        //           <ListItem
        //             button
        //             onClick={handleClose}
        //             component={Link}
        //             to="/Dashboard"
        //           >
        //             <ListItemIcon>
        //               <DashboardIcon />
        //             </ListItemIcon>
        //             <ListItemText primary="Dashboard" />
        //           </ListItem>
        //           <Link
        //             className="menu-link"
        //             to={{ pathname: "Search", searchMode: false }}
        //           >
        //             <ListItem
        //               button
        //               onClick={() => {
        //                 handleClose();
        //                 businessSearch();
        //               }}
        //               component={Link}
        //             >
        //               <ListItemIcon>
        //                 <LibraryAddIcon />
        //               </ListItemIcon>
        //               <ListItemText primary="Add a Business" />
        //             </ListItem>
        //           </Link>

        //           <Link className="menu-link" to="Search">
        //             <ListItem
        //               button
        //               onClick={() => {
        //                 handleClose();
        //                 competitorSearch();
        //               }}
        //               component={Link}
        //             >
        //               <ListItemIcon>
        //                 <LibraryAddIcon />
        //               </ListItemIcon>
        //               <ListItemText primary="Add a Competitor" />
        //             </ListItem>
        //           </Link>

        //           <Link className="menu-link" to="Settings">
        //             <ListItem
        //               button
        //               onClick={() => {
        //                 handleClose();
        //                 settings();
        //               }}
        //               component={Link}
        //             >
        //               <ListItemIcon>
        //                 <SettingsIcon />
        //               </ListItemIcon>
        //               <ListItemText primary=" Account Settings" />
        //             </ListItem>
        //           </Link>
        //           <Divider />

        //           <ListItem
        //             button
        //             onClick={handleClick}
        //             component={Link}
        //             to="/"
        //           >
        //             <ListItemIcon>
        //               <ExitToAppIcon />
        //             </ListItemIcon>
        //             <ListItemText primary="Log Out" />
        //           </ListItem>
        //         </Menu>
        //       </List>
        //     </div>
        //   </Toolbar>
        // </AppBar>
      ) : //not logged in
      isOnDashboard() ? (
        <MenuBar />
      //   // <AppBar className="dashboard-bar">
      //   //   <Toolbar className="dash-toolbar">
      //   //     <div className="toolbar-div1">
      //   //       <Link className="dash-link" to="/">
      //   //         <h1>tally</h1>
      //   //       </Link>
      //   //     </div>
      //   //     <div className="dash-div">
      //   //       <div className="list-container">
      //   //         <List>
      //   //           <div className="list-div2">
      //   //             <ListItem
      //   //               className="list-item"
      //   //               button
      //   //               onClick={handleClose}
      //   //               component={Link}
      //   //               to="/About"
      //   //             >
      //   //               <ListItemText className="homeNavLink" primary="About" />
      //   //             </ListItem>

      //   //             <ListItem
      //   //               className="list-item"
      //   //               button
      //   //               onClick={handleClose}
      //   //               component={Link}
      //   //               to="/Login"
      //   //             >
      //   //               <ListItemText className="homeNavLink" primary="Sign In" />
      //   //             </ListItem>

      //   //             <ListItem
      //   //               className="list-item2"
      //   //               component={Link}
      //   //               to="/Register"
      //   //             >
      //   //               <ListItemText
      //   //                 style={{ background: "#67FFD2;" }}
      //   //                 primary="Sign Up"
      //   //               />
      //   //             </ListItem>
      //   //           </div>
      //   //         </List>
      //   //       </div>
      //   //     </div>
      //   //   </Toolbar>
      //   // </AppBar>
          ) 
        : (
        <AppBar className="last-bar">
          <Toolbar className="last-toolbar">
            <div classname="toolbar-div1">
              <Link className="dash-link" to="/">
                <h1>tally</h1>
              </Link>
            </div>
            <div className="last-div">
              <div className="last-listDiv">
                <List>
                  <div className="last-listItem">
                    <ListItem
                      className="listItem-container3"
                      component={Link}
                      to="/About"
                    >
                      <ListItemText  primary="About" />
                    </ListItem>

                    <ListItem
                      className="listItem-container3"
                      component={Link}
                      to="/Login"
                    >
                      <ListItemText  primary="Sign In" />
                    </ListItem>

                    <ListItem
                      className="listItem-container3"
                      component={Link}
                      to="/Register"
                    >
                      <ListItemText primary="Sign Up" />
                    </ListItem>
                  </div>
                </List>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.settings.loggedInUser.userID,
    loggedInUser: state.settings.loggedInUser.data,
    isFetching: state.settings.loggedInUser.isFetching,
    error: state.settings.loggedInUser.error,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchEditAccount, shouldUpdateLoggedInUser })(
    NavBar
  )
);
