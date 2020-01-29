import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import Tabs from "./Tabs";

import WidgetDisplayList from "../WidgetSystem/WidgetDisplayList";
import WidgetAdditionList from "../WidgetSystem/WidgetAdditionList";
import Sidebar from "./Sidebar";

import { fetchWordsOverTime, fetchTopAndBottom, fetchAllData } from "../../actions/index";
import DashboardPlus from "./dashboardPlus";

const useStyles = makeStyles(theme => ({
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

function DashboardGrid(props) {
  const classes = useStyles();

  // Fetch data for widgets
  useEffect(() => {
    console.log("Fetching all widget data with ID ", props.id);

    if(businessesContains(props.businessInfo.businessId)){
    props.fetchAllData(props.id);
    }
    
    // props.fetchTopAndBottom(props.id);
    // props.fetchWordsOverTime(props.id);
  }, [props.id]);

  return (
    <div className="dashboardgrid">
      <div>
        <Sidebar />
      </div>

      <div>
        {
          localStorage.getItem("token") && localStorage.getItem("userID") ? (
            <div>
              <Tabs />
              {businessesContains(props.businessInfo.businessId) ? (
                <div>

                  <div className="businessStats">
                    <div className="reviews">
                      Total Reviews<br />
                      {props.businessInfo.reviewCount}
                    </div>
                    <div className="ratings">
                      Overall Rating<br />
                      {props.businessInfo.averageRating}
                    </div>
                    <div className="changeofrating">
                      Change in Rating<br />
                      11%
              </div>
                  </div>
                  <WidgetDisplayList />
                </div>
              ) : (

                  <DashboardPlus />

                )
              }
            </div>
          ) : (
              props.businessInfo.businessId ? (//if a business is selected
                <div>

                  <div className="businessStats">
                    <div className="reviews">
                      Total Reviews<br />
                      {props.businessInfo.reviewCount}
                    </div>
                    <div className="ratings">
                      Overall Rating<br />
                      {props.businessInfo.averageRating}
                    </div>
                    <div className="changeofrating">
                      Change in Rating<br />
                      11%
                    </div>
                  </div>
                  <WidgetDisplayList />
                </div>
              ) : (
                  props.history.push("/")//FIXME: while deployed, instead of re-routing to just tally-ai.com/ it goes to tally-ai.com/index.html. This causes errors.
                )
            )
        }
      </div>
    </div>
  )

  //used to check if this is an actual business or just a new tab
  function businessesContains(businessId) {

    if (!businessId) {
      return false;
    }

    let found = false;
    props.businesses.forEach(element => {
      if (element.businessId === businessId) {
        found = true;
      }
    });
    return found;
  }

}

const mapStateToProps = state => ({
  // words: state.widgetData.keyWords.data,
  // isFetching: state.widgetData.keyWords.isFetching,
  id: state.currentlySelectedBusiness.businessId,
  businessInfo: state.currentlySelectedBusiness,
  businesses: state.userBusinesses.businesses.concat(state.competitors.businesses)
});

export default connect(mapStateToProps, {
  fetchWordsOverTime,
  fetchTopAndBottom,
  fetchAllData
})(DashboardGrid);
