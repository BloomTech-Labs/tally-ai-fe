// Edit Account
export const FETCH_EDITACCOUNT_START = 'FETCH_EDITACCOUNT_START'
export const FETCH_EDITACCOUNT_SUCCESS = 'FETCH_EDITACCOUNT_SUCCESS'
export const FETCH_EDITACCOUNT_FAILURE = 'FETCH_EDITACCOUNT_FAILURE'

// User Data
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const GET_USER_DATA_START = 'GET_USER_DATA_START'
export const UPDATE_LOGGED_IN_USER = 'UPDATE_LOGGED_IN_USER'

export const fetchEditAccount = (id, newInfo) => dispatch => {
	dispatch({ type: FETCH_EDITACCOUNT_START })
	axiosWithAuth()
		.put('/users/' + id, newInfo)
		.then(
			res =>
				dispatch({ type: FETCH_EDITACCOUNT_SUCCESS, payload: res.data }) &
				console.log(res.data, 'fetchEditAccount')
		)
		.catch(err =>
			dispatch({ type: FETCH_EDITACCOUNT_FAILURE, payload: err.response })
		)
}

export const shouldUpdateLoggedInUser = shouldUpdate => dispatch => {
	dispatch({ type: UPDATE_LOGGED_IN_USER, payload: shouldUpdate })
}

export const setUserInfo = userData => dispatch => {
	dispatch({ type: GET_USER_DATA_SUCCESS, payload: userData })
}

export const getUserInfo = userID => dispatch => {
	dispatch({ type: GET_USER_DATA_START })
	axiosWithAuth()
		.get('users/' + userID)
		.then(res => {
			//so map data from res.data into that format
			let userInfo = {
				competitors: res.data.favorites,
				loggedInUser: {
					firstName: res.data.first_name,
					lastName: res.data.last_name
				},
				businesses: res.data.businesses,
				activeWidgets:
					res.data.preferences && res.data.preferences.activeWidgets
						? res.data.preferences.activeWidgets
						: [],
				activeTabs:
					res.data.preferences && res.data.preferences.activeTabs
						? res.data.preferences.activeTabs
						: []
			}
			console.log('Got user data, ', res) //{user_id: 13, first_name: "Test", last_name: "Test", businesses: Array(0), favorites: Array(0)}
			dispatch({ type: GET_USER_DATA_SUCCESS, payload: userInfo })
		})
		.catch(err => {
			console.error('Error getting user data', err)
		})
}
