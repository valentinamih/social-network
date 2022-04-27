import Post from "./Post/Post"
import React from 'react'
import style from './MyPosts.module.css'
import userPhoto from "../../../assets/images/user.png";
import {PostType, ProfileType} from "../../../types/types";
import AddPostReduxForm, {AddPostValuesType} from './AddPostForm'

export type MapStatePropsType = {
    profile: ProfileType | null
    posts: Array<PostType>
}
export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}
type OwnPropsType = {}

const MyPosts: React.FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = (props) => {
    let photo: string
    {props.profile ? photo = props.profile.photos.small : photo = userPhoto}
            let postsElements = [
                props.posts.map(post => <Post message={post.message}
                                              key={post.id}
                                              likesCount={post.likesCount}
                                              photo={photo} />)
            ]
    let addPost = (values: AddPostValuesType) => {
       props.addPost(values.newPostText)
    }
    return (
        <div className={style.posts}>
            <b>My Posts</b>
            <AddPostReduxForm onSubmit={addPost}/>
            {postsElements}
        </div>
    )
}

export default MyPosts