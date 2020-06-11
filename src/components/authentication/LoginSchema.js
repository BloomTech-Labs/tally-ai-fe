import * as Yup from 'yup'

// prettier-ignore
const LoginSchema = Yup.object().shape({
   email: Yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: Yup
    .string()
		.required('Password is required!')
		.min(6, 'Password must be 6 characters min!')  
});

export default LoginSchema
