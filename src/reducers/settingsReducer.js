import {
	FETCH_EDITACCOUNT_START,
	FETCH_EDITACCOUNT_SUCCESS,
	FETCH_EDITACCOUNT_FAILURE,
	GET_USER_DATA_START,
	GET_USER_DATA_SUCCESS,
	UPDATE_LOGGED_IN_USER
} from '../actions/settingsActions'

import {widgets} from '../components/WidgetSystem/WidgetRegistry';

const initialState = {
	data: {
		firstName: null,
		lastName: null,
		userId: null,
		type: null,
	},
	shouldUpdate: true,
	isFetching: false,
	error: null,
	success: null
}

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		// Edit Account
		case FETCH_EDITACCOUNT_START:
			return {
				...state,
				isFetching: true,
				success: null,
				error: null
				
			}
		case FETCH_EDITACCOUNT_SUCCESS: //TODO: update activeWidgets with action.payload.preferences.widgets
			return {
				...state,
				data: {
					firstName: action.payload.first_name,
					lastName: action.payload.last_name,
					userId: action.payload.id,
					type: action.payload.type,
				},
				isFetching: false,
				success: true,
				error: null
				
			}
		case FETCH_EDITACCOUNT_FAILURE:
			return {
				...state,
				isFetching: false,
				success: false,
				error: action.payload
			}
		case GET_USER_DATA_START:
			return {
				...state,
				isFetching: true,
				error: false
				
			}
		case GET_USER_DATA_SUCCESS:
			console.log('State', state)
			console.log('Payload', action.payload)

			return {
				...state,
				data: {
					userId: action.payload.user_id,
					firstName: action.payload.first_name,
					lastName: action.payload.last_name,
					type: action.payload.type,

				},
				isFetching: false,
				error: null,
				shouldUpdate: false,
			}

		case UPDATE_LOGGED_IN_USER:
			return {
				...state,
				shouldUpdate: action.payload

			}
		default:
			return state
	}
}

export default settingsReducer
