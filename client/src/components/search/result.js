import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";

/*
=======
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

*/
/*Required business data for Result
data {
  image_url
  name
  rating (1-5)
  phone
    location {
      address1
      state
      zip_code
    }
}
*/

const Result = ({ data, setTentativeSelection, select, className }) => {
  const [isSelected, setIsSelected] = useState(false);
  /*
  const useStyles = makeStyles({
    card: {
      width: "80%",
      height: "30%",
      margin: 20,
      padding: 20
      // display: 'flex',
      // // alignItems: 'center',
      // // justifyItems: 'center',
      // justifyContent: 'space-between',
      // // alignContent: 'space-between'
    }
  });
  const classes = useStyles();
*/
  return (
    <div
      onClick={e => {
        setIsSelected(!isSelected);
        setTentativeSelection({
          businessId: data.id,
          businessName: data.name,
          businessImg: data.image_url,
          reviewCount: data.review_count,
          averageRating: data.rating,
          changeInRating: "" //Yelp API doesn't offer this, unless DS can get this somehow, lets just exclude it
        });
      }}
      className={className}
    >
      {/* <CardActionArea>
        <CardContent> */}

      <img
        style={{
          alignSelf: "center",
          height: "100%",
          width: "33%",
          objectFit: "cover"
        }}
        src={data.image_url}
      />

      {/* <h2>{data.name}</h2> */}
      {/* </CardContent>
      </CardActionArea> */}
      <div
        className="result-text"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "space-between",
          paddingLeft: "5%",
          cursor: "pointer"
        }}
      >
        <h2>{data.name}</h2>
        <StarRatings
          rating={data.rating}
          starRatedColor="grey"
          starDimension="20px"
          starSpacing="1px"
          numberOfStars={5}
          name="rating"
          size="large"
        />
        <p className="phoneNumber">{data.phone}</p>
        <p>{data.location.address1}</p>
        <p>
          {data.location.city}, {data.location.state} {data.location.zip_code}
        </p>
        <button
          onClick={e => {
            console.log("On click! setting selected business data as: ", data);
            select(e);
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default Result;
