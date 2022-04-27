import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captchaUrl: null as null | string
}

let authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'auth/SET_AUTH_USER_DATA': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'auth/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                captchaUrl: action.url
            }
        }
        default:
            return state
    }
}

export const actions = {
    getCaptchaUrlSuccess: (captchaUrl: string) =>  ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', url: captchaUrl} as const),
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'auth/SET_AUTH_USER_DATA', payload: {userId, email, login, isAuth}} as const
    )
}

export  const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = response.data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    }
    else if (response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptcha())
    }
    else {
        let message = response.data.messages
        dispatch(stopSubmit('login', {_error: message}))
    }
}
export const getCaptcha = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    let captchaUrl = response.data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null,null,false))
    }
}
export default authReducer