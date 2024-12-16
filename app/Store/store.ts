import { configureStore } from "@reduxjs/toolkit";
import  streamlyreducer  from './Streamlyslice'

export const store = configureStore({
    reducer: {
        streamlyData: streamlyreducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
