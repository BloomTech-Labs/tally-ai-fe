import React, { useState, useEffect } from 'react';

import * as yup from 'yup';
import { Formik} from "formik";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "./Alert.js";


import {connect } from "react-redux"

import { fetchEditAccount } from "../../actions/index";

const useStyles = makeStyles(theme => ({
    root:{
        flex: "3",
        minHeight: "440px"
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
    button: {
    marginTop: 'auto',
    marginRight: "10%",
    marginBottom: '2%',
    width: '4rem',
    fontWeight: "bold",
    alignSelf: "flex-end",
    },
    
}));

let settingsSchema = yup.object().shape({
    firstName: yup.string().required('First Name Required'),
    lastName: yup.string().required('Last Name Required'),
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
        
        props.userInfo && !props.userInfo.isFetching && setCredentials({...props.userInfo.data,city:"",state:""})
        submitStatus && props.userInfo.success && setOpen({message: "Account Updated", status: true,sever:"success"})
        submitStatus && props.userInfo.error && setOpen({message: props.userInfo.error,status: true,sever:"error"})
        console.log("useEffect")
        
    },[props.userInfo.data])



    const [userCredentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        city: "",
        state: "",
    });
    const [open, setOpen] = useState({message:"", status: false,sever:"success"});
    const [submitStatus, setSubmitStatus] = useState(false);


    console.log(props);

    const handleClose = (e,reason) =>{
        if (reason === 'clickaway') {
            return;
          }
      
          setOpen({message:"", status:false});
    }

    const handleChange = e => {
        setCredentials({...userCredentials, [e.target.name]: e.target.value})
        console.log(userCredentials);
        
    }


    // Submit updated account info to back end
    const handleSubmit = event => {
        console.log(props.userInfo);
        console.log({first_name:userCredentials.firstName,last_name:userCredentials.lastName})
        props.fetchEditAccount(props.userInfo.data.id,{first_name:userCredentials.firstName,last_name:userCredentials.lastName})
        setSubmitStatus(true)
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
                    handleBlur,
                    handleSubmit,
                    
                } = props;

                return (
                    <form className ={classes.form} onSubmit={handleSubmit} noValidate>
                        <div className={classes.title}>
                            <h3>Personal Settings</h3>
                            
                        </div>
                        <TextField 
                            
                            label ={errors.firstName && touched.firstName ? errors.firstName : "First Name"}
                            id="firstName"
                            variant ="outlined"
                            margin="normal"
                            type="text"
                            name="firstName"
                            className={classes.textField}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder="First Name"
                            error={
                                errors.firstName && touched.firstName ? true : false
                            }
                            
                            />
                        <TextField 
                            label ={errors.lastName && touched.lastName ? errors.lastName : "Last Name"}
                            id="lastName"
                            variant ="outlined"
                            margin="normal"
                            type="text"
                            name="lastName"
                            className={classes.textField}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Last Name"
                            value={values.lastName}
                            error ={errors.lastName && touched.lastName ? true: false}
                            />
                        <TextField
                            label ="City"
                            id="city"
                            variant ="outlined"
                            margin="normal"
                            type="city"
                            name="city"
                            
                            className={classes.textField}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="City"
                            error ={errors.city && touched.city ? true: false}
                            helperText = {errors.city && touched.city && errors.city}
                            />
                        <TextField 
                            label ="State"
                            id="state"
                            variant ="outlined"
                            margin="normal"
                            type="state"
                            name="state"
                            className={classes.textField}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="State"
                            error ={errors.state && touched.state ? true: false}
                            helperText = {errors.state && touched.state && errors.state}
                            /> 
                        <Button className ={classes.button} color="primary" type ="submit">Submit</Button>
                    </form>  

                )
            }}
            </Formik>
            
            <Snackbar open={open.status} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open.sever}>
                {open.message}
                </Alert>
            </Snackbar>   
        </div>
    )
}

const mapStateToProps = state => {
    console.log("redux state",state)
    return {
        userInfo: state.settings.loggedInUser
    };
};

export default connect(mapStateToProps, {fetchEditAccount})(EditAccount)
