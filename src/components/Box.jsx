import styled from "styled-components";

const Box = styled.div`
    width: ${(props) => (props.width ? props.width : 400)}px;
    background-color: rgba(0, 0, 0, 1);
    border-radius: 20px;
    border-style: solid;
    border-color: grey;
    border-width: thin;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
`;

export default Box;
