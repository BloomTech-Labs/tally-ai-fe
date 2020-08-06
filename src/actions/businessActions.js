import { axiosWithAuth } from '../auth/axiosWithAuth'

// Yelp Business Search
export const FETCH_BUSINESS_START = 'FETCH_BUSINESS_START'
export const FETCH_BUSINESS_SUCCESS = 'FETCH_BUSINESS_SUCCESS'
export const FETCH_BUSINESS_FAILURE = 'FETCH_BUSINESS_FAILURE'

// Select business and add info to the store
export const SELECT_BUSINESS_START = 'SELECT_BUSINESS_START'
export const SELECT_BUSINESS_SUCCESS = 'SELECT_BUSINESS_SUCCESS'
export const SELECT_BUSINESS_FAILURE = 'SELECT_BUSINESS_FAILURE'

//adding businesses to user's owned businesses list
export const ADD_BUSINESS_START = 'ADD_BUSINESS_START'
export const ADD_BUSINESS_SUCCESS = 'ADD_BUSINESS_SUCCESS'
export const ADD_BUSINESS_FAILURE = 'ADD_BUSINESS_FAILURE'

//removing businesses from user's owned businesses list
export const REMOVE_BUSINESS_START = 'REMOVE_BUSINESS_START'
export const REMOVE_BUSINESS_SUCCESS = 'REMOVE_BUSINESS_SUCCESS'
export const REMOVE_BUSINESS_FAILURE = 'REMOVE_BUSINESS_FAILURE'

//adding competitors to user's competitor list
export const ADD_COMPETITOR_START = "ADD_COMPETITOR_START";
export const ADD_COMPETITOR_SUCCESS = "ADD_COMPETITOR_SUCCESS";
export const ADD_COMPETITOR_FAILURE = "ADD_COMPETITOR_FAILURE";

//removing competitors from user's competitor list
export const REMOVE_COMPETITOR_START = "REMOVE_COMPETITOR_START";
export const REMOVE_COMPETITOR_SUCCESS = "REMOVE_COMPETITOR_SUCCESS";
export const REMOVE_COMPETITOR_FAILURE = "REMOVE_COMPETITOR_FAILURE";

export const fetchBusinesses = business => dispatch => {
	console.log('action business query', business)

	const name = business.name
	const city = business.city
		dispatch({
			type: FETCH_BUSINESS_START,
		})	
	axiosWithAuth()
		.get(`/search?name=${name}&city=${city}`)
			.then(res => {
				console.log(res)
				dispatch({
					type: FETCH_BUSINESS_SUCCESS,
					payload: res.data
				})
			})
			.catch(err => {
				console.log(err.response)
				dispatch({
					type: FETCH_BUSINESS_FAILURE,
					payload: err.response.data
				})
			})
}

export const selectBusiness = (
	businessInfo
) => dispatch => {
	console.log(businessInfo)
	dispatch({type: SELECT_BUSINESS_SUCCESS, payload: businessInfo})
}

export const addBusiness = (businessInfo, userID) => dispatch => {
	console.log('business in addBusiness: ', businessInfo)

	console.log(
		'\nAdding business to the store...\n',
		businessInfo
	)
	dispatch({ type: ADD_BUSINESS_START })
	//endpoint
	axiosWithAuth()
		.post(`/users/${userID}/business`, businessInfo)
		.then(res => {
			dispatch({
				type: ADD_BUSINESS_SUCCESS,
				payload: res.data //new array after modification
			})
		})
		.catch(err => {
			dispatch({
				type: ADD_BUSINESS_FAILURE,
				payload: err
			})
		})
}

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

export const removeBusiness = (business_id, userID) => dispatch => {
	console.log('\removing business from the store...\n')
	//dispatch({ type: REMOVE_BUSINESS_START, payload: businessInfo });
	//DELETE /users/:id/business/:business_id
	dispatch({ type: REMOVE_BUSINESS_START })
	//endpoint
	axiosWithAuth()
		.delete(`/users/${userID}/business/${business_id}`)
		.then(res => {
			dispatch({
				type: REMOVE_BUSINESS_SUCCESS,
				payload: res.data.business_id 
			})
		})
		.catch(err => {
			dispatch({
				type: REMOVE_BUSINESS_FAILURE,
				payload: err
			})
		})
}

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

export const resetSearchResults = () => dispatch => {
	dispatch({ type: FETCH_BUSINESS_SUCCESS, payload: null })
}
