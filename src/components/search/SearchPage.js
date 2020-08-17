import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'
import { InputAdornment } from '@material-ui/core'
import Results from './results'
import SearchBar from '../dashboard/SearchBar'

import {
	fetchBusinesses,
	selectBusiness,
	addBusiness,
	removeBusiness,
	addCompetitor,
	removeCompetitor,
	resetSearchResults
} from '../../actions/businessActions'

import axios from 'axios'

const mapsKey = process.env.REACT_APP_MAPS_KEY

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	title: {
		marginTop: 20,
		marginBottom: 50
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '100%'
	},

	gpsIcon: {
		cursor: 'pointer'
	},

	button: {
		margin: '2rem auto 0 auto',
		width: '6rem',
		backgroundColor: '#1E4DC7',
		color: 'white',
		borderRadius: '20px',
		'&:disabled': {
			backgroundColor: '#3968e361'
		}
	}
}))

const SearchPage = props => {
	const { searchMode } = props.match.params
	const classes = useStyles()

	const [searchTerm, setSearchTerm] = useState()
	const [searchLocation, setSearchLocation] = useState('')
	const [readableLocation, setReadableLocation] = useState()

	function resultsSelection(selection) {
		if (props.match.params.searchMode === 'competitor') {
			props.addCompetitor(selection, localStorage.getItem('userID'))
		} else {
			props.addBusiness(selection, localStorage.getItem('userID'))
		}

		props.selectBusiness(selection) //lets go ahead and assume they want to view this new bussiness/competitor on the dashboard as well
		props.history.push('/dashboard')
	}

	useEffect(() => {
		props.resetSearchResults()
	}, [])

	useEffect(() => {
		if (searchLocation.latitude && searchLocation.longitude) {
			//The searchLocation has changed to use latitude and a logitude, lets get the user friendly location from these coords and fill in the location field with it
			axios
				.get(
					`https://us1.locationiq.com/v1/reverse.php?key=${mapsKey}&lat=${searchLocation.latitude}&lon=${searchLocation.longitude}&format=json`
				)
				.then(res => {
					// console.log('Got location', res)
					setReadableLocation(res.data.address.city)
				})
				.catch(err => {
					console.error('Could not get location from coords')
				})
		}
	}, [searchLocation])

	function Title() {
		return (
			<div className={classes.title}>
				{searchMode === 'business' ? (
					<h1>Search for your Business</h1>
				) : searchMode === 'competitor' ? (
					<h1>Search for a Competitor</h1>
				) : (
					<h1>See what customers are saying about your business!</h1>
				)}
			</div>
		)
	}
	return (
		<div className={classes.container}>
			<Title />
			<SearchBar searchByNameOnly />
			<Results select={resultsSelection} searchMode={searchMode} />
		</div>
	)
}

const mapStateToProps = state => ({
	competitors: state.business.competitors,
	businesses: state.business.businesses,
	selectedBusiness: state.business.currentlySelectedBusiness,
	searchResults: state.business.searchResults
})

export default connect(mapStateToProps, {
	fetchBusinesses,
	addBusiness,
	addCompetitor,
	removeBusiness,
	removeCompetitor,
	selectBusiness,
	resetSearchResults
})(SearchPage)
