import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";

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

  return (
    <div className={`result ${isSelected ? "selected" : "not-selected"}`} onClick={() => {setIsSelected(!isSelected)} }>
      <img src={data.image_url} />
      <div className="result-text">
        <h3>{data.name}</h3>
        <StarRatings
          rating={data.rating}
          starRatedColor="blue"
          numberOfStars={5}
          name="rating"
        />
        <p>{data.phone}</p>
        <p>{data.location.address1}</p>
        <p>
          {data.location.city}, {data.location.state} {data.location.zip_code}
        </p>
        <button onClick={select}>Select</button>
      </div>
    </div>
  );
};

export default Result;
