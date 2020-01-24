import {
  // Yelp Business Search
  FETCH_BUSINESS_START,
  FETCH_BUSINESS_SUCCESS,
  FETCH_BUSINESS_FAILURE,
  // Select business from results
  ADD_BUSINESS,
  // Data for TopBottomWords
  FETCH_TOP_AND_BOTTOM_START,
  FETCH_TOP_AND_BOTTOM_SUCCESS,
  FETCH_TOP_AND_BOTTOM_FAILURE,

  UPDATE_LOGGED_IN_USER,
  SET_USER_INFO,
  // Registration
  // REGISTER_START,
  // REGISTER_SUCCESS,
  // REGISTER_FAILURE,
  // // Login
  // LOGIN_START,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,
  // // Logout
  // LOGOUT_USER,
  // Edit Account
  FETCH_EDITACCOUNT_START,
  FETCH_EDITACCOUNT_SUCCESS,
  FETCH_EDITACCOUNT_FAILURE,
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

  SET_FAVORITES_START,
  SET_FAVORITES_SUCCESS,
  SET_FAVORITES_FAILURE,

  ADD_FAVORITE_START,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,

  REMOVE_FAVORITE_START,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAILURE
} from "../actions/index.js";

import dummyWordsOverTime from "../dummyData/dummyWordsOverTime";
import dummyReviewsOverTime from "../dummyData/dummyReviewsOverTime";

import { widgets } from "../components/WidgetSystem/WidgetRegistry"

