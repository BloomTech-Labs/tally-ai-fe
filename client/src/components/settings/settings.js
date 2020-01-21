import React, {useState, useEffect} from 'react';

import EditAccount from "./editaccount"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

import { fetchEditAccount, addBusiness } from "../../actions/index"

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
        width: "35%",
        minWidth: 200,
        minHeight: '100%'
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
  
    return(
        <>
            <div className="settings-section" style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <div className="icon-buttons" style={{ width: '25%', height: '80%', backgroundColor: '#BBDEFB', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center'}}>
                <div onClick={handleOpenAccount} style={{ width: '100%', cursor: "pointer" }}><span class="iconify" data-icon="ic:baseline-account-box" data-inline="false" style={{ fontSize: "6rem", color: 'black' }} /><p style={{ fontSize: '2.2rem', color: 'black' }}>Edit Account</p></div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={openAccount}
                    onClose={handleCloseAccount}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <div className={classes.paper}>
                        <EditAccount loggedUser={props.loggedUser} loggedUserInfo={props.loggedUserInfo} fetchEditUserInformation={props.fetchEditUserInformation}/>
                    </div>
                </Modal>
                </div>
                <div className="favorites-section" style={{ width: '65%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', border: "1px solid grey" }}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '75%', marginBottom: '50%' }}><h3>Favorites</h3></div>
                </div>
            </div>
        </>
    )

}

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedUser,
        isFetching: state.isFetching,
        error: state.error,
        loggedUserInfo: state.loggedUserInfo
    };
};

export default connect(
    mapStateToProps,
    { fetchEditAccount, addBusiness }
)(Settings)