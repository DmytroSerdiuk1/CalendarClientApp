import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import user from "./user/slice";
import { eventsApi } from "@/service/rtkQuery/events";

export const store = configureStore({
  reducer: {
    user: user,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([eventsApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch: AppDispatch = store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper(() => store, { debug: true });
