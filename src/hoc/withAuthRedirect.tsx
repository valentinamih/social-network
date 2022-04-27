import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


let mapStateToPropsForRedirect = (state: AppStateType)  => ({
    isAuth: state.auth.isAuth
})
type MapStatePropsType = {
    isAuth: boolean
}

export function withAuthRedirect <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    function RedirectComponent (props: MapStatePropsType) {
            if (!props.isAuth) return <Redirect to='/login' />
            let {isAuth, ...restProps} = props
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}

