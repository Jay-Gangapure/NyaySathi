const BASE_URL = "http://127.0.0.1:8000";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

import axios from "axios";

// backend URL
const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// LOGIN API
export const loginUser = async (email: string, password: string) => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    return res.data;  // important
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.detail || "Login failed",
    };
  }
};

export const signupUser = async (data: any) => {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getToken = () => localStorage.getItem("token");

export const getSituation = async (id: string) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/situations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const interpretText = async (text: string) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/ai/interpret`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
};

export const getDirectory = async () => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/directory`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};