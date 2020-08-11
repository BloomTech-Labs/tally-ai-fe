import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {connect } from "react-redux"

//Material ui components 
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


//Icons
import {Home,Settings,LogOut,ShoppingBag} from 'react-feather';





//stylesheet
import './AppMenu.scss';


const AppMenu = (props) => {
  const classes = useStyles()


const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userID")

    window.location.href='/'
}
const refreshBusiness = () => {
window.location.href='/Dashboard'
}

  


  return (
    <List component="nav" className={classes.appMenu} disablePadding>

{ props.userInfo.data.firstName && 
        <ListItem button id='dashboardListItem' className={classes.menuItem}>
          <h3>Hello {props.userInfo.data.firstName}</h3>
         </ListItem>
      }


      <NavLink to='/'>
        <ListItem button id='dashboardListItem' className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>

      { props.userInfo.data.firstName && <NavLink to='/Dashboard'>
        <ListItem button onClick={refreshBusiness} className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="View Bussiness" />
        </ListItem>
      </NavLink>}
      
      

  { props.userInfo.data.firstName && <NavLink to='/Settings'>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </NavLink>}

          {/* <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <Map />
          </ListItemIcon>
          <ListItemText primary="Map" />
      </ListItem> */}


      { props.userInfo.data.firstName && <ListItem button onClick={handleLogout} className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <LogOut />
          </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItem>}
    </List>
  )
}

const drawerWidth = 200

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#ffff',
    },
  }),
)

const mapStateToProps = state => {
  return {
      userInfo: state.settings
  };
};
export default connect(mapStateToProps)(AppMenu)
