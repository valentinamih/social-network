import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, saveProfile, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updatePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile () {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUser
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        if (userId) {
            this.props.getProfile(userId)
            this.props.getStatus(userId)
        } else {
            throw new Error ('Id should be exists')
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId )
        {
            this.refreshProfile();
        }
    }
    render () {
        return <Profile {...this.props}
                        status={this.props.status}
                        isOwner={!this.props.match.params.userId}
                        updateStatus={this.props.updateStatus}
                        updatePhoto={this.props.updatePhoto}
                        saveProfile={this.props.saveProfile}/>
    }
}
let mapStateToProps = (state: AppStateType)  => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUser: state.auth.userId,
    isAuth: state.auth.isAuth
})
export default compose<React.ComponentType>(withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto, saveProfile}))(ProfileContainer)
