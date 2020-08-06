import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useStyles } from "../WidgetRegistry";

import { Paper, Grid, Typography,  } from "@material-ui/core";

import CircularProgress from '@material-ui/core/CircularProgress';



const TopBottomWords = props => {
  const classes = useStyles();
  if(props.error){
    console.log("Error with props:", props);
    return <p>Error!</p>
  }
  if (props.isFetching || !props.words) {
    return <h3><CircularProgress>Loading analytics...</CircularProgress></h3>;
  } else {
    return (
      <>
        <Typography variant="h5" className={classes.title}>Your customers are loving...</Typography>
        <Paper elevation={3} className={classes.paper}>
        <Typography variant="subtitle1" className={classes.subTitle} gutterBottom>These are the words associated with the reviews with high ratings</Typography>
            <Grid container className={classes.container}>
              {props.words.positive.map((word, index) => {
                return (
                  <Grid item xs={6} className={classes.item}><span>{word.term}</span></Grid>
                );
              })}
            </Grid>
        </Paper>
      </>
    );
  }
};

const mapStateToProps = state => ({
  words: state.widgets.widgetData.keyWords.data,
  isFetching: state.widgets.widgetData.keyWords.isFetching,
  error: state.widgets.widgetData.keyWords.error
});

export default connect(mapStateToProps)(TopBottomWords);
