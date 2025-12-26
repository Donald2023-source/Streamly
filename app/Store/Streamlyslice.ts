import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  barnerData: [],
  imageUrl: "",
  tmdbKey: "",
  accountId: "",
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
    setTmdKey: (state, action) => {
      state.tmdbKey = action.payload;
    },
    setAccountId: (state, action) => {
      state.accountId = action.payload;
    },
  },
});

export const { setBarnerData, setImageUrl, setTmdKey, setAccountId } =
  streamlySlice.actions;
export default streamlySlice.reducer;
