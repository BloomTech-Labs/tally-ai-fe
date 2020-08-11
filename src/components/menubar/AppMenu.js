import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import {connect } from "react-redux"

//Material ui components 
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import {selectBusiness} from "../../actions/businessActions.js";


//Icons
import {Home,Settings,LogOut,ShoppingBag,GitHub} from 'react-feather';





//stylesheet
import './AppMenu.scss';



const AppMenu = (props) => {
  let history = useHistory();
  const classes = useStyles()


const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userID")

    history.push("/")
}
const viewAllBusinesses = () => {
// window.location.href='/Dashboard'

  props.userInfo.data.firstName ? history.push("/dashboard") : history.push("/")

  props.selectBusiness({
    business_id: null, 
		businessName: null,
		review_count: 0,
		business_stars: 0,
		changeInRating: '',
		address: '',
		isFetching: false,
    error: null
  })

}

  

  return (
    <List component="nav" className={classes.appMenu} disablePadding>


      { props.userInfo.data.firstName && 
        <ListItem button id='dashboardListItem' className={classes.menuItem}>
          <h3>Hello {props.userInfo.data.firstName}</h3>
         </ListItem>
      }


        <ListItem button id='dashboardListItem' onClick={viewAllBusinesses} classes={{button: classes.button}}>
          <ListItemIcon className={classes.menuItemIcon}>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

      { props.selected.business_id && 
        <ListItem button onClick={viewAllBusinesses} classes={{button: classes.button}}>
          <ListItemIcon className={classes.menuItemIcon}>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText 
          classes={{secondary:classes.listText}}
          primary={`${props.selected.name.slice(0, 14)}...`}
          secondary={`${props.selected.address.slice(0, 16)}...`}
        />
        </ListItem>}

      

    {props.userInfo.data.firstName && 
      <ListItem button classes={{button: classes.button}} onClick={() => history.push("/settings")}>
        <ListItemIcon className={classes.menuItemIcon}>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    }

          {/* <ListItem button className={classes.menuItem}>
          <ListItemIcon className={classes.menuItemIcon}>
            <Map />
          </ListItemIcon>
          <ListItemText primary="Map" />
      </ListItem> */}

      <ListItem button classes={{button: classes.button}} onClick={()=> history.push("/about")}>
        <ListItemIcon className={classes.menuItemIcon}>
          <GitHub />
        </ListItemIcon>
        <ListItemText primary="About Us" />
      </ListItem>

      { props.userInfo.data.firstName && <ListItem button onClick={handleLogout} classes={{button: classes.button}}>
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
    menuItemIcon: {
      color: '#ffff',
    },
    listText: {
      color: '#ffff',
    },
    popper: {
      zIndex:"2000",
    },
    innerList: {
      background: "black",
    },
    button: {
      "&:hover": {
        backgroundColor:" rgb(86 86 86)",
      }

    },
  }),
)

const mapStateToProps = state => {
  return {
      userInfo: state.settings,
      businesses: state.business.businesses,
      selected: state.business.currentlySelectedBusiness,
  };
};
export default connect(mapStateToProps,{selectBusiness})(AppMenu)
