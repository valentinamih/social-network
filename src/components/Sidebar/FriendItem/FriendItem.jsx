import style from './FriendItem.module.css'
import {NavLink} from 'react-router-dom'

const FriendItem = (props) => {
    let path = 'friends' + props.id

    return (
        <div className={style.friendItem}>
            <img className={style.avatar} src={props.link}/>
            <div>
                <NavLink to={path} activeClassName={style.active}>{props.name}</NavLink>
            </div>
        </div>
    )
}

export default FriendItem