import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import LoginSchema from './LoginSchema'

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

const Login = () => {
	const [credentials, setCredentials] = useState({
		email: '',
		password: ''
	})

	const classes = useStyles()

	const handleSubmit = async () => {
		try {
			const { data } = await axios.post(
				`https://cors-anywhere.herokuapp.com/http://tallyai.us-east-1.elasticbeanstalk.com/api/auth/login`,
				credentials
			)
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<Formik
					initialValues={credentials}
					onSubmit={handleSubmit}
					validationSchema={LoginSchema}
				>
					{props => {
						const {
							touched,
							errors,
							isSubmitting,
							handleBlur,
							handleChange,
							handleReset
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
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}
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
			</div>
		</Container>
	)
}

export default Login
