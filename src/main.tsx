import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "next-themes";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
)
