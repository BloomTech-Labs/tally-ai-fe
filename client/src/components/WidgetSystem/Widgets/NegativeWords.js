import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';

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
      <div className="widget">
      <h3 className="widgetTitle">You can improve on...</h3>
      <p className="widgetSubtitle">These are the words associated with the reviews with low ratings</p>
      <div style={{ height: "100%", minHeight: "300px", width:"90%", borderRadius: "15px", margin: "5%" }} className={classes.root}>
          {props.words.negative.map((word, index) => {
            let borderRadius = {borderTopLeftRadius: index === 0 ? "15px" : "0px", borderTopRightRadius:  index === 0 ? "15px" : "0px", borderBottomLeftRadius: index === props.words.negative.length - 1 ? "15px" : "0px", borderBottomRightRadius: index === props.words.negative.length - 1 ? "15px" : "0px"};//apply appropriate border radiuses (<--for smarter future students who know the plural of radius, please fix lol) depending on whether this item is first or last
            return (
              <div className="wordListItem" style={{...borderRadius, display: "flex", alignItems: "center", justifyContent: "center", height: (300/props.words.negative.length) + "px", backgroundColor: index < colors.length ? colors[index] : colors[colors.length - 1]}}><p>{word.term}</p></div>
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

export default connect(mapStateToProps)(NegativeWords);