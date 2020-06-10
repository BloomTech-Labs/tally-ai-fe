import {
    ADD_COMPETITOR_START,
    ADD_COMPETITOR_SUCCESS,
    ADD_COMPETITOR_FAILURE,
    REMOVE_COMPETITOR_START,
    REMOVE_COMPETITOR_SUCCESS,
    REMOVE_COMPETITOR_FAILURE
} from '../actions/competitorsActions';

const initialState = {
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
          // }
        ] //array of businesses
      }
}

function competitorReducer(state = initialState, action) {
    switch (action.type) {
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
            
        default: 
            return state
    }
}

export default competitorReducer;