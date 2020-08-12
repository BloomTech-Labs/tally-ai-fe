import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import { InputAdornment } from "@material-ui/core";
import Results from "./results";
import HomeIcons from "../home/homeIcons"
import HomeInfo from "../home/HomeInfoText";
import HomeFeatures from "../home/HomeFeatures";
import HomeBottomSection from "../home/HomeBottomSection";
import HomePitches from '../home/HomePitches';

import { fetchBusinesses, selectBusiness,resetSearchResults } from "../../actions/businessActions.js";

import "./search.scss"

import axios from "axios";

import tallySearchLogo from "../../components/images/tallySearchLogo.png";

const mapsKey = process.env.REACT_APP_MAPS_KEY;

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'no-wrap',
		flexDirection: 'column',
		textAlign: 'left',
		alignContent: 'center',
		width: '40%'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: '100%',
		marginTop: '1%'
	},
	button: {
	margin: "1.5rem auto 0 auto",
	width: '6rem',
	backgroundColor: '#1E4DC7',
	color: 'white',
	borderRadius:'20px',
	},
}))

const Search = props => {
	const classes = useStyles()

	const [searchTerm, setSearchTerm] = useState()
	const [searchLocation, setSearchLocation] = useState('')
	const [readableLocation, setReadableLocation] = useState()

	function resultsSelection(selection) {
		console.log('Selection: ', selection)

		props.selectBusiness(selection)

		props.history.push('/dashboard')
	}

	useEffect(() => {
		props.resetSearchResults();
	},[])

	useEffect(() => {
		if (searchLocation.latitude && searchLocation.longitude) {
			axios
				.get(
					`https://us1.locationiq.com/v1/reverse.php?key=${mapsKey}&lat=${searchLocation.latitude}&lon=${searchLocation.longitude}&format=json`
				)
				.then(res => {
					console.log('Got location', res)
					setReadableLocation(res.data.address.city)
				})
				.catch(err => {
					console.error('Could not get location from coords')
				})
		}
	}, [searchLocation])

	return (
		<div className='search-background'>
			<div>
				<div
					className='search-widget'
				>
					<div
						className='search-form'
					>

						<form
							className={
								props.searchResults.data ? ' growSearch' : classes.container
							}
						>
							<div
								className='YelpBusinessH1'
							>
								<h1>
									See what customers are saying about your business!
								</h1>
							</div>
							<h2
								className='YelpBusinessH2'
							>
								Search for a Yelp Business to get started
							</h2>
							<TextField
								label='Business Name'
								variant='outlined'
								margin='normal'
								type='text'
								className={classes.textField}
								placeholder='Business Name'
								onChange={e => {
									setSearchTerm(e.target.value)
									console.log(
										'Setting search term value to state',
										e.target.value
									)
								}}
							/>
							<TextField
								label='City'
								value={
									searchLocation.longitude && searchLocation.latitude
										? readableLocation
										: searchLocation
								}
								variant='outlined'
								margin='normal'
								type='text'
								className={classes.textField}
								placeholder={
									searchLocation.logitude && searchLocation.latitude
										? readableLocation
										: 'City'
								}
								onChange={e => {
									setSearchLocation(e.target.value)
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<Tooltip title='Use your current location' arrow>
												<GpsFixedIcon
													onClick={() => {
														if (navigator.geolocation) {
															navigator.geolocation.getCurrentPosition(loc => {
																console.log(loc.coords)
																setSearchLocation(loc.coords)
															})
														} else {
															alert('Failed to access browser geolocation')
														}
													}}
													style={{ cursor: 'pointer' }}
												/>
											</Tooltip>
										</InputAdornment>
									)
								}}
							></TextField>
							<Button
								className={classes.button}
								variant='outlined'
								color='blue'
								type='submit'
								disabled={props.searchResults.isFetching}
								onClick={e => {
									e.preventDefault()
									props.fetchBusinesses({
										name: searchTerm,
										city: searchLocation,
										
									})
								}}
							>
								Search
							</Button>
						</form>
					</div>
					<Results select={resultsSelection} />
				</div>

			
				
				{!props.searchResults.data ? (
					
					<div>
						<HomeIcons />
						<HomeInfo />
						<HomeFeatures />
						<HomePitches />
						<HomeBottomSection />
					</div>
					
				) : null}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	searchResults: state.business.searchResults,
	selectedBusiness: state.business.currentlySelectedBusiness
})

export default connect(mapStateToProps, {
	fetchBusinesses,
	selectBusiness,
	resetSearchResults,
})(Search)
