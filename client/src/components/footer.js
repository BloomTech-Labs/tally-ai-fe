import React from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles ({

root:{
    bottom: '0',
    background: 'lightblue',
    color: 'black',
    height: '80px'
},

})
export default function Footer() {
    const classes = useStyles();

    return(
        <footer className ={classes.root}>
            <Button color="inherit">Contact Us</Button>
            <Button color="inherit">Terms Of Use</Button>
            <Button color="inherit">Privacty Policy</Button>
                <Typography align="center">
                    {'Copyright © '}
                    Tally AI 2019
                </Typography>
        </footer>
    );
}
