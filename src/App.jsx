import React, { useState, useEffect, useContext } from 'react'
import AnnotatedCheckbox from './components/AnnotatedCheckbox'
import OrDivider from './components/OrDivider'
import { Box, BlurBox, Container as BoxContainer, Item as BoxItem } from './components/Box'
import Button from './components/Button';
import { TextArea, SmallInput as SmallTextInput, LargeInput as LargeTextInput } from './components/Text';
import Task, { TaskHeader } from './components/Task';
import { RequiredLabel, RequiredText } from './components/Required';
import Modal, { ModalContext, ModalProvider } from './components/Modal';
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TasksPage from "./pages/Tasks";
import { useForm } from 'react-hook-form';
import styled, { createGlobalStyle } from 'styled-components'
import Helonik from './assets/helonik.otf'
import checked from './assets/checkbox-checked-svgrepo-com.svg'
import unchecked from './assets/checkbox-unchecked-svgrepo-com.svg'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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

    input[type=checkbox]::before {
        content: " ";
        display:inline-block;
        width:16px;
        height:16px;
        background: url(${unchecked});
    }

    input[type=checkbox]:checked::before {
        background: url(${checked});
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
            <Route path="/tasks" element={<TasksPage />}/>
          </Routes>
        </Router>
    </>
  )
}

export default () => (
  <ModalProvider>
    <App />
  </ModalProvider>
);
