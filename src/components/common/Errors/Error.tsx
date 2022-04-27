import style from './Error.module.css'
import React from "react";

type PropsType = {
    message: string
}
const Error: React.FC<PropsType> = (props) => {
    return <div className={style.errorWindow}>
        {props.message}
    </div>
}

export default Error