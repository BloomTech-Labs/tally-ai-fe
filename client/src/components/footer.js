import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles ({

root:{
    bottom: '0',
    background: '#BBDEFB',
    color: 'black',
    height: '12vh',
    zIndex: '100'
},

})
export default function Footer() {
    const classes = useStyles();

    function isOnLogin() {

        //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")
    
        var url = window.location;
        var firstParam = url.pathname.split('/')[1];
    
        return firstParam === "";
    }

    return(
        <footer className ={classes.root}>{isOnLogin() ? <div></div> :
            <div>
            <Typography align="center">
                    {'Copyright © '}
                    Tally AI 2020
            </Typography>
            <Button className="FooterButton" color="inherit" onClick component={Link} to="/AboutUs">About</Button>
            <Button className="FooterButton" color="inherit" onClick component={Link} to="/AboutUs">Team</Button>
            <Button className="FooterButton" color="inherit" onClick component={Link} to="/Policy">Terms Of Service</Button>
            <Button className="FooterButton" color="inherit" onClick component={Link} to="/Policy">Privacy Policy</Button>
            </div>           
        }</footer>
    );
}
