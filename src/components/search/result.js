import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import ToggleFavoriteButton from "../ToggleFavoriteButton";
import  './results.scss'
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

  return (
    <div
      onClick={e => {
        e.preventDefault();
        setIsSelected(!isSelected);
        console.log("setting selection to ", data);
        setTentativeSelection({
          businessId: data.id,
          businessName: data.name,
          businessImg: data.image_url,
          reviewCount: data.review_count,
          averageRating: data.rating,
          changeInRating: "", //Yelp API doesn't offer this, unless DS can get this somehow, lets just exclude it
          url: data.url,
          image_url: data.image_url,
          city: data.location.city,
          state: data.location.state,
          address: data.location.display_address // Added this for the sidebar; don't have a column in DB yet
        });
      }}
      className={className}
    >

      <img src={data.image_url} alt="data url"/>
      <div className="result-text">
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
        {/* // business: {
//     // for DS API calls
//     businessId: null,
//     // for side bar
//     businessName: null,
//     businessImg: null,
//     // for top-of-page info cards
//     reviewCount: 0,
//     averageRating: 0
//   } */}

        {/* <ToggleFavoriteButton business={{ businessId: data.id, businessName: data.name, businessImg: data.image_url, reviewCount: data.review_count, averageRating: data.rating }} /> */}
      </div>
      {/* <button style={{marginTop: "auto", paddingBottom: "10%", paddingRight: "7.5%"}}
          onClick={e => {
            console.log("On click! setting selected business data as: ", data);
            select(e);
          }}
        >
          Select
        </button> */}
    </div>
  );
};

export default Result;
