import {
	// Yelp Business Search
	FETCH_BUSINESS_START,
	FETCH_BUSINESS_SUCCESS,
	FETCH_BUSINESS_FAILURE,
	// Select business from results
	SELECT_BUSINESS_START,
	SELECT_BUSINESS_SUCCESS,
	SELECT_BUSINESS_FAILURE,

	//adding businesses to user's owned businesses list
	ADD_BUSINESS_START,
	ADD_BUSINESS_SUCCESS,
	ADD_BUSINESS_FAILURE,

	//removing businesses from user's owned businesses list
	REMOVE_BUSINESS_START,
	REMOVE_BUSINESS_SUCCESS,
	REMOVE_BUSINESS_FAILURE,

	ADD_COMPETITOR_START,
    ADD_COMPETITOR_SUCCESS,
	ADD_COMPETITOR_FAILURE,
	

    REMOVE_COMPETITOR_START,
    REMOVE_COMPETITOR_SUCCESS,
    REMOVE_COMPETITOR_FAILURE
} from '../actions/businessActions'

// 							id: business.id,
// 							businessId: business.yelp_id, //default tab selected by default
// 							// for side bar
// 							businessName: business.name,
// 							businessImg: business.image_url,
// 							// for top-of-page info cards
// 							reviewCount: 0,
// 							averageRating: 0,
// 							changeInRating: ''

const initialState = {
	isSetting: false,
	error: null,
	
	businesses: [],

	competitors: [],

	currentlySelectedBusiness: {
		business_id: null, 
		businessName: null,
		review_count: 0,
		business_stars: 0,
		changeInRating: '',
		address: '',
		isFetching: false,
		error: null
	},

	searchResults: {
		isFetching: false,
		error: null,
		data:  null
	}
}

function businessReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_BUSINESS_START:
			return {
				...state,
				searchResults: {
					data: null,
					isFetching: true,
					error: null
				}
			}
		case FETCH_BUSINESS_SUCCESS:
			return {
				...state,
				searchResults: {
					...state.searchResults,
					isFetching: false,
					data: action.payload,
					error: null
				}
			}
		case FETCH_BUSINESS_FAILURE:
			return {
				...state,
				searchResults: {
					...state.searchResults,
					isFetching: false,
					data: [],
					error: action.payload.message
				}
			}

		case SELECT_BUSINESS_START:
			return {
				...state,
				currentlySelectedBusiness: { 
					...state.currentlySelectedBusiness,
					business_id: action.payload,
					isFetching: true,
					error: null
				}
			}
		case SELECT_BUSINESS_SUCCESS:
			return {
				...state,
				currentlySelectedBusiness: { 
					business_id: action.payload.business_id,
					businessName: action.payload.name,
					review_count: action.payload.review_count,
					business_stars: action.payload.business_stars,
					cuisine: action.payload.cuisine,
					address: action.payload.address,
					zipcode: action.payload.zipcode,
					city: action.payload.city,
					isFetching: false,
					error: null,
				} 
			}
		case SELECT_BUSINESS_FAILURE:
			return {
				...state,
				currentlySelectedBusiness: { 
					...state.currentlySelectedBusiness,
					business_id: null,
					isFetching: false,
					error: action.payload
				} 
			}

		case ADD_BUSINESS_START:			
			return {
				...state,
				businesses: state.businesses,
				isSetting: false,
				error: null
			}
		case ADD_BUSINESS_SUCCESS:
			console.log(action.payload)
			return {
				...state,
				businesses: action.payload.map(business => {
					return {
						business_id: business.business_id,
						businessName: business.name,
						address: business.address,
						city: business.city,
						zipcode: business.zipcode,
						cuisine: business.cuisine,
						review_count : business.review_count,
						business_stars: business.business_stars
					}
				}),
				isSetting: false,
				error: null
			}
		case ADD_BUSINESS_FAILURE:
			return {
				...state,

				isSetting: false,
				error: action.payload
			}

		case REMOVE_BUSINESS_START:
			return {
				...state,
				isSetting: true,
				error: null
			}

		case REMOVE_BUSINESS_SUCCESS:
			return {
				...state,

				businesses: state.businesses.filter(business => {
					///will filter out business removed
					return action.payload !== business.business_id
				}),
				isSetting: false,
				error: null
				
			}
		case REMOVE_BUSINESS_FAILURE:
			return {
				...state,
				isSetting: false,
				error: action.payload
			}
		case ADD_COMPETITOR_START:
			return {
				...state,
				isSetting: true,
				error: null
			}
		case ADD_COMPETITOR_SUCCESS:
			return {
				...state,
				competitors: action.payload.map(business => {
					return {
						business_id: business.business_id,
						businessName: business.name,
						address: business.address,
						city: business.city,
						zipcode: business.zipcode,
						cuisine: business.cuisine,
						review_count : business.review_count,
						business_stars: business.business_stars
					}
				}),
				isSetting: false,
				error: null
			}
		case ADD_COMPETITOR_FAILURE: 
			return {
				...state,
				isSetting: false,
				error: action.payload
			}
		case REMOVE_COMPETITOR_START:
			return {
				...state,
				isSetting: true,
				error: null
			}
		case REMOVE_COMPETITOR_SUCCESS:
			return {
				...state,

				competitors: state.competitors.filter(business => {
					///will filter out business removed
					return action.payload !== business.business_id
				}),
				isSetting: false,
				error: null
				
			}
		case REMOVE_COMPETITOR_FAILURE:
			return {
				...state,
				isSetting: false,
				error: action.payload
			}
		default:
			return state
	}
}

export default businessReducer
