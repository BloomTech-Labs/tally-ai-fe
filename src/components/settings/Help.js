import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


import {connect } from "react-redux"

const useStyles = makeStyles(theme => ({
    root:{
        flex: "3",
        minHeight: "440px"
    },
    button: {
        fontWeight: "bold",
        textTransform: "none",
    },


}))



function Help(props){

    const classes = useStyles();

    return (
        <div
            role="Help Form Panel"
            id={`verical-tabpanel-${props.index}`}
            aria-labelledby={`vertical-tab-${props.index}`}
            className={classes.root}
        >
            <div className={classes.title}>
                <h2>Contact Us</h2>
                <h3 >Have a questions? Send us an email.</h3>
            </div>
            <Button
                variant="contained" 
                color="primary"
                href="mailto:contact.tallyai@gmail.com"
                className={classes.button}
            >
                contact.tallyai@gmail.com
            </Button>

        </div>
    )
}

const mapStateToProps = state => {

    return {
    }
}

export default connect(mapStateToProps)(Help)