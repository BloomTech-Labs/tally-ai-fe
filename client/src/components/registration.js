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
        width: '20%'
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
        <div style={{ marginTop: '5%' }}>
            <h1>Register</h1>
            <form className={classes.container} onSubmit={(e) => submitHandler(e)}>

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

                {/* <TextField
                label="Company"
                type="text"
                name="company"
                className={classes.textField}
                value={userCredentials.company}
                onChange={changeHandler}
                placeholder="Company"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                label="City"
                type="text"
                name="city"
                className={classes.textField}
                value={userCredentials.city}
                onChange={changeHandler}
                placeholder="City"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                label="State"
                type="text"
                name="state"
                className={classes.textField}
                value={userCredentials.state}
                onChange={changeHandler}
                placeholder="State"
                required
                variant="outlined"
                margin="normal"
                />
            <TextField
                type="text"
                name="zip"
                className={classes.textField}
                value={userCredentials.zip}
                onChange={changeHandler}
                placeholder="Zip"
                required
                variant="outlined"
                margin="normal"
                /> */}
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

                <Button className={classes.button} variant="outlined" color="black" type="submit">Register</Button>
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

