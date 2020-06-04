import React,{useState} from "react";
import * as yup from "yup";
import {Formik, Form, Field} from "formik"

import {makeStyles} from "@material-ui/core/styles";
import {TextField,Button} from "@material-ui/core";


import {connect} from "react-redux";

import {fetchEditAccount} from "../../actions/index.js";


const useStyles = makeStyles(theme => ({
    root:{
        flex: "3",
        minHeight: "410px"
    },
    title:{
        marginRight: "auto",
        marginLeft: "10%",
        display: "none",
    },
    form:{
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
        margin: theme.spacing(1),
        marginTop: 'auto',
        marginBottom: '6%',
        marginRight: "10%",
        width: '4rem',
        fontWeight: "bold",
        alignSelf: "flex-end",

    },
}))

let passwordSchema = yup.object().shape({
    password: yup.string()
        .min(6, "Password must contain at least 6 characters").required("Please enter your new password")
        .test("password", "Passwords must match", function(value) {
            return this.parent.confirmPassword === value
            }),
        
    confirmPassword: yup.string().min(6, "Password must contain at least 6 characters").required("Please enter your new password")
        .test("password", "Passwords must match", function(value) {
            return this.parent.password === value
            }),
})


function EditPassword(props){

    const [passwordCreds, setPasswordCreds]= useState({
        password: "",
        confirmPassword: "",
    })

    const handleChange = e => {
        setPasswordCreds({...passwordCreds, [e.target.name]: e.target.value})
        console.log(passwordCreds)
    }

    const handleSubmit = event => {
        console.log(passwordCreds)
    }

    const classes = useStyles();

    return (
        <div
            role="Password Change Panel"
            id={`Password-tabpanel-${props.index}`}
            aria-labelledby={`vertical-tab-${props.index}`}
            className={classes.root}
        >

            <Formik
                initialValues={passwordCreds}
                onSubmit={handleSubmit}
                validationSchema={passwordSchema}
                enableReinitialize={true}
                validateOnChange={true}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleBlur,
                        handleSubmit,

                    } = props;

                    return (
                        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                            <div className={classes.title}>
                                <h3>Change your password</h3>
                            </div>

                            <TextField 
                                label ="New Password"
                                variant ="outlined"
                                margin="normal"
                                type="password"
                                name="password"
                                
                                className={classes.textField}
                                onChange={handleChange}
                                placeholder="New Password"
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
                            <Button className ={classes.button} color="primary" type ="submit">Done</Button>

                        </form>
                    )
                }

                }

            </Formik>

        </div>
    )

}

const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps, {fetchEditAccount})(EditPassword)