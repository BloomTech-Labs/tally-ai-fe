import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Result from './result'
import {
	selectBusiness,
	resetSearchResults
} from '../../actions/businessActions'
import './results.scss'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '5rem',
		overflow: 'auto',
		'-ms-overflow-style': 'none',
		height: '92%',
		animation: `$slideIn 1s forwards`,
		width: '100%',

		[theme.breakpoints.up('lg')]: {
			width: '50%',
			maxWidth: '600px'
		}
	},
	text: {
		background: 'rgba(255, 255, 255, 0.6)',
		padding: '1rem .4rem',
		borderRadius: '.4rem'
	},
	'@keyframes slideIn': {
		from: {
			width: '0px',
			opacity: '0'
		},
		to: {
			width: '100%',
			opacity: '1'
		}
	}
}))

const Results = props => {
	const classes = useStyles()

	const [tentativeSelection, setTentativeSelection] = useState('')

	useEffect(() => {
		if (tentativeSelection !== '') {
			select()
		}
	}, [tentativeSelection])

	/*
    select is used as the onClick for the select button.
    Calling the select function does the following:
    - adds the business information from tentativeSelection 
      to the store under state.businessInfo
    - routes the user to the dashboard
  */
	const select = data => {
		props.select(data)
		props.resetSearchResults()
	}

	/*
    active, props.businesses.error, and props.businesses.isFetching
    are used to conditionally render the results section.
    
    active is true if the request to Yelp was successful and the
    search results are in
  */
	if (!props.businesses.data || !!props.businesses.isFetching) {
		return null
	}

	return (
		<div className={classes.container}>
			{props.businesses.isFetching ? (
				<Typography align='center' variant='h4' className={classes.text}>
					Loading Search Results...
				</Typography>
			) : null}
			{props.businesses.data.length > 0 ? (
				props.businesses.data.map(result => {
					return (
						<Result
							data={result}
							select={select}
							key={result.business_id}
							setTentativeSelection={setTentativeSelection}
							searchMode={props.searchMode}
						/>
					)
				})
			) : (
				<Typography align='center' variant='h3' className={classes.text}>
					No results Found
				</Typography>
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	businesses: state.business.searchResults,
	selectedBusiness: state.business.currentlySelectedBusiness
})

export default connect(mapStateToProps, { selectBusiness, resetSearchResults })(
	Results
)
