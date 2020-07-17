import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import './dashboard.scss'

import {
  fetchBusinesses,
  selectBusiness,
  addBusiness,
  removeBusiness
   
} from "../../actions/businessActions";

import {addCompetitor,  
  removeCompetitor, } from '../../actions/competitorsActions'

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
      props.selectBusiness(props.selectedBusiness, contains);//the user is trying to add a business that they already have a tab open for, just set that tab as selected
    } else {
      props.activeTabs.forEach((tab) => {
        if (tab.businessId === props.selectedBusiness.businessId) {//the currently selected tab is always the currently selected business, so we can find it by seeing which tab = currentlySelectedBusiness
          console.log("Got active tab");
          let tabIndex;
          let newTabsArray = props.activeTabs.filter((item, index) => { console.log("FILTER INDEX", index); if(item.businessId === tab.businessId) { tabIndex = index;} return item.businessId != tab.businessId });//remove the tab we want to modify
          newTabsArray.splice(tabIndex, 0, {...business});//add back the tab but with the new name
          console.log("Adding tab at index", tabIndex);
          props.setActiveTabs(props.activeTabs, newTabsArray, localStorage.getItem("userID"))
        }
      })
    }

  }

  return (
    <div>
      <div className="business-results">
        {/* <div style={{ width: "100%", height: "60vh", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}> */}

        <h2  className="h2dashboard" >My Businesses</h2>
        <Tooltip title="Add a Business" arrow>
          <Card className="card" onClick={() => { props.history.push("/search/business") }}>
            <Fab disabled aria-label="add" >
              <AddIcon />
            </Fab>
          </Card>
        </Tooltip>
        {console.log("Displaying business images of businesses: ", props.businesses)}
        {
          props.businesses.slice(0, 10).map(business => {
            return (
              <Card className="card"onClick={() => { modifyActiveTab(business); props.selectBusiness(props.selectedBusiness, business); }} style={{ justifyContent: 'center', alightItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#D7E2EB" }}>
                <Tooltip title="Delete" arrow>
                <DeleteForeverOutlinedIcon onClick={(event) => event.stopPropagation() & props.removeBusiness(business.id, localStorage.getItem("userID"))} style={{position:"absolute", top:"0", right:"0", left:"auto", margin:"1vh"}} />
                </Tooltip>
                <h3>{business.businessName}</h3>
                <img src={business.businessImg} />
              </Card>
            )
          })
        }
        {/* </div> */}
      </div>
      <div className="competitors-results">

        <h2 className="h2dashboard">My Competitors</h2>


        <Tooltip title="Add a Competitor" arrow>

          <Card className={classes.card} onClick={() => { props.history.push("/search/competitor") }} style={{ justifyContent: 'center', alignItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#D7E2EB" }}>
            <Fab disabled aria-label="add" >
              <AddIcon />
            </Fab>
          </Card>
        </Tooltip>


        {
          props.competitors.slice(0, 10).map(competitor => {
            return (
              <Card className="card" onClick={() => { modifyActiveTab(competitor); props.selectBusiness(props.selectedBusiness, competitor); }} style={{ justifyContent: 'center', alightItems: 'center', height: "20vh", cursor: "pointer", width: "15vw", backgroundColor: "#D7E2EB" }}>
                <Tooltip title="Delete" arrow>
                <DeleteForeverOutlinedIcon onClick={(event) => event.stopPropagation() & props.removeCompetitor(competitor.id, localStorage.getItem("userID"))} style={{position:"absolute", top:"0", right:"0", left:"auto", margin:"1vh"}}>
                </DeleteForeverOutlinedIcon>
                </Tooltip>
                <h3>{competitor.businessName}</h3>
                <img src={competitor.businessImg} />
              </Card>
            )
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  competitors: state.competitor.competitors.businesses,
  businesses: state.business.userBusinesses.businesses,  
  selectedBusiness: state.business.currentlySelectedBusiness
});

export default withRouter(connect(mapStateToProps, {
  fetchBusinesses,
  addBusiness,
  addCompetitor,
  removeBusiness,
  removeCompetitor,  
  selectBusiness
})(DashboardPlus));
