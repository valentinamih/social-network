import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import style from "./Users.module.css";
import React from "react";

const User = ({user, followingInProgress, unfollow, follow,  ...props}) => {
    return (
        <div>
            <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                        <img alt={'feo'} src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={style.avatar}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                     <span>
                        <div>{'user.location.city'}</div>
                        <div>{'user.location.country'}</div>
                    </span>
                </span>
        </div>
    )}
export default User