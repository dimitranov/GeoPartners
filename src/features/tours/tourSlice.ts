import { fetchAllTours } from "./tourApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Tour } from "./types";

export interface ToursState {
  tours: Tour[];
}

const initialState: ToursState = {
  tours: [],
};

export const fetchAllToursThunk = createAsyncThunk("tours/getAll", async () => {
  const response = await fetchAllTours();
  return response.data;
});

export const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllToursThunk.fulfilled, (state, action) => {
      state.tours = action.payload.data.data;
    });
  },
});

export const makeToursSelector = (state: RootState) => state.tours.tours;

export default toursSlice.reducer;
