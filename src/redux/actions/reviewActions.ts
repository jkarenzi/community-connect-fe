import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Review, ReviewFormData } from '../../types/Review';


export const fetchReviews = createAsyncThunk<Review[], number>(
  'reviews/fetchReviews',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`review/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const leaveReview = createAsyncThunk<Review, ReviewFormData>(
  'reviews/leave',
  async (formData, { rejectWithValue}) => {
    try {
      const response = await axios.post('review', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
