import {
  FETCH_BUSINESS_START,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  POST_BUSINESS_START,
  POST_BUSINESS_SUCCESS,
  POST_BUSINESS_FAILURE,
  FETCH_ADDNEWUSER_SUCCESS,
  FETCH_WORDS_OVER_TIME_START,
  FETCH_WORDS_OVER_TIME_SUCCESS,
  FETCH_WORDS_OVER_TIME_FAILURE,
  FETCH_REVIEWS_OVER_TIME_START,
  FETCH_REVIEWS_OVER_TIME_SUCCESS,
  FETCH_REVIEWS_OVER_TIME_FAILURE
} from "../actions/index.js";

import dummyWordsOverTime from "../dummyData/dummyWordsOverTime";
import dummyReviewsOverTime from "../dummyData/dummyReviewsOverTime";

const initialState = {
  searchResults: { 
    isFetching: false,
    error: null,
    data: null
  },
  keyWords: {
    isFetching: false,
    error: null,
    data: { positive: [{ term: "apple" }, { term: "banana" }], negative: [{ term: "orange" }, { term: "kiwi" }] }
  },
  wordsOverTime: {
    isFetching: false,
    error: null,
    data: { words: dummyWordsOverTime }
  },
  reviewsOverTime: {
    isFetching: false,
    error: null,
    data: dummyReviewsOverTime
  }
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
        searchResults: { 
          ...state.searchResults,
          isFetching: true,
          error: null
        }
      };

    case FETCH_BUSINESS_SUCCESS:
      console.log("FETCH SUCCESS! Payload:", action.payload);
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
          // data: action.payload
          data: action.payload.data.businesses,
          error: null
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
      console.log("data incoming", action.payload);
      return {
        ...state,
        keyWords: {
          ...state.keyWords,
          isFetching: false,
          data: action.payload.data,
          error: null
        }
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
    
    case FETCH_ADDNEWUSER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
      };

    case FETCH_WORDS_OVER_TIME_START:
      return {
        ...state,
        wordsOverTime: {
          ...state.wordsOverTime,
          isFetching: true,
          error: null
        }
      };

    case FETCH_WORDS_OVER_TIME_SUCCESS:
      return {
        ...state,
        wordsOverTime: {
          ...state.wordsOverTime,
          isFetching: false,
          data: {
            words: action.payload.words
          },
          error: null
        }
      };

    case FETCH_WORDS_OVER_TIME_FAILURE:
      return {
        ...state,
        wordsOverTime: {
          ...state.wordsOverTime,
          isFetching: false,
          error: action.payload
        }
      };

    case FETCH_REVIEWS_OVER_TIME_START:
      return {
        ...state,
        reviewsOverTime: {
          ...state.reviewsOverTime,
          isFetching: true,
          error: null
        }
      };

    case FETCH_REVIEWS_OVER_TIME_SUCCESS:
      return {
        ...state,
        reviewsOverTime: {
          ...state.reviewsOverTime,
          isFetching: false,
          data:  action.payload
        },
        error: null
      };

    case FETCH_REVIEWS_OVER_TIME_FAILURE:
      return {
        ...state,
        reviewsOverTime: {
          ...state.reviewsOverTime,
          isFetching: false,
          error: action.payload
        }
      }

    default:
      console.log(`\nUnknown action type:\n${action.type}`);
      return {
        ...state
      };
  }
}

export default reducer;
