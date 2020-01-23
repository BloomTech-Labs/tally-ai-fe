import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles ({

root:{
    bottom: '0',
    background: '#BBDEFB',
    color: 'black',
    height: '100px',
    zIndex: '1'
},

})
export default function Footer() {
    const classes = useStyles();

    return(
        <footer className ={classes.root}>
            <Typography align="center">
                    {'Copyright © '}
                    Tally AI 2020
                </Typography>
            <Button className="FooterButton" color="inherit">About</Button>
            <Button className="FooterButton" color="inherit">Team</Button>
            <Button className="FooterButton" color="inherit">FAQ</Button>
            <Button className="FooterButton" color="inherit">Terms Of Service</Button>
            <Button className="FooterButton" color="inherit">Privacy Policy</Button>           
        </footer>
    );
}
