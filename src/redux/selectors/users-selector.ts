import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";

export let getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export let getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true)
})

export let getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export let getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export let getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export let getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export let getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}