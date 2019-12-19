import {
  FETCH_BUSINESS_START,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  POST_BUSINESS_START,
  POST_BUSINESS_SUCCESS,
  POST_BUSINESS_FAILURE
} from "../actions/index.js";

const initialState = {
  searchResults: { isFetching: false, error: null, data: null },
  keyWords: { isFetching: false, error: null, data: {positive:[{term: "apple"}, {term: "banana"}] }}
};

function reducer(state = initialState, action) {
  console.log(
    "Reducer working, current action: ",
    action.type,
    " Payload: ",
    action.payload
  );

  switch (action.type) {
    case FETCH_BUSINESS_START:
      return {
        ...state,
        searchResults: { ...state.searchResults, isFetching: true }
      };

    case FETCH_BUSINESS_SUCCESS:
      console.log("FETCH SUCCESS! Payload:", action.payload);
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          // data: action.payload
          data: action.payload.data.businesses
        }
      };

    case FETCH_BUSINESS_FAILURE:
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          error: action.payload
        }
      };

    case POST_BUSINESS_START:
      console.log("Post start.");
      return {
        ...state,
        keyWords: { ...state.keyWords, isFetching: true }
      };

    case POST_BUSINESS_SUCCESS:
      console.log("data incoming", action.payload)
    return {
        ...state,
        keyWords: { ...state.keyWords, isFetching: false, data: action.payload }
      };

    case POST_BUSINESS_FAILURE:
      console.log("Post failure: ", action.payload);
      return {
        ...state,
        keyWords: {
          ...state.keyWords,
          isFetching: false,
          error: action.payload
        }
      };

    default:
      console.log(`\nUnknown action type:\n${action.type}`);
      return {
        ...state
      };
  }
}

export default reducer;
