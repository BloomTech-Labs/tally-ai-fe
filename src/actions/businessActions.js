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

  export const selectBusiness = (previousBusinessInfo, businessInfo) => dispatch => {
    if(businessInfo){//only request yelp data if both previous and new info are provided. This is useful while selecting new tabs
      console.error("SECOND PARAMETER PROVIDED, not selecting new tab, params: ", previousBusinessInfo, businessInfo);
    dispatch({ type: SELECT_BUSINESS_START, payload: businessInfo });//Predict that the selection will be successful by setting currentlySelectedBusiness immediatly, so that the user doesn't need to wait until address/rating info is gotten
    axiosWithYelpAuth()
    .get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + businessInfo.businessId)
    .then(res => {
      dispatch({ type: SELECT_BUSINESS_SUCCESS, payload: {...businessInfo, address: res.data.location.display_address, reviewCount: res.data.review_count, averageRating: res.data.rating} });
    })
    .catch(err => {
      dispatch({
        type: SELECT_BUSINESS_FAILURE,
        payload: previousBusinessInfo//revert back!
      });
    });
  }else{
    dispatch({ type: SELECT_BUSINESS_SUCCESS, payload: previousBusinessInfo });
  }
    console.log("\nAdding business selection to the store...\n");
  };

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

  export const resetSearchResults = () => dispatch => {
    dispatch({ type: FETCH_BUSINESS_SUCCESS, payload: null });
  }