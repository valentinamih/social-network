import {updateObjectInArray} from "../utilits/object-helper";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

let initialState = {
    users: [ ] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};
let usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "users/FOLLOW" : {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case "users/UNFOLLOW": {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        }
        case "users/SET-USERS": {
            return { ...state, users: action.users}
        }
        case "users/SET-CURRENT-PAGE": {
            return { ...state, currentPage: action.currentPage}
        }
        case "users/SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.totalUsersCount}
        }
        case "users/TOGGLE_IS_FETCHING": {
            return {...state, isFetching: action.isFetching }
        }
        case "users/TOGGLE_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default: return state
    }
}

export const requestUsers= (page: number, pageSize: number): ThunkType  => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
}

let followUnfollowFlow  = async (dispatch: Dispatch<ActionsType>,
                                 userId: number,
                                 apiMethod: any,
                                 actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(userId), actions.unfollowSuccess)
}
export const follow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), actions.followSuccess)
}


export const actions = {
    followSuccess: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'users/SET-USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET-CURRENT-PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'users/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) =>
        ({type: 'users/TOGGLE_FOLLOWING_PROGRESS', isFetching, userId} as const)
}
export default usersReducer