const initialState = {
  loggedInUser: {
    data: {
      firstName: null,
      lastName: null
    },
    shouldUpdate: true,
    isFetching: false,
    error: null
  },
  //past favorites should be added to state when they log in. when the user favorites/unfavorites, send to backend and update state with list of favorites returned from backend.
  favorites: {
    isSetting: false,
    error: null,
    favorites: [
      {
        // for DS API calls
        businessId: "19878f9d6s77237-asd",
        // for side bar
        businessName: "Example Business",
        businessImg: "https://assets.entrepreneur.com/franchise/282553-cover-image-1564755271.jpeg?width=800",
        // for top-of-page info cards
        reviewCount: 0,
        averageRating: 0,
        changeInRating: ""
      },
      {
        // for DS API calls
        businessId: "19878f9d6s77237-asd",
        // for side bar
        businessName: "VERAMEAT",
        businessImg: "https://www.shopkeep.com/wp-content/uploads/2016/07/retail-store_retail-business-plan-e1468443541681.jpg",
        // for top-of-page info cards
        reviewCount: 0,
        averageRating: 0,
        changeInRating: ""
      },
      {
        // for DS API calls
        businessId: "19878f9d6s77237-asd",
        // for side bar
        businessName: "Bicycles",
        businessImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshfmpFtjour-4iJgDPY7uZ0Ki3Kua13zPonqqdiSAu27YFsW48Q&s",
        // for top-of-page info cards
        reviewCount: 0,
        averageRating: 0,
        changeInRating: ""
      }
    ]//array of businesses
  },

  searchResults: {
    isFetching: false,
    error: null,
    data: null
  },
  // Business information from the Yelp API
  businessInfo: {
    // for DS API calls
    businesses:
      [{
        businessId: null,
        // for side bar
        businessName: null,
        businessImg: null,
        // for top-of-page info cards
        reviewCount: 0,
        averageRating: 0,
        changeInRating: ""
      }]
  },

  //Defaults to [widgets[0].name, widgets[1].name]. Later we can load some saved dashboard widgets from the db (should still have a default value here so they don't start out with an empty dashboard)
  //Array order really matters with activeWidgets, since it determines in which order they'll render. When the user drags an element to a new position on the screen, we need to translate that position to array position
  activeWidgets: [widgets[0].name, widgets[1].name],

  // Data for populating the visuals
  widgetData: {
    // TopBottomWords
    keyWords: {
      isFetching: false,
      error: null,
      data: {
        positive: [{ term: "apple" }, { term: "banana" }],
        negative: [{ term: "orange" }, { term: "kiwi" }]
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
    // Yelp Business Search
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

    // Select business
    case ADD_BUSINESS:
      return {
        ...state,
        businessInfo: { ...action.payload }
      };
    case SET_ACTIVE_WIDGETS:
      return {
        ...state,
        activeWidgets: action.payload
      };
    case SET_FAVORITES_START:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: true,
          error: null
        }
      };
    case SET_FAVORITES_SUCCESS:
      console.log("REDUCER SETTING FAVS", action.payload);
      return {
        ...state,
        favorites: {
          favorites: action.payload,
          isSetting: false,
          error: null
        }
      };
    case SET_FAVORITES_FAILURE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: false,
          error: action.payload
        }
      };

    case ADD_FAVORITE_START:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: true,
          error: null
        }
      };
    case ADD_FAVORITE_SUCCESS:
      console.log("REDUCER SETTING FAVS", action.payload);
      return {
        ...state,
        favorites: {
          favorites: action.payload,
          isSetting: false,
          error: null
        }
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: false,
          error: action.payload
        }
      };

    case REMOVE_FAVORITE_START:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: true,
          error: null
        }
      };
    case REMOVE_FAVORITE_SUCCESS:
      console.log("REDUCER SETTING FAVS", action.payload);
      return {
        ...state,
        favorites: {
          favorites: action.payload,
          isSetting: false,
          error: null
        }
      };
    case REMOVE_FAVORITE_FAILURE:
      return {
        ...state,
        favorites: {
          ...state.favorites,
          isSetting: false,
          error: action.payload
        }
      };

    // TopBottomWords
    case FETCH_TOP_AND_BOTTOM_START:
      console.log("Fetch top and bottom words start..");
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          keyWords: { ...state.widgetData.keyWords, isFetching: true, error: null }
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
      };

    // // Registration
    // case REGISTER_START:
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       userID: null,
    //       isFetching: true,
    //       error: null
    //     }
    //   };
    // case REGISTER_SUCCESS:
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       isFetching: false,
    //       error: null,
    //       shouldUpdate: true
    //     }
    //   };
    // case REGISTER_FAILURE:
    //   return {
    //     ...state,
    //     userID: null,
    //     isFetching: false,
    //     error: action.payload
    //   };

    // // Login
    // case LOGIN_START:
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       userID: null,
    //       isFetching: true,
    //       error: null
    //     }
    //   }
    // case LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       userID: action.payload,
    //       isFetching: false,
    //       error: null,
    //       shouldUpdate: true
    //     }
    //   }
    // case LOGIN_FAILURE:
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       userID: null,
    //       isFetching: false,
    //       error: action.payload
    //     }
    //   }
    // // Logout
    // case LOGOUT_USER:
    //   return {
    //     ...state, loggedInUser: {} 
    //   }

    case SET_USER_INFO:
      // action.payload: {  
      //   favorites
      //   loggedInUser
      //   businessInfo
      //   activeWidgets
      // }

      // //only set state if not null
      // let tempFavorites = state.favorites.favorites;
      // if(action.payload.favorites){
      //   tempFavorites = action.payload.favorites;
      // }

      // let tempLoggedInUser = state.loggedInUser.data
      // if(action.payload.loggedInUser){
      //   tempLoggedInUser = action.payload.loggedInUser;
      // }

      // let tempBusinessInfo = state.businessInfo.businesses;
      // if(action.payload.businessInfo){
      //   tempBusinessInfo = action.payload.businessInfo;
      // }

      
      // let tempActiveWidgets = state.activeWidgets;
      // if(action.payload.activeWidgets){
      //   tempActiveWidgets = action.payload.activeWidgets;
      // }

      return {
        ...state,
        favorites: {
          ...state.favorites,
          favorites: action.payload.favorites
        },
        loggedInUser: {
          ...state.loggedInUser,
          data: action.payload.loggedInUser
        },
        businessInfo: {
          ...state.businessInfo,
          businesses: action.payload.businessInfo
        },
        activeWidgets: action.payload.activeWidgets
      }
      
    case UPDATE_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          shouldUpdate: action.payload
        }
      }

    // Edit Account
    case FETCH_EDITACCOUNT_START:
      return {
        ...state,
        isFetching: true,
        error: ""
      }
    case FETCH_EDITACCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        loggedUserInfo: action.payload
      }
    case FETCH_EDITACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
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
          },
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
          },
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
          },
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


    // Unknown action type (default)
    default:
      console.log(`\nUnknown action type:\n${action.type}`);
      return {
        ...state
      };
  }
}

export default reducer;
