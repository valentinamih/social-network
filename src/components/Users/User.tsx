import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/user.png";
import style from "./Users.module.css";
import React from "react";
import Button from "../common/Buttons/Button";
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow,  ...props}) => {
    let onClickUnfollow = () => {unfollow(user.id)}
    let onClickFollow = () => {follow(user.id)}
    let isDisabled = followingInProgress.some(id => id === user.id)
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
                            ? <Button onClickFunction={onClickUnfollow}
                                      disabled={isDisabled}
                                      text={'Unfollow'} />
                            : <Button disabled={isDisabled}
                                      onClickFunction={onClickFollow}
                                      text={'Follow'} />}
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