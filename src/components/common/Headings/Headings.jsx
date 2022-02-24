import React from "react";
import style from './Heading.module.css'

let Heading = (props) => {
    return  <div className={style.heading}>
        {props.heading}
    </div>
}
export default Heading