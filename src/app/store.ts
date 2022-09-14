import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import toursReducer from "../features/tours/tourSlice";
import { loadingReducer } from "./loading";

export const store = configureStore({
  reducer: {
    // loading
    loading: loadingReducer,
    // features
    counter: counterReducer,
    tours: toursReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
