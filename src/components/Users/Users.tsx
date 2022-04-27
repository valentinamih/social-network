import React from "react";
import {Paginator} from "../common/Paginator/Pagination";
import User from "./User";
import style from './Users.module.css'
import Heading from "../common/Headings/Headings";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props}) => {
    return (
        <div>

            <div className={style.usersList}>
                {users.map(u => <User key={u.id}
                                            user={u}
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                />)}
            </div>
            <Paginator currentPage={currentPage}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       onPageChanged={onPageChanged}
            />
        </div>
    )
}
export default Users
