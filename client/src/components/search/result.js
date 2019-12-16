import React from "react";
import StarRatings from "react-star-ratings";

const Result = ({ data, postBusiness }) => {
  return (
    <div className="result">
      <img />
      <div className="result-text">
        <h3>{data.name}</h3>
        <StarRatings 
          rating={data}
        />
      </div>
    </div>
  );
};

export default Result;
