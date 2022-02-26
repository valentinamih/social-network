import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const UPDATE_PHOTO_SUCCESS = 'profile/UPDATE_PHOTO_SUCCESS'
let initialStore = {
    posts: [
        {id: 1, message: 'hello, here i am =)', likesCount: 1},
        {id: 2, message: "this is my first post!", likesCount: 3}
    ],
    profile: null,
    status: '',
    photos: []
}
let profileReducer = (state = initialStore, action) => {
    switch (action.type) {
        case ADD_POST:
            let text = action.newPostText;
            return {
                ...state,
                posts: [...state.posts, {id: 5, message: text, likesCount: 0}],
            }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.id)}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case UPDATE_PHOTO_SUCCESS: {
            return {...state, profile:{ ...state.profile, photos: action.photos}}
        }
        default:
            return state
    }
}
export const getProfile = (userId) =>async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(data))
}
export const getStatus = (userId) => async (dispatch) => {
    let data = await  profileAPI.getStatus(userId)
    dispatch(setStatus(data))

}
export const updateStatus = (status) => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}
export const updatePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.updatePhoto(file)
     if (data.resultCode === 0) {
        dispatch(updatePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getProfile(userId))
    } else {
        let message = data.messages[0]
        dispatch(stopSubmit('profile-data', {_error: message}))
        return Promise.reject(data.messages[0])
    }
}
export const updatePhotoSuccess = (photos) => ({type: UPDATE_PHOTO_SUCCESS, photos})
export const addPostActionCreator = (newPostText) =>({type: ADD_POST, newPostText})
export const deletePostActionCreator = (id) => ({type: DELETE_POST, id})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export default profileReducer