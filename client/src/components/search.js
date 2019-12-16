import React, { useEffect, useState } from "react";
import { connect } from "react-redux"

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10%'
       
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
   
    button: {
    margin: theme.spacing(1),
    marginTop: '2%',
    marginBottom: '6%',
    width: '15%'
    },
    input: {
    display: 'none',
    },
    
  }));

  const Search = () => {

    const classes = useStyles();

    return (
        
    <div className="business-search" style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alighItems: 'center', backgroundSize: 'cover', backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9)' }}>
        {/* <div class="mdc-text-field mdc-text-field--outlined">
        <input type="text" id="tf-outlined" class="mdc-text-field__input"></input>
        <div class="mdc-notched-outline"></div>
        <div class="mdc-notched-outline__notch">
        <label for="tf-outlined" class="mdc-floating-label">Your Name</label>
        </div>
        <div class="mdc-notched-outline__trailing"></div>
        </div> */}
        {/* <h1>Search for a business to get started</h1> */}
        <form className ={classes.container}>
        <h1>Search for a business to get started</h1>
            <TextField
                label="Business Name"
                variant="outlined"
                margin="normal"
                type="text"
                className={classes.textField}
                placeholder="Business Name"
            />
            <TextField
                label="City or State"
                variant="outlined"
                margin="normal"
                type="text"
                className={classes.textField}
                placeholder="City or State"
            />
            <Button className ={classes.button} variant="outlined" color="blue" type="submit">Submit</Button>
        </form>
    </div>
        
    )
}

export default Search;