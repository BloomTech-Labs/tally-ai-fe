import React,{useState,useEffect} from "react";
import * as yup from "yup";
import {Formik} from "formik"

import {makeStyles} from "@material-ui/core/styles";
import {TextField,Button} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "./Alert.js";



import {connect} from "react-redux";

import { fetchEditAccount } from '../../actions/settingsActions'

const useStyles = makeStyles(theme => ({
    root:{
        flex: "3",
        minHeight: "440px"
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
        marginBottom: '2%',
        marginRight: "10%",
        width: '4rem',
        fontWeight: "bold",
        alignSelf: "flex-end",

    },
}))

let passwordSchema = yup.object().shape({
    password: yup.string()
        .min(8, "New Password must contain at least 8 characters").required("New Password Required")
        .test("password", "New Password must match", function(value) {
            return this.parent.confirmPassword === value
            }),
        
    confirmPassword: yup.string().min(8, "Confirm Password must contain at least 8 characters").required("Confirm Password Required")
        .test("password", "Confirm Password must match", function(value) {
            return this.parent.password === value
            }),
})


function EditPassword(props){
    const classes = useStyles();
    const [submitStatus, setSubmitStatus] = useState(false);
    const [open, setOpen] = useState({message:"", status: false,sever:"success"});
    const [submitting, setSubmitting] = useState(false);


    useEffect(()=>{

        submitStatus && props.userInfo.success && setOpen({message: "Account Updated", status: true,sever:"success"})
        submitStatus && props.userInfo.error && setOpen({message: props.userInfo.error,status: true,sever:"error"})
        console.log("useEffect",props.userInfo.success)
    },[props.userInfo])

    useEffect(()=>{

        setSubmitting(props.userInfo.isFetching)

    },[props.userInfo.isFetching])

    const [passwordCreds, setPasswordCreds]= useState({
        password: "",
        confirmPassword: "",
    })

    

    const handleClose = (e,reason) =>{
        if (reason === 'clickaway') {
            return;
          }
      
          setOpen({message:"", status:false, ...open.sever});
    }

    const handleChange = e => {
        setPasswordCreds({...passwordCreds, [e.target.name]: e.target.value})
        console.log(passwordCreds)
    }

    const handleSubmit = event => {
        console.log({password: passwordCreds.password})
        props.fetchEditAccount(props.userInfo.data.userId,{password: passwordCreds.password})
        setSubmitStatus(true)
        setPasswordCreds({password: "",
        confirmPassword: ""})
    }

    

    return (
        <div
            id={`Password-tabpanel-${props.index}`}
            aria-labelledby={`vertical-tab-${props.index}`}
            className={classes.root}
        >

            <Formik
                initialValues={passwordCreds}
                onSubmit={handleSubmit}
                validationSchema={passwordSchema}
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
                        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                            <div className={classes.title}>
                                <h3>Change your password</h3>
                            </div>

                            <TextField 
                                label ={errors.password && touched.password ? errors.password: "New Password"}
                                id="password"
                                variant ="outlined"
                                margin="normal"
                                type="password"
                                name="password"
                                className={classes.textField}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="New Password"
                                error ={errors.password && touched.password ? true: false}
                                />
                            <TextField 
                                label ={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : "Confirm Password"}
                                id="confirmPassword"
                                variant ="outlined"
                                margin="normal"
                                type="password"
                                name="confirmPassword"
                                className={classes.textField}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                placeholder="Confirm Password"
                                error ={errors.confirmPassword && touched.confirmPassword ? true: false}
                                
                                /> 
                            <Button data-testid="password-settings" className ={classes.button} disabled={submitting} color="primary" type ="submit">Submit</Button>

                        </form>
                    )
                }

                }

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
    return {
        userInfo: state.settings
    };
};

export default connect(mapStateToProps, {fetchEditAccount})(EditPassword)