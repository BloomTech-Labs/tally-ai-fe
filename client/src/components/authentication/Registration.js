import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
		width: 200,
		borderRadius: 20
	}
}));

const Registration = () => {
	const [credentials, setCredentials] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmedPassword: ''
	});

	const classes = useStyles();

	const handleChange = e => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign up for an account
				</Typography>
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email'
								name='email'
								autoComplete='email'
								onChange={handleChange}
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
								autoComplete='current-password'
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<p>
								Already have an account? <Link to='/Login'>Sign in</Link>
							</p>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default Registration;
