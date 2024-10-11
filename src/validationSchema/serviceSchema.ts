import * as Yup from 'yup';

export const serviceSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  location: Yup.string().required('Location is required'),
  availability: Yup.boolean().required('Availability is required'),
  pricing: Yup.number()
    .required('Pricing is required')
    .positive('Pricing must be a positive number'),
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.string()
    .url('Image must be a valid URL')
    .required('Image is required'),
});
