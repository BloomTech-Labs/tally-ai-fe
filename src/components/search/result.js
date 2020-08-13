import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { CardHeader, Avatar } from '@material-ui/core'

import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import './results.scss'
import ToggleFavoriteButton from '../ToggleFavoriteButton'

const useStyles = makeStyles(theme => ({
	card: {
		width: '100%',
		minHeight: '110px',
		marginBottom: theme.spacing(4)
	},
	avatar: {
		width: theme.spacing(10),
		height: theme.spacing(10)
	}
}))

const Result = ({ data, setTentativeSelection, select, searchMode }) => {
	const classes = useStyles()

	const { businesses } = useSelector(state => state.business)
	const [open, setOpen] = useState(false)
	const [isSelected, setIsSelected] = useState(false)
	const [message, setMessage] = useState('')

	const selectedBusiness = e => {
		e.preventDefault()
		setIsSelected(!isSelected)

		const alreadyAdded = businesses.some(
			({ business_id }) => business_id === data.business_id
		)

		if (alreadyAdded) {
			setMessage(
				`${
					searchMode === 'business' ? 'Businesses' : 'Competitor'
				} already added!`
			)
			handleClick()
		} else {
			select(data)
		}
	}

	const handleClick = () => {
		setOpen(true)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	return (
		<>
			<Card className={classes.card} onClick={selectedBusiness}>
				<CardActionArea>
					<CardHeader
						avatar={
							<Avatar
								className={classes.avatar}
								aria-label={data.name}
								src={data.image_url}
							>
								{data.name
									.split(' ')
									.map(t => t[0])
									.join(' ')}
							</Avatar>
						}
						title={data.name}
						subheader={
							<>
								<Typography>{data.address}</Typography>
								<Typography>{`${data.city}, ${data.zipcode}`}</Typography>
							</>
						}
					></CardHeader>
				</CardActionArea>
			</Card>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Note archived'
				action={
					<React.Fragment>
						<Button color='secondary' size='small' onClick={handleClose}>
							UNDO
						</Button>
						<IconButton
							size='small'
							aria-label='close'
							color='inherit'
							onClick={handleClose}
						>
							<CloseIcon fontSize='small' />
						</IconButton>
					</React.Fragment>
				}
			/>
			{/* {message && message} */}
		</>
	)
}

export default Result
