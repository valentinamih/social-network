import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, saveProfile, updatePhoto, updateStatus} from "../../redux/profile-reducer";
import { withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    refreshProfile () {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUser
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId ) {
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
let mapStateToProps = (state)  => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUser: state.auth.userId,
    isAuth: state.auth.isAuth
})
export default compose(withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, updatePhoto, saveProfile}))(ProfileContainer)
