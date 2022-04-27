import style from './Sidebar.module.css'
import FriendItem from "./FriendItem/FriendItem";
import {SidebarMapStatePropsType} from "./SidebarContainer";
import React from "react";

type PropsType = SidebarMapStatePropsType

const Sidebar: React.FC<PropsType> = (props) => {
    let friendsItems = props.friendsItems.map(friend => <FriendItem id={friend.id}
                                                                    name={friend.name}
                                                                    key={friend.id}
                                                                    link={friend.link}/>)

    return (
        <div>
            <p className={style.title}>Friends</p>
            <div>
                {friendsItems}
            </div>
        </div>
    )
}

export  default Sidebar