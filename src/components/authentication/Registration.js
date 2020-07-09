import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'

import { Button, LinearProgress } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import GoogleLoginBtn from '../google/GoogleLoginBtn';

import RegistrationSchema from './RegistrationSchema'

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
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		borderRadius: 20
	}
}))

const Registration = props => {
	const [error, setError] = useState(null)
	console.log('props:', props)
	const classes = useStyles()

	const handleSubmit = async values => {
		const { first_name, last_name, email, password,type } = values

		try {
			const { data } = await axios.post(
				`https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/auth/register`,
				{
					first_name,
					last_name,
					email,
					password,
					type
				}
			)

			data && props.history.push('/Dashboard')
		} catch (err) {
			setError(err.response.data.errors[0])
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign up for an account
				</Typography>
				{error && (
					<Typography variant='overline' color='error'>
						{error}
					</Typography>
				)}
				<Formik
					initialValues={{
						first_name: '',
						last_name: '',
						email: '',
						password: '',
						confirmedPassword: '',
						type:"tally"
					}}
					onSubmit={(values, actions) => handleSubmit(values)}
					validationSchema={RegistrationSchema}
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
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											autoComplete='fname'
											name='first_name'
											variant='outlined'
											required
											fullWidth
											id='first_name'
											label='First Name'
											autoFocus
											onChange={handleChange}
											onBlur={handleBlur}
											error={
												errors.first_name && touched.first_name ? true : false
											}
											helperText={
												errors.first_name &&
												touched.first_name &&
												errors.first_name
											}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											variant='outlined'
											required
											fullWidth
											id='last_name'
											label='Last Name'
											name='last_name'
											autoComplete='lname'
											onChange={handleChange}
											onBlur={handleBlur}
											error={
												errors.last_name && touched.last_name ? true : false
											}
											helperText={
												errors.last_name &&
												touched.last_name &&
												errors.last_name
											}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											error={errors.email && touched.email ? true : false}
											variant='outlined'
											required
											fullWidth
											id='email'
											label='Email'
											name='email'
											autoComplete='email'
											onChange={handleChange}
											onBlur={handleBlur}
											helperText={errors.email && touched.email && errors.email}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant='outlined'
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
									</Grid>
									<Grid item xs={12}>
										<TextField
											variant='outlined'
											required
											fullWidth
											name='confirmedPassword'
											label='Confirm Password'
											type='password'
											id='confirmedPassword'
											onChange={handleChange}
											onBlur={handleBlur}
											error={
												errors.confirmedPassword && touched.confirmedPassword
													? true
													: false
											}
											helperText={
												errors.confirmedPassword &&
												touched.confirmedPassword &&
												errors.confirmedPassword
											}
										/>
									</Grid>
								</Grid>
								{isSubmitting && <LinearProgress />}
								<Button
									type='submit'
									variant='contained'
									color='primary'
									className={classes.submit}
									fullWidth
									disabled={
										(errors.first_name && touched.first_name) ||
										(errors.last_name && touched.last_name) ||
										(errors.email && touched.email) ||
										(errors.password && touched.password) ||
										(errors.confirmedPassword && touched.confirmedPassword)
											? true
											: false
									}
								>
									Sign Up
								</Button>
								<Grid container justify='center'>
									<Grid item>
										<p>
											Already have an account?{' '}
											<Link
												to='/Login'
												style={{ fontSize: 14, color: '#0000EE' }}
											>
												Sign in
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

export default Registration
