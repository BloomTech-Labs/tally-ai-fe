import { axiosWithYelpAuth } from "../utils/axiosWithYelpAuth";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";


/*
  ------------ 
  ACTION TYPES 
  ------------
*/

// Yelp Business Search
export const FETCH_BUSINESS_START = "FETCH_BUSINESS_START";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE";

// Select business and add info to the store
export const ADD_BUSINESS = "ADD_BUSINESS";

// TopBottomWords
export const FETCH_TOP_AND_BOTTOM_START = "FETCH_TOP_AND_BOTTOM_START";
export const FETCH_TOP_AND_BOTTOM_SUCCESS = "FETCH_TOP_AND_BOTTOM_SUCCESS";
export const FETCH_TOP_AND_BOTTOM_FAILURE = "FETCH_TOP_AND_BOTTOM_FAILURE";

// Registration
export const FETCH_ADDNEWUSER_SUCCESS = "FETCH_ADDNEWUSER_SUCCESS";

// PhraseRank
export const FETCH_WORDS_OVER_TIME_START = "FETCH_WORDS_OVER_TIME_START";
export const FETCH_WORDS_OVER_TIME_SUCCESS = "FETCH_WORDS_OVER_TIME_SUCCESS";
export const FETCH_WORDS_OVER_TIME_FAILURE = "FETCH_WORDS_OVER_TIME_FAILURE";

// ReviewFrequency
export const FETCH_REVIEWS_OVER_TIME_START = "FETCH_REVIEWS_OVERTIME_START";
export const FETCH_REVIEWS_OVER_TIME_SUCCESS = "FETCH_REVIEWS_OVERTIME_SUCCESS";
export const FETCH_REVIEWS_OVER_TIME_FAILURE = "FETCH_REVIEWS_OVERTIME_FAILURE";

/*
  -------
  ACTIONS
  -------
*/
// Yelp Business Search
export const fetchBusinesses = business => dispatch => {
  console.log("action business query", business);

  const name = business.name;
  let location;

  // Check for type of location provided - coords or phrase (ie city, state, etc)?
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

  // Dynamically generate endpoint using provided location and name
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

// TopBottomWords
export const fetchTopAndBottom = id => dispatch => {
  const dsEndpoint = `https://cors-anywhere.herokuapp.com/http://django-tally.nv9fjcsgss.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=0`;
  console.log("Running fetchTopAndBottom.");
  dispatch({ type: FETCH_TOP_AND_BOTTOM_START });
  axios
    .get(dsEndpoint)
    .then(res => {
      dispatch({
        type: FETCH_TOP_AND_BOTTOM_SUCCESS,
        payload: res
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_TOP_AND_BOTTOM_FAILURE,
        payload: err
      });
    });
};

// Select business and add info to the store at state.businessInfo
export const addBusiness = businessInfo => dispatch => {
  console.log("\nAdding business to the store...\n");
  dispatch({ type: ADD_BUSINESS, payload: businessInfo });
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

// PhraseRank
export const fetchWordsOverTime = id => dispatch => {
  dispatch({ type: FETCH_WORDS_OVER_TIME_START });
  console.log("\nFetching words over time...\n");
  const dsEndpoint = `https://cors-anywhere.herokuapp.com/http://django-tally.nv9fjcsgss.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=1`;
  console.log(`Fetch Words Over Time endpoint:\n${dsEndpoint}`);
  axios
    .get(dsEndpoint)
    .then(res => {
      console.log("WORDS OVER TIME ACTION FETCH SUCCESS, PAYLOAD: ", res.data);
      dispatch({ type: FETCH_WORDS_OVER_TIME_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_WORDS_OVER_TIME_FAILURE, payload: err });
    });
};

// ReviewFrequency
export const fetchReviewsOverTime = id => dispatch => {
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

// export const fetchAllWidgetData = id => {
//   console.log("ID in fetchAllWidgetData:\n", id);
//   fetchWordsOverTime(id);
//   fetchTopAndBottom(id);
// };
