import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Card, CardActionArea, CardHeader, Avatar } from '@material-ui/core'
import RestaurantIcon from '@material-ui/icons/Restaurant';

import WidgetDisplayList from '../WidgetSystem/WidgetDisplayList'

import Sidebar from './Sidebar'

import {
	fetchWordsOverTime,
	fetchTopAndBottom,
	fetchAllData
} from '../../actions/widgetsActions'
import DashboardPlus from './dashboardPlus'


const useStyles = makeStyles(theme => ({
	root: {
		padding: "2rem 32px 0 32px",
		margin: "4.6rem 0 0 0",
		textAlign: "center",
		[theme.breakpoints.up("lg")] :{
			maxWidth : "1024px",
			marginLeft : "auto",
			marginRight : "auto"
		},
		minWidth: "324px",
	},
	businessContainer : {
		justifyContent: "space-around",
		alignItems: "center"
	},
	card: {
		padding: theme.spacing(1),
		width: theme.spacing(32),
		height: theme.spacing(16),
		[theme.breakpoints.down("sm")]: {
			width: theme.spacing(18),
			height: theme.spacing(14),
			flex: "0 0 100%",
			marginBottom: "2rem"
			},
	},
	avatar: {
		width: theme.spacing(7),
    	height: theme.spacing(7),
	},
	actions: {
		height: "100%",
	},
	paper: {
		padding: theme.spacing(1),
		display:"flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F9F9F9",
		color: theme.palette.text.secondary,
		width: theme.spacing(30),
		height: theme.spacing(8),
		[theme.breakpoints.down("sm")]: {
		width: theme.spacing(18),
		height: theme.spacing(6)
		},
		"& > *" : {
			margin: "0px",
			color: "black",
		},
		[theme.breakpoints.down("xs")]: { 
			width: theme.spacing(10),
			fontSize: ".6rem",
		}
		
	},
	count: {
		fontWeight: "bold",
		fontSize: "1.4rem",
	}
}))

function DashboardGrid(props) {
	const classes = useStyles()

	// Fetch data for widgets
	useEffect(() => {
		console.log('Fetching all widget data with ID ', props.id)

		// Only fetch data if a selected business is in the businesses or competitors array
		// or if the user is not logged in
		if (
			businessesContains(props.businessInfo.businessId) ||
			!localStorage.getItem('token')
		) {
			props.fetchAllData(props.id)
		}


	}, [props.businessInfo, props.competitors, props.userBusinesses])

	return (
		<Grid className={classes.root}>
			<>
				{/* <Sidebar /> */}
			</>
			{/*Side bar removal to overlay/// fragmenting div*/}
			<>
				{localStorage.getItem('token') && localStorage.getItem('userID') ? (
					<>
						{businessesContains(props.businessInfo.businessId) ? (
							<Grid justify="center">
								<Grid container className={classes.businessContainer}>
									{/* <Card className={classes.card}>
										<CardActionArea disableSpacing className={classes.actions}>
											<CardHeader
												avatar={
													<Avatar className={classes.avatar} src={props.businessInfo.businessImg ? props.businessInfo.businessImg : null}>

														<RestaurantIcon/>
													</Avatar>
												}
												title={props.businessInfo.businessName}
												subheader={props.businessInfo.address}

											/>
										</CardActionArea>
									</Card> */}
									<Paper  variant="outlined" className={classes.paper} >
										<p className={classes.count}>{props.businessInfo.review_count.toLocaleString()}</p>
										
										<p>Total Reviews</p>
									</Paper>
									<Paper  variant="outlined" className={classes.paper} >
										<p className={classes.count} >{props.businessInfo.business_stars} stars</p>
										<p>Overall Rating</p>
									</Paper>
									<Paper  variant="outlined" className={classes.paper}>
										<p className={classes.count} >{"0000"}</p>
										<p>Change in Rating</p>
									</Paper>
								</Grid>
								Widget data
								{/* <WidgetDisplayList /> */}
							</Grid>
						) : (
							<DashboardPlus /> 
						)}
					</>
				) : props.businessInfo.businessId ? ( //if a business is selected
					<div>
						{console.log(
							'Not Redirecting cause business selected while on dashboard. Business selected:',
							props.businessInfo.businessId
						)}
						<div className='businessStats'>
							<div className='reviews'>
								<p>{props.businessInfo.reviewCount}</p>
								<br />
								<p style={{ fontSize: '1rem' }}>Total Reviews</p>
							</div>
							<div className='ratings'>
								<p>{props.businessInfo.averageRating}</p>
								<br />
								<p style={{ fontSize: '1rem' }}>Overall Rating</p>
							</div>
							<div className='changeofrating'>
								<p>11%</p>
								<br />
								<p>Change in Rating</p>
							</div>
						</div>
						{/* <WidgetDisplayList /> */}
					</div>
				) : (
					console.log(
						'Redirecting cause no business selected while on dashboard. Business selected:',
						props.businessInfo.businessId
					) & props.history.push('/') //FIXME: while deployed, instead of re-routing to just tally-ai.com/ it goes to tally-ai.com/index.html. This causes errors.
				)}
			</>
		</Grid>
	)

	//used to check if this is an actual business or just a new tab
	function businessesContains(businessId) {
		console.log('props.businesses in businessContains: ', props.businesses)

		if (!businessId) {
			return false
		}

		let found = false
		props.businesses.forEach(element => {
			if (element.businessId === businessId) {
				found = true
			}
		})
		return found
	}
}

const mapStateToProps = state => ({
	// words: state.widgetData.keyWords.data,
	// isFetching: state.widgetData.keyWords.isFetching,
	// id: state.business.ci
	id: state.business.currentlySelectedBusiness.businessId,
	businessInfo: state.business.currentlySelectedBusiness,
	businesses: state.business.userBusinesses.businesses.concat(
		state.competitor.competitors.businesses
	),
	userBusinesses: state.business.userBusinesses.businesses,
	competitors: state.competitor.competitors.businesses
})

export default connect(mapStateToProps, {
	fetchWordsOverTime,
	fetchTopAndBottom,
	fetchAllData
})(DashboardGrid)
