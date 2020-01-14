import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import zIndex from "@material-ui/core/styles/zIndex";

const useStyles = makeStyles({

  root: {
    background: '#2C98F0',
    width: '100%',
    position: 'fixed',
    zIndex: '1',
  },
  NavItems: {
    marginLeft:'auto',
    color: 'black'
  },
  NavButton: {
    color: 'black',
    textDecoration: 'none'
  }
})

const NavBar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <Typography variant= "h4">
            Tally AI
          </Typography>
          <div className ={classes.NavItems}>
          <Link to ="/" style={{ textDecoration: 'none' }} ><Button className = {classes.NavButton} >Home</Button></Link>
          <Link to ="/Register" style={{ textDecoration: 'none' }} ><Button classname = {classes.NavButton} >Register</Button></Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
