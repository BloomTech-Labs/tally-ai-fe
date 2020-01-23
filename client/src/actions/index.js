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

// ReviewFrequency
export const FETCH_RATING_OVER_TIME_START = "FETCH_RATING_OVER_TIME_START";
export const FETCH_RATING_OVER_TIME_SUCCESS = "FETCH_RATING_OVER_TIME_SUCCESS";
export const FETCH_RATING_OVER_TIME_FAILURE = "FETCH_RATING_OVER_TIME_FAILURE";

// Registration
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const REGISTER_START = "REGISTER_START";

// Login
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Edit Account
export const FETCH_EDITACCOUNT_START = "FETCH_EDITACCOUNT_START";
export const FETCH_EDITACCOUNT_SUCCESS = "FETCH_EDITACCOUNT_SUCCESS";
export const FETCH_EDITACCOUNT_FAILURE = "FETCH_EDITACCOUNT_FAILURE";

// PhraseRank
export const FETCH_WORDS_OVER_TIME_START = "FETCH_WORDS_OVER_TIME_START";
export const FETCH_WORDS_OVER_TIME_SUCCESS = "FETCH_WORDS_OVER_TIME_SUCCESS";
export const FETCH_WORDS_OVER_TIME_FAILURE = "FETCH_WORDS_OVER_TIME_FAILURE";

// ReviewFrequency
export const FETCH_REVIEWS_OVER_TIME_START = "FETCH_REVIEWS_OVER_TIME_START";
export const FETCH_REVIEWS_OVER_TIME_SUCCESS =
  "FETCH_REVIEWS_OVER_TIME_SUCCESS";
export const FETCH_REVIEWS_OVER_TIME_FAILURE =
  "FETCH_REVIEWS_OVER_TIME_FAILURE";
export const SET_ACTIVE_WIDGETS = "SET_ACTIVE_WIDGETS";
export const SET_FAVORITES_START = "SET_FAVORITES_START";
export const SET_FAVORITES_FAILURE = "SET_FAVORITES_FAILURE";
export const SET_FAVORITES_SUCCESS = "SET_FAVORITES_SUCCESS";

export const ADD_FAVORITE_START = "ADD_FAVORITE_START";
export const ADD_FAVORITE_FAILURE = "ADD_FAVORITE_FAILURE";
export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";

export const REMOVE_FAVORITE_START = "REMOVE_FAVORITE_START";
export const REMOVE_FAVORITE_FAILURE = "REMOVE_FAVORITE_FAILURE";
export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";

export const SET_USER_INFO = "SET_USER_INFO";

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

export const setActiveWidgets = (widgetArray) => dispatch => {
  dispatch({ type: SET_ACTIVE_WIDGETS, payload: widgetArray });
}

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
export const registerUser = newUser => dispatch => {
  console.log("User info: ", newUser);
  dispatch({ type: REGISTER_START })
  axios
    .post(`https://tally-ai.herokuapp.com/api/auth/register`, newUser) //swap local host with https://tally-ai.herokuapp.com/api/auth/register
    .then(
      res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.userN.id);
        dispatch({ type: REGISTER_SUCCESS, payload: res.data.userN.id });
        console.log(res.data, "fetchAddNewUser");
      }
    )
    .catch(err =>
      dispatch({ type: FETCH_BUSINESS_FAILURE, payload: err.response })
    );
};

//set when a user logs in
export const setUserInfo = (userInfo) => dispatch => {
// userInfo: {  
//   favorites
//   loggedInUser
//   businessInfo
//   activeWidgets
// }
  dispatch({type: SET_USER_INFO, payload: userInfo})

}

// Used at Login
export const loginUser = (login) => dispatch => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
  .post("https://tally-ai.herokuapp.com/api/auth/login", login) //swap local host with https://tally-ai.herokuapp.com/api/auth/login
  .then(res => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userID", res.data.id);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.id });
    console.log(res, "Data returned from fetchLoginSuccess action and set to state");
  })
  .catch(err => dispatch({ type: LOGIN_FAILURE, payload: err.response }))
};

