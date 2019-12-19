import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      paddingTop: '5%',
      flexDirection: 'column'
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
  function DashboardGrid(props) {
    const classes = useStyles();
  
    function FormRow() {
      return (
        <React.Fragment>
          <Grid item xs={4} style={{display:"flex", flexDirection:"column"}}>
            <Paper className={classes.paper}>item</Paper>
          </Grid>
          <Grid item xs={4} style={{display:"flex", flexDirection:"column"}}>
            <Paper className={classes.paper}>item</Paper>
          </Grid>
        </React.Fragment>
      );
    }
  
    return (
      <div className={classes.root} >
        <Grid container spacing={1}>
            {props.words.positive.map(word => {
                return (
                    <Grid item xs={4} style={{display:"flex", flexDirection:"column"}}>
            <Paper className={classes.paper}>{word.term}</Paper>
          </Grid>
                )
            })}
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
          </Grid>
          <Grid container item xs={6} spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </div>
    );
  }

  const mapStateToProps = state => ({
      words: state.keyWords.data
    });

  export default connect(mapStateToProps)(DashboardGrid);
