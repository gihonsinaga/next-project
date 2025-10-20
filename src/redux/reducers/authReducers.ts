import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisikan tipe untuk state user
interface UserState {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}

// Definisikan tipe untuk state autentikasi (tanpa token)
interface AuthState {
  user: UserState | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// State awal
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Buat slice untuk autentikasi
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer saat login dimulai
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Reducer saat login berhasil (hanya menyimpan data user)
    loginSuccess: (state, action: PayloadAction<{ user: UserState }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    // Reducer saat login gagal
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // Reducer untuk logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Ekspor actions dan reducer
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
