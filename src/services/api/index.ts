import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_BASE_URL} from '../../constants/env';
import {logOnDev} from '../../utils';

const api = axios.create({
  baseURL: API_BASE_URL,
});

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const {method, url} = response.config;
  const {status} = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);

  return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const {message} = error;
    const {method, url} = error.config as AxiosRequestConfig;
    const {status} = (error.response as AxiosResponse) ?? {};

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`,
    );

    switch (status) {
      case 401: {
        // "Login required"
        break;
      }
      case 403: {
        // "Permission denied"
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        // "Unknown error occurred"
        break;
      }
    }

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
      // zustandStorage.clear();
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

api.interceptors.response.use(onResponse, onErrorResponse);

export default api;
