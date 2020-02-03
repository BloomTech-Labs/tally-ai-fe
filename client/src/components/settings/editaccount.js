import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {connect } from "react-redux"

import { fetchEditAccount } from "../../actions/index";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
       
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '80%'
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


function EditAccount(props){
    /*
        User can enter updates to first name, last name, email, or password.
        If password is updated, they must confirm the password.
    */

    const classes = useStyles();

    const [userCredentials, setCredentials] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    console.log(props);


    // Submit updated account info to back end
    const submitHandler = event => {
        event.preventDefault();
        console.log(userCredentials);
        
        // Check that confirmPassword matches password.
        // This should handle catching changes to password without
        // the confirmation of those changes.
        if(userCredentials.password !== userCredentials.confirmPassword){
            alert("Your confirmed password does not match.");
            return;
        }

        // Package the updated info to send to the back end.
        // Notice we're only sending the data entered by the user - 
        // ie, the data that's been changed from "" to something else
        // - and not including the confirmPassword.
        const updatedCredentials = Object.keys(userCredentials).reduce((acc, key) => 
            userCredentials[key] !== "" && key !== "confirmPassword"
            ? {...acc, [key]: userCredentials[key]}
            : acc
            , {});

        props.fetchEditAccount(localStorage.getItem("userID"), updatedCredentials);
    }

    // Handle keystroke updates to userCredentials
    const changeHandler = event => {
        setCredentials({ ...userCredentials, [event.target.name]: event.target.value })
    }

    return (
        <div >
            <div style={{textAlign:"center", height: "100vh"}}>
            <div style={{paddingTop:"175px", color: "linear-gradient(341.24deg, #E3F2FD 11.16%, #BBDEFB 82.03%)"}}>
            <form className ={classes.container} onSubmit= {submitHandler} style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", width: "50%", marginLeft: "25%", marginRight: "25%", marginBottom: "5%", borderRadius: "5%"}}>
                <div style={{}}>
                    <h1>Account</h1>
                    <h3>Change your basic account settings</h3>
                </div>
            <TextField 
                label ="First Name"
                variant ="outlined"
                margin="normal"
                type="text"
                name="first_name"
                className={classes.textField}
                value={userCredentials.first_name}
                onChange={changeHandler}
                placeholder="First Name"
                />
            <TextField 
                label ="Last Name"
                variant ="outlined"
                margin="normal"
                type="text"
                name="last_name"
                className={classes.textField}
                value={userCredentials.last_name}
                onChange={changeHandler}
                placeholder="Last Name"
                />
            <TextField 
                label ="Email"
                variant ="outlined"
                margin="normal"
                type="email"
                name="email"
                className={classes.textField}
                value={userCredentials.email}
                onChange={changeHandler}
                placeholder="Email"
                />
            <TextField 
                label ="Password"
                variant ="outlined"
                margin="normal"
                type="password"
                name="password"
                 
                className={classes.textField}
                value={userCredentials.password}
                onChange={changeHandler}
                placeholder="Password"
                />
            <TextField 
                label ="Confirm Password"
                variant ="outlined"
                margin="normal"
                type="password"
                name="confirmPassword"
                className={classes.textField}
                value={userCredentials.confirmPassword}
                onChange={changeHandler}
                placeholder="Confirm Password"
                /> 
                <Button className ={classes.button} variant="outlined" color="black" type ="submit">Edit</Button>
                </form>  
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, {fetchEditAccount})(EditAccount)
