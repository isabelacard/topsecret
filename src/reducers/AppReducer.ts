import { combineReducers } from "@reduxjs/toolkit";

import messageReducer from "./slice/MessageSlice"; 

const appReducer = combineReducers({
    message: messageReducer,
});

export default appReducer;
export type RootState = ReturnType<typeof appReducer>;
