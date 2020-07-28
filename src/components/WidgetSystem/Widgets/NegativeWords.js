import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useStyles } from "../WidgetRegistry";
import { Typography, Paper } from "@material-ui/core";

import CircularProgress from '@material-ui/core/CircularProgress';



const NegativeWords = props => {

  const classes = useStyles();
  console.log("props.words in dashboard: ", props.words);

  let colors = ["#960A00", "#AC0B00", "#C10C00", "#D31307", "#E5150B", "#F42823", "#FF4340", "#FF5C5C", "#FF6F6D", "#FF8686"];

  if(props.error){
    console.log("Error with props:", props);
    return <p>Error!</p>
  }
  if (props.isFetching || !props.words) {
    return <CircularProgress><h3>Loading analytics...</h3></CircularProgress>;
  } else {
    return (
      <>
      <Typography variant="h5" className={classes.title}>You can improve on...</Typography>
      <Paper className={classes.paper}>
      <Typography variant="subtitle1" gutterBottom className={classes.subTitle}>These are the words associated with the reviews with low ratings</Typography>
          {props.words.negative.map((word, index) => {
            
            return (
              <div className="wordListItem" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: (300/props.words.negative.length) + "px", backgroundColor: index < colors.length ? colors[index] : colors[colors.length - 1]}}><p>{word.term}</p></div>
            );
          })}
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

export default connect(mapStateToProps)(NegativeWords);