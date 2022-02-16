import style from './Sidebar.module.css'
import FriendItem from "./FriendItem/FriendItem";


const Sidebar = (props) => {

    let friendsItems = props.friendsItems.map(friend => <FriendItem id={friend.id}
                                                                    name={friend.name}
                                                                    key={friend.id}
                                                                    link={friend.link}/>)
    return (
        <div>
            <p className={style.title}>Friends</p>
            <div className={style.friendsItems}>
                {friendsItems}
            </div>
        </div>
    )
}

export  default Sidebar