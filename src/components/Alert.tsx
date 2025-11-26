import { Snackbar, Alert as MuiAlert, type AlertColor } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../reducers/AppReducer";
import { clearMessage } from "../reducers/slice/MessageSlice";
import type { AppDispatch } from "../reducers/Store";

export default function Alert() {
    const [open, setOpen] = useState(false);
    const message = useSelector((state: RootState) => state.message);
    const dispatch = useDispatch<AppDispatch>();

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
        setTimeout(() => {
            dispatch(clearMessage());
        }, 200);
    };

    useEffect(() => {
        if (message.message) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [message]);

    if (!message.message) {
        return null;
    }

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <MuiAlert
                severity={message.severity as AlertColor}
                variant="filled"
                sx={{
                    width: "100%",
                    fontFamily: "neulis",
                    backgroundColor: message.severity === "error" ? "#402879ff" : message.severity === "success" ? "#b393ffff" : message.severity === "warning" ? "#8b5ff1ff" : "#8b5ff1ff",
                    color: "#fff",
                    "& .MuiAlert-icon": {
                        color: "#fff",
                    },
                }}
                onClose={handleClose}
            >
                {message.message}
            </MuiAlert>
        </Snackbar>
    );
}
