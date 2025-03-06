import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Authentication
export const loginUser = async (name, email) => {
  const response = await api.post('/auth/login', { name, email });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const fetchBreeds = async () => {
  const response = await api.get('/dogs/breeds');
  return response.data;
};

export const searchDogs = async (params) => {
  const response = await api.get('/dogs/search', { params });
  return response.data;
};

export const fetchDogsByIds = async (dogIds) => {
  const response = await api.post('/dogs', dogIds);
  return response.data;
};

export const matchDogs = async (dogIds) => {
  const response = await api.post('/dogs/match', dogIds);
  return response.data;
};

export const fetchLocations = async (zipCodes) => {
  const response = await api.post('/locations', zipCodes);
  return response.data;
};

export const searchLocations = async (searchParams) => {
  const response = await api.post('/locations/search', searchParams);
  return response.data;
};
