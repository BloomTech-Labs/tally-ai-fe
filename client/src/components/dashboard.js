import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import WidgetDisplayList from "../components/WidgetSystem/WidgetDisplayList";
import WidgetAdditionList from "../components/WidgetSystem/WidgetAdditionList";
import Sidebar from "../components/WidgetSystem/Sidebar";

import { fetchWordsOverTime, fetchTopAndBottom, fetchAllData } from "../actions/";

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

  if(!props.businessInfo.reviewCount || !props.businessInfo.averageRating){
    return(<div></div>);
  }

  return (
    <div className="dashboardgrid">
      <div>
        <Sidebar />
      </div>
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
    </div>
  );
  function FormRow() {
    //   return (
    //     <React.Fragment>
    //       <Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
    //         <Paper className={classes.paper}>item</Paper>
    //       </Grid>
    //       <Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
    //         <Paper className={classes.paper}>item</Paper>
    //       </Grid>
    //     </React.Fragment>
    //   );
    // }
    // console.log("props.words in dashboard: ", props.words);
    // if (props.isFetching) {
    //   return <h3>Loading analytics...</h3>;
    // } else {
    //   return (
    //     <div className={classes.root}>
    //       <Grid container spacing={1}>
    //         {props.words.positive.map(word => {
    //           return (
    //             <Grid
    //               item
    //               xs={6}
    //               style={{ display: "flex", flexDirection: "column" }}
    //             >
    //               <Paper className={classes.paper}>{word.term}</Paper>
    //             </Grid>
    //           );
    //         })}
    //         {props.words.negative.map(word => {
    //           return (
    //             <Grid
    //               item
    //               xs={6}
    //               style={{ display: "flex", flexDirection: "column" }}
    //             >
    //               <Paper className={classes.paper}>{word.term}</Paper>
    //             </Grid>
    //           );
    //         })}
    //         {/* <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid>
    //         <Grid container item xs={6} spacing={3}>
    //           <FormRow />
    //         </Grid> */}
    //       </Grid>
    //     </div>
    //   );
  }
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
