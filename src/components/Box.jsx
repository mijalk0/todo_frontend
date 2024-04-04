import styled from "styled-components";

const Container = styled.div`
    display: flex;
    padding: 50px;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

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

const BlurBox = styled(Box)`
    background-color: rgba(255, 255, 255, 0.01);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
`;

const Item = styled.div`
    font-size: 30px;
    padding: 10px;
    font-family: helonik;
    display: flex;
    flex-direction: column;
    justify-content: left;
    color: grey;
`;

export { Container, Box, BlurBox, Item };
