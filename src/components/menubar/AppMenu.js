import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import {connect } from "react-redux"

//Material ui components 
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles, Drawer } from "@material-ui/core";
import clsx from 'clsx';

import {selectBusiness} from "../../actions/businessActions.js";

import {
  shouldUpdateLoggedInUser,
} from "../../actions/settingsActions";

//Icons
import {Home,Settings,LogOut,ShoppingBag,GitHub, ChevronRight, ChevronLeft, LogIn, Edit, HelpCircle, AlertCircle} from 'react-feather';




const AppMenu = (props) => {
  let history = useHistory();
  const classes = useStyles()
  const [open, setOpen] = useState(false);



  const toggleDrawer = (e) => {
    // e.stopPropagation();
    setOpen(!open);
  };

  const hoverEnterDrawer = (e) => {
    e.stopPropagation();
    setOpen(true)
  }
  const hoverExitDrawer = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userID")
      props.shouldUpdateLoggedInUser(true)
      history.push("/")
  }

  const viewAllBusinesses = () => {
  // window.location.href='/Dashboard'

    props.userInfo.data.firstName ? history.push("/dashboard") : history.push("/")

    props.selectBusiness({
      business_id: null, 
      name: null,
      review_count: 0,
      business_stars: 0,
      changeInRating: '',
      address: '',
      isFetching: false,
      error: null
    })

  }

  

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.paperDrawer,{
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onMouseEnter={hoverEnterDrawer}
      onMouseLeave={hoverExitDrawer}
    >
      <List component="nav" className={classes.list}>
          <ListItem button className={classes.drawerLink} aria-label="toggle-drawer" classes={{button: classes.button}}  onClick={toggleDrawer}>
            <ListItemIcon className={classes.menuItemIcon}>
              {open ? <ChevronLeft/> : <ChevronRight/>}
            </ListItemIcon>
            <ListItemText classes={{primary: classes.title}} primary={props.userInfo.data.firstName ? `Hello ${props.userInfo.data.firstName}`: 'TallyAI'}/>
          </ListItem>


          <ListItem button onClick={viewAllBusinesses} classes={{button: classes.button}}>
            <ListItemIcon className={classes.menuItemIcon}>
              <Home />
            </ListItemIcon>
            <ListItemText primary={props.userInfo.data.firstName ? "Home": "Search Business"} />
          </ListItem>

          {props.selected.business_id && 
            <ListItem button classes={{button: classes.button}}>
              <ListItemIcon className={classes.menuItemIcon}>
                <ShoppingBag />
              </ListItemIcon>
              <ListItemText 
              classes={{secondary:classes.listText}}
              primary={props.selected.name}
              secondary={props.selected.address}
            />
            </ListItem>
          }

        

          {props.userInfo.data.firstName ? 
            <ListItem button classes={{button: classes.button}} onClick={() => history.push("/settings")}>
              <ListItemIcon className={classes.menuItemIcon}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            :
            <>
              <ListItem
                button
                classes={{button: classes.button}}
                onClick={()=> history.push("/login")}
              >
                <ListItemIcon className={classes.menuItemIcon}>
                  <LogIn />
                </ListItemIcon>
                <ListItemText  primary="Sign In" />
              </ListItem>

              <ListItem
                button
                classes={{button: classes.button}}
                onClick={()=> history.push("/register")}
              >
                <ListItemIcon className={classes.menuItemIcon}>
                  <Edit />
                </ListItemIcon>
                <ListItemText  primary="Register" />
              </ListItem>
            </>
          }

            {/* <ListItem button className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <Map />
            </ListItemIcon>
            <ListItemText primary="Map" />
        </ListItem> */}


        { props.userInfo.data.firstName && <ListItem button onClick={handleLogout} classes={{button: classes.button}}>
            <ListItemIcon className={classes.menuItemIcon}>
              <LogOut />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>}

        <ListItem button classes={{button: classes.button}} onClick={()=> history.push("/about")}>
          <ListItemIcon className={classes.menuItemIcon}>
            <HelpCircle />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>

        <ListItem button classes={{root: classes.listTOS, button: classes.button}} onClick={()=> history.push("/legal")}>
          <ListItemIcon className={classes.menuItemIcon}>
            <AlertCircle />
          </ListItemIcon>
          <ListItemText primary="Terms & Policy" />
        </ListItem>

        <ListItem component="a" button href="https://github.com/Lambda-School-Labs/tally-ai-fe" classes={{root: classes.cRight, button: classes.button}}>
          <ListItemIcon className={classes.menuItemIcon}>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary="TallyAI © 2020" />
        </ListItem>
      </List>
    </Drawer>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: "##232323",
    color: "#ffff",
  },
  list: {
    height: "100%",
  },
  paperDrawer: {
    background: "#232323",
    color: "#ffff",
  },
  menuItemIcon: {
    color: "#ffff",
  },
  listTOS: {
    position: "absolute",
    bottom: "5rem",
  },
  cRight: {
    position: "absolute",
    bottom: "0"
  },
  title: {
    fontWeight: "800",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  button: {
    marginTop: "2rem",
    marginBottom: "2rem",
    marginLeft: "6px",
    "&:hover": {
      backgroundColor:" rgb(86 86 86)",
    },
    "&:focus": {
      backgroundColor:" rgb(86 86 86)",
    }
  },
  drawerLink: {
    marginBottom: "8rem",
  },
  listText: {
    color: "#ffff",
  }
}))

const mapStateToProps = state => {
  return {
      userInfo: state.settings,
      businesses: state.business.businesses,
      selected: state.business.currentlySelectedBusiness,
  };
};
export default connect(mapStateToProps,{selectBusiness, shouldUpdateLoggedInUser})(AppMenu)
