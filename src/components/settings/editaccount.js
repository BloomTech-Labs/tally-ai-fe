import React, { useState, useEffect } from 'react';

import * as yup from 'yup';
import { Formik,Form,Field } from "formik";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {connect } from "react-redux"

import { fetchEditAccount } from "../../actions/index";

const useStyles = makeStyles(theme => ({
    root:{
        flex: "3",
        minHeight: "410px"
    },
    title: {
        marginRight: "auto",
        marginLeft: "10%",
        display: "none",
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: "0",
        flex: "1",
        height: "100%"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '80%',
      backgroundColor: "#F6F8F9",
    },
    dense: {
      marginTop: theme.spacing(2),
    },
   
    button: {
    marginTop: 'auto',
    marginRight: "10%",
    marginBottom: '6%',
    width: '4rem',
    fontWeight: "bold",
    alignSelf: "flex-end",
    },
    input: {
    display: 'none',
    },
    
}));

let settingsSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    city: yup.string(),
    state: yup.string(),
});


function EditAccount(props){
    /*
        User can enter updates to first name, last name, or password.
        If password is updated, they must confirm the password.
    */

    const classes = useStyles();

    useEffect(()=>{
        
        props.userInfo && setCredentials({...props.userInfo.data,city:"",state:""})
        console.log("useEffect")
        
    },[props.userInfo])

    const [userCredentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        city: "",
        state: "",
    });

    console.log(props);

    const handleChange = e => {
        setCredentials({...userCredentials, [e.target.name]: e.target.value})
        console.log(userCredentials);
        
    }


    // Submit updated account info to back end
    const handleSubmit = event => {
        console.log(props.userInfo);
        console.log({first_name:userCredentials.firstName,last_name:userCredentials.lastName})
        props.fetchEditAccount(props.userInfo.data.id,{first_name:userCredentials.firstName,last_name:userCredentials.lastName})
    }

    console.log("component")

    return (
        
        <div
            role="Account Change Panel"
            id={`vertical-tabpanel-${props.index}`}
            aria-labelledby={`vertical-tab-${props.index}`}
            className={classes.root}
            
        >
                
           
                
            
                <Formik
                    initialValues={userCredentials}
                    onSubmit={handleSubmit}
                    validationSchema={settingsSchema}
                    enableReinitialize={true}
                    validateOnChange={false}
                    
                >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;

                    return (
                        <form className ={classes.form} onSubmit={handleSubmit} noValidate>
                            <div className={classes.title}>
                                <h3>Personal Settings</h3>
                                
                            </div>
                            <TextField 
                                label ="First Name"
                                variant ="outlined"
                                margin="normal"
                                type="text"
                                name="firstName"
                                className={classes.textField}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={props.values.firstName}
                                placeholder="First Name"
                                error={
                                    errors.firstName && touched.firstName ? true : false
                                }
                                helperText={
                                    errors.firstName &&
                                    touched.firstName &&
                                    errors.firstName
                                }
                                />
                            <TextField 
                                label ="Last Name"
                                variant ="outlined"
                                margin="normal"
                                type="text"
                                name="lastName"
                                className={classes.textField}
                                onChange={handleChange}
                                placeholder="Last Name"
                                value={props.values.lastName}
                                error ={errors.lastName && touched.lastName ? true: false}
                                helperText={
                                    errors.lastName && touched.lastName && errors.lastName
                                }
                                />
                            <TextField 
                                label ="City"
                                variant ="outlined"
                                margin="normal"
                                type="city"
                                name="city"
                                
                                className={classes.textField}
                                onChange={handleChange}
                                placeholder="City"
                                error ={errors.city && touched.city ? true: false}
                                helperText = {errors.city && touched.city && errors.city}
                                />
                            <TextField 
                                label ="State"
                                variant ="outlined"
                                margin="normal"
                                type="state"
                                name="state"
                                className={classes.textField}
                                onChange={handleChange}
                                placeholder="State"
                                error ={errors.state && touched.state ? true: false}
                                helperText = {errors.state && touched.state && errors.state}
                                /> 
                            <Button className ={classes.button} disabled={isSubmitting} color="primary" type ="submit">Done</Button>
                        </form>  

                    )
                }}
                </Formik>
                
                
            
        </div>
    )
}

const mapStateToProps = state => {
    console.log("redux state",state)
    return {
        userInfo: state.loggedInUser
    };
};

export default connect(mapStateToProps, {fetchEditAccount})(EditAccount)
