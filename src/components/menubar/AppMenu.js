import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

//Material ui items
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'


//Icons
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpIcon from '@material-ui/icons/Help';
import MapIcon from '@material-ui/icons/Map';
import StarIcon from '@material-ui/icons/Star';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const AppMenu: React.FC = () => {
  const classes = useStyles()




  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
<br/><br/><br/><br/>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="Help" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuItemIcon}>
          <MapIcon />
        </ListItemIcon>
        <ListItemText primary="Map" />
      </ListItem>


      <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Ratings" />
      </ListItem>

      <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
      </ListItem>
    </List>
  )
}

const drawerWidth = 240

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
