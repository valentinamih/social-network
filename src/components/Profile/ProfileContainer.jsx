import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, updateStatus} from "../../redux/profile-reducer";
import { withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
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
    render () {
        return <Profile {...this.props} status={this.props.status} updateStatus={this.props.updateStatus}/>
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
    connect(mapStateToProps, {getProfile, getStatus, updateStatus}))(ProfileContainer)
