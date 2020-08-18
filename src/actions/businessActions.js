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

//fetch business by name
export const FETCH_BUSINESS_BY_NAME_START = 'FETCH_BUSINESS_BY_NAME_START'
export const FETCH_BUSINESS_BY_NAME_SUCCESS = 'FETCH_BUSINESS_BY_NAME_SUCCESS'
export const FETCH_BUSINESS_BY_NAME_FAILURE = 'FETCH_BUSINESS_BY_NAME_FAILURE'

//adding competitors to user's competitor list
export const ADD_COMPETITOR_START = 'ADD_COMPETITOR_START'
export const ADD_COMPETITOR_SUCCESS = 'ADD_COMPETITOR_SUCCESS'
export const ADD_COMPETITOR_FAILURE = 'ADD_COMPETITOR_FAILURE'

//removing competitors from user's competitor list
export const REMOVE_COMPETITOR_START = 'REMOVE_COMPETITOR_START'
export const REMOVE_COMPETITOR_SUCCESS = 'REMOVE_COMPETITOR_SUCCESS'
export const REMOVE_COMPETITOR_FAILURE = 'REMOVE_COMPETITOR_FAILURE'

//fetch all business names
export const FETCH_BUSINESS_NAMES_START = 'FETCH_BUSINESS_NAMES_START'
export const FETCH_BUSINESS_NAMES_SUCCESS = 'FETCH_BUSINESS_NAMES_SUCCESS'
export const FETCH_BUSINESS_NAMES_FAILURE = 'FETCH_BUSINESS_NAMES_FAILURE'

export const fetchBusinessNames = () => async dispatch => {
	try {
		dispatch({ type: FETCH_BUSINESS_NAMES_START })
		const { data: businesses } = await axiosWithAuth().get('/search/names')

		if (businesses) {
			const businessNamesInsensitive = businesses.map(
				({ name, cuisine }, index) => {
					return {
						cuisine,
						businessName: name,
						businessNameLowerCase: name.toLowerCase(),
						index
					}
				}
			)
			dispatch({
				type: FETCH_BUSINESS_NAMES_SUCCESS,
				payload: businessNamesInsensitive
			})
		}
	} catch (error) {
		console.error(`Error fetching business names: ${error}`)
		dispatch({ type: FETCH_BUSINESS_NAMES_FAILURE, payload: error })
	}
}

export const fetchBusinessBy = (query, value) => async dispatch => {
	try {
		dispatch({ type: FETCH_BUSINESS_BY_NAME_START })
		const { data: business } = await axiosWithAuth().get(
			`/search?${query}=${value}`
		)
		console.log({ business })
		business &&
			dispatch({ type: FETCH_BUSINESS_BY_NAME_SUCCESS, payload: business })
	} catch (err) {
		console.error({ err })
		dispatch({ type: FETCH_BUSINESS_BY_NAME_FAILURE, payload: err })
	}
}

export const fetchBusinesses = business => dispatch => {
	console.log('action business query', business)

	const name = business.name
	const city = business.city
	dispatch({
		type: FETCH_BUSINESS_START
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

export const selectBusiness = businessInfo => dispatch => {
	console.log(businessInfo)
	dispatch({ type: SELECT_BUSINESS_SUCCESS, payload: businessInfo })
}

export const addBusiness = (businessInfo, userID) => dispatch => {
	console.log('\nAdding business to the store...\n', businessInfo)
	dispatch({ type: ADD_BUSINESS_START })
	//endpoint
	axiosWithAuth()
		.post(`/users/${userID}/business`, businessInfo)
		.then(res => {
			dispatch({
				type: ADD_BUSINESS_SUCCESS,
				payload: res.data.businesses //new array after modification
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
	console.log('\nAdding competitor to the store...\n', businessInfo)
	//dispatch({ type: ADD_BUSINESS, payload: businessInfo });

	dispatch({ type: ADD_COMPETITOR_START })
	//endpoint
	axiosWithAuth()
		.post(`/users/${userID}/favorite`, businessInfo)
		.then(res => {
			console.log('Add competitor success, result:', res)
			dispatch({
				type: ADD_COMPETITOR_SUCCESS,
				payload: res.data.competitors
			})
		})
		.catch(err => {
			dispatch({
				type: ADD_COMPETITOR_FAILURE,
				payload: err.response
			})
		})
}

export const removeBusiness = (business_id, userID) => dispatch => {
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
				payload: err.response
			})
		})
}

export const removeCompetitor = (businessID, userID) => dispatch => {

	dispatch({ type: REMOVE_COMPETITOR_START })
	//endpoint
	axiosWithAuth()
		.delete(`/users/${userID}/favorite/${businessID}`)
		.then(res => {
			dispatch({
				type: REMOVE_COMPETITOR_SUCCESS,
				payload: res.data.competitor_id //new array after modification
			})
		})
		.catch(err => {
			dispatch({
				type: REMOVE_COMPETITOR_FAILURE,
				payload: err
			})
		})
}

export const resetSearchResults = () => dispatch => {
	dispatch({ type: FETCH_BUSINESS_SUCCESS, payload: null })
}
