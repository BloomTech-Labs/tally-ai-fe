import { axiosWithYelpAuth } from "../auth/axiosWithYelpAuth";
import { axiosWithAuth } from "../auth/axiosWithAuth";
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
export const SELECT_BUSINESS = "SELECT_BUSINESS";

//adding businesses to user's owned businesses list
export const ADD_BUSINESS_START = "ADD_BUSINESS_START";
export const ADD_BUSINESS_SUCCESS = "ADD_BUSINESS_SUCCESS";
export const ADD_BUSINESS_FAILURE = "ADD_BUSINESS_FAILURE";

//removing businesses from user's owned businesses list
export const REMOVE_BUSINESS_START = "REMOVE_BUSINESS_START";
export const REMOVE_BUSINESS_SUCCESS = "REMOVE_BUSINESS_SUCCESS";
export const REMOVE_BUSINESS_FAILURE = "REMOVE_BUSINESS_FAILURE";

//adding competitors to user's competitor list
export const ADD_COMPETITOR_START = "ADD_COMPETITOR_START";
export const ADD_COMPETITOR_SUCCESS = "ADD_COMPETITOR_SUCCESS";
export const ADD_COMPETITOR_FAILURE = "ADD_COMPETITOR_FAILURE";

//removing competitors from user's competitor list
export const REMOVE_COMPETITOR_START = "REMOVE_COMPETITOR_START";
export const REMOVE_COMPETITOR_SUCCESS = "REMOVE_COMPETITOR_SUCCESS";
export const REMOVE_COMPETITOR_FAILURE = "REMOVE_COMPETITOR_FAILURE";


// TopBottomWords
export const FETCH_TOP_AND_BOTTOM_START = "FETCH_TOP_AND_BOTTOM_START";
export const FETCH_TOP_AND_BOTTOM_SUCCESS = "FETCH_TOP_AND_BOTTOM_SUCCESS";
export const FETCH_TOP_AND_BOTTOM_FAILURE = "FETCH_TOP_AND_BOTTOM_FAILURE";

// ReviewFrequency
export const FETCH_RATING_OVER_TIME_START = "FETCH_RATING_OVER_TIME_START";
export const FETCH_RATING_OVER_TIME_SUCCESS = "FETCH_RATING_OVER_TIME_SUCCESS";
export const FETCH_RATING_OVER_TIME_FAILURE = "FETCH_RATING_OVER_TIME_FAILURE";

// Registration
// export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// export const REGISTER_FAILURE = "REGISTER_FAILURE";
// export const REGISTER_START = "REGISTER_START";

// // Login
// export const LOGIN_START = "LOGIN_START";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Logout
// export const LOGOUT_USER = "LOGOUT_USER";

export const UPDATE_LOGGED_IN_USER = "UPDATE_LOGGED_IN_USER";

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

export const SET_TABS_START = "SET_TABS_START";
export const SET_TABS_FAILURE = "SET_TABS_FAILURE";
export const SET_TABS_SUCCESS = "SET_TABS_SUCCESS";

export const SET_FAVORITES_START = "SET_FAVORITES_START";
export const SET_FAVORITES_FAILURE = "SET_FAVORITES_FAILURE";
export const SET_FAVORITES_SUCCESS = "SET_FAVORITES_SUCCESS";

export const ADD_FAVORITE_START = "ADD_FAVORITE_START";
export const ADD_FAVORITE_FAILURE = "ADD_FAVORITE_FAILURE";
export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";

export const REMOVE_FAVORITE_START = "REMOVE_FAVORITE_START";
export const REMOVE_FAVORITE_FAILURE = "REMOVE_FAVORITE_FAILURE";
export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";

export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_START = "GET_USER_DATA_START";

export const UPDATE_YELP_DATA_START = "UPDATE_YELP_DATA_START";
export const UPDATE_YELP_DATA_SUCCESS = "UPDATE_YELP_DATA_SUCCESS";
export const UPDATE_YELP_DATA_FAILURE = "UPDATE_YELP_DATA_FAILURE";

export const FETCH_RADAR_START = "FETCH_RADAR_START";
export const FETCH_RADAR_SUCCESS = "FETCH_RADAR_SUCCESS";
export const FETCH_RADAR_FAILURE = "FETCH_RADAR_FAILURE";

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

export const setActiveWidgets = (widgetArray) => dispatch => {
  dispatch({ type: SET_ACTIVE_WIDGETS, payload: widgetArray });
}

