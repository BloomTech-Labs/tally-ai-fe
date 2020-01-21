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
import { widgets } from "./WidgetRegistry";
import WidgetThumbnail from "./WidgetThumbnail";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
    width: drawerWidth,
    flexShrink: 0,
    zIndex: '-1',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '70px',
    marginBottom: '80px'
  },
  content: {
    flexGrow: 0,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer() {
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
        {/* <div className={classes.toolbar} /> */}
        <Divider />
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia className={classes.media}
            // Insert image here
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
          style={{marginTop: "4%" }}
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
