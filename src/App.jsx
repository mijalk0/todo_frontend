import React, { useState, useEffect, useContext } from 'react'
import AnnotatedCheckbox from './components/AnnotatedCheckbox'
import OrDivider from './components/OrDivider'
import Box from './components/Box'
import BlurBox from './components/BlurBox'
import BoxContainer from './components/BoxContainer';
import BoxItem from './components/BoxItem';
import { useForm } from 'react-hook-form';
import debounce from 'debounce';
import styled, { createGlobalStyle } from 'styled-components'
import Helonik from './assets/helonik.otf'
import checked from './assets/checkbox-checked-svgrepo-com.svg'
import unchecked from './assets/checkbox-unchecked-svgrepo-com.svg'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

const RequiredLabel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RequiredText = styled.div`
    font-size: 20px;
`;

const SmallTextInput = styled.input`
    border-color: transparent;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    background: grey;
    width: 100%;
    box-sizing: border-box;
`;

const LargeTextInput = styled(SmallTextInput)`
    font-size: 30px;
    height: 100%;
`;

const TextArea = styled.textarea`
    border-color: transparent;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    background: grey;
    resize: vertical;
`;

const Button = styled.button`
    border-color: transparent;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    background: grey;
`;

const TaskHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: 50px;
`;

const TaskFooter = styled(TaskHeader)`
    font-size: 15px;
`;

const TaskDates = styled.div`
    display: flex;
    flex-direction: column;
`;


const ModalContext = React.createContext();

function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};


const ModalBackground = styled.div`
  z-index: 1; /* Sit on top */
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Modal(props) {
  const { setIsModalOpen } = useContext(ModalContext);

  return (
    <ModalBackground>
      <Box width={300}>
            <BoxItem>{props.error}
            </BoxItem>
            <BoxItem>
                <Button onClick={() => setIsModalOpen(false)}>close</Button>
            </BoxItem>
      </Box>
    </ModalBackground>
  );
};

const updateDescription = debounce((description, setUpdatedAt, id) => {
        fetch(`${BACKEND_URL}/tasks/${id}`, {
          method: "PATCH",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              description: description,
          })
        })
            .then((response) => response.json())
            .then((data) => setUpdatedAt(data.updatedAt));
}, 500);

function Task(props) {
    const [description, setDescription] = useState(props.description);
    const [completed, setCompleted] = useState(props.completed);
    const [updatedAt, setUpdatedAt] = useState(props.updatedAt);

    async function handleDescriptionChange(event) {
        const newDescription = event.target.value;
        setDescription(newDescription);
        updateDescription(newDescription, setUpdatedAt, props.id);
    }

    function handleCompletedChange(event) {
        const newCompleted = !(event.target.value == 'true');
        setCompleted(newCompleted);
        fetch(`${BACKEND_URL}/tasks/${props.id}`, {
          method: "PATCH",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              completed: newCompleted,
          })
        })
            .then((response) => response.json())
            .then((data) => setUpdatedAt(data.updatedAt));
    }

    useEffect(() => {
    }, [description]);

    useEffect(() => {
    }, [completed]);

    return (
        <BlurBox>
            <BoxItem>
                <TaskHeader>
                    <div>{props.title}</div>
                        <Button type="submit" onClick={async () => {
                            await fetch(`${BACKEND_URL}/tasks/${props.id}`, {
                                method: "DELETE",
                                credentials: 'include',
                            });
                            props.deleteTask(props.id);
                        }
                    }>delete</Button>
                </TaskHeader>
            </BoxItem>
            <BoxItem>
                <TextArea value={description} placeholder="description" onChange={handleDescriptionChange}></TextArea>
            </BoxItem>
            <BoxItem>
                <TaskFooter>
                    <TaskDates>
                        <div>created at: {new Date(props.createdAt).toLocaleString('en-US')}</div>
                        <div>updated at: {new Date(updatedAt).toLocaleString('en-US')}</div>
                    </TaskDates>
                    <AnnotatedCheckbox checked={completed} onChange={handleCompletedChange}  label="completed" id={props.id} size={20}/>
                </TaskFooter>
            </BoxItem>
        </BlurBox>
    );
}

function LoginPage() {
    document.title = "Login";
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    async function onSubmit(data) {
        const username = data.username;
        const password = data.password;
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
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
        if (response.ok) {
            navigate("/tasks")
        } else {
            setIsModalOpen(true);
        }
    };

    function handleRememberMeChange(_) {
        setRememberMe(c => !c);
    }


    return (
<>               <div>
      {isModalOpen && <Modal error={"invalid login"} />}
    </div> 
        <BoxContainer>
            <BlurBox>
                <BoxItem>
                    todo
                </BoxItem>
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
                        <label htmlFor="password">password</label>
                        {errors.password && <RequiredText>required</RequiredText>}
                    </RequiredLabel>
                    <SmallTextInput
                        type="password"
                        placeholder=""
                        required {...register('password', { required: true })}
                    />
                </BoxItem>
                <BoxItem>
                    <AnnotatedCheckbox checked={rememberMe} onChange={handleRememberMeChange} label="remember me" id="rememberme" size={30}/>
                <BoxItem/>
                    <Button type="submit" onClick={handleSubmit(onSubmit)}>login</Button>
                </BoxItem>
                </form>
                <OrDivider />
                <BoxItem>
                    <Button type="button" onClick={() => navigate("/register")}>register</Button>
                </BoxItem>
            </BlurBox>
     </BoxContainer>
   </>
    );
}

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
