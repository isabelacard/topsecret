import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import router from "./routes/router";
import { store, persistor } from "./reducers/Store"; 

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}> 
            <PersistGate loading={null} persistor={persistor}> 
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </StrictMode>
);
