import React from "react";
import style from './Heading.module.css'

type PropsType = {
    heading: string
}
let Heading: React.FC<PropsType> = (props) => {
    return  <div className={style.heading}>
        {props.heading}
    </div>
}
export default Heading