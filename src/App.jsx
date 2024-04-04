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

function RegisterPage() {
    document.title = "Register";
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
    
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    
    async function onSubmit(data) {
        const username = data.username;
        const password = data.psw1;
        var response = await fetch(`${BACKEND_URL}/auth/register`, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        if (response.ok) {
            await fetch(`${BACKEND_URL}/auth/login`, {
                method: "POST",
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    rememberMe: rememberMe,
                })
            })
            navigate("/tasks")
        } else {
            setIsModalOpen(true);
        }
    };

    const [rememberMe, setRememberMe] = useState(false);

    function handleRememberMeChange(_) {
        setRememberMe(c => !c);
    }

    function passwordsMatch() {
        const { psw1, psw2 } = getValues();
        return psw1 === psw2;
    }

    return (
        <>
        <div>
      {isModalOpen && <Modal error={"username exists"} />}
    </div> 
        <BoxContainer>
            <BlurBox>
                <form>
                <BoxItem>
                    <RequiredLabel>
                        <label htmlFor="username">username</label>
                        {errors.username && <RequiredText>required</RequiredText>}
                    </RequiredLabel>
                    <SmallTextInput
                        type="text"
                        placeholder=""
                        required {...register('username', { required: true })}
                    />
                </BoxItem>
                <BoxItem>
                    <RequiredLabel>
                        <label htmlFor="psw1">password</label>
                        {errors.psw1 && <RequiredText>required</RequiredText>}
                    </RequiredLabel>
                    <SmallTextInput
                        type="password"
                        placeholder=""
                        required {...register('psw1', { required: true })}
                    />
                </BoxItem>
                <BoxItem>
                    <RequiredLabel>
                        <label htmlFor="psw2">confirm password</label>
        {((!errors.psw1 && !passwordsMatch()) || errors.psw2) && <RequiredText>must match</RequiredText>}
                    </RequiredLabel>
                    <SmallTextInput
                        type="password"
                        placeholder=""
                        required {...register('psw2', { required: true, validate: {
            matchesPreviousPassword: (psw2, values) => {
              return values.psw1 == psw2;
            }
                        }})}
                    />
                </BoxItem>
                <BoxItem>
                    <AnnotatedCheckbox checked={rememberMe} onChange={handleRememberMeChange} label="remember me" id="rememberme" size={30}/>
                </BoxItem>
                <BoxItem>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>register</Button>
                </BoxItem>
                </form>
            </BlurBox>
        </BoxContainer>
</>
    );
}

function TasksPage() {
    if (document.cookie.indexOf("token") < 0) {
        return <Navigate to="/login" />
    }

    document.title = "Tasks";

    const [tasks, setTasks] = useState([]);

    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id != id))
    }

    const taskList = tasks?.map((task) => (
      <Task
        title={task.title}
        completed={task.completed}
        description={task.description}
        createdAt={task.createdAt}
        updatedAt={task.updatedAt}
        id={task.id}
        key={task.id}
        deleteTask={deleteTask}
      />
    ));

    useEffect(() => {
        fetch(`${BACKEND_URL}/tasks`, {
            method: "GET",
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => setTasks(data))
    }, []);

    const [createTaskName, setCreateTaskName] = useState("");
    const [createTaskDescription, setCreateTaskDescription] = useState("");

    function handleCreateTaskName(event) {
      setCreateTaskName(event.target.value);
    }

    function handleCreateTaskDescription(event) {
      setCreateTaskDescription(event.target.value);
    }

    const navigate = useNavigate();

    return (
        <BoxContainer>
            <BlurBox>
                <BoxItem>
                    <Button type="submit" onClick={async () => {
                        await fetch(`${BACKEND_URL}/auth/logout`, {
                            method: "GET",
                            credentials: 'include',
                        })
                        navigate("/login")
                    }}>
                        logout
                    </Button>
                </BoxItem>
            </BlurBox>
            <BlurBox>
                <BoxItem>
        <form onSubmit={
async (event) => {
      event.preventDefault();
                            var response = await fetch(`${BACKEND_URL}/tasks`, {
                                method: "POST",
                                credentials: 'include',
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    title: createTaskName,
                                    description: createTaskDescription,
                                })
                            })
                            var task = await response.json()
                            setTasks([task,...tasks]);
                            setCreateTaskName("");
                            setCreateTaskDescription("");
                        }
        }>
                    <TaskHeader>
                        <LargeTextInput type="text" placeholder="name" value={createTaskName} onChange={handleCreateTaskName} required />
                        <Button type="submit" >create</Button>
                    </TaskHeader>
                    </form>
                </BoxItem>
                <BoxItem>
                    <TextArea placeholder="description" value={createTaskDescription} onChange={handleCreateTaskDescription}></TextArea>
                </BoxItem>
            </BlurBox>
            {taskList}
        </BoxContainer>
    );
}

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
