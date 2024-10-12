import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../types/Review';
import { fetchReviews, leaveReview } from './actions/reviewActions';
import { errorToast, successToast } from '../services/toast';


interface ReviewState {
  reviews: Review[];
  loading: boolean;
  status: 'idle'|'successful'|'failed'
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  status: 'idle'
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetStatus: (state) => {
        state.status = 'idle'
    }
  },
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
      state.status = 'successful'
      successToast('Successful')
    });
    builder.addCase(leaveReview.rejected, (state, action) => {
      state.loading = false;
      state.status = 'successful'
      errorToast(action.payload as string)
    });
  },
});

export const {resetStatus} = reviewSlice.actions
export default reviewSlice.reducer;