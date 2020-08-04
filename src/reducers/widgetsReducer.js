import { widgets } from '../components/WidgetSystem/WidgetRegistry'

import {
  // Data for TopBottomWords
  FETCH_TOP_AND_BOTTOM_START,
  FETCH_TOP_AND_BOTTOM_SUCCESS,
  FETCH_TOP_AND_BOTTOM_FAILURE,
  
  // Data for PhraseRank
  FETCH_WORDS_OVER_TIME_START,
  FETCH_WORDS_OVER_TIME_SUCCESS,
  FETCH_WORDS_OVER_TIME_FAILURE,
  
  // Data for ReviewFrequency
  FETCH_REVIEWS_OVER_TIME_START,
  FETCH_REVIEWS_OVER_TIME_SUCCESS,
  FETCH_REVIEWS_OVER_TIME_FAILURE,
 
  // Data for RatingOverTime
  FETCH_RATING_OVER_TIME_START,
  FETCH_RATING_OVER_TIME_SUCCESS,
  FETCH_RATING_OVER_TIME_FAILURE,
  SET_ACTIVE_WIDGETS,
  } from '../actions/widgetsActions'

const initialState = {
    widgetData: {
        // TopBottomWords
        keyWords: {
          isFetching: false,
          error: null,
          data: {
            positive: [],
            negative: []
          }
        },
        // PhraseRank
        wordsOverTime: {
          isFetching: false,
          error: null,
          data: null
        },
        // ReviewFrequency
        reviewsOverTime: {
          isFetching: false,
          error: null,
          data: null
        },
        // RatingOverTime
        ratingOverTime: {
          isFetching: false,
          error: null,
          data: null
        },
    
        radarWidget: {
          isFetching: false,
          error: null,
          data: null
        },
       
      }, activeWidgets: [widgets[0].name, widgets[1].name, widgets[2].name, widgets[3].name, widgets[4].name]
}

const widgetsReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_WIDGETS:
      return {
        ...state,
        activeWidgets: action.payload
      };

    // TopBottomWords
    case FETCH_TOP_AND_BOTTOM_START:
      console.log("Fetch top and bottom words start..");
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: {
            ...state.widgetData.keyWords,
            isFetching: true,
            error: null
          }
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
            data: action.payload,
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
      }
 // PhraseRank
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
        data: action.payload.data,
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

// ReviewFrequency
case FETCH_REVIEWS_OVER_TIME_START:
  return {
    ...state,
    widgetData: {
      ...state.widgetData,
      reviewsOverTime: {
        ...state.widgetData.reviewsOverTime,
        isFetching: true,

        error: null
      }
    }
  };
case FETCH_REVIEWS_OVER_TIME_SUCCESS:
  return {
    ...state,
    widgetData: {
      ...state.widgetData,
      reviewsOverTime: {
        ...state.widgetData.reviewsOverTime,
        isFetching: false,
        data: action.payload.data
      }
    }
  };
case FETCH_REVIEWS_OVER_TIME_FAILURE:
  return {
    ...state,
    widgetData: {
      ...state.widgetData,
      reviewsOverTime: {
        ...state.widgetData.reviewsOverTime,
        isFetching: true,
        data: null,
        error: action.payload
      }
    }
  };

// RatingOverTime
case FETCH_RATING_OVER_TIME_START:
  return {
    ...state,
    widgetData: {
      ...state.widgetData,
      ratingOverTime: {
        ...state.widgetData.ratingOverTime,
        isFetching: true,
        error: null
      }
    }
  }; 
case FETCH_RATING_OVER_TIME_SUCCESS:
  return {
    ...state,
    widgetData: {
      ...state.widgetData,

      ratingOverTime: {
        ...state.widgetData.ratingOverTime,
        isFetching: false,
        data: action.payload.star_data,
        error: null
      }
    }
  };
case FETCH_RATING_OVER_TIME_FAILURE:
  return {
    ...state,
    widgetData: {
      ...state.widgetData,

      ratingOverTime: {
        ...state.widgetData.ratingOverTime,
        isFetching: false,
        error: action.payload
      }
    }
  };

      default:
        return state
  }
}

export default widgetsReducer