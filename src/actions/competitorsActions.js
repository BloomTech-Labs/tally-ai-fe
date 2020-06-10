import { axiosWithAuth } from '../auth/axiosWithAuth';

//adding competitors to user's competitor list
export const ADD_COMPETITOR_START = "ADD_COMPETITOR_START";
export const ADD_COMPETITOR_SUCCESS = "ADD_COMPETITOR_SUCCESS";
export const ADD_COMPETITOR_FAILURE = "ADD_COMPETITOR_FAILURE";

//removing competitors from user's competitor list
export const REMOVE_COMPETITOR_START = "REMOVE_COMPETITOR_START";
export const REMOVE_COMPETITOR_SUCCESS = "REMOVE_COMPETITOR_SUCCESS";
export const REMOVE_COMPETITOR_FAILURE = "REMOVE_COMPETITOR_FAILURE";

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