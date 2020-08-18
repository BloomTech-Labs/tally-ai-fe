import {
	// Fetch business names
	FETCH_BUSINESS_NAMES_START,
	FETCH_BUSINESS_NAMES_SUCCESS,
	FETCH_BUSINESS_NAMES_FAILURE,

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

	//fetch business by name
	FETCH_BUSINESS_BY_NAME_START,
	FETCH_BUSINESS_BY_NAME_SUCCESS,
	FETCH_BUSINESS_BY_NAME_FAILURE,
	ADD_COMPETITOR_START,
	ADD_COMPETITOR_SUCCESS,
	ADD_COMPETITOR_FAILURE,
	REMOVE_COMPETITOR_START,
	REMOVE_COMPETITOR_SUCCESS,
	REMOVE_COMPETITOR_FAILURE
} from '../actions/businessActions'

const initialState = {
	isSetting: false,
	error: null,
	loading: false,
	businessNames: [],
	businesses: [],
	competitors: [],
	currentlySelectedBusiness: {
		business_id: null,
		name: null,
		review_count: 0,
		business_stars: 0,
		address: '',
		isFetching: false,
		error: null
	},
	searchResults: {
		isFetching: false,
		error: null,
		data: null
	}
}

function businessReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_BUSINESS_NAMES_START:
			return {
				...state,
				loading: true
			}

		case FETCH_BUSINESS_NAMES_SUCCESS:
			return {
				...state,
				loading: false,
				businessNames: action.payload
			}

		case FETCH_BUSINESS_NAMES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload
			}

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
					...action.payload,

					isFetching: false,
					error: null
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
				businesses: action.payload,
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
				competitors: action.payload,
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
		case FETCH_BUSINESS_BY_NAME_START:
			return {
				...state,
				searchResults: {
					isFetching: true,
					error: null,
					data: null
				}
			}
		case FETCH_BUSINESS_BY_NAME_SUCCESS:
			return {
				...state,
				searchResults: {
					isFetching: false,
					error: null,
					data: action.payload
				}
			}
		case FETCH_BUSINESS_BY_NAME_FAILURE:
			return {
				...state,
				searchResults: {
					isFetching: false,
					error: action.payload,
					data: null
				}
			}
		default:
			return state
	}
}

export default businessReducer
