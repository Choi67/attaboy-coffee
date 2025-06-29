import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// API 응답 타입 정의
export interface ApiResponse<T = any> {
  code: string;
  message: string;
  data: T;
}

// 로그인 응답 타입 정의
export interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

// axios 기본 설정
const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 포함 설정
};

// axios 인스턴스 생성
const api: AxiosInstance = axios.create(defaultConfig);

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // FormData 처리
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // GET 요청의 params 처리
    if (config.method?.toUpperCase() === 'GET' && config.params) {
      const queryString = new URLSearchParams(config.params).toString();
      config.url = `${config.url}${queryString ? `?${queryString}` : ''}`;
    }

    // POST/PUT/PATCH 요청의 params 처리
    if (['POST', 'PUT', 'PATCH'].includes(config.method?.toUpperCase() || '') && config.params) {
      config.data = config.params;
      delete config.params;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // 인증 에러 (401) 처리
    if (error.response?.status === 401) {
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // 다른 에러 처리
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 