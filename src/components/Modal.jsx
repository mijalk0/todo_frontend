import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Box, Item as BoxItem } from "@/components/Box";
import Button from "@/components/Button";

const ModalContext = React.createContext();

function ModalProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
}

const ModalBackground = styled.div`
    z-index: 1; /* Sit on top */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
                <BoxItem>{props.error}</BoxItem>
                <BoxItem>
                    <Button onClick={() => setIsModalOpen(false)}>close</Button>
                </BoxItem>
            </Box>
        </ModalBackground>
    );
}

export default Modal;
export { ModalContext, ModalProvider };