export const setActiveTabs = (oldTabsArray, newTabsArray, userID) => dispatch => {
  console.log("Setting tabs on back end to ", newTabsArray);
  dispatch({ type: SET_TABS_START, payload: newTabsArray});//predict that the request will be successful and update state immediatly so the user doesn't have to wait
  axiosWithAuth()
    .put("/users/" + userID, { preferences: { activeTabs: newTabsArray } })
    .then(res => console.log("TABS SET, RESULT: ", res) & dispatch({ type: SET_TABS_SUCCESS }))
    .catch(err => dispatch({ type: SET_TABS_FAILURE, payload: oldTabsArray }))//revert to old array if an error occurs
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
export const selectBusiness = businessInfo => dispatch => {
  console.log("\nAdding business selection to the store...\n");
  dispatch({ type: SELECT_BUSINESS, payload: businessInfo });
};

// export const fetchBusinessData = id => dispatch => {
//   console.log(`\nFetching business data for business ID ${id}\n`);
//   // dispatch 
// }


// Select business and add info to the store at state.businessInfo
export const addBusiness = (businessInfo, userID) => dispatch => {
  console.log("business in addBusiness: ", businessInfo);
  // businessInfo must be in this format
  //   {
  //     "name": string,
  //     "city": string,
  //     "state": string,
  //     "yelp": {
  //         "id": string,
  //         "yelp_id": string,
  //         "url": string,
  //         "image_url": string
  //     }
  // }

  let backendFormat =
  {
    name: businessInfo.businessName,
    city: businessInfo.city,
    state: businessInfo.state,
    yelp: {
      yelp_id: businessInfo.businessId,
      url: businessInfo.url,
      image_url: businessInfo.image_url
    }
  }

  console.log("\nAdding business to the store...\n", backendFormat, businessInfo);
//   businessId: "aC1dn3qBFxgk-OYC3hFMgQ"
// businessName: "In The Bowl"
// businessImg: "https://s3-media1.fl.yelpcdn.com/bphoto/NpaN9bQ0YsJfI6fEVL5_Qg/o.jpg"
// reviewCount: 709
// averageRating: 4
// changeInRating: ""
// url: "https://www.yelp.com/biz/in-the-bowl-seattle-2?adjust_creative=qO78hV4p7yy-o3z8K5osow&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qO78hV4p7yy-o3z8K5osow"
// image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/NpaN9bQ0YsJfI6fEVL5_Qg/o.jpg"
// city: "Seattle"
// state: "WA"
  dispatch({ type: ADD_BUSINESS_START });
  //endpoint
  axiosWithAuth()
    .post(`/users/${userID}/business`, backendFormat)
    .then(res => {
      dispatch({
        type: ADD_BUSINESS_SUCCESS,
        payload: res.data//new array after modification
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_BUSINESS_FAILURE,
        payload: err
      });
    });

};


// Select business and add info to the store at state.businessInfo
export const removeBusiness = (businessID, userID) => dispatch => {
  console.log("\removing business from the store...\n");
  //dispatch({ type: REMOVE_BUSINESS_START, payload: businessInfo });
  //DELETE /users/:id/business/:business_id
  dispatch({ type: REMOVE_BUSINESS_START });
  //endpoint
  axiosWithAuth()
    .delete(`/users/${userID}/business/${businessID}`)
    .then(res => {
      dispatch({
        type: REMOVE_BUSINESS_SUCCESS,
        payload: res.data//new array after modification
      });
    })
    .catch(err => {
      dispatch({
        type: REMOVE_BUSINESS_FAILURE,
        payload: err
      });
    });

};


// Select business and add info to the store at state.businessInfo
export const addCompetitor = (businessInfo, userID) => dispatch => {
  console.log("\nAdding competitor to the store...\n");
  //dispatch({ type: ADD_BUSINESS, payload: businessInfo });
  let backendFormat =
  {
    name: businessInfo.businessName,
    city: businessInfo.city,
    state: businessInfo.state,
    yelp: {
      yelp_id: businessInfo.businessId,
      url: businessInfo.url,
      image_url: businessInfo.image_url
    }
  }
  console.log("Add competitor start, data:", backendFormat);
  dispatch({ type: ADD_COMPETITOR_START });
  //endpoint
  axiosWithAuth()
    .post(`/users/${userID}/favorite`, backendFormat)
    .then(res => {
      console.log("Add competitor success, result:", res);
      dispatch({
        type: ADD_COMPETITOR_SUCCESS,
        payload: res.data//new array after modification
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_COMPETITOR_FAILURE,
        payload: err
      });
    });
  //POST /users/:id/favorite
};


// Select business and add info to the store at state.businessInfo
export const removeCompetitor = (businessID, userID) => dispatch => {

  console.log("\Removing competitor from the store...\n");

  dispatch({ type: REMOVE_COMPETITOR_START });
  //endpoint
  axiosWithAuth()
    .delete(`/users/${userID}/favorite/${businessID}`)
    .then(res => {
      dispatch({
        type: REMOVE_COMPETITOR_SUCCESS,
        payload: res.data//new array after modification
      });
    })
    .catch(err => {
      dispatch({
        type: REMOVE_COMPETITOR_FAILURE,
        payload: err
      });
    });

  //dispatch({ type: ADD_BUSINESS, payload: businessInfo });
  //DELETE /users/:id/favorite/:business_id
};

export const searchResultsPlaceholder = results => dispatch => {
  console.log("searchResultsPlaceholder action working");

  dispatch({
    type: FETCH_BUSINESS_SUCCESS,
    payload: results
  });
};

// // Used at Registration
// export const registerUser = newUser => dispatch => {
//   console.log("User info: ", newUser);
//   dispatch({ type: REGISTER_START })
//   axios
//     .post(`https://tally-ai.herokuapp.com/api/auth/register`, newUser) //swap local host with https://tally-ai.herokuapp.com/api/auth/register
//     .then(
//       res => {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userID", res.data.userN.id);
//         dispatch({ type: REGISTER_SUCCESS, payload: res.data.userN.id });
//         console.log(res.data, "fetchAddNewUser");
//       }
//     )
//     .catch(err =>
//       dispatch({ type: FETCH_BUSINESS_FAILURE, payload: err.response })
//     );
// };

// Used at Logout
// export const logoutUser = () => ({
//   type: 'LOGOUT_USER'
// });

export const resetSearchResults = () => dispatch => {
  dispatch({ type: FETCH_BUSINESS_SUCCESS, payload: null });
}

//set user's store data
export const setUserInfo = (userData) => dispatch => {
  // userInfo: {  
  //   favorites
  //   loggedInUser
  //   businessInfo
  //   activeWidgets
  // }
  dispatch({ type: GET_USER_DATA_SUCCESS, payload: userData });

}

//get user data from the back end
export const getUserInfo = (userID) => dispatch => {
  // userInfo: {  
  //   favorites
  //   loggedInUser
  //   businessInfo
  //   activeWidgets
  // }
  dispatch({ type: GET_USER_DATA_START })
  axiosWithAuth()
    .get("users/" + userID)
    .then(res => {
      //setUserInfo expects
      // userInfo: {  
      //   favorites
      //   loggedInUser
      //   businessInfo
      //   activeWidgets
      // }
      //so map data from res.data into that format

      let userInfo = {
        competitors: res.data.favorites,
        loggedInUser: { firstName: res.data.first_name, lastName: res.data.last_name },
        businesses: res.data.businesses,
        activeWidgets: res.data.preferences && res.data.preferences.activeWidgets ? res.data.preferences.activeWidgets : [],
        activeTabs: res.data.preferences && res.data.preferences.activeTabs ? res.data.preferences.activeTabs : []
      }

      console.log("Got user data, ", res);//{user_id: 13, first_name: "Test", last_name: "Test", businesses: Array(0), favorites: Array(0)}
      dispatch({ type: GET_USER_DATA_SUCCESS, payload: userInfo })
    })
    .catch(err => {
      console.error("Error getting user data", err);
    })

}

// Used at Login
export const shouldUpdateLoggedInUser = (shouldUpdate) => dispatch => {

  dispatch({ type: UPDATE_LOGGED_IN_USER, payload: shouldUpdate });

};

// Used at Edit Account
export const fetchEditAccount = (id, newInfo) => dispatch => {
  //   newInfo: {
  //     "email": string (optional),
  //     "password": string (8 or more characters, optional),
  //     "first_name": string (optional),
  //     "last_name": string (optional),
  //     "preferences": {
  //         "widgets": array (optional)
  //     }
  // }
  dispatch({ type: FETCH_EDITACCOUNT_START });
  axiosWithAuth()
    .put("/users/" + id, newInfo)
    .then(res => dispatch({ type: FETCH_EDITACCOUNT_SUCCESS, payload: res.data }) & console.log(res.data, "fetchEditAccount"))
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

  //   {
  //     "email": string (optional),
  //     "password": string (8 or more characters, optional),
  //     "first_name": string (optional),
  //     "last_name": string (optional),
  //     "preferences": {
  //         "widgets": array (optional)
  //     }
  // }
  // console.log("ACTION ADDING FAV", favorite);
  //   dispatch({ type: ADD_FAVORITE_START });
  //   //hit endpoint POST userID and favorites
  //   //then
  //   axiosWithAuth()
  //   .put("users/" + userID, ) //endpoint goes here
  //   .then(res => dispatch({ type: FETCH_EDITACCOUNT_SUCCESS, payload: newInfo }) & console.log(res.data, "fetchEditAccount"))
  //   .catch(err => dispatch({ type: FETCH_EDITACCOUNT_FAILURE, payload: err.response }))
  //   dispatch({ type: ADD_FAVORITE_SUCCESS, payload: res.favorites });//payload: res.data
  //   //catch
  //   //dispatch({ type: SET_FAVORITES_FAILURE, payload: error });

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

  if (!id) {
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

    const { viztype0, viztype3 } = data.data;
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

  dispatch({ type: FETCH_RADAR_START });
  axiosWithAuth()
  .get(`https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=4`)
  .then((res) => {
    dispatch({ type: FETCH_RADAR_SUCCESS, payload: res.data});
  })
  .catch((err) => {
    dispatch({ type: FETCH_RADAR_FAILURE, payload: err});
  })

};
