import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

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

function CompSet(props) {

    const classes = useStyles()

    return(
        <div className="favorites-section" style={{ overflow: 'scroll', width: '70%', height: '80%', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#2C98F0', border: "1px solid grey" }}>

                {props.favorites.map((favorite) => {
                    return (
                        <Card className={classes.card}>
                            <CardActionArea>

                                <img style={{ objectFit: "cover", width: "20vw", height: "10vw" }} src={favorite.businessImg}></img>
                                <CardContent>
                                    <Typography><h3>{favorite.businessName}</h3></Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ justifyContent: 'center' }}>
                                {/* <Button variant="contained" color="primary"> */}
                                <Button variant="contained" color="secondary" style={{ width: '100px' }}><Link style={{ textDecoration: "none", color: "white" }} onClick={() => {
                                    props.addBusiness(favorite);
                                }}
                                    to="/dashboard">View</Link></Button>
                                {/* </Button> */}
                                <Button variant="contained" color="secondary" style={{ width: '100px' }} onClick={() => {
                                    props.setFavorites(props.favorites.filter((fav) => !(fav === favorite)));
                                }}>Remove</Button>
                            </CardActions>
                        </Card>
                    );
                })
                }
            </div>
    )
}

export default CompSet;