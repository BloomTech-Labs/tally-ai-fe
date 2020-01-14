import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

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

const TopBottomWords = props => {

  const classes = useStyles();
  // return (
  //     <React.Fragment>
  //      <Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
  //        <Paper className={classes.paper}>item</Paper>
  //      </Grid>
  //      <Grid item xs={4} style={{ display: "flex", flexDirection: "column" }}>
  //        <Paper className={classes.paper}>item</Paper>
  //      </Grid>
  //    </React.Fragment>
  // );
  console.log("props.words in dashboard: ", props.words);

  if(props.error){
    console.log("Error with props:", props);
    return <p>Error!</p>
  }
  if (props.isFetching || !props.words) {
    return <h3>Loading analytics...</h3>;
  } else {
    return (
      <div style={{ margin: "5%" }} className={classes.root}>
        <h3>Top and Bottom Words</h3>
        <Grid container spacing={1}>
          {props.words.positive.map(word => {
            return (
              <Grid
                item
                xs={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Paper style={{ color: "green" }} className={classes.paper}>
                  {word.term}
                </Paper>
              </Grid>
            );
          })}
          {props.words.negative.map(word => {
            return (
              <Grid
                item
                xs={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Paper style={{ color: "red" }} className={classes.paper}>
                  {word.term}
                </Paper>
              </Grid>
            );
          })}
          {/* <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid>
            <Grid container item xs={6} spacing={3}>
              <FormRow />
            </Grid> */}
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  words: state.widgetData.keyWords.data,
  isFetching: state.widgetData.keyWords.isFetching,
  error: state.widgetData.keyWords.error
});

export default connect(mapStateToProps)(TopBottomWords);
