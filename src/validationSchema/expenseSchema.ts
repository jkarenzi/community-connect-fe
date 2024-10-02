import * as Yup from 'yup'

export const expenseSchema = Yup.object({
    description: Yup.string().required('Description is required'),
    categoryId: Yup.number()
      .required('Category is required'),
    amount: Yup.number()
      .min(1, 'Amount must be above zero')
      .required('Amount is required'),
    date: Yup.date().required('Date is required')
});

export const dateFilterSchema = Yup.object({
  from: Yup.date()
    .required("'From' date is required"),
  to: Yup.date()
    .nullable()
    .when(
      "from",
      (from, schema) =>
        from &&
        schema.min(
          from,
          "'To' date must be later than the 'from' date"
        )
    ),
});