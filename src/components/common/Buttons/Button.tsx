import React from "react";
import style from "./Button.module.css";

type PropsType = {
    text: string
    disabled?: boolean
    onClickFunction?: () => any
}
let Button: React.FC<PropsType> = (props) => {
    return  <button onClick={props.onClickFunction}
                    className={style.editButton}
                    disabled={props.disabled}
    >{props.text}</button>
}
export default Button