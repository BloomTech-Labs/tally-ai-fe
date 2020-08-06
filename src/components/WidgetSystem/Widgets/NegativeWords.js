import React from "react";
import { connect } from "react-redux";
import { useStyles } from "../WidgetRegistry";
import { Typography, Paper, Grid } from "@material-ui/core";

import CircularProgress from '@material-ui/core/CircularProgress';



const NegativeWords = props => {

  const classes = useStyles();
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
          <Grid container className={classes.container}>
          {props.words.negative.map((word, index) => {
            
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

export default connect(mapStateToProps)(NegativeWords);