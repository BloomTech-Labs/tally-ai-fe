import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { shouldUpdateLoggedInUser } from "../actions/index";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from "axios"

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '40%'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        marginTop: '2%',
        marginBottom: '9%',
        width: '15%'
    },
    input: {
        display: 'none',
    },
}));

function Registration(props) {
    const classes = useStyles();
    const [userCredentials, setCredentials] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    // useEffect(() => {
    //     if (props.loggedInUser) {//we're logged in, lets redirect to /home
    //         props.history.push('/')
    //     }
    // }, [props.loggedInUser]);

    const submitHandler = event => {
        console.log("onSubmit working", props.isFetching);
        event.preventDefault();
        if (!props.isFetching) {//don't let them submit again if the backend is already processing their registration request
            console.log(userCredentials);

            axios
                .post(`https://tally-ai.herokuapp.com/api/auth/register`, userCredentials)
                .then(
                    res => {
                        console.log("Registered successfully", res);
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("userID", res.data.userN.id);
                        props.shouldUpdateLoggedInUser(true);
                        props.history.push('/search/business');
                    }
                )
                .catch(err => {
                    console.log("Error registering", err);
                }
                );
        }
    }

    const changeHandler = event => {
        setCredentials({ ...userCredentials, [event.target.name]: event.target.value })
    }

    return (
        <div style={{marginTop: "64px", background: "linear-gradient(341.24deg, #E3F2FD 11.16%, #BBDEFB 82.03%)" }}>
            <form className={classes.container} onSubmit={(e) => submitHandler(e)}>
                <div style={{ width: "80%", marginLeft: "10%", marginRight: "10%", borderRadius: "47px", marginTop: "50px", marginBottom: "50px", height: "70vh", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", background: "white" }}>
                <div style={{width: "91%", marginLeft: "9%", textAlign: "left", fontSize: "24px", paddingTop: "25px"}}> 
                    <h1>Sign up for an account!</h1>
                </div>
                <div style={{width: "100%"}}>
                    <TextField
                        label="First Name"
                        type="text"
                        name="first_name"
                        className={classes.textField}
                        value={userCredentials.first_name}
                        onChange={changeHandler}
                        placeholder="First Name"
                        required
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        type="text"
                        name="last_name"
                        className={classes.textField}
                        value={userCredentials.last_name}
                        onChange={changeHandler}
                        placeholder="Last Name"
                        required
                        variant="outlined"
                        margin="normal"
                    />
                </div>
                <div style={{width: "100%", paddingTop: "25px", paddingBottom: "25px"}}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        className={classes.textField}
                        value={userCredentials.email}
                        onChange={changeHandler}
                        placeholder="Email"
                        required
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Confirm Email"
                        type="email"
                        name="email"
                        className={classes.textField}
                        value={userCredentials.email}
                        onChange={changeHandler}
                        placeholder="Email"
                        required
                        variant="outlined"
                        margin="normal"
                    />
                </div>
                <div style={{width: "100%", paddingBottom: "25px"}}>
                    <TextField
                        type="password"
                        name="password"
                        className={classes.textField}
                        value={userCredentials.password}
                        onChange={changeHandler}
                        placeholder="Password"
                        required
                        variant="outlined"
                        margin="normal"
                        
                    />
                    <TextField
                        type="password"
                        name="password"
                        className={classes.textField}
                        value={userCredentials.password}
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        required
                        variant="outlined"
                        margin="normal"
                        
                    />
                </div>
                <div style={{width: "100%"}}>
                    <Button style={{background: "#2C98F0", color: "white", width: "40%"}} className={classes.button} variant="outlined" color="black" type="submit">Register</Button>
                </div>
            </div>
            </form>   
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isFetching: state.loggedInUser.isFetching,
        error: state.loggedInUser.error,
        loggedInUser: state.loggedInUser
    };
};

export default connect(
    mapStateToProps,
    { shouldUpdateLoggedInUser }
)(Registration)

