import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { Button, LinearProgress } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import GoogleLoginBtn from '../google/GoogleLoginBtn'

import LoginSchema from './LoginSchema'
import { shouldUpdateLoggedInUser } from '../../actions/settingsActions'

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		borderRadius: 20
	}
}))

const Login = props => {
	const { loggedInUser } = useSelector(state => state.settings)
	console.log('loggedInUser', loggedInUser)
	const dispatch = useDispatch()
	const [error, setError] = useState(null)
	const classes = useStyles()

	const handleSubmit = async values => {
		try {
			const { data } = await axios.post(
				`https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/auth/login`,
				values
			)
			localStorage.setItem('token', data.token)
			localStorage.setItem('userID', data.id)
			dispatch(shouldUpdateLoggedInUser(true))
			data && props.history.push('/Dashboard/')
		} catch (err) {
			setError(err.response.data.message)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				{error && (
					<Typography variant='overline' color='error'>
						{error}
					</Typography>
				)}
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={(values, actions) => handleSubmit(values)}
					validationSchema={LoginSchema}
				>
					{props => {
						const {
							touched,
							errors,
							isSubmitting,
							handleBlur,
							handleChange
						} = props
						return (
							<Form className={classes.form} noValidate>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									autoFocus
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.email && touched.email ? true : false}
									helperText={errors.email && touched.email && errors.email}
								/>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='current-password'
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.password && touched.password ? true : false}
									helperText={
										errors.password && touched.password && errors.password
									}
								/>
								{isSubmitting && <LinearProgress />}
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
									disabled={
										(errors.email && touched.email) ||
										(errors.password && touched.password)
											? true
											: false
									}
								>
									Sign In
								</Button>
								
								<Grid container justify='center'>
									<Grid item>
										<p>
											Don't have an account?{' '}
											<Link
												to='/Register'
												style={{ fontSize: 14, color: '#0000EE' }}
											>
												Sign up
											</Link>
										</p>
									</Grid>
								</Grid>
							</Form>
						)
					}}
				</Formik>
				<GoogleLoginBtn />
			</div>
		</Container>
	)
}

export default Login
