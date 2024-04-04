import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequiredText, RequiredLabel } from "@/components/Required";
import { SmallInput as SmallTextInput } from "@/components/Text";
import {
    Container as BoxContainer,
    BlurBox,
    Item as BoxItem,
} from "@/components/Box";
import Button from "@/components/Button";
import AnnotatedCheckbox from "@/components/AnnotatedCheckbox";
import Modal, { ModalContext } from "@/components/Modal";
import { BACKEND_URL } from "@/App";

function RegisterPage() {
    document.title = "Register";
    const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    async function onSubmit(data) {
        const username = data.username;
        const password = data.psw1;
        var response = await fetch(`${BACKEND_URL}/auth/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });
        if (response.ok) {
            await fetch(`${BACKEND_URL}/auth/login`, {
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
            navigate("/");
        } else {
            setIsModalOpen(true);
        }
    }

    const [rememberMe, setRememberMe] = useState(false);

    function handleRememberMeChange(_) {
        setRememberMe((c) => !c);
    }

    function passwordsMatch() {
        const { psw1, psw2 } = getValues();
        return psw1 === psw2;
    }

    return (
        <>
            <div>{isModalOpen && <Modal error={"username exists"} />}</div>
            <BoxContainer>
                <BlurBox>
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
                                <label htmlFor="psw1">password</label>
                                {errors.psw1 && (
                                    <RequiredText>required</RequiredText>
                                )}
                            </RequiredLabel>
                            <SmallTextInput
                                type="password"
                                placeholder=""
                                required
                                {...register("psw1", { required: true })}
                            />
                        </BoxItem>
                        <BoxItem>
                            <RequiredLabel>
                                <label htmlFor="psw2">confirm password</label>
                                {((!errors.psw1 && !passwordsMatch()) ||
                                    errors.psw2) && (
                                    <RequiredText>must match</RequiredText>
                                )}
                            </RequiredLabel>
                            <SmallTextInput
                                type="password"
                                placeholder=""
                                required
                                {...register("psw2", {
                                    required: true,
                                    validate: {
                                        matchesPreviousPassword: (
                                            psw2,
                                            values
                                        ) => {
                                            return values.psw1 == psw2;
                                        },
                                    },
                                })}
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
                        </BoxItem>
                        <BoxItem>
                            <Button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                            >
                                register
                            </Button>
                        </BoxItem>
                    </form>
                </BlurBox>
            </BoxContainer>
        </>
    );
}

export default RegisterPage;
