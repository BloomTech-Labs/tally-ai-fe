import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

// import Results from "../components/search/results";

import {
    fetchBusinesses,
    addBusiness,
    addCompetitor,
    removeBusiness,
    removeCompetitor,
    selectBusiness
  } from "../../actions/index";

import axios from "axios";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles(theme => ({
    card: {
        display: "flex",
        flexDirection: "column",
        transitionDuration: "0.3s",
        width: "25%",
        height: "40%",
        margin: 20,
        padding: 20,
        borderRadius: 20
      },
      root: {
        flexGrow: 1,
        display: "flex",
        paddingTop: "5%",
        flexDirection: "column"
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
      }
}));


function DashboardPlus(props) {
    const classes = useStyles();

    return (
        <div style={{ border:"1px solid black"}}>
        <div className={"business-results"}
        style={{
            width: "70%",
            height: "40%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "none",
            border: "1px solid grey",
            marginLeft: "25%",
            marginTop: '5%',
            borderRadius: 20,

          }}>
            <div style={{width: "100%", height: "60vh"}}> 
            
            <h2 style={{color: "black", marginLeft: "80px"}}>My Businesses</h2>
            
                <Card className={classes.card} style={{ justifyContent:'center', alignItems:'center', height: "20vh", width: "15vw"}}>
                    <Fab disabled aria-label="add" >
                        <AddIcon />
                    </Fab>
                </Card>
            </div>
        </div>
        <div className="competitors-results"
        style={{
            width: "70%",
            height: "40%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "none",
            border: "1px solid grey",
            marginLeft: "25%",
            marginTop: '3%',
            borderRadius: 20

          }}>
            <div style={{width: "100%", height: "60vh"}}>
            <h2 style={{color: "black", marginLeft: "80px"}}>My Competitors</h2>
            <Card className={classes.card} style={{ justifyContent:'center', alignItems:'center', height: "20vh", width: "15vw"}}>
                <Fab disabled aria-label="add" >
                    <AddIcon />
                </Fab>
            </Card>
            </div>
        </div>
        </div>
    )
}

export default DashboardPlus;
