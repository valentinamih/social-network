import Post from "./Post/Post"
import  React from 'react'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilits/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";
import Button from "../../common/Buttons/Button";

const MyPosts = (props) => {
    let postsElements = [
        props.posts.map( post => <Post message={post.message}
                                       key={post.id}
                                       likesCount={post.likesCount} />)
    ]
    let addPost = (values) => {
       props.addPost(values.newPostText)
    }
    return (
        <div>
            <b>My Posts</b>
            <AddPostReduxForm onSubmit={addPost}/>
            {postsElements}
        </div>
    )
}
const maxLength10 = maxLengthCreator(10)
const AddPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field validate={[required, maxLength10]} component={Textarea} name={'newPostText'} placeholder='this could be your post' />
            <Button text={"Add new post"} />
        </div>
    </form>
}
const AddPostReduxForm = reduxForm({
    form: 'addPost'
})(AddPostForm)
export default MyPosts