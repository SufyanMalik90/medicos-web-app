import axios from "axios";
import Cookies from "js-cookie";

// axios instance
export const api = axios.create({
  baseURL: "https://medicose.coderloops.com",
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWY2MzExNzQzOTE4OGU2YjI4NzQxNSIsImlhdCI6MTcyNTczOTM5MywiZXhwIjoxNzU3Mjc1MzkzfQ.mDjB64bz5OnPdAfOS3We8qj7Ko2vOJ2qMpgG4usg4WI`,
  },
});

export const auth = axios.create({
  baseURL: "https://medicose.coderloops.com",
  timeout: 15000,
});

// Request interceptor to handle API calls with tokens
auth.interceptors.request.use(
  (config) => {
    // List of auth endpoints that need a token
    return config;
  },
  (error) => {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly.",
      );
      return Promise.reject(error);
    }

    

    // specific error handling done elsewhere
    return Promise.reject(error);
  },
);

// Response interceptor (optional)
auth.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    // *For unAuthorized
    
    // if (error.response.status === 401) {
    //   localStorage.clear()
    // }
    return Promise.reject(error);
  },
);

// Request interceptor to handle API calls with tokens
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get token dynamically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // List of API endpoints that need a token
    return config;
  },
  (error) => {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly.",
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      window.location.href = "/auth/sign-in"

      return Promise.reject(error);
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  },
);

// Response interceptor (optional)
api.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly.",
      );
      return Promise.reject(error);
    }
    // *For unAuthorized
    if (error.response.status === 401) {
      window.location.href = "/auth/sign-in"

      return Promise.reject(error);
    }

   
    return Promise.reject(error);
  },
);
