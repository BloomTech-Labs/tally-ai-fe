import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper, Typography } from '@material-ui/core'

import WidgetDisplayList from '../WidgetSystem/WidgetDisplayList'
import SearchBar from './SearchBar'
import Results from '../search/results'
import DashboardPlus from './dashboardPlus'

import {
	fetchWordsOverTime,
	fetchTopAndBottom,
	fetchAllData
} from '../../actions/widgetsActions'
import {
	resetSearchResults,
	selectBusiness
} from '../../actions/businessActions'

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2rem 32px 0 32px',
		margin: '4.6rem 0 0 4.6rem',
		textAlign: 'center',
		[theme.breakpoints.up('lg')]: {
			width: '996px',
			margin: '4.6rem auto 4.6rem auto'
		},
		minWidth: '324px'
	},
	header: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	logo: {
		fontWeight: 'bold',
		fontSize: '2.4rem'
	},
	businessContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 50
	},
	paper: {
		padding: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F9F9F9',
		color: theme.palette.text.secondary,
		width: theme.spacing(30),
		height: theme.spacing(8),
		[theme.breakpoints.down('sm')]: {
			width: theme.spacing(18),
			height: theme.spacing(6)
		},
		'& > *': {
			margin: '0px',
			color: 'black'
		},
		[theme.breakpoints.down('xs')]: {
			width: theme.spacing(10),
			fontSize: '.6rem'
		}
	},
	count: {
		fontWeight: 'bold',
		fontSize: '1.4rem'
	}
}))

function DashboardGrid(props) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { data } = useSelector(state => state.business.searchResults)

	// Fetch data for widgets
	useEffect(() => {
		if (
			businessesContains(props.businessInfo.business_id) ||
			!localStorage.getItem('token')
		) {
			props.fetchAllData(props.businessInfo.business_id)
		}

		return () => dispatch(resetSearchResults())
	}, [props.businessInfo.business_id, props.competitors, props.userBusinesses])

	function resultsSelection(selection) {
		dispatch(selectBusiness(selection))
	}

	return (
		<Grid className={classes.root}>
			<>
				{props.businessInfo.business_id ? (
					<Grid justify='center'>
						<Grid className={classes.header}>
							<Typography variant='h3' className={classes.logo}>
								tally
							</Typography>
							<SearchBar />
						</Grid>

						{data ? (
							<Results select={resultsSelection} />
						) : (
							<>
								<Grid container className={classes.businessContainer}>
									<Paper variant='outlined' className={classes.paper}>
										<p className={classes.count}>
											{props.businessInfo.review_count.toLocaleString()}
										</p>

										<p>Total Reviews</p>
									</Paper>
									<Paper variant='outlined' className={classes.paper}>
										<p className={classes.count}>
											{props.businessInfo.business_stars} stars
										</p>
										<p>Overall Rating</p>
									</Paper>
									<Paper variant='outlined' className={classes.paper}>
										<p className={classes.count}>
											{props.businessInfo.cuisine[0].toUpperCase() +
												props.businessInfo.cuisine.slice(1)}
										</p>
										<p>Cuisine</p>
									</Paper>
								</Grid>

								<WidgetDisplayList />
							</>
						)}
					</Grid>
				) : localStorage.getItem('token') && localStorage.getItem('userID') ? (
					<DashboardPlus />
				) : (
					console.log(
						'Redirecting cause no business selected while on dashboard. Business selected:',
						props.businessInfo.business_id
					) & props.history.push('/')
				)}
			</>
		</Grid>
	)

	//used to check if this is an actual business or just a new tab
	function businessesContains(business_id) {
		if (!business_id) {
			return false
		}

		let found = false
		props.businesses.forEach(element => {
			if (element.business_id === business_id) {
				found = true
			}
		})
		return found
	}
}

const mapStateToProps = state => ({
	id: state.business.currentlySelectedBusiness.business_id,
	businessInfo: state.business.currentlySelectedBusiness,
	businesses: state.business.businesses.concat(state.business.competitors),
	userBusinesses: state.business.businesses,
	competitors: state.business.competitors
})

export default connect(mapStateToProps, {
	fetchWordsOverTime,
	fetchTopAndBottom,
	fetchAllData
})(DashboardGrid)
