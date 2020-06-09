import { combineReducers } from 'redux'
import businessReducer from '../reducers/businessReducer'
import competitorReducer from '../reducers/competitorReducer'
import settingsReducer from '../reducers/settingsReducer'
import widgetsReducer from '../reducers/widgetsReducer'

const rootReducer = combineReducers({
	business: businessReducer,
	competitor: competitorReducer,
	settings: settingsReducer,
	widgets: widgetsReducer
})

export default rootReducer
