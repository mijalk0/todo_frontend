import { styled } from "styled-components";

const Or = styled.div`
    width: 100%;
    font-size: 20px;
    padding: 10px;
    box-sizing: border-box;
    font-family: helonik;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: grey;
    gap: 10px;
`;

const Rectangle = styled.div`
    height: 2px;
    width: 100%;
    background: grey;
`;

function OrDivider() {
    return (
        <Or>
            <Rectangle></Rectangle>
            <div>or</div>
            <Rectangle></Rectangle>
        </Or>
    );
}

export default OrDivider;
