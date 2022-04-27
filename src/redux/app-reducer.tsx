import {getAuthUserData} from "./auth-reducer"
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

let initialState = {
    initialized: false,
    globalError: null as null | string
}

export let appReducer = (state= initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "app/INITIALIZED_SUCCESS": {
            return {
                ...state,
                initialized: true as boolean
            }
        }
        case "app/CATCH_GLOBAL_ERROR_SUCCESS": {
            return {
                ...state,
                globalError: action.reason
            }
        }
        case "app/DELETE_ERROR": {
            return {
                ...state,
                globalError: null as null
            }
        }
        default: return state
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'app/INITIALIZED_SUCCESS'} as const),
    deleteError: () => ({type: 'app/DELETE_ERROR'} as const),
    catchGlobalErrorSuccess: (reason: string) => ({type: 'app/CATCH_GLOBAL_ERROR_SUCCESS', reason} as const)
}

export const initializeApp  = (): ThunkType => (dispatch) => {
    let promise:object = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}
export const catchGlobalError = (reason: string): ThunkType => (dispatch) => {
    dispatch(actions.catchGlobalErrorSuccess(reason))
    setTimeout(() => dispatch(actions.deleteError()), 5000)
}

