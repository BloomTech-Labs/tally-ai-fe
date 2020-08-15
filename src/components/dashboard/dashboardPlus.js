import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import {XCircle} from "react-feather";

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
	header: {
		display: 'flex',
		marginBottom: '2rem',
		marginTop: '2rem'
	},
	boxFont: {
		fontWeight: 'bold',
		marginTop: '.2rem'
	},
	addGrid: {
		margin: '0 2.2rem'
	},
	cardButton: {
		display: "flex"
	},
	deleteButton: {
		margin: "16px 16px auto 0",
		width: "24px",
		height: "24px"
	},
	avatar: {
		width: theme.spacing(7),
		height: theme.spacing(7)
	}
}))

function DashboardPlus(props) {
	const classes = useStyles()

	return (
		<Grid
			container
			direction='column'
			justify='center'
			alignItems='flex-start'
			className={classes.root}
		>
			<Box className={classes.box}>
				<Grid className={classes.header}>
					<Typography
						variant='h4'
						component='h2'
						gutterBottom
						className={classes.boxFont}
					>
						My Businesses
					</Typography>
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
										className={classes.cardButton}
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
										<Tooltip title="Delete" aria-label="delete">
											<XCircle 
												className={classes.deleteButton} 
												onClick={(e)=> {
													e.stopPropagation() 
													props.removeBusiness(business.business_id,props.userId)
												}}
											/>
										</Tooltip>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}
				</Grid>
			</Box>
			<Box className={classes.box}>
				<Grid className={classes.header}>
					<Typography
						variant='h4'
						component='h2'
						gutterBottom
						className={classes.boxFont}
					>
						My Competitors
					</Typography>
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
										className={classes.cardButton}
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
										<Tooltip title="Delete" aria-label="delete">
											<XCircle 
												className={classes.deleteButton} 
												onClick={(e)=> {
													e.stopPropagation() 
													props.removeCompetitor(competitor.business_id,props.userId)
												}}
											/>
										</Tooltip>
									</CardActionArea>
								</Card>
							</Grid>
						)
					})}
				</Grid>
			</Box>
		</Grid>
	)
}

const mapStateToProps = state => ({
	competitors: state.business.competitors,
	businesses: state.business.businesses,
	selectedBusiness: state.business.currentlySelectedBusiness,
	userId: state.settings.data.userId
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
