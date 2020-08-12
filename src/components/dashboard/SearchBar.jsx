import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

import { axiosWithAuth } from '../../auth/axiosWithAuth'
import { fetchBusinessByName } from '../../actions/businessActions'

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
		borderColor: 'red',
		borderWidth: 2,
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
	const [search, setSearch] = useState('')
	const [businessNames, setBusinessNames] = useState([])
	const [filteredBusinessNames, setFilteredBusinessNames] = useState([])
	const [cuisine, setCuisine] = useState('All')
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const fetchBusinessNames = async () => {
			try {
				const { data } = await axiosWithAuth().get('/search/names')
				const businessNamesInsensitive = data.map((businessName, index) => {
					return {
						businessName,
						businessNameLowerCase: businessName.toLowerCase(),
						index
					}
				})
				setBusinessNames(businessNamesInsensitive)
			} catch (error) {
				console.error(error)
			}
		}

		!businessNames.length > 0 && fetchBusinessNames()
	}, [businessNames])

	const handleChange = event => {
		setCuisine(event.target.value)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleSubmit = async e => {
		e.preventDefault()
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
								onChange={handleChange}
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
					</>
				)}
				<InputBase
					value={search}
					className={classes.input}
					placeholder='Search by name'
					inputProps={{ 'aria-label': 'search for a business' }}
					onChange={e => handleSearch(e.target.value)}
					onSubmit={handleSubmit}
				/>
				<IconButton
					type='submit'
					className={{ ...classes.iconButton, paddingRight: 0 }}
					aria-label='search'
				>
					<SearchIcon />
				</IconButton>
			</Paper>
			{search && (
				<div className={classes.list}>
					<List component='nav'>
						{businessNames.length > 0 &&
							filteredBusinessNames
								.slice(0, 5)
								.map(({ businessName, index }) => {
									return (
										<ListItem button key={index}>
											<ListItemText
												primary={businessName}
												onClick={() => {
													dispatch(fetchBusinessByName(businessName))
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
