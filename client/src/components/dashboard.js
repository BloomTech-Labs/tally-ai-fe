import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import WidgetDisplayList from "../components/WidgetSystem/WidgetDisplayList";
import WidgetAdditionList from "../components/WidgetSystem/WidgetAdditionList";
import Sidebar from "../components/WidgetSystem/Sidebar";

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
  return (
    <div className="dashboardgrid">
      <div>
        <Sidebar />
      </div> 
      <div>
            <WidgetDisplayList />
            <WidgetAdditionList />
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
  words: state.keyWords.data,
  isFetching: state.keyWords.isFetching
});

export default connect(mapStateToProps)(DashboardGrid);
