import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

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
  selectBusiness,
  setActiveTabs
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
    position: "relative"

  },
  // root: {
  //   flexGrow: 1,
  //   display: "flex",
  //   paddingTop: "5%",
  //   flexDirection: "column"
  // },
  // paper: {
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary
  // }
}));

function DashboardPlus(props) {
  const classes = useStyles();

  //get the currently selected tab, and set it to the newly selected business
  function modifyActiveTab(business) {

    let contains = null;
    props.activeTabs.forEach((tab) => {
      if (tab.businessId === business.businessId) {
        contains = tab;
      }
    })
    if (contains) {
      props.selectBusiness(contains);//the user is trying to add a business that they already have a tab open for, just set that tab as selected
    } else {
      props.activeTabs.forEach((tab) => {
        if (tab.businessId === props.selectedBusiness.businessId) {//the currently selected tab is always the currently selected business, so we can find it by seeing which tab = currentlySelectedBusiness
          console.log("Got active tab");
          tab.businessId = business.businessId;
        }
      })
    }

  }

  return (
    <div style={{ border: "1px solid black" }}>
      <div className="business-results"
        style={{
          width: "90%",
          height: "40%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "none",
          marginLeft: "5%",
          marginTop: '5%',
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          marginBottom: '5%',

        }}>
        {/* <div style={{ width: "100%", height: "60vh", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}> */}

        <h2 style={{ color: "black", marginLeft: "3vh" }}>My Businesses</h2>
        <Tooltip title="Add a Business" arrow>
          <Card className={classes.card} onClick={() => { props.history.push("/search/business") }} style={{ justifyContent: 'center', alignItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#EBF5FE" }}>
            <Fab disabled aria-label="add" >
              <AddIcon />
            </Fab>
          </Card>
        </Tooltip>
        {console.log("Displaying business images of businesses: ", props.businesses)}
        {
          props.businesses.slice(0, 10).map(business => {
            return (
              <Card className={classes.card} onClick={() => { modifyActiveTab(business); props.selectBusiness(business); }} style={{ justifyContent: 'center', alightItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#EBF5FE" }}>
                <Tooltip title="Delete" arrow>
                <DeleteForeverOutlinedIcon onClick={(event) => event.stopPropagation() & props.removeBusiness(business.id, localStorage.getItem("userID"))} style={{position:"absolute", top:"0", right:"0", left:"auto", margin:"2vh"}} />
                </Tooltip>
                <h3>{business.businessName}</h3>
                <img style={{ objectFit: "cover", width: "100%", height: "80%", borderRadius: "10%" }}
                  src={business.businessImg} />
              </Card>
            )
          })
        }
        {/* </div> */}
      </div>
      <div className="competitors-results"
        style={{
          width: "90%",
          height: "40%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "none",
          marginLeft: "5%",
          marginTop: '5%',
          borderRadius: 20,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          marginBottom: '5%',

        }}>

        <h2 style={{ color: "black", marginLeft: "3vh" }}>My Competitors</h2>


        <Tooltip title="Add a Competitor" arrow>

          <Card className={classes.card} onClick={() => { props.history.push("/search/competitor") }} style={{ justifyContent: 'center', alignItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#F5E6BE" }}>
            <Fab disabled aria-label="add" >
              <AddIcon />
            </Fab>
          </Card>
        </Tooltip>


        {
          props.competitors.slice(0, 10).map(competitor => {
            return (
              <Card className={classes.card} onClick={() => { modifyActiveTab(competitor); props.selectBusiness(competitor); }} style={{ justifyContent: 'center', alightItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#F5E6BE" }}>
                <Tooltip title="Delete" arrow>
                <DeleteForeverOutlinedIcon onClick={(event) => event.stopPropagation() & props.removeCompetitor(competitor.id, localStorage.getItem("userID"))} style={{position:"absolute", top:"0", right:"0", left:"auto", margin:"2vh"}}>
                </DeleteForeverOutlinedIcon>
                </Tooltip>
                <h3>{competitor.businessName}</h3>
                <img style={{ objectFit: "cover", width: "100%", height: "80%", borderRadius: "10%" }}
                  src={competitor.businessImg} />
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  competitors: state.competitors.businesses,
  businesses: state.userBusinesses.businesses,
  activeTabs: state.tabs.activeTabs,
  selectedBusiness: state.currentlySelectedBusiness
});

export default withRouter(connect(mapStateToProps, {
  fetchBusinesses,
  addBusiness,
  addCompetitor,
  removeBusiness,
  removeCompetitor,
  setActiveTabs,
  selectBusiness
})(DashboardPlus));
