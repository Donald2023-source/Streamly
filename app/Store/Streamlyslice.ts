import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barnerData: [], 
  imageUrl: "",
};

export const streamlySlice = createSlice({
  name: "streamly",
  initialState,
  reducers: {
    setBarnerData: (state, action) => {
      state.barnerData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});


export const { setBarnerData, setImageUrl } = streamlySlice.actions;
export default streamlySlice.reducer;
