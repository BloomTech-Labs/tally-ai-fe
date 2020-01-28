import React, { useState, useEffect } from 'react';

import EditAccount from "./editaccount"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import { fetchEditAccount, selectBusiness } from "../../actions/index"

import { connect } from 'react-redux';

const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        clickable: true,
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false
    },
}

const useStyles = makeStyles(theme => ({
    card: {

        display: 'flex',
        flexDirection: 'column',
        transitionDuration: '0.3s',
        width: "35%",
        height: "50%",
        margin: 20,
        padding: 20,
        borderRadius: 20
    },
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Settings(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openAccount, setOpenAccount] = React.useState(false);

    const handleOpenAccount = () => {
        setOpenAccount(true);
    }

    const handleCloseAccount = () => {
        setOpenAccount(false);
    }

    // Add following useEffect once registration/login endpoints are up


    // useEffect(() => {
    //     if(props.loggedUser > 0){
    //         props.addBusiness(props.loggedUser)
    //         // add favorites here
    //     } else {
    //         props.history.push('/Login')
    //     }
    // }, [props.loggedUser]);

    return (
        <div>
            <div className="settings-section" style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                {/* <div className="icon-buttons" style={{ width: '15%', height: '80%', backgroundColor: '#2C98F0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div onClick={handleOpenAccount} style={{ width: '100%', cursor: "pointer" }}><span class="iconify" data-icon="ic:baseline-account-box" data-inline="false" style={{ fontSize: "6rem", color: 'black' }} /><p style={{ fontSize: '2.2rem', color: 'black' }}>Edit Account</p></div> */}
                        <EditAccount loggedUser={localStorage.getItem("userID")} loggedUserInfo={props.loggedUserInfo} fetchEditAccount={props.fetchEditAccount} />
                </div>
                {/* <div className="favorites-section" style={{ width: '65%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', border: "1px solid grey" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '75%', marginBottom: '50%' }}><h3>Favorites</h3></div>
                </div> */}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedInUser.userID,
        isFetching: state.loggedInUser.isFetching,
        error: state.loggedInUser.error,
        // loggedUserInfo: state.loggedUserInfo,
        competitors: state.competitors.businesses
    };
};

export default connect(
    mapStateToProps,
    { fetchEditAccount, addBusiness: selectBusiness }
)(Settings)