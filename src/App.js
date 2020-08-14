import React, { useEffect } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	setUserInfo,
	getUserInfo,
	shouldUpdateLoggedInUser
} from './actions/settingsActions'
import PrivateRoute from './auth/PrivateRoute'
import PublicRoute from './auth/PublicRoute'
// Components
import RestrictMobile from './components/RestrictMobile'
import Search from './components/search/search.js'
import SearchPage from './components/search/SearchPage'
import DashboardGrid from './components/dashboard/dashboard'
import Registration from './components/authentication/Registration'
import Login from './components/authentication/Login'
import Settings from './components/settings/Settings.js'
import AboutUs from './components/aboutus'
import Policy from './components/TOS/legal'
import AppMenu from './components/menubar/AppMenu'
import NavBar from './components/menubar/navbar'

import { CssBaseline, makeStyles } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1
	}
}))

function App(props) {
	const classes = useStyles()

	console.log(props)

	useEffect(() => {
		console.log('getting user data')
		if (
			localStorage.getItem('token') &&
			localStorage.getItem('userID') &&
			props.loggedInUser.shouldUpdate
		) {
			//we're logged in but there's no user info in the store, lets fix that

			props.getUserInfo(localStorage.getItem('userID'))
		} else {
			//do we need to delete anything from state when they log out?
			let userInfo = {
				firstName: null,
				lastName: null,
				userId: null,
				type: null
			}

			props.setUserInfo(userInfo)
		}
		props.shouldUpdateLoggedInUser(false)
	}, [props.loggedInUser.shouldUpdate])

	return (
		<div className='App'>
			<CssBaseline />

			<RestrictMobile />
			{props.location.pathname !== '/' ? <AppMenu /> : <NavBar />}

			<main className={classes.content}>
				<PublicRoute exact path='/' component={Search} />
				<Route path='/dashboard/' component={DashboardGrid} />
				<Route path='/register' component={Registration} />
				<Route path='/login' component={Login} />
				<Route path='/about' component={AboutUs} />
				<Route path='/legal' component={Policy} />
				<PrivateRoute path='/settings' component={Settings} />
				<PrivateRoute path='/search/:searchMode' exact component={SearchPage} />
			</main>
		</div>
	)
}

const mapStateToProps = state => ({
	loggedInUser: state.settings,
	success: state.settings.success
})

export default withRouter(
	connect(mapStateToProps, {
		setUserInfo,
		getUserInfo,
		shouldUpdateLoggedInUser
	})(App)
)
