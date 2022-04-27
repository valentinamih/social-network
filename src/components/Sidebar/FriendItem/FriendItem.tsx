import style from './FriendItem.module.css'
import {NavLink} from 'react-router-dom'
import React from "react";

type PropsType = {
    id: number
    name: string
    link: string
}
const FriendItem: React.FC<PropsType> = (props) => {
    let path = 'friends' + props.id
    return (
        <div className={style.friendItem}>
            <img className={style.avatar} src={props.link} alt={'avatar'}/>
            <div>
                <NavLink to={path} activeClassName={style.active}>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default FriendItem