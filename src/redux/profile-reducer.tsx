import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
    posts: [
        {id: 1, message: 'hello, here i am =)', likesCount: 1},
        {id: 2, message: "this is my first post!", likesCount: 3}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
}

let profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "profile/ADD-POST":
            let text = action.newPostText;
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: text, likesCount: 0}],
            }
        case "profile/DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        }
        case "profile/SET_USER_PROFILE": {
            return {...state, profile: action.profile}
        }
        case "profile/SET_STATUS": {
            return {...state, status: action.status}
        }
        case "profile/UPDATE_PHOTO_SUCCESS": {
            return {...state, profile:{ ...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state
    }
}

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await  profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const updatePhoto = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.updatePhoto(file)
     if (data.resultCode === 0) {
        dispatch(actions.updatePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getProfile(userId))
        } else {
            throw new Error("User id can't be null")
        }
    } else {
        let message = data.messages[0]
        dispatch(stopSubmit('profile-data', {_error: message}))
        return Promise.reject(data.messages[0])
    }
}

export const actions = {
    updatePhotoSuccess: (photos: PhotosType) => ({type: 'profile/UPDATE_PHOTO_SUCCESS', photos} as const),
    addPostActionCreator: (newPostText: string) =>({type: 'profile/ADD-POST', newPostText} as const),
    deletePostActionCreator: (id: number) => ({type: 'profile/DELETE_POST', id} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const)

}

export default profileReducer