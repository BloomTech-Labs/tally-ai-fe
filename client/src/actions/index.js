import { axiosWithYelpAuth } from "../utils/axiosWithYelpAuth";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

export const FETCH_BUSINESS_START = "FETCH_BUSINESS_START";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE";

export const POST_BUSINESS_START = "POST_BUSINESS_START";
export const POST_BUSINESS_SUCCESS = "POST_BUSINESS_SUCCESS";
export const POST_BUSINESS_FAILURE = "POST_BUSINESS_FAILURE";

export const FETCH_ADDNEWUSER_SUCCESS = "FETCH_ADDNEWUSER_SUCCESS";

export const FETCH_WORDS_OVER_TIME_START = "FETCH_WORDS_OVER_TIME_START";
export const FETCH_WORDS_OVER_TIME_SUCCESS = "FETCH_WORDS_OVER_TIME_SUCCESS";
export const FETCH_WORDS_OVER_TIME_FAILURE = "FETCH_WORDS_OVER_TIME_FAILURE";

export const FETCH_REVIEWS_OVER_TIME_START = "FETCH_REVIEWS_OVERTIME_START";
export const FETCH_REVIEWS_OVER_TIME_SUCCESS = "FETCH_REVIEWS_OVERTIME_SUCCESS";
export const FETCH_REVIEWS_OVER_TIME_FAILURE = "FETCH_REVIEWS_OVERTIME_FAILURE";

export const fetchBusinesses = business => dispatch => {
  console.log("action business query", business);

  const name = business.name;
  let location;

  if (business.location.latitude && business.location.longitude) {
    location = `latitude=${business.location.latitude}&longitude=${business.location.longitude}`;
  } else if (business.location) {
    location = `location=${business.location}`;
  } else {
    dispatch({
      type: FETCH_BUSINESS_FAILURE,
      payload: "Business location required"
    });
  }

  const yelpSearchEndpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${name}&${location}`; //I've tried like a million different solutions from Google to get this to work without a 403 and a CORS error, maybe someone else has ideas cause I give up
  dispatch({ type: FETCH_BUSINESS_START });
  console.log("Yelp API URL: ", yelpSearchEndpoint);
  axiosWithYelpAuth()
    .get(yelpSearchEndpoint)
    .then(res => {
      dispatch({
        type: FETCH_BUSINESS_SUCCESS,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_BUSINESS_FAILURE,
        payload: err
      });
    });
};

export const postBusiness = id => dispatch => {
  const dsEndpoint = `https://cors-anywhere.herokuapp.com/http://tally-deploy.us-east-1.elasticbeanstalk.com/yelp/${id}`; // TODO: GET ENDPOINT URL
  console.log("Running postBusiness.");
  dispatch({ type: POST_BUSINESS_START });
  axios
    .get(dsEndpoint)
    .then(res => {
      dispatch({
        type: POST_BUSINESS_SUCCESS,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: POST_BUSINESS_FAILURE,
        payload: err
      });
    });
};

export const searchResultsPlaceholder = results => dispatch => {
  console.log("searchResultsPlaceholder action working");

  dispatch({
    type: FETCH_BUSINESS_SUCCESS,
    payload: results
  });
};

// Used at Registration
export const fetchAddNewUser = newUser => dispatch => {
  axiosWithAuth()
    .post(``, newUser) //endpoint goes here
    .then(
      res =>
        dispatch({ type: FETCH_ADDNEWUSER_SUCCESS }) &
        console.log(res.data, "fetchAddNewUser")
    )
    .catch(err =>
      dispatch({ type: FETCH_BUSINESS_FAILURE, payload: err.response })
    );
};

export const fetchWordsOverTime = () => dispatch => {
  // TODO: FIND OUT WHAT WE NEED TO GIVE DS TO GET THE DATA
  //dispatch({ type: FETCH_WORDS_OVER_TIME_START });
  console.log("\nFetching words over time...\n");
  // axiosWithAuth()
  // .get() // TODO: FIND OUT THE URL FROM DS
  // .then(res => {
  //   dispatch({ type:FETCH_WORDS_OVER_TIME_SUCCESS, payload: res.data });
  // })
  // .catch(err => {
  //   dispatch({ type:FETCH_WORDS_OVER_TIME_FAILURE, payload: err });
  // })
};

export const fetchReviewsOverTime = () => dispatch => {
  console.log("\nFetching reviews over time...\n");
  // axiosWithAuth()
  // .get() // TODO: FIND OUT THE URL FROM DS
  // .then(res => {
  //   dispatch({ type:FETCH_REVIEWS_OVER_TIME_SUCCESS, payload: res.data });
  // })
  // .catch(err => {
  //   dispatch({ type:FETCH_REVIEWS_OVER_TIME_FAILURE, payload: err });
  // })
};
