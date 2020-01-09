import {
  FETCH_BUSINESS_START,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  ADD_BUSINESS,
  FETCH_TOP_AND_BOTTOM_START,
  FETCH_TOP_AND_BOTTOM_SUCCESS,
  FETCH_TOP_AND_BOTTOM_FAILURE,
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
  businessInfo: {
    // for DS API calls
    businessId: null,
    // for side bar
    businessName: null,
    businessImg: null,
    // for top-of-page info cards
    reviewCount: 0,
    averageRating: 0,
    changeInRating: ""
  },
  widgetData: {
    keyWords: {
      isFetching: false,
      error: null,
      data: {
        positive: [{ term: "apple" }, { term: "banana" }],
        negative: [{ term: "orange" }, { term: "kiwi" }]
      }
    },
    wordsOverTime: {
      isFetching: false,
      error: null,
      data: { words: null }
    },
    reviewsOverTime: {
      isFetching: false,
      error: null,
      data: dummyReviewsOverTime
    }
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

    case ADD_BUSINESS:
      return {
        ...state,
        businessInfo: { ...action.payload }
      };

    case FETCH_TOP_AND_BOTTOM_START:
      console.log("Fetch top and bottom words start..");
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: { ...state.widgetData.keyWords, isFetching: true }
        }
      };

    case FETCH_TOP_AND_BOTTOM_SUCCESS:
      console.log(
        "Successfully fetched top and bottom ten words:\n",
        action.payload
      );
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: {
            isFetching: false,
            data: action.payload.data,
            error: null
          }
        }
      };

    case FETCH_TOP_AND_BOTTOM_FAILURE:
      console.log("Fetch top and bottom failure:\n", action.payload);
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: {
            ...state.widgetData.keyWords,
            isFetching: false,
            error: action.payload
          }
      }
    };



    case FETCH_ADDNEWUSER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ""
      };

    case FETCH_WORDS_OVER_TIME_START:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          wordsOverTime: {
            ...state.widgetData.wordsOverTime,
            isFetching: true,
            error: null
          }
        }
      };

    case FETCH_WORDS_OVER_TIME_SUCCESS:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,

          wordsOverTime: {
            ...state.widgetData.wordsOverTime,
            isFetching: false,
            data: {
              words: action.payload.words
            },
            error: null
          }
        }
      };

    case FETCH_WORDS_OVER_TIME_FAILURE:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,

          wordsOverTime: {
            ...state.widgetData.wordsOverTime,
            isFetching: false,
            error: action.payload
          }
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
          data: action.payload
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
      };

    default:
      console.log(`\nUnknown action type:\n${action.type}`);
      return {
        ...state
      };
  }
}

export default reducer;
