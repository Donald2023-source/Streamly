import { configureStore } from "@reduxjs/toolkit";
import streamlyreducer from "./Streamlyslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: "Streamly", // Key for the persisted state in storage
  storage, // Use localStorage
  // Optionally, blacklist or whitelist specific parts of streamlyData
  // blacklist: ['someNonPersistedField'], // Fields to exclude
  // whitelist: ['imageUrl'], // Fields to include
};

// Wrap the reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, streamlyreducer);

// Create the store
export const store = configureStore({
  reducer: {
    streamlyData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid serialization errors
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
