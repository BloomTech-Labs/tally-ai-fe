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
		// 	"business_id": "j9bWpCRwpDVfwVT_V85qeA",
		// 	"businessName": "Papaya Thai",
		// 	"address": "2706 E University Dr",
		// 	"city": "Mesa",
		// 	"zipcode": "85213",
		// 	"latitude": 33.4237052,
		// 	"longitude": -111.7728895,
		// 	"attributes": "{'Caters': 'False', 'OutdoorSeating': 'False', 'BusinessAcceptsCreditCards': 'True', 'BikeParking': 'True', 'HasTV': 'True', 'RestaurantsAttire': \"u'casual'\", 'RestaurantsDelivery': 'True', 'RestaurantsReservations': 'False', 'RestaurantsTakeOut': 'True', 'Alcohol': \"u'none'\", 'GoodForKids': 'True', 'RestaurantsPriceRange2': '1', 'BusinessParking': \"{'garage': False, 'street': False, 'validated': False, 'lot': False, 'valet': False}\", 'Ambience': \"{'touristy': False, 'hipster': False, 'romantic': False, 'divey': False, 'intimate': False, 'trendy': False, 'upscale': False, 'classy': False, 'casual': False}\", 'WiFi': \"u'no'\", 'NoiseLevel': \"u'quiet'\", 'RestaurantsGoodForGroups': 'True', 'GoodForMeal': \"{'dessert': False, 'latenight': False, 'lunch': True, 'dinner': True, 'brunch': False, 'breakfast': False}\"}",
		// 	"cuisine": "thai",
		// 	"review_count": 130,
		// 	"business_stars": 2.5
		// },
		// {
		// 	"business_id": "W7hCuNdn2gzehta6eSHzgQ",
		// 	"businessName": "Pete's Fish & Chips",
		// 	"address": "1017 E Apache Blvd",
		// 	"city": "Tempe",
		// 	"zipcode": "85281",
		// 	"latitude": 33.4145065,
		// 	"longitude": -111.9237207,
		// 	"attributes": "{'NoiseLevel': \"u'average'\", 'BusinessAcceptsCreditCards': 'False', 'RestaurantsTakeOut': 'True', 'Alcohol': \"u'none'\", 'Ambience': \"{'touristy': False, 'hipster': False, 'romantic': False, 'divey': False, 'intimate': False, 'trendy': False, 'upscale': False, 'classy': False, 'casual': True}\", 'RestaurantsAttire': \"'casual'\", 'WiFi': \"u'no'\", 'RestaurantsReservations': 'False', 'GoodForKids': 'True', 'RestaurantsGoodForGroups': 'False', 'OutdoorSeating': 'True', 'RestaurantsDelivery': 'False', 'BikeParking': 'True', 'Caters': 'False', 'HasTV': 'True', 'GoodForMeal': \"{'dessert': False, 'latenight': False, 'lunch': True, 'dinner': True, 'brunch': False, 'breakfast': False}\", 'BusinessParking': \"{'garage': False, 'street': False, 'validated': False, 'lot': True, 'valet': False}\", 'RestaurantsPriceRange2': '1'}",
		// 	"cuisine": "other",
		// 	"review_count": 117,
		// 	"business_stars": 2
		// },
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