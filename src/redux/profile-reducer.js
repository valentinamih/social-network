import {profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialStore = {
    posts: [
        {id: 1, message: 'hello, here i am =)', likesCount: 1},
        {id: 2, message: "this is my first post!", likesCount: 3}
    ],
    profile: null,
    status: ''
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
        default:
            return state

    }
}

export const getProfile = (userId) =>async (dispatch) => {
    let data = await usersAPI.getProfile(userId)
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

export const addPostActionCreator = (newPostText) =>({type: ADD_POST, newPostText})

export const deletePostActionCreator = (id) => ({type: DELETE_POST, id})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type: SET_STATUS, status})

export default profileReducer