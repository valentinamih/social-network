import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'
const CATCH_GLOBAL_ERROR_SUCCESS = 'app/CATCH_GLOBAL_ERROR_SUCCESS'
const DELETE_ERROR = 'app/DELETE_ERROR'

let initialStore = {
    initialized: false,
    globalError: null
}

export let appReducer = (state = initialStore, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        case CATCH_GLOBAL_ERROR_SUCCESS: {
            return {
                ...state,
                globalError: action.reason
            }
        }
        case DELETE_ERROR: {
            return {
                ...state,
                globalError: null
            }
        }
        default: return state
    }
}

export let initializedSuccess = () => ({type: INITIALIZED_SUCCESS})
export const catchGlobalErrorSuccess = (reason) => ({type: CATCH_GLOBAL_ERROR_SUCCESS, reason})
const deleteError = () =>  ({type: DELETE_ERROR})

export const initializeApp  = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}
export const catchGlobalError = (reason) => (dispatch) => {
    dispatch(catchGlobalErrorSuccess(reason))
    setTimeout(() => dispatch(deleteError()), 5000)
}

