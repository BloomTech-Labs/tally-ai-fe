import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

const Result = ({ data, postBusiness }) => {
  const [tentativeSelection, setTentativeSelection] = useState();
  const [isSelected, setIsSelected] = useState(false);


  const select = e => {
    e.preventDefault();
    postBusiness(data.id);
  }

  const useStyles = makeStyles({
    card: {
      width: '80%',
      height: '25%',
      margin: 20,
      padding: 20,
      // display: 'flex',
      // // alignItems: 'center',
      // // justifyItems: 'center',
      // justifyContent: 'space-between',
      // // alignContent: 'space-between'
    }
  })
  const classes = useStyles();

  return (
    <Card className={classes.card}>
    <div className={`result ${isSelected ? "selected" : "not-selected"}`} onClick={() => {setIsSelected(!isSelected)} }>
      {/* <CardActionArea>
        <CardContent> */}
      <img src={data.image_url} />
      
        {/* <h2>{data.name}</h2> */}
      {/* </CardContent>
      </CardActionArea> */}
      <div className="result-text" style={{display:"flex", flexDirection:"column", justifyItems:"space-between", paddingLeft: "20%"}}>
      <h2>{data.name}</h2>
        <StarRatings 
          rating={data.rating}
          starRatedColor="blue"
          numberOfStars={5}
          name="rating"
          size="large"
        />
        <p>{data.phone}</p>
        <p>{data.location.address1}</p>
        <p>
          {data.location.city}, {data.location.state} {data.location.zip_code}
        </p>
        <button onClick={select}>Select</button>
      </div>
    </div>
    </Card>
  );
};

export default Result;
