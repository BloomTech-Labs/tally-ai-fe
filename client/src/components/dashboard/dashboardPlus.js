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
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import SearchPage from "../../components/SearchPage"

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
    borderRadius: 20,
    
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
    <div style={{ border: "1px solid black" }}>
      <div className={"business-results"}
        style={{
          width: "90%",
          height: "40%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "none",
          marginLeft: "5%",
          marginTop: '5%',
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',

        }}>
        <div style={{ width: "100%", height: "60vh", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>

          <h2 style={{ color: "black", marginLeft: "80px" }}>My Businesses</h2>
          <Tooltip title="Add a Business" arrow>
            <Card className={classes.card} onClick={() => { props.history.push("/search/business") }} style={{ justifyContent: 'center', alignItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor:"#EBF5FE" }}>
              <Fab disabled aria-label="add" >
                <AddIcon />
              </Fab>
            </Card>
          </Tooltip>

          {
          props.businesses.map(business => {
            return (
              <Card className={classes.card}>
              <Link
              onClick={() => { props.selectBusiness(business) }} to="/dashboard">
              </Link>
                <img style={{ objectFit: "cover" }} 
                src={business.bussinessImg} />
                <h3>{business.businessName}</h3>
              </Card>
            )
          })
          }

        </div>
      </div>
      <div className="competitors-results"
        style={{
          width: "90%",
          height: "40%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "none",
          marginLeft: "5%",
          marginTop: '3%',
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          marginBottom: '5%',

        }}>
        <div style={{ width: "100%", height: "60vh" }}>
          <h2 style={{ color: "black", marginLeft: "80px" }}>My Competitors</h2>
          <Tooltip title="Add a Competitor" arrow>
          
            <Card className={classes.card} onClick={() => { props.history.push("/search/competitor") }} style={{ justifyContent: 'center', alignItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor:"#F5E6BE" }}>
              <Fab disabled aria-label="add" >
                <AddIcon />
              </Fab>
            </Card>
          </Tooltip>

          {
            props.competitors.map(competitor => {
              return (
                <Card className={classes.card}>
              <Link
              onClick={() => { props.selectBusiness(competitor) }} to="/dashboard">
              </Link>
                <img style={{ objectFit: "cover" }} 
                src={competitor.bussinessImg} />
                <h3>{competitor.businessName}</h3>
              </Card>
                
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  competitors: state.competitors.businesses,
  businesses: state.userBusinesses.businesses
});

export default connect(mapStateToProps, {
  fetchBusinesses,
  addBusiness,
  addCompetitor,
  removeBusiness,
  removeCompetitor,
  selectBusiness
})(DashboardPlus);
