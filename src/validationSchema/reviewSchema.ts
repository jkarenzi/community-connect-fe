import * as Yup from 'yup'

export const reviewSchema = Yup.object({
    rating: Yup.number()
      .min(0, 'Rating must be above zero')
      .max(5, 'Rating cant be above  5')
      .required('Rating is required'),
    description: Yup.string()
      .required('Description is required')
});