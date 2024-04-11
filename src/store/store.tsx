import { configureStore } from "@reduxjs/toolkit";
import modelsReducer from "./slice/modelsSlice";

export const store = configureStore({
  reducer: {
    models: modelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
