import { styled } from "styled-components";
import checked from '@/assets/checkbox-checked-svgrepo-com.svg'
import unchecked from '@/assets/checkbox-unchecked-svgrepo-com.svg'

const CheckboxLabel = styled.label`
    font-size: ${(props) => props.size}px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    color: grey;
    user-select: none;
`;

const Checkbox = styled.div`
    background: url("${(props) => (props.checked ? checked : unchecked)}");
    background-size: contain;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`;

function AnnotatedCheckBox(props) {
    return (
        <>
            <input
                type="checkbox"
                value={props.checked}
                id={props.id}
                style={{ display: "none" }}
                onChange={props.onChange}
            />
            <CheckboxLabel htmlFor={props.id} size={props.size}>
                <Checkbox checked={props.checked} size={props.size} />
                {props.label}
            </CheckboxLabel>
        </>
    );
}

export default AnnotatedCheckBox;
