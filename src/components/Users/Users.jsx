import React from "react";
import {Paginator} from "../common/Paginator/Pagination";
import User from "./User";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    return (

        <div>
            <Paginator currentPage={currentPage}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       onPageChanged={onPageChanged}
            />
            <div>
                {props.users.map(u => <User user={u}
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow} />)}
            </div>
        </div>
    )
}
export default Users
