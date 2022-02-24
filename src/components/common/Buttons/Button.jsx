import React from "react";
import style from "./Button.module.css";

let Button = (props) => {
    return  <button onClick={props.onClickFunction}
                    className={style.editButton}
                    disabled={props.disabled}
    >{props.text}</button>
}
export default Button