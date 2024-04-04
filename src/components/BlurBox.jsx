import styled from "styled-components";
import Box from "@/components/Box";

const BlurBox = styled(Box)`
    background-color: rgba(255, 255, 255, 0.01);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
`;

export default BlurBox;
