import { createSlice } from '@reduxjs/toolkit';
import { fetchAllServices, fetchOwnServices, fetchServiceById, createService, updateService, deleteService } from './actions/serviceActions';
import { Service } from '../types/Service';
import { errorToast } from '../services/toast';

interface ServiceState {
  services: Service[];
  ownServices: Service[];
  selectedService: Service | null;
  loading: boolean;
  fetching: boolean;
}

const initialState: ServiceState = {
  services: [],
  ownServices: [],
  selectedService: null,
  loading: false,
  fetching: false
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllServices.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchAllServices.fulfilled, (state, action) => {
      state.services = action.payload;
      state.fetching = false;
    });
    builder.addCase(fetchAllServices.rejected, (state, action) => {
      state.fetching = false;
      errorToast(action.payload as string)
    });
    builder.addCase(fetchOwnServices.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchOwnServices.fulfilled, (state, action) => {
      state.ownServices = action.payload;
      state.fetching = false;
    });
    builder.addCase(fetchOwnServices.rejected, (state, action) => {
      state.fetching = false;
      errorToast(action.payload as string)
    });
    builder.addCase(fetchServiceById.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchServiceById.fulfilled, (state, action) => {
      state.selectedService = action.payload;
      state.fetching = false;
    });
    builder.addCase(fetchServiceById.rejected, (state, action) => {
      state.fetching = false;
      errorToast(action.payload as string)
    });
    builder.addCase(createService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createService.fulfilled, (state, action) => {
      state.services.push(action.payload);
      state.loading = false;
    });
    builder.addCase(createService.rejected, (state, action) => {
      state.loading = false;
      errorToast(action.payload as string)
    });
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      errorToast(action.payload as string)
    });
    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.services = state.services.filter(service => service.id !== action.meta.arg);
      state.loading = false;
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      errorToast(action.payload as string)
    });
  },
});

export default serviceSlice.reducer;
