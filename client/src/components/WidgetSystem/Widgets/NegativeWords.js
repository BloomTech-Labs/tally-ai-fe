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

  if(props.error){
    console.log("Error with props:", props);
    return <p>Error!</p>
  }
  if (props.isFetching || !props.words) {
    return <CircularProgress><h3>Loading analytics...</h3></CircularProgress>;
  } else {
    return (
      <div style={{height: "100%"}}>
        <h3 className="widgetTitle">You can improve on...</h3>
        <p className="widgetSubtitle">These are the words associated with the reviews with low ratings</p>
        <div style={{ margin: "5%", textAlign:"start" }} className={classes.root}>
  
          <Grid container spacing={1}>
            {props.words.negative.map(word => {
              return (
                <Grid
                  item
                  xs={6}
                  style={{ display: "flex", flexDirection: "column", fontSize:"20px" }}
                >
                  <Paper style={{ color: "black" }} className={classes.paper}>
                    {word.term}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
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