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
} from '../actions/bussinessAction';
import bussinessreducer from '.';

export default bussinessreducer

