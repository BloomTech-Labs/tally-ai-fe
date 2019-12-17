import React from "react";
import StarRatings from "react-star-ratings";

/*Example Business Result
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
  return (
    <div className="result" /*onClick={postBusiness(data.url, data.id)}*/>
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
      </div>
    </div>
  );
};

export default Result;
