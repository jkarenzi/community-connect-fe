import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api'
import { CreateServiceFormData, IUpdateData, Service } from '../../types/Service';


export const fetchAllServices = createAsyncThunk<Service[]>(
  'services/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/service');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchOwnServices = createAsyncThunk<Service[]>(
  'services/fetchOwn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/service/own');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchServiceById = createAsyncThunk<Service, number>(
  'services/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const createService = createAsyncThunk<Service, CreateServiceFormData>(
  'services/create',
  async (data, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('location', data.location);
    formData.append('availability', data.availability.toString())
    formData.append('pricing', data.pricing.toString());
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image);

    try {
      const response = await axios.post('service', data, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const updateService = createAsyncThunk<Service, IUpdateData>(
  'services/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`service/${id}`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteService = createAsyncThunk<void, number>(
  'services/delete',
  async (id, { rejectWithValue}) => {
    try {
      const response = await axios.delete(`service/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);