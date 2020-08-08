import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import axios from 'axios'

import { axiosWithAuth } from '../../auth/axiosWithAuth'

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 800,
		marginTop: 120,
		borderRadius: 15
	},
	formControl: {
		// margin: theme.spacing(1),
		// minWidth: 120,
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		width: 100,
		padding: 10
	},
	divider: {
		height: 28,
		margin: 4
	}
}))

export default function SearchBar() {
	const classes = useStyles()
	const [cuisine, setCuisine] = useState('All')
	const [open, setOpen] = React.useState(false)

	const handleChange = event => {
		setCuisine(event.target.value)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleSubmit = async () => {
		try {
			const { data } = await axiosWithAuth().get('/search/names')
			console.log({ data })
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start'
			}}
		>
			<Paper component='form' className={classes.root}>
				<FormControl className={classes.iconButton} onSubmit={handleSubmit}>
					<Select
						open={open}
						onClose={handleClose}
						onOpen={handleOpen}
						value={cuisine}
						onChange={handleSubmit}
					>
						<MenuItem value='All'>All</MenuItem>
						<MenuItem value={1}>American</MenuItem>
						<MenuItem value={2}>Chinese</MenuItem>
						<MenuItem value={3}>Cuban</MenuItem>
						<MenuItem value={4}>Greek</MenuItem>
						<MenuItem value={5}>Hawaiian</MenuItem>
						<MenuItem value={6}>Indian</MenuItem>
						<MenuItem value={7}>Italian</MenuItem>
						<MenuItem value={8}>Korean</MenuItem>
						<MenuItem value={9}>Mediterranean</MenuItem>
						<MenuItem value={10}>Mexican</MenuItem>
						<MenuItem value={11}>Other</MenuItem>
						<MenuItem value={12}>Pizza</MenuItem>
						<MenuItem value={13}>Southern</MenuItem>
						<MenuItem value={14}>Sushi</MenuItem>
						<MenuItem value={15}>Thai</MenuItem>
					</Select>
				</FormControl>

				<Divider className={classes.divider} orientation='vertical' />

				<InputBase
					className={classes.input}
					placeholder='Search for a business'
					inputProps={{ 'aria-label': 'search for a business' }}
					onChange={e => console.log(e.target.value)}
				/>
				<IconButton
					type='submit'
					className={{ ...classes.iconButton, paddingRight: 0 }}
					aria-label='search'
				>
					<SearchIcon />
				</IconButton>
			</Paper>
		</div>
	)
}
