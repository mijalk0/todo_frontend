import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
    Container as BoxContainer,
    BlurBox,
    Item as BoxItem,
} from "@/components/Box";
import Button from "@/components/Button";
import { TextArea, LargeInput as LargeTextInput } from "@/components/Text";
import Task, { TaskHeader } from "@/components/Task";
import { BACKEND_URL } from "@/App";

function TasksPage() {
    if (document.cookie.indexOf("token") < 0) {
        return <Navigate to="/login" />;
    }

    document.title = "Tasks";

    const [tasks, setTasks] = useState([]);

    function deleteTask(id) {
        setTasks(tasks.filter((task) => task.id != id));
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
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => setTasks(data));
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
                    <Button
                        type="submit"
                        onClick={async () => {
                            await fetch(`${BACKEND_URL}/auth/logout`, {
                                method: "GET",
                                credentials: "include",
                            });
                            navigate("/login");
                        }}
                    >
                        logout
                    </Button>
                </BoxItem>
            </BlurBox>
            <BlurBox>
                <BoxItem>
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault();
                            var response = await fetch(`${BACKEND_URL}/tasks`, {
                                method: "POST",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    title: createTaskName,
                                    description: createTaskDescription,
                                }),
                            });
                            var task = await response.json();
                            setTasks([task, ...tasks]);
                            setCreateTaskName("");
                            setCreateTaskDescription("");
                        }}
                    >
                        <TaskHeader>
                            <LargeTextInput
                                type="text"
                                placeholder="name"
                                value={createTaskName}
                                onChange={handleCreateTaskName}
                                required
                            />
                            <Button type="submit">create</Button>
                        </TaskHeader>
                    </form>
                </BoxItem>
                <BoxItem>
                    <TextArea
                        placeholder="description"
                        value={createTaskDescription}
                        onChange={handleCreateTaskDescription}
                    ></TextArea>
                </BoxItem>
            </BlurBox>
            {taskList}
        </BoxContainer>
    );
}

export default TasksPage;
