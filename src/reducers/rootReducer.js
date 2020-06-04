import {combineReducers} from 'redux'
import bussinessReducer from '../reducers/businessReducer';
import competitorReducer from '../reducers/competitorReducer';

const rootReducer = combineReducers({
  businesses: bussinessReducer,
  competitor: competitorReducer
});

export default rootReducer;