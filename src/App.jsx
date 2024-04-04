import React from "react";
import { ModalProvider } from "./components/Modal";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TasksPage from "./pages/Tasks";
import Helonik  from "./assets/helonik.otf";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export { BACKEND_URL };

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: helonik;
      src: url(${Helonik}) format('opentype');
    }
    html * {
        font-family: arial;
    }
    
    body {
        background-color: #000000;
        opacity: 1;
        background-image: radial-gradient(#222222 2px, #000000 2px);
        background-size: 40px 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    label {
        padding-bottom: 2px;
    }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default () => (
    <ModalProvider>
        <App />
    </ModalProvider>
);
