import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./reducers/authReducers";
import storeReducer from "./reducers/storeReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  store: storeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: ["store"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Buat store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
