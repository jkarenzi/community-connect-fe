import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../types/Review';
import { fetchReviews, leaveReview } from './actions/reviewActions';
import { errorToast } from '../services/toast';


interface ReviewState {
  reviews: Review[];
  loading: boolean;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      errorToast(action.payload as string)
    });
    builder.addCase(leaveReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(leaveReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
      state.loading = false;
    });
    builder.addCase(leaveReview.rejected, (state, action) => {
      state.loading = false;
      errorToast(action.payload as string)
    });
  },
});


export default reviewSlice.reducer;