// Used at Edit Account
export const fetchEditAccount = (id, newInfo) => dispatch => {
  dispatch({ type: FETCH_EDITACCOUNT_START });
  axiosWithAuth()
  .put("", newInfo) //endpoint goes here
  .then(res => dispatch({ type: FETCH_EDITACCOUNT_SUCCESS, payload: newInfo }) & console.log(res.data, "fetchEditAccount"))
  .catch(err => dispatch({ type: FETCH_EDITACCOUNT_FAILURE, payload: err.response }))
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

export const setFavorites = (favorites, userID) => dispatch => {

//TODO: Add eddpoint to set a user's favorites, have endpoint return the new list of favorites on success
console.log("ACTION SETTING FAVS", favorites);
  dispatch({ type: SET_FAVORITES_START });
  //hit endpoint POST userID and favorites
  //then
  dispatch({ type: SET_FAVORITES_SUCCESS, payload: favorites });//payload: res.data
  //catch
  //dispatch({ type: SET_FAVORITES_FAILURE, payload: error });

}


export const addFavorite = (favorite, userID) => dispatch => {

  console.log("ACTION ADDING FAV", favorite);
    dispatch({ type: ADD_FAVORITE_START });
    //hit endpoint POST userID and favorites
    //then
    //dispatch({ type: ADD_FAVORITE_SUCCESS, payload: res.favorites });//payload: res.data
    //catch
    //dispatch({ type: SET_FAVORITES_FAILURE, payload: error });
  
  }

  
export const removeFavorite = (favorite, userID) => dispatch => {

  // //TODO: Add eddpoint to set a user's favorites, have endpoint return the new list of favorites on success
  // console.log("ACTION SETTING FAVS", favorites);
  //   dispatch({ type: SET_FAVORITES_START });
  //   //hit endpoint POST userID and favorites
  //   //then
  //   dispatch({ type: SET_FAVORITES_SUCCESS, payload: favorites });//payload: res.data
  //   //catch
  //   //dispatch({ type: SET_FAVORITES_FAILURE, payload: error });
  
  }

export const fetchAllData = id => async dispatch => {

  if(!id){
    console.error("WARNING: ID IS UNDEFINED");
  }

  try {
    dispatch({ type: FETCH_TOP_AND_BOTTOM_START });
    dispatch({ type: FETCH_RATING_OVER_TIME_START });
    console.log("Attempting to get data from ", `https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=0`);
    const data = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=0`
    );
    console.log("\nData from viztype=0:\n", data);
    
    const {viztype0, viztype3} = data.data;
    console.log("viztype0: ", viztype0);
    console.log("viztype3: ", viztype3);    

    dispatch({ type: FETCH_TOP_AND_BOTTOM_SUCCESS, payload: viztype0 });
    dispatch({ type: FETCH_RATING_OVER_TIME_SUCCESS, payload: viztype3 });
  } catch (error) {
    console.error(
      `\nError getting data for topBottomWords and ratingOverTime\n${error}\n`
    );
    dispatch({ type: FETCH_TOP_AND_BOTTOM_FAILURE, payload: error });
    dispatch({ type: FETCH_RATING_OVER_TIME_FAILURE, payload: error });
  }

  try {
    dispatch({ type: FETCH_WORDS_OVER_TIME_START });
    const phraseRank = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=1`
    );
    dispatch({ type: FETCH_WORDS_OVER_TIME_SUCCESS, payload: phraseRank });
  } catch (error) {
    console.error(`\nError getting data for phraseRank\n${error}\n`);
    dispatch({ type: FETCH_WORDS_OVER_TIME_FAILURE, payload: error });
  }

  try {
    dispatch({ type: FETCH_REVIEWS_OVER_TIME_START });
    const reviewsOverTime = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=2`
    );
    console.log("Data in action for reviewsOverTime: ", reviewsOverTime);
    dispatch({
      type: FETCH_REVIEWS_OVER_TIME_SUCCESS,
      payload: reviewsOverTime
    });
  } catch (error) {
    console.error(`\nError getting data for reviewsOverTime\n${error}\n`);
    dispatch({ type: FETCH_REVIEWS_OVER_TIME_FAILURE, payload: error });
  }
};
