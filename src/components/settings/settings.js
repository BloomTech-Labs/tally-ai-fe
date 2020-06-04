import React, { useState, useEffect } from 'react';

import EditAccount from "./editaccount";
import EditPassword from "./EditPassword.js";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {AccountCircle,Lock} from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import { fetchEditAccount, selectBusiness } from "../../actions/index"

import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    root: {

        
        boxSizing: "border-box",
        
        minHeight: "95vh",
        
        marginLeft: "15%", 
        marginRight: "15%", 
        paddingBottom: "4rem",
        borderRadius: "2px",
        paddingTop: "8rem",
    },
    title:{
        textAlign: "left",
        paddingLeft: "2rem",
        paddingTop:" 0",
        backgroundColor: "rgba(223, 223, 223, 0.46)",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    textTitle:{
        margin:"0",
        paddingBottom: ".5rem",
        paddingTop: "1.4rem",
    },
    textTitle2:{
        margin: "0",
        paddingBottom: "1.4rem"
    },
    tabContainer:{
        display: 'flex',
        flexDirection: "row",
        backgroundColor: "rgba(223, 223, 223, 0.46)",
        fontWeight: "bold",
        
    },
    tabs:{
        fontWeight:"bold"
    },
    tab:{
        flexDirection: "row"
    },
    svg:{
        verticalAlign:"middle" 
    }

}));

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

function Settings(props) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.title}>
            <h1 className={classes.textTitle}>Settings</h1>
            <h3 className={classes.textTitle2}>Change basic account settings</h3>
        </div>
        <div className={classes.tabContainer}>
            <Tabs
            orientation="vertical"
            indicatorColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.tabs}
            >
            <Tab className={classes.tab} label={<><AccountCircle className={classes.svg}/> <span>Account</span></>} {...a11yProps(0)} />
            <Tab label={<><Lock/> Password</>} {...a11yProps(1)} />
            <Tab label="Help" {...a11yProps(2)} />


            </Tabs>
            {value === 0 && <EditAccount index={0}/>}
            {value === 1 && <EditPassword index={1}/>}
        </div>
      </div>
    );
  }

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedInUser.userID,
        isFetching: state.loggedInUser.isFetching,
        error: state.loggedInUser.error,
        // loggedUserInfo: state.loggedUserInfo,
        competitors: state.competitors.businesses
    };
};

export default connect(
    mapStateToProps,
    { fetchEditAccount, addBusiness: selectBusiness }
)(Settings)