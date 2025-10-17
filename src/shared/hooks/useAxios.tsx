import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { useMemo } from 'react';

const useAxios = () => {
  const { getToken } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:8080/'
    });

    instance.interceptors.request.use(
      async (config: any) => {
        const token = await getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        if (error.response?.status === 401) {
          console.error('Unauthorized access - token may be invalid or expired.');
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [getToken]);

  return axiosInstance;
};

export default useAxios;