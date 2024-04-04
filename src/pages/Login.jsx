import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequiredText, RequiredLabel } from "@/components/Required";
import { SmallInput as SmallTextInput } from "@/components/Input";
import {
    Container as BoxContainer,
    BlurBox,
    Item as BoxItem,
} from "@/components/Box";
import Button from "@/components/Button";
import OrDivider from "@/components/OrDivider";
import AnnotatedCheckbox from "@/components/AnnotatedCheckbox";
import Modal, { ModalContext } from "@/components/Modal";
import { BACKEND_URL } from "@/App";

function LoginPage() {
    document.title = "Login";
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        const username = data.username;
        const password = data.password;
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                rememberMe: rememberMe,
            }),
        });
        if (response.ok) {
            navigate("/");
        } else {
            setIsModalOpen(true);
        }
    }

    function handleRememberMeChange(_) {
        setRememberMe((c) => !c);
    }

    return (
        <>
            {" "}
            <div>{isModalOpen && <Modal error={"invalid login"} />}</div>
            <BoxContainer>
                <BlurBox>
                    <BoxItem>todo</BoxItem>
                    <form>
                        <BoxItem>
                            <RequiredLabel>
                                <label htmlFor="username">username</label>
                                {errors.username && (
                                    <RequiredText>required</RequiredText>
                                )}
                            </RequiredLabel>
                            <SmallTextInput
                                type="text"
                                placeholder=""
                                required
                                {...register("username", { required: true })}
                            />
                        </BoxItem>
                        <BoxItem>
                            <RequiredLabel>
                                <label htmlFor="password">password</label>
                                {errors.password && (
                                    <RequiredText>required</RequiredText>
                                )}
                            </RequiredLabel>
                            <SmallTextInput
                                type="password"
                                placeholder=""
                                required
                                {...register("password", { required: true })}
                            />
                        </BoxItem>
                        <BoxItem>
                            <AnnotatedCheckbox
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                label="remember me"
                                id="rememberme"
                                size={30}
                            />
                            <BoxItem />
                            <Button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                            >
                                login
                            </Button>
                        </BoxItem>
                    </form>
                    <OrDivider />
                    <BoxItem>
                        <Button
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            register
                        </Button>
                    </BoxItem>
                </BlurBox>
            </BoxContainer>
        </>
    );
}

export default LoginPage;
