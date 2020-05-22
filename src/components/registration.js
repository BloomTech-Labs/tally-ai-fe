import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { shouldUpdateLoggedInUser } from "../actions/index";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";

import axios from "axios"

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '7%'
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
        marginTop: "30px", 
        backgroundColor: "#1E4DC7", 
        color: "white",
        margin: theme.spacing(1),
        marginBottom: '30px',
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
        confirmedEmail: "",
        password: "",
        confirmedPassword: ""
    });

    // useEffect(() => {
    //     if (props.loggedInUser) {//we're logged in, lets redirect to /home
    //         props.history.push('/')
    //     }
    // }, [props.loggedInUser]);

    const submitHandler = event => {
        console.log("onSubmit working", props.isFetching);
        event.preventDefault();

        if(!(userCredentials.confirmedEmail === userCredentials.email)){
            alert("Your confirmed email does not match.");
            return;
        }

        if(!(userCredentials.password === userCredentials.confirmedPassword)){
            alert("Your confirmed password does not match.");
            return;
        }

        if (!props.isFetching) {//don't let them submit again if the backend is already processing their registration request
            console.log(userCredentials);

            let formattedUserCredentials = userCredentials;
            delete formattedUserCredentials.confirmedEmail;
            delete formattedUserCredentials.confirmedPassword;

            axios
                .post(`https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/auth/register`, formattedUserCredentials)
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
        <div style={{background: "linear-gradient(341.24deg, #B5E4FE 11.16%, #BDF5FF 82.03%)", height:"100vh" }}>
            <form className={classes.container} onSubmit={(e) => submitHandler(e)}>
                <div style={{ width: "80%", marginLeft: "10%", marginRight: "10%", borderRadius: "47px", marginTop: "50px", marginBottom: "50px", height: "70vh", background: "white" }}>
                    <div style={{ width: "91%", marginLeft: "9%", textAlign: "left", fontSize: "24px", paddingTop: "25px" }}>
                        <h1>Sign up for an account</h1>
                    </div>
                    <div style={{ width: "100%" }}>
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
                    <div style={{ width: "100%", paddingTop: "25px", paddingBottom: "25px" }}>
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
                            name="confirmedEmail"
                            className={classes.textField}
                            value={userCredentials.confirmedEmail}
                            onChange={changeHandler}
                            placeholder="Email"
                            required
                            variant="outlined"
                            margin="normal"
                        />
                    </div>
                    <div style={{ width: "100%", paddingBottom: "25px" }}>
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
                            name="confirmedPassword"
                            className={classes.textField}
                            value={userCredentials.confirmedPassword}
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            required
                            variant="outlined"
                            margin="normal"

                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <Button className={classes.button} variant="outlined" type="submit">Register</Button>
                    </div>
                    <div>
                        <p>
                            Already have an account? <Link style={{padding: "0", color: "black"}} to='/Login/'>Sign in here</Link>
                        </p>
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

