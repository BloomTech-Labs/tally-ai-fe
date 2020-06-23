import * as Yup from 'yup';

// prettier-ignore
const RegistrationSchema = Yup.object().shape({
  first_name: Yup
    .string()
    .required('First name is required!'),
  last_name: Yup
    .string()
    .required('Last name is required!'),
  email: Yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: Yup
    .string()
		.required('Password is required!')
		.min(8, 'Password must be 8 characters min!'),
  confirmedPassword: Yup
    .string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match!')
		.required('Confirm your password!')
});

export default RegistrationSchema;
