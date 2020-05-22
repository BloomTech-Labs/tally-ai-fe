import { axiosWithYelpAuth } from "../auth/axiosWithYelpAuth";
import { axiosWithAuth } from "../auth/axiosWithAuth";
import axios from "axios";

// Yelp Business Search
export const FETCH_BUSINESS_START = "FETCH_BUSINESS_START";
export const FETCH_BUSINESS_SUCCESS = "FETCH_BUSINESS_SUCCESS";
export const FETCH_BUSINESS_FAILURE = "FETCH_BUSINESS_FAILURE"; 



// Select business and add info to the store
export const SELECT_BUSINESS_START = "SELECT_BUSINESS_START";
export const SELECT_BUSINESS_SUCCESS = "SELECT_BUSINESS_SUCCESS";
export const SELECT_BUSINESS_FAILURE = "SELECT_BUSINESS_FAILURE";

//adding businesses to user's owned businesses list
export const ADD_BUSINESS_START = "ADD_BUSINESS_START";
export const ADD_BUSINESS_SUCCESS = "ADD_BUSINESS_SUCCESS";
export const ADD_BUSINESS_FAILURE = "ADD_BUSINESS_FAILURE";

//removing businesses from user's owned businesses list
export const REMOVE_BUSINESS_START = "REMOVE_BUSINESS_START";
export const REMOVE_BUSINESS_SUCCESS = "REMOVE_BUSINESS_SUCCESS";
export const REMOVE_BUSINESS_FAILURE = "REMOVE_BUSINESS_FAILURE";

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
    const yelpSearchEndpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${name}&${location}`;//I've tried like a million different solutions from Google to get this to work without a 403 and a CORS error, maybe someone else has ideas cause I give up
  
    dispatch({ type: FETCH_BUSINESS_START });
    console.log("Yelp API URL: ", yelpSearchEndpoint);
    axiosWithYelpAuth()
      .get(yelpSearchEndpoint)
      .then(res => {
        dispatch({
          type: FETCH_BUSINESS_SUCCESS,
          payload: res.data.businesses
        });
      })
      .catch(err => {
        dispatch({
          type: FETCH_BUSINESS_FAILURE,
          payload: err
        });
      });
  };