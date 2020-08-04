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

export const fetchBusinesses = business => dispatch => {
	console.log('action business query', business)

	const name = business.name
		dispatch({
			type: FETCH_BUSINESS_START,
		})	
	axiosWithAuth()
		.post("/search", business)
			.then(res => {
				console.log(res)
				dispatch({
					type: FETCH_BUSINESS_SUCCESS,
					payload: res.data
				})
			})
			.catch(err => {
				console.log(err)
				dispatch({
					type: FETCH_BUSINESS_FAILURE,
					payload: err
				})
			})
}

export const selectBusiness = (
	businessInfo
) => dispatch => {
	//To DO!! update request since new user not signed in can request

	dispatch({type: SELECT_BUSINESS_START, payload: businessInfo.business_id})

	axiosWithAuth()
		.get(`/business/${businessInfo.business_id}`)
		.then(res => {
			const businessData = res.data[0]
			dispatch({type: SELECT_BUSINESS_SUCCESS, payload: businessData})

// 			address: "2706 E University Dr"
		// attributes: "{'Caters': 'False', 'OutdoorSeating': 'False', 'BusinessAcceptsCreditCards': 'True', 'BikeParking': 'True', 'HasTV': 'True', 'RestaurantsAttire': "u'casual'", 'RestaurantsDelivery': 'True', 'RestaurantsReservations': 'False', 'RestaurantsTakeOut': 'True', 'Alcohol': "u'none'", 'GoodForKids': 'True', 'RestaurantsPriceRange2': '1', 'BusinessParking': "{'garage': False, 'street': False, 'validated': False, 'lot': False, 'valet': False}", 'Ambience': "{'touristy': False, 'hipster': False, 'romantic': False, 'divey': False, 'intimate': False, 'trendy': False, 'upscale': False, 'classy': False, 'casual': False}", 'WiFi': "u'no'", 'NoiseLevel': "u'quiet'", 'RestaurantsGoodForGroups': 'True', 'GoodForMeal': "{'dessert': False, 'latenight': False, 'lunch': True, 'dinner': True, 'brunch': False, 'breakfast': False}"}"
		// business_id: "j9bWpCRwpDVfwVT_V85qeA"
		// business_stars: 2.5
		// city: "Mesa"
		// cuisine: "thai"
		// latitude: 33.4237052
		// longitude: -111.7728895
		// name: "Papaya Thai"
		// review_count: 130
		// zipcode: "85213"
		})
		.catch(err => {
			console.log(err)
			dispatch({type: SELECT_BUSINESS_FAILURE, payload: err})
		})
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
				payload: res.data //new array after modification
			})
		})
		.catch(err => {
			dispatch({
				type: REMOVE_BUSINESS_FAILURE,
				payload: err
			})
		})
}

export const resetSearchResults = () => dispatch => {
	dispatch({ type: FETCH_BUSINESS_SUCCESS, payload: null })
}
