import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik,Form,Field } from "formik";

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
    width: '12em'
    },
    input: {
    display: 'none',
    },
    
  }));

  let settingsSchema = yup.object().shape({
    firstName: yup.string().required('First name is required!'),
    lastName: yup.string().required('Last name is required!'),
    password: yup.string()
        .min(6, "Password must contain at least 6 characters")
        .oneOf([yup.ref("confirmPassword"), null], "Passwords do not Match"),
    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords do not Match")
        .min(6, "Password must contain at least 6 characters")
        
  });

//   .oneOf([yup.ref("password"), null], "Passwords do not Match")

function EditAccount(props){
    /*
        User can enter updates to first name, last name, or password.
        If password is updated, they must confirm the password.
    */

    const classes = useStyles();

    useEffect(()=>{
            setCredentials({...props.userInfo.data, password: "",
            confirmPassword: ""})
        
        
    },[props.userInfo])

    const [userCredentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: ""
    });

    console.log(props);

    const handleChange = e => {
        setCredentials({...userCredentials, [e.target.name]: e.target.value})
        console.log(userCredentials);
    }


    // Submit updated account info to back end
    const handleSubmit = event => {
        
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

    }

    return (
        <div >
            <div style={{textAlign:"center", height: "95vh"}}>
                <div style={{paddingTop:"175px", color: "linear-gradient(341.24deg, #E3F2FD 11.16%, #BBDEFB 82.03%)"}}>
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
                            <form className ={classes.container} onSubmit={handleSubmit} noValidate style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", width: "50%", marginLeft: "25%", marginRight: "25%", marginBottom: "5%", borderRadius: "5%"}}>
                                <div>
                                    <h1>Account</h1>
                                    <h3>Change your basic account settings</h3>
                                </div>
                                <TextField 
                                    label ="First Name"
                                    variant ="outlined"
                                    margin="normal"
                                    type="text"
                                    name="firstName"
                                    autoFocus
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
                                    label ="Password"
                                    variant ="outlined"
                                    margin="normal"
                                    type="password"
                                    name="password"
                                    
                                    className={classes.textField}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    error ={errors.password && touched.password ? true: false}
                                    helperText = {errors.password && touched.password && errors.password}
                                    />
                                <TextField 
                                    label ="Confirm Password"
                                    variant ="outlined"
                                    margin="normal"
                                    type="password"
                                    name="confirmPassword"
                                    className={classes.textField}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    error ={errors.confirmPassword && touched.confirmPassword ? true: false}
                                    helperText = {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                    /> 
                                <Button className ={classes.button} variant="outlined" color="black" type ="submit">Submit Changes</Button>
                            </form>  

                        )
                    }}
                    </Formik>
                    
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userInfo: state.loggedInUser
    };
};

export default connect(mapStateToProps, {fetchEditAccount})(EditAccount)
