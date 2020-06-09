import axios from 'axios'
import { axiosWithAuth } from '../auth/axiosWithAuth'

export const SET_ACTIVE_WIDGETS = 'SET_ACTIVE_WIDGETS'

// TopBottomWords
export const FETCH_TOP_AND_BOTTOM_START = 'FETCH_TOP_AND_BOTTOM_START'
export const FETCH_TOP_AND_BOTTOM_SUCCESS = 'FETCH_TOP_AND_BOTTOM_SUCCESS'
export const FETCH_TOP_AND_BOTTOM_FAILURE = 'FETCH_TOP_AND_BOTTOM_FAILURE'

// ReviewFrequency
export const FETCH_RATING_OVER_TIME_START = 'FETCH_RATING_OVER_TIME_START'
export const FETCH_RATING_OVER_TIME_SUCCESS = 'FETCH_RATING_OVER_TIME_SUCCESS'
export const FETCH_RATING_OVER_TIME_FAILURE = 'FETCH_RATING_OVER_TIME_FAILURE'

// PhraseRank
export const FETCH_WORDS_OVER_TIME_START = 'FETCH_WORDS_OVER_TIME_START'
export const FETCH_WORDS_OVER_TIME_SUCCESS = 'FETCH_WORDS_OVER_TIME_SUCCESS'
export const FETCH_WORDS_OVER_TIME_FAILURE = 'FETCH_WORDS_OVER_TIME_FAILURE'

// ReviewFrequency
export const FETCH_REVIEWS_OVER_TIME_START = 'FETCH_REVIEWS_OVER_TIME_START'
export const FETCH_REVIEWS_OVER_TIME_SUCCESS = 'FETCH_REVIEWS_OVER_TIME_SUCCESS'
export const FETCH_REVIEWS_OVER_TIME_FAILURE = 'FETCH_REVIEWS_OVER_TIME_FAILURE'

export const FETCH_RADAR_START = 'FETCH_RADAR_START'
export const FETCH_RADAR_SUCCESS = 'FETCH_RADAR_SUCCESS'
export const FETCH_RADAR_FAILURE = 'FETCH_RADAR_FAILURE'

export const fetchTopAndBottom = id => dispatch => {
	const dsEndpoint = `https://cors-anywhere.herokuapp.com/http://django-tally.nv9fjcsgss.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=0`
	console.log('Running fetchTopAndBottom.')
	dispatch({ type: FETCH_TOP_AND_BOTTOM_START })
	axios
		.get(dsEndpoint)
		.then(res => {
			dispatch({
				type: FETCH_TOP_AND_BOTTOM_SUCCESS,
				payload: res
			})
		})
		.catch(err => {
			dispatch({
				type: FETCH_TOP_AND_BOTTOM_FAILURE,
				payload: err
			})
		})
}

export const fetchAllData = id => async dispatch => {
	if (!id) {
		console.error('WARNING: ID IS UNDEFINED')
	}

	try {
		dispatch({ type: FETCH_TOP_AND_BOTTOM_START })
		dispatch({ type: FETCH_RATING_OVER_TIME_START })
		console.log(
			'Attempting to get data from ',
			`https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=0`
		)
		const data = await axios.get(
			`https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=0`
		)
		console.log('\nData from viztype=0:\n', data)

		const { viztype0, viztype3 } = data.data
		console.log('viztype0: ', viztype0)
		console.log('viztype3: ', viztype3)

		dispatch({ type: FETCH_TOP_AND_BOTTOM_SUCCESS, payload: viztype0 })
		dispatch({ type: FETCH_RATING_OVER_TIME_SUCCESS, payload: viztype3 })
	} catch (error) {
		console.error(
			`\nError getting data for topBottomWords and ratingOverTime\n${error}\n`
		)
		dispatch({ type: FETCH_TOP_AND_BOTTOM_FAILURE, payload: error })
		dispatch({ type: FETCH_RATING_OVER_TIME_FAILURE, payload: error })
	}

	try {
		dispatch({ type: FETCH_WORDS_OVER_TIME_START })
		const phraseRank = await axios.get(
			`https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=1`
		)
		dispatch({ type: FETCH_WORDS_OVER_TIME_SUCCESS, payload: phraseRank })
	} catch (error) {
		console.error(`\nError getting data for phraseRank\n${error}\n`)
		dispatch({ type: FETCH_WORDS_OVER_TIME_FAILURE, payload: error })
	}

	try {
		dispatch({ type: FETCH_REVIEWS_OVER_TIME_START })
		const reviewsOverTime = await axios.get(
			`https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=2`
		)
		console.log('Data in action for reviewsOverTime: ', reviewsOverTime)
		dispatch({
			type: FETCH_REVIEWS_OVER_TIME_SUCCESS,
			payload: reviewsOverTime
		})
	} catch (error) {
		console.error(`\nError getting data for reviewsOverTime\n${error}\n`)
		dispatch({ type: FETCH_REVIEWS_OVER_TIME_FAILURE, payload: error })
	}

	dispatch({ type: FETCH_RADAR_START })
	axiosWithAuth()
		.get(
			`https://cors-anywhere.herokuapp.com/http://django-tally-dev.n9ntucwqks.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=4`
		)
		.then(res => {
			dispatch({ type: FETCH_RADAR_SUCCESS, payload: res.data })
		})
		.catch(err => {
			dispatch({ type: FETCH_RADAR_FAILURE, payload: err })
		})
}

export const fetchWordsOverTime = id => dispatch => {
  dispatch({ type: FETCH_WORDS_OVER_TIME_START });
  console.log("\nFetching words over time...\n");
  const dsEndpoint = `https://cors-anywhere.herokuapp.com/http://django-tally.nv9fjcsgss.us-west-2.elasticbeanstalk.com/yelp/${id}?viztype=1`;
  console.log(`Fetch Words Over Time endpoint:\n${dsEndpoint}`);
  axios
    .get(dsEndpoint)
    .then(res => {
      console.log("WORDS OVER TIME ACTION FETCH SUCCESS, PAYLOAD: ", res.data);
      dispatch({ type: FETCH_WORDS_OVER_TIME_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: FETCH_WORDS_OVER_TIME_FAILURE, payload: err });
    });
};

export const setActiveWidgets = (widgetArray) => dispatch => {
	dispatch({ type: SET_ACTIVE_WIDGETS, payload: widgetArray });
  }