interface ButtonProp {
    label: string;
    onClick: () => void;
}

export const Button = (props: ButtonProp) => {
    return (
        <button onClick={props.onClick}>{props.label}</button>
    );
}