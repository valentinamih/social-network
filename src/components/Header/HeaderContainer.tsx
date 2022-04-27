import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import { logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchType> {
    render() {
        return <Header {...this.props}/>
    }
}
let mapStateToProps = (state: AppStateType)  => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
    logout: () => void
}

export default connect<MapStatePropsType, MapDispatchType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer)