import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'

//Material ui components 
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


//Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MapIcon from '@material-ui/icons/Map';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import './AppMenu.scss';


const AppMenu: React.FC = (props) => {
  const classes = useStyles()


const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userID")

    window.location.href='/'
}

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      <NavLink to='/Dashboard'>
        <ListItem button id='dashboardListItem' className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>

      <NavLink to='/Settings'>
        <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </NavLink>

          <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Ratings" />
      </ListItem>


      <ListItem button onClick={handleLogout} className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItem>
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

export default AppMenu