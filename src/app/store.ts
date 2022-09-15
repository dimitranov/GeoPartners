import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { loadingReducer } from "./loading";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from './sagas';
import { partnersReducer } from "../features/partners/reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    // loading
    loading: loadingReducer,
    // features
    partners: partnersReducer,
  },
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
