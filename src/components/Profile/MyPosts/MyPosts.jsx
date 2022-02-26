import Post from "./Post/Post"
import  React from 'react'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilits/validators/validators";
import {createField, Textarea} from "../../common/FormControls/FormControls";
import Button from "../../common/Buttons/Button";
import style from './MyPosts.module.css'
import userPhoto from "../../../assets/images/user.png";

const MyPosts = (props) => {
    let photo
    {props.profile ? photo = props.profile.photos.small : photo = userPhoto}
            let postsElements = [
                props.posts.map(post => <Post message={post.message}
                                              key={post.id}
                                              likesCount={post.likesCount}
                                              photo={photo} />)
            ]
    let addPost = (values) => {
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
const maxLength100 = maxLengthCreator(100)
const AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={style.addPostForm}>
            <Field validate={[required, maxLength100]} component={Textarea} name={'newPostText'} placeholder='this could be your post' />
            <Button text={"Add new post"} />
        </div>
    </form>
}
const AddPostReduxForm = reduxForm({
    form: 'addPost'
})(AddPostForm)
export default MyPosts