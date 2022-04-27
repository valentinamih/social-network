import  React from 'react'
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile
    }
}

let MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, { }, AppStateType>(mapStateToProps, {
    addPost: actions.addPostActionCreator
})(MyPosts)
export default MyPostsContainer