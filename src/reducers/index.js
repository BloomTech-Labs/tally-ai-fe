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

  //adding competitors to user's competitor list
  ADD_COMPETITOR_START,
  ADD_COMPETITOR_SUCCESS,
  ADD_COMPETITOR_FAILURE,

  //removing competitors from user's competitor list
  REMOVE_COMPETITOR_START,
  REMOVE_COMPETITOR_SUCCESS,
  REMOVE_COMPETITOR_FAILURE,

  // Data for TopBottomWords
  FETCH_TOP_AND_BOTTOM_START,
  FETCH_TOP_AND_BOTTOM_SUCCESS,
  FETCH_TOP_AND_BOTTOM_FAILURE,

  //flag user data to be updated, this will GET_USER_DATA if it needs to
  UPDATE_LOGGED_IN_USER,

  //get all the user's data from backend
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_START,

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
  SET_TABS_START,
  SET_TABS_SUCCESS,
  SET_TABS_FAILURE,

  // SET_FAVORITES_START,
  // SET_FAVORITES_SUCCESS,
  // SET_FAVORITES_FAILURE,

  // ADD_FAVORITE_START,
  // ADD_FAVORITE_SUCCESS,
  // ADD_FAVORITE_FAILURE,

  // REMOVE_FAVORITE_START,
  // REMOVE_FAVORITE_SUCCESS,
  // REMOVE_FAVORITE_FAILURE
  FETCH_RADAR_START,
  FETCH_RADAR_SUCCESS,
  FETCH_RADAR_FAILURE
} from "../actions/index.js";

import dummyWordsOverTime from "../dummyData/dummyWordsOverTime";
import dummyReviewsOverTime from "../dummyData/dummyReviewsOverTime";

