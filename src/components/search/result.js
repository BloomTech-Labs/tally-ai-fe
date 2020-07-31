import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import ToggleFavoriteButton from "../ToggleFavoriteButton";
import  './results.scss'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Avatar } from "@material-ui/core";


const useStyles = makeStyles((theme) =>({
  card: {
    maxWidth: "420px",
    marginBottom: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));

const Result = ({ data, setTentativeSelection, select, className }) => {
  const [isSelected, setIsSelected] = useState(false);
  
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      // onClick={e => {
      //   e.preventDefault();
      //   setIsSelected(!isSelected);
      //   console.log("setting selection to ", data);
      //   setTentativeSelection({
      //     businessId: data.id,
      //     businessName: data.name,
      //     businessImg: data.image_url,
      //     reviewCount: data.review_count,
      //     averageRating: data.rating,
      //     changeInRating: "", //Yelp API doesn't offer this, unless DS can get this somehow, lets just exclude it
      //     url: data.url,
      //     image_url: data.image_url,
      //     city: data.location.city,
      //     state: data.location.state,
      //     address: data.location.display_address // Added this for the sidebar; don't have a column in DB yet
      //   });
      //     //select(e);
      // }}
    >
      <CardActionArea>
        <CardHeader
          avatar = { 
            <Avatar className={classes.avatar} aria-label={data.name} src={data.image_url}>
                {data.name.split(" ").map(t=> t[0]).join(" ")}
            </Avatar>
          }
          title={data.name}
          subheader={<><Typography>
            {data.address}
          </Typography>
          <Typography>
            {`${data.city}, ${data.zipcode}`}
          </Typography></>}
        
        >
        </CardHeader>
      </CardActionArea>
    </Card>
  );
};

export default Result;
