import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definisikan tipe untuk state, hanya menyimpan array of strings
interface StoreState {
  stores: string[];
}

// State awal
const initialState: StoreState = {
  stores: [],
};

// Buat slice yang lebih sederhana
const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    // Hanya satu reducer untuk mengatur data stores
    setStores: (state, action: PayloadAction<string[]>) => {
      state.stores = action.payload;
    },
  },
});

// Ekspor action dan reducer
export const { setStores } = storeSlice.actions;
export default storeSlice.reducer;
