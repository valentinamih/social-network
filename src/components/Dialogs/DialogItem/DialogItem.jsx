import style from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id

    return (
        <div className={style.dialog + ' ' + style.active}>
            <img  className={style.avatar} src={props.link}/>
            <NavLink to={path} className={style.authorLink} activeClassName={style.active}>{props.name}:</NavLink>
        </div>
    )
}

export default DialogItem