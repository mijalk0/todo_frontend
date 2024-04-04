import { useState } from "react";
import debounce from "debounce";
import styled from "styled-components";
import AnnotatedCheckbox from "@/components/AnnotatedCheckbox";
import { BlurBox, Item as BoxItem } from "@/components/Box";
import Button from "@/components/Button";
import { TextArea } from "@/components/Text";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

const updateDescription = debounce((description, setUpdatedAt, id) => {
    fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            description: description,
        }),
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
        const newCompleted = !(event.target.value == "true");
        setCompleted(newCompleted);
        fetch(`${BACKEND_URL}/tasks/${props.id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                completed: newCompleted,
            }),
        })
            .then((response) => response.json())
            .then((data) => setUpdatedAt(data.updatedAt));
    }

    return (
        <BlurBox>
            <BoxItem>
                <TaskHeader>
                    <div>{props.title}</div>
                    <Button
                        type="submit"
                        onClick={async () => {
                            await fetch(`${BACKEND_URL}/tasks/${props.id}`, {
                                method: "DELETE",
                                credentials: "include",
                            });
                            props.deleteTask(props.id);
                        }}
                    >
                        delete
                    </Button>
                </TaskHeader>
            </BoxItem>
            <BoxItem>
                <TextArea
                    value={description}
                    placeholder="description"
                    onChange={handleDescriptionChange}
                ></TextArea>
            </BoxItem>
            <BoxItem>
                <TaskFooter>
                    <TaskDates>
                        <div>
                            created at:{" "}
                            {new Date(props.createdAt).toLocaleString("en-US")}
                        </div>
                        <div>
                            updated at:{" "}
                            {new Date(updatedAt).toLocaleString("en-US")}
                        </div>
                    </TaskDates>
                    <AnnotatedCheckbox
                        checked={completed}
                        onChange={handleCompletedChange}
                        label="completed"
                        id={props.id}
                        size={20}
                    />
                </TaskFooter>
            </BoxItem>
        </BlurBox>
    );
}

export default Task;
export { TaskHeader };
