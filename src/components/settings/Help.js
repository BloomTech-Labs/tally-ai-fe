import React, { useState, useEffect } from 'react';

import * as yup from 'yup';
import { Formik,Form,Field } from "formik";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Alert from "./Alert.js";

import {connect } from "react-redux"
import { MenuOpenOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root:{
        flex: "3",
        minHeight: "440px"
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
    formControl: {
        minWidth: 120,
    },
    select: {
        
    },
    button: {
        marginTop: 'auto',
        marginRight: "10%",
        marginBottom: '2%',
        width: '4rem',
        fontWeight: "bold",
        alignSelf: "flex-end",
    },


}))

let helpSchema = yup.object().shape({
    category: yup.string().required("Category Required"),
    subj: yup.string().required("Subject Required").max(45,"Subject max of 45 characters"),
    message: yup.string().required("Message Required"),
})



function Help(props){

    const classes = useStyles();

    const [helpForm, setHelpForm] = useState({
        category:"",
        subj:"",
        message: ""
    })

    const handleChange = e=>{
        console.log(e)
        setHelpForm({...helpForm, [e.target.name]: e.target.value})
        console.log(helpForm)
    }

    const handleSubmit = event =>{
        console.log(helpForm)
        setHelpForm({
            category:"",
            subj:"",
            message: ""
        })
    }

    return (
        <div
            role="Help Form Panel"
            id={`verical-tabpanel-${props.index}`}
            aria-labelledby={`vertical-tab-${props.index}`}
            className={classes.root}
        >
            <Formik
                initialValues={helpForm}
                onSubmit={handleSubmit}
                validationSchema={helpSchema}
                validateOnChange={false}
                enableReinitialize={true}
            >
            {
                props =>{

                    const {
                        errors,
                        touched,
                        handleSubmit,
                        handleBlur,
                    } = props;

                    return (
                        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                            <div>
                                <h3>Contact Us</h3>
                                <p>Have a question? Please fill out the form below.</p>
                            </div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    name="category"
                                    labelId="category"
                                    label={errors.category && touched.category ? errors.category : "Category"}
                                    id="category"
                                    value={helpForm.category}
                                    onChange={handleChange}
                                    className={classes.select}
                                    onBlur={handleBlur}
                                    variant="outlined"
                                    error={errors.category && touched.category ? true : false}
                                >
                                    <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                                    <MenuItem value={"Profile"}>Profile</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                label={errors.subj && touched.subj ? errors.subj : "Subject"}
                                id="subj"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                name="subj"
                                className={classes.textField}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={props.values.subj}
                                placeholder="Subject"
                                error={errors.subj && touched.subj ? true: false}
                            />
                            <TextField
                                label={errors.message && touched.message ? errors.message : "Message"}
                                id="message"
                                variant="outlined"
                                multiline
                                rows={4}
                                type="text"
                                name="message"
                                className={classes.textField}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={helpForm.message}
                                placeholder="Message"
                                error={errors.message && touched.message ? true: false}
                            />

                            <Button className ={classes.button} color="primary" type ="submit">Submit</Button>
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
        userInfo: state.loggedInUser
    }
}

export default connect(mapStateToProps)(Help)