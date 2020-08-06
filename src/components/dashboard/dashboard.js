import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper, Card, CardActionArea, CardHeader, Avatar } from '@material-ui/core'
import RestaurantIcon from '@material-ui/icons/Restaurant';

import WidgetDisplayList from '../WidgetSystem/WidgetDisplayList'



import {
	fetchWordsOverTime,
	fetchTopAndBottom,
	fetchAllData
} from '../../actions/widgetsActions'
import DashboardPlus from './dashboardPlus'


const useStyles = makeStyles(theme => ({
	root: {
		padding: "2rem 32px 0 32px",
		margin: "4.6rem 0 0 13rem",
		textAlign: "center",
		[theme.breakpoints.up("lg")] :{
			width : "996px",
			margin: "4.6rem auto 4.6rem auto",
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
		if (
			businessesContains(props.businessInfo.business_id) ||
			!localStorage.getItem('token')
		) {
			props.fetchAllData(props.businessInfo.business_id)
		}


	}, [props.businessInfo.business_id, props.competitors, props.userBusinesses])

	return (
		<Grid className={classes.root}>
			<>
				{props.businessInfo.business_id ? (
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
								{/* <p className={classes.count}>{props.businessInfo.review_count.toLocaleString()}</p> */}
								
								<p>Total Reviews</p>
							</Paper>
							<Paper  variant="outlined" className={classes.paper} >
								<p className={classes.count} >{props.businessInfo.business_stars} stars</p>
								<p>Overall Rating</p>
							</Paper>
							<Paper  variant="outlined" className={classes.paper}>
								<p className={classes.count} >{props.businessInfo.change_in_rating}</p>
								<p>Change in Rating</p>
							</Paper>
						</Grid>
						
						<WidgetDisplayList />
					</Grid>
				) : (
						localStorage.getItem('token') && localStorage.getItem('userID') ? <DashboardPlus/> : (
						console.log(
							'Redirecting cause no business selected while on dashboard. Business selected:',
							props.businessInfo.business_id
						) & props.history.push('/') 
					) 
					
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
	businesses: state.business.businesses.concat(
		state.business.competitors
	),
	userBusinesses: state.business.businesses,
	competitors: state.business.competitors,
})

export default connect(mapStateToProps, {
	fetchWordsOverTime,
	fetchTopAndBottom,
	fetchAllData
})(DashboardGrid)
