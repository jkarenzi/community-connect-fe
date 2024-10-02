import * as Yup from 'yup'

export const categorySchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be above three characters')
      .required('Name is required'),
    limit: Yup.number()
      .min(1, 'Limit must be above zero')
      .nullable()
});