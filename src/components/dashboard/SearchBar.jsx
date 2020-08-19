import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {
	fetchBusinessNames,
	fetchBusinessBy,
	resetSearchResults
} from '../../actions/businessActions'

const useStyles = makeStyles(theme => ({
	form: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 800,
		borderRadius: 15
	},
	list: {
		width: '100%',
		marginTop: 10,
		width: 800,
		maxHeight: 400,
		overflow: 'auto',
		borderRadius: 10,
		backgroundColor: theme.palette.background.paper
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

export default function SearchBar({ searchByNameOnly }) {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { businessNames: businessesNames } = useSelector(
		state => state.business
	)
	const [search, setSearch] = useState('')
	const [businessNames, setBusinessNames] = useState(businessesNames)
	const [filteredBusinessNames, setFilteredBusinessNames] = useState([])
	const [cuisine, setCuisine] = useState('All')
	const [open, setOpen] = useState(false)

	useEffect(() => {
		!businessesNames.length > 0 && dispatch(fetchBusinessNames())
		setBusinessNames(businessesNames)
	}, [businessesNames])

	const handleCuisineChange = () => {
		const filteredByCuisine =
			cuisine === 'All'
				? businessesNames
				: businessesNames.filter(business => business.cuisine === cuisine)

		setBusinessNames(filteredByCuisine)
		setSearch('')
	}

	useEffect(() => {
		handleCuisineChange()
	}, [cuisine])

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleSearch = text => {
		const searchString = text.toLowerCase()
		const filtered =
			text === ''
				? businessNames.businessName
				: businessNames.filter(
						({ businessNameLowerCase }) =>
							businessNameLowerCase.indexOf(searchString) > -1
				  )
		setSearch(text)
		setFilteredBusinessNames(filtered)
		dispatch(resetSearchResults())
	}

	return (
		<>
			<Paper component='form' className={classes.form}>
				{!searchByNameOnly && (
					<>
						<FormControl className={classes.iconButton}>
							<Select
								open={open}
								onClose={handleClose}
								onOpen={handleOpen}
								value={cuisine}
								onChange={e => setCuisine(e.target.value)}
							>
								<MenuItem value='All'>All</MenuItem>
								<MenuItem value={'american'}>American</MenuItem>
								<MenuItem value={'chinese'}>Chinese</MenuItem>
								<MenuItem value={'cuban'}>Cuban</MenuItem>
								<MenuItem value={'greek'}>Greek</MenuItem>
								<MenuItem value={'hawaiian'}>Hawaiian</MenuItem>
								<MenuItem value={'indian'}>Indian</MenuItem>
								<MenuItem value={'italian'}>Italian</MenuItem>
								<MenuItem value={'korean'}>Korean</MenuItem>
								<MenuItem value={'mediterranean'}>Mediterranean</MenuItem>
								<MenuItem value={'mexican'}>Mexican</MenuItem>
								<MenuItem value={'other'}>Other</MenuItem>
								<MenuItem value={'pizza'}>Pizza</MenuItem>
								<MenuItem value={'pub'}>Pub</MenuItem>
								<MenuItem value={'southern'}>Southern</MenuItem>
								<MenuItem value={'sushi'}>Sushi</MenuItem>
								<MenuItem value={'thai'}>Thai</MenuItem>
							</Select>
						</FormControl>

						<Divider className={classes.divider} orientation='vertical' />
					</>
				)}
				<InputBase
					value={search}
					className={classes.input}
					placeholder='Search by name'
					inputProps={{ 'aria-label': 'search for a business' }}
					onChange={e => handleSearch(e.target.value)}
					onSubmit={() => {}}
				/>
				<IconButton
					// type='submit'
					className={{ ...classes.iconButton, paddingRight: 0 }}
					aria-label='search'
				>
					<SearchIcon />
				</IconButton>
			</Paper>
			{search && (
				<div
					className={classes.list}
					style={searchByNameOnly ? {} : { marginLeft: 'auto' }}
				>
					<List component='nav'>
						{filteredBusinessNames.length > 0 &&
							filteredBusinessNames
								.slice(0, 5)
								.map(({ businessName, index }) => {
									return (
										<ListItem button key={index}>
											<ListItemText
												primary={businessName}
												onClick={() => {
													dispatch(fetchBusinessBy('name', businessName))
													setSearch('')
												}}
											/>
										</ListItem>
									)
								})}
					</List>
				</div>
			)}
		</>
	)
}
