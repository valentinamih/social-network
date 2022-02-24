import React from "react";
import {Paginator} from "../common/Paginator/Pagination";
import User from "./User";
import style from './Users.module.css'
import Heading from "../common/Headings/Headings";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return (

        <div>
            <Heading heading={'Users'} />
            <div className={style.usersList}>
                {props.users.map(u => <User key={u.id}
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
