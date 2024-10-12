import * as Yup from 'yup'

export const authSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .matches(/^[A-Za-z0-9]{8,}$/, 'Password must be at least 8 characters long and contain only letters and numbers')
      .required('Password is required')
});

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(/^[A-Za-z0-9]{8,}$/, 'Password must be at least 8 characters long and contain only letters and numbers')
    .required('Password is required'),
  role: Yup.string().required('User type is required')
});