"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import customerSlice from "./slices/addmissionForm";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  addmissionForm: customerSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // non-serializable data like objects && dates
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  devTools: process.env.EXPO_PUBLIC_NODE_ENV !== "development",
});

export const persistor = persistStore(store);
