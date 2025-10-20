import axios from "axios";
import Cookies from "js-cookie";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from "../reducers/authReducers";
import { AppDispatch } from "../store";

// Ambil base URL dari environment variables
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`;

export const loginUser =
  (credentials: any) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      const { data } = response;

      const userData = {
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
      };

      const { accessToken, refreshToken } = data;

      Cookies.set("accessToken", accessToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      dispatch(loginSuccess({ user: userData }));
      // console.log("user", userData);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      dispatch(loginFailure(errorMessage));
      console.error("Login Error!", error);
    }
  };

// Aksi untuk logout pengguna
export const logoutUser = () => (dispatch: AppDispatch) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  dispatch(logoutAction());

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
