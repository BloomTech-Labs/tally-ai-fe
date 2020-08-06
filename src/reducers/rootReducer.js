import { combineReducers } from 'redux'
import businessReducer from '../reducers/businessReducer'
import settingsReducer from '../reducers/settingsReducer'
import widgetsReducer from '../reducers/widgetsReducer'

const rootReducer = combineReducers({
	business: businessReducer,
	settings: settingsReducer,
	widgets: widgetsReducer
})

export default rootReducer
