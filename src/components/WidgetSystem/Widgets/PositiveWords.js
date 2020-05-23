import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    paddingTop: "5%",
    flexDirection: "column",
    alignItems: "center"
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

  let colors = ["#002487", "#002FA0", "#003CB8", "#004ACC", "#0074DF", "#068DEE", "#15AEF0", "#18C1F7", "#21D7FF", "#29E9FF"];

  if(props.error){
    console.log("Error with props:", props);
    return <p>Error!</p>
  }
  if (props.isFetching || !props.words) {
    return <h3><CircularProgress>Loading analytics...</CircularProgress></h3>;
  } else {
    return (
      <div className="widget">
        <h3 className="widgetTitle">Your customers are loving...</h3>
        <p className="widgetSubtitle">These are the words associated with the reviews with high ratings</p>
        <div style={{ height: "100%", minHeight: "300px", width:"90%", borderRadius: "15px", margin: "5%" }} className={classes.root}>
            {props.words.positive.map((word, index) => {
              let borderRadius = {borderTopLeftRadius: index === 0 ? "15px" : "0px", borderTopRightRadius:  index === 0 ? "15px" : "0px", borderBottomLeftRadius: index === props.words.positive.length - 1 ? "15px" : "0px", borderBottomRightRadius: index === props.words.positive.length - 1 ? "15px" : "0px"};//apply appropriate border radiuses (<--for smart future students who know the plural of radius, please fix lol) depending on whether this item is first or last
              return (
                <div className="wordListItem" style={{...borderRadius, display: "flex", alignItems: "center", justifyContent: "center", height: (300/props.words.positive.length) + "px", backgroundColor: index < colors.length ? colors[index] : colors[colors.length - 1]}}><p>{word.term}</p></div>
              );
            })}
        </div>
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
