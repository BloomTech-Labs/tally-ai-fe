import { axiosWithAuth } from '../auth/axiosWithAuth';

import {
	ADD_BUSINESS_START,
	ADD_BUSINESS_SUCCESS,
	ADD_BUSINESS_FAILURE,
	ADD_COMPETITOR_START,
	ADD_COMPETITOR_SUCCESS,
	ADD_COMPETITOR_FAILURE,
	SELECT_BUSINESS_SUCCESS
} from "./businessActions";


// Edit Account
export const FETCH_EDITACCOUNT_START = 'FETCH_EDITACCOUNT_START'
export const FETCH_EDITACCOUNT_SUCCESS = 'FETCH_EDITACCOUNT_SUCCESS'
export const FETCH_EDITACCOUNT_FAILURE = 'FETCH_EDITACCOUNT_FAILURE'

// User Data
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const UPDATE_LOGGED_IN_USER = 'UPDATE_LOGGED_IN_USER'

//Favorites
export const SET_FAVORITES_START = "SET_FAVORITES_START";
export const SET_FAVORITES_FAILURE = "SET_FAVORITES_FAILURE";
export const SET_FAVORITES_SUCCESS = "SET_FAVORITES_SUCCESS";

export const ADD_FAVORITE_START = "ADD_FAVORITE_START";
export const ADD_FAVORITE_FAILURE = "ADD_FAVORITE_FAILURE";
export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";

export const REMOVE_FAVORITE_START = "REMOVE_FAVORITE_START";
export const REMOVE_FAVORITE_FAILURE = "REMOVE_FAVORITE_FAILURE";
export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";

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

export const fetchEditAccount = (id, newInfo) => dispatch => {
	dispatch({ type: FETCH_EDITACCOUNT_START })
	axiosWithAuth()
		.put('/users/' + id, newInfo)
		.then(
			res =>
				dispatch({ type: FETCH_EDITACCOUNT_SUCCESS, payload: res.data }) &
				console.log(res.data, 'fetchEditAccount')
		)
		.catch(err =>{
			const {data, status} = err.response
			dispatch({ type: FETCH_EDITACCOUNT_FAILURE, payload:{...data,status} })
			console.log({...data,status})
		})
}

export const shouldUpdateLoggedInUser = shouldUpdate => dispatch => {
	dispatch({ type: UPDATE_LOGGED_IN_USER, payload: shouldUpdate })
}

export const setUserInfo = userData => dispatch => {
	dispatch({ type: GET_USER_DATA_SUCCESS, payload: userData })
	///need update for businesses dispatch
}

export const getUserInfo = userID => dispatch => {
	dispatch({ type: GET_USER_DATA_START })
	axiosWithAuth()
		.get('users/' + userID)
		.then(res => {
			// businesses: (2) [{…}, {…}]
			// competitors: []
			// first_name: "Adrian"
			// last_name: "Parra"
			// preferences: null
			// type: "tally"
			// user_id: 6
			dispatch({ type: GET_USER_DATA_SUCCESS, payload: res.data })
			dispatch({ type: ADD_BUSINESS_SUCCESS, payload: res.data.businesses })
			dispatch({ type: ADD_COMPETITOR_SUCCESS, payload: res.data.competitors })
			dispatch({ type: SELECT_BUSINESS_SUCCESS, payload: {
				business_id: null, 
				businessName: null,
				review_count: 0,
				business_stars: 0,
				changeInRating: '',
				address: '',
				}
			})

		})
		.catch(err => {
			console.error('Error getting user data', err)
		})
}
