import styled from "styled-components";

const TextArea = styled.textarea`
    border-color: transparent;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    background: grey;
    resize: vertical;
`;

const SmallInput = styled.input`
    border-color: transparent;
    border-radius: 6px;
    font-size: 20px;
    color: black;
    background: grey;
    width: 100%;
    box-sizing: border-box;
`;

const LargeInput = styled(SmallInput)`
    font-size: 30px;
    height: 100%;
`;

export { TextArea, SmallInput, LargeInput };
