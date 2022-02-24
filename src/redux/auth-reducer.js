import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

let initialStore = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

let authReducer = (state = initialStore, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                captchaUrl: action.url
            }
        }
        default:
            return state
    }
}
export const getCaptchaUrlSuccess = (captchaUrl) =>  ({type: GET_CAPTCHA_URL_SUCCESS, url: captchaUrl})
export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}});

export  const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email, password, rememberMe, captcha =  null) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    else if (response.data.resultCode === 10) {
        dispatch(getCaptcha())
    }
    else {
        let message = response.data.messages
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptcha = () => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    let captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null,null,false))
    }
}
export default authReducer