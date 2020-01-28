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
    props.fetchAllData(props.id);
    // props.fetchTopAndBottom(props.id);
    // props.fetchWordsOverTime(props.id);
  }, [props.id]);

  return (
    <div className="dashboardgrid">
      <div>
        <Sidebar />
      </div>

      <div>
        <Tabs />

        { props.businessInfo ? (
<div>
  
        <div className="businessStats">
          <div className="reviews">
            Total Reviews<br/>
            {props.businessInfo.reviewCount}
          </div>
          <div className="ratings">
            Overall Rating<br/>
            {props.businessInfo.averageRating}
          </div>
          <div className="changeofrating">
            Change in Rating<br/>
            11%
          </div>
        </div>
          <WidgetDisplayList />
</div>
        ) : (

<p>SELECT A BUSINESS!</p>
        )
      }
      </div>
      </div>
  )
}

const mapStateToProps = state => ({
  // words: state.widgetData.keyWords.data,
  // isFetching: state.widgetData.keyWords.isFetching,
  id: state.currentlySelectedBusiness.businessId,
  businessInfo: state.currentlySelectedBusiness
});

export default connect(mapStateToProps, {
  fetchWordsOverTime,
  fetchTopAndBottom,
  fetchAllData
})(DashboardGrid);
