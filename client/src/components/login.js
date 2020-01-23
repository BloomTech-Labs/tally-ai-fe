import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from "../actions/index";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '12.5%'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '15%'
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        marginTop: '2%',
        marginBottom: '3.2%',
        width: '12%'
    },
    input: {
        display: 'none',
    },
    bottomText: {

    },
}));

const Login = props => {

    const classes = useStyles();
    const [login, setLogin] = useState({email: "", password: ""})

    const handleChange = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        if(!props.isFetching) {
        e.preventDefault();
        console.log(login, "login that was passed")
        props.loginUser(login)
        }
    }

    useEffect(() => {
        if(props.loggedInUser){
            props.history.push('/')  //change to account when made
        }
    }, [props.loggedInUser]);

    return (
        <div style={{marginTop:'5%'}}>
            <form className ={classes.container} onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    className={classes.textField}
                    value={login.username}
                    onChange={handleChange}
                    required
                    margin="normal"
                    variant="outlined"
                    placeholder="Email"
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={login.password}
                    onChange={handleChange}
                    required
                    margin="normal"
                    variant="outlined"
                    placeholder="Password"
                />
                <Button className={classes.button} variant="outlined" color="black" type="submit">Login</Button>
                <div className ={classes.bottomText}>
                    <p>
                        Don't have an account?  <Link to='/Register/'>Register Now!</Link>
                    </p>
                </div>
                
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser.userID,
        isFetching: state.loggedInUser.isFetching,
        error: state.loggedInUser.error
    };
};

export default connect(
    mapStateToProps,
    { loginUser }
)(Login)
