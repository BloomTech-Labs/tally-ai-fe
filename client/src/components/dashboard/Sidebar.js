import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { widgets } from "../WidgetSystem/WidgetRegistry";
import WidgetThumbnail from "../WidgetSystem/WidgetThumbnail";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import burger from "../images/burger.jpg";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchBusinesses, selectBusiness } from "../../actions/index.js";

const drawerWidth = 375;

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
  },
  InputFields: {
    display: 'flex',
    flexDirection: "column",
  },
  drawer: {
    // marginLeft: '100px',
    width: drawerWidth,
    flexShrink: 0,
    zIndex: '-1',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '80px',
    marginBottom: '80px'
  },
  content: {
    flexGrow: 0,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function ClippedDrawer(props) {
  const classes = useStyles();

  let widgetList = [];
  widgets.forEach(widget => {
    if (widget.name !== "projection") widgetList.push(widget.name);
  });

  const [availableWidgets, setAvailableWidgets] = useState(widgetList);


  const [anchorEl, setAnchorEl] = React.useState(null); // 

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        
          <div style={{ fontSize: "12px", marginBottom: "50px", marginTop: "20px"}}>
          <img src={props.selectedBusiness.businessImg} style={{ height: "20vh", width: "12vw", borderRadius: "100%"}}/> 
          <h1>{props.selectedBusiness.businessName}</h1> {/* pass in business title prop here */} 
          
        </div>
        
        
        
      
        <Divider />
        <div style={{ fontSize: "15px"}}>
          <h1>Add to dashboard</h1>
        </div>

        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media}
            
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Customize Widgets
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div>
              <Button style={{ border: '1px solid gray' }} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Date Range
                <ArrowDropDownIcon />
        </Button>
            </div>
            <hr />
            <div className="InputFields">
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>1 week</MenuItem>
                <MenuItem onClick={handleClose}>1 month</MenuItem>
                <MenuItem onClick={handleClose}>1 year</MenuItem>
              </Menu>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Filter by Word" variant="outlined" />
                {/* <input /> */}
              </form>

            </div>
          </CardActions>
        </Card>
        <div
          className="widgetSelector"
          style={{marginTop: "4%", borderRadius: "10px" }}
        >
          {/* Render Available Widgets */}
          {availableWidgets.map(widgetName => {
            return (
              <WidgetThumbnail widgetName={widgetName} /> //WidgetContainer will render the correct widget based on widgetName
            );
          })}
        </div>
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => ({
  businesses: state.userBusinesses.businesses,
  selectedBusiness: state.currentlySelectedBusiness
});

export default withRouter(connect(mapStateToProps, {
  fetchBusinesses,
  selectBusiness
})(ClippedDrawer));
