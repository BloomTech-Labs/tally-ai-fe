import React from 'react';
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

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  InputFields: {
    display: 'flex',
    flexDirection: "column",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: '-1', 
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 0,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer() {
  const classes = useStyles();

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
        <div className={classes.toolbar} />
      <Divider /> 
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media}
            // Insert image here
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {/* Insert Title, need2do */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Date Range
        </Button>
        </div>
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
            <TextField id="standard-basic" label="Filter by Word" />
            <input />
          </form>
          
        </div> 
        </CardActions>
      </Card>       
      </Drawer>
    </div>
  );
}
