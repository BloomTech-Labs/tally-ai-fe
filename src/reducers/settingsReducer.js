import {
	FETCH_EDITACCOUNT_START,
	FETCH_EDITACCOUNT_SUCCESS,
	FETCH_EDITACCOUNT_FAILURE
} from '../actions/settingsActions'

const initialState = {
	loggedInUser: {
		data: {
			firstName: null,
			lastName: null
		},
		shouldUpdate: true,
		isFetching: false,
		error: null
	}
}

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		// Edit Account
		case FETCH_EDITACCOUNT_START:
			return {
				...state,
				loggedInUser: {
					...state.loggedInUser,
					isFetching: true,
					error: null
				}
			}
		case FETCH_EDITACCOUNT_SUCCESS: //TODO: update activeWidgets with action.payload.preferences.widgets
			return {
				...state,
				loggedInUser: {
					data: {
						firstName: action.payload.first_name
							? action.payload.first_name
							: state.loggedInUser.data.firstName,
						lastName: action.payload.last_name_name
							? action.payload.last_name
							: state.loggedInUser.data.lastName
					},
					isFetching: false,
					error: null
				}
			}
		case FETCH_EDITACCOUNT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		case GET_USER_DATA_START:
			return {
				...state,
				loggedInUser: {
					...state.loggedInUser,
					isFetching: true
				}
			}
		case GET_USER_DATA_SUCCESS:
			console.log('Mapping over competitors', action.payload.competitors)
			return {
				...state,
				competitors: {
					...state.competitors,
					businesses: action.payload.competitors.map(business => {
						return {
							id: business.id,
							businessId: business.yelp.yelp_id, //default tab selected by default
							// for side bar
							businessName: business.name,
							businessImg: business.yelp.image_url,
							// for top-of-page info cards
							reviewCount: 0,
							averageRating: 0,
							changeInRating: ''
						}
					}),
					isSetting: false,
					error: null
				},
				loggedInUser: {
					...state.loggedInUser,
					data: action.payload.loggedInUser,
					isFetching: false
				},
				userBusinesses: {
					...state.userBusinesses,
					businesses: action.payload.businesses.map(business => {
						return {
							id: business.id,
							businessId: business.yelp.yelp_id, //default tab selected by default
							// for side bar
							businessName: business.name,
							businessImg: business.yelp.image_url,
							// for top-of-page info cards
							reviewCount: 0,
							averageRating: 0,
							changeInRating: ''
						}
					}),
					isSetting: false,
					error: null
				},
				activeWidgets: [widgets[0].name, widgets[1].name],
				tabs: {
					...state.tabs,
					activeTabs: action.payload.activeTabs
				}
			}

		case UPDATE_LOGGED_IN_USER:
			return {
				...state,
				loggedInUser: {
					...state.loggedInUser,
					shouldUpdate: action.payload
				}
			}
		default:
			return state
	}
}

export default settingsReducer
