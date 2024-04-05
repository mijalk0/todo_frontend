import { styled } from "styled-components";
import checked from '/assets/checkbox-checked-svgrepo-com.svg'
import unchecked from '/assets/checkbox-unchecked-svgrepo-com.svg'

const CheckboxLabel = styled.label`
    font-size: ${(props) => props.size}px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    color: grey;
    user-select: none;
`;

const BaseCheckbox = styled.div`
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`;

const CheckedCheckbox = styled(BaseCheckbox)`
    background: url("${checked}");
    background-size: contain;
`;

const UncheckedCheckbox = styled(BaseCheckbox)`
    background: url("${unchecked}");
    background-size: contain;
`;

const PreloadedCheckedCheckbox = styled(CheckedCheckbox)`
    position: absolute;
    width: 0;
    height: 0;
`;

const PreloadedUncheckedCheckbox = styled(UncheckedCheckbox)`
    position: absolute;
    width: 0;
    height: 0;
`;

function AnnotatedCheckBox(props) {
    var checkbox;

    if (props.checked) {
        checkbox = <CheckedCheckbox size={props.size} />;
    } else {
        checkbox = <UncheckedCheckbox size={props.size} />;
    };

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
                {checkbox}
                {props.label}
            </CheckboxLabel>
            <PreloadedCheckedCheckbox />
            <PreloadedUncheckedCheckbox />
        </>
    );
}

export default AnnotatedCheckBox;
