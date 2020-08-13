import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'

import {
	fetchBusinesses,
	selectBusiness,
	addBusiness,
	removeBusiness,
	addCompetitor,
	removeCompetitor
} from '../../actions/businessActions'

import {
	CardActionArea,
	Grid,
	Typography,
	Box,
	Card,
	Tooltip,
	Fab,
	CardHeader,
	Avatar
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 'calc(100vh - 6.6rem)'
	},
	container: {
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center'
		}
	},
	box: {
		margin: '1rem 0 1rem 0',
		textAlign: 'left',
		width: '100%'
	},
	boxFont: {
		fontWeight: 'bold',
		marginBottom: '3rem'
	},
	addGrid: {
		margin: '0 5.2rem'
	},

	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7)
	}
}))

function DashboardPlus(props) {
	const classes = useStyles()

	//get the currently selected tab, and set it to the newly selected business
	//this might be deleted since we are not using tabs no more
	function modifyActiveTab(business) {
		let contains = null
		props.activeTabs.forEach(tab => {
			if (tab.business_id === business.business_id) {
				contains = tab
			}
		})
		if (contains) {
			props.selectBusiness(props.selectedBusiness, contains) //the user is trying to add a business that they already have a tab open for, just set that tab as selected
		} else {
			props.activeTabs.forEach(tab => {
				if (tab.business_id === props.selectedBusiness.business_id) {
					//the currently selected tab is always the currently selected business, so we can find it by seeing which tab = currentlySelectedBusiness

					let tabIndex
					let newTabsArray = props.activeTabs.filter((item, index) => {
						if (item.business_id === tab.business_id) {
							tabIndex = index
						}
						return item.business_id != tab.business_id
					}) //remove the tab we want to modify
					newTabsArray.splice(tabIndex, 0, { ...business }) //add back the tab but with the new name

					props.setActiveTabs(
						props.activeTabs,
						newTabsArray,
						localStorage.getItem('userID')
					)
				}
			})
		}
	}

	return (
		<Grid
			container
			direction='column'
			justify='center'
			alignItems='flex-start'
			className={classes.root}
		>
			<Box className={classes.box}>
				<Typography
					variant='h4'
					component='h2'
					gutterBottom
					className={classes.boxFont}
				>
					My Businesses
				</Typography>

				<Grid
					container
					justify='flex-start'
					alignItems='center'
					spacing={1}
					className={classes.container}
				>
					{props.businesses.slice(0, 10).map(business => {
						return (
							<Grid item key={business.business_id}>
								<Card>
									<CardActionArea
										onClick={() => {
											props.selectBusiness(business)
										}}
									>
										<CardHeader
											avatar={
												<Avatar
													classes={{ root: classes.avatar }}
													alt={business.name}
													src={business.img ? business.img : business.name}
												/>
											}
											title={business.name}
											subheader={business.address}
										/>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}
					<Grid className={classes.addGrid} item>
						<Tooltip title='Add a Business' arrow>
							<Fab
								aria-label='add'
								onClick={() => {
									props.history.push('/search/business')
								}}
							>
								<AddIcon fontSize='large' />
							</Fab>
						</Tooltip>
					</Grid>
				</Grid>
			</Box>
			<Box className={classes.box}>
				<Typography
					variant='h4'
					component='h2'
					gutterBottom
					className={classes.boxFont}
				>
					My Competitors
				</Typography>

				<Grid
					container
					justify='flex-start'
					alignItems='center'
					spacing={2}
					className={classes.container}
				>
					{props.competitors.slice(0, 10).map(competitor => {
						return (
							<Grid item key={competitor.business_id}>
								<Card>
									<CardActionArea
										onClick={() => {
											props.selectBusiness(competitor)
										}}
									>
										<CardHeader
											avatar={
												<Avatar
													classes={{ root: classes.avatar }}
													alt={competitor.name}
													src={
														competitor.img ? competitor.img : competitor.name
													}
												/>
											}
											title={competitor.name}
											subheader={competitor.address}
										/>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}

					<Grid className={classes.addGrid} item>
						<Tooltip title='Add a Competitor' arrow>
							<Fab
								aria-label='add-competitor'
								onClick={() => {
									props.history.push('/search/competitor')
								}}
							>
								<AddIcon fontSize='large' />
							</Fab>
						</Tooltip>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	)
}

const mapStateToProps = state => ({
	competitors: state.business.competitors,
	businesses: state.business.businesses,
	selectedBusiness: state.business.currentlySelectedBusiness
})

export default withRouter(
	connect(mapStateToProps, {
		fetchBusinesses,
		addBusiness,
		addCompetitor,
		removeBusiness,
		removeCompetitor,
		selectBusiness
	})(DashboardPlus)
)
