import style from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'
import React from "react";

type PropsType = {
    id: number
    link: string
    name: string
}
const DialogItem: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id
    return (
        <div className={style.dialog + ' ' + style.active}>
            <img  className={style.avatar} src={props.link}/>
            <NavLink to={path} activeClassName={style.active}>{props.name}:</NavLink>
        </div>
    )
}

export default DialogItem