import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const useStyles = makeStyles ({

root:{
    bottom: '0',
    background: '#B8E4FA',
    height: '8vh',
    zIndex: '100'
},

})
export default function Footer() {
    const classes = useStyles();

    function isOnLogin() {

        //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")
    
        var url = window.location;
        var firstParam = url.pathname.split('/')[1];
    
        return firstParam.toUpperCase() === ("Login").toUpperCase();
    }

    function isOnRegister() {

        //this function is neccessary because match.params will always be "/" even while on /dashboard since the nav bar is always rendered to "/" (path is unexact "/")
    
        var url = window.location;
        var firstParam = url.pathname.split('/')[1];
    
        return firstParam.toUpperCase() === ("Register").toUpperCase();
    }

    return(
        <footer>
            {isOnLogin() || isOnRegister() ? <div style={{background: 'none', color: 'none', height: '0vh'}}></div> :
            <div className ={classes.root} style={{display: 'flex', width: '100%'}}> 
                <div style={{width: '50%', display: 'flex', alignItems: 'center', marginLeft: '2%'}}>
                    <Typography className='footerTitle' align="center" style={{fontSize: '20px'}}>
                        <p style={{textAlign: "lef"}}>TallyAI <br/> Copyright © 2020</p>
                    </Typography>
                </div>
                <div style={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', height: '8vh'}}> 
                    <Link className="FooterButton" to="/AboutUs">About</Link>
                    <Link className="FooterButton" to="/AboutUs">Team</Link>
                    <Link className="FooterButton" to="/Policy">Terms Of Service</Link>
                    <Link className="FooterButton" to="/Policy">Privacy Policy</Link>
                </div>
            </div>}          
        </footer>
    );
}
