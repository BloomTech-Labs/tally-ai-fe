import { axiosWithAuth } from '../auth/axiosWithAuth'
import { axiosWithYelpAuth } from '../auth/axiosWithYelpAuth'

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
	//To do!!! set up fetchbusiness to return when user selects business
	// let location

	// // Check for type of location provided - coords or phrase (ie city, state, etc)?
	// if (business.location.latitude && business.location.longitude) {
	// 	location = `latitude=${business.location.latitude}&longitude=${business.location.longitude}`
	// } else if (business.location) {
	// 	location = `location=${business.location}`
	// } else {
	// 	dispatch({
	// 		type: FETCH_BUSINESS_FAILURE,
	// 		payload: 'Business location required'
	// 	})
	// }
	
	// axiosWithAuth()
	// 	.post("/business/search", business)
	// 		.then(res => {
	// 			console.log(res)
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// Dynamically generate endpoint using provided location and name
	// const yelpSearchEndpoint = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${name}&${location}` //I've tried like a million different solutions from Google to get this to work without a 403 and a CORS error, maybe someone else has ideas cause I give up

	// dispatch({ type: FETCH_BUSINESS_START })
	// console.log('Yelp API URL: ', yelpSearchEndpoint)
	// axiosWithAuth()
	// 	.post("/business/search", {})
	// 	.then(res => {
	// 		dispatch({
	// 			type: FETCH_BUSINESS_SUCCESS,
	// 			payload: res.data.businesses
	// 		})
	// 	})
	// 	.catch(err => {
	// 		dispatch({
	// 			type: FETCH_BUSINESS_FAILURE,
	// 			payload: err
	// 		})
	// 	})
}

export const selectBusiness = (
	previousBusinessInfo,
	businessInfo
) => dispatch => {
	//To DO!! update request since new user not signed in can request

	dispatch({type: SELECT_BUSINESS_START})

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

	let backendFormat = {
		name: businessInfo.businessName,
		city: businessInfo.city,
		state: businessInfo.state,
		yelp: {
			yelp_id: businessInfo.business_id,
			url: businessInfo.url,
			image_url: businessInfo.image_url
		}
	}

	console.log(
		'\nAdding business to the store...\n',
		backendFormat,
		businessInfo
	)
	//   business_id: "aC1dn3qBFxgk-OYC3hFMgQ"
	// businessName: "In The Bowl"
	// businessImg: "https://s3-media1.fl.yelpcdn.com/bphoto/NpaN9bQ0YsJfI6fEVL5_Qg/o.jpg"
	// reviewCount: 709
	// averageRating: 4
	// changeInRating: ""
	// url: "https://www.yelp.com/biz/in-the-bowl-seattle-2?adjust_creative=qO78hV4p7yy-o3z8K5osow&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qO78hV4p7yy-o3z8K5osow"
	// image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/NpaN9bQ0YsJfI6fEVL5_Qg/o.jpg"
	// city: "Seattle"
	// state: "WA"
	dispatch({ type: ADD_BUSINESS_START })
	//endpoint
	axiosWithAuth()
		.post(`/users/${userID}/business`, backendFormat)
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
