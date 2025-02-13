import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "@/store/eventeco/slices/errorSlice";
import authReducer from "@/store/eventeco/slices/authSlice";

const store = configureStore({
    reducer: {
        error: errorReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
