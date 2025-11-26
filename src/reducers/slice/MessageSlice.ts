import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
    message: string;
    severity: "success" | "error" | "warning" | "info";
}

const initialState: MessageState = {
    message: "",
    severity: "info",
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<{ message: string; severity: MessageState["severity"] }>) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        clearMessage: (state) => {
            state.message = "";
            state.severity = "info";
        },
    },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;