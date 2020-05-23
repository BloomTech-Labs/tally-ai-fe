import * as Yup from 'yup';

// prettier-ignore
const RegistrationSchema = Yup.object().shape({
  firstName: Yup
    .string()
    .required('First name is required!'),
  lastName: Yup
    .string()
    .required('Last name is required!'),
  email: Yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: Yup
    .string()
		.required('Password is required!')
		.min(6, 'Password must be 6 characters min!'),
  confirmedPassword: Yup
    .string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match!')
		.required('Confirm your password!')
});

export default RegistrationSchema;