import { widgets } from "../components/WidgetSystem/WidgetRegistry";

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

  searchResults: {
    isFetching: false,
    error: null,
    data: null
  },

  //currently selected business, this is what the dashboard will always display
  currentlySelectedBusiness: {
    businessId: null, //default tab selected by default
    // for side bar
    businessName: null,
    businessImg: null,
    // for top-of-page info cards
    reviewCount: 0,
    averageRating: 0,
    changeInRating: "",
    address: ""
  },

  // the user's businesses that they own
  userBusinesses: {
    isSetting: false,
    error: null,
    businesses: [
      // [{
      //   businessId: "jndajnsdj0202020",
      //   // for side bar
      //   businessName: "IOwnThisBusiness",
      //   businessImg: null,
      //   // for top-of-page info cards
      //   reviewCount: 0,
      //   averageRating: 0,
      //   changeInRating: ""
      // }]
    ]
  },

  competitors: {
    //TODO: Change name to competitors
    isSetting: false,
    error: null,
    businesses: [
      // {
      //   businessId: "19878f9d6s77237-asd",
      //   // for side bar
      //   businessName: "Example Business",
      //   businessImg: "https://assets.entrepreneur.com/franchise/282553-cover-image-1564755271.jpeg?width=800",
      //   // for top-of-page info cards
      //   reviewCount: 0,
      //   averageRating: 0,
      //   changeInRating: ""
      // },
      // {
      //   // for DS API calls
      //   businessId: "19878f9d6s71235assd",
      //   // for side bar
      //   businessName: "VERAMEAT",
      //   businessImg: "https://www.shopkeep.com/wp-content/uploads/2016/07/retail-store_retail-business-plan-e1468443541681.jpg",
      //   // for top-of-page info cards
      //   reviewCount: 0,
      //   averageRating: 0,
      //   changeInRating: ""
      // },
      // {
      //   // for DS API calls
      //   businessId: "19878ffdgdfgb7237-asd",
      //   // for side bar
      //   businessName: "Bicycles",
      //   businessImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTshfmpFtjour-4iJgDPY7uZ0Ki3Kua13zPonqqdiSAu27YFsW48Q&s",
      //   // for top-of-page info cards
      //   reviewCount: 0,
      //   averageRating: 0,
      //   changeInRating: ""
      // }
    ] //array of businesses
  },
  //Defaults to [widgets[0].name, widgets[1].name]. Later we can load some saved dashboard widgets from the db (should still have a default value here so they don't start out with an empty dashboard)
  //Array order really matters with activeWidgets, since it determines in which order they'll render. When the user drags an element to a new position on the screen, we need to translate that position to array position
  activeWidgets: [widgets[0].name, widgets[1].name],

  //array of open tabs and the IDs of the businesses they display, anything that's not an actual business ID, like "defaultTab", will just be New Tabs.
  //In this case we default to 1 open New Tab, this will be replaced if the user has any previously open tabs in their preferences from the database.
  tabs: {
    activeTabs: [{ businessId: "defaultTab" }], //isCompetitor used to color tab depending on if you own the business or if its a competitor
    isFetching: false,
    error: null
  },

  // Data for populating the visuals
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

  //TODO: seperate this switch into multiple files, it's way too long
  switch (action.type) {
    case FETCH_RADAR_START:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          radarWidget: {
            ...state.radarWidget,
            isFetching: true,
            error: null
          }
        }
      };
    case FETCH_RADAR_SUCCESS:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          radarWidget: {
            isFetching: false,
            error: null,
            data: action.payload
          }
        }
      };
    case FETCH_RADAR_FAILURE:
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          radarWidget: {
            ...state.radarWidget,
            isFetching: false,
            error: action.payload
          }
        }
      };
    case SET_TABS_START:
      return {
        ...state,
        tabs: {
          activeTabs: action.payload,
          isFetching: true,
          error: null
        }
      };
    case SET_TABS_SUCCESS:
      return {
        ...state,
        tabs: {
          ...state.tabs,
          isFetching: false,
          error: null
        }
      };
    case SET_TABS_FAILURE:
      return {
        ...state,
        tabs: {
          activeTabs: action.payload,
          isFetching: false,
          error: null //idec
        }
      };

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
          data: action.payload,
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
    case SELECT_BUSINESS_START:
      return {
        ...state,
        currentlySelectedBusiness: { ...action.payload } //set data immediatly (missing data that we're waiting on Yelp for)
      };
    case SELECT_BUSINESS_SUCCESS:
      return {
        ...state,
        currentlySelectedBusiness: { ...action.payload } //fill in the new address, rating and review count info
      };
    case SELECT_BUSINESS_FAILURE:
      return {
        ...state,
        currentlySelectedBusiness: { ...action.payload } //revert back to old data
      };

    //adding businesses to user's owned businesses list
    case ADD_BUSINESS_START:
      console.log("ADDDDDDD BUSINESSS STARTTT");
      return {
        ...state,
        userBusinesses: {
          ...state.userBusinesses,
          isSetting: true,
          error: null
        }
      };
    case ADD_BUSINESS_SUCCESS:
      return {
        ...state,
        userBusinesses: {
          businesses: action.payload.businesses.map(business => {
            return {
              id: business.id,
              businessId: business.yelp_id, //default tab selected by default
              // for side bar
              businessName: business.name,
              businessImg: business.image_url,
              // for top-of-page info cards
              reviewCount: 0,
              averageRating: 0,
              changeInRating: ""
            };
          }),
          isSetting: false,
          error: null
        }
      };
    case ADD_BUSINESS_FAILURE:
      return {
        ...state,
        userBusinesses: {
          ...state.userBusinesses,
          isSetting: false,
          error: action.payload
        }
      };

    //removing businesses from user's owned businesses list
    case REMOVE_BUSINESS_START:
      return {
        ...state,
        userBusinesses: {
          ...state.userBusinesses,
          isSetting: true,
          error: null
        }
      };

    case REMOVE_BUSINESS_SUCCESS:
      return {
        ...state,
        userBusinesses: {
          businesses: action.payload.businesses.map(business => {
            return {
              id: business.id,
              businessId: business.yelp_id, //default tab selected by default
              // for side bar
              businessName: business.name,
              businessImg: business.image_url,
              // for top-of-page info cards
              reviewCount: 0,
              averageRating: 0,
              changeInRating: ""
            };
          }),
          isSetting: false,
          error: null
        }
      };
    case REMOVE_BUSINESS_FAILURE:
      return {
        ...state,
        userBusinesses: {
          ...state.userBusinesses,
          isSetting: false,
          error: action.payload
        }
      };

    //adding competitors to user's competitor list
    case ADD_COMPETITOR_START:
      return {
        ...state,
        competitors: {
          ...state.competitors,
          isSetting: true,
          error: null
        }
      };
    case ADD_COMPETITOR_SUCCESS:
      return {
        ...state,
        competitors: {
          businesses: action.payload.favorites.map(business => {
            return {
              id: business.id,
              businessId: business.yelp_id, //default tab selected by default
              // for side bar
              businessName: business.name,
              businessImg: business.image_url,
              // for top-of-page info cards
              reviewCount: 0,
              averageRating: 0,
              changeInRating: ""
            };
          }),
          isSetting: false,
          error: null
        }
      };
    case ADD_COMPETITOR_FAILURE:
      return {
        ...state,
        competitors: {
          ...state.competitors,
          isSetting: false,
          error: action.payload
        }
      };

    //removing competitors from user's competitor list
    case REMOVE_COMPETITOR_START:
      return {
        ...state,
        competitors: {
          ...state.competitors,
          isSetting: true,
          error: null
        }
      };
    case REMOVE_COMPETITOR_SUCCESS:
      return {
        ...state,
        competitors: {
          businesses: action.payload.favorites.map(business => {
            return {
              id: business.id,
              businessId: business.yelp_id, //default tab selected by default
              // for side bar
              businessName: business.name,
              businessImg: business.image_url,
              // for top-of-page info cards
              reviewCount: 0,
              averageRating: 0,
              changeInRating: ""
            };
          }),
          isSetting: false,
          error: null
        }
      };
    case REMOVE_COMPETITOR_FAILURE:
      return {
        ...state,
        competitors: {
          ...state.competitors,
          isSetting: false,
          error: action.payload
        }
      };

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
      };

    case GET_USER_DATA_START:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          isFetching: true
        }
      };
    case GET_USER_DATA_SUCCESS:
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

      console.log("Mapping over competitors", action.payload.competitors);
      return {
        ...state,
        competitors: {
          ...state.competitors,
          businesses: action.payload.competitors.map(business => {
            return {
              //id: 16
              // name: "Cartel Coffee Lab"
              // city: "Phoenix"
              // state: "AZ"
              // yelp:
              // yelp_id: "j0_DUr3vBXY-JP-b0bf93A"
              // url: "https://www.yelp.com/biz/cartel-coffee-lab-phoenix-2?adjust_creative=qO78hV4p7yy-o3z8K5osow&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=qO78hV4p7yy-o3z8K5osow"
              // image_url:
              id: business.id,
              businessId: business.yelp.yelp_id, //default tab selected by default
              // for side bar
              businessName: business.name,
              businessImg: business.yelp.image_url,
              // for top-of-page info cards
              reviewCount: 0,
              averageRating: 0,
              changeInRating: ""
            };
          }),
          isSetting: false,
          error: null
        },
        loggedInUser: {
          ...state.loggedInUser,
          data: action.payload.loggedInUser,
          isFetching: false
        },
        userBusinesses: {
          ...state.userBusinesses,
          businesses: action.payload.businesses.map(business => {
            return {
              id: business.id,
              businessId: business.yelp.yelp_id, //default tab selected by default
              // for side bar
              businessName: business.name,
              businessImg: business.yelp.image_url,
              // for top-of-page info cards
              reviewCount: 0,
              averageRating: 0,
              changeInRating: ""
            };
          }),
          isSetting: false,
          error: null
        },
        activeWidgets: [widgets[0].name, widgets[1].name],
        tabs: {
          ...state.tabs,
          activeTabs: action.payload.activeTabs
        }
      };

    case UPDATE_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          shouldUpdate: action.payload
        }
      };

    // Edit Account
    case FETCH_EDITACCOUNT_START:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          isFetching: true,
          error: null
        }
      };
    case FETCH_EDITACCOUNT_SUCCESS: //TODO: update activeWidgets with action.payload.preferences.widgets
      return {
        ...state,
        loggedInUser: {
          data: {
            firstName: action.payload.first_name
              ? action.payload.first_name
              : state.loggedInUser.data.firstName,
            lastName: action.payload.last_name_name
              ? action.payload.last_name
              : state.loggedInUser.data.lastName
          },
          isFetching: false,
          error: null
        }
      };
    case FETCH_EDITACCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

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

    // Unknown action type (default)
    default:
      console.log(`\nUnknown action type:\n${action.type}`);
      return {
        ...state
      };
  }
}

export default reducer;
