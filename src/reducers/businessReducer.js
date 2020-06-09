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
  REMOVE_BUSINESS_FAILURE} from '../actions/businessActions'

  const initialState = {   
    userBusinesses: {
      isSetting: false,
      error: null,
      businesses: []
    },

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

    searchResults: {
      isFetching: false,
      error: null,
      data: null
    },

  };

  function businessReducer(state = initialState, action) {
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
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          isFetching: false,
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
      default:     
      return state
  }
}

export default businessReducer