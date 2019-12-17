import React, { useEffect, useState } from "react";
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
  
  function DashboardGrid() {
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
// const useStyles = makeStyles(theme => ({
    
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       width: "300%",
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//       marginTop: "30%"
//     },
//   }));



// const DashboardGrid = () => {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//       <Grid container spacing={2} direction="column" justify="center" alignItems="center" >
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//         <Grid item xs>
//           <Paper className={classes.paper}></Paper>
//         </Grid>
//       </Grid>
//     </div>
    
//   );
// }

export default DashboardGrid;