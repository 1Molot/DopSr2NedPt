import React, {ChangeEvent} from 'react';

type PropsType = {
    title: string,
    callBack: () => void
    disabled?: boolean
}

const Button = (props: PropsType) => {
    return (
        <button onClick={() => props.callBack()} disabled={props.disabled}>{props.title}</button>
    );
};

export default Button;