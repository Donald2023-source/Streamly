import { configureStore } from "@reduxjs/toolkit";
import streamlyreducer from "./Streamlyslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: "Streamly", 
  storage,
};


const persistedReducer = persistReducer(persistConfig, streamlyreducer);

// Create the store
export const store = configureStore({
  reducer: {
    streamlyData: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
       
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
